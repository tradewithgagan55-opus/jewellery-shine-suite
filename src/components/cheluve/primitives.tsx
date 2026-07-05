import { motion, useScroll, useTransform, useInView, animate, useMotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";

export const WHATSAPP_NUMBER = "919380637389";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Cheluve Creations, I would like to know more about your jewellery collections.")}`;
export const CONTACT_EMAIL = "cheluvecreations@gmail.com";
export const CONTACT_PHONE_DISPLAY = "+91 93806 37389";
export const CONTACT_LOCATION = "Bengaluru, Karnataka";
export const INSTAGRAM_URL = "https://www.instagram.com/cheluve.creations";

// --- Floating WhatsApp button ---
export function WhatsAppFAB() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed z-[80] bottom-5 right-5 md:bottom-7 md:right-7 group"
    >
      <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/40" aria-hidden />
      <span
        className="relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)] transition-transform duration-300 group-hover:scale-110"
        style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
      >
        <MessageCircle className="w-7 h-7" strokeWidth={2.2} />
      </span>
    </a>
  );
}

import logoAsset from "@/assets/cheluve-logo.png.asset.json";
const logo = logoAsset.url;
import img05 from "@/assets/jewelry/IMG-20260606-WA0005.jpg";
import img06 from "@/assets/jewelry/IMG-20260606-WA0006.jpg";
import img07 from "@/assets/jewelry/IMG-20260606-WA0007.jpg";
import img08 from "@/assets/jewelry/IMG-20260606-WA0008.jpg";
import img09 from "@/assets/jewelry/IMG-20260606-WA0009.jpg";
import img10 from "@/assets/jewelry/IMG-20260606-WA0010.jpg";
import img11 from "@/assets/jewelry/IMG-20260606-WA0011.jpg";
import img12 from "@/assets/jewelry/IMG-20260606-WA0012.jpg";
import img13 from "@/assets/jewelry/IMG-20260606-WA0013.jpg";
import img14 from "@/assets/jewelry/IMG-20260606-WA0014.jpg";
import img15 from "@/assets/jewelry/IMG-20260606-WA0015.jpg";
import img16 from "@/assets/jewelry/IMG-20260606-WA0016.jpg";
import img17 from "@/assets/jewelry/IMG-20260606-WA0017.jpg";
import img18 from "@/assets/jewelry/IMG-20260606-WA0018.jpg";
import img19 from "@/assets/jewelry/IMG-20260606-WA0019.jpg";
import img20 from "@/assets/jewelry/IMG-20260606-WA0020.jpg";
import img21 from "@/assets/jewelry/IMG-20260606-WA0021.jpg";
import img22 from "@/assets/jewelry/IMG-20260606-WA0022.jpg";
import img23 from "@/assets/jewelry/IMG-20260606-WA0023.jpg";
import img24 from "@/assets/jewelry/IMG-20260606-WA0024.jpg";

export const allJewelry = [
  img05, img06, img07, img08, img09, img10, img11, img12, img13, img14,
  img15, img16, img17, img18, img19, img20, img21, img22, img23, img24,
];
export { logo };

