import { getCurrentPathname, getCurrentURL } from './config'
import { getAllMarketingParams } from './utm'
import { v4 as uuidv4 } from "uuid";

// Amplitude types
declare global {
  interface Window {
    amplitude: {
      track: (eventName: string, eventProperties?: Record<string, any>) => void
      add: (plugin: any) => void
      init: (apiKey: string, options?: any) => void
      setUserId: (userId: string | null) => void
      setUserProperties: (properties: Record<string, any>) => void
    }
    sessionReplay: {
      plugin: (options: { sampleRate: number }) => any
    }
    fbq: (
      action: 'init' | 'track' | 'trackSingle' | 'trackCustom',
      eventName: string,
      eventData?: Record<string, any>
    ) => void
  }
}

let sessionId: string | null = null

// Generate or retrieve session ID
function getSessionId(): string {
  if (!sessionId) {
    const stored = sessionStorage.getItem('funnel_session_id')
    if (stored) {
      sessionId = stored
    } else {
      sessionId = uuidv4()
      sessionStorage.setItem('funnel_session_id', sessionId)
    }
  }
  return sessionId
}

/**
 * Get all marketing parameters (UTM + click IDs + custom params)
 * Returns all marketing params as a record
 */
function getAllMarketingParamsForEvent(): Record<string, any> {
  const { marketingParams, customParams } = getAllMarketingParams()
  
  // Combine marketing params and custom params
  // Filter out undefined values from marketing params
  const params: Record<string, any> = {}
  
  // Add marketing params (only those with values)
  for (const [key, value] of Object.entries(marketingParams)) {
    if (value !== undefined) {
      params[key] = value
    }
  }
  
  // Add custom params (if any)
  if (Object.keys(customParams).length > 0) {
    params.custom_params = customParams
  }
  
  return params
}

/**
 * Get page referrer
 * Returns the referrer URL or 'direct' if no referrer
 */
function getReferrer(): string {
  if (typeof window === 'undefined') return 'direct'
  return document.referrer || 'direct'
}

/**
 * Load Amplitude SDK script dynamically
 */
function loadAmplitudeSDK(apiKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (window.amplitude) {
      resolve()
      return
    }

    // Check if script is already being loaded
    if (document.querySelector(`script[src*="amplitude.com"]`)) {
      // Wait for it to load
      const checkInterval = setInterval(() => {
        if (window.amplitude) {
          clearInterval(checkInterval)
          resolve()
        }
      }, 100)
      return
    }

    // Load the script
    const script = document.createElement('script')
    script.src = `https://cdn.amplitude.com/script/${apiKey}.js`
    script.async = true
    script.onload = () => {
      resolve()
    }
    script.onerror = () => {
      reject(new Error('Failed to load Amplitude SDK'))
    }
    document.head.appendChild(script)
  })
}

/**
 * Initialize Amplitude SDK and set UTM parameters as user properties
 */
export async function initAnalytics() {
  // Amplitude API key
  const apiKey = 'f57aa48fea8d627717447a9290d46c15'

  try {
    // Load Amplitude SDK
    await loadAmplitudeSDK(apiKey)

    // Initialize Amplitude
    window.amplitude.add(window.sessionReplay.plugin({ sampleRate: 1 }))
    window.amplitude.init(apiKey, {
      fetchRemoteConfig: true,
      autocapture: {
        attribution: true,
        fileDownloads: true,
        formInteractions: true,
        pageViews: true,
        sessions: true,
        elementInteractions: true,
        networkTracking: true,
        webVitals: true,
        frustrationInteractions: true,
      },
    })

    // Get all marketing parameters (UTM + click IDs + custom params)
    const allMarketingParams = getAllMarketingParamsForEvent()

    // Set marketing parameters as user properties in Amplitude
    // This includes UTM params, click IDs, and custom_params
    if (Object.keys(allMarketingParams).length > 0) {
      window.amplitude.setUserProperties(allMarketingParams)
    }
  } catch (error) {
    console.error('Failed to initialize Amplitude:', error)
  }
}

