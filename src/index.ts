require('dotenv').config();
import bodyParser from 'body-parser';
import express, { Application } from 'express'
import './config/database'
const cors = require('cors');
let cookieParser = require('cookie-parser');
let morgan = require('morgan');
import * as fs from "fs";
import * as path from "path"; 
import Routes from './core/routes';

const app: Application = express()


// parse application/json
app.use(bodyParser.json())

app.use(cookieParser({
  maxAge: 60 * 60 * 24 * 7 // 1 week
}));

app.use(cors());


app.use(morgan('combined', {
  stream: fs.createWriteStream(path.join(__dirname, '../logs/access.log'), { flags: 'a' }) 
}))

Routes(app, path.join(__dirname, "api"));

app.listen(3002, () => {
  console.log('The application is listening on port 3002!')
})