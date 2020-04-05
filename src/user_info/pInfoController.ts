import pgPromise from "pg-promise";
import { AsyncResource } from "async_hooks";

export interface IPStatInfo {
    playerId: number; 
    goals: number; 
    assists: number; 
    saves: number; 
    plusminus: number; 
}

export interface IPStatResponse extends IPStatInfo {
    year: number; 
}

export interface IPositionInfo {
    playerId: number; 
    positionName: string; 
}

export interface IPStatController {
    getPlayerStats: (playerId: string) => Promise<IPStatResponse[]>;
    getStats: () => Promise<IPStatResponse[]>;
    getPlayerAvgStats: (playerId: string) => Promise<IPStatInfo[]>; 
    getPlayerTotalStats: (playerId: string) => Promise<IPStatInfo[]>; 
    getTopGoals: (count: string) => Promise<IPStatResponse[]>;
    getTopAssists: (count: string) => Promise<IPStatResponse[]>;  
    getTopSaves: (count: string) => Promise<IPStatResponse[]>;
    getTopPlusMinus: (count: string) => Promise<IPStatResponse[]>; 
    addStat: (info: IPStatInfo, year: string) => Promise<IPStatResponse>; 
}

export interface IPositionController {
    getPosition: (positionName: string) => Promise<IPositionInfo[]>;
    getPositions: () => Promise<IPositionInfo[]>; 
    getPlayerPosition: (playerId: string) => Promise<IPositionInfo[]>; 
    addPosition: (info: IPositionInfo) => Promise<IPositionInfo>;
}

const getPositionQuery = `
SELECT (P.playerId, U.name, P.positionName) 
FROM playsPosition P, Users U
WHERE P.positionName = $[positionName]
AND P.playerId = U.userId;
`

const getPositionsQuery = `
SELECT (P.playerId, U.name, P.positionName)
FROM playsPosition P, Users U
WHERE P.playerId = U.userId
`

const getPlayerPositionQuery = `
SELECT (positionName)
FROM playsPosition
WHERE playerId = $[playerId];
`

const addPositionQuery = `
INSERT INTO playsPosition (playerId, positionName)
VALUES ($[playerId], $[positionName])
RETURNING (playerId, positionName);
`

const getPlayerStatsQuery = `
SELECT (playerId, year, goals, assists, saves, plusminus)
FROM playerStats
WHERE playerId = $[playerId]; 
`

const getStatsQuery = `
SELECT (playerId, year, goals, assists, saves, plusminus)
FROM playerStats;
`

const getPlayerAvgStatsQuery = `
SELECT (playerId, ROUND(AVG(goals)::numeric,3), ROUND(AVG(assists)::numeric,3), ROUND(AVG(saves)::numeric,3), ROUND(AVG(plusminus)::numeric,3))
FROM playerStats 
WHERE playerId = $[playerId]
GROUP BY playerId;
`

const getPlayerTotalStatsQuery = `
SELECT (playerId, SUM(goals), SUM(assists), SUM (saves), SUM(plusminus))
FROM playerStats
WHERE playerId = $[playerId]
GROUP BY playerId;
`

const getTopGoalsQuery = `
SELECT (playerId, year, goals, assists, saves, plusminus)
FROM playerStats
ORDER BY goals DESC
LIMIT $[count];
`

const getTopAssistsQuery = `
SELECT (playerId, year, goals, assists, saves, plusminus)
FROM playerStats
ORDER BY assists DESC
LIMIT $[count];
`

const getTopSavesQuery = `
SELECT (playerId, year, goals, assists, saves, plusminus)
FROM playerStats
ORDER BY saves DESC
LIMIT $[count];
`

const getTopPlusMinusQuery = `
SELECT (playerId, year, goals, assists, saves, plusminus)
FROM playerStats
ORDER BY plusminus DESC
LIMIT $[count];
`

const addStatQuery = `
INSERT INTO playerStats (playerId, year, goals, assists, saves, plusminus)
VALUES ($[playerId], $[year], $[goals], $[assists], $[saves], $[plusminus])
RETURNING (playerId, year, goals, assists, saves, plusminus);
`

const positionController: ((db: pgPromise.IDatabase<{}>) => IPositionController) = (db) => ({
    getPosition: async (positionName: string) => {
      return db.manyOrNone(getPositionQuery, { positionName });
    },
    getPositions: async () => {
      return db.manyOrNone(getPositionsQuery);
    },
    getPlayerPosition: async (playerId: string) => {
      return db.manyOrNone(getPlayerPositionQuery, { playerId });
    },
    addPosition: async (info: IPositionInfo) => {
      return db.one(addPositionQuery, {...info} );
    },
})

const pStatController: ((db: pgPromise.IDatabase<{}>) => IPStatController) = (db) => ({
  getPlayerStats: async (playerId: string) => {
    return db.manyOrNone(getPlayerStatsQuery, { playerId });
  },
  getStats: async () => {
    return db.manyOrNone(getStatsQuery);
  },
  getPlayerAvgStats: async (playerId: string) => {
    return db.one(getPlayerAvgStatsQuery, { playerId });
  },
  getPlayerTotalStats: async (playerId: string) => {
    return db.one(getPlayerTotalStatsQuery, { playerId });
  }, 
  getTopGoals: async (count: string) => {
    return db.manyOrNone(getTopGoalsQuery, { count });
  },
  getTopAssists: async (count: string) => {
    return db.manyOrNone(getTopAssistsQuery, { count });
  },
  getTopSaves: async (count: string) => {
    return db.manyOrNone(getTopSavesQuery, { count });
  }, 
  getTopPlusMinus: async (count: string) => {
    return db.manyOrNone(getTopPlusMinusQuery, { count });
  },
  addStat: async (info: IPStatInfo, year: string) => {
    return db.one(addStatQuery, {...info, year })
  },
})

export default positionController; 
export {pStatController};