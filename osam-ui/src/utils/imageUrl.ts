/**
 * Image URL Helper
 * 
 * Utility for constructing image URLs with proper base paths
 * Respects VITE_IMAGE_BASE_URL from environment configuration
 */

import { env, getImageUrl } from '@/config/environment';

/**
 * Get full image URL from a path
 * 
 * @param imagePath - Relative path to image (e.g., '/uploads/gallery/photo.jpg')
 * @returns Full URL to image
 * 
 * @example
 * getFullImageUrl('/uploads/gallery/photo.jpg')
 * // Development: 'http://localhost:8000/uploads/gallery/photo.jpg'
 * // Production: 'https://assets.osam-tourism.com/uploads/gallery/photo.jpg'
 */
export function getFullImageUrl(imagePath: string): string {
  // Return as-is if already absolute URL
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Use environment image base URL
  return getImageUrl(imagePath);
}

/**
 * Get placeholder image URL
 * 
 * @param width - Width in pixels
 * @param height - Height in pixels
 * @param text - Optional text to display
 * @returns Placeholder image URL
 */
export function getPlaceholderImageUrl(
  width: number = 400,
  height: number = 300,
  text: string = 'Image'
): string {
  return `https://via.placeholder.com/${width}x${height}?text=${encodeURIComponent(text)}`;
}

/**
 * Get avatar/profile image URL
 * 
 * @param username - Username or identifier
 * @param size - Avatar size (default 100px)
 * @returns Avatar image URL
 */
export function getAvatarUrl(username: string, size: number = 100): string {
  // Using initials avatar service
  const initial = username.charAt(0).toUpperCase();
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&size=${size}&background=random&bold=true`;
}

/**
 * Get optimized image URL
 * 
 * Applies optimization transforms if enabled in configuration
 * Supports WebP conversion, resizing, quality adjustment
 * 
 * @param imagePath - Relative path to image
 * @param options - Optimization options
 * @returns Optimized image URL
 * 
 * @example
 * getOptimizedImageUrl('/uploads/gallery/photo.jpg', {
 *   width: 800,
 *   quality: 80,
 *   format: 'webp'
 * })
 */
export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number; // 1-100
  format?: 'webp' | 'jpg' | 'png';
  fit?: 'cover' | 'contain' | 'fill';
}

export function getOptimizedImageUrl(
  imagePath: string,
  options?: ImageOptimizationOptions
): string {
  const baseUrl = getFullImageUrl(imagePath);

  // Return unoptimized URL if optimization is disabled
  if (!env.images.optimization) {
    return baseUrl;
  }

  // If image is from external CDN (e.g., Cloudinary), apply transformations
  if (baseUrl.includes('cloudinary.com')) {
    const transforms: string[] = [];

    if (options?.width) {
      transforms.push(`w_${options.width}`);
    }
    if (options?.height) {
      transforms.push(`h_${options.height}`);
    }
    if (options?.quality) {
      transforms.push(`q_${Math.min(100, options.quality)}`);
    }
    if (options?.format) {
      transforms.push(`f_${options.format}`);
    }
    if (options?.fit) {
      transforms.push(`c_${options.fit}`);
    }

    if (transforms.length > 0) {
      const transformStr = transforms.join(',');
      // Cloudinary URL format: https://res.cloudinary.com/[cloud]/image/upload/[transforms]/[public_id]
      return baseUrl.replace('/upload/', `/upload/${transformStr}/`);
    }
  }

  // For standard URLs, add query parameters
  const url = new URL(baseUrl);
  if (options?.width) {
    url.searchParams.set('w', options.width.toString());
  }
  if (options?.height) {
    url.searchParams.set('h', options.height.toString());
  }
  if (options?.quality) {
    url.searchParams.set('q', Math.min(100, options.quality).toString());
  }

  return url.toString();
}

/**
 * Preload an image for faster display
 * 
 * @param imagePath - Image path to preload
 * @returns Promise that resolves when image is loaded
 */
export function preloadImage(imagePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to preload image: ${imagePath}`));
    img.src = getFullImageUrl(imagePath);
  });
}

/**
 * Preload multiple images
 * 
 * @param imagePaths - Array of image paths to preload
 * @returns Promise that resolves when all images are loaded
 */
export function preloadImages(imagePaths: string[]): Promise<void[]> {
  return Promise.all(imagePaths.map(preloadImage));
}

/**
 * Log image configuration (for debugging)
 */
export function logImageConfiguration(): void {
  console.group('🖼️ Image Configuration');
  console.log('Base URL:', env.images.baseUrl);
  console.log('Optimization Enabled:', env.images.optimization);
  console.log('Example URL:', getFullImageUrl('/uploads/gallery/photo.jpg'));
  console.groupEnd();
}
