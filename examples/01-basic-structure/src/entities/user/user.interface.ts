/**
 * User Entity - Core domain model
 * Represents a user in the system
 */
export interface User {
  id: number;
  email: string;
  name: string;
  createdAt: Date;
}

/**
 * UserCreateDto - Data required to create a new user
 */
export interface UserCreateDto {
  email: string;
  name: string;
}

/**
 * UserUpdateDto - Data that can be updated for a user
 */
export interface UserUpdateDto {
  email?: string;
  name?: string;
}

/**
 * UserResponseDto - User data returned to client (no sensitive data)
 */
export interface UserResponseDto {
  id: number;
  email: string;
  name: string;
  createdAt: string;
}
