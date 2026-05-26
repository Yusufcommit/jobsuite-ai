# JobSuite AI — Frontend

> Next.js frontend for JobSuite AI — a suite of AI-powered tools to help job seekers land their next role.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=flat&logo=vercel)

**Live Demo:** https://jobsuite-ai.vercel.app  
**Backend Repo:** [jobsuite-backend](https://github.com/Yusufcommit/jobsuite-backend)  
**Live API:** https://jobsuite-backend.onrender.com

---

## What It Does

Three AI tools in one clean dashboard:

- **Resume Analyzer** — upload your resume, get a score, strengths, weaknesses, and specific improvements
- **Cover Letter Generator** — paste a job description, choose a tone, get a ready-to-send cover letter
- **JD Matcher** — see your match percentage, matched skills, missing skills, and AI tips

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing page — hero, features, footer |
| `/dashboard` | Three-tab product dashboard |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| State | React hooks |
| API | FastAPI + Groq Llama 3 |
| Deployment | Vercel |

---

## Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/Yusufcommit/jobsuite-ai.git
cd jobsuite-ai

# 2. Install dependencies
npm install

# 3. Set environment variable
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# 4. Start dev server
npm run dev
```

Open `http://localhost:3000`

> Make sure the [backend](https://github.com/Yusufcommit/jobsuite-backend) is running first.

---

## Project Structure

```
jobsuite-ai/
├── src/
│   └── app/
│       ├── page.tsx              # Landing page
│       ├── dashboard/
│       │   └── page.tsx          # Three-tab dashboard
│       └── components/
│           ├── Navbar.tsx
│           ├── Features.tsx
│           └── Footer.tsx
├── public/
├── tailwind.config.ts
└── next.config.ts
```

---

## Roadmap

- [x] Landing page with hero and features
- [x] Resume Analyzer tab
- [x] Cover Letter Generator with tone selector
- [x] JD Matcher with skill gap detection
- [x] Loading states and error handling
- [x] Production deployment on Vercel
- [ ] Authentication
- [ ] Save results history
- [ ] Mobile polish

---

## Related

- **Backend API:** [jobsuite-backend](https://github.com/Yusufcommit/jobsuite-backend)
- **HireLens AI:** [hirelens-ai](https://github.com/Yusufcommit/hirelens-ai)

---

## Built by Yusuf

**Yusuf Abdirashid** — AI Full Stack Developer  
Building polished AI-powered tools for hiring and job applications.

[![GitHub](https://img.shields.io/badge/GitHub-Yusufcommit-181717?style=flat&logo=github)](https://github.com/Yusufcommit)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Yusuf_Abdirashid-0A66C2?style=flat&logo=linkedin)](https://tr.linkedin.com/in/yusuf-abdirashid)
[![Email](https://img.shields.io/badge/Email-yusufabdirashid100@gmail.com-EA4335?style=flat&logo=gmail)](mailto:yusufabdirashid100@gmail.com)