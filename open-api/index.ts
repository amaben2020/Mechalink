import * as yaml from 'yaml';

import { z } from 'zod';

import {
  extendZodWithOpenApi,
  createDocument,
  ZodOpenApiOperationObject,
} from 'zod-openapi';
extendZodWithOpenApi(z);

const BurgerIdSchema = z
  .number()
  .min(1)
  .openapi({
    ref: 'BurgerId',
    description: 'The unique identifier of the burger.',
    example: 1,
    param: {
      in: 'path',
      name: 'id',
    },
  });

const burgerSchema = z.object({
  id: BurgerIdSchema,
  name: z.string().min(1).max(50).openapi({
    description: 'The name of the burger.',
    example: 'Veggie Burger',
  }),
  description: z.string().max(255).optional().openapi({
    description: 'The description of the burger.',
    example: 'A delicious bean burger with avocado.',
  }),
});

burgerSchema.openapi({
  ref: 'Burger',
  description: 'A burger served at the restaurant.',
});

const document = createDocument({
  openapi: '3.1.0',
  info: {
    title: 'Burger Restaurant API',
    description: 'An API for managing burgers at a restaurant.',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'https://example.com',
      description: 'The production server.',
    },
  ],
  components: {
    schemas: {
      burgerSchema,
    },
  },
});

console.log(yaml.stringify(document));
