import Surreal from "surrealdb/mod.ts";
import { Static, Type } from "@sinclair/typebox";
import db from '~/models/db.ts';

// Jokes courtesy of https://punsandoneliners.com/randomness/programmer-jokes/
// import jokes from './jokes.json' assert { type: "json" };

export const Joke = Type.Strict(Type.Object({
  joke: Type.String(),
}, { additionalProperties: false }));

export type JokeType = Static<typeof Joke>

async function _seed(db: Surreal, tableName: string, objects: Record<string,unknown>[]) {
  for (const object of objects) {
    console.log(tableName, object)
    await db.create(tableName, object);
  }
}

export const api = async () => {
  const _db = await db();
  return {
    db: _db,
    find(id: string) {
      return _db?.select(`jokes:${id}`);
    },
    delete(id: string) {
      return _db?.delete(`jokes:${id}`);
    },
    randomJoke() {
      return _db?.query("SELECT joke FROM jokes ORDER BY rand() LIMIT 1");
    }
  };
};
