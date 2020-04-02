import { RouteRegistrar } from "../api";
import playerController from './playerController';
import express, { response } from 'express';
import log from '../util/log';

const playerRoutes: RouteRegistrar = (app: express.Application, db) => {
  const controller = playerController(db);
  
  app.get('/player/:id', async (req: any, res) => {
    try {
      const response = await controller.getPlayer(req.params.id);
      res.json(response);
    } catch(err) {
      log.error(err.message || err);
      response.statusCode = 404;
      res.json({error: err.message || err});
    }
  });

  app.get('/player', async (req: any, res) => {
    try {
      const response = await controller.getPlayers();
      res.json(response);
    } catch(err) {
      log.error(err.message || err);
      response.statusCode = 404;
      res.json({error: err.message || err});
    }
  });

  app.post('/player', async (req: any, res) => {
    try {
      if (!req.body || !req.body.playerId || ! req.body.age || !req.body.height || !req.body.jerseyNumber) {
        throw new Error('Invalid add player request');
      }

      const player = {
        age: req.body.age, 
        height: req.body.height,
        jerseyNumber: req.body.jerseyNumber,
      }

      const response = await controller.addPlayer(player, req.body.playerId);
      res.json(response);
    } catch(err) {
      log.error(err.message || err);
      response.statusCode = 404;
      res.json({error: err.message || err});
    }
  })
}

export default playerRoutes;