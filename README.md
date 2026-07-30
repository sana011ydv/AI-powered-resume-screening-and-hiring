# 🚀 ScreenSmart – AI Resume Screening & Interview Scheduling Copilot

ScreenSmart is an AI-powered recruitment assistant built for the **MiniHack: Agentic AI Buildathon 2026**. It automates resume screening, candidate evaluation, and interview scheduling by combining a modern React frontend, AI-powered resume analysis, and an n8n automation workflow.

The platform enables recruiters to upload a Job Description (JD) and multiple resumes, automatically evaluates each candidate against the job requirements, generates transparent hiring justifications, and schedules interviews for shortlisted applicants.

---

# ✨ Features

- 📄 Upload Job Description (JD)
- 📂 Upload multiple candidate resumes
- 🤖 AI-powered resume analysis and matching
- 🎯 Candidate classification:
  - Strong Fit
  - Possible Fit
  - Not a Fit
- 📝 Explainable AI with detailed hiring rationale
- 📊 Interactive recruiter dashboard
- 📧 Automated interview invitation emails
- 📅 Google Calendar interview scheduling
- ⚡ End-to-end workflow automation using n8n
- 🔍 Candidate review and status tracking
- 💻 Responsive and modern frontend UI

---

# 🛠 Tech Stack

## Frontend
- React.js
- TypeScript
- Vite
- Tailwind CSS

## Backend
- n8n Workflow Automation
- AI Prompt Engineering
- Large Language Model (LLM)

## Integrations
- Gmail API
- Google Calendar API

---
# 🔄 Workflow

1. Recruiter uploads a Job Description.
2. Recruiter uploads multiple resumes.
3. AI extracts candidate information.
4. Each resume is matched against the JD.
5. Candidates receive:
   - Fit Score
   - Fit Tier
   - AI-generated explanation
6. Results are displayed on the recruiter dashboard.
7. Strong-fit candidates are automatically shortlisted.
8. Interview invitation emails are sent via Gmail.
9. Interview slots are created in Google Calendar.
10. Recruiter tracks every candidate from one dashboard.

---

# 📊 Candidate Evaluation

Every candidate is evaluated using AI based on:

- Skills Match
- Work Experience
- Education
- Certifications
- Required Technologies
- Job Requirements

The system generates a transparent explanation instead of only providing a numerical score.

Example:

**Strong Fit (92%)**

Reason:
- Matches 9 of 10 required skills
- 4+ years of relevant experience
- Required certification available
- Strong project experience

---

# 🎯 Problem Statement

Recruiters often spend hours manually reviewing hundreds of resumes for a single job opening. Manual screening is time-consuming, inconsistent, and delays the hiring process.

ScreenSmart solves this by automating resume analysis, providing explainable AI recommendations, and streamlining interview scheduling through intelligent workflow automation.

---

# 🚀 Key Highlights

- Modern React Frontend
- Fully Automated n8n Workflow
- AI Resume Analysis
- Explainable Hiring Decisions
- Automated Gmail Notifications
- Google Calendar Integration
- Recruiter Dashboard
- Batch Resume Processing

---

# 💻 Setup Instructions

## Clone Repository

bash
git clone https://github.com/sana011ydv/AI-powered-resume-screening-and-hiring.git
``

## Frontend

`bash
cd frontend
npm install
npm run dev
``

## Backend / Automation

1. Import the provided n8n workflow.
2. Configure:
   - Gmail Credentials
   - Google Calendar Credentials
   - AI Model Credentials
3. Activate the workflow.

---

# 📸 Screenshots

Add screenshots here:

- Home Page-<img width="1916" height="970" alt="image" src="https://github.com/user-attachments/assets/73583557-8e27-4cef-8d14-0f6d84fd03c2" />

- Resume Upload-<img width="1912" height="962" alt="image" src="https://github.com/user-attachments/assets/861767ab-20cd-4c34-b7af-9c7ffd330775" />
- Candidate Evaluation-<img width="1916" height="962" alt="image" src="https://github.com/user-attachments/assets/4d554cab-ba82-4e10-8c3d-bcae79cdf31d" />

- Interview Scheduling-<img width="1915" height="967" alt="image" src="https://github.com/user-attachments/assets/179712fa-1acf-410a-a96d-ca1ecfaae5e2" />
- output mail- <img width="694" height="1280" alt="output mail screenshort" src="https://github.com/user-attachments/assets/48f8f229-4f8d-4149-b30f-3fb35e20a23b" />


- n8n Workflow-<img width="1865" height="980" alt="n8n workflow screenshort" src="https://github.com/user-attachments/assets/ecd191cc-6f3a-436c-a544-df8a92e9735b" />
  THE N8N WORKFLOW FILE NAMED -REsume screening json.

---

# 🔮 Future Enhancements

- ATS Integration
- LinkedIn Resume Import
- Multi-language Resume Support
- AI Interview Question Generator
- Analytics Dashboard
- Candidate Ranking Reports
- Team Collaboration
- PDF Report Generation

---

# 👨‍💻 Developed By

**Shani Yadav**

MiniHack: Agentic AI Buildathon 2026

---

# 📄 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!
