import Link from "next/link";

/* ─── Tech icons ─── */
type TechKey = "nodejs" | "express" | "postgresql" | "react" | "django" | "firebase";

type TechIconDef = {
  label: string;
  color?: string;
  svg?: string;
  src?: string;
};

const TECH_ICONS: Record<TechKey, TechIconDef> = {
  nodejs: {
    label: "Node.js",
    src: "/nodejs-icon-svgrepo-com.svg",
  },
  express: {
    label: "Express.js",
    color: "var(--text)",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 010 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z"/></svg>`,
  },
  postgresql: {
    label: "PostgreSQL",
    src: "/postgresql-icon.svg",
  },
  react: {
    label: "React",
    src: "/react-svgrepo-com.svg",
  },
  django: {
    label: "Django",
    src: "/django-svgrepo-com.svg",
  },
  firebase: {
    label: "Firebase",
    src: "/firebase-svgrepo-com.svg",
  },
};

function TechIcon({ tech }: { tech: TechKey }) {
  const icon = TECH_ICONS[tech];
  if (!icon) return null;
  if (icon.src) {
    return (
      <span
        title={icon.label}
        style={{ display: "inline-flex", alignItems: "center", flexShrink: 0 }}
      >
        <img
          src={icon.src}
          alt={icon.label}
          width={20}
          height={20}
          style={{ width: 20, height: 20, objectFit: "contain", display: "block" }}
        />
      </span>
    );
  }
  return (
    <span
      title={icon.label}
      style={{ display: "inline-flex", alignItems: "center", color: icon.color, flexShrink: 0, opacity: 0.9 }}
      dangerouslySetInnerHTML={{ __html: icon.svg || "" }}
    />
  );
}

/* ─── Experience data ─── */
const experiences: {
  role: string;
  company: string;
  companyUrl: string;
  period: string;
  duration: string;
  type: string;
  description: string;
  techIcons: TechKey[];
  accent: string;
}[] = [
  {
    role: "Backend Developer Intern",
    company: "Fixolutions Pvt. Ltd.",
    companyUrl: "https://getfixolutions.com/",
    period: "Dec 2025 – Jan 2026",
    duration: "2 mos",
    type: "Remote",
    description:
      "Contributed to core backend architecture for an after-sales service monorepo powering 3 interconnected systems. Built an automated complaint registration engine routing customer requests to designated service centers in under 5 minutes. Implemented a smart multi-factor technician assignment algorithm (availability, proximity, workload, requirements) and created real-time technician tracking with diagnostic cost breakdown and mutual rating systems.",
    techIcons: ["nodejs", "express", "postgresql"],
    accent: "#3a7bd5",
  },
  {
    role: "Web Developer Intern",
    company: "Upzeal Technologies Pvt. Ltd.",
    companyUrl: "https://parkitup.co.in",
    period: "Jun 2025 – Jul 2025",
    duration: "2 mos",
    type: "Remote",
    description:
      "Engineered frontend and backend features for a scalable smart parking management platform designed to support high volume lots and bookings. Developed 10+ modular React components integrated with Google Maps API for real-time location discovery and slot reservation, streamlined onboarding via Firebase Google authentication, and built 5+ RESTful endpoints in Django backed by optimized relational models.",
    techIcons: ["react", "django", "firebase"],
    accent: "#e8603a",
  },
];

export default function ExperiencePage() {
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
          <Link href="/" className="nav-pixel-link">home</Link>
          <Link href="/projects" className="nav-pixel-link">projects</Link>
          <Link href="/experience" className="nav-pixel-link">experience</Link>
          <Link href="/blogs" className="nav-pixel-link">blogs</Link>
        </div>
      </nav>

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 80px" }}>
        {/* Page header */}
        <div style={{ marginBottom: 40 }}>
          <div className="pixel-tag" style={{ color: "var(--accent2)", marginBottom: 12 }}>
            💼 EXPERIENCE
          </div>
          <h1
            className="font-pixel"
            style={{ fontSize: "clamp(14px, 3vw, 22px)", color: "var(--text)", lineHeight: 1.6, marginBottom: 12 }}
          >
            WHERE I&apos;VE WORKED
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7 }}>
            My professional journey and industry internships.
          </p>
        </div>

        <div className="pixel-divider" />

        {/* Work Experience */}
        <section style={{ marginBottom: 40 }}>
          <div
            className="font-pixel"
            style={{ fontSize: 9, color: "var(--accent)", marginBottom: 18, textTransform: "uppercase", letterSpacing: "0.1em" }}
          >
            {"// work experience"}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {experiences.map((exp) => (
              <div
                key={exp.company}
                className="anime-card"
                style={{ padding: 24, borderLeft: `4px solid ${exp.accent}` }}
                id={`exp-${exp.company.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
              >
                <div style={{ marginBottom: 14 }}>
                  {/* Header: role + badges */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 8,
                      marginBottom: 4,
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: 16, color: "var(--text)" }}>
                      {exp.role}
                    </div>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <span className="pixel-tag" style={{ color: "var(--accent2)" }}>{exp.period}</span>
                      <span className="pixel-tag" style={{ color: "var(--text-light)" }}>{exp.type}</span>
                    </div>
                  </div>

                  {/* Company link */}
                  <div style={{ marginBottom: 10 }}>
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: exp.accent, fontWeight: 700, fontSize: 13, textDecoration: "none" }}
                    >
                      {exp.company} ↗
                    </a>
                  </div>

                  {/* Tech stack icons (no text labels, matching projects page) */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    {exp.techIcons.map((tech) => (
                      <TechIcon key={tech} tech={tech} />
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.75 }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

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
