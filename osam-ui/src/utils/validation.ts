/**
 * Form Validation Utilities
 * Provides validation rules and error checking for admin forms
 */

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateDateRange = (startDate: string, endDate: string): boolean => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return start <= end;
};

export const validateCoordinates = (
  lat?: number,
  lng?: number
): { isValid: boolean; message?: string } => {
  if (lat === undefined || lng === undefined) {
    return { isValid: true }; // coordinates are optional
  }

  if (lat < -90 || lat > 90) {
    return { isValid: false, message: 'Latitude must be between -90 and 90' };
  }

  if (lng < -180 || lng > 180) {
    return { isValid: false, message: 'Longitude must be between -180 and 180' };
  }

  return { isValid: true };
};

export const validatePlaceForm = (formData: any): ValidationResult => {
  const errors: ValidationError[] = [];

  // Name validation
  if (!formData.name || formData.name.trim().length === 0) {
    errors.push({ field: 'name', message: 'Place name is required' });
  } else if (formData.name.length > 255) {
    errors.push({ field: 'name', message: 'Place name must be less than 255 characters' });
  }

  // Location validation
  if (!formData.location || formData.location.trim().length === 0) {
    errors.push({ field: 'location', message: 'Location is required' });
  } else if (formData.location.length > 255) {
    errors.push({ field: 'location', message: 'Location must be less than 255 characters' });
  }

  // Category validation
  const validCategories = ['place', 'landmark', 'viewpoint', 'parking'];
  if (!formData.category || !validCategories.includes(formData.category)) {
    errors.push({
      field: 'category',
      message: `Category must be one of: ${validCategories.join(', ')}`
    });
  }

  // Description validation
  if (formData.description && formData.description.length > 2000) {
    errors.push({ field: 'description', message: 'Description must be less than 2000 characters' });
  }

  // Coordinates validation
  const coordsValidation = validateCoordinates(formData.latitude, formData.longitude);
  if (!coordsValidation.isValid) {
    errors.push({ field: 'coordinates', message: coordsValidation.message! });
  }

  // Entry fee validation
  if (formData.entry_fee !== undefined && formData.entry_fee < 0) {
    errors.push({ field: 'entry_fee', message: 'Entry fee cannot be negative' });
  }

  // Accessibility level validation
  if (formData.accessibility_level) {
    const validLevels = ['easily_accessible', 'moderately_accessible', 'difficult_to_access'];
    if (!validLevels.includes(formData.accessibility_level)) {
      errors.push({
        field: 'accessibility_level',
        message: `Accessibility level must be one of: ${validLevels.join(', ')}`
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateEventForm = (formData: any): ValidationResult => {
  const errors: ValidationError[] = [];

  // Name validation
  if (!formData.name || formData.name.trim().length === 0) {
    errors.push({ field: 'name', message: 'Event name is required' });
  } else if (formData.name.length > 255) {
    errors.push({ field: 'name', message: 'Event name must be less than 255 characters' });
  }

  // Description validation
  if (formData.description && formData.description.length > 2000) {
    errors.push({ field: 'description', message: 'Description must be less than 2000 characters' });
  }

  // Event type validation
  const validTypes = ['festival', 'fair', 'ceremony', 'cultural'];
  if (!formData.event_type || !validTypes.includes(formData.event_type)) {
    errors.push({
      field: 'event_type',
      message: `Event type must be one of: ${validTypes.join(', ')}`
    });
  }

  // Location validation
  if (!formData.location || formData.location.trim().length === 0) {
    errors.push({ field: 'location', message: 'Event location is required' });
  } else if (formData.location.length > 255) {
    errors.push({ field: 'location', message: 'Event location must be less than 255 characters' });
  }

  // Date validation
  if (!formData.start_date) {
    errors.push({ field: 'start_date', message: 'Start date is required' });
  }

  if (!formData.end_date) {
    errors.push({ field: 'end_date', message: 'End date is required' });
  }

  if (formData.start_date && formData.end_date) {
    if (!validateDateRange(formData.start_date, formData.end_date)) {
      errors.push({
        field: 'end_date',
        message: 'End date must be after or equal to start date'
      });
    }
  }

  // Entry fee validation
  if (!formData.is_free && formData.entry_fee === undefined) {
    errors.push({ field: 'entry_fee', message: 'Entry fee is required for paid events' });
  }

  if (formData.entry_fee !== undefined && formData.entry_fee < 0) {
    errors.push({ field: 'entry_fee', message: 'Entry fee cannot be negative' });
  }

  // Contact validation
  if (formData.phone && !validatePhone(formData.phone)) {
    errors.push({ field: 'phone', message: 'Invalid phone number format' });
  }

  if (formData.email && !validateEmail(formData.email)) {
    errors.push({ field: 'email', message: 'Invalid email format' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateGalleryForm = (formData: any): ValidationResult => {
  const errors: ValidationError[] = [];

  // Name validation
  if (!formData.name || formData.name.trim().length === 0) {
    errors.push({ field: 'name', message: 'Gallery name is required' });
  } else if (formData.name.length > 255) {
    errors.push({ field: 'name', message: 'Gallery name must be less than 255 characters' });
  }

  // Description validation
  if (formData.description && formData.description.length > 2000) {
    errors.push({
      field: 'description',
      message: 'Description must be less than 2000 characters'
    });
  }

  // Gallery type validation
  const validTypes = ['photos', 'videos', '360photos'];
  if (!formData.gallery_type || !validTypes.includes(formData.gallery_type)) {
    errors.push({
      field: 'gallery_type',
      message: `Gallery type must be one of: ${validTypes.join(', ')}`
    });
  }

  // At least one relation is required
  if (
    !formData.place_id &&
    !formData.temple_id &&
    !formData.site_id &&
    !formData.event_id
  ) {
    errors.push({
      field: 'relations',
      message: 'Gallery must be related to at least one place, temple, site, or event'
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateImageUpload = (file: File): ValidationResult => {
  const errors: ValidationError[] = [];
  const maxFileSize = 10 * 1024 * 1024; // 10MB
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'video/mp4',
    'video/webm'
  ];

  if (!file) {
    errors.push({ field: 'file', message: 'File is required' });
    return { isValid: false, errors };
  }

  if (file.size > maxFileSize) {
    errors.push({
      field: 'file',
      message: `File size must be less than ${maxFileSize / 1024 / 1024}MB`
    });
  }

  if (!allowedMimeTypes.includes(file.type)) {
    errors.push({
      field: 'file',
      message: 'File type not supported. Allowed: images and videos'
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const getFieldError = (
  errors: ValidationError[],
  fieldName: string
): string | undefined => {
  return errors.find((e) => e.field === fieldName)?.message;
};

export const hasFieldError = (errors: ValidationError[], fieldName: string): boolean => {
  return errors.some((e) => e.field === fieldName);
};
