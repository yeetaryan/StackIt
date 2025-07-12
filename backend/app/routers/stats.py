from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database.config import get_db
from app.models.models import User, Question, Answer, Vote, Tag

router = APIRouter(prefix="/api/stats", tags=["stats"])

@router.get("/")
def get_platform_stats(db: Session = Depends(get_db)):
    """Get platform statistics"""
    stats = {
        "total_users": db.query(func.count(User.id)).scalar() or 0,
        "total_questions": db.query(func.count(Question.id)).scalar() or 0,
        "total_answers": db.query(func.count(Answer.id)).scalar() or 0,
        "total_votes": db.query(func.count(Vote.id)).scalar() or 0,
        "total_tags": db.query(func.count(Tag.id)).scalar() or 0,
        "solved_questions": db.query(func.count(Question.id)).filter(Question.is_solved == True).scalar() or 0
    }
    return stats 