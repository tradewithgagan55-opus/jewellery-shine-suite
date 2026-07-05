import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Gem, CalendarRange, Crown, HeadphonesIcon, BadgeCheck, Mail, Phone, MapPin, Instagram, MessageCircle, ChevronLeft, ChevronRight, Clock, Send, Check, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import {
  allJewelry, GoldButton, GoldenParticles, Eyebrow, Reveal, logo,
  WHATSAPP_URL, CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_LOCATION, INSTAGRAM_URL,
} from "./primitives";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { products, formatPrice } from "./products";



/* ===== HERO ===== */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <section id="home" ref={ref} className="relative min-h-screen pt-28 pb-20 overflow-hidden" style={{ background: "linear-gradient(135deg, var(--cream) 0%, var(--ivory) 60%, var(--cream) 100%)" }}>
      <GoldenParticles />
      {/* decorative lotus motif */}
      <div className="pointer-events-none absolute -right-32 top-1/4 w-[480px] h-[480px] opacity-[0.05]">
        <LotusSVG />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-[1.05fr_1fr] gap-14 items-center">
        {/* Left image */}
        <motion.div style={{ y, opacity }} className="relative">
          <div className="relative aspect-[4/5] w-full">
            <motion.img
              initial={{ scale: 1.15, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              src={allJewelry[0]}
              alt="Bridal antique ornament"
              width={1200}
              height={1500}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
            />

            {/* gold frame */}
            <div className="absolute -inset-3 border border-[color:var(--gold)]/40 pointer-events-none" />
            

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.9 }}
              className="absolute -left-6 bottom-10 hidden md:block bg-ivory shadow-2xl px-6 py-4 max-w-[230px]"
              style={{ backgroundColor: "var(--ivory)" }}
            >
              <div className="text-[10px] tracking-[0.3em] uppercase text-gold">Heritage Craft</div>
              <div className="mt-1 font-display italic text-foreground text-sm">Handpicked antique pieces, curated for every Cheluve.</div>
            </motion.div>
          </div>

        </motion.div>

        {/* Right text */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9 }}
            className="flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-royal"
          >
            <span className="h-px w-10 bg-[color:var(--gold)]" />
            Premium Antique Ornament Collection
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.1 }}
            className="mt-8 font-display text-[clamp(2.6rem,5.6vw,5rem)] leading-[1.02] text-foreground"
          >
            Where <span className="italic gold-gradient-text">Elegance</span> Meets
            <br />
            <span className="italic text-royal">Tradition</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.9 }}
            className="mt-7 max-w-xl text-foreground/70 leading-relaxed"
          >
            Discover beautifully crafted ornaments designed to celebrate every Cheluve.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.9 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <GoldButton as="a" href="#collections">Explore Collections</GoldButton>
            <GoldButton as="a" href="#rental" variant="outline">View Products</GoldButton>
            <a
              href={WHATSAPP_URL}
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-foreground/70 hover:text-royal transition-colors"
            >
              <span className="h-px w-8 bg-[color:var(--gold)]" /> WhatsApp Inquiry
            </a>

          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="mt-14 grid grid-cols-3 gap-6 max-w-md"
          >
            {[["Heritage", "Pieces"], ["Bridal", "Curations"], ["Rental", "Available"]].map(([a, b]) => (
              <div key={a} className="text-center">
                <div className="font-display text-2xl text-royal">{a}</div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-foreground/55 mt-1">{b}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function LotusSVG() {
  return (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-royal w-full h-full">
      <g transform="translate(100 110)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <ellipse key={a} cx="0" cy="-40" rx="20" ry="50" transform={`rotate(${a})`} />
        ))}
      </g>
    </svg>
  );
}

