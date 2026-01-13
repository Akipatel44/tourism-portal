"""
Base Service Class - Abstract base for all services.
Provides common functionality and patterns for service implementations.
"""

from abc import ABC, abstractmethod
from typing import List, Optional, Generic, TypeVar
from sqlalchemy.orm import Session

T = TypeVar('T')


class BaseService(ABC, Generic[T]):
    """
    Abstract base service class providing common CRUD patterns.
    All services should inherit from this class.
    """
    
    def __init__(self, db: Session):
        """
        Initialize service with database session.
        
        Args:
            db: SQLAlchemy session for database operations
        """
        self.db = db
    
    @abstractmethod
    def get_by_id(self, item_id: int) -> Optional[T]:
        """Get item by primary key."""
        pass
    
    @abstractmethod
    def get_all(self, skip: int = 0, limit: int = 100) -> List[T]:
        """Get all items with pagination."""
        pass
    
    @abstractmethod
    def create(self, **kwargs) -> T:
        """Create new item."""
        pass
    
    @abstractmethod
    def update(self, item_id: int, **kwargs) -> Optional[T]:
        """Update existing item."""
        pass
    
    @abstractmethod
    def delete(self, item_id: int) -> bool:
        """Delete item."""
        pass
    
    def _commit(self):
        """Commit database transaction."""
        try:
            self.db.commit()
        except Exception as e:
            self.db.rollback()
            raise e
