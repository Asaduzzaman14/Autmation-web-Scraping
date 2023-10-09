

import { Queue, Worker } from 'bullmq'
import { connection } from './connection.mjs'

const counterQueue = new Queue('ticketCounter', { connection })

await counterQueue.add('feni', { destination: 'feni' })
await counterQueue.add('hanif', { destination: 'dhala' })

new Worker('ticketCounter', (job) => {
    console.log(job.data.destination);
}, { connection })