/* ===== COLLECTIONS ===== */
export function Collections() {
  const items = [
    { title: "Antique Necklaces", desc: "Heirloom-grade temple necklaces in classic gold tones.", img: allJewelry[1] },
    { title: "Temple Jewelry", desc: "Divine craftsmanship inspired by South Indian temples.", img: allJewelry[9] },
    { title: "Bridal Sets", desc: "Complete antique bridal sets for the modern Cheluve.", img: allJewelry[8] },
    { title: "Antique Earrings", desc: "Statement jhumkas, chandbalis & ear ornaments.", img: allJewelry[3] },
    { title: "Bangles & Bracelets", desc: "Intricate kada, bangles & ornamental bracelets.", img: allJewelry[15] },
    { title: "Wedding Collections", desc: "Curated sets crafted for cherished ceremonies.", img: allJewelry[4] },
  ];
  return (
    <section id="collections" className="relative py-28 bg-[color:var(--ivory)]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal className="text-center">
          <Eyebrow>Signature Range</Eyebrow>
          <h2 className="mt-6 font-display text-[clamp(2.2rem,4.6vw,4rem)] leading-tight">
            Explore Our <span className="italic gold-gradient-text">Signature</span> Collections
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-foreground/65">
            Six distinct edits of antique adornments — every piece carrying its own story of craft and culture.
          </p>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={(i % 3) * 0.08}>
              <a href="#collections-grid" className="block group relative bg-card overflow-hidden border border-border hover:border-[color:var(--gold)]/60 transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_30px_60px_-25px_rgba(184,134,11,0.35)]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={it.img} alt={it.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0 opacity-80 group-hover:opacity-60 transition-opacity" />
                  <div className="absolute top-4 left-4 px-3 py-1 text-[9px] tracking-[0.3em] uppercase bg-ivory/85 text-royal backdrop-blur-sm">Cheluve</div>
                </div>
                <div className="p-7">
                  <h3 className="font-display text-2xl text-foreground">{it.title}</h3>
                  <p className="mt-2 text-sm text-foreground/65 leading-relaxed">{it.desc}</p>
                  <div className="mt-5 flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-royal group-hover:text-gold transition-colors">
                    <span>View Collection</span>
                    <span className="h-px w-10 bg-[color:var(--gold)] transition-all duration-500 group-hover:w-16" />
                  </div>
                </div>
                {/* glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ boxShadow: "inset 0 0 60px rgba(212,175,55,0.18)" }} />
              </a>

            </Reveal>
          ))}

        </div>

        {/* ===== Product Grid ===== */}
        <div className="mt-24" id="collections-grid">
          <Reveal className="text-center">
            <Eyebrow>Featured Pieces</Eyebrow>
            <h3 className="mt-6 font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-tight">
              Our <span className="italic gold-gradient-text">Curated</span> Products
            </h3>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((p, i) => {
              const handleClick = (e: React.MouseEvent) => {
                e.preventDefault();
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                try {
                  window.dispatchEvent(new CustomEvent("cheluve:enquire", { detail: { product: p.name } }));
                } catch {}
                if (history.replaceState) history.replaceState(null, "", "#contact");
              };
              return (
                <motion.a
                  key={p.id}
                  href="#contact"
                  onClick={handleClick}
                  data-product={p.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: "easeOut" }}
                  className="group block bg-card border border-border hover:border-[color:var(--gold)]/60 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-25px_rgba(184,134,11,0.4)] will-change-transform"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--ivory)]">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                    />
                  </div>
                  <div className="p-5 text-center">
                    <h4 className="font-display text-lg text-foreground leading-snug">{p.name}</h4>
                    <p className="mt-2 text-base text-royal tracking-wide">{formatPrice(p.price)}</p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );

}

