import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { useProduct, formatPrice } from "@/lib/products-api";
import { Navbar } from "@/components/cheluve/Navbar";
import { WhatsAppFAB, GoldButton, Eyebrow, WHATSAPP_NUMBER } from "@/components/cheluve/primitives";
import { Footer } from "@/components/cheluve/Sections";

export const Route = createFileRoute("/product/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} — Cheluve Creations` },
      { name: "description", content: "Handcrafted antique ornament from Cheluve Creations — available for purchase and rental." },
    ],
  }),
  component: ProductDetail,
  errorComponent: ({ error }) => <div className="p-16 text-center">{error.message}</div>,
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="font-display text-3xl">Product not found</h1>
      <Link to="/" className="text-royal underline">Back to home</Link>
    </div>
  ),
});

function ProductDetail() {
  const { slug } = Route.useParams();
  const { data: product, isLoading } = useProduct(slug);
  const [idx, setIdx] = useState(0);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-foreground/60">Loading…</div>;
  }
  if (!product) throw notFound();

  const images = product.image_urls.length ? product.image_urls : ["/images/cheluve-logo.png"];
  const waMsg = encodeURIComponent(
    `Hello Cheluve Creations, I'd like to enquire about "${product.product_name}" (${formatPrice(Number(product.product_price))}).`
  );

  return (
    <div className="relative">
      <Navbar />
      <main className="pt-28 pb-24 bg-[color:var(--ivory)] min-h-screen">
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-14">
          {/* Gallery */}
          <div>
            <div className="relative aspect-[4/5] overflow-hidden bg-white border border-border">
              <motion.img
                key={idx}
                src={images[idx]}
                alt={product.product_name}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 flex items-center justify-center border border-border hover:bg-white"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIdx((i) => (i + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 flex items-center justify-center border border-border hover:bg-white"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-2">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className={`aspect-square overflow-hidden border ${
                      idx === i ? "border-[color:var(--gold)]" : "border-border"
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            {product.category && <Eyebrow>{product.category}</Eyebrow>}
            <h1 className="mt-4 font-display text-4xl md:text-5xl leading-tight text-foreground">
              {product.product_name}
            </h1>
            <div className="mt-5 flex items-baseline gap-4">
              <div className="text-3xl text-royal font-display">
                {formatPrice(Number(product.product_price))}
              </div>
              {product.sale_price != null && (
                <div className="text-lg text-foreground/50 line-through">
                  {formatPrice(Number(product.sale_price))}
                </div>
              )}
            </div>
            {product.rental_available && product.rental_price != null && (
              <p className="mt-2 text-sm tracking-[0.2em] uppercase text-gold">
                Also available for rent · {formatPrice(Number(product.rental_price))}
              </p>
            )}

            <p className="mt-8 text-foreground/70 leading-relaxed whitespace-pre-line">
              {product.description ||
                "A handpicked heritage piece from Cheluve Creations. Get in touch to learn more about craftsmanship, sizing, and availability."}
            </p>

            {product.sku && (
              <p className="mt-6 text-xs tracking-[0.28em] uppercase text-foreground/50">
                SKU · {product.sku}
              </p>
            )}

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 text-[11px] tracking-[0.3em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)", boxShadow: "0 12px 30px -12px rgba(184,134,11,0.55)" }}
              >
                <MessageCircle className="w-4 h-4" /> Enquire on WhatsApp
              </a>
              <Link
                to="/"
                hash="contact"
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-foreground/70 hover:text-royal transition-colors"
              >
                <span className="h-px w-8 bg-[color:var(--gold)]" /> Contact us
              </Link>
            </div>

            <div className="mt-10">
              <Link to="/" className="text-sm text-royal hover:text-gold transition-colors">
                ← Back to collections
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
