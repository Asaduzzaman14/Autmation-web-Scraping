
import puppeteer from "puppeteer";
import generateInvoice from "./genarate-invoice.mjs";

let browser

export default async function genatatePDF() {

    if (!browser) browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()

    const invoiceHtml = await generateInvoice()

    await page.setContent(invoiceHtml, { waitUntil: 'networkidle0' })

    await page.evaluateHandle('document.fonts.ready')

    await page.pdf({
        path: "data/invoice.pdf",
        printBackground: true,
        format: 'legal'
    })

    await browser.close()
}

genatatePDF()
