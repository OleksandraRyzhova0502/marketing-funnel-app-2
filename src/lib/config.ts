/**
 * Application Configuration
 * 
 * Provides configuration helpers that work in both development and production.
 * All URLs are dynamically determined from the current environment.
 */

/**
 * Get the current application origin (protocol + hostname + port)
 * Works identically on localhost and production deployments
 * 
 * Examples:
 * - Development: "http://localhost:5173"
 * - Production: "https://your-funnel.vercel.app"
 */
export const APP_ORIGIN = typeof window !== 'undefined' ? window.location.origin : ''

/**
 * Get the full current URL
 * Useful for sharing or external redirects
 */
export function getCurrentURL(): string {
  if (typeof window === 'undefined') return ''
  return window.location.href
}

/**
 * Get the current pathname
 * Works with both BrowserRouter and HashRouter
 * With HashRouter, extracts path from hash (e.g., "#/start" -> "/start")
 * Useful for analytics or logging
 */
export function getCurrentPathname(): string {
  if (typeof window === 'undefined') return ''
  
  // Check if using hash routing (HashRouter)
  if (window.location.hash && window.location.hash.startsWith('#/')) {
    // Extract path from hash (remove the #)
    return window.location.hash.substring(1)
  }
  
  // Default to pathname (BrowserRouter)
  return window.location.pathname
}

/**
 * Get the current search params (query string)
 * Useful for parsing UTM parameters or other query params
 */
export function getCurrentSearchParams(): URLSearchParams {
  if (typeof window === 'undefined') return new URLSearchParams()
  return new URLSearchParams(window.location.search)
}