// --- Luxury Splash Loader ---
export function LuxuryLoader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);

  const petals = Array.from({ length: 10 });
  const sparkles = Array.from({ length: 18 });

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 35%, #FFFDF8 0%, #EEF4EA 45%, #DDE8D8 100%)",
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
    >
      {/* Soft bokeh */}
      <div className="pointer-events-none absolute inset-0">
        {[
          { l: "10%", t: "20%", s: 220, c: "#DDE8D8" },
          { l: "78%", t: "15%", s: 260, c: "#E2C9A0" },
          { l: "65%", t: "75%", s: 300, c: "#DDE8D8" },
          { l: "20%", t: "78%", s: 200, c: "#C8A46D" },
          { l: "45%", t: "8%", s: 160, c: "#5A3E8B" },
        ].map((b, i) => (
          <span
            key={i}
            className="absolute rounded-full blur-3xl opacity-30"
            style={{ left: b.l, top: b.t, width: b.s, height: b.s, background: b.c }}
          />
        ))}
      </div>

      {/* Liquid splash rings behind logo */}
      <div className="relative flex items-center justify-center">
        {[0, 0.35, 0.7].map((delay, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              width: 260,
              height: 260,
              background:
                "radial-gradient(circle, rgba(221,232,216,0.55) 0%, rgba(221,232,216,0) 70%)",
              border: "1px solid rgba(200,164,109,0.35)",
            }}
            initial={{ scale: 0.4, opacity: 0.8 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 2.4, delay, repeat: Infinity, ease: "easeOut" }}
          />
        ))}

        {/* Soft glow */}
        <motion.span
          className="absolute rounded-full"
          style={{
            width: 320,
            height: 320,
            background:
              "radial-gradient(circle, rgba(200,164,109,0.45) 0%, rgba(200,164,109,0) 65%)",
            filter: "blur(8px)",
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: [0, 0.9, 0.7], scale: [0.85, 1.05, 1] }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div
            className="rounded-full overflow-hidden"
            style={{
              boxShadow:
                "0 30px 80px -30px rgba(90,62,139,0.35), 0 10px 30px -10px rgba(200,164,109,0.45), inset 0 0 0 2px rgba(200,164,109,0.35)",
            }}
          >
            <img
              src={logo}
              alt="Cheluve Creations"
              width={240}
              height={240}
              className="w-44 h-44 md:w-56 md:h-56 object-cover"
              fetchPriority="high"
              decoding="async"
            />
          </div>

          {/* Water ripple reflection */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-56 h-12 overflow-hidden opacity-50"
            style={{
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)",
            }}
          >
            <motion.img
              src={logo}
              alt=""
              aria-hidden
              className="w-56 h-56 object-cover scale-y-[-1]"
              animate={{ skewX: [0, 2, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* Floating lotus petals */}
        {petals.map((_, i) => {
          const angle = (i / petals.length) * Math.PI * 2;
          const radius = 170 + (i % 3) * 18;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <motion.svg
              key={i}
              width="22"
              height="32"
              viewBox="0 0 22 32"
              className="absolute"
              style={{ left: "50%", top: "50%" }}
              initial={{ x, y, opacity: 0, rotate: (i * 36) % 360, scale: 0.6 }}
              animate={{
                x: [x, x + (i % 2 ? 14 : -14), x],
                y: [y, y - 18, y],
                opacity: [0, 0.9, 0.6],
                rotate: [(i * 36) % 360, ((i * 36) % 360) + 25],
              }}
              transition={{
                duration: 4 + (i % 4),
                delay: 0.4 + i * 0.12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <path
                d="M11 1 C16 8 20 16 11 31 C2 16 6 8 11 1 Z"
                fill="#5A3E8B"
                fillOpacity="0.55"
                stroke="#C8A46D"
                strokeOpacity="0.7"
                strokeWidth="0.6"
              />
            </motion.svg>
          );
        })}

        {/* Sparkles */}
        {sparkles.map((_, i) => {
          const left = 50 + (Math.random() - 0.5) * 70;
          const top = 50 + (Math.random() - 0.5) * 70;
          return (
            <motion.span
              key={`sp-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: Math.random() * 3 + 1.5,
                height: Math.random() * 3 + 1.5,
                background:
                  "radial-gradient(circle, #f4e4a8 0%, #C8A46D 60%, transparent 100%)",
                boxShadow: "0 0 10px #E2C9A0",
              }}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: [0, 1, 0], scale: [0.4, 1.2, 0.4] }}
              transition={{
                duration: 2.2 + Math.random() * 1.5,
                delay: Math.random() * 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-14 flex flex-col items-center"
      >
        <div className="flex items-center gap-4">
          <span className="h-px w-12" style={{ background: "linear-gradient(90deg, transparent, #C8A46D)" }} />
          <span className="w-1.5 h-1.5 rotate-45" style={{ background: "#C8A46D" }} />
          <span className="h-px w-12" style={{ background: "linear-gradient(90deg, #C8A46D, transparent)" }} />
        </div>
        <p
          className="mt-4 font-display italic text-lg md:text-xl tracking-wide"
          style={{ color: "#5A3E8B" }}
        >
          Alankara of Every Cheluve
        </p>
        <p className="mt-2 text-[10px] tracking-[0.5em] uppercase" style={{ color: "rgba(90,62,139,0.55)" }}>
          Cheluve Creations
        </p>
      </motion.div>

      {/* Glass overlay sheen */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(221,232,216,0.4) 100%)",
          backdropFilter: "blur(0.5px)",
        }}
      />
    </motion.div>
  );
}

// --- Floating particles ---
export function GoldenParticles() {
  const dots = Array.from({ length: 22 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 4,
    size: Math.random() * 3 + 1.5,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full animate-sparkle"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            background: "radial-gradient(circle, #f4e4a8 0%, #d4af37 60%, transparent 100%)",
            boxShadow: "0 0 8px #e6c887",
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// --- Counter ---
export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const [val, setVal] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const c = animate(mv, to, { duration: 2, ease: [0.16, 1, 0.3, 1] });
    const unsub = mv.on("change", (v) => setVal(Math.round(v).toString()));
    return () => { c.stop(); unsub(); };
  }, [inView, to, mv]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// --- Magnetic / shimmer button ---
export function GoldButton({
  children, variant = "solid", as: As = "button", href, onClick,
}: { children: React.ReactNode; variant?: "solid" | "outline" | "ghost"; as?: any; href?: string; onClick?: () => void }) {
  const base = "group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[11px] tracking-[0.28em] uppercase font-medium overflow-hidden transition-all duration-500";
  const variants: Record<string, string> = {
    solid: "text-foreground bg-[linear-gradient(135deg,#e6c887_0%,#d4af37_50%,#b8860b_100%)] shadow-[0_10px_30px_-12px_rgba(184,134,11,0.6)] hover:shadow-[0_18px_40px_-12px_rgba(184,134,11,0.8)]",
    outline: "text-royal border border-[color:var(--gold)] hover:bg-[color:var(--gold)]/10",
    ghost: "text-foreground/80 hover:text-royal",
  };
  const Comp = As as any;
  return (
    <Comp href={href} onClick={onClick} className={`${base} ${variants[variant]}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.55)_50%,transparent_70%)]" />
    </Comp>
  );
}

// --- Section reveal ---
export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// --- Eyebrow label with hairlines ---
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-4 text-[10px] tracking-[0.42em] uppercase text-royal/80">
      <span className="h-px w-10 bg-[color:var(--gold)]" />
      <span>{children}</span>
      <span className="h-px w-10 bg-[color:var(--gold)]" />
    </div>
  );
}

// Parallax helper
export function useParallax(range = 60) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);
  return { ref, y };
}
