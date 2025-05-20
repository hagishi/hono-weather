import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { serve } from '@hono/node-server';
import path from 'path';

// Import openApiApp from the local openapi file
import { openApiApp, writeOpenApiDocument } from './openapi';

// Create the main Hono app
const app = new Hono();

// Apply middlewares
app.use('*', logger());
app.use('*', prettyJSON());

// Use the OpenAPI app for handling routes
app.route('', openApiApp);

// Handle 404 Not Found
app.notFound((c) => {
  return c.json({ message: 'Not Found', status: 404 }, 404);
});

// Export for different environments
export default app;

// For local development using Node.js
if (import.meta.env === undefined && process.env.NODE_ENV !== 'production') {
  console.log('Server is running on http://localhost:3000');
  
  // Generate OpenAPI YAML when starting the server
  const projectRoot = process.cwd();
  const openApiPath = path.join(projectRoot, 'openapi.yaml');
  writeOpenApiDocument(openApiPath);
  
  serve({
    fetch: app.fetch,
    port: 3000
  });
}