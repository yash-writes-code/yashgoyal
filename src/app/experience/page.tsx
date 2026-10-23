import Link from "next/link";

const experiences = [
  {
    role: "Web Dev Intern",
    company: "ParkItUp",
    companyUrl: "https://parkitup.co.in",
    period: "2024",
    duration: "Internship",
    emoji: "🅿️",
    description:
      "Worked as a Web Development Intern at ParkItUp — a smart parking management startup. Built frontend features, implemented REST API integrations, and contributed to improving the UX of the platform.",
    tags: ["React", "REST API", "Frontend", "JavaScript"],
    accent: "#e8603a",
  },
];

const research = [
  {
    title: "Parkinson's Disease Detection — XAI",
    institution: "Delhi Technological University",
    period: "2025 — Ongoing",
    emoji: "🧠",
    description:
      "Researching the intersection of neurology and deep learning. Currently applying dynamask to make deep-learning-based Parkinson's disease detection explainable and interpretable for medical practitioners.",
    tags: ["Python", "Deep Learning", "XAI", "dynamask", "Neurology"],
    accent: "#3a7bd5",
  },
];

const education = [
  {
    degree: "B.Tech — Computer Science",
    institution: "Delhi Technological University (DTU)",
    period: "2023 — 2027",
    emoji: "🎓",
    description:
      "CS undergrad with a focus on machine learning, algorithms, and full-stack development. Active in research and open-source projects.",
    tags: ["CS", "ML", "DTU", "Batch '27"],
    accent: "#2eb872",
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
          <Link href="/" className="nav-pixel-link">← home</Link>
          <Link href="/projects" className="nav-pixel-link">projects</Link>
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
            My professional journey — internships, research, and education.
          </p>
        </div>

        <div className="pixel-divider" />

        {/* Work Experience */}
        <section style={{ marginBottom: 40 }}>
          <div
            className="font-pixel"
            style={{ fontSize: 9, color: "var(--accent)", marginBottom: 18, textTransform: "uppercase", letterSpacing: "0.1em" }}
          >
            // work experience
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {experiences.map((exp) => (
              <div
                key={exp.company}
                className="anime-card"
                style={{ padding: 24, borderLeft: `4px solid ${exp.accent}` }}
                id={`exp-${exp.company.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 12 }}>
                  <span style={{ fontSize: 28 }}>{exp.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 16, color: "var(--text)", marginBottom: 2 }}>
                      {exp.role}
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: exp.accent, fontWeight: 700, fontSize: 13, textDecoration: "none" }}
                      >
                        {exp.company} ↗
                      </a>
                      <span className="pixel-tag" style={{ color: "var(--text-light)" }}>{exp.period}</span>
                      <span className="pixel-tag" style={{ color: "var(--text-light)" }}>{exp.duration}</span>
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 14 }}>
                  {exp.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {exp.tags.map((tag) => (
                    <span key={tag} className="pixel-tag" style={{ color: exp.accent, borderColor: exp.accent }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="pixel-divider" />

        {/* Research */}
        <section style={{ marginBottom: 40 }}>
          <div
            className="font-pixel"
            style={{ fontSize: 9, color: "var(--accent2)", marginBottom: 18, textTransform: "uppercase", letterSpacing: "0.1em" }}
          >
            // research
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {research.map((r) => (
              <div
                key={r.title}
                className="anime-card"
                style={{ padding: 24, borderLeft: `4px solid ${r.accent}` }}
                id={`research-${r.title.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 20)}`}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 12 }}>
                  <span style={{ fontSize: 28 }}>{r.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 16, color: "var(--text)", marginBottom: 2 }}>
                      {r.title}
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                      <span style={{ color: r.accent, fontWeight: 700, fontSize: 13 }}>{r.institution}</span>
                      <span className="pixel-tag" style={{ color: "var(--text-light)" }}>{r.period}</span>
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 14 }}>
                  {r.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {r.tags.map((tag) => (
                    <span key={tag} className="pixel-tag" style={{ color: r.accent, borderColor: r.accent }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="pixel-divider" />

        {/* Education */}
        <section style={{ marginBottom: 40 }}>
          <div
            className="font-pixel"
            style={{ fontSize: 9, color: "var(--accent3)", marginBottom: 18, textTransform: "uppercase", letterSpacing: "0.1em" }}
          >
            // education
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {education.map((ed) => (
              <div
                key={ed.degree}
                className="anime-card"
                style={{ padding: 24, borderLeft: `4px solid ${ed.accent}` }}
                id={`edu-${ed.institution.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 20)}`}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 12 }}>
                  <span style={{ fontSize: 28 }}>{ed.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 16, color: "var(--text)", marginBottom: 2 }}>
                      {ed.degree}
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                      <span style={{ color: ed.accent, fontWeight: 700, fontSize: 13 }}>{ed.institution}</span>
                      <span className="pixel-tag" style={{ color: "var(--text-light)" }}>{ed.period}</span>
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 14 }}>
                  {ed.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {ed.tags.map((tag) => (
                    <span key={tag} className="pixel-tag" style={{ color: ed.accent, borderColor: ed.accent }}>
                      {tag}
                    </span>
                  ))}
                </div>
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
