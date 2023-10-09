import PQueue from 'p-queue';
import { setTimeout } from 'timers/promises'

const queue = new PQueue({ concurrency: 2 });



async function work() {
    await setTimeout(1000)
    console.log(Date.now());
}

for (let i = 0; i < 100; i++) {
    queue.add(async () => {
        await work()
    })
}