var pdf = require('html-pdf');
const fs = require('fs');
const options = { format: 'Letter' };
let ejs = require('ejs');

export default class PdfService {


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
            console.log({html})
            const htmlReplaced: string = ejs.render(html, data);
            

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
                    pdf.create(htmlReplaced).toStream(function (err: any, stream: unknown) {
                        if (err) reject(err)
                        else resolve(stream)
                    });
                    break;
                case 'buffer':

                    pdf.create(htmlReplaced).toBuffer(function (err: any, buffer: any) {
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
