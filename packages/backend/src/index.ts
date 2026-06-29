/**
 * Backend Entry Point
 * Blog Platform API powered by Bun + Elysia
 */

import { startServer } from './app';

// Start the server
startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
