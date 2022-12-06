import { Stream } from "stream";

var pdf = require('html-pdf');
const fs = require('fs');
let ejs = require('ejs');
const puppeteer = require('puppeteer');
const { Readable } = require('stream');

export default class PdfService {

    static async printPDF({
        returnType,
        outputPath,
        inputPath,
        data
    }: {
        returnType: 'buffer' | 'stream',
        inputPath: string,
        data: any;
        outputPath?: string,

    }): Promise<Stream | Buffer>  {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        const html = fs.readFileSync(inputPath, 'utf8');
        const htmlReplaced: string = ejs.render(html, data);
        await page.setContent(htmlReplaced, { waitUntil: 'domcontentloaded' });

        // To reflect CSS used for screens instead of print
        await page.emulateMediaType('screen');
        const pdf = await page.pdf({ format: 'A4' });
       
        await browser.close();
        
        if (returnType === "buffer") {
            return pdf;
        }
        const stream = Readable.from(pdf);
        return stream
    };
    
    /**
     * @deprecated
     */
    static async generatePDF(
        {
            returnType,
            outputPath,
            inputPath,
            data
        }: {
            returnType: 'file' | 'buffer' | 'stream',
            inputPath: string,
            data: any;
            outputPath?: string,

        }
    ) {
        return new Promise((resolve, reject) => {
            const html = fs.readFileSync(inputPath, 'utf8');
            const htmlReplaced: string = ejs.render(html, data);

            const options = {
                "footer": {
                    "height": "12mm",
                    "contents": {
                        default: data['footer']
                            ? `<div style="text-align: center; color: rgba(0, 0, 0, 0.38);"> ${data['footer']} </div>`
                            : ''
                    }
                },
            }

            switch (returnType) {
                case 'file':
                    if (outputPath?.length) {
                        pdf.create(htmlReplaced, options).toFile(outputPath, function (err: any, res: any) {
                            if (err) return reject(err);
                            resolve(res);
                        });
                    } else {
                        reject('No outputPath specified');

                    }

                    break;
                case 'stream':
                    pdf.create(htmlReplaced, options).toStream(function (err: any, stream: unknown) {
                        if (err) reject(err)
                        else resolve(stream)
                    });
                    break;
                case 'buffer':

                    pdf.create(htmlReplaced, options).toBuffer(function (err: any, buffer: any) {
                        if (err) reject(err)
                        else resolve(buffer)
                    });
                    break;
                default:
                    reject('No return type specified');
                    break;
            }

        })

    }
}
