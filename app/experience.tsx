"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const MENU_URL = "https://oddmenu.com/ro/p/jai-bistrot";
const PHONE_URL = "tel:+40790229922";
const MAP_URL = "https://maps.app.goo.gl/fXnpY5SNCzx6pQhR7";
const INSTAGRAM_URL = "https://www.instagram.com/jaibistrotb/";
const FACEBOOK_URL = "https://www.facebook.com/JaiBistrotBucuresti/";

const moments = [
  {
    src: "/images/jai-interior.jpg",
    alt: "Interiorul J’ai Bistrot, cu zid de cărămidă și tablouri cu porci zburători",
    title: "Un loc cu poveste",
    note: "J’ai Bistrot",
    width: 2549,
    height: 1211,
  },
  {
    src: "/images/jai-garden-dusk.jpg",
    alt: "Oaspeți în grădina J’ai Bistrot, sub lumini suspendate",
    title: "Seara în grădină",
    note: "J’ai Bistrot",
    width: 740,
    height: 900,
  },
  {
    src: "/images/jai-night-event.jpg",
    alt: "O petrecere silent disco la J’ai Bistrot",
    title: "Muzică și întâlniri",
    note: "J’ai Bistrot",
    width: 2549,
    height: 1211,
  },
  {
    src: "/images/jai-flying-pig.jpg",
    alt: "Detaliu cu emblema porcului zburător la J’ai Bistrot",
    title: "The Flying Pigs",
    note: "J’ai Bistrot",
    width: 740,
    height: 450,
  },
];

