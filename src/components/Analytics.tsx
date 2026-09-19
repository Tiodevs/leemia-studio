import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

function isPublicId(value: string | undefined): value is string {
  return Boolean(value && /^[A-Za-z0-9_-]+$/.test(value));
}

export function Analytics() {
  const gaId = isPublicId(GA_ID) ? GA_ID : null;
  const clarityId = isPublicId(CLARITY_ID) ? CLARITY_ID : null;

  if (!gaId && !clarityId) return null;

  return (
    <>
      {gaId ? (
        <GoogleAnalytics
          gaId={gaId}
          debugMode={process.env.NODE_ENV === "development"}
        />
      ) : null}
      {clarityId ? (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityId}");`}
        </Script>
      ) : null}
    </>
  );
}
