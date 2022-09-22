import { HandlerContext } from "$fresh/server.ts";
import _db from '../../models/joke.ts';

export const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
  const db = await _db();
  const jokes = await db?.select('jokes');
  const randomIndex = Math.floor(Math.random() * jokes.length);
  const joke = jokes[randomIndex];
  return new Response(joke.joke);
};
