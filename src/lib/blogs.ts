import fs from "fs";
import path from "path";

const BLOGS_DIR = path.join(process.cwd(), "src", "content", "blogs");

export interface BlogMetadata {
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  coverImage?: string;
}

export interface BlogPost {
  slug: string;
  metadata: BlogMetadata;
  content: string;
}

/**
 * Extracts metadata and clean body content from MDX files.
 * Supports both `export const metadata = { ... }` and YAML frontmatter (`--- ... ---`).
 */
function parseMdxFile(rawContent: string, fallbackSlug: string): { metadata: BlogMetadata; content: string } {
  let metadata: Partial<BlogMetadata> = {};
  let content = rawContent;

  // 1. Check for `export const metadata = { ... };`
  const exportMatch = rawContent.match(/export\s+const\s+metadata\s*=\s*(\{[\s\S]*?\});?/);
  if (exportMatch) {
    try {
      // Evaluate safe JS object
      const evaluated = new Function(`return ${exportMatch[1]}`)();
      if (typeof evaluated === "object" && evaluated !== null) {
        metadata = evaluated;
      }
    } catch {
      // Fallback regex extraction if Function eval fails
      const titleMatch = exportMatch[1].match(/title:\s*["'`](.*?)["'`]/);
      const descMatch = exportMatch[1].match(/description:\s*["'`](.*?)["'`]/);
      const dateMatch = exportMatch[1].match(/date:\s*["'`](.*?)["'`]/);
      const readTimeMatch = exportMatch[1].match(/readTime:\s*["'`](.*?)["'`]/);
      const tagsMatch = exportMatch[1].match(/tags:\s*\[([\s\S]*?)\]/);

      metadata = {
        title: titleMatch ? titleMatch[1] : fallbackSlug,
        description: descMatch ? descMatch[1] : "",
        date: dateMatch ? dateMatch[1] : "",
        readTime: readTimeMatch ? readTimeMatch[1] : "5 min read",
        tags: tagsMatch
          ? tagsMatch[1]
              .split(",")
              .map((t) => t.replace(/["'`\s]/g, ""))
              .filter(Boolean)
          : [],
      };
    }

    // Strip the export statement from MDX content so it doesn't collide in renderer
    content = rawContent.replace(exportMatch[0], "").trim();
  }

  // 2. Check for YAML frontmatter `--- ... ---`
  const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (frontmatterMatch) {
    const yaml = frontmatterMatch[1];
    const lines = yaml.split(/\r?\n/);
    lines.forEach((line) => {
      const colonIdx = line.indexOf(":");
      if (colonIdx !== -1) {
        const key = line.slice(0, colonIdx).trim();
        const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, "");
        if (key === "tags") {
          try {
            metadata.tags = JSON.parse(value);
          } catch {
            metadata.tags = value.split(",").map((s) => s.trim());
          }
        } else if (key in metadata === false) {
          (metadata as Record<string, unknown>)[key] = value;
        }
      }
    });
    content = content.replace(frontmatterMatch[0], "").trim();
  }

  // 3. If title is not set, extract from first H1; then strip leading H1 so it doesn't duplicate the page header
  const h1Match = content.match(/^#\s+([^\r\n]+)/);
  if (!metadata.title && h1Match) {
    metadata.title = h1Match[1].trim();
  }
  content = content.replace(/^#\s+[^\r\n]+\r?\n*/, "").trim();

  const finalMetadata: BlogMetadata = {
    title: metadata.title || fallbackSlug.replace(/-/g, " "),
    description: metadata.description || "",
    date: metadata.date || new Date().toISOString().split("T")[0],
    readTime: metadata.readTime || "5 min read",
    tags: Array.isArray(metadata.tags) ? metadata.tags : [],
    coverImage: metadata.coverImage,
  };

  return { metadata: finalMetadata, content };
}

export function getBlogSlugs(): string[] {
  if (!fs.existsSync(BLOGS_DIR)) {
    return [];
  }
  const files = fs.readdirSync(BLOGS_DIR);
  return files
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => file.replace(/\.(mdx|md)$/, ""));
}

export function getBlogBySlug(slug: string): BlogPost | null {
  const mdxPath = path.join(BLOGS_DIR, `${slug}.mdx`);
  const mdPath = path.join(BLOGS_DIR, `${slug}.md`);

  let filePath = "";
  if (fs.existsSync(mdxPath)) {
    filePath = mdxPath;
  } else if (fs.existsSync(mdPath)) {
    filePath = mdPath;
  } else {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { metadata, content } = parseMdxFile(raw, slug);

  return {
    slug,
    metadata,
    content,
  };
}

export function getAllBlogs(): BlogPost[] {
  const slugs = getBlogSlugs();
  const posts = slugs
    .map((slug) => getBlogBySlug(slug))
    .filter((p): p is BlogPost => p !== null);

  // Sort latest first
  return posts.sort((a, b) => (new Date(b.metadata.date).getTime() || 0) - (new Date(a.metadata.date).getTime() || 0));
}
