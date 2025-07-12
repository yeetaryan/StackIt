from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database.config import get_db
from app.schemas.schemas import AnswerCreate, AnswerUpdate, AnswerResponse, MessageResponse
from app.services.answer_service import AnswerService

router = APIRouter(prefix="/answers", tags=["answers"])

# Temporary user ID for testing (replace with Auth0 later)
def get_current_user_id() -> str:
    return "temp-user-123"

@router.post("/", response_model=AnswerResponse)
def create_answer(answer: AnswerCreate, db: Session = Depends(get_db)):
    """Create a new answer"""
    user_id = get_current_user_id()  # Replace with actual auth
    answer_service = AnswerService(db)
    return answer_service.create_answer(answer, user_id)

@router.get("/{answer_id}", response_model=AnswerResponse)
def get_answer(answer_id: str, db: Session = Depends(get_db)):
    """Get answer by ID"""
    answer_service = AnswerService(db)
    answer = answer_service.get_answer_by_id(answer_id)
    
    if not answer:
        raise HTTPException(status_code=404, detail="Answer not found")
    
    return answer

@router.put("/{answer_id}", response_model=AnswerResponse)
def update_answer(answer_id: str, answer_update: AnswerUpdate, db: Session = Depends(get_db)):
    """Update an answer"""
    user_id = get_current_user_id()  # Replace with actual auth
    answer_service = AnswerService(db)
    answer = answer_service.update_answer(answer_id, answer_update, user_id)
    
    if not answer:
        raise HTTPException(status_code=404, detail="Answer not found or unauthorized")
    
    return answer

@router.delete("/{answer_id}", response_model=MessageResponse)
def delete_answer(answer_id: str, db: Session = Depends(get_db)):
    """Delete an answer"""
    user_id = get_current_user_id()  # Replace with actual auth
    answer_service = AnswerService(db)
    
    if not answer_service.delete_answer(answer_id, user_id):
        raise HTTPException(status_code=404, detail="Answer not found or unauthorized")
    
    return MessageResponse(message="Answer deleted successfully")

@router.get("/question/{question_id}", response_model=List[AnswerResponse])
def get_question_answers(question_id: str, db: Session = Depends(get_db)):
    """Get all answers for a question"""
    answer_service = AnswerService(db)
    return answer_service.get_answers_by_question(question_id)

@router.get("/user/{user_id}", response_model=List[AnswerResponse])
def get_user_answers(user_id: str, skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """Get answers by a specific user"""
    answer_service = AnswerService(db)
    return answer_service.get_user_answers(user_id, skip, limit)

@router.post("/{answer_id}/accept", response_model=MessageResponse)
def accept_answer(answer_id: str, db: Session = Depends(get_db)):
    """Accept an answer"""
    user_id = get_current_user_id()  # Replace with actual auth
    answer_service = AnswerService(db)
    
    if not answer_service.accept_answer(answer_id, user_id):
        raise HTTPException(status_code=404, detail="Answer not found or unauthorized")
    
    return MessageResponse(message="Answer accepted successfully") 