"use client";

import type { ReactElement, ReactNode } from "react";
import type {
  ChangeEvent,
  CSSProperties,
  FormEvent,
  KeyboardEvent,
} from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

/* ── Tokens ── */
const C = {
  brand: "#FC4B01",
  brandDim: "#c93c01",
  brandGlow: "rgba(252,75,1,.35)",
  surface: "#0d0d0f",
  surface2: "#141417",
  surface3: "#1c1c21",
  border: "rgba(255,255,255,.07)",
  text: "#e8e8ec",
  textDim: "#7a7a8c",
  green: "#22d3a5",
};

const fontDisplay = "'Syne', sans-serif";
const fontMono = "'DM Mono', monospace";

type ChatRole = "assistant" | "user";
type ChatItem = { id: string | number; role: ChatRole; text: string; time: string };

function boldInline(text: string): Array<string | ReactElement> {
  return text.split(/\*\*(.*?)\*\*/g).map((seg, i) =>
    i % 2 === 1 ? <strong key={i}>{seg}</strong> : seg,
  );
}

function renderChatText(text: string): ReactNode {
  const lines = text.split("\n");
  const blocks: ReactNode[] = [];

  let listBuffer: string[] = [];
  const flushList = () => {
    if (listBuffer.length === 0) return;
    blocks.push(
      <ul
        key={`ul-${blocks.length}`}
        style={{
          margin: 0,
          paddingLeft: "1.1rem",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {listBuffer.map((item, idx) => (
          <li key={idx} style={{ margin: 0 }}>
            {boldInline(item)}
          </li>
        ))}
      </ul>,
    );
    listBuffer = [];
  };

  const flushParagraph = (para: string) => {
    const trimmed = para.trim();
    if (!trimmed) return;
    blocks.push(
      <p key={`p-${blocks.length}`} style={{ margin: 0 }}>
        {boldInline(trimmed)}
      </p>,
    );
  };

  let paraBuffer: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.replace(/\t/g, " ").trimEnd();
    const trimmed = line.trim();
    const isBullet =
      trimmed.startsWith("- ") || trimmed.startsWith("* ") || trimmed.startsWith("• ");

    if (!trimmed) {
      // blank line splits blocks
      flushList();
      if (paraBuffer.length > 0) {
        flushParagraph(paraBuffer.join(" ").trim());
        paraBuffer = [];
      }
      continue;
    }

    if (isBullet) {
      // Switch to list mode
      if (paraBuffer.length > 0) {
        flushParagraph(paraBuffer.join(" ").trim());
        paraBuffer = [];
      }
      listBuffer.push(trimmed.replace(/^(-|\*|•)\s+/, ""));
      continue;
    }

    // Normal text line
    flushList();
    paraBuffer.push(trimmed);
  }

  flushList();
  if (paraBuffer.length > 0) {
    flushParagraph(paraBuffer.join(" ").trim());
  }

  return <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>{blocks}</div>;
}

function timestamp() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/* ── Sub-components ── */

function StatusDot() {
  return (
    <span
      className="ct-pulse"
      style={{
        display: "inline-block",
        width: 7, height: 7,
        borderRadius: "50%",
        background: C.green,
        boxShadow: `0 0 8px rgba(34,211,165,.85)`,
        flexShrink: 0,
      }}
    />
  );
}

function Avatar({ size = 28, radius = "50%", fontSize = "0.58rem", style = {} }) {
  return (
    <div
      style={{
        width: size, height: size,
        borderRadius: radius,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
        overflow: "hidden",
        background: "transparent",
        ...style,
      }}
    >
      <Image
        src="/logo/logo-white.svg"
        alt="CodeTeak logo"
        width={size}
        height={size}
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}

function UserAvatar({ size = 26 }) {
  return (
    <div
      style={{
        width: size, height: size,
        borderRadius: "0.45rem",
        background: C.surface3,
        border: `1px solid ${C.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: fontDisplay,
        fontSize: "0.52rem",
        fontWeight: 800,
        color: C.textDim,
        flexShrink: 0,
      }}
    >
      YOU
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="ct-msg-in" style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Avatar size={26} radius="0.45rem" fontSize="0.52rem" />
      <div
        style={{
          display: "flex", alignItems: "center", gap: 4,
          background: C.surface2,
          border: `1px solid ${C.border}`,
          borderRadius: "0.25rem 1rem 1rem 1rem",
          padding: "0.55rem 0.9rem",
        }}
      >
        {[1, 2, 3].map(n => (
          <span
            key={n}
            className={`ct-dot${n}`}
            style={{ width: 5, height: 5, borderRadius: "50%", background: C.brand, display: "block" }}
          />
        ))}
      </div>
    </div>
  );
}

type MemberId = "rizwan" | "alfayad" | "abhinav" | "binel" | "alan";

function CoreTeamBubble({
  time,
  onViewDetails,
}: {
  time: string;
  onViewDetails?: (id: MemberId) => void;
}) {
  return (
    <div
      className="ct-msg-in"
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 8,
        alignItems: "flex-start",
      }}
    >
      <Avatar
        size={26}
        radius="0.45rem"
        fontSize="0.52rem"
        style={{ marginTop: 2 }}
      />
      <div
        style={{
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            padding: "0.7rem 0.9rem",
            borderRadius: "0.25rem 1rem 1rem 1rem",
            fontSize: "0.72rem",
            lineHeight: 1.65,
            fontFamily: fontMono,
            letterSpacing: "0.01em",
            background: C.surface2,
            border: `1px solid ${C.border}`,
            color: C.text,
          }}
        >
          <div
            style={{
              fontFamily: fontDisplay,
              fontSize: "0.8rem",
              fontWeight: 700,
              marginBottom: 6,
            }}
          >
            Core team behind CodeTeak
          </div>

          {[
            {
              name: "Muhammed Rizwan P",
              role: "Founder (Core Member)",
              img: "/logo/logo-white.svg",
              id: "rizwan" as MemberId,
              links: [
                {
                  label: "LinkedIn",
                  href: "http://linkedin.com/in/muhammedrizwanp/",
                },
              ],
            },
            {
              name: "Alfayad S",
              role: "Full Stack Developer & UI/UX Designer (Core Member)",
              img: "/core-team/Alfayad.jpeg",
              id: "alfayad" as MemberId,
              links: [
                {
                  label: "Portfolio",
                  href: "https://alfayad.vercel.app",
                },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/alfayad",
                },
              ],
            },
            {
              name: "Abhinav Aneesh",
              role: "Full Stack Mobile Application Developer (Core Member)",
              img: "/core-team/Abhinav.jpeg",
              id: "abhinav" as MemberId,
              links: [
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/abiinavvv/",
                },
              ],
            },
            {
              name: "Binel Biju",
              role: "Backend Developer & Cloud Engineer (Core Member)",
              img: "/core-team/Binel.jpeg",
              id: "binel" as MemberId,
              links: [
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/binel-biju/",
                },
              ],
            },
            {
              name: "Alan Joshy",
              role: "Backend Developer & Cloud Engineer (Core Member)",
              img: "/core-team/Alan.jpeg",
              id: "alan" as MemberId,
              links: [
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/alan--joshy/",
                },
              ],
            },
          ].map((member) => (
            <div
              key={member.name}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: 8,
                alignItems: "center",
                padding: "0.4rem 0.45rem",
                borderRadius: "0.75rem",
                background: C.surface3,
                marginBottom: 4,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "999px",
                  overflow: "hidden",
                  border: `1px solid ${C.border}`,
                }}
              >
                <Image
                  src={member.img}
                  alt={member.name}
                  width={32}
                  height={32}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <div
                  style={{
                    fontFamily: fontDisplay,
                    fontSize: "0.72rem",
                    fontWeight: 600,
                  }}
                >
                  {member.name}
                </div>
                <div
                  style={{
                    fontSize: "0.66rem",
                    color: C.textDim,
                  }}
                >
                  {member.role}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                    marginTop: 2,
                  }}
                >
                  {member.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        fontSize: "0.6rem",
                        color: C.brand,
                        textDecoration: "none",
                        padding: "0.16rem 0.4rem",
                        borderRadius: 999,
                        border: `1px solid ${C.brandGlow}`,
                        background: "rgba(252,75,1,.08)",
                      }}
                    >
                      {link.label}
                    </a>
                  ))}
                  {onViewDetails && (
                    <button
                      type="button"
                      onClick={() => onViewDetails(member.id)}
                      style={{
                        fontSize: "0.6rem",
                        color: C.text,
                        padding: "0.16rem 0.5rem",
                        borderRadius: 999,
                        border: `1px solid ${C.border}`,
                        background: "transparent",
                      }}
                    >
                      View details
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            fontSize: "0.58rem",
            color: C.textDim,
            letterSpacing: "0.05em",
            padding: "0 0.2rem",
          }}
        >
          {time} · CodeTeak AI
        </div>
      </div>
    </div>
  );
}

function SingleMemberBubble({
  id,
  time,
  text,
}: {
  id: MemberId;
  time: string;
  text: string;
}) {
  const metaMap: Record<
    MemberId,
    {
      name: string;
      role: string;
      img: string;
      links: { label: string; href: string }[];
    }
  > = {
    rizwan: {
      name: "Muhammed Rizwan P",
      role: "Founder (Core Member)",
      img: "/logo/logo-white.svg",
      links: [{ label: "LinkedIn", href: "http://linkedin.com/in/muhammedrizwanp/" }],
    },
    alfayad: {
      name: "Alfayad S",
      role: "Full Stack Developer & UI/UX Designer (Core Member)",
      img: "/core-team/Alfayad.jpeg",
      links: [
        { label: "Portfolio", href: "https://alfayad.vercel.app" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/alfayad" },
      ],
    },
    abhinav: {
      name: "Abhinav Aneesh",
      role: "Full Stack Mobile Application Developer (Core Member)",
      img: "/core-team/Abhinav.jpeg",
      links: [
        { label: "LinkedIn", href: "https://www.linkedin.com/in/abiinavvv/" },
      ],
    },
    binel: {
      name: "Binel Biju",
      role: "Backend Developer & Cloud Engineer (Core Member)",
      img: "/core-team/Binel.jpeg",
      links: [
        { label: "LinkedIn", href: "https://www.linkedin.com/in/binel-biju/" },
      ],
    },
    alan: {
      name: "Alan Joshy",
      role: "Backend Developer & Cloud Engineer (Core Member)",
      img: "/core-team/Alan.jpeg",
      links: [
        { label: "LinkedIn", href: "https://www.linkedin.com/in/alan--joshy/" },
      ],
    },
  };

  const member = metaMap[id];
  if (!member) return null;

  // Break the AI text into short, readable paragraphs.
  const rawBlocks = text.split(/\n\s*\n/);
  const descParagraphs = rawBlocks
    .map((block) =>
      block
        .split("\n")
        .map((l) => l.trim())
        .join(" "),
    )
    .filter((para, idx) => {
      if (!para) return false;
      const lower = para.toLowerCase();
      if (idx === 0 && lower.includes(member.name.toLowerCase())) return false;
      if (para.startsWith("![") || para.startsWith("http")) return false;
      return true;
    })
    .slice(0, 3);

  return (
    <div
      className="ct-msg-in"
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 8,
        alignItems: "flex-start",
      }}
    >
      <Avatar
        size={26}
        radius="0.45rem"
        fontSize="0.52rem"
        style={{ marginTop: 2 }}
      />
      <div
        style={{
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            padding: "0.7rem 0.9rem",
            borderRadius: "0.25rem 1rem 1rem 1rem",
            fontSize: "0.72rem",
            lineHeight: 1.65,
            fontFamily: fontMono,
            letterSpacing: "0.01em",
            background: C.surface2,
            border: `1px solid ${C.border}`,
            color: C.text,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "999px",
                overflow: "hidden",
                border: `1px solid ${C.border}`,
                flexShrink: 0,
              }}
            >
              <Image
                src={member.img}
                alt={member.name}
                width={40}
                height={40}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <div
                style={{
                  fontFamily: fontDisplay,
                  fontSize: "0.78rem",
                  fontWeight: 700,
                }}
              >
                {member.name}
              </div>
              <div
                style={{
                  fontSize: "0.68rem",
                  color: C.textDim,
                }}
              >
                {member.role}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              marginBottom: 6,
            }}
          >
            {member.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: "0.6rem",
                  color: C.brand,
                  textDecoration: "none",
                  padding: "0.16rem 0.5rem",
                  borderRadius: 999,
                  border: `1px solid ${C.brandGlow}`,
                  background: "rgba(252,75,1,.08)",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
          {descParagraphs.length > 0 && (
            <div
              style={{
                fontSize: "0.7rem",
                color: C.text,
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              {descParagraphs.map((para, idx) => (
                <p key={idx} style={{ margin: 0 }}>
                  {para}
                </p>
              ))}
            </div>
          )}
        </div>
        <div
          style={{
            fontSize: "0.58rem",
            color: C.textDim,
            letterSpacing: "0.05em",
            padding: "0 0.2rem",
          }}
        >
          {time} · CodeTeak AI
        </div>
      </div>
    </div>
  );
}

function Message({
  role,
  text,
  time,
  isStreaming,
  onViewMember,
}: {
  role: ChatRole;
  text: string;
  time: string;
  isStreaming?: boolean;
  onViewMember?: (id: MemberId) => void;
}) {
  const isBot = role === "assistant";

  if (isBot && /\byaadro\b/i.test(text)) {
    return (
      <div
        className="ct-msg-in"
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 8,
          alignItems: "flex-start",
        }}
      >
        <Avatar
          size={26}
          radius="0.45rem"
          fontSize="0.52rem"
          style={{ marginTop: 2 }}
        />
        <div
          style={{
            maxWidth: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 6,
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              padding: "0.7rem 0.9rem",
              borderRadius: "0.25rem 1rem 1rem 1rem",
              fontSize: "0.72rem",
              lineHeight: 1.65,
              fontFamily: fontMono,
              letterSpacing: "0.01em",
              background: C.surface2,
              border: `1px solid ${C.border}`,
              color: C.text,
            }}
          >
            <div style={{ marginBottom: 6 }}>{renderChatText(text)}</div>
            <div
              style={{
                borderRadius: "0.9rem",
                border: `1px solid ${C.border}`,
                background: C.surface3,
                padding: "0.6rem 0.7rem",
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <div
                style={{
                  fontFamily: fontDisplay,
                  fontSize: "0.78rem",
                  fontWeight: 700,
                }}
              >
                Yaadro
              </div>
              <div style={{ fontSize: "0.66rem", color: C.textDim }}>
                Full Yaadro details are available on the official website.
              </div>
              <a
                href="https://yaadro.ae"
                target="_blank"
                rel="noreferrer"
                style={{
                  alignSelf: "flex-start",
                  fontSize: "0.62rem",
                  color: C.brand,
                  textDecoration: "none",
                  padding: "0.18rem 0.55rem",
                  borderRadius: 999,
                  border: `1px solid ${C.brandGlow}`,
                  background: "rgba(252,75,1,.08)",
                }}
              >
                Visit yaadro.ae
              </a>
            </div>
          </div>
          <div
            style={{
              fontSize: "0.58rem",
              color: C.textDim,
              letterSpacing: "0.05em",
              padding: "0 0.2rem",
            }}
          >
            {time} · CodeTeak AI
          </div>
        </div>
      </div>
    );
  }

  if (isBot) {
    const matches: { id: MemberId; re: RegExp }[] = [
      { id: "rizwan", re: /rizwan|muhammed\s+rizwan/i },
      { id: "alfayad", re: /alfayad/i },
      { id: "abhinav", re: /abhinav/i },
      { id: "binel", re: /binel/i },
      { id: "alan", re: /\balan\b/i },
    ];
    const hit = matches.filter((m) => m.re.test(text));
    if (hit.length === 1) {
      return <SingleMemberBubble id={hit[0].id} time={time} text={text} />;
    }
  }

  if (
    isBot &&
    /core team|who is behind|developers|team members|who built this/i.test(text) &&
    ["Rizwan", "Alfayad", "Abhinav", "Binel", "Alan"].filter((name) =>
      new RegExp(name, "i").test(text),
    ).length >= 2 &&
    onViewMember
  ) {
    return <CoreTeamBubble time={time} onViewDetails={onViewMember} />;
  }
  return (
    <div
      className="ct-msg-in"
      style={{
        display: "flex",
        flexDirection: isBot ? "row" : "row-reverse",
        gap: 8,
        alignItems: "flex-start",
      }}
    >
      {isBot ? <Avatar size={26} radius="0.45rem" fontSize="0.52rem" style={{ marginTop: 2 }} /> : <UserAvatar />}
      <div style={{ maxWidth: "78%", display: "flex", flexDirection: "column", gap: 4, alignItems: isBot ? "flex-start" : "flex-end" }}>
        <div
          style={{
            padding: "0.6rem 0.85rem",
            borderRadius: isBot ? "0.25rem 1rem 1rem 1rem" : "1rem 0.25rem 1rem 1rem",
            fontSize: "0.72rem",
            lineHeight: 1.65,
            fontFamily: fontMono,
            letterSpacing: "0.01em",
            ...(isBot
              ? { background: C.surface2, border: `1px solid ${C.border}`, color: C.text }
              : { background: `linear-gradient(135deg, ${C.brand}, #ff6a2f)`, color: "#fff", boxShadow: "0 4px 16px rgba(252,75,1,.3)" }),
          }}
        >
          {renderChatText(text)}
          {isStreaming && <span style={{ opacity: 0.5 }}> ▋</span>}
        </div>
        <div style={{ fontSize: "0.58rem", color: C.textDim, letterSpacing: "0.05em", padding: "0 0.2rem" }}>
          {time} · {isBot ? "CodeTeak AI" : "You"}
        </div>
      </div>
    </div>
  );
}

const QUICK = ["→ Our services", "→ Pricing info", "→ Recent projects", "→ Get a quote"];

/* ── Main widget ── */
export default function CodeTeakChatWidget() {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(true);
  const [messages, setMessages] = useState<ChatItem[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi! I'm the virtual assistant for **CodeTeak**. I can help with questions about our products, pricing, and troubleshooting. What can I help you with today?",
      time: timestamp(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Inject fonts and keyframe styles on client only
  useEffect(() => {
    if (typeof document === "undefined") return;

    if (!document.head.querySelector('link[data-ct-font="syne-dm-mono"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Syne:wght@400;600;700;800&display=swap";
      link.setAttribute("data-ct-font", "syne-dm-mono");
      document.head.appendChild(link);
    }

    if (!document.head.querySelector("#ct-styles")) {
      const style = document.createElement("style");
      style.id = "ct-styles";
      style.textContent = `
  @keyframes ct-floatIn   { from{opacity:0;transform:translateY(12px) scale(.95)} to{opacity:1;transform:none} }
  @keyframes ct-panelOpen { from{opacity:0;transform:scale(.88)} to{opacity:1;transform:scale(1)} }
  @keyframes ct-msgIn     { from{opacity:0;transform:translateY(8px) scale(.97)} to{opacity:1;transform:none} }
  @keyframes ct-breathe   {
    0%,100%{box-shadow:0 0 0 0 rgba(252,75,1,.35),0 4px 20px rgba(252,75,1,.4)}
    50%    {box-shadow:0 0 0 8px transparent,0 4px 24px rgba(252,75,1,.5)}
  }
  @keyframes ct-ring { 0%,100%{transform:scale(1);opacity:.4} 50%{transform:scale(1.22);opacity:0} }
  @keyframes ct-pulse { 0%,100%{opacity:1} 50%{opacity:.35} }
  @keyframes ct-dot1 { 0%,80%,100%{transform:translateY(0);opacity:.4} 40%{transform:translateY(-4px);opacity:1} }
  @keyframes ct-dot2 { 0%,80%,100%{transform:translateY(0);opacity:.4} 40%{transform:translateY(-4px);opacity:1} }
  @keyframes ct-dot3 { 0%,80%,100%{transform:translateY(0);opacity:.4} 40%{transform:translateY(-4px);opacity:1} }
  .ct-dot1{animation:ct-dot1 1.2s ease-in-out infinite}
  .ct-dot2{animation:ct-dot2 1.2s ease-in-out infinite .2s}
  .ct-dot3{animation:ct-dot3 1.2s ease-in-out infinite .4s}
  .ct-msg-in{animation:ct-msgIn .3s cubic-bezier(.34,1.3,.64,1) both}
  .ct-panel-open{animation:ct-panelOpen .35s cubic-bezier(.34,1.3,.64,1) both}
  .ct-float-in{animation:ct-floatIn .5s cubic-bezier(.34,1.56,.64,1) both}
  .ct-breathe{animation:ct-breathe 3s ease-in-out infinite}
  .ct-ring{animation:ct-ring 3s ease-in-out infinite}
  .ct-pulse{animation:ct-pulse 2s infinite}
  .ct-scrollbar::-webkit-scrollbar{width:4px}
  .ct-scrollbar::-webkit-scrollbar-track{background:transparent}
  .ct-scrollbar::-webkit-scrollbar-thumb{background:rgba(255,255,255,.08);border-radius:2px}
  .ct-scanlines::before{
    content:'';position:absolute;inset:0;pointer-events:none;z-index:10;border-radius:inherit;
    background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,.013) 2px,rgba(255,255,255,.013) 4px);
  }
      `;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 640);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleOpen = () => { setOpen(true); setShowTeaser(false); };
  const handleClose = () => setOpen(false);
  const handleClear = () => {
    setMessages([{ id: "cleared", role: "assistant", text: "Chat cleared. How can I help you?", time: timestamp() }]);
    setShowQuick(true);
  };

  const isServiceEnquiry = (value: string) => {
    const v = value.toLowerCase();
    return (
      /\b(quote|quotation|pricing|price|cost|budget|proposal|enquiry|inquiry)\b/.test(v) ||
      /\b(hire|hiring|start a project|project)\b/.test(v) ||
      /\b(build|develop|create)\b/.test(v) ||
      /\b(app|application|website|web site)\b/.test(v)
    );
  };

  const send = useCallback(
    async (text: string) => {
      const t = text.trim();
      if (!t || typing) return;
      setInput("");
      if (textareaRef.current) textareaRef.current.style.height = "auto";
      setShowQuick(false);

      const userMessage: ChatItem = {
        id: Date.now(),
        role: "user",
        text: t,
        time: timestamp(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setTyping(true);

      const shouldGoContact = isServiceEnquiry(t);

      try {
        const simpleHistory = [...messages, userMessage].map((m) => ({
          role: m.role,
          content: m.text,
        }));

        const res = await fetch("/api/chat-widget", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: simpleHistory, input: t }),
        });

        const data = (await res.json()) as { reply?: string };
        const replyText =
          data?.reply ||
          "Sorry, I couldn't generate a response right now. Please try again in a moment.";

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            role: "assistant" as ChatRole,
            text: replyText,
            time: timestamp(),
          },
        ]);

        if (shouldGoContact && pathname !== "/contact") {
          setTimeout(() => router.push("/contact"), 250);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            role: "assistant",
            text:
              "Sorry, something went wrong while contacting CodeTeak AI. Please check your connection or try again in a moment.",
            time: timestamp(),
          },
        ]);

        if (shouldGoContact && pathname !== "/contact") {
          setTimeout(() => router.push("/contact"), 250);
        }
      } finally {
        setTyping(false);
      }
    },
    [messages, typing, pathname, router],
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    send(input);
  };

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const autoResize = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = Math.min(e.currentTarget.scrollHeight, 80) + "px";
  };

  const handleViewMemberDetails = (id: MemberId) => {
    const nameMap: Record<MemberId, string> = {
      rizwan: "Muhammed Rizwan P",
      alfayad: "Alfayad S",
      abhinav: "Abhinav Aneesh",
      binel: "Binel Biju",
      alan: "Alan Joshy",
    };
    const name = nameMap[id] ?? "this team member";
    const question = `Tell me more about ${name} at CodeTeak.`;
    void send(question);
  };

  /* ── Launcher ── */
  if (!open) {
    return (
      <div
        style={{
          position: "fixed",
          bottom: isMobile ? "4.5rem" : "2rem",
          right: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "0.75rem",
          zIndex: 100,
        }}
      >
        {showTeaser && (
          <button
            className="ct-float-in"
            onClick={handleOpen}
            style={{
              background: C.surface2,
              border: `1px solid ${C.border}`,
              borderRadius: "1.25rem 1.25rem 0 1.25rem",
              padding: "0.75rem 1rem",
              maxWidth: 240,
              cursor: "pointer",
              boxShadow: `0 0 0 1px rgba(252,75,1,.15), 0 8px 32px rgba(0,0,0,.6), 0 0 40px rgba(252,75,1,.08)`,
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <Avatar size={28} />
              <span style={{ fontFamily: fontDisplay, fontSize: "0.7rem", fontWeight: 700, color: C.text }}>CodeTeak AI</span>
              <StatusDot />
            </div>
            <div style={{ fontFamily: fontMono, fontSize: "0.67rem", color: C.textDim, lineHeight: 1.5 }}>
              Curious about CodeTeak? Ask me anything about our services, products, or projects.
            </div>
          </button>
        )}

        <button
          className="ct-breathe"
          onClick={handleOpen}
          aria-label="Open chat"
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            background: "transparent",
            position: "relative",
            padding: 0,
            overflow: "hidden",
          }}
        >
          <span
            className="ct-ring"
            style={{
              position: "absolute",
              inset: -4,
              borderRadius: "50%",
              border: "1px solid rgba(252,75,1,.35)",
              pointerEvents: "none",
            }}
          />
          <Image
            src="/ai.gif"
            alt="CodeTeak AI"
            fill
            sizes="56px"
            style={{ objectFit: "cover", borderRadius: "50%" }}
          />
        </button>
      </div>
    );
  }

  /* ── Panel ── */
  const panelStyle: CSSProperties = {
    position: "fixed",
    background: C.surface,
    border: `1px solid ${C.border}`,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    zIndex: 200,
    boxShadow: `0 0 0 1px rgba(252,75,1,.1), 0 24px 80px rgba(0,0,0,.8), 0 0 60px rgba(252,75,1,.08)`,
    fontFamily: fontMono,
    ...(expanded
      ? {
          top: 0,
          right: 0,
          bottom: 0,
          left: isMobile ? 0 : undefined,
          width: "100%",
          maxWidth: isMobile ? "100%" : "min(50vw, 480px)",
          borderRadius: 0,
        }
      : {
          bottom: "2rem",
          right: "2rem",
          width: 380,
          height: 560,
          borderRadius: "1.5rem",
        }),
  };

  return (
    <div className="ct-panel-open ct-scanlines" style={panelStyle}>
      {/* ─ Header ─ */}
      <header
        style={{
          position: "relative",
          padding: "1rem 1.1rem 0.9rem",
          borderBottom: `1px solid ${C.border}`,
          overflow: "hidden",
          flexShrink: 0,
          background: C.surface2,
        }}
      >
        {/* Subtle grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)",
            backgroundSize: "22px 22px",
            opacity: 0.35,
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Left */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <Avatar size={36} radius="0.6rem" fontSize="0.75rem" style={{ boxShadow: `0 0 16px rgba(252,75,1,.5), inset 0 1px 0 rgba(255,255,255,.2)` }} />
              <span style={{
                position: "absolute", bottom: -2, right: -2,
                width: 10, height: 10,
                borderRadius: "50%",
                background: C.green,
                border: `2px solid ${C.surface}`,
                boxShadow: "0 0 8px rgba(34,211,165,.8)",
                display: "block",
              }} />
            </div>
            <div>
              <div style={{ fontFamily: fontDisplay, fontSize: "0.82rem", fontWeight: 700, color: C.text, letterSpacing: "0.02em" }}>
                CodeTeak Assistant
              </div>
              <div style={{ fontSize: "0.63rem", color: C.textDim, letterSpacing: "0.06em", marginTop: 1 }}>
                <span style={{ color: C.green }}>● ONLINE</span> · services, pricing, projects
              </div>
            </div>
          </div>
          {/* Right */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button
              title={expanded ? "Compact view" : "Expand to sidebar"}
              onClick={() => setExpanded((v) => !v)}
              style={{
                padding: "0.2rem 0.5rem",
                borderRadius: "999px",
                border: `1px solid ${C.border}`,
                background: C.surface3,
                cursor: "pointer",
                color: C.textDim,
                fontFamily: fontMono,
                fontSize: "0.6rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {expanded ? "Compact" : "Expand"}
            </button>
            {[
              {
                label: (
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" width="13" height="13">
                    <path d="M2 4h12M5 4V2.5a.5.5 0 01.5-.5h5a.5.5 0 01.5.5V4m2 0l-.8 9a1 1 0 01-1 .9H4.8a1 1 0 01-1-.9L3 4" />
                  </svg>
                ),
                action: handleClear, title: "Clear chat",
              },
              {
                label: (
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="11" height="11">
                    <path d="M3 3l10 10M13 3L3 13" />
                  </svg>
                ),
                action: handleClose, title: "Close",
              },
            ].map(({ label, action, title }, i) => (
              <button
                key={i}
                title={title}
                onClick={action}
                style={{
                  width: 28, height: 28,
                  borderRadius: "0.5rem",
                  background: C.surface3,
                  border: `1px solid ${C.border}`,
                  cursor: "pointer",
                  color: C.textDim,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >{label}</button>
            ))}
          </div>
        </div>
      </header>

      {/* ─ Messages ─ */}
      <section
        className="ct-scrollbar"
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.85rem",
          backgroundColor: C.surface,
          backgroundImage:
            'linear-gradient(to bottom, rgba(0,0,0,0.75), rgba(0,0,0,0.9)), url("/ai.gif")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {messages.map((m) => (
          <Message
            key={m.id}
            role={m.role}
            text={m.text}
            time={m.time}
            onViewMember={handleViewMemberDetails}
          />
        ))}
        {typing && <TypingIndicator />}
        <div ref={bottomRef} />
      </section>

      {/* ─ Quick replies ─ */}
      {showQuick && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            padding: "0 1rem 0.6rem",
            flexShrink: 0,
            background: "#000",
          }}
        >
          {QUICK.map(q => (
            <button
              key={q}
              onClick={() => send(q)}
              style={{
                fontFamily: fontMono,
                fontSize: "0.62rem",
                padding: "0.3rem 0.75rem",
                borderRadius: 100,
                background: C.surface2,
                border: `1px solid ${C.border}`,
                color: C.textDim,
                cursor: "pointer",
                whiteSpace: "nowrap",
                letterSpacing: "0.02em",
              }}
            >{q}</button>
          ))}
        </div>
      )}

      {/* ─ Input ─ */}
      <form
        onSubmit={handleSubmit}
        style={{ borderTop: `1px solid ${C.border}`, padding: "0.75rem 1rem", background: C.surface2, flexShrink: 0 }}
      >
        <div
          style={{
            display: "flex", alignItems: "flex-end", gap: 8,
            background: C.surface3,
            border: `1px solid ${C.border}`,
            borderRadius: "1rem",
            padding: "0.5rem 0.6rem 0.5rem 0.9rem",
          }}
        >
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={e => { setInput(e.target.value); autoResize(e); }}
            onKeyDown={handleKey}
            placeholder="Ask a question…"
            disabled={typing}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              resize: "none",
              fontFamily: fontMono,
              fontSize: "0.72rem",
              color: C.text,
              lineHeight: 1.5,
              maxHeight: 80,
              minHeight: 20,
            }}
          />
          <button
            type="submit"
            disabled={typing || !input.trim()}
            style={{
              width: 32, height: 32,
              borderRadius: "0.6rem",
              border: "none",
              cursor: "pointer",
              background: C.brand,
              color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
              opacity: (typing || !input.trim()) ? 0.5 : 1,
              boxShadow: "0 2px 10px rgba(252,75,1,.4)",
            }}
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" width="14" height="14">
              <path d="M14 2L2 7l5 3 2 5 5-13z" />
            </svg>
          </button>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, padding: "0 0.2rem" }}>
          <div style={{ fontSize: "0.58rem", color: C.textDim, letterSpacing: "0.05em" }}>
            <kbd style={{ fontFamily: fontMono, background: C.surface3, border: `1px solid ${C.border}`, borderRadius: 3, padding: "0 3px" }}>Enter</kbd>
            {" "}to send ·{" "}
            <kbd style={{ fontFamily: fontMono, background: C.surface3, border: `1px solid ${C.border}`, borderRadius: 3, padding: "0 3px" }}>Shift+Enter</kbd>
            {" "}for newline
          </div>
          <div style={{ fontSize: "0.58rem", color: "rgba(255,255,255,.12)", letterSpacing: "0.06em" }}>
            Powered by <span style={{ color: C.brand, opacity: 0.6 }}>CodeTeak AI</span>
          </div>
        </div>
      </form>
    </div>
  );
}