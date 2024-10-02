// const { z } = require('zod');

// // Define schemas
// const UserSchema = z
//   .object({
//     id: z.string().openapi({ example: '1212121' }),
//     name: z.string().openapi({ example: 'John Doe' }),
//     age: z.number().openapi({ example: 42 }),
//   })
//   .openapi('User');

// const UserSchema2 = z
//   .object({
//     id: z.string().openapi({ example: '1212121' }),
//     name: z.string().openapi({ example: 'John Doe' }),
//     age: z.number().openapi({ example: 42 }),
//   })
//   .openapi('User2');

// // registry.registerPath({
// //   method: 'get',
// //   path: '/users/{id}',
// //   summary: 'Get a single user',
// //   request: {
// //     params: z.object({ id: z.string() }),
// //   },
// //   responses: {
// //     200: {
// //       description: 'Object with user data.',
// //       content: {
// //         'application/json': {
// //           schema: UserSchema,
// //         },
// //       },
// //     },
// //   },
// // });

// // registry.registerPath();

// export const Users2 = {
//   method: 'get',
//   path: '/users',
//   summary: 'Get a single user',
//   request: {
//     params: z.object({ id: z.string() }),
//   },
//   responses: {
//     204: {
//       description: 'Object with user data 2.',
//       content: {
//         'application/json': {
//           schema: UserSchema2,
//         },
//       },
//     },
//   },
// };

// export const Users = {
//   method: 'get',
//   path: '/users/{id}',
//   summary: 'Get a single user',
//   request: {
//     params: z.object({ id: z.string() }),
//   },
//   responses: {
//     200: {
//       description: 'Object with user data.',
//       content: {
//         'application/json': {
//           schema: UserSchema,
//         },
//       },
//     },
//   },
// };

const { z } = require('zod');
const { extendZodWithOpenApi } = require('@asteasolutions/zod-to-openapi');
extendZodWithOpenApi(z);

// Define schemas
const UserSchema = z
  .object({
    id: z.string().openapi({ example: '1212121' }),
    name: z.string().openapi({ example: 'John Doe' }),
    age: z.number().openapi({ example: 42 }),
  })
  .openapi('User');

const UserSchema2 = z
  .object({
    id: z.string().openapi({ example: '1212121' }),
    name: z.string().openapi({ example: 'John Doe' }),
    age: z.number().openapi({ example: 42 }),
  })
  .openapi('User2');

// Define exports
module.exports = {
  Users: {
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
  },
  Users2: {
    method: 'get',
    path: '/users',
    summary: 'Get a single user',
    request: {
      params: z.object({ id: z.string() }),
    },
    responses: {
      204: {
        description: 'Object with user data 2.',
        content: {
          'application/json': {
            schema: UserSchema2,
          },
        },
      },
    },
  },
};
