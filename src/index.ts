import * as dotenv from 'dotenv';
dotenv.config();

import log from './util/log';
import getenv from './util/getenv';
import express from 'express';

const port = getenv('PORT', true);
const app = express();

app.use(function (req, res, next) {
  log.info(`${req.method} ${req.path}`);
  next()
})

app.get('/', (req, res, next) => {
  res.write('Hello World');
  next();
});

app.use(function (req, res, next) {
  log.info(`${req.method} ${req.path} [${res.statusCode}]`);
  res.end();
  next()
})

app.listen(port, () => {
  log.info(`Server started on port ${port}`);
});