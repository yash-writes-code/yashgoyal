export default function Home() {
  return (
    <main className="max-w-2xl mx-auto p-8 font-mono min-h-screen pt-16 pb-16">
      <header className="mb-14">
        <h1 className="text-3xl font-bold mb-3 tracking-wide">Yash Goyal</h1>
        <p className="text-gray-400">Batch 27 CS from Delhi Technological University</p>
      </header>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-1 inline-block">Work Experience</h2>
        <ul className="list-square list-inside space-y-2 text-gray-300">
          <li>
            Web Dev Intern at <a href="https://parkitup.co.in" target="_blank" rel="noopener noreferrer" className="text-white underline hover:bg-white hover:text-black transition-colors px-1 font-semibold">ParkItUp</a>
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-1 inline-block">Research</h2>
        <p className="text-gray-300 leading-relaxed mb-2">
          Researching on the intersection of neurology and deep learning.
        </p>
        <p className="text-gray-300 leading-relaxed">
          Currently applying <span className="text-white font-medium">dynamask</span> to make Parkinson's disease detection explainable.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-1 inline-block">Projects</h2>
        <ul className="list-none space-y-6 text-gray-300">
          <li className="relative pl-6 before:content-['■'] before:absolute before:left-0 before:text-gray-500 before:text-xs before:top-1.5">
            <div>
              <a href="https://trendsta.in" target="_blank" rel="noopener noreferrer" className="text-white underline hover:bg-white hover:text-black transition-colors px-1 font-semibold">
                trendsta.in
              </a>
            </div>
            <p className="mt-1 text-gray-400 text-sm">
              A minimalist platform designed for trend discovery and seamless digital engagement. Built to track and analyze modern social trends.
            </p>
          </li>
          <li className="relative pl-6 before:content-['■'] before:absolute before:left-0 before:text-gray-500 before:text-xs before:top-1.5">
            <div>
              <a href="https://printease.vercel.app" target="_blank" rel="noopener noreferrer" className="text-white underline hover:bg-white hover:text-black transition-colors px-1 font-semibold">
                printease.vercel.app
              </a>
            </div>
            <p className="mt-1 text-gray-400 text-sm">
              An intuitive web application streamlining the printing process with ease and efficiency. Allows users to upload and manage documents for fast printing.
            </p>
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-1 inline-block">Coding Profiles</h2>
        <ul className="list-square list-inside space-y-2 text-gray-300">
          <li><span className="text-white font-medium">Leetcode:</span> 100+ problems solved</li>
        </ul>
      </section>
      
      <footer className="mt-20 border-t border-gray-800 pt-8 text-sm text-gray-500 text-center">
        © {new Date().getFullYear()} Yash Goyal.
      </footer>
    </main>
  );
}
