import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-blue-400" />
          <span className="text-sm font-semibold tracking-wide text-white">
            JobSuite AI
          </span>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm text-gray-400 transition hover:text-white">
            Features
          </a>
        </div>

        <Link
          href="/dashboard"
          className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-gray-100"
        >
          Get Started
        </Link>

      </div>
    </nav>
  );
}