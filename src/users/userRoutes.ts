import { RouteRegistrar } from "../api";
import userController from './userController';
import express, { response } from 'express';
import pg from 'pg'
import pgPromise from "pg-promise";
import log from '../util/log';

const userRoutes: RouteRegistrar = (app: express.Application, db) => {
  const controller = userController(db);
  
  app.get('/user/:id', async (req: any, res) => {
    try {
      const response = await controller.getUser(req.params.id);
      res.json(response);
    } catch(err) {
      log.error(err.message || err);
      response.statusCode = 404;
      res.json({error: err.message || err});
    }
  });

  app.post('/user', async (req: any, res) => {
    try {
      if (!req.body || !req.body.name || ! req.body.email || !req.body.phone || !req.body.password) {
        throw new Error('Invalid create user request');
      }

      const user = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      }

      const response = await controller.createUser(user, req.body.password);
      res.json(response);
    } catch(err) {
      log.error(err.message || err);
      response.statusCode = 404;
      res.json({error: err.message || err});
    }
  })
}

export default userRoutes;