import Link from "next/link";
import Navbar from "./components/Navbar";
import Features from "./components/Features";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-200px] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-[-150px] right-[-100px] h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <Navbar />

      {/* Hero */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">

        <div className="mb-6 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur">
          AI-Powered Job Application Tools
        </div>

        <h1 className="max-w-4xl text-6xl font-bold leading-tight tracking-tight md:text-8xl">
          Land your next job with AI
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-400 md:text-xl">
          Analyze your resume, generate tailored cover letters, and match
          yourself to any job description — all in one place.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            href="/dashboard"
            className="rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:scale-105"
          >
            Get Started
          </Link>
          <a
            href="#features"
            className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-white backdrop-blur transition hover:bg-white/10"
          >
            Learn More
          </a>
        </div>

      </section>

      <Features />
      <Footer />

    </main>
  );
}