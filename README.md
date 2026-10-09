# 🎯 AI Interview Ready Platform

> Practice role-specific mock interviews, get instant AI feedback and scores, and turn every session into flashcards you'll actually remember.

🔗 **Live:** [https://ai-interview-ready-platform.vercel.app/](https://ai-interview-ready-platform.vercel.app/)

![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-0F172A?logo=tailwindcss&logoColor=38BDF8)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white)
![Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?logo=googlegemini&logoColor=white)


## 📖 Overview

**AI Interview Ready** is a full-stack web app that helps candidates prepare for technical interviews. Choose a job role, experience level, difficulty, and number of questions. The platform uses AI to generate tailored interview questions, evaluates your written answers, and gives you a score along with strengths, areas to improve, and a recommendation. Questions worth revisiting can be bookmarked into flashcards for quick revision.

## ✨ Features

### 🔐 Authentication & Account
- Register, login, and logout with JWT-based, cookie-based authentication
- Email verification using one-time passwords (OTP), with a resend countdown
- Protected routes and a custom 404 page

### 👤 Profile
- Profile card with animated avatar, location, email, and average score
- Edit profile name, location, field of expertise, about me, and skills (tag-style input)
- PDF resume upload, stored on Cloudinary
- Partial updates: only the fields you change are saved, and existing data is never wiped
- Email verification status (Verified / Pending) with an inline OTP form

### 🎤 Interviews
- Create an interview by job role, experience level, difficulty, and number of questions
- AI-generated questions with ideal answers (Google Gemini)
- Google Forms–style answer page with a live progress bar and answered indicators
- After submitting, compare your answers against the ideal answers
- AI evaluation: overall score, strengths, areas for improvement, and a recommendation
- Interview history, with the most recent interview first

### 🗂️ Revision
- Bookmark important questions into a flashcard-style revision deck

### 📊 Dashboard
- Interviews taken, average score, recent interview history, and a flashcard revision reminder


## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), React Router, Tailwind CSS, Axios, Lucide React, Lottie |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| Cache / OTP storage | Redis |
| AI | Google Gemini API |
| Email | Nodemailer (Gmail) |
| File storage | Image Kit |
| Auth | JWT (refresh tokens) |
| Deployment | Vercel |


## 🔄 How It Works

1. **Create:** the user picks a job role, experience level, difficulty, and number of questions.
2. **Generate:** the backend asks Gemini for questions and ideal answers, then saves them with the interview.
3. **Answer:** the user answers every question on a single form page.
4. **Submit:** answers are saved, and the user can compare their answers with the ideal ones.
5. **Evaluate:** a second AI call scores the interview and returns strengths, improvements, and a recommendation.
6. **Revise:** the user bookmarks important questions into flashcards and revisits them from the Revision page.

## 🔮 Future Improvements

### Planned next
- **Delete account API:** let users permanently delete their account. This would remove the user and profile data, clean up the Cloudinary resume, handle their interviews and flashcards, clear auth cookies, and require confirmation (password or OTP) before deleting.
- **Forgot password API:** a full reset flow: request a reset by email, verify an OTP or token, then set a new password. This would include token expiry, rate limiting, and invalidating existing sessions after a reset.
- **Better loading-state UX:** skeleton loaders for the dashboard, profile, and history pages, plus button spinners. AI calls (question generation and evaluation) take a few seconds, so they will get clear progress feedback and retry-on-failure handling.
- **UI improvements:** mobile navigation menu, dark mode, accessibility improvements (focus states, ARIA labels), smoother transitions, and richer empty states.

### Longer-term roadmap
- Live interview timer
- AI follow-up questions and resume analysis
- Admin dashboard (user management, soft delete, platform statistics)


## 💬 Feedback

**Feedback is always welcome!** 🙌

Whether it's a bug, a UI annoyance, a feature idea, or a suggestion for how the interview experience could be better, I'd love to hear it.

- ⭐ If you find this project useful, consider giving it a star

---

**Ashutosh Jha**

- Gmail: jhaashutosh0811@gmail.com
