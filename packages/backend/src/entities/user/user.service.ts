/**
 * User Service
 * Handles all user-related business logic
 * Follows standard CRUD pattern: find, get, create, update, delete
 */

import { User, UserCreateDto, UserUpdateDto, UserPublic, UserLoginDto, JwtPayload } from './user.types';
import { USER_CONSTANTS, USER_ERROR_MESSAGES } from './user.constants';
import { mockUsers } from './user.mock';

export class UserService {
  private users: User[] = [...mockUsers];

  /**
   * Find users with optional filters
   * Returns: empty array if none found
   */
  async find(filters?: { username?: string; email?: string }): Promise<UserPublic[]> {
    let results = [...this.users];

    if (filters?.username) {
      results = results.filter((u) => u.username.toLowerCase().includes(filters.username!.toLowerCase()));
    }

    if (filters?.email) {
      results = results.filter((u) => u.email.toLowerCase().includes(filters.email!.toLowerCase()));
    }

    return results.map(this._toPublic);
  }

  /**
   * Get single user by ID
   * Throws: error if not found
   */
  async get(id: number): Promise<UserPublic> {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new Error(USER_ERROR_MESSAGES.NOT_FOUND);
    }
    return this._toPublic(user);
  }

  /**
   * Get user by username
   * Throws: error if not found
   */
  async getByUsername(username: string): Promise<UserPublic> {
    const user = this.users.find((u) => u.username === username);
    if (!user) {
      throw new Error(USER_ERROR_MESSAGES.NOT_FOUND);
    }
    return this._toPublic(user);
  }

  /**
   * Create new user
   * Throws: error if user already exists or validation fails
   */
  async create(dto: UserCreateDto): Promise<UserPublic> {
    // Validate email
    if (!USER_CONSTANTS.EMAIL_REGEX.test(dto.email)) {
      throw new Error(USER_ERROR_MESSAGES.INVALID_EMAIL);
    }

    // Validate username
    if (!USER_CONSTANTS.USERNAME_REGEX.test(dto.username)) {
      throw new Error(USER_ERROR_MESSAGES.INVALID_USERNAME);
    }

    if (dto.username.length < USER_CONSTANTS.MIN_USERNAME_LENGTH) {
      throw new Error(USER_ERROR_MESSAGES.USERNAME_TOO_SHORT);
    }

    if (dto.username.length > USER_CONSTANTS.MAX_USERNAME_LENGTH) {
      throw new Error(USER_ERROR_MESSAGES.USERNAME_TOO_LONG);
    }

    // Validate password
    if (dto.password.length < USER_CONSTANTS.MIN_PASSWORD_LENGTH) {
      throw new Error(USER_ERROR_MESSAGES.PASSWORD_TOO_SHORT);
    }

    if (dto.password.length > USER_CONSTANTS.MAX_PASSWORD_LENGTH) {
      throw new Error(USER_ERROR_MESSAGES.PASSWORD_TOO_LONG);
    }

    // Check if user already exists
    const exists = this.users.some((u) => u.email === dto.email || u.username === dto.username);
    if (exists) {
      throw new Error(USER_ERROR_MESSAGES.ALREADY_EXISTS);
    }

    // Create new user
    const newUser: User = {
      id: Math.max(0, ...this.users.map((u) => u.id)) + 1,
      email: dto.email,
      username: dto.username,
      displayName: dto.displayName,
      passwordHash: this._hashPassword(dto.password), // In real app, use bcrypt
      bio: undefined,
      avatar: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);
    return this._toPublic(newUser);
  }

  /**
   * Update existing user
   * Throws: error if user not found or validation fails
   */
  async update(id: number, dto: UserUpdateDto): Promise<UserPublic> {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new Error(USER_ERROR_MESSAGES.NOT_FOUND);
    }

    // Validate displayName if provided
    if (dto.displayName !== undefined && dto.displayName.length > USER_CONSTANTS.MAX_DISPLAY_NAME_LENGTH) {
      throw new Error(USER_ERROR_MESSAGES.DISPLAY_NAME_TOO_LONG);
    }

    // Validate bio if provided
    if (dto.bio !== undefined && dto.bio.length > USER_CONSTANTS.MAX_BIO_LENGTH) {
      throw new Error(USER_ERROR_MESSAGES.BIO_TOO_LONG);
    }

    // Update fields
    if (dto.displayName !== undefined) user.displayName = dto.displayName;
    if (dto.bio !== undefined) user.bio = dto.bio;
    if (dto.avatar !== undefined) user.avatar = dto.avatar;
    user.updatedAt = new Date();

    return this._toPublic(user);
  }

  /**
   * Delete user
   * Returns: true if successful
   */
  async delete(id: number): Promise<boolean> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new Error(USER_ERROR_MESSAGES.NOT_FOUND);
    }

    this.users.splice(index, 1);
    return true;
  }

  /**
   * Authenticate user (login)
   * Returns: user data if credentials valid, throws otherwise
   */
  async authenticate(dto: UserLoginDto): Promise<UserPublic & { id: number; username: string; email: string }> {
    const user = this.users.find((u) => u.email === dto.email);
    if (!user || !this._verifyPassword(dto.password, user.passwordHash)) {
      throw new Error(USER_ERROR_MESSAGES.INVALID_PASSWORD);
    }

    return {
      ...this._toPublic(user),
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }

  /**
   * Convert user to public (remove password)
   * Private method
   */
  private _toPublic(user: User): UserPublic {
    const { passwordHash, ...publicUser } = user;
    return publicUser;
  }

  /**
   * Hash password (mock - use bcrypt in production)
   * Private method
   */
  private _hashPassword(password: string): string {
    // In production, use bcrypt or similar
    return `$2b$10$${Buffer.from(password).toString('base64')}`;
  }

  /**
   * Verify password (mock - use bcrypt in production)
   * Private method
   */
  private _verifyPassword(password: string, hash: string): boolean {
    // In production, use bcrypt or similar
    return hash.includes(Buffer.from(password).toString('base64'));
  }
}

// Export singleton instance
export const userService = new UserService();
