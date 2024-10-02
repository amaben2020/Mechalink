/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const express = require('express');
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
const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs');
const { Users } = require('../packages/functions/src/jobs/open-api');
extendZodWithOpenApi(z);

const registry = new OpenAPIRegistry();

// all schema definitions in the app goes here
const schemas = [Users];

schemas.forEach((schema) => {
  registry.registerPath(schema);
});

const generator = new OpenApiGeneratorV3(registry.definitions);

const openApiDocument = generator.generateDocument({
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'My API',
    description: 'This is the API',
  },
  servers: [
    { url: 'https://1npaj0q9ug.execute-api.eu-west-1.amazonaws.com/jobs' },
  ],
});

const app = express();

// Create 'out' directory if it doesn't exist
const outputDir = path.join(__dirname, './out');
if (!existsSync(outputDir)) {
  mkdirSync(outputDir);
}

writeFileSync(
  path.join(outputDir, 'open-api.yaml'),
  stringify(openApiDocument)
);

const doc = yaml.load(
  readFileSync(path.resolve(outputDir, 'open-api.yaml'), 'utf-8')
);

app.use('/', express.static('static'));

// we could look at how to do this on each git push using vercel
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

// const PORT = 8080;

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
