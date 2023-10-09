import express from 'express'

import path from 'path'
import genatatePDF from './genarate-pdf.mjs'

const app = express()

const port = 3000

app.get('/', async (req, res) => {
    await genatatePDF()
    res.attachment(('invoice.pdf'))
    res.sendFile(path.resolve('data/invoice.pdf'))
})

app.listen(port, () => {
    console.log('invoice printer is runing 3000');
})