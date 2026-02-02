/**
 * Auth API Types
 */

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: 'bearer';
  user: {
    id: string;
    email: string;
    full_name: string;
    is_active: boolean;
    is_admin: boolean;
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
  full_name: string;
}

export interface RegisterResponse extends LoginResponse {}

export interface CurrentUserResponse {
  id: string;
  email: string;
  full_name: string;
  is_active: boolean;
  is_admin: boolean;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}

export interface RefreshTokenRequest {
  access_token: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  token_type: 'bearer';
}
