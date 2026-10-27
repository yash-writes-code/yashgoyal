import Link from "next/link";

/* ─── Inline SVG tech icons ─── */
type TechKey = "nextjs" | "react" | "typescript" | "nodejs" | "python" | "deeplearning" | "openai" | "langchain" | "langgraph" | "mongodb" | "prisma" | "postgresql" | "django" | "firebase";

type TechIconDef = {
  label: string;
  color?: string;
  svg?: string;
  src?: string;
};

const TECH_ICONS: Record<TechKey, TechIconDef> = {
  nextjs: {
    label: "Next.js", color: "#000",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.052.54-.052.479 0 .558.019.683.155a466.83 466.83 0 0 1 2.895 4.361c1.558 2.362 3.687 5.587 4.734 7.171l1.9 2.878.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/></svg>`,
  },
  react: {
    label: "React",
    src: "/react-svgrepo-com.svg",
  },
  typescript: {
    label: "TypeScript", color: "#3178C6",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.063v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg>`,
  },
  nodejs: {
    label: "Node.js",
    src: "/nodejs-icon-svgrepo-com.svg",
  },
  python: {
    label: "Python", color: "#3776AB",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/></svg>`,
  },
  deeplearning: {
    label: "Deep Learning", color: "#FF6F00",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><circle cx="12" cy="4" r="2"/><circle cx="4" cy="12" r="2"/><circle cx="20" cy="12" r="2"/><circle cx="8" cy="20" r="2"/><circle cx="16" cy="20" r="2"/><circle cx="12" cy="12" r="2.5"/><line x1="12" y1="6" x2="12" y2="9.5" stroke="currentColor" stroke-width="1.5"/><line x1="6" y1="12" x2="9.5" y2="12" stroke="currentColor" stroke-width="1.5"/><line x1="14.5" y1="12" x2="18" y2="12" stroke="currentColor" stroke-width="1.5"/><line x1="10" y1="14" x2="8.5" y2="18" stroke="currentColor" stroke-width="1.5"/><line x1="14" y1="14" x2="15.5" y2="18" stroke="currentColor" stroke-width="1.5"/></svg>`,
  },
  openai: {
    label: "OpenAI", color: "#10A37F",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.843-3.369 2.02-1.168a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.402-.681zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg>`,
  },
  langchain: {
    label: "LangChain", color: "#1C3C3C",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M6.5 4.5A2.5 2.5 0 0 1 9 7v.5h6V7a2.5 2.5 0 0 1 5 0v3a2.5 2.5 0 0 1-5 0v-.5H9v.5a2.5 2.5 0 0 1-5 0V7a2.5 2.5 0 0 1 2.5-2.5zm0 1A1.5 1.5 0 0 0 5 7v3a1.5 1.5 0 0 0 3 0V7A1.5 1.5 0 0 0 6.5 5.5zm11 0A1.5 1.5 0 0 0 16 7v3a1.5 1.5 0 0 0 3 0V7a1.5 1.5 0 0 0-1.5-1.5zM9 14v.5h6V14a2.5 2.5 0 0 1 5 0v3a2.5 2.5 0 0 1-5 0v-.5H9v.5a2.5 2.5 0 0 1-5 0v-3a2.5 2.5 0 0 1 5 0zm-2.5-1A1.5 1.5 0 0 0 5 14v3a1.5 1.5 0 0 0 3 0v-3a1.5 1.5 0 0 0-1.5-1.5zm11 0A1.5 1.5 0 0 0 16 14v3a1.5 1.5 0 0 0 3 0v-3a1.5 1.5 0 0 0-1.5-1.5z"/></svg>`,
  },
  langgraph: {
    label: "LangGraph", color: "#1C3C3C",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M6.099 5.88H17.9C21.264 5.88 24 8.625 24 12s-2.736 6.12-6.099 6.12H6.1C2.736 18.12 0 15.375 0 12s2.736-6.12 6.099-6.12Zm5.419 9.487c.148.156.367.148.561.108h.002c.09-.073-.038-.166-.16-.254-.074-.054-.145-.105-.166-.15.068-.083-.132-.27-.289-.417a1.539 1.539 0 0 1-.15-.151c-.11-.12-.155-.273-.2-.427a1.575 1.575 0 0 0-.11-.297c-.304-.708-.653-1.41-1.143-2.01-.315-.398-.674-.755-1.033-1.112-.232-.23-.463-.46-.683-.701-.226-.234-.362-.521-.499-.81-.114-.24-.228-.482-.396-.693-.507-.75-2.107-.955-2.342.105 0 .033-.01.054-.039.075-.13.095-.245.203-.342.334-.238.332-.274.895.022 1.193l.001-.02c.01-.15.02-.29.139-.399.228.198.576.268.841.12.32.46.422 1.015.525 1.572.085.464.17.93.382 1.341l.014.022c.124.208.25.419.41.6.059.09.178.187.297.284.157.128.314.256.329.366v.146c-.001.29-.002.59.184.83.103.208-.15.418-.352.392a.989.989 0 0 1-.354-.043c-.165-.04-.329-.08-.462-.003-.038.04-.091.042-.145.043-.064.002-.129.004-.167.07a.29.29 0 0 1-.045.066c-.042.051-.087.107-.033.149l.015-.011c.082-.063.16-.123.27-.085-.014.082.039.103.092.125l.027.012a.357.357 0 0 1-.008.057c-.009.046-.017.09.018.13a.605.605 0 0 0 .046-.056c.037-.046.073-.094.139-.11.144.192.289.112.471.012.206-.114.459-.253.81-.056-.135-.007-.255.01-.345.121-.023.025-.042.054-.002.087.207-.135.294-.086.375-.04.06.032.115.063.212.024l.07-.037c.155-.084.314-.17.499-.14-.139.04-.188.127-.242.223-.026.047-.054.097-.094.143-.021.021-.03.046-.007.082.29-.024.4-.098.548-.197.07-.047.15-.1.261-.157.124-.076.248-.028.368.02.13.05.255.1.371-.013.037-.035.083-.035.129-.036.016 0 .033 0 .05-.002-.037-.194-.24-.191-.448-.189-.24.003-.483.005-.475-.295.222-.152.224-.415.226-.665 0-.06 0-.119.005-.176.163.092.336.163.508.234.162.066.323.133.474.215.157.254.404.59.732.568.008-.026.016-.048.026-.074.019.003.039.008.059.014.086.021.178.045.223-.057zm6.429-2.886a1.014 1.014 0 0 0 1.729-.715 1.01 1.01 0 0 0-1.013-1.01c-.126 0-.25.023-.364.068l-.58-.848-.405.278.583.851a1.009 1.009 0 0 0 .05 1.376zm-1.818-2.744a1.014 1.014 0 0 0 1.42-.615 1.008 1.008 0 0 0-.845-1.293 1.015 1.015 0 0 0-1.095.712 1.008 1.008 0 0 0 .52 1.196zm0 5.867a1.015 1.015 0 0 0 1.42-.615 1.008 1.008 0 0 0-.845-1.293 1.015 1.015 0 0 0-1.095.712 1.008 1.008 0 0 0 .52 1.196zm.932-3.586v-.503h-1.55a1.003 1.003 0 0 0-.218-.412l.583-.864-.424-.28-.583.863a1.014 1.014 0 0 0-.333-.06c-.268 0-.525.106-.714.294a1.002 1.002 0 0 0 1.047 1.655l.583.864.42-.281-.579-.864c.104-.119.178-.26.217-.412z"/></svg>`,
  },
  mongodb: {
    label: "MongoDB", color: "#47A248",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 0 0 3.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/></svg>`,
  },
  prisma: {
    label: "Prisma", color: "#2D3748",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M21.8068 18.2848L13.5528.7565c-.207-.4382-.639-.7065-1.1286-.7065-.4897 0-.9218.2683-1.1286.7065L2.9287 17.1119c-.1786.3796-.1786.8023.0013 1.1885l1.5569 3.3202c.206.436.6381.7139 1.1286.7139.2097 0 .4166-.0617.598-.1768l6.769-4.3765 6.8002 4.3765c.1815.1151.3884.1768.598.1768.4904 0 .9225-.2779 1.1286-.7139l1.5568-3.3202c.1786-.3862.1786-.8089-.0013-1.1956zM12.4228 17.67l-5.2009-3.3573 5.2009-11.0966 5.2009 11.0966z"/></svg>`,
  },
  postgresql: {
    label: "PostgreSQL",
    src: "/postgresql-icon.svg",
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

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16} aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

/* ─── Project data ─── */
const projects: {
  name: string;
  href: string;
  github: string | null;
  emoji: string;
  description: string;
  techIcons: TechKey[];
  accent: string;
  status: "live" | "wip";
}[] = [
    {
      name: "trendsta.in",
      href: "https://trendsta.in",
      github: "https://github.com/yash-writes-code/trendsta",
      emoji: "📈",
      description:
        "A minimalist platform designed for trend discovery and seamless digital engagement. Built to track and analyze modern social trends in real-time.",
      techIcons: ["nextjs", "react", "typescript"],
      accent: "#e8603a",
      status: "live",
    },
    {
      name: "SAMAS",
      href: "https://samas-pi.vercel.app/",
      github: "https://github.com/yashgoyal-16/samas",
      emoji: "🤖",
      description:
        "A Multi-Agent System that finds the job you deserve and guides you to your best potential by mapping what you need to learn. Upload your resume — SAMAS mirrors your potential.",
      techIcons: ["nextjs", "typescript", "openai", "langgraph"],
      accent: "#8b5cf6",
      status: "live",
    },
    {
      name: "printease.vercel.app",
      href: "https://printease.vercel.app",
      github: "https://github.com/vijaykr338/print-ease",
      emoji: "🖨️",
      description:
        "An intuitive web application streamlining the printing process with ease and efficiency. Allows users to upload and manage documents for fast, hassle-free printing.",
      techIcons: ["react", "nodejs", "mongodb"],
      accent: "#3a7bd5",
      status: "live",
    },
    {
      name: "Dynamask — Parkinson's Detection",
      href: "#",
      github: null,
      emoji: "🧠",
      description:
        "Research project applying dynamask to make deep-learning based Parkinson's disease detection interpretable and explainable for clinicians.",
      techIcons: ["python"],
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
          <Link href="/" className="nav-pixel-link">home</Link>
          <Link href="/projects" className="nav-pixel-link">projects</Link>
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
            <div
              key={p.name}
              className="anime-card"
              style={{ padding: "24px", display: "block", borderLeft: `4px solid ${p.accent}` }}
              id={`project-${p.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 12 }}>
                {/* <span style={{ fontSize: 32 }}>{p.emoji}</span> */}
                <div style={{ flex: 1 }}>
                  {/* Row 1: name + status badge + github icon */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
                    <a
                      href={p.href}
                      target={p.href !== "#" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      style={{
                        fontWeight: 800,
                        fontSize: 16,
                        color: "var(--text)",
                        textDecoration: "none",
                      }}
                    >
                      {p.name}
                    </a>
                    {/* <span
                      className="pixel-tag"
                      style={{
                        color: p.status === "live" ? "var(--accent3)" : "var(--accent-warm)",
                        borderColor: p.status === "live" ? "var(--accent3)" : "var(--accent-warm)",
                        fontSize: 7,
                      }}
                    >
                      {p.status === "live" ? "● LIVE" : "◐ WIP"}
                    </span> */}
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View on GitHub"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          color: "var(--text-muted)",
                          textDecoration: "none",
                          transition: "color 0.15s",
                        }}
                      >
                        <GitHubIcon />
                      </a>
                    )}
                  </div>
                  {/* Row 2: tech icons */}
                  <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
                    {p.techIcons.map((tech) => (
                      <TechIcon key={tech} tech={tech} />
                    ))}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7 }}>
                {p.description}
              </p>
            </div>
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
