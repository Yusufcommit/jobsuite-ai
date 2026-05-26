const features = [
  {
    icon: "📄",
    title: "Resume Analyzer",
    description:
      "Get an AI-powered score, strengths, weaknesses, and specific improvements for your resume in seconds.",
  },
  {
    icon: "✍️",
    title: "Cover Letter Generator",
    description:
      "Generate tailored cover letters for any job description. Choose your tone — professional, confident, or concise.",
  },
  {
    icon: "🎯",
    title: "JD Matcher",
    description:
      "See exactly how well your resume matches a job description, with a score, matched skills, and missing skills.",
  },
  {
    icon: "🔍",
    title: "Skills Gap Detection",
    description:
      "Instantly identify which skills you're missing for any role so you can focus your preparation.",
  },
  {
    icon: "⚡",
    title: "Instant Results",
    description:
      "Powered by Google Gemini AI. Get deep, actionable feedback in seconds — not hours.",
  },
  {
    icon: "🛡️",
    title: "Privacy First",
    description:
      "Your resume data is never stored. Every analysis runs in memory and is discarded immediately.",
  },
];

export default function Features() {
  return (
    <section id="features" className="border-t border-white/10 bg-black px-6 py-24">
      <div className="mx-auto max-w-6xl">

        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-gray-500">
            Features
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Everything you need to get hired
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Three AI-powered tools that work together to maximize your chances
            of landing the job you want.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-white/20 hover:bg-white/10"
            >
              <div className="mb-4 text-2xl">{feature.icon}</div>
              <h3 className="mb-2 text-base font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}