/**
 * Track event helper (alias for trackEvent)
 * 
 * @deprecated Use trackEvent instead for consistency
 * @param eventName - Name of the event to track
 * @param props - Additional event properties
 */
export function track(eventName: string, props?: Record<string, any>) {
  trackEvent(eventName, props)
}

/**
 * Track event helper with automatic marketing parameter inclusion
 * 
 * Automatically includes on every event:
 * - All marketing parameters (utm_source, utm_medium, utm_campaign, utm_content, utm_term)
 * - Click IDs (gclid, fbclid, ttclid)
 * - Custom query parameters (as custom_params object)
 * - Page URL (full current URL)
 * - Referrer (document.referrer or 'direct')
 * - Session ID (persistent across page reloads)
 * - Screen name (current pathname)
 * - Timestamp (milliseconds since epoch)
 * 
 * Example usage:
 * ```typescript
 * trackEvent('quiz_started', { quiz_type: 'sexual_wellness' })
 * trackEvent('quiz_answer_selected', { question: 'question_1', answer: 'yes' })
 * trackEvent('quiz_completed', { total_questions: 7, duration_seconds: 120 })
 * ```
 * 
 * @param eventName - Name of the event to track (e.g., 'quiz_started', 'quiz_answer_selected')
 * @param eventProperties - Additional event properties (will be merged with automatic properties)
 */
export function trackEvent(eventName: string, eventProperties?: Record<string, any>) {
  // Wait for Amplitude to be available
  if (typeof window === 'undefined' || !window.amplitude) {
    // If Amplitude isn't loaded yet, queue the event
    setTimeout(() => trackEvent(eventName, eventProperties), 100)
    return
  }

  // Get all marketing parameters (UTM + click IDs + custom params)
  const marketingParams = getAllMarketingParamsForEvent()

  // Build event properties with automatic inclusion
  // Merge order: marketing params -> custom props -> automatic props (URL, referrer, etc.)
  const eventProps: Record<string, any> = {
    // Marketing parameters (UTM params, click IDs, custom params)
    ...marketingParams,
    
    // Custom event properties (can override marketing params if needed, but shouldn't)
    ...eventProperties,
    
    // Automatic properties (always included, can be overridden by eventProperties)
    page_url: getCurrentURL(),
    referrer: getReferrer(),
    screen: getCurrentPathname(),
    timestamp: Date.now(),
    session_id: getSessionId(),
  }

  // Send event to Amplitude
  window.amplitude.track(eventName, eventProps)
}

// Format answer text for parameters
export function formatAnswerText(text: string): string {
  return text.replace(/\s+/g, '_')
}

/**
 * Track Facebook Pixel event
 * 
 * @param eventName - Name of the Facebook Pixel event (e.g., 'CompleteRegistration', 'Lead', 'Purchase')
 * @param eventData - Optional event data to send with the event
 */
export function trackFacebookPixel(eventName: string, eventData?: Record<string, any>) {
  if (typeof window === 'undefined' || !window.fbq) {
    // If Facebook Pixel isn't loaded yet, queue the event
    setTimeout(() => trackFacebookPixel(eventName, eventData), 100)
    return
  }
  try {
    window.fbq('track', eventName, eventData || {})
  } catch (error) {
    console.error('Failed to track Facebook Pixel event:', error)
  }
}

/**
 * Track Facebook Pixel Purchase event
 * 
 * @param value - Purchase value (number)
 * @param currency - Currency code (string, e.g., "USD")
 * @param additionalData - Optional additional event data
 */
export function trackFacebookPixelPurchase(
  value: number,
  currency: string = 'USD',
  additionalData?: Record<string, any>
) {
  const purchaseData: Record<string, any> = {
    value,
    currency,
    ...additionalData,
  }
  trackFacebookPixel('Purchase', purchaseData)
}
