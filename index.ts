'use strict'
import * as dotenv from "dotenv";
import { getDbClient } from './getDbClient';
import app from './src/app';

dotenv.config();

const startServer = async function () {
const APP_PORT: number = parseInt(process.env.PORT as string, 10);
const APP_HOST = process.env.HOST as string;

const client = await getDbClient()


app.get('/status', (req, res) => {
  res.json({ info: 'App is running!' })
})

app.listen(APP_PORT, APP_HOST, () => {
  console.log(`Running on http://${APP_HOST}:${APP_PORT}`) // eslint-disable-line no-console
  console.log(`Connected to database "${client.database}"`) // eslint-disable-line no-console
})
}

startServer();
