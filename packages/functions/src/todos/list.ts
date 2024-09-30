import { Util } from '../../../core/utils/TupApihandler';
import { db } from '../../../src/drizzle';
import { todo } from '../../../src/todo.sql';

export const main = Util.handler(async (event) => {
  console.log('event', event);
  const result = await db.select().from(todo).execute();
  console.log('RESULT', result);
  return {
    statusCode: 200,
    body: result,
  };
});
