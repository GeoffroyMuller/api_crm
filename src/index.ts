require('dotenv').config();
import bodyParser from 'body-parser';
import express, { Application } from 'express'
import './config/database'
const cors = require('cors');
let cookieParser = require('cookie-parser');
var pdf = require('html-pdf');

import Routes from './routes';

const app: Application = express()


// parse application/json
app.use(bodyParser.json())

app.use(cookieParser({
  maxAge: 60 * 60 * 24 * 7 // 1 week
}));


app.use(cors());

Routes(app)


app.listen(3002, () => {
  console.log('The application is listening on port 3002!')
})