import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
extendZodWithOpenApi(z);

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
};
