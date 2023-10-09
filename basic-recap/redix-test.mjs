import { connection } from "../bullmq/connection.mjs";



await connection.set('name', 'asad')

console.log(await connection.get('name'));

