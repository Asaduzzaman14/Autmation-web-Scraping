
import puppeteer from "puppeteer";
import { Page } from "puppeteer";
import { setTimeout } from "timers/promises";

import { Low } from 'lowdb'
import { JSONFile } from "lowdb/node"
const db = new Low(new JSONFile("ecommerce.json"), {})
await db.write()

const saveToDB = async (id, productData) => {
    db.data[id] = productData
    await db.write()
}

let browser = await puppeteer.launch({ headless: false, userDataDir: '/tmp/ecommerce-crawler' });
const page = await browser.newPage();
await page.goto("https://www.studioneat.com", { waitUntil: "networkidle2", timeout: 100000 });
await page.waitForSelector('.product-title a');

const productLinks = await page.evaluate(() => {
    return [...document.querySelectorAll('.product-title a')].map(e => e.href);
});

console.log(productLinks);

await page.close()

// await browser.close()


/**
 * @param {page} page
 * @param {String} selector
 *
 */

const extractText = (page, selector) => {
    return page.evaluate((selector) => {
        return document.querySelector(selector)?.innerHTML;
    }, selector);
};


for (let productLink of productLinks) {
    if (db.data[productLink]) {
        console.log('exist');
        continue;
    }
    const page = await browser.newPage()
    await page.goto(productLink, { waitUntil: 'networkidle2', timeout: 100000 })
    await page.waitForSelector('.ecomm-container h1')

    const title = await extractText(page, '.ecomm-container h1')
    const price = await extractText(page, '#productPrice')
    const desc = await extractText(page, '.product-desc')


    console.log({ title, price, desc });

    const variants = await page.evaluate(() => {
        return [...document.querySelectorAll(".single-option-selector option")].map((e) => e.value)

    })
    const variantsData = []
    for (let variant of variants) {
        await page.select(".single-option-selector", variant)
        await setTimeout(100)
        variantsData.push(await extractText(page, '#productPrice'))
    }

    await saveToDB(productLink, { title, price, desc, variantsData })

    page.close()
}