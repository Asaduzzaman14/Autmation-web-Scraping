import { Queue } from 'bullmq'

const counterQueue = new Queue('ticketCounter', { connection })

await counterQueue.add('feni', { destination: 'feni' })
await counterQueue.add('hanif', { destination: 'dhala' })

