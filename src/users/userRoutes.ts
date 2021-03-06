import { RouteRegistrar } from "../api";
import userController from './userController';
import express, { response } from 'express';
import log from '../util/log';

const userRoutes: RouteRegistrar = (app: express.Application, db) => {
  const controller = userController(db);
  
  app.get('/user/:id', async (req: any, res) => {
    try {
      const response = await controller.getUser(req.params.id);
      res.json(response);
    } catch(err) {
      log.error(err.message || err);
      res.statusCode = 404;
      res.json({error: err.message || err});
    }
  });

  app.get('/user', async (req: any, res) => {
    try {
      const response = await controller.getUsers();
      res.json(response);
    } catch(err) {
      log.error(err.message || err);
      res.statusCode = 404;
      res.json({error: err.message || err});
    }
  });

  app.get('/user/:id/name', async (req: any, res) => {
    try {
      const response = await controller.getUserName(req.params.id);
      res.json(response);
    } catch(err) {
      log.error(err.message || err);
      res.statusCode = 404;
      res.json({error: err.message || err});
    }
  });

  app.get('/usercount', async (req: any, res) => {
    try {
      const response = await controller.countUsers();
      res.json(response);
    } catch(err) {
      log.error(err.message || err);
      res.statusCode = 500;
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
      res.statusCode = 500;
      res.json({error: err.message || err});
    }
  })
}

export default userRoutes;