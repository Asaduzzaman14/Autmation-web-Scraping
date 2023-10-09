import fs from 'fs/promises'
import path from 'path';
import { fileURLToPath } from 'url';

export default async function generateInvoice() {

    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)

    const invoiceHtml = await fs.readFile(path.join(__dirname, 'invoice.html'), 'utf8');
    return invoiceHtml
    console.log(invoiceHtml);
}