import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const BUCKET = "product-images";
const FALLBACK = "/images/cheluve-logo.png";
const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

/** Extracts the object path from a Supabase storage URL for our bucket. */
export function extractStoragePath(url: string): string | null {
  const m = url.match(/\/storage\/v1\/object\/(?:public\/|sign\/)?([^/?]+)\/(.+?)(?:\?|$)/);
  if (!m || m[1] !== BUCKET) return null;
  return m[2];
}

const signedCache = new Map<string, string>();

/**
 * Resolves a stored image reference to a URL the browser can load.
 * The storage bucket is private, so public object URLs 400 — they are
 * swapped for long-lived signed URLs. Non-storage paths pass through.
 */
export function useStorageImage(raw: string | undefined | null) {
  const [src, setSrc] = useState<string>(() => {
    if (!raw) return FALLBACK;
    const cached = signedCache.get(raw);
    if (cached) return cached;
    // Storage objects need a signed URL; show the placeholder until it resolves.
    return extractStoragePath(raw) ? FALLBACK : raw;
  });

  useEffect(() => {
    let cancelled = false;
    if (!raw) {
      setSrc(FALLBACK);
      return;
    }
    const cached = signedCache.get(raw);
    if (cached) {
      setSrc(cached);
      return;
    }
    const path = extractStoragePath(raw);
    if (!path) {
      setSrc(raw);
      return;
    }
    setSrc(FALLBACK);
    supabase.storage
      .from(BUCKET)
      .createSignedUrl(path, TEN_YEARS)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (!error && data?.signedUrl) {
          signedCache.set(raw, data.signedUrl);
          setSrc(data.signedUrl);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [raw]);

  return src;
}

type StorageImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string | undefined | null;
};

/** Drop-in <img> that resolves private-bucket references and degrades gracefully. */
export function StorageImage({ src, alt = "", ...rest }: StorageImageProps) {
  const resolved = useStorageImage(src);
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [resolved]);

  return (
    <img
      {...rest}
      src={failed ? FALLBACK : resolved}
      alt={alt}
      onError={() => setFailed(true)}
    />
  );
}
