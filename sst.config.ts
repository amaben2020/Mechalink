/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'oga-mechanic-app',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
    };
  },
  async run() {
    // await import('./infra/api');
    const vpc = new sst.aws.Vpc('MyVpc');
    const rds = new sst.aws.Postgres('MyPostgres', { vpc });
    const api = new sst.aws.Function('MyApi', {
      url: true,
      link: [rds],
      handler: './packages/functions/src/todos/list.main',
    });

    return {
      api: api.url,
    };
  },
});
