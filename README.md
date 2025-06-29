# Resume Editor with AI Enhancement

A modern, production-ready resume editor built with React frontend and FastAPI backend. Features AI-powered content enhancement, file upload capabilities, and comprehensive resume management.

## Features

### Frontend (React + TypeScript)
- **File Upload**: Drag-and-drop support for PDF and DOCX files
- **Resume Editing**: Comprehensive editing for personal info, experience, education, and skills
- **AI Enhancement**: One-click content improvement for each resume section
- **Save & Download**: Backend integration for saving and JSON export
- **Responsive Design**: Beautiful, mobile-friendly interface

### Backend (FastAPI)
- **AI Enhancement API**: Mock AI service for content improvement
- **Resume Storage**: Save and retrieve resume data
- **CORS Support**: Frontend integration ready
- **Comprehensive Logging**: Full API documentation

## Quick Start

### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
cd backend
pip install -r requirements.txt
python main.py
```

## API Endpoints

- `POST /ai-enhance` - Enhance resume section content
- `POST /save-resume` - Save complete resume data
- `GET /resumes` - List all saved resumes
- `GET /resume/{id}` - Retrieve specific resume

## Project Structure

```
├── src/
│   ├── components/          # React components
│   ├── types/              # TypeScript definitions
│   ├── utils/              # API utilities
│   └── App.tsx             # Main application
├── backend/
│   ├── main.py             # FastAPI server
│   └── requirements.txt    # Python dependencies
└── README.md
```

## Technologies

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: FastAPI, Python 3.8+, Pydantic
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React

## Production Ready Features

- Responsive design with mobile optimization
- Error handling and loading states
- Type safety with TypeScript
- Modern API architecture
- File validation and security
- Professional UI/UX design