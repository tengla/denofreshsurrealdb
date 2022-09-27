import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "twind";
import { Container } from "~/components/Container.tsx";
import Jokes from "~/islands/Jokes.tsx";

const scheme = "http";
const hostname = Deno.env.get("HOSTNAME") || "localhost";
const port = 8000;
const getHost = (port: number) => `${scheme}://${hostname}:${port}`;

interface Data {
  joke: string
}

export const handler: Handlers<Data> = {
  async GET (_,ctx) {
    const resp = await fetch(`${getHost(port)}/api/joke`);
    const joke = await resp.text();
    return ctx.render({ joke })
  }
}

export default function Greet(props: PageProps) {

  return (
    <Container>
      <h1 className={tw`text-xl font-bold`}>Hello {props.params.name}, jokes on me 😊</h1>
      <Jokes initialJoke={props.data.joke}/>
    </Container>
  )
}
