import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { LuxuryLoader, WhatsAppFAB } from "@/components/cheluve/primitives";
import { Navbar } from "@/components/cheluve/Navbar";
import {
  Hero, Collections, Rental, About, WhyUs, Gallery, Testimonials, CTA, Footer,
} from "@/components/cheluve/Sections";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cheluve Creations — Alankara of Every Cheluve" },
      { name: "description", content: "Premium antique ornament sales & rentals — heirloom bridal jewelry, temple sets and curated collections for every Cheluve." },
      { property: "og:title", content: "Cheluve Creations — Alankara of Every Cheluve" },
      { property: "og:description", content: "Premium antique ornament sales & rentals — heirloom bridal jewelry, temple sets and curated collections for every Cheluve." },
    ],
  }),
  component: Index,
});

function Index() {
  // If the URL already targets an in-page anchor (e.g. #contact coming from
  // the standalone collections page), skip the splash entirely and let the
  // browser scroll to that section immediately.
  const initialHash =
    typeof window !== "undefined" ? window.location.hash : "";
  const skipSplash = initialHash === "#contact";
  const [loading, setLoading] = useState(!skipSplash);

  // Lock scroll while splash is up, and ensure we always start at the Hero
  // (not at any hash like #contact left in the URL) — unless we intentionally
  // arrived at an anchor, in which case we honor it.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (loading) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      // Strip any hash so the browser doesn't auto-scroll on layout
      if (window.location.hash) {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
      window.scrollTo(0, 0);
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    } else if (skipSplash && window.location.hash) {
      // Scroll to the requested anchor once mounted
      const id = window.location.hash.slice(1);
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "auto", block: "start" });
      });
    } else {
      // Force top after splash exits
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [loading, skipSplash]);


  return (
    <div className="relative">
      <AnimatePresence>{loading && <LuxuryLoader onDone={() => setLoading(false)} />}</AnimatePresence>
      <Navbar />
      <main>
        <Hero />
        <Collections />
        <Rental />
        <About />
        <WhyUs />
        <Gallery />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
