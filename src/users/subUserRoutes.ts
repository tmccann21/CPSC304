import { RouteRegistrar } from "../api";
import playerController, { coachController } from './subUserController';
import { managerController } from './subUserController'; 
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
      res.statusCode = 404;
      res.json({error: err.message || err});
    }
  });

  app.get('/player', async (req: any, res) => {
    try {
      const response = await controller.getPlayers();
      res.json(response);
    } catch(err) {
      log.error(err.message || err);
      res.statusCode = 404;
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
      res.statusCode = 500;
      res.json({error: err.message || err});
    }
  });

  app.put('/player', async (req: any, res) => {
    try {
      if (!req.body || !req.body.updatefield || !req.body.updateval || !req.body.searchval) {
        throw new Error('Invalid update player request');
      }

      if (req.body.updatefield == "age"){ 
        const response = await controller.updatePlayerAge(req.body.updateval, req.body.searchval); 
        res.json(response); 
      } else if (req.body.updatefield == "height"){
        const response = await controller.updatePlayerHeight(req.body.updateval, req.body.searchval); 
        res.json(response); 
      } else {
        const response  = await controller.updatePlayerJN(req.body.updateval, req.body.searchval);
        res.json(response); 
      }

    } catch(err) {
      log.error(err.message || err);
      res.statusCode = 404;
      res.json({error: err.message || err});
    }
  });

  app.delete('/player', async (req: any, res) => {
    try {
      if (!req.body || !req.body.searchfield || !req.body.searchval) {
        throw new Error('Invalid delete player request'); 
      }
      console.log(req.body)
      const response = await controller.deletePlayer(req.body.searchfield, req.body.searchval); 
      console.log(response);
      res.json(response);
    } catch(err) {
      log.error(err.message || err);
      res.statusCode = 404;
      res.json({error: err.message || err});
    }
  });
}

const coachRoutes: RouteRegistrar = (app: express.Application, db) => {
  const controller = coachController(db);
  
  app.get('/coach/:id', async (req: any, res) => {
    try {
      const response = await controller.getCoach(req.params.id);
      res.json(response);
    } catch(err) {
      log.error(err.message || err);
      res.statusCode = 404;
      res.json({error: err.message || err});
    }
  });

  app.get('/coach', async (req: any, res) => {
    try {
      const response = await controller.getCoaches();
      res.json(response);
    } catch(err) {
      log.error(err.message || err);
      res.statusCode = 404;
      res.json({error: err.message || err});
    }
  });

  app.post('/coach', async (req: any, res) => {
    try {
      if (!req.body || !req.body.coachId || ! req.body.age || !req.body.gender ) {
        throw new Error('Invalid add coach request'); 
      }

      const coach = {
        age: req.body.age, 
        gender: req.body.gender, 
      }

      const response = await controller.addCoach(coach, req.body.coachId);
      res.json(response);
    } catch(err) {
      log.error(err.message || err);
      res.statusCode = 500;
      res.json({error: err.message || err});
    }
  });

  app.put('/coach', async (req: any, res) => {
    try {
      if (!req.body || !req.body.updateval || !req.body.searchval) {
        throw new Error('Invalid update coach request');
      }
      console.log(req.body)
      const response = await controller.updateCoach(req.body.updateval, req.body.searchval); 
      console.log(response);
      res.json(response); 
    } catch(err) {
      log.error(err.message || err);
      res.statusCode = 404;
      res.json({error: err.message || err});
    }
  });

  app.delete('/coach', async (req: any, res) => {
    try {
      if (!req.body || !req.body.searchfield || !req.body.searchval) {
        throw new Error('Invalid delete coach request'); 
      }
      console.log(req.body)
      const response = await controller.deleteCoach(req.body.searchfield, req.body.searchval); 
      res.json(response); 
    } catch(err) {
      log.error(err.message || err);
      res.statusCode = 404;
      res.json({error: err.message || err});
    }
  }); 
}

const managerRoutes: RouteRegistrar = (app: express.Application, db) => {
  const controller = managerController(db);
  
  app.get('/manager/:id', async (req: any, res) => {
    try {
      const response = await controller.getManager(req.params.id);
      res.json(response);
    } catch(err) {
      log.error(err.message || err);
      res.statusCode = 404;
      res.json({error: err.message || err});
    }
  });

  app.get('/manager', async (req: any, res) => {
    try {
      const response = await controller.getManagers();
      res.json(response);
    } catch(err) {
      log.error(err.message || err);
      res.statusCode = 404;
      res.json({error: err.message || err});
    }
  });

  app.put('/manager', async (req: any, res) => {
    try {
      if (!req.body || !req.body.managerId) {
        throw new Error('Invalid add manager request');
      }

      const response = await controller.addManager(req.body.managerId);
      res.json(response);
    } catch(err) {
      log.error(err.message || err);
      res.statusCode = 500;
      res.json({error: err.message || err});
    }
  });

  app.delete('manager/', async (req: any, res) => {
    try {
      if (!req.body || !req.body.managerId) {
        throw new Error('Invalid delete manager request');
      }
      const response = await controller.deleteManager(req.body.managerId); 
      res.json(response); 
    } catch(err) {
      log.error(err.message || err);
      res.statusCode = 404;
      res.json({error: err.message || err});
    }
  });
}

export {coachRoutes}; 
export {managerRoutes};
export default playerRoutes;