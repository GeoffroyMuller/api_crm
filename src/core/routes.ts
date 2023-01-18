import express, { Application } from "express";
import * as fs from "fs";

export default function Routes(app: Application, f: string) {
    fs.readdir(f, (err, foldersNames) => {
        if (!err) {
            foldersNames.forEach(folder => {
                const api = require(f + `/${folder}`)?.default;
                app.use(`/${folder}`, api);
            })
        }
    })
} 