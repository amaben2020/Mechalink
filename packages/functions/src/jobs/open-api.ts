import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
extendZodWithOpenApi(z);

const PATH = '/jobs';

export const UserSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    age: z.number(),
  })
  .openapi({
    example: {
      name: '1212121',
      id: '1',
      age: 1,
    },
  });

export const Users = {
  method: 'list',
  path: '/jobs',
  summary: 'Get a single user',
  // TODO: remove this for single GET
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
};
