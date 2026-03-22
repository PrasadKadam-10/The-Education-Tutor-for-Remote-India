<p align="center">
  <img src="https://github.com/user-attachments/assets/88d63804-bebf-4c38-9237-3f7e72cd7117" width="24%" />
  <img src="https://github.com/user-attachments/assets/6e7c2f61-b8af-43cc-8e14-a472854a7564" width="24%" />
  <img src="https://github.com/user-attachments/assets/5d38c047-67ac-4ee9-ab9d-a388db03de34" width="24%" />
  <img src="https://github.com/user-attachments/assets/4a7af989-e6e2-4005-ba0c-f2efaeea4a99" width="24%" />
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/888bd96b-5a7a-4294-a365-49e32a71bce0" width="32%" />
  <img src="https://github.com/user-attachments/assets/46ba0278-aed5-425a-a227-4f10a75062a7" width="32%" />
  <img src="https://github.com/user-attachments/assets/ab4a9d9e-d401-4e74-a270-2eea0ebddd0d" width="32%" />
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/2290f4f9-fd9f-4e4f-af0e-cc1ecb64b9ed" width="32%" />
  <img src="https://github.com/user-attachments/assets/feb4abf3-d6a5-4f10-87c3-1aa3c6a0c788" width="32%" />
  <img src="https://github.com/user-attachments/assets/e5484006-6faf-460a-b486-0aec7e9cba05" width="32%" />
</p>

# 📘 VidyaSathi — AI Tutor for Every Indian Student

VidyaSathi is an AI-powered educational web application designed to support Maharashtra Board (SSC 10th & HSC 12th) students. It provides interactive learning through AI chat, quizzes, dashboards, and study planning tools to enhance self-study and performance tracking. 

---

## 🚀 Features

* 🤖 **AI Chat Tutor** – Ask subject-specific questions with real-time streaming responses
* 🎤 **Voice Support** – Speech-to-text input and text-to-speech output (English & Hindi)
* 📝 **Quiz System** – Chapter-wise quizzes and timed mock tests with explanations
* 📊 **Dashboard Analytics** – Track performance, streaks, weak areas, and progress
* 🔖 **Bookmarks Hub** – Save and manage important answers for revision
* 📅 **Study Planner** – Organize tasks with priority, deadlines, and completion tracking
* 📚 **Textbook Integration** – AI responses based on textbook content

---

## 🛠️ Tech Stack
<p align="center">
  <img src="https://img.shields.io/badge/FRONTEND-REACT_18-61DAFB?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/LANGUAGE-TYPESCRIPT-3178C6?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/BUILD_TOOL-VITE-646CFF?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/STYLING-TAILWIND_CSS-38B2AC?style=for-the-badge"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/UI-SHADCN_UI-black?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/UI-RADIX_UI-161618?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/ANIMATION-FRAMER_MOTION-FF0055?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/CHARTS-RECHARTS-FF6384?style=for-the-badge"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/ROUTING-REACT_ROUTER-CA4245?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/DATA-REACT_QUERY-FF4154?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/ICONS-LUCIDE_REACT-F56565?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/BACKEND-DATABASE_AI_RETRIEVAL-green?style=for-the-badge"/>
</p>
---

## 📁 Project Structure

```
src/
 ├── pages/
 │   ├── Chat.tsx
 │   ├── Quiz.tsx
 │   ├── Dashboard.tsx
 │   ├── Bookmarks.tsx
 │   └── ...
 ├── components/
 │   └── VoiceInput.tsx
 ├── lib/
 │   ├── studyPlanner.ts
 │   └── quizAttempts.ts
 ├── App.tsx
 └── main.tsx
```

---

## 🔄 How It Works

### AI Chat Flow

* User inputs question (text or voice)
* Request sent to backend with class & subject
* Backend retrieves textbook context + generates response
* Streaming response displayed in real-time

### Quiz Flow

* User selects chapter or mock test
* App tracks score, timer, and answers
* Results saved locally for dashboard analysis

### Dashboard

* Aggregates:

  * Quiz attempts
  * Bookmarks
  * Study tasks
  * Chat activity
* Displays insights like average score, weak subjects, and streaks

---

## 💾 Data Storage

* **localStorage** → quiz data, bookmarks, study planner, chat history
* **Backend** → AI responses, textbook data, caching

---

## ⚙️ Installation & Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## 🔗 Live Demo

👉 https://youtu.be/e5rhU4dJkc4

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_PROJECT_ID="your_project_id"
VITE_SUPABASE_PUBLISHABLE_KEY="your_publishable_key"
VITE_SUPABASE_URL="your_supabase_url"

```

## 🌟 Future Improvements

* Sync student data across devices (move to backend)
* Export reports and analytics
* Role-based teacher dashboard
* Improve voice feature compatibility
* Add automated testing

---

## 📌 Quick Summary

VidyaSathi is a modern AI-based learning platform combining interactive tutoring, quizzes, analytics, and planning tools to help students study smarter and track their academic progress effectively. 
