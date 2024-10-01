import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { Util } from '../../../core/utils/TupApihandler';
import { db } from '../../../src/drizzle';
import { todo } from '../../../src/todo.sql';

export const main = Util.handler(async (event) => {
  console.log(event);
  const result = await db.select().from(todo).execute();

  return {
    statusCode: 200,
    body: result,
  };
});

// export const main: APIGatewayProxyHandlerV2 = async (evt) => {
//   if (evt.requestContext.http.method === 'GET') {
//     const result = await db.select().from(todo).execute();
//     console.log(result);
//     return {
//       statusCode: 200,
//       body: JSON.stringify(result, null, 2),
//     };
//   }

//   if (evt.requestContext.http.method === 'POST') {
//     const result = await db
//       .insert(todo)
//       .values({ title: 'Todo', description: 'Description' })
//       .returning()
//       .execute();

//     return {
//       statusCode: 200,
//       body: JSON.stringify(result),
//     };
//   }
// };
