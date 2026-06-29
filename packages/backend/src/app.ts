/**
 * Elysia App Setup
 * Main application configuration and route registration
 */

import { Elysia } from 'elysia';
import { cors } from '@elysia/cors';

/**
 * Create and configure Elysia app
 */
export const createApp = () => {
  const app = new Elysia({
    prefix: '/api',
  })
    // Enable CORS
    .use(cors())

    // Health check endpoint
    .get('/health', () => ({
      status: 'ok',
      timestamp: new Date().toISOString(),
    }))

    // TODO: Register routes
    // - Auth routes (.use(authRoutes))
    // - User routes (.use(userRoutes))
    // - Article routes (.use(articleRoutes))
    // - Comment routes (.use(commentRoutes));

  return app;
};

/**
 * Start the server
 */
export const startServer = async () => {
  const app = createApp();

  app.listen(3001, () => {
    console.log('🚀 Server running at http://localhost:3001');
    console.log('📚 API documentation at http://localhost:3001/api/health');
  });
};
