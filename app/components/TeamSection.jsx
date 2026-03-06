"use client";

import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const gridMembers = [
  {
    id: 1, name: "Muhammed Rizwan P", role: "Founder",
    src: "/core-team/rizwan.png", bg: "#e8d5c4",
    bio: "Visionary leader with a passion for building products that make a real difference in people's lives and businesses.",
    socials: [
      { type: "icon", platform: "linkedin", href: "http://linkedin.com/in/muhammedrizwanp/" },
    ],
  },
  {
    id: 2, name: "Alfayad S", role: "Full Stack Developer & UI/UX Designer",
    src: "/core-team/Alfayad.png", bg: "#c8dde8",
    bio: "Specialist in building scalable backends and elegant interfaces, delivering seamless software solutions. ",
    socials: [
      { type: "icon", platform: "github", href: "https://github.com/Alfayad-s" },
      { type: "icon", platform: "twitter", href: "https://x.com/alfayad_shameer" },
      { type: "icon", platform: "portfolio", href: "https://alfayad.vercel.app" },
      { type: "icon", platform: "linkedin", href: "https://www.linkedin.com/in/alfayad" },
    ],
  },
  {
    id: 3, name: "Abhinav Aneesh", role: "Mobile Application Developer",
    src: "/core-team/Abhinav.png", bg: "#d4c8e8",
    bio: "Full stack mobile developer focused on creating smooth, engaging app experiences for both iOS and Android.",
    socials: [
      { type: "icon", platform: "github", href: "https://github.com/abiinavvv" },
      { type: "icon", platform: "twitter", href: "http://x.com/abiinavvv" },
      { type: "icon", platform: "linkedin", href: "https://www.linkedin.com/in/abiinavvv/" },
    ],
  },
  {
    id: 4, name: "Binel Biju", role: "Backend Developer & Cloud Engineer",
    src: "/core-team/Binel.jpeg", bg: "#e8c8c8",
    bio: "Driving scalable growth through cloud architecture and delivering innovative solutions for business expansion.",
    socials: [
      { type: "icon", platform: "github", href: "https://github.com/binelbpe" },
      { type: "icon", platform: "linkedin", href: "https://www.linkedin.com/in/binel-biju/" },
    ],
  },
  {
    id: 5, name: "Alan Joshy", role: "Backend Developer & Cloud Engineer",
    src: "/core-team/Alan.jpeg", bg: "#c8e8d8",
    bio: "Building robust backend systems and cloud infrastructure that power reliable, high-performance applications.",
    socials: [
      { type: "icon", platform: "github", href: "https://github.com/alanjoshy" },
      { type: "icon", platform: "twitter", href: "https://x.com/a1an_j0" },
      { type: "icon", platform: "linkedin", href: "https://www.linkedin.com/in/alan--joshy/" },
    ],
  },
];

const developerMembers = gridMembers.filter((m) => m.id !== 1);

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useIsDarkMode() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const update = () => setIsDark(root.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return isDark;
}

// ─── ICONS ───────────────────────────────────────────────────────────────────

const Icons = {
  twitter: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.26 5.632 5.903-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  linkedin: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  github: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  portfolio: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 7h4v2H7a3 3 0 000 6h4v2H7a5 5 0 010-10zm6 0h4a5 5 0 010 10h-4v-2h4a3 3 0 000-6h-4V7zm-2 4h4v2h-4v-2z" />
    </svg>
  ),
};

// ─── GRID CARD ───────────────────────────────────────────────────────────────

