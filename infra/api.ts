import { db } from '../packages/src/drizzle';

export const api = new sst.aws.ApiGatewayV2('Api', {
  cors: {
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  transform: {
    route: {
      handler: {
        link: [db],
      },
    },
  },
});
api.route('GET /todos', 'packages/functions/src/todos/list.main');
