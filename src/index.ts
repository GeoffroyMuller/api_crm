require('dotenv').config();
import bodyParser from 'body-parser';
import express, { Application } from 'express'
import './config/database'

import Routes from './routes';

const app: Application = express()


// parse application/json
app.use(bodyParser.json())

Routes(app)



app.listen(3002, () => {
    console.log('The application is listening on port 3002!')
})