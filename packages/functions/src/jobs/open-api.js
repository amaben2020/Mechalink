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
extendZodWithOpenApi(z);

// Define schemas
const UserSchema = z
  .object({
    id: z.string().openapi({ example: '1212121' }),
    name: z.string().openapi({ example: 'John Doe' }),
    age: z.number().openapi({ example: 42 }),
  })
  .openapi('User');

// Create a registry and register paths
const registry = new OpenAPIRegistry();

registry.registerPath({
  method: 'get',
  path: '/users/{id}',
  summary: 'Get a single user',
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    200: {
      description: 'Object with user data.',
      content: {
        'application/json': {
          schema: UserSchema,
        },
      },
    },
  },
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
writeFileSync('./open-api.yaml', stringify(openApiDocument));

const doc = yaml.load(
  readFileSync(path.resolve(__dirname, './open-api.yaml'), 'utf-8')
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
