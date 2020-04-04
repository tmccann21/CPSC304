import { RouteRegistrar } from "../api";
import gameController from './gamesPlayedController'
import gamesPlayedController from './gamesPlayedController';
import express from 'express';
import log from '../util/log';

const gamesRoutes: RouteRegistrar = (app: express.Application, db) => {
  const controller = gameController(db);

  app.get('/games', async (req: any, res) => {
    try {
      const response = await controller.getAllGames();
      res.json(response);
    } catch (err) {
      log.error(err.message || err);
      res.statusCode = 404;
      res.json({ error: err.message || err });
    }
  })
  
  app.post('/games', async (req: any, res) => {
    try {
      if (!req.body || !req.body.time || !req.body.location || !req.body.team1Name || !req.body.team2Name || !req.body.team1Score || !req.body.team2Score) {
        throw new Error('Invalid create game request');
      }
      const g = {
        time: req.body.time,
        location: req.body.location,
        team1Name: req.body.team1Name,
        team2Name: req.body.team2Name,
        team1Score: req.body.team1Score,
        team2Score: req.body.team2Score,
      }

      const response = await controller.createGame(g);
      res.json(response);
    } catch (err) {
      log.error(err.message || err);
      res.statusCode = 500;
      res.json({ error: err.message || err });
    }
  })
}

const gamesPlayedRoutes: RouteRegistrar = (app: express.Application, db) => {
  const controller = gamesPlayedController(db);

  app.get('/gp/:id', async (req: any, res) => {
    try {
      const response = await controller.getGamePlayed(req.params.time, req.params.location, req.params.team1Name, req.params.team2Name);
      res.json(response);
    } catch (err) {
      log.error(err.message || err);
      res.statusCode = 404;
      res.json({ error: err.message || err });
    }
  });

  app.get('/gp', async (req: any, res) => {
    try {
      const response = await controller.getAllGamesPlayed();
      res.json(response);
    } catch (err) {
      log.error(err.message || err);
      res.statusCode = 404;
      res.json({ error: err.message || err });
    }
  });

  app.post('/gp', async (req: any, res) => {
    try {
      if (!req.body || !req.body.time || !req.body.location || !req.body.team1Name || !req.body.team2Name || !req.body.team1Score || !req.body.team2Score) {
        throw new Error('Invalid create game request');
      }

      const gp = {
        time: req.body.time,
        location: req.body.location,
        team1Name: req.body.team1Name,
        team2Name: req.body.team2Name,
        team1Score: req.body.team1Score,
        team2Score: req.body.team2Score,
      }

      const response = await controller.createGamePlayed(gp);
      res.json(response);
    } catch (err) {
      log.error(err.message || err);
      res.statusCode = 500;
      res.json({ error: err.message || err });
    }
  })
}

export {gamesRoutes};
export default gamesPlayedRoutes;