
import Surreal from "https://deno.land/x/surrealdb@v0.5.0/mod.ts";

const db = new Surreal('http://127.0.0.1:8001/rpc', 'purposely blank');

async function _seed(db: Surreal) {
  // Jokes courtesy of https://punsandoneliners.com/randomness/programmer-jokes/
  await db.create('jokes', {
    joke: "Why do Java developers often wear glasses? They can't C#.",
  })
  await db.create('jokes', {
    joke: "A SQL query walks into a bar, goes up to two tables and says “can I join you?”",
  })
  await db.create('jokes', {
    joke: "Wasn't hard to crack Forrest Gump's password. 1forrest1.",
  })
  await db.create('jokes',{
    joke: "I love pressing the F5 key. It's refreshing.",
  })
  await db.create('jokes', {
    joke: "Called IT support and a chap from Australia came to fix my network connection.  I asked “Do you come from a LAN down under?”",
  })
  await db.create('jokes', {
    joke: "There are 10 types of people in the world. Those who understand binary and those who don't.",
  })
  await db.create('jokes', {
    joke: "Why are assembly programmers often wet? They work below C level.",
  })
  await db.create('jokes',{
    joke: "My favourite computer based band is the Black IPs.",
  })
  await db.create('jokes',{
    joke: "What programme do you use to predict the music tastes of former US presidential candidates? An Al Gore Rhythm.",
  })
  await db.create('jokes',{
    joke: "An SEO expert walked into a bar, pub, inn, tavern, hostelry, public house.",
  })
}

let initialized = false;

async function main(user: string, password: string): Promise<Surreal|null> {
  if (initialized) {
    return db
  }
  try {
    await db.signin({
			user,
			pass: password,
		});
    await db.use('test', 'test');
    initialized = true;
    //await seed(db)

    return db
  } catch (error) {
    console.log(error);
    return null
  }
}

export const api = async () => {
  const _db = await main('develop','develop');
  return {
    randomJoke() {
      return _db?.query("SELECT joke FROM jokes ORDER BY rand() LIMIT 1");
    }
  };
};

export default function () {
  return main('develop', 'develop')
}
