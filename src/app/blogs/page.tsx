import Link from "next/link";

export default function BlogsPage() {
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
          <div className="pixel-tag" style={{ color: "var(--accent3)", marginBottom: 12 }}>
            📖 BLOGS
          </div>
          <h1
            className="font-pixel"
            style={{ fontSize: "clamp(14px, 3vw, 22px)", color: "var(--text)", lineHeight: 1.6, marginBottom: 12 }}
          >
            THOUGHTS &amp; NOTES
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7 }}>
            My writings on technology, research, and everything in between.
          </p>
        </div>

        <div className="pixel-divider" />

        {/* Empty state */}
        <div
          className="anime-card"
          style={{
            padding: "60px 32px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div style={{ fontSize: 64 }}>📭</div>
          <div
            className="font-pixel"
            style={{ fontSize: 10, color: "var(--text-muted)", lineHeight: 2 }}
          >
            COMING SOON...
          </div>
          <p style={{ fontSize: 14, color: "var(--text-light)", lineHeight: 1.7, maxWidth: 320 }}>
            I&apos;m working on some posts about deep learning, XAI, and things I find interesting.
            Check back later!
          </p>
          <div className="font-pixel" style={{ fontSize: 8, color: "var(--text-light)" }}>
            <span style={{ color: "var(--accent3)" }}>~/blogs</span>
            <span style={{ color: "var(--text-muted)" }}> $</span>
            <span style={{ color: "var(--accent)", animation: "blink 1s step-end infinite" }}> ▊</span>
          </div>
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
