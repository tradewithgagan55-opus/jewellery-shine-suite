import { useSiteSettings } from "@/lib/products-api";

export function HeroBanner() {
  const { data } = useSiteSettings() as { data: any };
  if (!data?.banner_enabled || !data?.banner_image_url) return null;

  return (
    <section aria-label="Promotional banner" className="w-full bg-[color:var(--ivory)]">
      <div className="w-full overflow-hidden">
        <img
          src={data.banner_image_url}
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
