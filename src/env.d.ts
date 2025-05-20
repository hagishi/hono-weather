/// <reference types="node" />

interface ImportMeta {
  env: {
    NODE_ENV?: string;
    PORT?: string;
    API_KEY?: string;
    // Add more environment variables as needed
  };
}