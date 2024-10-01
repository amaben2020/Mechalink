const vpc = new sst.aws.Vpc('MyVpc');
const rds = new sst.aws.Postgres('MyPostgres', { vpc });
export const api = new sst.aws.ApiGatewayV2('Api', {
  cors: {
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  transform: {
    route: {
      handler: {
        link: [rds],
      },
    },
  },
});
api.route('GET /todos', 'packages/functions/src/todos/list.main');
