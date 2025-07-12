from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.models import User, Question, Answer
from app.schemas.schemas import UserCreate, UserUpdate
from typing import Optional, List

class UserService:
    def __init__(self, db: Session):
        self.db = db

    def create_user(self, user_data: UserCreate) -> User:
        """Create a new user"""
        db_user = User(**user_data.model_dump())
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        return db_user

    def get_user_by_id(self, user_id: str) -> Optional[User]:
        """Get user by ID"""
        return self.db.query(User).filter(User.id == user_id).first()

    def get_user_by_username(self, username: str) -> Optional[User]:
        """Get user by username"""
        return self.db.query(User).filter(User.username == username).first()

    def get_user_by_email(self, email: str) -> Optional[User]:
        """Get user by email"""
        return self.db.query(User).filter(User.email == email).first()

    def update_user(self, user_id: str, user_data: UserUpdate) -> Optional[User]:
        """Update user information"""
        user = self.get_user_by_id(user_id)
        if not user:
            return None
        
        update_data = user_data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(user, field, value)
        
        self.db.commit()
        self.db.refresh(user)
        return user

    def delete_user(self, user_id: str) -> bool:
        """Delete a user"""
        user = self.get_user_by_id(user_id)
        if not user:
            return False
        
        self.db.delete(user)
        self.db.commit()
        return True

    def get_user_stats(self, user_id: str) -> dict:
        """Get user statistics"""
        question_count = self.db.query(func.count(Question.id)).filter(Question.user_id == user_id).scalar()
        answer_count = self.db.query(func.count(Answer.id)).filter(Answer.user_id == user_id).scalar()
        
        return {
            "question_count": question_count or 0,
            "answer_count": answer_count or 0
        }

    def get_users(self, skip: int = 0, limit: int = 10) -> List[User]:
        """Get all users with pagination"""
        return self.db.query(User).offset(skip).limit(limit).all()

    def update_user_reputation(self, user_id: str, points: int) -> bool:
        """Update user reputation"""
        user = self.get_user_by_id(user_id)
        if not user:
            return False
        
        user.reputation += points
        self.db.commit()
        return True 