function GridCard({ member, index }) {
  const [ref, inView] = useInView(0.12);
  const [hovered, setHovered] = useState(false);
  const isDark = useIsDarkMode();

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.65s ease ${index * 0.09}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${index * 0.09}s`,
        width: "100%",
        maxWidth: 260,
      }}
    >
      {/* Oval portrait */}
      <div style={{
        width: "100%",
        aspectRatio: "3/4",
        borderRadius: 9999,
        overflow: "hidden",
        background: member.bg,
        border: hovered
          ? "3px solid #FC4B01"
          : isDark
          ? "2px solid rgba(255,255,255,0.16)"
          : "3px solid rgba(255,255,255,0.95)",
        boxShadow: hovered
          ? isDark
            ? "0 26px 70px rgba(0,0,0,0.55)"
            : "0 24px 50px rgba(0,0,0,0.14)"
          : isDark
            ? "0 10px 42px rgba(0,0,0,0.45)"
            : "0 8px 28px rgba(0,0,0,0.08)",
        transform: hovered ? "scale(1.03) translateY(-6px)" : "scale(1) translateY(0)",
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s",
        marginBottom: 16,
        position: "relative",
      }}>
        <img
          src={member.src}
          alt={member.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={e => { e.target.style.display = "none"; }}
        />
      </div>

      {/* Name */}
      <div style={{
        fontSize: 14,
        fontWeight: 800,
        color: isDark ? "rgba(255,255,255,0.92)" : "#111",
        fontFamily: "Georgia, serif",
        marginBottom: 2,
        letterSpacing: "-0.01em",
      }}>
        {member.name}
      </div>

      {/* Role in orange */}
      <div style={{
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "#FC4B01",
        marginBottom: 10,
        fontFamily: "'Courier New', monospace",
      }}>
        {member.role}
      </div>

      {/* Bio */}
      <p style={{
        fontSize: 12,
        lineHeight: 1.7,
        color: isDark ? "rgba(226,232,240,0.7)" : "#777",
        margin: "0 0 14px",
      }}>
        {member.bio}
      </p>

      {/* Divider */}
      <div style={{ height: 1, background: isDark ? "rgba(255,255,255,0.08)" : "#efefef", marginBottom: 12 }} />

      {/* Social icons / portfolio */}
      {member.socials && member.socials.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {member.socials.map((social, i) => {
            if (social.type === "icon" && Icons[social.platform]) {
              const tooltip =
                social.platform === "github"
                  ? "GitHub profile"
                  : social.platform === "linkedin"
                  ? "LinkedIn profile"
                  : social.platform === "twitter"
                  ? "X (Twitter) profile"
                  : social.platform === "portfolio"
                  ? "Portfolio website"
                  : "";
              return (
                <a
                  key={`${social.platform}-${i}`}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  title={tooltip}
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 6,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: isDark ? "rgba(255,255,255,0.08)" : "#f2f2f2",
                    color: isDark ? "rgba(226,232,240,0.8)" : "#555",
                    textDecoration: "none",
                    transition: "background 0.2s, color 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#FC4B01";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.08)" : "#f2f2f2";
                    e.currentTarget.style.color = isDark ? "rgba(226,232,240,0.8)" : "#555";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {Icons[social.platform]}
                </a>
              );
            }

            return null;
          })}
        </div>
      )}
    </div>
  );
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────

export default function TeamSection() {
  const [devRef, devInView] = useInView(0.05);
  const isDark = useIsDarkMode();

  return (
    <div>
      <section
        style={{
          background: isDark ? "#05050a" : "#ffffff",
          padding: "90px 32px 110px",
        }}
      >
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          {/* Developers heading */}
          <div
            ref={devRef}
            style={{
              textAlign: "center",
              marginBottom: 60,
              opacity: devInView ? 1 : 0,
              transform: devInView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                fontWeight: 800,
                color: isDark ? "rgba(255,255,255,0.92)" : "#111",
                margin: "0 0 18px",
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
              }}
            >
              Meet the <span style={{ color: "#FC4B01" }}>Engineers</span> Behind CodeTeak
            </h2>
            <p
              style={{
                fontSize: 14,
                color: isDark ? "rgba(226,232,240,0.65)" : "#aaa",
                maxWidth: 520,
                margin: "0 auto",
                lineHeight: 1.75,
              }}
            >
              The engineers building our web, mobile, and cloud products.
            </p>
          </div>

          {/* Developer cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-11 gap-x-7 items-start justify-items-center">
            {developerMembers.map((m, i) => (
              <GridCard key={m.id} member={m} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}