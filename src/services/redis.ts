import { createClient } from 'redis';

const redisClient = createClient();

redisClient.connect().catch(console.error);

redisClient.on('error', (err) => console.log('Redis error:', err));
redisClient.on('connect', () => console.log('Redis connected'));

export default redisClient;
