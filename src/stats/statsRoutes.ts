import { RouteRegistrar } from "../api";
import statsController from './statsController';
import express from 'express';
import log from '../util/log';

const statsRoutes: RouteRegistrar = (app: express.Application, db) => {
  const controller = statsController(db);
  
  app.post('/stats/join', async (req: any, res) => {
    try {
      if (!req.body || !req.body.field || ! req.body.condition) {
        throw new Error('Invalid join request');
      }

      const query = {
        field: req.body.field,
        condition: req.body.condition,
      }

      const response = await controller.runJoinQuery(query);
      res.json(response);
    } catch(err) {
      log.error(err.message || err);
      res.statusCode = 404;
      res.json({error: err.message || err});
    }
  })
}

export default statsRoutes;