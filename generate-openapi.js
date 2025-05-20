// This script imports from the compiled JS files
import { generateOpenApiDocument } from './dist/openapi.js';
import * as fs from 'fs';
import * as path from 'path';

const projectRoot = process.cwd();
const openApiPath = path.join(projectRoot, 'openapi.yaml');

// Generate the OpenAPI document and write it to a file
const yamlContent = generateOpenApiDocument();
fs.writeFileSync(openApiPath, yamlContent);

console.log(`OpenAPI document generated at ${openApiPath}`);