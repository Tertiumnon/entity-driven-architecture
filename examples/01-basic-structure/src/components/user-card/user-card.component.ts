import { User } from '../../entities/user/user.interface';

/**
 * UserCard Component - Displays a single user in card format
 * Dumb component: accepts data and emits events
 */
export class UserCardComponent {
  private container: HTMLElement;
  private user: User;

  constructor(container: HTMLElement, user: User) {
    this.container = container;
    this.user = user;
  }

  /**
   * Render the component
   */
  render(): void {
    const createdDate = this.user.createdAt.toLocaleDateString();

    this.container.innerHTML = `
      <div class="user-card" data-user-id="${this.user.id}">
        <div class="user-card__header">
          <h3 class="user-card__name">${this._escapeHtml(this.user.name)}</h3>
          <span class="user-card__id">#${this.user.id}</span>
        </div>
        <div class="user-card__body">
          <p class="user-card__email">
            <strong>Email:</strong> ${this._escapeHtml(this.user.email)}
          </p>
          <p class="user-card__created">
            <strong>Created:</strong> ${createdDate}
          </p>
        </div>
        <div class="user-card__footer">
          <button class="user-card__button user-card__button--edit">Edit</button>
          <button class="user-card__button user-card__button--delete">Delete</button>
        </div>
      </div>
    `;

    this._attachEventListeners();
  }

  /**
   * Attach event listeners to component elements
   */
  private _attachEventListeners(): void {
    const editButton = this.container.querySelector('.user-card__button--edit');
    const deleteButton = this.container.querySelector('.user-card__button--delete');

    editButton?.addEventListener('click', () => this._onEdit());
    deleteButton?.addEventListener('click', () => this._onDelete());
  }

  /**
   * Handle edit button click
   */
  private _onEdit(): void {
    const event = new CustomEvent('user-edit', {
      detail: { userId: this.user.id },
      bubbles: true,
    });
    this.container.dispatchEvent(event);
  }

  /**
   * Handle delete button click
   */
  private _onDelete(): void {
    const event = new CustomEvent('user-delete', {
      detail: { userId: this.user.id },
      bubbles: true,
    });
    this.container.dispatchEvent(event);
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
