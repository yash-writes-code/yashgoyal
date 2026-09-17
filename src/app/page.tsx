import React from "react";

function GithubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedInIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.96 0 1.74-.78 1.74-1.75a1.75 1.75 0 1 0-1.74 1.75m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  );
}

function LeetCodeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  );
}

function MailIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto p-8 font-mono min-h-screen pt-16 pb-16">
      <header className="mb-14">
        <h1 className="text-3xl font-bold mb-3 tracking-wide">Yash Goyal</h1>
        <p className="text-gray-400 mb-4">Batch 27 CS from Delhi Technological University</p>
        <div className="flex items-center gap-4 text-gray-400">
          <a
            href="https://github.com/yash-writes-code"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className="hover:text-white transition-colors p-0.5"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/yash-goyal-313092281/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className="hover:text-white transition-colors p-0.5"
          >
            <LinkedInIcon className="w-5 h-5" />
          </a>
          <a
            href="https://leetcode.com/u/yash-writes-code"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LeetCode"
            title="LeetCode"
            className="hover:text-white transition-colors p-0.5"
          >
            <LeetCodeIcon className="w-5 h-5" />
          </a>
          <a
            href="mailto:yashgoyalambk@gmail.com"
            aria-label="Email"
            title="Email"
            className="hover:text-white transition-colors p-0.5"
          >
            <MailIcon className="w-5 h-5" />
          </a>
        </div>
      </header>

      {/* Projects Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-1 inline-block">Projects</h2>
        <div className="space-y-8">
          {/* Trendsta */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <div>
                <span className="font-semibold text-white">Trendsta – AI Content Research Tool for Creators</span>
                <span className="text-gray-400 italic text-sm ml-1">| Next.js, Prisma, PostgreSQL, n8n</span>
              </div>
              <div className="flex items-center gap-3 shrink-0 text-sm mt-1 sm:mt-0">
                <a
                  href="https://trendsta.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white underline transition-colors"
                >
                  Live
                </a>
                <span className="text-gray-600">|</span>
                <a
                  href="https://github.com/yash-writes-code/trendsta/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Trendsta GitHub"
                  title="GitHub Repository"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span className="text-xs">GitHub</span>
                </a>
              </div>
            </div>
            <ul className="list-disc pl-4 space-y-1.5 text-gray-300 text-sm leading-relaxed mt-2.5">
              <li>
                Built a research tool that crawls 100+ niche-specific posts per request via an n8n workflow to surface what&apos;s currently working in a creator&apos;s content space
              </li>
              <li>
                Integrated Dodo Payments (a Merchant of Record) for subscription billing, including webhook handling and secure authentication
              </li>
              <li>
                Engineered the app&apos;s interaction layer with the n8n research workflow to trigger and consume automated content analysis
              </li>
              <li>
                Implemented BullMQ-based asynchronous processing across 2 background workflows for content analysis and email delivery, decoupling long-running jobs from the request flow
              </li>
              <li>
                Applied the transactional outbox pattern to avoid the dual-write problem, ensuring database updates and published events stay consistent
              </li>
            </ul>
          </div>

          {/* SAMAS */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <div>
                <span className="font-semibold text-white">SAMAS</span>
                <span className="text-gray-400 italic text-sm ml-1">| Python, LangGraph, Pinecone, FastAPI, RAGAS, LangSmith</span>
              </div>
              <div className="flex items-center gap-3 shrink-0 text-sm mt-1 sm:mt-0">
                <a
                  href="https://samas-pi.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white underline transition-colors"
                >
                  Live
                </a>
                <span className="text-gray-600">|</span>
                <a
                  href="https://github.com/shivamrajput-py/SAMAS"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="SAMAS GitHub"
                  title="GitHub Repository"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span className="text-xs">GitHub</span>
                </a>
              </div>
            </div>
            <ul className="list-disc pl-4 space-y-1.5 text-gray-300 text-sm leading-relaxed mt-2.5">
              <li>
                Designed a Proof Scoring Engine cross-verifying self-reported skills against scraped GitHub/LinkedIn evidence, orchestrated across 5 agents covering profiling, adaptive testing, search, JD analysis, and role tiering
              </li>
              <li>
                Built Pinecone hybrid search (dense + BM25) to rank live listings against verified profiles, streaming agent execution state to the frontend via SSE
              </li>
              <li>
                Instrumented RAGAS/LangSmith evaluation (faithfulness, relevancy, context precision all &gt;89%), validated by 50+ student testers
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-1 inline-block">Experience</h2>
        <div className="space-y-6">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h3 className="font-semibold text-white">Web Developer Intern</h3>
              <span className="text-xs sm:text-sm text-gray-400">Jun 2025 – Jul 2025</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 text-sm text-gray-400 mt-0.5">
              <div>
                <a
                  href="https://parkitup.co.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline hover:bg-white hover:text-black transition-colors px-1 font-semibold"
                >
                  ParkItUp
                </a>
                <span className="italic ml-1">| React.js, Django, DRF</span>
              </div>
              <span className="italic text-xs sm:text-sm">Remote</span>
            </div>
            <ul className="list-disc pl-4 space-y-1.5 text-gray-300 text-sm leading-relaxed mt-2.5">
              <li>
                Built 10+ reusable React components integrating the Google Maps API for real-time location search and booking
              </li>
              <li>
                Implemented Google authentication via Firebase, streamlining manual account-verification workload
              </li>
              <li>
                Designed scalable relational database models and built 5+ RESTful APIs in Django for booking and user data
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-1 inline-block">Research</h2>
        <div className="space-y-6">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <div>
                <span className="font-semibold text-white">Dynamask – Reproducing Perturbation-Based Saliency for Time-Series</span>
                <span className="text-gray-400 italic text-sm ml-1">| PyTorch</span>
              </div>
              <span className="text-xs sm:text-sm text-gray-400">Notebook</span>
            </div>
            <ul className="list-disc pl-4 space-y-1.5 text-gray-300 text-sm leading-relaxed mt-2.5">
              <li>
                Reimplemented the Dynamask framework (Crabbé &amp; van der Schaar, ICML 2021) end-to-end, including the learnable perturbation mask, blur operator, and the fidelity + area/smoothness optimization objective
              </li>
              <li>
                Benchmarked 5 saliency methods – Dynamask, FO, FP, IG, and SHAP – on time-series data, with Dynamask achieving 0.698 AUR vs. 0.125–0.131 for competing methods
              </li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="mt-20 border-t border-gray-800 pt-8 text-sm text-gray-500 text-center">
        © {new Date().getFullYear()} Yash Goyal.
      </footer>
    </main>
  );
}
