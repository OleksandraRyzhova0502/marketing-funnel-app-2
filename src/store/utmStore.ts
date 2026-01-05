import { create } from 'zustand'
import { initializeUTMParams, getAllMarketingParams } from '../lib/utm'

/**
 * Marketing Parameters Store
 * 
 * Global store for marketing parameters that can be accessed from any component.
 * Marketing parameters are initialized once on app load and persist across page reloads
 * using localStorage.
 * 
 * Includes:
 * - UTM parameters (utm_source, utm_medium, utm_campaign, utm_content, utm_term)
 * - Click IDs (gclid, fbclid, ttclid)
 * - Custom query parameters (accessible via getAll())
 */
interface UTMState {
  utm_source: string | undefined
  utm_medium: string | undefined
  utm_campaign: string | undefined
  utm_content: string | undefined
  utm_term: string | undefined
  gclid: string | undefined
  fbclid: string | undefined
  ttclid: string | undefined
  initialize: () => void
  getAll: () => Record<string, string | undefined>
}

export const useUTMStore = create<UTMState>((set) => ({
  utm_source: undefined,
  utm_medium: undefined,
  utm_campaign: undefined,
  utm_content: undefined,
  utm_term: undefined,
  gclid: undefined,
  fbclid: undefined,
  ttclid: undefined,

  /**
   * Initialize marketing parameters from URL and localStorage
   * Should be called once on app startup (typically in App.tsx)
   * 
   * This function:
   * 1. Parses marketing params from URL query string
   * 2. Saves them to localStorage for persistence
   * 3. Updates the store with the merged values
   */
  initialize: () => {
    const params = initializeUTMParams()
    set({
      utm_source: params.utm_source,
      utm_medium: params.utm_medium,
      utm_campaign: params.utm_campaign,
      utm_content: params.utm_content,
      utm_term: params.utm_term,
      gclid: params.gclid,
      fbclid: params.fbclid,
      ttclid: params.ttclid,
    })
  },

  /**
   * Get all marketing parameters as a record
   * Includes both known marketing params and custom params
   * 
   * Useful for passing to analytics functions or displaying in UI
   * 
   * @returns Record of all marketing parameters (values may be undefined or objects for custom_params)
   */
  getAll: () => {
    // Get all marketing params (includes custom params in custom_params object)
    const { marketingParams, customParams } = getAllMarketingParams()
    
    // Combine known params with custom params
    const all: Record<string, any> = { ...marketingParams }
    
    // Add custom params if any exist
    if (Object.keys(customParams).length > 0) {
      all.custom_params = customParams
    }
    
    return all
  },
}))

