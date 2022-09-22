import { Handlers } from "https://deno.land/x/fresh@1.1.1/server.ts";
import Counter from "../islands/Counter.tsx";

interface Data {
  count: number;
}

export const handler: Handlers<Data, { count: number}> = {
  GET (_req, ctx) {
    const count = ctx.state.count || 0;
    return ctx.render({ count });
  }
}

export default function Home(props: unknown) {
  console.log('props', props)
  return (
    <div class="p-4 mx-auto max-w-screen-md">
      <img
        src="/logo.svg"
        class="w-32 h-32"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <Counter start={0} />
    </div>
  );
}
