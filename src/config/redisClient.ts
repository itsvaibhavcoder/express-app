import { createClient } from "redis";
const redisClient = createClient({
    url: "redis://localhost:6379"
});

redisClient.on('error', (err)=>{
    console.error('Redis client Error', err);
});

redisClient.connect();

export default redisClient;