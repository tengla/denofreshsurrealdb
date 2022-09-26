import { HandlerContext } from "$fresh/server.ts";
import {Static,Type} from "@sinclair/typebox"
import Ajv from "ajv"
import getDb from '../../models/joke.ts';

export const Joke = Type.Strict(Type.Object({
  joke: Type.String(),
}, { additionalProperties: false }));

export type JokeType = Static<typeof Joke>

const ajv = new Ajv({ allErrors: true })

export const handler = {
  async POST(req: Request, _ctx: HandlerContext) {
    const isJson = req.headers.get('Content-Type') === 'application/json';
    if (!isJson) {
      return new Response('Content-Type must be application/json', {
        status: 400,
      })
    }
    const joke: JokeType = await req.json()
    const validate = ajv.compile(Joke)
    const valid = validate(joke);
    if (!valid) {
      return new Response(JSON.stringify(validate.errors), {
        status: 400,
      })
    }
    const db = await getDb();
    const createdJoke = await db?.create("jokes", joke);
    return new Response(JSON.stringify(createdJoke), {
      status: 201,
      headers: {
        'content-type': 'application/json'
      }
    })
  },
  async GET(_req: Request, _ctx: HandlerContext): Promise<Response>  {
    const db = await getDb();
    const jokes = await db?.select('jokes');
    return new Response(JSON.stringify(jokes))
  }
}
