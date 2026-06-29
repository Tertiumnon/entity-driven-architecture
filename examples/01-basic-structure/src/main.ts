/**
 * Main entry point for the application
 * Sets up services and initializes the root component
 */

import { HttpService } from './core/http/http.service';
import { UserService } from './entities/user/user.service';
import { UsersComponent } from './pages/users/users.component';

/**
 * Initialize application
 */
async function bootstrap(): Promise<void> {
  try {
    // Get root container
    const root = document.getElementById('app');
    if (!root) {
      throw new Error('Root element #app not found');
    }

    // Create services
    const httpService = new HttpService('/api');
    const userService = new UserService(httpService);

    // Create and initialize root component
    const usersComponent = new UsersComponent(root, userService);
    await usersComponent.init();

    console.log('✓ Application initialized successfully');
  } catch (error) {
    console.error('Failed to initialize application:', error);
    const root = document.getElementById('app');
    if (root) {
      root.innerHTML = `<div class="error">Failed to initialize application: ${error instanceof Error ? error.message : 'Unknown error'}</div>`;
    }
  }
}

// Start application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap().catch(console.error);
}
