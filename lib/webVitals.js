/**
 * Web Vitals Monitoring Utility
 * 
 * Tracks Core Web Vitals and sends metrics to Google Analytics 4
 * - LCP (Largest Contentful Paint): Measures visual completeness
 * - FID (First Input Delay): Measures interactivity responsiveness
 * - CLS (Cumulative Layout Shift): Measures visual stability
 * 
 * Usage: Import and call startWebVitalsTracking() in your layout.js
 * 
 * Requires:
 * 1. web-vitals package: npm install web-vitals
 * 2. GA4 script enabled in layout.js
 */

export async function startWebVitalsTracking() {
  try {
    const {
      getCLS,
      getFID,
      getFCP,
      getLCP,
      getTTFB,
    } = await import("web-vitals");

    // Helper function to send metrics to Google Analytics 4
    const sendMetricToGA = (metric) => {
      if (window.gtag) {
        window.gtag("event", metric.name, {
          value: Math.round(metric.value),
          event_category: "Web Vitals",
          event_label: metric.id,
          non_interaction: true,
        });
      } else {
        // Fallback: log to console if GA4 is not available
        console.log(`Web Vital - ${metric.name}:`, metric.value);
      }
    };

    // Track Core Web Vitals
    getCLS(sendMetricToGA);
    getFID(sendMetricToGA);
    getFCP(sendMetricToGA);
    getLCP(sendMetricToGA);
    getTTFB(sendMetricToGA);

    // Log to console for development/debugging
    if (process.env.NODE_ENV === "development") {
      console.log("[SEO] Web Vitals tracking started");
    }
  } catch (error) {
    console.error("Failed to initialize web vitals tracking:", error);
  }
}

/**
 * Guide: Integrating Core Web Vitals Tracking
 * 
 * Step 1: Install web-vitals package
 *   npm install web-vitals
 * 
 * Step 2: Uncomment GA4 script in app/layout.js (replace G-XXXXXXXXXX with your GA4 ID)
 * 
 * Step 3: Add this to your layout.js after GA4 setup:
 *   import { startWebVitalsTracking } from '@/lib/webVitals';
 *   
 *   useEffect(() => {
 *     startWebVitalsTracking();
 *   }, []);
 * 
 * Step 4: Check results in Google Analytics 4:
 *   - Go to GA4 > Reports > Realtime or Engagement > Events
 *   - Filter by event_category = "Web Vitals"
 *   - Monitor metric values over time
 * 
 * Thresholds (Google Core Web Vitals):
 * - LCP: < 2.5s (Good) | 2.5s - 4s (Needs improvement) | > 4s (Poor)
 * - FID: < 100ms (Good) | 100-300ms (Needs improvement) | > 300ms (Poor)
 * - CLS: < 0.1 (Good) | 0.1 - 0.25 (Needs improvement) | > 0.25 (Poor)
 */