export default function Experience() {
  const rootRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const momentsRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const navigateFromSheet = (id: string) => {
    window.setTimeout(() => {
      window.history.pushState(null, "", `#${id}`);
      document.getElementById(id)?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    }, 320);
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      gsap.fromTo(
        ".hero-copy > .hero-eyebrow, .hero h1, .hero-intro, .hero-cta-row",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.95, stagger: 0.11, ease: "power3.out", clearProps: "all" },
      );
      gsap.fromTo(
        ".hero-photo",
        { scale: 1.07, opacity: 0.75 },
        { scale: 1, opacity: 1, duration: 1.3, ease: "power3.out", clearProps: "transform,opacity" },
      );

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 28,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 84%",
            toggleActions: "play none none reverse",
          },
        });
      });

      media.add("(min-width: 768px)", () => {
        const scene = sceneRef.current;
        if (!scene) return;
        gsap.set(scene.querySelector(".scene-night"), { opacity: 0 });
        gsap.set(scene.querySelector(".scene-night-content"), { opacity: 0, y: 36 });

        gsap.timeline({
          scrollTrigger: {
            trigger: scene,
            start: "top top",
            end: "+=140%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
          .fromTo(scene.querySelector(".scene-day-photo"), { scale: 1.08 }, { scale: 1, duration: 0.55, ease: "none" }, 0)
          .to(scene.querySelector(".scene-day-content"), { opacity: 0, y: -32, duration: 0.22, ease: "none" }, 0.35)
          .to(scene.querySelector(".scene-night"), { opacity: 1, duration: 0.48, ease: "none" }, 0.38)
          .to(scene.querySelector(".scene-night-content"), { opacity: 1, y: 0, duration: 0.32, ease: "none" }, 0.62);
      });

      const section = momentsRef.current;
      const track = trackRef.current;
      const viewport = section?.querySelector<HTMLElement>(".moments-viewport");
      if (section && track && viewport) {
        const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${Math.max(distance(), 1)}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <main ref={rootRef}>
      <section className="hero" id="acasa" aria-labelledby="hero-title">
        <header className="site-header">
          <a className="brand" href="#acasa" aria-label="J’ai Bistrot — acasă">
            <span className="brand-mark"><Image src="/images/jai-logo.png" alt="" width={187} height={29} priority /></span>
            <span className="brand-name">J’ai Bistrot</span>
          </a>
          <nav className="header-actions" aria-label="Navigație principală">
            <a className="header-story" href="#povestea">Povestea</a>
            <a className="header-menu" href={MENU_URL} target="_blank" rel="noopener noreferrer">Meniu</a>
            <a className="header-story" href="#gradina">Grădina</a>
            <a className="header-story" href="#contact">Contact</a>
            <a className="header-reserve" href={PHONE_URL}>Rezervă o masă</a>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <button type="button" className="mobile-menu-button" aria-label="Deschide meniul"><Menu size={22} strokeWidth={1.6} /></button>
            </SheetTrigger>
            <SheetContent side="right" showCloseButton={false} className="mobile-sheet">
              <SheetHeader className="mobile-sheet-header">
                <SheetTitle className="mobile-sheet-title">J’ai Bistrot</SheetTitle>
                <SheetClose asChild><button type="button" aria-label="Închide meniul" className="mobile-sheet-close"><X size={24} /></button></SheetClose>
              </SheetHeader>
              <nav className="mobile-sheet-links" aria-label="Navigație mobilă">
                <SheetClose asChild><button type="button" onClick={() => navigateFromSheet("povestea")}>Povestea</button></SheetClose>
                <SheetClose asChild><button type="button" onClick={() => navigateFromSheet("gradina")}>Grădina</button></SheetClose>
                <SheetClose asChild><button type="button" onClick={() => navigateFromSheet("momente")}>Momente</button></SheetClose>
                <SheetClose asChild><button type="button" onClick={() => navigateFromSheet("contact")}>Contact</button></SheetClose>
              </nav>
              <div className="mobile-sheet-bottom">
                <a href={MENU_URL} target="_blank" rel="noopener noreferrer">Vezi meniul actual</a>
                <a href={PHONE_URL}>Rezervă telefonic · 0790 229 922</a>
              </div>
            </SheetContent>
          </Sheet>
        </header>

        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">București · Calea Griviței 55</p>
          <h1 id="hero-title">J’AI <em>BISTROT.</em></h1>
          <p className="hero-intro">Mâncare bună, grădină vie și seri care capătă ritmul lor.</p>
          <div className="hero-cta-row">
            <a className="button button-light" href={MENU_URL} target="_blank" rel="noopener noreferrer">Descoperă meniul</a>
            <a className="button button-outline" href={PHONE_URL}>Rezervă telefonic</a>
          </div>
          <div className="hero-footnote"><span className="fine-rule" aria-hidden="true" /><span>Home of the Flying Pigs</span></div>
        </div>
        <div className="hero-visual">
          <Image className="hero-photo" src="/images/jai-garden-dusk.jpg" alt="Oaspeți în grădina J’ai Bistrot, sub lumini suspendate" fill sizes="(max-width: 767px) 100vw, 46vw" priority />
          <div className="photo-counter" aria-hidden="true"><span>J’ai Bistrot</span><span>Grădina, după apus</span></div>
        </div>
      </section>

      <div className="mood-ticker" aria-label="Mâncare bună, grădină vie, seri lungi">
        <div className="mood-ticker-track" aria-hidden="true">
          {[0, 1].map((run) => (
            <div className="mood-ticker-run" key={run}>
              <span>MÂNCARE BUNĂ</span><b>✳</b><span>GRĂDINĂ VIE</span><b>✳</b><span>SERI LUNGI</span><b>✳</b>
            </div>
          ))}
        </div>
      </div>

      <section className="intro-section" id="povestea" aria-labelledby="intro-title">
        <div className="intro-grid">
          <div className="intro-title-wrap" data-reveal>
            <p className="eyebrow dark-eyebrow">București, Calea Griviței 55</p>
            <h2 id="intro-title">BINE AI VENIT <em>LA J’AI.</em></h2>
          </div>
          <div className="intro-body" data-reveal>
            <p>Pe Griviței 55 se întâlnesc bistroul, grădina și oamenii care dau locului viață.</p>
            <p>Vino cu poftă. Adu-ți prietenii. Găsește-ți locul la masă.</p>
          </div>
        </div>
        <figure className="intro-photo" data-reveal>
          <Image src="/images/jai-interior.jpg" alt="Interiorul J’ai Bistrot, cu flori, cărămidă și tablouri cu porci zburători" fill sizes="(max-width: 767px) 100vw, 88vw" />
          <figcaption>Un colț din J’ai Bistrot</figcaption>
        </figure>
      </section>

      <section className="time-section" id="gradina" aria-label="Din lumină, spre seară">
        <div className="time-scene-desktop" ref={sceneRef}>
          <div className="scene-layer scene-day">
            <Image className="scene-day-photo" src="/images/garden-hour-courtyard.webp" alt="Imagine de atmosferă cu oameni la mese într-o curte verde" fill sizes="100vw" />
            <div className="scene-shade" />
          </div>
          <div className="scene-layer scene-night">
            <Image src="/images/jai-garden-night.jpg" alt="Grădina J’ai Bistrot într-o seară cu oaspeți" fill sizes="100vw" />
            <div className="scene-shade scene-shade-night" />
          </div>
          <div className="scene-content scene-day-content"><p className="eyebrow">La soare, la masă</p><h2>GRĂDINA <em>PRINDE VIAȚĂ.</em></h2><p>Prânzuri lungi și conversații fără grabă.</p><small>Imagine de atmosferă</small></div>
          <div className="scene-content scene-night-content"><p className="eyebrow">După apus</p><h2>SEARA <em>E A NOASTRĂ.</em></h2><p>Lumini, muzică și încă un motiv să mai stai.</p><small>Fotografie din J’ai Bistrot</small></div>
          <div className="scene-progress" aria-hidden="true"><span>ZI</span><span className="scene-progress-line"/><span>SEARĂ</span></div>
        </div>
        <div className="time-scene-mobile">
          <figure className="mobile-time-panel"><Image src="/images/garden-hour-courtyard.webp" alt="Imagine de atmosferă cu oameni la mese într-o curte verde" fill sizes="100vw" /><div className="mobile-time-shade"/><figcaption><span className="eyebrow">La soare, la masă</span><strong>GRĂDINA <em>PRINDE VIAȚĂ.</em></strong><small>Imagine de atmosferă</small></figcaption></figure>
          <figure className="mobile-time-panel"><Image src="/images/jai-garden-night.jpg" alt="Grădina J’ai Bistrot într-o seară cu oaspeți" fill sizes="100vw" /><div className="mobile-time-shade"/><figcaption><span className="eyebrow">După apus</span><strong>SEARA <em>E A NOASTRĂ.</em></strong><small>Fotografie din J’ai Bistrot</small></figcaption></figure>
        </div>
      </section>

      <section className="menu-section" id="meniu" aria-labelledby="menu-title">
        <div className="menu-image-wrap" data-reveal>
          <Image src="/images/garden-hour-table.webp" alt="Imagine de atmosferă cu oameni împărțind preparate la masă" fill sizes="(max-width: 767px) 100vw, 48vw" />
          <span className="image-credit">Imagine de atmosferă</span>
        </div>
        <div className="menu-copy" data-reveal>
          <p className="eyebrow">În jurul mesei</p>
          <h2 id="menu-title">POFTĂ DE <em>J’AI?</em></h2>
          <p>Brunch, farfurii de bistro și ceva bun în pahar. Descoperă meniul actual.</p>
          <div className="menu-categories" aria-label="Categorii din meniu"><span>Brunch</span><span>Bucătărie</span><span>Bar</span></div>
          <a className="button button-dark" href={MENU_URL} target="_blank" rel="noopener noreferrer">Vezi meniul actual</a>
        </div>
      </section>

      <section className="moments-section" id="momente" ref={momentsRef} aria-labelledby="moments-title">
        <div className="moments-heading" data-reveal>
          <p className="eyebrow">Momente la J’ai</p>
          <h2 id="moments-title">AICI SE <em>ÎNTÂMPLĂ.</em></h2>
          <p>Grădină, prieteni, muzică. Restul se vede mai bine decât se povestește.</p>
        </div>
        <div className="moments-viewport" aria-label="Galerie foto cu momente din J’ai Bistrot">
          <div className="moments-track" ref={trackRef}>
            {moments.map((moment) => (
              <figure className="moment-card" key={moment.src}>
                <div className="moment-image"><Image src={moment.src} alt={moment.alt} fill sizes="(max-width: 899px) 78vw, 40vw" /></div>
                <figcaption><span>{moment.note}</span><strong>{moment.title}</strong></figcaption>
              </figure>
            ))}
          </div>
        </div>
        <a className="moments-social" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Urmărește-ne pe Instagram</a>
      </section>

      <section className="visit-section" id="contact" aria-labelledby="visit-title">
        <div className="visit-grid">
          <div className="visit-title" data-reveal><p className="eyebrow">Calea Griviței 55</p><h2 id="visit-title">HAI LA <em>J’AI!</em></h2><p>Sună-ne pentru o masă și vino cu poftă.</p></div>
          <div className="visit-details" data-reveal>
            <div><span className="detail-label">Adresă</span><p>Calea Griviței 55<br/>Sector 1, București</p><a href={MAP_URL} target="_blank" rel="noopener noreferrer">Deschide harta</a></div>
            <div><span className="detail-label">Rezervări</span><p><a href={PHONE_URL}>0790 229 922</a></p><a href={PHONE_URL}>Sună pentru o masă</a></div>
            <div><span className="detail-label">Scrie-ne</span><p><a href="mailto:salut@jaibistrot.ro">salut@jaibistrot.ro</a></p><a href="mailto:salut@jaibistrot.ro">Trimite un email</a></div>
          </div>
        </div>
        <div className="visit-bottom"><span>Home of the Flying Pigs</span><a href={MENU_URL} target="_blank" rel="noopener noreferrer">Meniul actual</a></div>
      </section>

      <footer className="site-footer">
        <a href="#acasa" aria-label="J’ai Bistrot — înapoi sus" className="footer-brand">J’ai Bistrot</a>
        <p>© {new Date().getFullYear()} J’ai Bistrot · București</p>
        <nav aria-label="Rețele sociale"><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a><a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">Facebook</a></nav>
      </footer>
    </main>
  );
}
