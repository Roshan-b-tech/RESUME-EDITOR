from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, List
import json
import os
from datetime import datetime

app = FastAPI(title="Resume Editor API", version="1.0.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # local dev
        "https://resume-editor-rho-ashen.vercel.app",  # Vercel frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models


class AIEnhanceRequest(BaseModel):
    section: str
    content: str


class AIEnhanceResponse(BaseModel):
    enhanced_content: str


# In-memory storage for saved resumes
saved_resumes: Dict[str, Any] = {}

# Mock AI enhancement logic


def enhance_content(section: str, content: str) -> str:
    """Mock AI enhancement logic with improved content suggestions"""

    enhancement_templates = {
        "summary": [
            "Results-driven professional with proven expertise in {content}. Demonstrated ability to deliver high-impact solutions and drive organizational success through innovative problem-solving and strategic thinking.",
            "Dynamic and accomplished {content} with a track record of exceeding expectations. Combines technical expertise with strong leadership skills to mentor teams and deliver exceptional results.",
            "Highly motivated professional specializing in {content}. Known for analytical thinking, attention to detail, and the ability to transform complex challenges into streamlined solutions."
        ],
        "experience_description": [
            "• Spearheaded {content}, resulting in improved efficiency and measurable business impact\n• Collaborated cross-functionally to implement best practices and drive continuous improvement\n• Mentored junior team members and contributed to knowledge sharing initiatives",
            "• Led strategic initiatives in {content}, delivering exceptional results and exceeding performance targets\n• Developed and implemented innovative solutions that enhanced operational effectiveness\n• Built strong stakeholder relationships and facilitated successful project outcomes",
            "• Executed comprehensive {content} strategies, achieving significant improvements in key performance metrics\n• Demonstrated expertise in problem-solving and process optimization\n• Contributed to team success through effective communication and collaborative leadership"
        ],
        "skills": [
            "JavaScript, TypeScript, React, Node.js, Python, AWS, Docker, MongoDB, PostgreSQL, Git, Agile Methodologies, CI/CD, RESTful APIs, GraphQL, Microservices Architecture",
            "Full-Stack Development, Cloud Computing, DevOps, Machine Learning, Data Analysis, Project Management, Team Leadership, System Design, Database Management, API Development",
            "React, Vue.js, Angular, Python, Java, C++, AWS, Azure, Kubernetes, Jenkins, Redis, Elasticsearch, Apache Kafka, Terraform, Software Architecture"
        ]
    }

    templates = enhancement_templates.get(section, [content])

    # Use different templates based on content length for variety
    template_index = len(content) % len(templates)
    template = templates[template_index]

    if "{content}" in template:
        # For summary and experience, incorporate original content
        return template.format(content=content)
    else:
        # For skills, return enhanced skill list
        return template


@app.get("/")
async def root():
    return {"message": "Resume Editor API is running"}


@app.post("/ai-enhance", response_model=AIEnhanceResponse)
async def enhance_with_ai(request: AIEnhanceRequest):
    """Enhance resume section content using mock AI"""
    try:
        if not request.content.strip():
            raise HTTPException(
                status_code=400, detail="Content cannot be empty")

        enhanced_content = enhance_content(request.section, request.content)

        return AIEnhanceResponse(enhanced_content=enhanced_content)

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Enhancement failed: {str(e)}")


@app.post("/save-resume")
async def save_resume(resume_data: Dict[str, Any]):
    """Save resume data to storage"""
    try:
        # Generate a unique ID for the resume
        resume_id = f"resume_{datetime.now().strftime('%Y%m%d_%H%M%S')}"

        # Add metadata
        resume_data["id"] = resume_id
        resume_data["saved_at"] = datetime.now().isoformat()

        # Store in memory (in production, use a database)
        saved_resumes[resume_id] = resume_data

        # Also save to file for persistence
        os.makedirs("saved_resumes", exist_ok=True)
        with open(f"saved_resumes/{resume_id}.json", "w") as f:
            json.dump(resume_data, f, indent=2)

        return {"message": "Resume saved successfully", "resume_id": resume_id}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Save failed: {str(e)}")


@app.get("/resumes")
async def list_saved_resumes():
    """List all saved resumes"""
    return {"resumes": list(saved_resumes.keys())}


@app.get("/resume/{resume_id}")
async def get_resume(resume_id: str):
    """Retrieve a specific resume"""
    if resume_id not in saved_resumes:
        raise HTTPException(status_code=404, detail="Resume not found")

    return saved_resumes[resume_id]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
