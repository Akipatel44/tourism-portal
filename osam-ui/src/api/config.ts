/**
 * Environment Configuration
 * Centralized access to environment variables
 */

interface Config {
  API_BASE_URL: string;
  API_TIMEOUT: number;
  TOKEN_KEY: string;
  IS_PRODUCTION: boolean;
  IS_DEVELOPMENT: boolean;
}

const config: Config = {
  // Base URL for all API requests - use environment variable or fallback
  API_BASE_URL:
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api',

  // Request timeout in milliseconds
  API_TIMEOUT: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000', 10),

  // Key for storing access token in localStorage
  TOKEN_KEY: process.env.NEXT_PUBLIC_TOKEN_KEY || 'osam_access_token',

  // Environment checks
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
};

export default config;
