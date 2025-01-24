import { createClient } from "redis";

const client = createClient({
  username: "default",
  password: "HjZzc7ZmiDLwtGkDwTF6iQj1bzB97IaC",
  socket: {
    host: "redis-19615.c305.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 19615,
  },
});

client.on("error", (err) => console.log("Redis Client Error", err));

if (!client.isOpen) {
  await client.connect();
}

export { client };
