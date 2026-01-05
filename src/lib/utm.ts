import { getCurrentSearchParams } from './config'

/**
 * Marketing Parameter Management
 * 
 * Handles parsing, storing, and retrieving marketing parameters from URL and localStorage.
 * Marketing parameters are stored in localStorage to persist across page reloads and sessions.
 * 
 * Captures:
 * - UTM parameters (utm_source, utm_medium, utm_campaign, utm_content, utm_term)
 * - Click IDs (gclid, fbclid, ttclid)
 * - Any other query parameters (stored as custom_params object)
 */

// Standard UTM parameters
const UTM_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const

// Click ID parameters (Google, Facebook, TikTok)
const CLICK_ID_PARAMS = [
  'gclid',   // Google Click ID
  'fbclid',  // Facebook Click ID
  'ttclid',  // TikTok Click ID
] as const

// All known marketing parameters
const MARKETING_PARAMS = [...UTM_PARAMS, ...CLICK_ID_PARAMS] as const

const STORAGE_KEY = 'funnel_marketing_params'
const CUSTOM_PARAMS_KEY = 'funnel_custom_params'

/**
 * Parse all marketing parameters from the current URL query string
 * @returns Object with:
 *   - marketingParams: Record of known marketing params
 *   - customParams: Record of any other query params
 */
function parseMarketingParamsFromURL(): {
  marketingParams: Record<string, string | undefined>
  customParams: Record<string, string>
} {
  const params = getCurrentSearchParams()
  const marketingParams: Record<string, string | undefined> = {}
  const customParams: Record<string, string> = {}

  // Parse known marketing parameters
  for (const param of MARKETING_PARAMS) {
    const value = params.get(param)
    marketingParams[param] = value || undefined
  }

  // Parse any other query parameters as custom params
  for (const [key, value] of params.entries()) {
    // Skip known marketing params (already captured above)
    if (!MARKETING_PARAMS.includes(key as any)) {
      customParams[key] = value
    }
  }

  return { marketingParams, customParams }
}

/**
 * Save marketing parameters to localStorage
 * Stores both known marketing params and custom params separately
 */
function saveMarketingParamsToStorage(
  marketingParams: Record<string, string | undefined>,
  customParams: Record<string, string>
): void {
  // Save known marketing params (only those with values)
  const paramsToSave: Record<string, string> = {}
  for (const [key, value] of Object.entries(marketingParams)) {
    if (value !== undefined) {
      paramsToSave[key] = value
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(paramsToSave))

  // Save custom params (if any)
  if (Object.keys(customParams).length > 0) {
    const existingCustom = getCustomParamsFromStorage()
    const mergedCustom = { ...existingCustom, ...customParams }
    localStorage.setItem(CUSTOM_PARAMS_KEY, JSON.stringify(mergedCustom))
  }
}

/**
 * Load marketing parameters from localStorage
 * @returns Record of marketing parameter keys to their stored values (or undefined)
 */
function loadMarketingParamsFromStorage(): Record<string, string | undefined> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return {}

    const parsed = JSON.parse(stored)
    const params: Record<string, string | undefined> = {}

    // Initialize all known params (some may be undefined)
    for (const param of MARKETING_PARAMS) {
      params[param] = parsed[param] || undefined
    }

    return params
  } catch (error) {
    console.error('Failed to load marketing params from storage:', error)
    return {}
  }
}

/**
 * Load custom parameters from localStorage
 * @returns Record of custom parameter keys to their values
 */
function getCustomParamsFromStorage(): Record<string, string> {
  try {
    const stored = localStorage.getItem(CUSTOM_PARAMS_KEY)
    if (!stored) return {}
    return JSON.parse(stored)
  } catch (error) {
    console.error('Failed to load custom params from storage:', error)
    return {}
  }
}

/**
 * Initialize marketing parameters on first app load
 * 
 * Flow:
 * 1. Parse marketing parameters from URL
 * 2. If URL has params, save them to localStorage (overwriting any existing)
 * 3. If URL doesn't have a param but localStorage does, use the stored value
 * 4. Return the final merged marketing parameters
 * 
 * This ensures marketing params persist across page reloads and sessions
 */
export function initializeUTMParams(): Record<string, string | undefined> {
  const { marketingParams: urlParams, customParams: urlCustomParams } = parseMarketingParamsFromURL()
  const storedParams = loadMarketingParamsFromStorage()

  // Merge: URL params take precedence, fallback to stored params
  const mergedParams: Record<string, string | undefined> = {}

  for (const param of MARKETING_PARAMS) {
    if (urlParams[param] !== undefined) {
      // URL has the param - use it
      mergedParams[param] = urlParams[param]
    } else if (storedParams[param] !== undefined) {
      // URL doesn't have it, but localStorage does - reuse stored value
      mergedParams[param] = storedParams[param]
    } else {
      // Neither has it - leave as undefined
      mergedParams[param] = undefined
    }
  }

  // Save any URL params to localStorage (this will overwrite existing if URL has new values)
  saveMarketingParamsToStorage(urlParams, urlCustomParams)

  return mergedParams
}

/**
 * Get current marketing parameters
 * Returns all marketing parameters from localStorage (or undefined if not present)
 * 
 * @returns Record of marketing parameter keys to their values (or undefined)
 */
export function getUTMParams(): Record<string, string | undefined> {
  return loadMarketingParamsFromStorage()
}

/**
 * Get custom parameters (any query params that aren't standard marketing params)
 * @returns Record of custom parameter keys to their values
 */
export function getCustomParams(): Record<string, string> {
  return getCustomParamsFromStorage()
}

/**
 * Get all marketing parameters (known + custom)
 * Useful for sending to analytics
 * 
 * @returns Object with:
 *   - marketingParams: Known marketing parameters
 *   - customParams: Custom query parameters
 */
export function getAllMarketingParams(): {
  marketingParams: Record<string, string | undefined>
  customParams: Record<string, string>
} {
  return {
    marketingParams: getUTMParams(),
    customParams: getCustomParams(),
  }
}

