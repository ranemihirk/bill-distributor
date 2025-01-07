import { createClient } from "redis";

const client = createClient({
  url: process.env.REDIS_URL, // Use your Redis connection URL
});

export async function connectToRedis() {
  console.log("client: ", client);
  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();
}

export async function setAndFetchFromRedis() {
  if (client.isOpen) {
    await client.hSet("user-session:123", {
      name: "John",
      surname: "Smith",
      company: "Redis",
      age: 29,
    });

    let userSession = await client.hGetAll("user-session:123");
    console.log(JSON.stringify(userSession, null, 2));
    return userSession;
  }
}
