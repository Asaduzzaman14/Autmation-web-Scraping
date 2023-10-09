import PQueue from 'p-queue';
import { setTimeout } from 'timers/promises'
import getLinks from "./algolia.mjs";
import HMComments from './hackernews.mjs';
import { getSentiment } from './hackernews.mjs';
import { Redis } from 'ioredis';
import 'dotenv/config'


const db = Redis.createClient({
    url: process.env.REDIX_KEY
});

const links = await getLinks()
const LinkQueue = new PQueue({ concurrency: 2 });

// console.log("links", links);

for (let link of links) {

    LinkQueue.add(async () => {
        if (await db.get(link)) return
        console.log(link);
        console.log(link);
        await setTimeout(2000)
        const comments = await HMComments(link)
        const sentiment = await getSentiment(comments.join(' '))
        await db.set(link, sentiment.score)
    })
}