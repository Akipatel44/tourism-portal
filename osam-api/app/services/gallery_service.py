"""
Gallery Service - Business logic for galleries and image management.
Handles gallery and gallery image operations, media management.
"""

from typing import List, Optional, Dict, Any
from datetime import datetime
from sqlalchemy.orm import Session

from app.models.gallery import Gallery
from app.models.gallery_image import GalleryImage
from app.services.base_service import BaseService


class GalleryService(BaseService[Gallery]):
    """
    Service for gallery-related business logic.
    
    Responsibilities:
    - CRUD operations for galleries
    - Gallery image management
    - Gallery filtering and organization
    - Media statistics and metrics
    """
    
    def __init__(self, db: Session):
        """Initialize GalleryService with database session."""
        super().__init__(db)
    
    # ============================================
    # BASIC CRUD OPERATIONS
    # ============================================
    
    def get_by_id(self, gallery_id: int) -> Optional[Gallery]:
        """
        Get a gallery by ID.
        
        Args:
            gallery_id: Gallery ID
            
        Returns:
            Gallery object or None if not found
        """
        gallery = self.db.query(Gallery).filter(Gallery.gallery_id == gallery_id).first()
        
        if gallery:
            # Increment view count
            gallery.view_count += 1
            self._commit()
        
        return gallery
    
    def get_all(self, skip: int = 0, limit: int = 100) -> List[Gallery]:
        """
        Get all galleries with pagination.
        
        Args:
            skip: Number of records to skip
            limit: Maximum number of records to return
            
        Returns:
            List of Gallery objects
        """
        return self.db.query(Gallery).order_by(Gallery.created_at.desc()).offset(skip).limit(limit).all()
    
    def create(self, **kwargs) -> Gallery:
        """
        Create a new gallery.
        
        Args:
            **kwargs: Gallery attributes
            
        Returns:
            Created Gallery object
            
        Raises:
            ValueError: If required fields are missing
        """
        # Validate required fields
        required_fields = ['name', 'gallery_type']
        for field in required_fields:
            if field not in kwargs or not kwargs[field]:
                raise ValueError(f"Missing required field: {field}")
        
        # Validate gallery_type enum
        valid_types = ['photos', 'videos', '360photos']
        if kwargs.get('gallery_type') not in valid_types:
            raise ValueError(f"Invalid gallery_type. Must be one of: {valid_types}")
        
        # Validate that at least one content reference is provided
        content_fields = ['place_id', 'temple_id', 'site_id', 'event_id']
        has_content = any(kwargs.get(field) for field in content_fields)
        if not has_content:
            raise ValueError("Gallery must be associated with a place, temple, site, or event")
        
        # Create gallery
        gallery = Gallery(**kwargs)
        self.db.add(gallery)
        self._commit()
        
        return gallery
    
    def update(self, gallery_id: int, **kwargs) -> Optional[Gallery]:
        """
        Update a gallery.
        
        Args:
            gallery_id: Gallery ID
            **kwargs: Fields to update
            
        Returns:
            Updated Gallery object or None if not found
        """
        gallery = self.db.query(Gallery).filter(Gallery.gallery_id == gallery_id).first()
        if not gallery:
            return None
        
        # Validate gallery_type if provided
        if 'gallery_type' in kwargs:
            valid_types = ['photos', 'videos', '360photos']
            if kwargs['gallery_type'] not in valid_types:
                raise ValueError(f"Invalid gallery_type. Must be one of: {valid_types}")
        
        # Update fields
        for key, value in kwargs.items():
            if hasattr(gallery, key) and key != 'gallery_id':
                setattr(gallery, key, value)
        
        gallery.updated_at = datetime.utcnow()
        self._commit()
        
        return gallery
    
    def delete(self, gallery_id: int) -> bool:
        """
        Delete a gallery and its images.
        
        Args:
            gallery_id: Gallery ID
            
        Returns:
            True if deleted, False if not found
        """
        gallery = self.db.query(Gallery).filter(Gallery.gallery_id == gallery_id).first()
        if not gallery:
            return False
        
        # Cascading delete will remove associated images
        self.db.delete(gallery)
        self._commit()
        
        return True
    
    # ============================================
    # GALLERY IMAGE OPERATIONS
    # ============================================
    
    def add_image_to_gallery(self, gallery_id: int, **kwargs) -> Optional[GalleryImage]:
        """
        Add an image to a gallery.
        
        Args:
            gallery_id: Gallery ID
            **kwargs: Image attributes
            
        Returns:
            Created GalleryImage object or None if gallery not found
            
        Raises:
            ValueError: If required fields are missing
        """
        # Verify gallery exists
        gallery = self.db.query(Gallery).filter(Gallery.gallery_id == gallery_id).first()
        if not gallery:
            return None
        
        # Validate required fields
        required_fields = ['image_url', 'title', 'image_order']
        for field in required_fields:
            if field not in kwargs or not kwargs[field]:
                raise ValueError(f"Missing required field: {field}")
        
        # Add gallery_id to kwargs
        kwargs['gallery_id'] = gallery_id
        
        # Create image
        image = GalleryImage(**kwargs)
        self.db.add(image)
        self._commit()
        
        return image
    
    def remove_image_from_gallery(self, image_id: int) -> bool:
        """
        Remove an image from a gallery.
        
        Args:
            image_id: Gallery Image ID
            
        Returns:
            True if deleted, False if not found
        """
        image = self.db.query(GalleryImage).filter(GalleryImage.image_id == image_id).first()
        if not image:
            return False
        
        self.db.delete(image)
        self._commit()
        
        return True
    
    def get_gallery_images(self, gallery_id: int) -> List[GalleryImage]:
        """
        Get all images in a gallery.
        
        Args:
            gallery_id: Gallery ID
            
        Returns:
            List of GalleryImage objects
        """
        return self.db.query(GalleryImage).filter(
            GalleryImage.gallery_id == gallery_id
        ).order_by(GalleryImage.image_order).all()
    
    def reorder_images(self, gallery_id: int, image_order: Dict[int, int]) -> bool:
        """
        Reorder images in a gallery.
        
        Args:
            gallery_id: Gallery ID
            image_order: Dictionary mapping image_id to new order
            
        Returns:
            True if successful
        """
        for image_id, order in image_order.items():
            image = self.db.query(GalleryImage).filter(
                GalleryImage.image_id == image_id,
                GalleryImage.gallery_id == gallery_id
            ).first()
            
            if image:
                image.image_order = order
        
        self._commit()
        return True
    
    def get_featured_image(self, gallery_id: int) -> Optional[GalleryImage]:
        """
        Get the featured image of a gallery.
        
        Args:
            gallery_id: Gallery ID
            
        Returns:
            Featured GalleryImage or None if not found
        """
        return self.db.query(GalleryImage).filter(
            GalleryImage.gallery_id == gallery_id,
            GalleryImage.is_featured == True
        ).first()
    
    def set_featured_image(self, gallery_id: int, image_id: int) -> Optional[GalleryImage]:
        """
        Set an image as featured in a gallery.
        
        Args:
            gallery_id: Gallery ID
            image_id: Image ID to set as featured
            
        Returns:
            Updated GalleryImage or None if not found
        """
        # Remove featured status from other images
        featured = self.db.query(GalleryImage).filter(
            GalleryImage.gallery_id == gallery_id,
            GalleryImage.is_featured == True
        ).first()
        
        if featured:
            featured.is_featured = False
        
        # Set new featured image
        image = self.db.query(GalleryImage).filter(
            GalleryImage.image_id == image_id,
            GalleryImage.gallery_id == gallery_id
        ).first()
        
        if image:
            image.is_featured = True
            self._commit()
            return image
        
        return None
    
    # ============================================
    # SEARCH & FILTER OPERATIONS
    # ============================================
    
    def search_galleries_by_name(self, name: str, skip: int = 0, limit: int = 100) -> List[Gallery]:
        """
        Search galleries by name (partial match).
        
        Args:
            name: Search term
            skip: Pagination offset
            limit: Pagination limit
            
        Returns:
            List of matching Gallery objects
        """
        return self.db.query(Gallery).filter(
            Gallery.name.ilike(f"%{name}%")
        ).order_by(Gallery.created_at.desc()).offset(skip).limit(limit).all()
    
    def filter_by_type(self, gallery_type: str, skip: int = 0, limit: int = 100) -> List[Gallery]:
        """
        Filter galleries by type.
        
        Args:
            gallery_type: Gallery type (photos, videos, 360photos)
            skip: Pagination offset
            limit: Pagination limit
            
        Returns:
            List of Gallery objects of type
        """
        return self.db.query(Gallery).filter(
            Gallery.gallery_type == gallery_type
        ).order_by(Gallery.created_at.desc()).offset(skip).limit(limit).all()
    
    def get_galleries_for_place(self, place_id: int) -> List[Gallery]:
        """
        Get all galleries for a place.
        
        Args:
            place_id: Place ID
            
        Returns:
            List of Gallery objects for place
        """
        return self.db.query(Gallery).filter(
            Gallery.place_id == place_id
        ).order_by(Gallery.created_at.desc()).all()
    
    def get_galleries_for_temple(self, temple_id: int) -> List[Gallery]:
        """
        Get all galleries for a temple.
        
        Args:
            temple_id: Temple ID
            
        Returns:
            List of Gallery objects for temple
        """
        return self.db.query(Gallery).filter(
            Gallery.temple_id == temple_id
        ).order_by(Gallery.created_at.desc()).all()
    
    def get_galleries_for_site(self, site_id: int) -> List[Gallery]:
        """
        Get all galleries for a mythological site.
        
        Args:
            site_id: Site ID
            
        Returns:
            List of Gallery objects for site
        """
        return self.db.query(Gallery).filter(
            Gallery.site_id == site_id
        ).order_by(Gallery.created_at.desc()).all()
    
    def get_galleries_for_event(self, event_id: int) -> List[Gallery]:
        """
        Get all galleries for an event.
        
        Args:
            event_id: Event ID
            
        Returns:
            List of Gallery objects for event
        """
        return self.db.query(Gallery).filter(
            Gallery.event_id == event_id
        ).order_by(Gallery.created_at.desc()).all()
    
    # ============================================
    # FEATURED & METRICS OPERATIONS
    # ============================================
    
    def get_featured_galleries(self, skip: int = 0, limit: int = 100) -> List[Gallery]:
        """
        Get featured galleries.
        
        Args:
            skip: Pagination offset
            limit: Pagination limit
            
        Returns:
            List of featured Gallery objects
        """
        return self.db.query(Gallery).filter(
            Gallery.is_featured == True
        ).order_by(Gallery.view_count.desc()).offset(skip).limit(limit).all()
    
    def get_popular_galleries(self, min_views: int = 50, skip: int = 0, limit: int = 100) -> List[Gallery]:
        """
        Get popular galleries by view count.
        
        Args:
            min_views: Minimum view count
            skip: Pagination offset
            limit: Pagination limit
            
        Returns:
            List of popular Gallery objects
        """
        return self.db.query(Gallery).filter(
            Gallery.view_count >= min_views
        ).order_by(Gallery.view_count.desc()).offset(skip).limit(limit).all()
    
    # ============================================
    # BUSINESS LOGIC OPERATIONS
    # ============================================
    
    def toggle_featured(self, gallery_id: int) -> Optional[Gallery]:
        """
        Toggle featured status of a gallery.
        
        Args:
            gallery_id: Gallery ID
            
        Returns:
            Updated Gallery object or None if not found
        """
        gallery = self.db.query(Gallery).filter(Gallery.gallery_id == gallery_id).first()
        if not gallery:
            return None
        
        gallery.is_featured = not gallery.is_featured
        gallery.updated_at = datetime.utcnow()
        self._commit()
        
        return gallery
    
    def get_gallery_statistics(self, gallery_id: int) -> Optional[Dict[str, Any]]:
        """
        Get gallery statistics and metadata.
        
        Args:
            gallery_id: Gallery ID
            
        Returns:
            Dictionary with gallery statistics or None if not found
        """
        gallery = self.get_by_id(gallery_id)
        if not gallery:
            return None
        
        images = self.get_gallery_images(gallery_id)
        total_image_views = sum(img.view_count for img in images)
        
        return {
            "gallery_id": gallery.gallery_id,
            "name": gallery.name,
            "type": gallery.gallery_type,
            "image_count": len(images),
            "view_count": gallery.view_count,
            "total_image_views": total_image_views,
            "is_featured": gallery.is_featured,
            "created_at": gallery.created_at.isoformat(),
            "updated_at": gallery.updated_at.isoformat()
        }
    
    def get_gallery_summary(self, gallery_id: int) -> Optional[Dict[str, Any]]:
        """
        Get comprehensive gallery information summary.
        
        Args:
            gallery_id: Gallery ID
            
        Returns:
            Dictionary with gallery summary or None if not found
        """
        gallery = self.get_by_id(gallery_id)
        if not gallery:
            return None
        
        images = self.get_gallery_images(gallery_id)
        featured_image = self.get_featured_image(gallery_id)
        
        return {
            "id": gallery.gallery_id,
            "name": gallery.name,
            "description": gallery.description,
            "type": gallery.gallery_type,
            "is_featured": gallery.is_featured,
            "view_count": gallery.view_count,
            "images": {
                "total": len(images),
                "featured_image": {
                    "id": featured_image.image_id,
                    "url": featured_image.image_url,
                    "thumbnail": featured_image.thumbnail_url
                } if featured_image else None
            },
            "content_association": {
                "place_id": gallery.place_id,
                "temple_id": gallery.temple_id,
                "site_id": gallery.site_id,
                "event_id": gallery.event_id
            }
        }
