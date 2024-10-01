import { list } from '@/core/jobs';
import { Util } from '@/core/utils/TupApihandler';

export const main = Util.handler(async (event) => {
  const jobs = await list();

  return {
    statusCode: 200,
    body: jobs,
  };
});
