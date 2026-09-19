import { GoogleAnalytics } from "@next/third-parties/google";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function Analytics() {
  const gaId =
    GA_ID && /^[A-Za-z0-9_-]+$/.test(GA_ID) ? GA_ID : null;

  if (!gaId) return null;

  return (
    <GoogleAnalytics
      gaId={gaId}
      debugMode={process.env.NODE_ENV === "development"}
    />
  );
}
