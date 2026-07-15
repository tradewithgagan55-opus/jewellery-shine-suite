import { useEffect, useState } from "react";
import { useSiteSettings } from "@/lib/products-api";
import { supabase } from "@/integrations/supabase/client";

const BUCKET = "product-images";

function extractPath(url: string): string | null {
  // Matches /object/public/<bucket>/<path> or /object/sign/<bucket>/<path> or /object/<bucket>/<path>
  const m = url.match(/\/storage\/v1\/object\/(?:public\/|sign\/)?([^/?]+)\/(.+?)(?:\?|$)/);
  if (!m) return null;
  if (m[1] !== BUCKET) return null;
  return m[2];
}

export function HeroBanner() {
  const { data } = useSiteSettings() as { data: any };
  const rawUrl: string | undefined = data?.banner_image_url;
  const enabled: boolean | undefined = data?.banner_enabled;
  const [resolvedUrl, setResolvedUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!enabled || !rawUrl) {
      setResolvedUrl(null);
      return;
    }
    const path = extractPath(rawUrl);
    if (!path) {
      // Not a Supabase storage URL — use as-is.
      setResolvedUrl(rawUrl);
      return;
    }
    // Bucket is private in this workspace; generate a long-lived signed URL.
    supabase.storage
      .from(BUCKET)
      .createSignedUrl(path, 60 * 60 * 24 * 365 * 10) // 10 years
      .then(({ data: signed, error }) => {
        if (cancelled) return;
        if (error || !signed?.signedUrl) {
          setResolvedUrl(rawUrl);
        } else {
          setResolvedUrl(signed.signedUrl);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [rawUrl, enabled]);

  if (!enabled || !resolvedUrl) return null;

  return (
    <section aria-label="Promotional banner" className="w-full bg-[color:var(--ivory)]">
      <div className="w-full overflow-hidden">
        <img
          src={resolvedUrl}
          alt="Cheluve Creations promotional banner"
          className="w-full h-auto block object-cover object-center"
          style={{ aspectRatio: "2.4 / 1" }}
          loading="eager"
          decoding="async"
        />
      </div>
    </section>
  );
}
