import puppeteer from "puppeteer";
import 'dotenv/config';

const browser = await puppeteer.connect({
  browserURL: process.env.BROWSER_URL
});
const page = await browser.newPage();

await page.goto('https://example.com');

