import { HandlerContext } from "$fresh/server.ts";
import {api} from '~/models/joke.ts';
import type { JokeType } from "~/models/joke.ts";

export const handler = {
  async GET(_req: Request, _ctx: HandlerContext): Promise<Response>  {
    const $api = await api();
    const res = await $api.randomJoke();
    if (res) {
      const jokes = res[0].result as JokeType[];
      const joke = jokes[0];
      return new Response(JSON.stringify(joke))
    }
    return new Response("No joke found", {
      status: 404,
    })
  }
}
