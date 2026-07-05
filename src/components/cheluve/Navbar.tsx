import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { logo, GoldButton } from "./primitives";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Collections", href: "#collections" },
  { label: "Products", href: "#rental" },
  { label: "Portfolio", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "glass-nav" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <img src={logo} alt="Cheluve Creations" className="h-12 w-12 rounded-full object-cover ring-1 ring-[color:var(--gold)]/40" />
          <div className="hidden sm:block leading-tight">
            <div className="font-display text-lg text-royal">Cheluve Creations</div>
            <div className="text-[9px] tracking-[0.35em] uppercase text-foreground/55">Alankara of Every Cheluve</div>
          </div>
        </a>
        <nav className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="relative text-[12px] tracking-[0.22em] uppercase text-foreground/75 hover:text-royal transition-colors group">
              {l.label}
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-px w-0 bg-[color:var(--gold)] transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-4">
          <GoldButton as="a" href="#contact">Enquire Now</GoldButton>
        </div>
        <button onClick={() => setOpen(!open)} aria-label="Menu" className="lg:hidden flex flex-col gap-1.5 p-2">
          <span className={`block h-px w-6 bg-foreground transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`block h-px w-6 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block h-px w-6 bg-foreground transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden glass-nav overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map((l) => (
                <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="text-sm tracking-[0.22em] uppercase text-foreground/80">
                  {l.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="text-sm tracking-[0.22em] uppercase text-gold">Enquire Now</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
