import { UserService } from '../../entities/user/user.service';
import { User } from '../../entities/user/user.interface';
import { UserCardComponent } from '../../components/user-card/user-card.component';

/**
 * UsersPage Component - Displays list of all users
 * Smart component: fetches data, manages state, coordinates UI
 */
export class UsersComponent {
  private container: HTMLElement;
  private userService: UserService;
  private users: User[] = [];
  private loading = false;
  private error: string | null = null;

  constructor(container: HTMLElement, userService: UserService) {
    this.container = container;
    this.userService = userService;
  }

  /**
   * Initialize component: load data and render
   */
  async init(): Promise<void> {
    await this._loadUsers();
    this._render();
    this._attachEventListeners();
  }

  /**
   * Load users from service
   */
  private async _loadUsers(): Promise<void> {
    this.loading = true;
    this.error = null;

    try {
      this.users = await this.userService.find();
    } catch (error) {
      this.error = `Failed to load users: ${error instanceof Error ? error.message : 'Unknown error'}`;
      console.error(this.error);
    } finally {
      this.loading = false;
    }
  }

  /**
   * Render page structure and user cards
   */
  private _render(): void {
    this.container.innerHTML = `
      <div class="users-page">
        <header class="users-page__header">
          <h1>Users</h1>
          <div class="users-page__controls">
            <button class="users-page__button-refresh">Refresh</button>
            <button class="users-page__button-add">+ Add User</button>
          </div>
        </header>

        ${this._renderStatusMessage()}

        <div class="users-page__grid" id="users-grid"></div>
      </div>
    `;

    if (!this.loading && !this.error) {
      this._renderUserCards();
    }
  }

  /**
   * Render status message (loading, error, or empty)
   */
  private _renderStatusMessage(): string {
    if (this.loading) {
      return '<div class="users-page__status">Loading users...</div>';
    }

    if (this.error) {
      return `<div class="users-page__status users-page__status--error">${this._escapeHtml(this.error)}</div>`;
    }

    if (this.users.length === 0) {
      return '<div class="users-page__status">No users found</div>';
    }

    return '';
  }

  /**
   * Render user cards in grid
   */
  private _renderUserCards(): void {
    const grid = this.container.querySelector('#users-grid');
    if (!grid) return;

    grid.innerHTML = '';

    this.users.forEach((user) => {
      const cardContainer = document.createElement('div');
      grid.appendChild(cardContainer);

      const card = new UserCardComponent(cardContainer, user);
      card.render();
    });
  }

  /**
   * Attach event listeners to page
   */
  private _attachEventListeners(): void {
    const refreshButton = this.container.querySelector('.users-page__button-refresh');
    const addButton = this.container.querySelector('.users-page__button-add');

    refreshButton?.addEventListener('click', () => this._onRefresh());
    addButton?.addEventListener('click', () => this._onAdd());

    // Listen for user card events (delegated)
    this.container.addEventListener('user-edit', (event: Event) => {
      const customEvent = event as CustomEvent<{ userId: number }>;
      this._onEditUser(customEvent.detail.userId);
    });

    this.container.addEventListener('user-delete', (event: Event) => {
      const customEvent = event as CustomEvent<{ userId: number }>;
      this._onDeleteUser(customEvent.detail.userId);
    });
  }

  /**
   * Handle refresh button click
   */
  private async _onRefresh(): Promise<void> {
    await this._loadUsers();
    this._render();
    this._attachEventListeners();
  }

  /**
   * Handle add user button click
   */
  private _onAdd(): void {
    alert('Add user feature coming soon!');
  }

  /**
   * Handle edit user event
   */
  private _onEditUser(userId: number): void {
    alert(`Edit user ${userId} feature coming soon!`);
  }

  /**
   * Handle delete user event
   */
  private async _onDeleteUser(userId: number): Promise<void> {
    const confirmed = confirm(`Delete user ${userId}?`);
    if (!confirmed) return;

    try {
      await this.userService.delete(userId);
      await this._onRefresh();
    } catch (error) {
      alert(`Failed to delete user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Escape HTML to prevent XSS
   */
  private _escapeHtml(text: string): string {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }
}
