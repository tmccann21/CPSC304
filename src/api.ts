import getenv from './util/getenv';
import pgPromise from "pg-promise";
import log from './util/log';
import express from 'express';

import userRoutes from './users/userRoutes';
import playerRoutes from './users/subUserRoutes'; 
import {coachRoutes} from './users/subUserRoutes';
import {managerRoutes} from './users/subUserRoutes'; 
import gamesPlayedRoutes from './games/gamesPlayedRoutes';
import positionRoutes from './user_info/pInfoRoute';
import {pStatRoutes} from './user_info/pInfoRoute';
import statsRoutes from './stats/statsRoutes';

export type RouteRegistrar = (app, db) => void;

const api = (app: express.Application) => {
  const dbConfig = {
    database: getenv('PGDATABASE', true),
    host: getenv('PGHOST', true),
    port: parseInt(getenv('PGPORT', true)),
    user: getenv('PGUSER', true),
  };
  
  const db = pgPromise()(dbConfig);
  const port = getenv('PORT', true);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');

  app.use(express.static('public'));
  app.use(express.json());
  app.use(function (req, res, next) {
    log.info(`${req.method} ${req.path}`);
    next()
  });

  app.get('/', function(req, res) {
    res.render('index.ejs');
  });

  app.get('/manage', function(req, res) {
    res.render('manageUsers.ejs');
  });

  app.get('/gamesplayed', function (req, res) {
    res.render('gamesplayed.ejs');
  })

  app.get('/positioninfo', function(req, res) {
    res.render('positionInfo.ejs');
  })

  userRoutes(app, db);
  playerRoutes(app, db);
  coachRoutes(app, db); 
  managerRoutes(app, db); 
  gamesPlayedRoutes(app, db);
  positionRoutes(app, db); 
  pStatRoutes(app, db); 
  statsRoutes(app, db); 

  
  app.use(function (req, res, next) {
    log.info(`${req.method} ${req.path} [${res.statusCode}]`);
    res.end();
    next()
  });

  app.listen(port, () => {
    log.info(`Server started on port ${port}`);
  });
}

export default api;