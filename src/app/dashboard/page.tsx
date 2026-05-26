"use client";

import { useState } from "react";

type Tab = "analyzer" | "cover-letter" | "matcher";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("analyzer");

  return (
    <main className="min-h-screen bg-black text-white">

      {/* Top Bar */}
      <div className="border-b border-white/10 bg-black/60 px-8 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-400" />
            <span className="text-sm font-semibold text-white">JobSuite AI</span>
          </div>
          <span className="text-sm text-gray-500">Dashboard</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/10 px-8">
        <div className="mx-auto flex max-w-5xl gap-1 pt-4">
          {[
            { id: "analyzer", label: "Resume Analyzer" },
            { id: "cover-letter", label: "Cover Letter" },
            { id: "matcher", label: "JD Matcher" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`rounded-t-lg px-5 py-2.5 text-sm font-medium transition ${
                activeTab === tab.id
                  ? "bg-white/10 text-white"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mx-auto max-w-5xl px-8 py-10">
        {activeTab === "analyzer" && <ResumeAnalyzer />}
        {activeTab === "cover-letter" && <CoverLetterGenerator />}
        {activeTab === "matcher" && <JDMatcher />}
      </div>

    </main>
  );
}


// ── Resume Analyzer ────────────────────────────────────────────────────────────

function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analyze-resume`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">

      {/* Input */}
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold">Resume Analyzer</h2>
          <p className="mt-1 text-sm text-gray-500">
            Upload your resume and get an AI-powered quality score with actionable feedback.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <label className="mb-2 block text-sm font-medium text-gray-300">Resume</label>
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/5 px-6 py-10 text-center">
            <p className="mb-1 text-sm text-gray-400">PDF or DOCX</p>
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="mt-3 text-sm text-gray-400 file:mr-4 file:rounded-lg file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:text-white file:transition file:hover:bg-white/20"
            />
          </div>
          {file && <p className="mt-2 text-xs text-gray-500">{file.name}</p>}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !file}
          className="w-full rounded-xl bg-white py-3 text-sm font-semibold text-black transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>

      {/* Results */}
      <div>
        {!result && !loading && (
          <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-white/10 py-24 text-center">
            <p className="text-sm text-gray-600">Results will appear here.</p>
          </div>
        )}

        {loading && (
          <div className="flex h-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-24 text-center">
            <div>
              <div className="mx-auto mb-4 h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <p className="text-sm text-gray-400">Analyzing your resume...</p>
            </div>
          </div>
        )}

        {result && (
          <div className="flex flex-col gap-4">

            {/* Score */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-400">Resume Score</span>
                <span className="text-3xl font-bold text-white">{result.score}/100</span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-white transition-all"
                  style={{ width: `${result.score}%` }}
                />
              </div>
              <p className="mt-3 text-sm text-gray-400">{result.summary}</p>
            </div>

            {/* Strengths */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="mb-3 text-sm font-medium text-green-400">Strengths</p>
              <ul className="flex flex-col gap-2">
                {result.strengths?.map((s: string, i: number) => (
                  <li key={i} className="text-sm text-gray-300">✓ {s}</li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="mb-3 text-sm font-medium text-red-400">Weaknesses</p>
              <ul className="flex flex-col gap-2">
                {result.weaknesses?.map((w: string, i: number) => (
                  <li key={i} className="text-sm text-gray-300">✗ {w}</li>
                ))}
              </ul>
            </div>

            {/* Improvements */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="mb-3 text-sm font-medium text-blue-400">Improvements</p>
              <ul className="flex flex-col gap-2">
                {result.improvements?.map((imp: string, i: number) => (
                  <li key={i} className="text-sm text-gray-300">→ {imp}</li>
                ))}
              </ul>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}


// ── Cover Letter Generator ─────────────────────────────────────────────────────

function CoverLetterGenerator() {
  const [file, setFile] = useState<File | null>(null);
  const [jd, setJd] = useState("");
  const [tone, setTone] = useState("professional");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    if (!file || !jd.trim()) return;
    setLoading(true);
    setError("");
    setResult("");

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("job_description", jd);
    formData.append("tone", tone);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate-cover-letter`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data.cover_letter);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">

      {/* Input */}
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold">Cover Letter Generator</h2>
          <p className="mt-1 text-sm text-gray-500">
            Generate a tailored cover letter for any job in seconds.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <label className="mb-2 block text-sm font-medium text-gray-300">Resume</label>
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="text-sm text-gray-400 file:mr-4 file:rounded-lg file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:text-white file:transition file:hover:bg-white/20"
          />
          {file && <p className="mt-2 text-xs text-gray-500">{file.name}</p>}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <label className="mb-2 block text-sm font-medium text-gray-300">Tone</label>
          <div className="flex gap-3">
            {["professional", "confident", "concise"].map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`rounded-lg px-4 py-2 text-sm capitalize transition ${
                  tone === t
                    ? "bg-white text-black"
                    : "border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <label className="mb-2 block text-sm font-medium text-gray-300">Job Description</label>
          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste the job description here..."
            rows={8}
            className="w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-gray-300 placeholder-gray-600 outline-none transition focus:border-white/30"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !file || !jd.trim()}
          className="w-full rounded-xl bg-white py-3 text-sm font-semibold text-black transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? "Generating..." : "Generate Cover Letter"}
        </button>

        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>

      {/* Result */}
      <div>
        {!result && !loading && (
          <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-white/10 py-24 text-center">
            <p className="text-sm text-gray-600">Your cover letter will appear here.</p>
          </div>
        )}

        {loading && (
          <div className="flex h-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-24 text-center">
            <div>
              <div className="mx-auto mb-4 h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <p className="text-sm text-gray-400">Writing your cover letter...</p>
            </div>
          </div>
        )}

        {result && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-400">Cover Letter</p>
              <button
                onClick={handleCopy}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-300 transition hover:bg-white/10"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-300">
              {result}
            </p>
          </div>
        )}
      </div>

    </div>
  );
}


// ── JD Matcher ─────────────────────────────────────────────────────────────────

function JDMatcher() {
  const [file, setFile] = useState<File | null>(null);
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!file || !jd.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("job_description", jd);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/match-job`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">

      {/* Input */}
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold">JD Matcher</h2>
          <p className="mt-1 text-sm text-gray-500">
            See how well your resume matches a job description and what's missing.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <label className="mb-2 block text-sm font-medium text-gray-300">Resume</label>
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="text-sm text-gray-400 file:mr-4 file:rounded-lg file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:text-white file:transition file:hover:bg-white/20"
          />
          {file && <p className="mt-2 text-xs text-gray-500">{file.name}</p>}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <label className="mb-2 block text-sm font-medium text-gray-300">Job Description</label>
          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste the job description here..."
            rows={10}
            className="w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-gray-300 placeholder-gray-600 outline-none transition focus:border-white/30"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !file || !jd.trim()}
          className="w-full rounded-xl bg-white py-3 text-sm font-semibold text-black transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? "Matching..." : "Match Resume to JD"}
        </button>

        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>

      {/* Results */}
      <div>
        {!result && !loading && (
          <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-white/10 py-24 text-center">
            <p className="text-sm text-gray-600">Match results will appear here.</p>
          </div>
        )}

        {loading && (
          <div className="flex h-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-24 text-center">
            <div>
              <div className="mx-auto mb-4 h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <p className="text-sm text-gray-400">Analyzing match...</p>
            </div>
          </div>
        )}

        {result && (
          <div className="flex flex-col gap-4">

            {/* Score */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-400">Match Score</span>
                <span className="text-3xl font-bold text-white">{result.match_score}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-white transition-all"
                  style={{ width: `${result.match_score}%` }}
                />
              </div>
            </div>

            {/* Matched Skills */}
            {result.matched_skills?.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="mb-3 text-sm font-medium text-green-400">Matched Skills</p>
                <div className="flex flex-wrap gap-2">
                  {result.matched_skills.map((s: string) => (
                    <span key={s} className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs text-green-400">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Skills */}
            {result.missing_skills?.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="mb-3 text-sm font-medium text-red-400">Missing Skills</p>
                <div className="flex flex-wrap gap-2">
                  {result.missing_skills.map((s: string) => (
                    <span key={s} className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs text-red-400">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tips */}
            {result.tips?.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="mb-3 text-sm font-medium text-blue-400">AI Tips</p>
                <ul className="flex flex-col gap-2">
                  {result.tips.map((tip: string, i: number) => (
                    <li key={i} className="text-sm text-gray-300">→ {tip}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        )}
      </div>

    </div>
  );
}