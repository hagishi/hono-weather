import { Hono } from 'hono';
import { writeFileSync } from 'fs';
import * as yaml from 'js-yaml';

// Create the app for handling API routes
export const openApiApp = new Hono();

// Root endpoint
openApiApp.get('/', (c) => {
  return c.json({
    message: 'Welcome to the Weather API',
    version: '1.0.0',
    endpoints: [
      '/weather - Get current weather',
      '/weather/forecast - Get weather forecast',
      '/weather/:location - Get weather for a specific location',
      '/weather/coordinates?lat=<latitude>&lon=<longitude> - Get weather for specific coordinates'
    ]
  });
});

// Current weather
openApiApp.get('/weather', (c) => {
  return c.json({
    location: 'Tokyo',
    temperature: 22,
    condition: 'Sunny',
    humidity: 60,
    windSpeed: 5,
    timestamp: new Date().toISOString()
  });
});

// Weather forecast
openApiApp.get('/weather/forecast', (c) => {
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

// Weather for specific coordinates
openApiApp.get('/weather/coordinates', (c) => {
  const lat = c.req.query('lat');
  const lon = c.req.query('lon');
  
  if (!lat || !lon) {
    return c.json({ message: 'Missing required parameters: lat and lon', status: 400 }, 400);
  }
  
  return c.json({
    coordinates: { latitude: lat, longitude: lon },
    temperature: 22,
    condition: 'Partly Cloudy',
    humidity: 68,
    windSpeed: 6,
    timestamp: new Date().toISOString()
  });
});

// Weather for specific location
openApiApp.get('/weather/:location', (c) => {
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

// Generate a manual OpenAPI document
export const generateOpenApiDocument = () => {
  // Create a manually defined OpenAPI document
  const openApiDocument = {
    openapi: '3.0.3',
    info: {
      title: 'Weather API',
      description: 'A weather API built with Hono.js',
      version: '1.0.0'
    },
    paths: {
      '/': {
        get: {
          summary: 'Get API information',
          tags: ['Info'],
          responses: {
            '200': {
              description: 'API information response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string' },
                      version: { type: 'string' },
                      endpoints: {
                        type: 'array',
                        items: { type: 'string' }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/weather': {
        get: {
          summary: 'Get current weather',
          tags: ['Weather'],
          responses: {
            '200': {
              description: 'Current weather data',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      location: { type: 'string' },
                      temperature: { type: 'number' },
                      condition: { type: 'string' },
                      humidity: { type: 'number' },
                      windSpeed: { type: 'number' },
                      timestamp: { type: 'string', format: 'date-time' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/weather/forecast': {
        get: {
          summary: 'Get weather forecast',
          tags: ['Weather'],
          responses: {
            '200': {
              description: 'Weather forecast data',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        date: { type: 'string' },
                        temperature: {
                          type: 'object',
                          properties: {
                            min: { type: 'number' },
                            max: { type: 'number' }
                          }
                        },
                        condition: { type: 'string' },
                        precipitation: { type: 'number' }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/weather/{location}': {
        get: {
          summary: 'Get weather by location',
          tags: ['Weather'],
          parameters: [
            {
              name: 'location',
              in: 'path',
              required: true,
              schema: { type: 'string' },
              description: 'Location name'
            }
          ],
          responses: {
            '200': {
              description: 'Weather data for location',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      location: { type: 'string' },
                      temperature: { type: 'number' },
                      condition: { type: 'string' },
                      humidity: { type: 'number' },
                      windSpeed: { type: 'number' },
                      timestamp: { type: 'string', format: 'date-time' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/weather/coordinates': {
        get: {
          summary: 'Get weather by coordinates',
          tags: ['Weather'],
          parameters: [
            {
              name: 'lat',
              in: 'query',
              required: true,
              schema: { type: 'string' },
              description: 'Latitude'
            },
            {
              name: 'lon',
              in: 'query',
              required: true,
              schema: { type: 'string' },
              description: 'Longitude'
            }
          ],
          responses: {
            '200': {
              description: 'Weather data for coordinates',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      coordinates: {
                        type: 'object',
                        properties: {
                          latitude: { type: 'string' },
                          longitude: { type: 'string' }
                        }
                      },
                      temperature: { type: 'number' },
                      condition: { type: 'string' },
                      humidity: { type: 'number' },
                      windSpeed: { type: 'number' },
                      timestamp: { type: 'string', format: 'date-time' }
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Missing parameters',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string' },
                      status: { type: 'number' }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  
  // Convert to YAML
  const openApiYaml = yaml.dump(openApiDocument);
  return openApiYaml;
};

// Write OpenAPI document to file
export const writeOpenApiDocument = (filePath: string = './openapi.yaml') => {
  try {
    const openApiYaml = generateOpenApiDocument();
    writeFileSync(filePath, openApiYaml);
    console.log(`OpenAPI document written to ${filePath}`);
    return true;
  } catch (error) {
    console.error('Error writing OpenAPI document:', error);
    return false;
  }
};