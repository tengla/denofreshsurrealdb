import { HandlerContext } from "$fresh/server.ts";
import { RecordError } from "surrealdb/src/errors/index.ts";
import { api } from '~/models/joke.ts'

export const handler = {
  async GET(_req: Request, ctx: HandlerContext): Promise<Response> {
    const $api = await api();
    try {
      const joke = await $api.find(ctx.params.id)
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
  async DELETE(_req: Request, ctx: HandlerContext): Promise<Response> {
    const $api = await api();
    const deletedJoke = await $api.delete(ctx.params.id);
    return new Response(JSON.stringify(deletedJoke));
  }
}
