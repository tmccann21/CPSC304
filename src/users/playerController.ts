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

const getPlayerQuery = `
SELECT (P.playerId, U.name, P.age, P.height, P.jerseyNumber)
FROM player P, users U
WHERE P.playerId = $[playerId] 
AND P.playerId = U.userId;
`

const getPlayersQuery = `
SELECT (P.playerId, U.name, P.age, P.height, P.jerseyNumber)
FROM player P, users U
WHERE P.playerId = U.userId;
`

const addPlayerQuery = `
INSERT INTO player (playerId, age, height, jerseyNumber) 
VALUES ($[playerId], $[age], $[height], $[jerseyNumber])
RETURNING (playerId, age, height, jerseyNumber);
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

export default playerController; 