import { useDb } from '@/functions/db';
import { jobsSchema } from '@/functions/db/schema';

export const list = async () => {
  const res = await useDb().select().from(jobsSchema).execute();
  console.log('object' == 'object');
  return res;
};