/* ===== RENTAL ===== */
export function Rental() {
  return (
    <section id="rental" className="relative py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="relative">
            <img src={allJewelry[8]} alt="Rental ornament" className="w-full aspect-[5/6] object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="text-[10px] tracking-[0.4em] uppercase text-royal flex items-center gap-3">
            <span className="h-px w-10 bg-[color:var(--gold)]" /> Rental Services
          </div>
          <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.4rem)] leading-tight">
            Wear the heritage. <span className="italic gold-gradient-text">Rent</span> the moment.
          </h2>
          <p className="mt-6 text-foreground/70 leading-relaxed max-w-xl">
            For every wedding day, photoshoot, family celebration or traditional event — borrow exquisite antique
            ornaments with flexible packages, secure handling, and personal styling guidance.
          </p>
          <ul className="mt-8 space-y-3">
            {["Flexible 1–7 day rental packages", "Sanitized & certified ornaments", "Doorstep delivery & secure return", "Personal styling consultation"].map((f) => (
              <li key={f} className="flex items-center gap-3 text-foreground/80">
                <span className="inline-block w-1.5 h-1.5 rotate-45 bg-[color:var(--gold)]" />
                <span className="text-sm">{f}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex gap-4">
            <GoldButton as="a" href="#contact">Reserve Now</GoldButton>
            <GoldButton as="a" href="#contact" variant="outline">View Packages</GoldButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ===== ABOUT ===== */
export function About() {
  const highlights = [
    "Authentic Antique Designs",
    "Premium Craftsmanship",
    "Rental & Purchase Services",
    "Personalized Support",
    "Trusted Quality",
  ];
  return (
    <section id="about" className="relative py-28 bg-[color:var(--ivory)]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
        <Reveal>
          <div className="relative grid grid-cols-2 gap-4">
            <img src={allJewelry[9]} alt="Antique gold bridal necklace from Cheluve Creations collection" className="w-full aspect-[3/4] object-cover" />
            <img src={allJewelry[10]} alt="Handcrafted temple jewelry set displayed on velvet" className="w-full aspect-[3/4] object-cover mt-10" />

            <div className="absolute -inset-3 border border-[color:var(--gold)]/30 pointer-events-none" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Eyebrow>Our Story</Eyebrow>
          <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.6rem)] leading-tight">
            The Story Behind <span className="italic gold-gradient-text">Cheluve Creations</span>
          </h2>
          <p className="mt-6 text-foreground/70 leading-relaxed max-w-xl">
            Cheluve Creations celebrates heritage, elegance and craftsmanship through carefully curated antique
            ornament collections designed for modern women who cherish timeless beauty.
          </p>
          <p className="mt-4 text-foreground/65 leading-relaxed max-w-xl italic font-display">
            “Alankara is not only adornment — it is memory, ritual, and story worn close to the heart.”
          </p>
          <div className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {highlights.map((h) => (
              <div key={h} className="flex items-center gap-3 text-foreground/85 text-sm">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--gold)] text-gold">✦</span>
                {h}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ===== WHY ===== */
export function WhyUs() {
  const items: Array<[string, string, any]> = [
    ["Authentic Antique Designs", "Curated from trusted heritage artisans.", BadgeCheck],
    ["Premium Quality", "Inspected, polished and certified pieces.", Gem],
    ["Flexible Rental Options", "Daily, weekly and event-based packages.", CalendarRange],
    ["Exclusive Collections", "Limited-edition bridal and temple lines.", Crown],
    ["Personalized Assistance", "Styling guidance for every occasion.", HeadphonesIcon],
    ["Trusted Customer Experience", "Loved by 500+ Cheluves and counting.", ShieldCheck],
  ];
  return (
    <section className="relative py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal className="text-center">
          <Eyebrow>Why Choose Us</Eyebrow>
          <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.6rem)]">
            The Cheluve <span className="italic gold-gradient-text">Promise</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(([t, d, Icon], i) => (
            <Reveal key={t as string} delay={(i % 3) * 0.08}>
              <div className="group relative h-full p-9 bg-card border border-border hover:border-[color:var(--gold)]/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(91,44,131,0.25)]">
                <div className="flex items-center justify-between mb-5">
                  <div className="font-display text-3xl gold-gradient-text">0{i + 1}</div>
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--gold)]/40 text-gold transition-all duration-500 group-hover:bg-[color:var(--gold)]/10 group-hover:scale-110">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="font-display text-xl text-royal">{t}</h3>
                <p className="mt-3 text-sm text-foreground/65 leading-relaxed">{d}</p>
                <div className="absolute bottom-0 left-0 h-px w-0 bg-[color:var(--gold)] transition-all duration-700 group-hover:w-full" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== GALLERY — infinite luxury marquee ===== */
export function Gallery() {
  const imgs = allJewelry.slice(0, 12);
  const strip = [...imgs, ...imgs];
  return (
    <section id="gallery" className="relative py-28 bg-[color:var(--ivory)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal className="text-center">
          <Eyebrow>Showcase Gallery</Eyebrow>
          <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.6rem)]">
            A Glimpse Into Our <span className="italic gold-gradient-text">Atelier</span>
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-foreground/65">
            A continuous showcase of curated heirloom pieces — hover to pause and admire.
          </p>
        </Reveal>
      </div>

      <div
        className="relative mt-14 group"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex w-max gap-6 px-6 animate-cheluve-marquee group-hover:[animation-play-state:paused]">
          {strip.map((src, i) => (
            <div
              key={i}
              className="relative shrink-0 w-[240px] md:w-[300px] aspect-[4/5] overflow-hidden bg-card shadow-[0_18px_40px_-22px_rgba(91,44,131,0.35)] border border-[color:var(--gold)]/15"
            >
              <img
                src={src}
                alt="Cheluve Creations antique jewelry showcase piece"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[1400ms] hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 ring-0 hover:ring-1 ring-[color:var(--gold)] transition-all" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== TESTIMONIALS — auto-slide carousel ===== */
export function Testimonials() {
  const t = [
    { q: "I absolutely loved the jewellery. The design is beautiful and it looks exactly as shown.", n: "Sanjana", r: "Happy Customer" },
    { q: "The jewellery is exquisite, lightweight, adjustable, and versatile for different occasions.", n: "Bhoomika", r: "Happy Customer" },
    { q: "Cheluve Creations offers beautiful, high-quality jewellery at great prices. Highly recommended.", n: "Gowthami", r: "Happy Customer" },
  ];

  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % t.length), 5000);
    return () => clearInterval(id);
  }, [paused, t.length]);

  const go = (d: number) => setIdx((i) => (i + d + t.length) % t.length);

  return (
    <section className="relative py-28">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <Reveal className="text-center">
          <Eyebrow>Cheluve Voices</Eyebrow>
          <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.6rem)]">
            Words From Our <span className="italic gold-gradient-text">Customers</span>
          </h2>
        </Reveal>

        <div
          className="relative mt-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative mx-auto max-w-3xl">
            <div className="relative bg-card border border-[color:var(--gold)]/30 px-8 md:px-14 py-12 md:py-16 text-center shadow-[0_30px_70px_-30px_rgba(91,44,131,0.25)]">
              <div className="absolute top-3 left-3 w-4 h-4 border-l border-t border-[color:var(--gold)]/60" />
              <div className="absolute top-3 right-3 w-4 h-4 border-r border-t border-[color:var(--gold)]/60" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-l border-b border-[color:var(--gold)]/60" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-[color:var(--gold)]/60" />

              <div className="text-6xl font-display text-gold leading-none">“</div>
              <div className="relative min-h-[160px] md:min-h-[140px]">
                {t.map((x, i) => (
                  <motion.div
                    key={i}
                    initial={false}
                    animate={{ opacity: i === idx ? 1 : 0, y: i === idx ? 0 : 12 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{ pointerEvents: i === idx ? "auto" : "none" }}
                  >
                    <p className="text-foreground/80 italic font-display text-lg md:text-2xl leading-snug max-w-2xl">
                      {x.q}
                    </p>
                    <div className="mt-7 h-px w-12 bg-[color:var(--gold)]" />
                    <div className="mt-4">
                      <div className="text-sm font-medium text-royal">{x.n}</div>
                      <div className="text-[10px] tracking-[0.3em] uppercase text-foreground/55 mt-1">{x.r}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => go(-1)}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-11 w-11 items-center justify-center rounded-full bg-card border border-[color:var(--gold)]/40 text-royal hover:text-gold hover:border-[color:var(--gold)] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => go(1)}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-11 w-11 items-center justify-center rounded-full bg-card border border-[color:var(--gold)]/40 text-royal hover:text-gold hover:border-[color:var(--gold)] transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            {t.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setIdx(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === idx ? "w-8 bg-[color:var(--gold)]" : "w-2 bg-[color:var(--gold)]/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== CTA / CONTACT ===== */
export function CTA() {
  const floats = Array.from({ length: 14 });
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        "service_tc9rkep",
        "template_7euecno",
        {
          from_name: formState.name,
          from_email: formState.email,
          from_phone: formState.phone,
          message: formState.message,
        },
        { publicKey: "WD7RJ5a352VkQ8tql" }
      );
      setIsSent(true);
      setFormState({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      alert("Failed to send enquiry. Please try again or contact us via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 overflow-hidden" style={{ backgroundColor: "var(--royal)" }}>
      <GoldenParticles />

      <div className="pointer-events-none absolute -left-32 -top-32 w-[420px] h-[420px] rounded-full" style={{ background: "radial-gradient(circle, rgba(212,175,55,0.25), transparent 60%)" }} />
      <div className="pointer-events-none absolute -right-32 -bottom-32 w-[420px] h-[420px] rounded-full" style={{ background: "radial-gradient(circle, rgba(212,175,55,0.18), transparent 60%)" }} />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full" style={{ background: "radial-gradient(circle, rgba(221,232,216,0.12), transparent 65%)" }} />

      <div className="pointer-events-none absolute -left-24 top-12 w-[320px] h-[320px] opacity-[0.08] text-[color:var(--gold-soft)]">
        <LotusSVG />
      </div>
      <div className="pointer-events-none absolute -right-24 bottom-12 w-[320px] h-[320px] opacity-[0.08] text-[color:var(--gold-soft)] rotate-180">
        <LotusSVG />
      </div>

      <div className="pointer-events-none absolute inset-0">
        {floats.map((_, i) => {
          const left = Math.random() * 100;
          const size = Math.random() * 4 + 2;
          const dur = 8 + Math.random() * 8;
          const delay = Math.random() * 6;
          return (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${left}%`,
                bottom: -10,
                width: size,
                height: size,
                background: "radial-gradient(circle, #f4e4a8 0%, #C8A46D 60%, transparent 100%)",
                boxShadow: "0 0 10px rgba(226,201,160,0.6)",
              }}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -600, opacity: [0, 1, 0] }}
              transition={{ duration: dur, delay, repeat: Infinity, ease: "easeOut" }}
            />
          );
        })}
      </div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 text-[10px] tracking-[0.42em] uppercase text-[color:var(--gold-soft)]">
            <span className="h-px w-10 bg-[color:var(--gold)]" />
            For Your Special Day
            <span className="h-px w-10 bg-[color:var(--gold)]" />
          </div>
          <h2 className="mt-8 font-display text-[clamp(2.2rem,5vw,4rem)] leading-tight text-[color:var(--ivory)]">
            Contact <span className="italic gold-gradient-text">Cheluve Creations</span>
          </h2>
          <p className="mt-5 text-[color:var(--ivory)]/75 max-w-xl mx-auto leading-relaxed">
            Book a private viewing or enquire about our antique ornaments and heritage collections.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-14 items-start">
          {/* Left — Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <div className="relative bg-white/[0.07] backdrop-blur-xl border border-[color:var(--gold)]/25 rounded-sm p-8 md:p-10">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[color:var(--gold)]/50 to-transparent" />

              <div className="space-y-7">
                <div className="flex items-start gap-4 group">
                  <div className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:var(--gold)]/40 text-[color:var(--gold-soft)] transition-all duration-500 group-hover:bg-[color:var(--gold)]/10 group-hover:scale-110">
                    <Phone className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--gold-soft)]/80 mb-1">Phone</div>
                    <a href="tel:+919380637389" className="font-display text-lg text-[color:var(--ivory)]/95 hover:text-[color:var(--gold-soft)] transition-colors">
                      +91 93806 37389
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:var(--gold)]/40 text-[color:var(--gold-soft)] transition-all duration-500 group-hover:bg-[color:var(--gold)]/10 group-hover:scale-110">
                    <Mail className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--gold-soft)]/80 mb-1">Email</div>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="font-display text-lg text-[color:var(--ivory)]/95 hover:text-[color:var(--gold-soft)] transition-colors">
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:var(--gold)]/40 text-[color:var(--gold-soft)] transition-all duration-500 group-hover:bg-[color:var(--gold)]/10 group-hover:scale-110">
                    <Clock className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--gold-soft)]/80 mb-1">Business Hours</div>
                    <p className="font-display text-lg text-[color:var(--ivory)]/95">Mon – Sat: 10:00 AM – 7:00 PM</p>
                    <p className="font-display text-base text-[color:var(--ivory)]/60">Sunday: By Appointment</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:var(--gold)]/40 text-[color:var(--gold-soft)] transition-all duration-500 group-hover:bg-[color:var(--gold)]/10 group-hover:scale-110">
                    <MapPin className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--gold-soft)]/80 mb-1">Location</div>
                    <p className="font-display text-lg text-[color:var(--ivory)]/95">{CONTACT_LOCATION}</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="mt-10 pt-8 border-t border-[color:var(--gold)]/20">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative inline-flex w-full items-center justify-center gap-3 px-7 py-4 text-[11px] tracking-[0.28em] uppercase font-medium overflow-hidden transition-all duration-500 rounded-sm"
                  style={{
                    background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                    boxShadow: "0 10px 30px -12px rgba(37,211,102,0.5)",
                  }}
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.35)_50%,transparent_70%)]" />
                  <MessageCircle className="w-4 h-4 relative z-10" strokeWidth={2} />
                  <span className="relative z-10 text-white">Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative bg-white/[0.07] backdrop-blur-xl border border-[color:var(--gold)]/25 rounded-sm p-8 md:p-10">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[color:var(--gold)]/50 to-transparent" />

              {isSent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="py-16 text-center"
                >
                  <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[color:var(--gold)]/40 text-[color:var(--gold)]">
                    <Check className="w-6 h-6" strokeWidth={2} />
                  </div>
                  <h3 className="font-display text-2xl text-[color:var(--ivory)]">Enquiry Sent</h3>
                  <p className="mt-3 text-[color:var(--ivory)]/70 max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out. We will get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSent(false)}
                    className="mt-7 text-[10px] tracking-[0.28em] uppercase text-[color:var(--gold-soft)] hover:text-[color:var(--gold)] transition-colors"
                  >
                    Send another enquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2.5">
                      <Label htmlFor="name" className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--gold-soft)]/80 font-normal">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="h-11 rounded-sm border-[color:var(--gold)]/25 bg-white/[0.05] text-[color:var(--ivory)] placeholder:text-[color:var(--ivory)]/30 focus-visible:border-[color:var(--gold)] focus-visible:ring-[color:var(--gold)]/30 transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <Label htmlFor="email" className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--gold-soft)]/80 font-normal">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="h-11 rounded-sm border-[color:var(--gold)]/25 bg-white/[0.05] text-[color:var(--ivory)] placeholder:text-[color:var(--ivory)]/30 focus-visible:border-[color:var(--gold)] focus-visible:ring-[color:var(--gold)]/30 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <Label htmlFor="phone" className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--gold-soft)]/80 font-normal">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formState.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="h-11 rounded-sm border-[color:var(--gold)]/25 bg-white/[0.05] text-[color:var(--ivory)] placeholder:text-[color:var(--ivory)]/30 focus-visible:border-[color:var(--gold)] focus-visible:ring-[color:var(--gold)]/30 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2.5">
                    <Label htmlFor="message" className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--gold-soft)]/80 font-normal">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Tell us about your enquiry..."
                      rows={5}
                      required
                      className="rounded-sm border-[color:var(--gold)]/25 bg-white/[0.05] text-[color:var(--ivory)] placeholder:text-[color:var(--ivory)]/30 focus-visible:border-[color:var(--gold)] focus-visible:ring-[color:var(--gold)]/30 transition-all duration-300 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative inline-flex w-full items-center justify-center gap-3 px-7 py-4 text-[11px] tracking-[0.28em] uppercase font-medium overflow-hidden transition-all duration-500 rounded-sm border border-[color:var(--gold)]/40 text-[color:var(--gold-soft)] hover:text-[color:var(--royal)] hover:border-[color:var(--gold)] hover:bg-[color:var(--gold)] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.35)_50%,transparent_70%)]" />
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 relative z-10 animate-spin" strokeWidth={2} />
                    ) : (
                      <Send className="w-4 h-4 relative z-10" strokeWidth={2} />
                    )}
                    <span className="relative z-10">{isSubmitting ? "Sending..." : "Send Enquiry"}</span>
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ===== FOOTER ===== */
export function Footer() {
  return (
    <footer className="relative bg-[color:var(--ivory)] border-t border-[color:var(--gold)]/20">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <LogoSmall />
            <div>
              <div className="font-display text-xl text-royal">Cheluve Creations</div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-foreground/55">Alankara of Every Cheluve</div>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm text-foreground/65 leading-relaxed">
            Premium antique ornament sales & rentals — handcrafted heirloom pieces for brides, families and
            timeless celebrations.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank" rel="noreferrer"
              aria-label="Cheluve Creations on Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--gold)]/40 text-royal hover:text-gold hover:border-[color:var(--gold)] transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank" rel="noreferrer"
              aria-label="Chat on WhatsApp"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--gold)]/40 text-royal hover:text-gold hover:border-[color:var(--gold)] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-royal mb-5">Quick Links</div>
          <ul className="space-y-2 text-sm text-foreground/70">
            {["Home", "Collections", "Rental", "Gallery", "About", "Contact"].map((l) => (
              <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-gold transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-royal mb-5">Contact</div>
          <ul className="space-y-3 text-sm text-foreground/70">
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2 hover:text-gold transition-colors">
                <Mail className="w-4 h-4 text-gold" strokeWidth={1.5} />
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <a href="tel:+919380637389" className="inline-flex items-center gap-2 hover:text-gold transition-colors">
                <Phone className="w-4 h-4 text-gold" strokeWidth={1.5} />
                {CONTACT_PHONE_DISPLAY}
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold" strokeWidth={1.5} />
              {CONTACT_LOCATION}
            </li>
            <li className="pt-2 flex gap-4">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="hover:text-gold transition-colors">WhatsApp</a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="hover:text-gold transition-colors">Instagram</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[color:var(--gold)]/15">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-wrap items-center justify-between gap-3 text-[11px] text-foreground/55">
          <div>© {new Date().getFullYear()} Cheluve Creations. All rights reserved.</div>
          <div className="tracking-[0.3em] uppercase text-[10px]">Crafted with heritage & love</div>
        </div>
      </div>
    </footer>
  );
}

function LogoSmall() {
  return <img src={logo} alt="Cheluve Creations Logo" className="h-12 w-12 rounded-full object-cover ring-1 ring-[color:var(--gold)]/40" />;
}
