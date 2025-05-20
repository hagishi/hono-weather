import { describe, it, expect } from 'vitest';
import { generateOpenApiDocument, writeOpenApiDocument } from '../src/openapi';
import fs from 'fs';
import path from 'path';
import * as yaml from 'js-yaml';

describe('OpenAPI', () => {
  it('should generate OpenAPI document as YAML', () => {
    const yamlDoc = generateOpenApiDocument();
    expect(yamlDoc).toBeDefined();
    expect(typeof yamlDoc).toBe('string');
    
    // Make sure the YAML can be parsed back to an object
    const parsedYaml = yaml.load(yamlDoc);
    expect(parsedYaml).toHaveProperty('openapi');
    expect(parsedYaml).toHaveProperty('info');
    expect(parsedYaml).toHaveProperty('paths');
  });

  it('should write OpenAPI document to file', () => {
    const tempDir = fs.mkdtempSync(path.join(process.cwd(), 'temp-'));
    const filePath = path.join(tempDir, 'openapi-test.yaml');
    
    try {
      const result = writeOpenApiDocument(filePath);
      expect(result).toBe(true);
      
      // Verify the file was written
      expect(fs.existsSync(filePath)).toBe(true);
      
      // Verify the file contains valid YAML
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      expect(fileContent).toBeDefined();
      expect(fileContent.length).toBeGreaterThan(0);
      
      const parsedYaml = yaml.load(fileContent);
      expect(parsedYaml).toHaveProperty('openapi');
      expect(parsedYaml).toHaveProperty('info');
      expect(parsedYaml).toHaveProperty('paths');
    } finally {
      // Clean up temporary files
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmdirSync(tempDir);
      }
    }
  });
});