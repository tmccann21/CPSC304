/*
 * Contains Sub User Interfaces: 
 * - Player
 * - Coach
 * - Manager 
 */ 
import pgPromise from "pg-promise";
import { AsyncResource } from "async_hooks";

export interface IPlayerInfo {
    age: number;
    height: number;
    jerseyNumber: number;
}

export interface IPlayerResponse extends IPlayerInfo {
    playerId: number;
}

export interface IPlayerController {
    getPlayer: (playerId: string) => Promise<IPlayerResponse>;
    getPlayers: () => Promise<IPlayerResponse[]>;
    addPlayer: (info: IPlayerInfo, playerId: string) => Promise<IPlayerResponse>;
    updatePlayerAge: (updateval: string, searchval: string) => Promise<IPlayerResponse>; 
    updatePlayerHeight: (updateval: string, searchval: string) => Promise<IPlayerResponse>; 
    updatePlayerJN: (updateval: string, searchval: string) => Promise<IPlayerResponse>; 
    deletePlayer: (searchfield: string, searchval: string) => Promise<IPlayerResponse[]>;  
}

export interface ICoachInfo { 
    age: number; 
    gender: string; 
}

export interface ICoachResponse extends ICoachInfo {
    coachId: number; 
}

export interface ICoachController { 
    getCoach: (coachId: string) => Promise<ICoachResponse>; 
    getCoaches: () => Promise<ICoachResponse[]>;
    addCoach: (info: ICoachInfo, coachId: string) => Promise<ICoachResponse>; 
    updateCoach: (updateval: string, searchval: string) => Promise<ICoachResponse[]>; 
    deleteCoach: (searchfield: string, searchval: string) => Promise<ICoachResponse[]>;
}

export interface IManagerResponse {
    managerId: number;
}

export interface IManagerController {
    getManager: (managerId: string) => Promise<IManagerResponse>; 
    getManagers: () => Promise<IManagerResponse[]>
    addManager: (managerId: string) => Promise<IManagerResponse>; 
    deleteManager: (managerId: string) => Promise<IManagerResponse>; 
}

const getPlayerQuery = `
SELECT P.playerId, U.name, P.age, P.height, P.jerseyNumber
FROM player P, users U
WHERE P.playerId = $[playerId] 
AND P.playerId = U.userId;
`

const getPlayersQuery = `
SELECT P.playerId, U.name, P.age, P.height, P.jerseyNumber
FROM player P, users U
WHERE P.playerId = U.userId;
`

const addPlayerQuery = `
INSERT INTO player (playerId, age, height, jerseyNumber) 
VALUES ($[playerId], $[age], $[height], $[jerseyNumber])
RETURNING playerId, age, height, jerseyNumber;
`

const updatePlayerAgeQuery = `
UPDATE player 
SET age = $[updateval]
WHERE playerId = $[searchval]
RETURNING playerId, age, height, jerseyNumber; 
`

const updatePlayerHeightQuery = `
UPDATE player 
SET height = $[updateval]
WHERE playerId = $[searchval]
RETURNING playerId, age, height, jerseyNumber; 
`

const updatePlayerJNQuery = `
UPDATE player 
SET jerseyNumber = $[updateval]
WHERE playerId = $[searchval]
RETURNING playerId, age, height, jerseyNumber; 
`

const deletePlayerQuery = `
DELETE FROM player 
WHERE $[searchfield~] = $[searchval]
RETURNING playerId, age, height, jerseyNumber;
`

const getCoachQuery = `
SELECT C.coachId, U.name, C.age, C.gender
FROM coach C, users U
WHERE C.coachId = $[coachId]
AND C.coachId = U.userId;
`

const getCoachesQuery = `
SELECT C.coachId, U.name, C.age, C.gender
FROM coach C, users U
WHERE C.coachId = U.userId;
`

const addCoachQuery = `
INSERT INTO coach (coachId, age, gender)
VALUES ($[coachId], $[age], $[gender])
RETURNING coachId, age, gender;
`

const updateCoachQuery = `
UPDATE coach 
SET age = $[updateval]
WHERE coachId = $[searchval]
RETURNING coachId, age, gender;
`

const deleteCoachQuery = `
DELETE coach 
WHERE $[searchfield~] = $[searchval]
RETURNING coachId, age, gender;
`

const getManagerQuery = `
SELECT M.managerId, U.name
FROM leaguemanager M, users U
WHERE M.managerId = $[managerId]
AND M.managerId = U.userId;
`

const getManagersQuery = `
SELECT M.managerId, U.name
FROM leaguemanager M, users U
WHERE M.managerId = U.userId;
`

const addManagerQuery = `
INSERT INTO leaguemanager (managerId)
VALUES ($[managerId])
RETURNING managerId;
`

const deleteManagerQuery = `
DELETE FROM leaguemanager 
WHERE managerId = $[managerId]
RETURNING managerId;
`

const playerController: ((db: pgPromise.IDatabase<{}>) => IPlayerController) = (db) => ({
    getPlayer: async (playerId: string) => {
      return db.one(getPlayerQuery, { playerId });
    },
    getPlayers: async () => {
      return db.manyOrNone(getPlayersQuery);
    },
    addPlayer: async (info: IPlayerInfo, playerId: string) => {
      return db.one(addPlayerQuery, { playerId, ...info});
    },
    updatePlayerAge: async (updateval: string, searchval: string) => {
      return db.one(updatePlayerAgeQuery, {  updateval, searchval });
    },
    updatePlayerHeight: async (updateval: string, searchval: string) => {
      return db.one(updatePlayerHeightQuery, {  updateval, searchval });
    },
    updatePlayerJN: async (updateval: string, searchval: string) => {
      return db.one(updatePlayerJNQuery, {  updateval, searchval });
    },
    deletePlayer: async (searchfield: string, searchval: string) => {
        return db.manyOrNone(deletePlayerQuery, { searchfield, searchval }); 
    }
})

const coachController: ((db: pgPromise.IDatabase<{}>) => ICoachController) = (db) => ({
    getCoach: async (coachId: string) => {
      return db.one(getCoachQuery, { coachId });
    },
    getCoaches: async () => {
      return db.manyOrNone(getCoachesQuery);
    },
    addCoach: async (info: ICoachInfo, coachId: string) => {
      return db.one(addCoachQuery, { coachId, ...info});
    },
    updateCoach: async (updateval: string, searchval: string) => {
        return db.manyOrNone(updateCoachQuery, { updateval, searchval });
    },
    deleteCoach: async (searchfield: string, searchval: string) => {
        return db.manyOrNone(deleteCoachQuery, { searchfield, searchval }); 
    }
})

const managerController: ((db: pgPromise.IDatabase<{}>) => IManagerController) = (db) => ({
    getManager: async (managerId: string) => {
      return db.one(getManagerQuery, { managerId });
    },
    getManagers: async () => {
      return db.manyOrNone(getManagersQuery);
    },
    addManager: async (managerId: string) => {
      return db.one(addManagerQuery, { managerId });
    },
    deleteManager: async (managerId: string) => {
        return db.one(deleteManagerQuery, { managerId });
    },
})

export {coachController};
export {managerController};
export default playerController; 

