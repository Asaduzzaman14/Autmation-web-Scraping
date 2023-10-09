import { anonymizeProxy, closeAnonymizedProxy } from "proxy-chain";

import 'dotenv/config';
import puppeteer from "puppeteer";

const getHTML = async (url, proxiProvider, oldProxieUrl) => {

  const proxiUrl = await anonymizeProxy(oldProxieUrl);
  console.log(proxiUrl);

  const browser = await puppeteer.launch({
    // headless: false,
    args: [`--prosy-server=${proxiUrl}`],
    // ignoreDefaultArgs: true

  });
  const page = await browser.newPage();

  await page.goto(url);

  const content = await page.content();

  await page.close();

  await closeAnonymizedProxy(proxiUrl);
  console.log(proxiUrl, proxiProvider, content);
  await browser.close();

  return content;
};

await getHTML('https://httpbin.org/ip', 'webshare', process.env.PROXI_URL).then(console.log);
await getHTML('https://httpbin.org/ip', 'proxiscrape', process.env.PROXI_URL_2).then(console.log);
