import { RouteRegistrar } from "../api";
import gamesPlayedController from './gamesPlayedController';
import express from 'express';
import log from '../util/log';

const gamesPlayedRoutes: RouteRegistrar = (app: express.Application, db) => {
  const controller = gamesPlayedController(db);

  app.get('/t', async (req: any, res) => {
    try {
      const response = await controller.getAllTeamNames();
      res.json(response);
    } catch (err) {
      log.error(err.message || err);
      res.statusCode = 404;
      res.json({ error: err.message || err });
    }
  })

  app.get('/g', async (req: any, res) => {
    try {
      const response = await controller.getAllGames();
      res.json(response);
    } catch (err) {
      log.error(err.message || err);
      res.statusCode = 404;
      res.json({ error: err.message || err });
    }
  })
  
  app.post('/g', async (req: any, res) => {
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


  //app.get('/gp/:time/:location/:team1Name/:team2Name', async (req: any, res) => {
    app.get('/gp/:team1Name/:team2Name', async(req: any, res) => {
    try {
      // const response = await controller.getGamesPlayed(req.params.time, req.params.location, req.params.team1Name, req.params.team2Name);
      const response = await controller.getGamesPlayed(req.params.team1Name, req.params.team2Name);
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

export default gamesPlayedRoutes;