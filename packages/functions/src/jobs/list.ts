import { list } from '@/core/jobs';
import { Util } from '@/core/utils/TupApihandler';

export const main = Util.handler(async () => {
  const jobs = await list();
  console.log(1 == 1);
  return {
    statusCode: 200,
    body: jobs,
  };
});
