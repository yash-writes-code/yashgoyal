import Link from "next/link";
import { getAllBlogs } from "@/lib/blogs";

export default function BlogsPage() {
  const blogs = getAllBlogs();

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
            Reflections, retrospectives, and explorations in software architecture, system design, and AI.
          </p>
        </div>

        <div className="pixel-divider" />

        {/* Blogs List */}
        {blogs.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {blogs.map((post) => (
              <article
                key={post.slug}
                className="anime-card"
                style={{
                  padding: 24,
                  borderLeft: "4px solid var(--accent3)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {/* Meta row: tags + date */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {post.metadata.tags.map((tag) => (
                      <span
                        key={tag}
                        className="pixel-tag"
                        style={{ color: "var(--accent3)", borderColor: "var(--accent3)", fontSize: 7 }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-light)" }}>
                    {post.metadata.date} &nbsp;·&nbsp; {post.metadata.readTime}
                  </div>
                </div>

                {/* Title */}
                <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, lineHeight: 1.5 }}>
                  <Link
                    href={`/blogs/${post.slug}`}
                    style={{
                      color: "var(--text)",
                      textDecoration: "none",
                      transition: "color 0.15s",
                    }}
                    className="blog-title-link"
                  >
                    {post.metadata.title}
                  </Link>
                </h2>

                {/* Description */}
                <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7, margin: 0 }}>
                  {post.metadata.description}
                </p>

                {/* Read more link */}
                <div style={{ marginTop: 4 }}>
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="font-pixel"
                    style={{
                      fontSize: 8,
                      color: "var(--accent3)",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    READ ARTICLE →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty state */
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
              Working on new posts about software architecture, system design, and AI. Check back soon!
            </p>
            <div className="font-pixel" style={{ fontSize: 8, color: "var(--text-light)" }}>
              <span style={{ color: "var(--accent3)" }}>~/blogs</span>
              <span style={{ color: "var(--text-muted)" }}> $</span>
              <span style={{ color: "var(--accent)", animation: "blink 1s step-end infinite" }}> ▊</span>
            </div>
          </div>
        )}

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
