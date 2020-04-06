/*
 * Contains Sub User Interfaces: 
 * - Player
 * - Coach
 * - Manager 
 */ 
import pgPromise from "pg-promise";

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
}

export interface IManagerResponse {
    managerId: number;
}

export interface IManagerController {
    getManager: (managerId: string) => Promise<IManagerResponse>; 
    getManagers: () => Promise<IManagerResponse[]>
    addManager: (managerId: string) => Promise<IManagerResponse>; 
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
})

export {coachController};
export {managerController};
export default playerController; 

