import { RouteRegistrar } from "../api";
import teamController from './teamController';
import express, { response } from 'express';
import log from '../util/log';

const teamRoutes: RouteRegistrar = (app: express.Application, db) => {
  const controller = teamController(db);
  
  app.get('/teams', async (req: any, res) => {
    try {
      const response = await controller.getTeams();
      res.json(response);
    } catch(err) {
      log.error(err.message || err);
      res.statusCode = 404;
      res.json({error: err.message || err});
    }
  });

  app.post('/teamseason', async (req: any, res) => {
    try {
      if (!req.body || !req.body.teamName) {
        throw new Error('Invalid get team szn request');
      }

      const response = await controller.getTeamSeasons(req.body.teamName);
      res.json(response);
    } catch(err) {
      log.error(err.message || err);
      res.statusCode = 404;
      res.json({error: err.message || err});
    }
  });

  app.get('/seasons', async (req: any, res) => {
    try {
      const response = await controller.getAllSeasons();
      res.json(response);
    } catch(err) {
      log.error(err.message || err);
      res.statusCode = 404;
      res.json({error: err.message || err});
    }
  })
}

export default teamRoutes;