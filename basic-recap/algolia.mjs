import puppeteer from "puppeteer";


export default async function getLinks() {
    let browser = await puppeteer.launch({ headless: false, });

    const page = await browser.newPage();

    page.goto('https://hn.algolia.com/')

    await page.waitForSelector('.SearchInput')

    await page.type('.SearchInput', 'show hu', { delay: 300 })

    await page.screenshot({ path: 'search.png' })

    const links = await page.evaluate(() => {
        return [...document.querySelectorAll('.Story_title a:first-child')].map(e => e.href)
    })
    await browser.close()
    return links
}
