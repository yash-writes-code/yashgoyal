import Link from "next/link";

const projects = [
  {
    name: "trendsta.in",
    href: "https://trendsta.in",
    emoji: "📈",
    description:
      "A minimalist platform designed for trend discovery and seamless digital engagement. Built to track and analyze modern social trends in real-time.",
    tags: ["Next.js", "React", "Trend Analytics"],
    accent: "#e8603a",
    status: "live",
  },
  {
    name: "printease.vercel.app",
    href: "https://printease.vercel.app",
    emoji: "🖨️",
    description:
      "An intuitive web application streamlining the printing process with ease and efficiency. Allows users to upload and manage documents for fast, hassle-free printing.",
    tags: ["React", "Node.js", "File Management"],
    accent: "#3a7bd5",
    status: "live",
  },
  {
    name: "ParkItUp",
    href: "https://parkitup.co.in",
    emoji: "🅿️",
    description:
      "Smart parking management platform. Contributed as Web Dev Intern — built out frontend features and RESTful integrations.",
    tags: ["Web Dev", "React", "REST API"],
    accent: "#2eb872",
    status: "live",
  },
  {
    name: "Dynamask — Parkinson's Detection",
    href: "#",
    emoji: "🧠",
    description:
      "Research project applying dynamask to make deep-learning based Parkinson's disease detection interpretable and explainable for clinicians.",
    tags: ["Python", "Deep Learning", "XAI", "Neurology"],
    accent: "#f0a653",
    status: "wip",
  },
];

export default function ProjectsPage() {
  return (
    <div className="dot-bg" style={{ minHeight: "100vh" }}>
      {/* Nav */}
      <nav className="page-header-strip" style={{ position: "sticky", top: 0, zIndex: 50 }}>
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
          <Link
            href="/"
            className="font-pixel"
            style={{ fontSize: 10, color: "var(--accent)", marginRight: 16, textDecoration: "none" }}
          >
            YG
          </Link>
          <Link href="/" className="nav-pixel-link">← home</Link>
          <Link href="/experience" className="nav-pixel-link">experience</Link>
          <Link href="/blogs" className="nav-pixel-link">blogs</Link>
        </div>
      </nav>

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 80px" }}>
        {/* Page header */}
        <div style={{ marginBottom: 40 }}>
          <div className="pixel-tag" style={{ color: "var(--accent)", marginBottom: 12 }}>
            ⚙️ PROJECTS
          </div>
          <h1
            className="font-pixel"
            style={{ fontSize: "clamp(14px, 3vw, 22px)", color: "var(--text)", lineHeight: 1.6, marginBottom: 12 }}
          >
            THINGS I&apos;VE BUILT
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7 }}>
            A collection of projects I&apos;ve built — from web apps to research experiments.
          </p>
        </div>

        <div className="pixel-divider" />

        {/* Projects grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {projects.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target={p.href !== "#" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="anime-card"
              style={{ padding: "24px", textDecoration: "none", display: "block", borderLeft: `4px solid ${p.accent}` }}
              id={`project-${p.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 12 }}>
                <span style={{ fontSize: 32 }}>{p.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
                    <span
                      style={{
                        fontWeight: 800,
                        fontSize: 16,
                        color: "var(--text)",
                      }}
                    >
                      {p.name}
                    </span>
                    <span
                      className="pixel-tag"
                      style={{
                        color: p.status === "live" ? "var(--accent3)" : "var(--accent-warm)",
                        borderColor: p.status === "live" ? "var(--accent3)" : "var(--accent-warm)",
                        fontSize: 7,
                      }}
                    >
                      {p.status === "live" ? "● LIVE" : "◐ WIP"}
                    </span>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 14 }}>
                {p.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {p.tags.map((tag) => (
                  <span key={tag} className="pixel-tag" style={{ color: p.accent, borderColor: p.accent }}>
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

        <footer
          style={{ marginTop: 64, paddingTop: 20, borderTop: "2px dashed var(--border)", textAlign: "center" }}
        >
          <span className="font-pixel" style={{ fontSize: 8, color: "var(--text-light)" }}>
            © {new Date().getFullYear()} Yash Goyal &nbsp;·&nbsp; made with ☕ &amp; pixels
          </span>
        </footer>
      </main>
    </div>
  );
}
