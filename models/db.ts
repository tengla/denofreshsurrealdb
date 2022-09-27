import Surreal from "surrealdb/mod.ts";

const db = new Surreal('http://127.0.0.1:8001/rpc', 'purposely blank');

let initialized = false;

async function conn(user: string, password: string): Promise<Surreal|null> {
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
    return db
  } catch (error) {
    console.log(error);
    return null
  }
}

export default function () {
  return conn('develop', 'develop')
}
