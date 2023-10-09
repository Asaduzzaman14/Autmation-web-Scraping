import puppeteer from "puppeteer";
import Sentiment from "sentiment";
import { setTimeout } from 'timers/promises'

export async function getSentiment(text) {
    const sentiment = new Sentiment()
    const result = sentiment.analyze(text)
    return result

}

let browser = await puppeteer.launch({ headless: false, });

export default async function HMComments(link) {
    const page = await browser.newPage()
    await page.goto(link, { timeout: 100000 })
    await page.waitForSelector(".comment")
    const comments = await page.evaluate(() => {
        return [...document.querySelectorAll('.comment')].map(e => e.innerText)
    })
    await page.close()
    return comments
}

// const links = ['https://news.ycombinator.com/item?id=16582136',
//     'https://news.ycombinator.com/item?id=16582136']


// for (let link of links) {

//     const comments = await HMComments(link)
//     const sentiment = await getSentiment(comments.join(' '))
//     console.log(sentiment);
// }
