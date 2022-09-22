// routes/_middleware.ts
import { MiddlewareHandlerContext } from "$fresh/server.ts";

interface State {
  count: number;
}

let counter = 0;
export async function handler(
  _req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  counter += 1;
  ctx.state.count = counter;
  const resp = await ctx.next();
  resp.headers.set("server", "fresh server");
  return resp;
}