"use client";
import Link from "next/link";
import SpreadText from "./components/SpreadText";

const navLinks = [
  { label: "home", href: "/" },
  { label: "projects", href: "/projects" },
  { label: "experience", href: "/experience" },
  { label: "blogs", href: "/blogs" },
];

const quickLinks = [
  {
    href: "/projects",
    icon: "⚙️",
    label: "Projects",
    desc: "things i've built",
    accent: "#e8603a",
  },
  {
    href: "/experience",
    icon: "💼",
    label: "Experience",
    desc: "where i've worked",
    accent: "#3a7bd5",
  },
  {
    href: "/blogs",
    icon: "📖",
    label: "Blogs",
    desc: "thoughts & notes",
    accent: "#2eb872",
  },
  {
    href: "/resume.pdf",
    icon: "📄",
    label: "Resume",
    desc: "download cv",
    accent: "#f0a653",
    external: true,
  },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/yash-writes-code",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yash-goyal-313092281/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://x.com/yash_goyal_797",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.858L1.258 2.25h7.184l4.26 5.636 5.543-5.636Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/yash-writes-code",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:yashgoyalambk@gmail.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.907 1.528-1.148C21.69 2.28 24 3.434 24 5.457z"/>
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="dot-bg" style={{ minHeight: "100vh" }}>
      {/* Top nav */}
      <nav
        className="page-header-strip"
        style={{ position: "sticky", top: 0, zIndex: 50 }}
      >
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="nav-pixel-link">
              {l.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Hero section */}
      <main
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "48px 24px 80px",
        }}
      >
        {/* Name + Avatar row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 40,
            flexWrap: "wrap",
            marginBottom: 32,
          }}
        >
          {/* Avatar */}
          <div
            className="float-anim avatar-circle-frame"
          >
            <img
              src="/pfp.jpg"
              alt="Yash Goyal"
            />
          </div>

          {/* Name + tagline */}
          <div style={{ flex: 1, minWidth: 200 }}>
            <div
              className="pixel-tag"
              style={{ marginBottom: 12, color: "var(--accent)" }}
            >
              &gt; HELLO WORLD
            </div>
            <h1
              className="font-pixel"
              style={{
                fontSize: "clamp(14px, 3vw, 22px)",
                lineHeight: 1.5,
                color: "var(--text)",
                marginBottom: 8,
                whiteSpace: "nowrap",
              }}
            >
              <SpreadText text="YASH GOYAL" spreadRadius={70} />
            </h1>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 10,
              }}
            >
              <span
                className="font-pixel"
                style={{ fontSize: 10, color: "var(--accent2)" }}
              >
                CS&apos;27
              </span>
              <span style={{ color: "var(--border-dark)" }}>◆</span>
              <span
                className="font-pixel"
                style={{ fontSize: 9, color: "var(--text-muted)" }}
              >
                DTU
              </span>
            </div>

          </div>
        </div>

        {/* Pixel divider */}
        <div className="pixel-divider" />

        {/* Bio */}
        <div
          className="anime-card"
          style={{ padding: "20px 24px", marginBottom: 32 }}
        >
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.9,
              color: "var(--text-muted)",
            }}
          >
            Hey, I&apos;m{" "}
            <strong style={{ color: "var(--text)" }}>Yash</strong> — a CS grad
            with a strong grip on fundamentals, currently researching the
            intersection of{" "}
            <strong style={{ color: "var(--accent3)" }}>AI &amp; neurology</strong>.
            I&apos;m excited about{" "}
            <strong style={{ color: "var(--accent2)" }}>agentic systems</strong>
            {" "}and the future of AI.
          </p>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.9,
              color: "var(--text-muted)",
              marginTop: 12,
            }}
          >
            I have deep proficiency in{" "}
            <strong style={{ color: "var(--accent)" }}>backend development</strong>
            {" "}and am diving deep into{" "}
            <strong style={{ color: "var(--text)" }}>system design</strong>.
          </p>
          <div
            style={{
              margin: "16px 0 12px",
              height: "1px",
              background: "var(--border)",
            }}
          />
          <p
            style={{
              fontSize: 14,
              color: "var(--text-light)",
              fontStyle: "italic",
            }}
          >
            🚀 Actively looking for job opportunities — let&apos;s build something great.
          </p>
        </div>

        {/* Section quick-link cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: 16,
            marginBottom: 40,
          }}
        >
          {quickLinks.map((card) =>
            card.external ? (
              <a
                key={card.label}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="section-card"
                id={`quick-link-${card.label.toLowerCase()}`}
                style={{ "--card-accent": card.accent } as React.CSSProperties}
              >
                <span className="card-icon">{card.icon}</span>
                <span
                  className="card-label"
                  style={{ color: card.accent }}
                >
                  {card.label}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    color: "var(--text-light)",
                    fontStyle: "italic",
                  }}
                >
                  {card.desc}
                </span>
              </a>
            ) : (
              <Link
                key={card.label}
                href={card.href}
                className="section-card"
                id={`quick-link-${card.label.toLowerCase()}`}
              >
                <span className="card-icon">{card.icon}</span>
                <span
                  className="card-label"
                  style={{ color: card.accent }}
                >
                  {card.label}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    color: "var(--text-light)",
                    fontStyle: "italic",
                  }}
                >
                  {card.desc}
                </span>
              </Link>
            )
          )}
        </div>

        {/* Pixel divider */}
        <div className="pixel-divider" />

        {/* Social links */}
        <div>
          <div
            className="font-pixel"
            style={{
              fontSize: 8,
              color: "var(--text-light)",
              marginBottom: 14,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            // find me on
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                id={`social-${s.label.toLowerCase().replace(/\s/g, "-")}`}
                aria-label={s.label}
              >
                {s.icon}
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer
          style={{
            marginTop: 64,
            paddingTop: 20,
            borderTop: "2px dashed var(--border)",
            textAlign: "center",
          }}
        >
          <span
            className="font-pixel"
            style={{ fontSize: 8, color: "var(--text-light)" }}
          >
            © {new Date().getFullYear()} Yash Goyal &nbsp;·&nbsp; made with
            ☕ &amp; pixels
          </span>
        </footer>
      </main>
    </div>
  );
}
