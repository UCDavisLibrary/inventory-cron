import express from 'express';
import peaks from './peaks.js'
import lansweeper from './lansweeper.js'
import ucdIam from './ucd-iam.js'


const router = express.Router();

// // middleware
// auth(router);
ucdIam(router);
peaks(router);
lansweeper(router);

export default (app) => {
    app.use('/api', router);
}
  