import Redis from "ioredis";
import 'dotenv/config'

export const connection = new Redis(process.env.REDIX_KEY, { maxRetriesPerRequest: null });

