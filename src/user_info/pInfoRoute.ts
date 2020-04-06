import { RouteRegistrar } from "../api";
import positionController, {pStatController} from "./pInfoController";
import express, { response } from 'express';
import log from '../util/log';

const positionRoutes: RouteRegistrar = (app: express.Application, db) => {
    const controller = positionController(db);
    
    app.get('/position/player/:id', async (req: any, res) => {
      try {
        const response = await controller.getPlayerPosition(req.params.id);
        res.json(response);
      } catch(err) {
        log.error(err.message || err);
        res.statusCode = 404;
        res.json({error: err.message || err});
      }
    });

    app.get('/position/:name', async (req: any, res) => {
        try {
          const response = await controller.getPosition(req.params.name);
          res.json(response);
        } catch(err) {
          log.error(err.message || err);
          res.statusCode = 404;
          res.json({error: err.message || err});
        }
    });
  
    app.get('/position', async (req: any, res) => {
      try {
        const response = await controller.getPositions();
        res.json(response);
      } catch(err) {
        log.error(err.message || err);
        res.statusCode = 404;
        res.json({error: err.message || err});
      }
    });
  
    app.post('/position', async (req: any, res) => {
      try {
        if (!req.body || !req.body.playerId || ! req.body.positionName) {
          throw new Error('Invalid add player position request');
        }
  
        const position = {
          playerId: req.body.playerId, 
          positionName: req.body.positionName,
        }
  
        const response = await controller.addPosition(position);
        res.json(response);
      } catch(err) {
        log.error(err.message || err);
        res.statusCode = 500;
        res.json({error: err.message || err});
      }
    });
}

const pStatRoutes: RouteRegistrar = (app: express.Application, db) => {
    const controller = pStatController(db);

    app.get('/stats/player/:id', async (req: any, res) => {
      try {
        const response = await controller.getPlayerStats(req.params.id); 
        res.json(response);
      } catch(err) {
        log.error(err.message || err);
        res.statusCode = 404;
        res.json({error: err.message || err});
      }
    });

    app.get('/stats/player', async (req: any, res) => {
        try {
          const response = await controller.getStats(); 
          res.json(response);
        } catch(err) {
          log.error(err.message || err);
          res.statusCode = 404;
          res.json({error: err.message || err});
        }
      });

    app.get('/stats/avg', async (req: any, res) => {
        try {
          const response = await controller.getAvgStats(); 
          res.json(response);
        } catch(err) {
          log.error(err.message || err);
          res.statusCode = 404;
          res.json({error: err.message || err});
        }
      });

    app.get('/stats/total', async (req: any, res) => {
        try {
          const response = await controller.getTotalStats(); 
          res.json(response);
        } catch(err) {
          log.error(err.message || err);
          res.statusCode = 404;
          res.json({error: err.message || err});
        }
      });


    app.get('/stats/player/:id/avg', async (req: any, res) => {
      try {
        const response = await controller.getPlayerAvgStats(req.params.id); 
        res.json(response);
      } catch(err) {
        log.error(err.message || err);
        res.statusCode = 404;
        res.json({error: err.message || err});
      }
    });

    app.get('/stats/player/:id/total', async (req: any, res) => {
        try {
          const response = await controller.getPlayerTotalStats(req.params.id); 
          res.json(response);
        } catch(err) {
          log.error(err.message || err);
          res.statusCode = 404;
          res.json({error: err.message || err});
        }
    });

    app.get('/stats/goals/:count', async (req: any, res) => {
        try {
          const response = await controller.getTopGoals(req.params.count); 
          res.json(response);
        } catch(err) {
          log.error(err.message || err);
          res.statusCode = 404;
          res.json({error: err.message || err});
        }
    });

    app.get('/stats/assists/:count', async (req: any, res) => {
        try {
          const response = await controller.getTopAssists(req.params.count); 
          res.json(response);
        } catch(err) {
          log.error(err.message || err);
          res.statusCode = 404;
          res.json({error: err.message || err});
        }
    });

    app.get('/stats/saves/:count', async (req: any, res) => {
        try {
          const response = await controller.getTopSaves(req.params.count); 
          res.json(response);
        } catch(err) {
          log.error(err.message || err);
          res.statusCode = 404;
          res.json({error: err.message || err});
        }
    });

    app.get('/stats/pm/:count', async (req: any, res) => {
        try {
          const response = await controller.getTopPlusMinus(req.params.count); 
          res.json(response);
        } catch(err) {
          log.error(err.message || err);
          res.statusCode = 404;
          res.json({error: err.message || err});
        }
    });

    app.post('/stats/player', async (req: any, res) => {
        try {
          if (!req.body || !req.body.playerId || !req.body.year || !req.body.goals || !req.body.assists || !req.body.saves || !req.body.plusminus) {
            throw new Error('Invalid add player position request');
          }
    
          const stats = {
            playerId: req.body.playerId, 
            goals: req.body.goals, 
            assists: req.body.assists, 
            saves: req.body.saves, 
            plusminus: req.body.plusminus, 
          }
    
          const response = await controller.addStat(stats, req.body.year);
          res.json(response);
        } catch(err) {
          log.error(err.message || err);
          res.statusCode = 500;
          res.json({error: err.message || err});
        }
    });

    
}

export default positionRoutes; 
export {pStatRoutes};
