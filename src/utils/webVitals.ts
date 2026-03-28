import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from "web-vitals";

function sendToAnalytics(metric: Metric) {
  // Log to console in development
  if (import.meta.env.DEV) {
    console.log("[Web Vitals]", {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
    });
  }

  // In production, you can send to your analytics service
  // Example: Send to Google Analytics
  // if (window.gtag) {
  //   window.gtag('event', metric.name, {
  //     value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
  //     event_category: 'Web Vitals',
  //     event_label: metric.id,
  //     non_interaction: true,
  //   })
  // }

  // Example: Send to custom analytics endpoint
  // fetch('/api/analytics', {
  //   method: 'POST',
  //   body: JSON.stringify(metric),
  //   headers: { 'Content-Type': 'application/json' },
  // })
}

/**
 * Initialize Web Vitals monitoring
 * Tracks Core Web Vitals: LCP, INP, CLS, FCP, TTFB
 */
export function initWebVitals() {
  onCLS(sendToAnalytics); // Cumulative Layout Shift
  onFCP(sendToAnalytics); // First Contentful Paint
  onINP(sendToAnalytics); // Interaction to Next Paint (replaces FID)
  onLCP(sendToAnalytics); // Largest Contentful Paint
  onTTFB(sendToAnalytics); // Time to First Byte
}
