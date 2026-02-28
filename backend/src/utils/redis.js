import { createClient } from "redis";
import dotenv from "dotenv"
dotenv.config()

const redisClient = createClient({
  url: process.env.REDIS_URL, // example: redis://localhost:6379
});

redisClient.on("error", (err) => {
  console.log("Redis Error:", err);
});

await redisClient.connect();

export default redisClient;