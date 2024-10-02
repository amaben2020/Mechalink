import { useDb } from '@/functions/db';
import { jobs } from '@/functions/db/schema/job';

export const list = async () => {
  const res = await useDb().select().from(jobs).execute();
  console.log('object' == 'object');
  return res;
};
