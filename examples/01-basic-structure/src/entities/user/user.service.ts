import { HttpService } from '../../core/http/http.service';
import { User, UserCreateDto, UserUpdateDto } from './user.interface';

/**
 * UserService - Handles all user-related operations
 * Follows standard CRUD pattern: find, get, create, update, delete
 */
export class UserService {
  private http: HttpService;
  private baseUrl = '/user';

  constructor(httpService: HttpService) {
    this.http = httpService;
  }

  /**
   * Find users with optional filters
   * @returns Array of users (empty array if none found)
   */
  async find(filters?: Record<string, unknown>): Promise<User[]> {
    try {
      const params = filters ? `?${new URLSearchParams(filters as Record<string, string>).toString()}` : '';
      const url = `${this.baseUrl}${params}`;
      const users = await this.http.get<User[]>(url);
      return users.map((user) => ({
        ...user,
        createdAt: new Date(user.createdAt),
      }));
    } catch (error) {
      console.error('Failed to find users:', error);
      return [];
    }
  }

  /**
   * Get a single user by ID
   * @throws Error if user not found
   */
  async get(id: number): Promise<User> {
    try {
      const user = await this.http.get<User>(`${this.baseUrl}/${id}`);
      return {
        ...user,
        createdAt: new Date(user.createdAt),
      };
    } catch (error) {
      throw new Error(`Failed to get user ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Create a new user
   */
  async create(dto: UserCreateDto): Promise<User> {
    try {
      const user = await this.http.post<User>(this.baseUrl, dto);
      return {
        ...user,
        createdAt: new Date(user.createdAt),
      };
    } catch (error) {
      throw new Error(`Failed to create user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Update an existing user
   * @throws Error if user not found
   */
  async update(id: number, dto: UserUpdateDto): Promise<User> {
    try {
      const user = await this.http.patch<User>(`${this.baseUrl}/${id}`, dto);
      return {
        ...user,
        createdAt: new Date(user.createdAt),
      };
    } catch (error) {
      throw new Error(`Failed to update user ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Delete a user
   * @returns true if deleted successfully
   */
  async delete(id: number): Promise<boolean> {
    try {
      return await this.http.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      throw new Error(`Failed to delete user ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
