import processior from "./job.mjs";


new Worker('ticketCounter', (job) => {
    console.log(job.data.destination);
}, { connection })
