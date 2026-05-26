export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">

        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-blue-400" />
          <span className="text-sm font-semibold text-white">JobSuite AI</span>
        </div>

        <p className="text-center text-sm text-gray-500">
          AI-powered job application tools. Built by{" "}
          <a
            href="https://github.com/Yusufcommit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 transition hover:text-white"
          >
            Yusuf Abdirashid
          </a>
          .
        </p>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/Yusufcommit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 transition hover:text-white"
          >
            GitHub
          </a>
          <a
            href="https://tr.linkedin.com/in/yusuf-abdirashid"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 transition hover:text-white"
          >
            LinkedIn
          </a>
          <a
            href="mailto:yusufabdirashid100@gmail.com"
            className="text-sm text-gray-500 transition hover:text-white"
          >
            Contact
          </a>
        </div>

      </div>
    </footer>
  );
}