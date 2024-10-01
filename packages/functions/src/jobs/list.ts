import { Util } from '@/core/utils/TupApihandler';
import { useDb } from '@/functions/db';
import { jobs as jobsSchema } from '@/functions/db/schema/job';

export const main = Util.handler(async (event) => {
  const jobs = await useDb().select().from(jobsSchema).execute();

  return {
    statusCode: 200,
    body: jobs,
  };
});
