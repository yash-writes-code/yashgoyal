import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getBlogBySlug, getBlogSlugs } from "@/lib/blogs";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return { title: "Blog Not Found" };

  return {
    title: `${post.metadata.title} — Yash Goyal`,
    description: post.metadata.description,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      type: "article",
      publishedTime: post.metadata.date,
    },
  };
}

// Custom styled components for MDX
const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="font-pixel"
      style={{
        fontSize: "clamp(18px, 3.5vw, 24px)",
        color: "var(--text)",
        lineHeight: 1.5,
        marginTop: 36,
        marginBottom: 16,
      }}
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="font-pixel"
      style={{
        fontSize: "clamp(14px, 2.8vw, 18px)",
        color: "var(--text)",
        lineHeight: 1.5,
        marginTop: 32,
        marginBottom: 14,
        paddingBottom: 8,
        borderBottom: "1px dashed var(--border)",
      }}
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      style={{
        fontSize: 18,
        fontWeight: 700,
        color: "var(--text)",
        marginTop: 24,
        marginBottom: 10,
      }}
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      style={{
        fontSize: 15,
        lineHeight: 1.85,
        color: "var(--text-muted)",
        marginBottom: 18,
      }}
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      style={{
        color: "var(--accent)",
        textDecoration: "underline",
        textUnderlineOffset: 3,
        fontWeight: 600,
        transition: "opacity 0.15s",
      }}
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      style={{
        paddingLeft: 22,
        marginBottom: 18,
        color: "var(--text-muted)",
        lineHeight: 1.8,
        listStyleType: "square",
      }}
      {...props}
    />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol
      style={{
        paddingLeft: 22,
        marginBottom: 18,
        color: "var(--text-muted)",
        lineHeight: 1.8,
      }}
      {...props}
    />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li style={{ marginBottom: 6, fontSize: 15 }} {...props} />
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="anime-card"
      style={{
        margin: "24px 0",
        padding: "16px 20px",
        borderLeft: "4px solid var(--accent)",
        fontStyle: "italic",
        color: "var(--text)",
        fontSize: 15,
        lineHeight: 1.7,
      }}
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <div
      style={{
        margin: "20px 0",
        borderRadius: 8,
        overflow: "hidden",
        border: "1px solid var(--border)",
      }}
    >
      <pre
        style={{
          background: "#0d1117",
          padding: "16px 18px",
          overflowX: "auto",
          fontSize: 13,
          lineHeight: 1.65,
          color: "#e6edf3",
          fontFamily: "'Courier New', Courier, monospace",
        }}
        {...props}
      />
    </div>
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    // Check if inline or inside pre
    const isInline = !props.className;
    if (isInline) {
      return (
        <code
          style={{
            background: "rgba(120, 120, 140, 0.15)",
            color: "var(--accent2)",
            padding: "2px 6px",
            borderRadius: 4,
            fontSize: "0.9em",
            fontFamily: "monospace",
          }}
          {...props}
        />
      );
    }
    return <code {...props} />;
  },
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div style={{ overflowX: "auto", margin: "24px 0" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 14,
          textAlign: "left",
        }}
        {...props}
      />
    </div>
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      style={{
        padding: "10px 14px",
        borderBottom: "2px solid var(--border)",
        color: "var(--text)",
        fontWeight: 700,
      }}
      {...props}
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
      style={{
        padding: "10px 14px",
        borderBottom: "1px solid var(--border)",
        color: "var(--text-muted)",
      }}
      {...props}
    />
  ),
  hr: () => <div className="pixel-divider" style={{ margin: "28px 0" }} />,
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const { metadata, content } = post;

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

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 80px" }}>
        {/* Back button */}
        <div style={{ marginBottom: 28 }}>
          <Link
            href="/blogs"
            className="font-pixel"
            style={{
              fontSize: 9,
              color: "var(--accent3)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            ← all blogs
          </Link>
        </div>

        {/* Post Header */}
        <header style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
            {metadata.tags.map((tag) => (
              <span
                key={tag}
                className="pixel-tag"
                style={{ color: "var(--accent3)", borderColor: "var(--accent3)", fontSize: 8 }}
              >
                {tag}
              </span>
            ))}
          </div>

          <h1
            className="font-pixel"
            style={{
              fontSize: "clamp(18px, 4vw, 26px)",
              color: "var(--text)",
              lineHeight: 1.5,
              marginBottom: 16,
            }}
          >
            {metadata.title}
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 12,
              color: "var(--text-light)",
            }}
          >
            <span>{metadata.date}</span>
            <span>·</span>
            <span>{metadata.readTime}</span>
          </div>
        </header>

        <div className="pixel-divider" style={{ marginBottom: 32 }} />

        {/* Article Body rendered with next-mdx-remote */}
        <article style={{ fontSize: 15, lineHeight: 1.85 }}>
          <MDXRemote source={content} components={mdxComponents} />
        </article>

        <div className="pixel-divider" style={{ margin: "48px 0 24px" }} />

        {/* Post Footer navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link
            href="/blogs"
            className="font-pixel"
            style={{
              fontSize: 9,
              color: "var(--accent)",
              textDecoration: "none",
            }}
          >
            ← back to blogs
          </Link>
          <span className="font-pixel" style={{ fontSize: 8, color: "var(--text-light)" }}>
            thanks for reading!
          </span>
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
