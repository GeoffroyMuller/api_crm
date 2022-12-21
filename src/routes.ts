import { Application } from "express";
import * as fs from "fs";
import * as path from "path"; 

export default function Routes(app: Application) {
    fs.readdir(path.join(__dirname, "api"), (err, foldersNames) => {
        if (!err) {
            foldersNames.forEach(folder => {
                if (fs.existsSync(path.join(__dirname, `./api/${folder}/index.ts`))) {
                    app.use(`/${folder}`, require(`./api/${folder}`)?.default);
                }
            })
        }
    })
} 