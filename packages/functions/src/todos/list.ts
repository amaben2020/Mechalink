import { Util } from '@/core/utils/TupApihandler';
import { useDb } from '@/functions/db/schema/db';
import { todo } from '@/functions/db/schema/todo';

export const main = Util.handler(async (event) => {
  const result = await useDb().select().from(todo).execute();

  return {
    statusCode: 200,
    body: result,
  };
});
