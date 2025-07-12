from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.database.config import get_db
from app.schemas.schemas import VoteCreate, MessageResponse
from app.services.vote_service import VoteService

router = APIRouter(prefix="/votes", tags=["votes"])

# Temporary user ID for testing (replace with Auth0 later)
def get_current_user_id() -> str:
    return "temp-user-123"

@router.post("/", response_model=MessageResponse)
def create_vote(vote: VoteCreate, db: Session = Depends(get_db)):
    """Create or update a vote"""
    user_id = get_current_user_id()  # Replace with actual auth
    vote_service = VoteService(db)
    result = vote_service.vote(vote, user_id)
    
    if not result["success"]:
        raise HTTPException(status_code=400, detail=result["message"])
    
    return MessageResponse(message=result["message"])

@router.get("/question/{question_id}")
def get_question_votes(question_id: str, db: Session = Depends(get_db)):
    """Get vote statistics for a question"""
    vote_service = VoteService(db)
    return vote_service.get_question_votes(question_id)

@router.get("/answer/{answer_id}")
def get_answer_votes(answer_id: str, db: Session = Depends(get_db)):
    """Get vote statistics for an answer"""
    vote_service = VoteService(db)
    return vote_service.get_answer_votes(answer_id) 