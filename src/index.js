import express from 'express';
import inventoryCron from "./cron/cron.js"
import cookieParser from 'cookie-parser'

const app = express();

app.use(express.json());
app.use(cookieParser());

inventoryCron.startCron();


app.listen(3000, () => {
  console.log('server ready on port 3000');
});

