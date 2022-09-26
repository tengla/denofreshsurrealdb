import { HandlerContext } from "$fresh/server.ts";
import { RecordError } from "https://deno.land/x/surrealdb@v0.5.0/src/errors/index.ts";
import getDb from '../../../models/joke.ts';

export const handler = {
  async GET(_req: Request, ctx: HandlerContext): Promise<Response>  {
    const db = await getDb();
    try {
      const joke = await db?.select(`jokes:${ctx.params.id}`);
      return new Response(JSON.stringify(joke));
    } catch (error) {
      console.error('err', error instanceof RecordError);
      if (error instanceof RecordError) {
        return new Response(JSON.stringify({
          status: 404,
          statusText: 'Not Found',
        }), {
          status: 404
        });
      }
      return new Response('Internal Server Error', {
        status: 500,
      });
    }
  },
  async DELETE(_req: Request, ctx: HandlerContext): Promise<Response>  {
    const db = await getDb();
    const deletedJoke = await db?.delete(`jokes:${ctx.params.id}`);
    return new Response(JSON.stringify(deletedJoke));
  }
}
