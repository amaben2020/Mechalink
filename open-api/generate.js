const express = require('express');
const { json } = require('express');
const { z } = require('zod');
const { extendZodWithOpenApi } = require('@asteasolutions/zod-to-openapi');
const {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} = require('@asteasolutions/zod-to-openapi');
const path = require('path');
const { stringify } = require('yaml');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const { readFileSync, writeFileSync } = require('fs');
const { Users, Users2 } = require('../packages/functions/src/jobs/open-api');
extendZodWithOpenApi(z);

const registry = new OpenAPIRegistry();

// all schemas in the app goes here
const schemas = [Users, Users2];

schemas.forEach((schema) => {
  registry.registerPath(schema);
});

// Create an OpenAPI document generator
const generator = new OpenApiGeneratorV3(registry.definitions);

// Generate the OpenAPI document
const openApiDocument = generator.generateDocument({
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'My API',
    description: 'This is the API',
  },
  servers: [{ url: 'http://localhost:3000' }],
});

// Write the generated OpenAPI document to a YAML file
writeFileSync('./out/open-api.yaml', stringify(openApiDocument));

const doc = yaml.load(
  readFileSync(path.resolve(__dirname, './out/open-api.yaml'), 'utf-8')
);

const app = express();

app.use('/', express.static('static'));

app.use(
  '/',
  swaggerUi.serve,
  swaggerUi.setup(doc, {
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      operationsSorter: 'alpha',
    },
  })
);

// Start the server
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
