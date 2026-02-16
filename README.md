# 🚀 SkillStream - Dynamic Workforce Upskilling Engine

<div align="center">
  
  ![SkillStream Banner](https://img.shields.io/badge/SkillStream-Adaptive%20Learning-blueviolet?style=for-the-badge&logo=react)
  
  [![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
  [![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Material-UI](https://img.shields.io/badge/Material--UI-5.14.18-0081CB?style=flat-square&logo=mui)](https://mui.com/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
  
  <h3>✨ Learning that adapts to YOU, not the other way around ✨</h3>
</div>

---

## 📋 Project Overview

**SkillStream** is an AI-powered adaptive learning platform that personalizes technical upskilling based on individual learning styles and real-time performance. Built in 36 hours for a hackathon, it transforms traditional one-size-fits-all training into a truly personalized, engaging, and effective learning experience.

### 🎯 The Problem
- 70% of employees forget training within 1 week
- 90% of corporate training is ineffective
- Different people learn differently (visual, auditory, reading, kinesthetic)

### 💡 Our Solution
- Multi-source skill intelligence (Resume + GitHub + Tasks)
- Learning style personalization
- Real-time adaptive learning paths
- Gamified progress tracking
- 24/7 AI learning assistant

---

## ✨ Features

### 🧠 **Smart Skill Extraction**
| Feature | Description |
|---------|-------------|
| 📄 **Resume Parsing** | AI extracts skills from PDF/DOCX resumes |
| 🐙 **GitHub Integration** | Analyzes repositories, languages, and contributions |
| ✅ **Task Assessment** | Learns from completed JIRA/GitHub issues |

### 🎯 **Personalized Learning**
| Feature | Description |
|---------|-------------|
| 🎨 **Learning Style Quiz** | Identifies visual/auditory/reading/kinesthetic learners |
| 📊 **Skill Gap Analysis** | Compares current skills vs. target role requirements |
| 🗺️ **Dynamic Learning Path** | Generates customized 6-week learning roadmap |

### 🎮 **Gamification**
| Feature | Description |
|---------|-------------|
| 🧩 **Puzzle Progress** | Each module lights up a puzzle piece when completed |
| 🏆 **Certificate Generation** | Downloadable PNG certificate upon path completion |
| 🔥 **Learning Streaks** | Tracks daily learning consistency |

### 🤖 **AI-Powered Assistance**
| Feature | Description |
|---------|-------------|
| 💬 **24/7 Chatbot** | Answers questions using Wikipedia + DuckDuckGo |
| 📚 **Study Materials** | Recommends free courses, books, and tutorials |
| ▶️ **YouTube Integration** | Curated educational videos for each topic |


## 🛠️ Tech Stack

### 🎨 Frontend
       ```bash
    📦 React 18 + TypeScript # Component-based UI with type safety
    🎨 Material-UI v5 # Professional component library
    ⚡ Vite # Fast build tool and dev server
    📊 Recharts # Data visualization
    🔄 React Router v6 # Navigation and routing
    🌐 Axios # HTTP client for API calls
    📁 React Dropzone # Drag-and-drop file upload
    🖼️ HTML2Canvas # Certificate generation


### ⚙️ Backend
       ```bash
    🐍 FastAPI # High-performance Python framework
    🗄️ SQLAlchemy # Database ORM
    📦 SQLite # Lightweight file-based database
    🔐 JWT / python-jose # Authentication tokens
    🔑 bcrypt + passlib # Password hashing
    📝 PyPDF2 # PDF parsing for resumes
    🚀 Uvicorn # ASGI server
    ✅ Pydantic # Data validation

### 🔌 External APIs
      ```bash
    🐙 GitHub API # Repository and code analysis
    📚 Wikipedia API # Knowledge base (no API key)
    🦆 DuckDuckGo API # Fallback search (no API key)
    ▶️ YouTube API # Video content
    🔐 OAuth2 # GitHub authentication


## 🚀 How to Run

### 📥 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/akankshakuvhare24-star/SkillStream.git
   cd SkillStream

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   
   # Windows
   .\venv\Scripts\activate
   # Mac/Linux
   source venv/bin/activate
   
   pip install -r requirements.txt
   uvicorn app.main:app --reload --port 8000
   
3. Frontend Setup (in a new terminal)
    ```bash
    cd frontend
    npm install
    npm run dev

🌐 Frontend: http://localhost:5173
⚙️ Backend API: http://localhost:8000
📚 API Docs: http://localhost:8000/docs

Folder Structure 
```bash
SkillStream/
├── 📁 backend/
│   ├── 📁 app/
│   │   ├── 📁 routes/          # API endpoints
│   │   │   └── auth.py         # Authentication routes
│   │   ├── models.py            # Database models
│   │   ├── database.py          # Database connection
│   │   ├── auth.py              # JWT authentication
│   │   └── main.py              # FastAPI application
│   └── requirements.txt         # Python dependencies
│
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 pages/            # Page components
│   │   │   ├── Login.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── LearningPath.tsx
│   │   │   ├── Chatbot.tsx
│   │   │   └── ...
│   │   ├── 📁 components/       # Reusable components
│   │   ├── 📁 services/          # API calls
│   │   ├── 📁 contexts/          # React contexts
│   │   └── App.tsx               # Main app component
│   └── package.json              # Node dependencies
│
└── README.md                     # Project documentation

🌟 Support
If you like this project, please give it a ⭐ on GitHub!
