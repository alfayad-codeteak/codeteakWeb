"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function HeroSection({ theme = "dark", heroRef }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  const isDark  = theme === "dark";
  const bg      = isDark ? "#000000" : "#ffffff";
  const fg      = isDark ? "#fff" : "#000";
  const muted   = isDark ? "rgba(255,255,255,0.40)" : "rgba(0,0,0,0.38)";
  const accent  = "#fa4902";
  const border  = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.09)";
  const cardBg  = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
  const cardHov = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.055)";

  const fadeL = isDark
    ? `linear-gradient(to right, #000 0%, rgba(0,0,0,0.75) 28%, rgba(0,0,0,0.4) 50%, transparent 100%)`
    : `linear-gradient(to right, #fff 0%, rgba(255,255,255,0.6) 22%, rgba(255,255,255,0.25) 42%, transparent 100%)`;
  const fadeB = isDark
    ? `linear-gradient(to top, #000 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.3) 55%, transparent 100%)`
    : `linear-gradient(to top, #fff 0%, rgba(255,255,255,0.55) 22%, rgba(255,255,255,0.18) 44%, transparent 100%)`;

  // Track scroll for parallax
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trigger entrance after mount
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Derived scroll values
  const parallaxImg   = scrollY * 0.28;
  const parallaxWm    = scrollY * 0.14;
  const fadeScroll    = Math.min(scrollY / 340, 1);
  const scaleContent  = 1 - scrollY * 0.00012;

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&family=Space+Mono&display=swap');

    .hs *, .hs *::before, .hs *::after { box-sizing: border-box; margin: 0; padding: 0; }

    /* ── Entrance keyframes ── */
    @keyframes hsFadeUp {
      from { opacity: 0; transform: translateY(32px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes hsFadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes hsSlideLeft {
      from { opacity: 0; transform: translateX(48px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes hsSlideRight {
      from { opacity: 0; transform: translateX(-48px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes hsScaleIn {
      from { opacity: 0; transform: scale(0.93); }
      to   { opacity: 1; transform: scale(1); }
    }
    @keyframes hsLineGrow {
      from { transform: scaleX(0); transform-origin: left; }
      to   { transform: scaleX(1); transform-origin: left; }
    }

    /* ── Animated entrance classes (applied when mounted) ── */
    .hs-anim-nav      { animation: hsFadeIn   0.55s cubic-bezier(.22,1,.36,1) both; animation-delay: 0.05s; }
    .hs-anim-wm       { animation: hsFadeIn   1.1s  cubic-bezier(.22,1,.36,1) both; animation-delay: 0.15s; }
    .hs-anim-img      { animation: hsSlideRight 0.85s cubic-bezier(.22,1,.36,1) both; animation-delay: 0.2s; }
    .hs-anim-eyebrow  { animation: hsFadeUp   0.6s  cubic-bezier(.22,1,.36,1) both; animation-delay: 0.35s; }
    .hs-anim-h1       { animation: hsFadeUp   0.72s cubic-bezier(.22,1,.36,1) both; animation-delay: 0.48s; }
    .hs-anim-body     { animation: hsFadeUp   0.65s cubic-bezier(.22,1,.36,1) both; animation-delay: 0.62s; }
    .hs-anim-ctas     { animation: hsFadeUp   0.65s cubic-bezier(.22,1,.36,1) both; animation-delay: 0.74s; }
    .hs-anim-scroll   { animation: hsFadeIn   0.8s  cubic-bezier(.22,1,.36,1) both; animation-delay: 1.1s; }

    /* Hidden until mounted */
    .hs-pre { opacity: 0; }

    /* ── Wordmark ── */
    .hs-wm {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(150px, 20vw, 320px);
      line-height: 1;
      letter-spacing: -0.01em;
      white-space: nowrap;
      user-select: none;
      pointer-events: none;
      position: absolute;
      right: -3vw;
      top: 50%;
      z-index: 0;
      background: ${isDark
        ? "linear-gradient(175deg,rgba(255,255,255,0.055) 0%,rgba(255,255,255,0.007) 100%)"
        : "linear-gradient(175deg,rgba(0,0,0,0.06) 0%,rgba(0,0,0,0.007) 100%)"};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      will-change: transform;
    }

    /* ── Nav ── */
    .hs-nav {
      position: absolute; top: 0; left: 0; right: 0; height: 64px;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 48px;
      border-bottom: 1px solid ${border};
      z-index: 30;
    }
    @media(max-width:640px){ .hs-nav { padding: 0 20px; } }

    .hs-logo {
      font-family: 'Space Mono', monospace;
      font-size: 11px; letter-spacing: 0.32em;
      text-transform: uppercase; color: ${muted};
    }
    .hs-links { display: flex; align-items: center; gap: 28px; }
    @media(max-width:768px){ .hs-links { display: none; } }
    .hs-link {
      font-size: 12px; letter-spacing: 0.09em; text-transform: uppercase;
      color: ${muted}; background: none; border: none; cursor: pointer;
      font-family: 'DM Sans', sans-serif; transition: color .2s;
    }
    .hs-link:hover { color: ${fg}; }

    .hs-badge {
      display: inline-flex; align-items: center; gap: 7px;
      background: ${cardBg}; border: 1px solid ${border};
      border-radius: 100px; padding: 5px 13px;
      font-size: 11px; font-family: 'Space Mono', monospace;
      color: ${muted}; letter-spacing: 0.04em; white-space: nowrap;
    }
    @media(max-width:500px){ .hs-badge { display: none; } }

    .hs-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: #22c55e; flex-shrink: 0;
      animation: hsDot 2.2s ease-in-out infinite;
    }
    @keyframes hsDot {
      0%,100%{ opacity:1; transform:scale(1); }
      50%    { opacity:.45; transform:scale(.75); }
    }

    .hs-burger {
      display: none; flex-direction: column; gap: 5px;
      background: none; border: none; cursor: pointer; padding: 4px;
    }
    @media(max-width:768px){ .hs-burger { display: flex; } }
    .hs-burger span {
      display: block; width: 22px; height: 1.5px;
      background: ${muted}; border-radius: 2px; transition: background .2s;
    }
    .hs-burger:hover span { background: ${fg}; }

    .hs-mmenu {
      display: none; position: absolute; top: 64px; left: 0; right: 0;
      background: ${bg}; border-bottom: 1px solid ${border};
      padding: 12px 20px; z-index: 29; flex-direction: column; gap: 2px;
    }
    .hs-mmenu.open { display: flex; }
    .hs-mlink {
      font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase;
      color: ${muted}; background: none; border: none; cursor: pointer;
      padding: 10px 0; border-bottom: 1px solid ${border};
      text-align: left; font-family: 'DM Sans', sans-serif; transition: color .2s;
    }
    .hs-mlink:last-child { border-bottom: none; }
    .hs-mlink:hover { color: ${fg}; }

    /* ── Grid ── */
    .hs-grid {
      display: grid;
      grid-template-columns: 380px 1fr;
      column-gap: 112px;
      align-items: stretch;
      min-height: calc(100svh - 64px);
      width: 100%; max-width: 1280px;
      margin: 0 auto;
      padding: 0 48px;
    }
    @media(max-width:1100px){ .hs-grid { grid-template-columns: 320px 1fr; column-gap: 80px; padding: 0 32px; } }
    @media(max-width:900px) { .hs-grid { grid-template-columns: 260px 1fr; column-gap: 56px; padding: 0 20px; } }
    @media(max-width:768px) { .hs-grid { grid-template-columns: 1fr; column-gap: 0; padding: 0 20px; } }

    /* ── Image col ── */
    .hs-imgcol {
      position: relative; align-self: stretch;
      display: flex; align-items: flex-end; justify-content: center;
      flex-shrink: 0;
      padding-bottom: 0;
      will-change: transform, opacity;
    }
    @media(max-width:768px){ .hs-imgcol { display: none; } }

    .hs-imgwrap {
      position: relative; width: 100%; height: 100%;
    }

    .hs-fade {
      position: absolute; pointer-events: none; z-index: 3;
    }

    /* ── Content col ── */
    .hs-content {
      position: relative; z-index: 10;
      display: flex; flex-direction: column; justify-content: center;
      padding: 80px 0 80px 52px;
      will-change: transform, opacity;
    }
    @media(max-width:900px) { .hs-content { padding-left: 28px; } }
    @media(max-width:768px) { .hs-content { padding: 52px 0 96px; } }

    .hs-eyebrow {
      display: flex; align-items: center; gap: 10px; margin-bottom: 28px;
    }
    .hs-eline {
      display: inline-block; width: 30px; height: 1.5px;
      background: ${accent}; border-radius: 2px; flex-shrink: 0;
    }
    .hs-etext {
      font-family: 'Space Mono', monospace; font-size: 10px;
      letter-spacing: 0.14em; text-transform: uppercase; color: ${accent};
    }

    .hs-h1 {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(54px, 7.5vw, 96px);
      line-height: 0.95; letter-spacing: 0.01em;
      color: ${fg}; margin-bottom: 22px;
    }
    .hs-h1 em { font-style: normal; color: ${accent}; }

    /* Letter-by-letter reveal for h1 */
    .hs-h1-word {
      display: inline-block;
      overflow: hidden;
      line-height: 1.05;
      vertical-align: bottom;
    }
    .hs-h1-inner {
      display: inline-block;
      transform: translateY(110%);
      transition: transform 0.7s cubic-bezier(.22,1,.36,1);
    }
    .hs-h1-inner.visible {
      transform: translateY(0);
    }

    .hs-body {
      font-size: clamp(14px, 1.35vw, 16px); line-height: 1.72;
      color: ${muted}; font-weight: 300;
      max-width: 400px; margin-bottom: 36px;
    }

    .hs-ctas { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 48px; }
    .hs-btn-p {
      background: ${fg}; color: ${bg}; border: none;
      padding: 13px 30px; border-radius: 100px;
      font-family: 'DM Sans', sans-serif; font-weight: 500;
      font-size: 14px; letter-spacing: 0.02em; cursor: pointer;
      transition: opacity .2s, transform .2s; white-space: nowrap;
    }
    .hs-btn-p:hover { opacity: .82; transform: translateY(-2px); }
    .hs-btn-s {
      background: transparent; color: ${fg};
      border: 1px solid ${border}; padding: 12px 26px; border-radius: 100px;
      font-family: 'DM Sans', sans-serif; font-weight: 400;
      font-size: 14px; letter-spacing: 0.02em; cursor: pointer;
      transition: border-color .2s, transform .2s; white-space: nowrap;
    }
    .hs-btn-s:hover {
      border-color: ${isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.32)"};
      transform: translateY(-2px);
    }

    /* ── Scroll cue ── */
    .hs-scroll {
      position: absolute; bottom: 24px; left: 50%;
      transform: translateX(-50%); z-index: 20;
      display: flex; flex-direction: column; align-items: center; gap: 6px;
    }
    .hs-sline {
      width: 1px; height: 44px;
      background: linear-gradient(to bottom, ${accent}, transparent);
      animation: hsScrollLine 1.9s ease-in-out infinite;
    }
    @keyframes hsScrollLine {
      0%  { transform:scaleY(0); transform-origin:top;    opacity:1; }
      50% { transform:scaleY(1); transform-origin:top;    opacity:1; }
      100%{ transform:scaleY(1); transform-origin:bottom; opacity:0; }
    }
    .hs-stxt {
      font-family: 'Space Mono', monospace; font-size: 9px;
      letter-spacing: 0.18em; color: ${muted}; text-transform: uppercase;
    }

    /* ── Accent line entrance ── */
    @keyframes hsAccentLine {
      from { width: 0; opacity: 0; }
      to   { width: 30px; opacity: 1; }
    }
    .hs-eline-anim {
      animation: hsAccentLine 0.5s cubic-bezier(.22,1,.36,1) both;
      animation-delay: 0.38s;
    }

    /* ── Noise grain overlay ── */
    .hs-grain {
      position: absolute; inset: 0; z-index: 1;
      pointer-events: none; opacity: ${isDark ? "0.025" : "0.018"};
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
      background-size: 180px;
      animation: hsGrain 0.4s steps(1) infinite;
    }
    @keyframes hsGrain {
      0%  { transform: translate(0,0); }
      20% { transform: translate(-2px, 2px); }
      40% { transform: translate(2px, -1px); }
      60% { transform: translate(-1px, -2px); }
      80% { transform: translate(1px, 1px); }
      100%{ transform: translate(0, 0); }
    }
  `;

  // Words for the split-text h1 animation
  const h1Lines = [
    { text: "We Build", delay: 0.48 },
    { text: "Digital", em: true, delay: 0.58 },
    { text: "Experiences", delay: 0.68 },
  ];

  return (
    <>
      <style>{css}</style>

      <section
        ref={heroRef}
        id="home"
        className="hs"
        style={{
          position: "relative",
          minHeight: "100svh",
          backgroundColor: bg,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Grain overlay */}
        <div className="hs-grain" />

       
        {/* BIG WORDMARK — parallax on scroll */}
        <div
          className={`hs-wm ${mounted ? "hs-anim-wm" : "hs-pre"}`}
          style={{
            transform: `translateY(calc(-50% + ${parallaxWm}px))`,
          }}
        >
          CODETEAK
        </div>

        {/* Body */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", paddingTop: 64 }}>
          <div className="hs-grid">

            {/* LEFT — Image with parallax */}
            <div
              className={`hs-imgcol ${mounted ? "hs-anim-img" : "hs-pre"}`}
              style={{
                transform: `translateY(${parallaxImg}px)`,
                opacity: 1 - fadeScroll * 0.55,
              }}
            >
              <div className="hs-imgwrap">
                <Image
                  src={isDark ? "/image.png" : "/image-white.png"}
                  alt="Codeteak visual"
                  width={720} height={1260} priority
                  style={{
                    display: "block",
                    width: "120%",
                    maxWidth: "720px",
                    height: "auto",
                    maxHeight: "calc(100svh - 48px)",
                    objectFit: "contain",
                    objectPosition: "bottom center",
                    position: "relative",
                    zIndex: 2,
                  }}
                />
                <div className="hs-fade" style={{ inset: "0 auto 0 0", width: "40%", background: fadeL }} />
                <div className="hs-fade" style={{ inset: "auto 0 0 0", height: isDark ? "32%" : "26%", background: fadeB }} />
              </div>
            </div>

            {/* RIGHT — Content with scroll fade + slight scale */}
            <div
              className="hs-content"
              style={{
                opacity: 1 - fadeScroll * 0.7,
                transform: `scale(${scaleContent}) translateY(${scrollY * 0.06}px)`,
              }}
            >
              {/* Eyebrow */}
              <div className={`hs-eyebrow ${mounted ? "hs-anim-eyebrow" : "hs-pre"}`}>
                <span className={`hs-eline ${mounted ? "hs-eline-anim" : "hs-pre"}`} />
                <span className="hs-etext">01 — Creative Studio</span>
              </div>

              {/* H1 — split text slide-up */}
              <h1 className="hs-h1" style={{ marginBottom: 22 }}>
                {h1Lines.map((line, i) => (
                  <span key={i} style={{ display: "block" }}>
                    <span className="hs-h1-word">
                      <span
                        className={`hs-h1-inner ${mounted ? "visible" : ""}`}
                        style={{
                          transitionDelay: mounted ? `${line.delay}s` : "0s",
                          color: line.em ? accent : undefined,
                        }}
                      >
                        {line.text}
                      </span>
                    </span>
                  </span>
                ))}
              </h1>

              <p className={`hs-body ${mounted ? "hs-anim-body" : "hs-pre"}`}>
                Full-stack development studio crafting performant, beautifully
                designed web applications from concept to launch.
              </p>

              <div className={`hs-ctas ${mounted ? "hs-anim-ctas" : "hs-pre"}`}>
                <Link href="/contact" className="hs-btn-p">Start a Project</Link>
                <Link href="/services" className="hs-btn-s">View Our Services →</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className={`hs-scroll ${mounted ? "hs-anim-scroll" : "hs-pre"}`}
          style={{ opacity: 1 - fadeScroll * 2.5 }}
        >
          <div className="hs-sline" />
          <span className="hs-stxt">Scroll</span>
        </div>

        {/* Global bottom fade */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: 72, pointerEvents: "none", zIndex: 2,
          background: `linear-gradient(to top, ${bg}, transparent)`,
        }} />
      </section>
    </>
  );
}