import { Handlers, PageProps } from "$fresh/server.ts";
import { apply, tw } from "https://esm.sh/v95/twind@0.16.17/twind";
import { css } from "https://esm.sh/v95/twind@0.16.17/css";
import { JSX } from "preact";

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

const Container = ({ children }: { children: JSX.Element[]}) => {
  const style = apply`container mx-auto font-sans text-white h-screen ${css({
    'background-color': '#243c5a'
  })} hover:${css({
    'background-color': '#243c5ad9'
  })}`;
  return (
    <div className={tw`${style}`}>
      {children}
    </div>
  )
}

export default function Greet(props: PageProps) {

  return (
    <Container>
      <h1 className={tw`text-xl font-bold`}>Hello {props.params.name}, jokes on me 😊</h1>
      <p>{props.data.joke}</p>
    </Container>
  )
}
