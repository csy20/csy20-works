import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from "web-vitals";

function sendToAnalytics(metric: Metric) {
  if (import.meta.env.DEV) {
    console.log("[Web Vitals]", {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
    });
  }
}

export function initWebVitals() {
  onCLS(sendToAnalytics);
  onFCP(sendToAnalytics);
  onINP(sendToAnalytics);
  onLCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
}
