# Hono Weather API

![CI](https://github.com/hagishi/hono-weather/workflows/CI/badge.svg)

A weather API skeleton built with Hono.js that runs at the edge.

## Features

- Built with Hono.js, a lightweight web framework
- Designed to run in edge environments (Cloudflare Workers, Deno Deploy, Vercel Edge, etc.)
- TypeScript support
- Simple API structure

## API Endpoints

- `GET /weather` - Get current weather
- `GET /weather/forecast` - Get weather forecast
- `GET /weather/:location` - Get weather for a specific location

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
