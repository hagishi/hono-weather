import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { serve } from '@hono/node-server';

// Create the main Hono app
const app = new Hono();

// Apply middlewares
app.use('*', logger());
app.use('*', prettyJSON());

// Root endpoint
app.get('/', (c) => {
  return c.json({
    message: 'Welcome to the Weather API',
    version: '1.0.0',
    endpoints: [
      '/weather - Get current weather',
      '/weather/forecast - Get weather forecast',
      '/weather/:location - Get weather for a specific location'
    ]
  });
});

// Weather endpoints
app.get('/weather', (c) => {
  return c.json({
    location: 'Tokyo',
    temperature: 22,
    condition: 'Sunny',
    humidity: 60,
    windSpeed: 5,
    timestamp: new Date().toISOString()
  });
});

app.get('/weather/forecast', (c) => {
  return c.json([
    {
      date: '2023-06-01',
      temperature: { min: 18, max: 25 },
      condition: 'Sunny',
      precipitation: 0
    },
    {
      date: '2023-06-02',
      temperature: { min: 17, max: 24 },
      condition: 'Partly Cloudy',
      precipitation: 10
    },
    {
      date: '2023-06-03',
      temperature: { min: 19, max: 26 },
      condition: 'Sunny',
      precipitation: 0
    }
  ]);
});

app.get('/weather/:location', (c) => {
  const location = c.req.param('location');
  
  return c.json({
    location: location,
    temperature: 20,
    condition: 'Cloudy',
    humidity: 65,
    windSpeed: 8,
    timestamp: new Date().toISOString()
  });
});

// Handle 404 Not Found
app.notFound((c) => {
  return c.json({ message: 'Not Found', status: 404 }, 404);
});

// Export for different environments
export default app;

// For local development using Node.js
if (import.meta.env === undefined && process.env.NODE_ENV !== 'production') {
  console.log('Server is running on http://localhost:3000');
  serve({
    fetch: app.fetch,
    port: 3000
  });
}