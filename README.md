# Hono Weather API

![CI](https://github.com/hagishi/hono-weather/workflows/CI/badge.svg)

A weather API skeleton built with Hono.js that runs at the edge.

## Features

- Built with Hono.js, a lightweight web framework
- Designed to run in edge environments (Cloudflare Workers, Deno Deploy, Vercel Edge, etc.)
- TypeScript support
- Simple API structure
- OpenAPI documentation generation

## API Endpoints

- `GET /weather` - Get current weather
- `GET /weather/forecast` - Get weather forecast
- `GET /weather/:location` - Get weather for a specific location
- `GET /weather/coordinates` - Get weather for specific coordinates

An OpenAPI specification is automatically generated when the server starts and saved to `openapi.yaml` in the project root.

### OpenAPI Documentation

When you start the server, an OpenAPI YAML file will be automatically generated in the project root. This document describes all available endpoints, parameters, and response formats.

You can also manually generate the OpenAPI document using:

```bash
node generate-openapi.js
```

The generated `openapi.yaml` file can be used with tools like [Swagger UI](https://swagger.io/tools/swagger-ui/) or [Redoc](https://github.com/Redocly/redoc) to create interactive API documentation.

## Getting Started

### Prerequisites

- Node.js 18+ 

### Installation

```bash
# Clone the repository
git clone https://github.com/hagishi/hono-weather.git
cd hono-weather

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

### Building

```bash
# Build project
npm run build

# Run built project
npm start
```

### Testing

Tests are implemented using [Vitest](https://vitest.dev/).

```bash
# Run tests once
npm test

# Run tests in watch mode during development
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Deployment

This application can be deployed to various edge environments:

### Cloudflare Workers

Modify the `wrangler.toml` configuration and run:

```bash
npx wrangler deploy
```

### Vercel Edge

Create a Vercel project and deploy using:

```bash
vercel
```

## License

ISC
