import pgPromise from "pg-promise";

export interface IGame {
	time: string;
	location: string;
}

export interface IGamePlayed extends IGame {
	team1Name: string;
	team2Name: string;
	team1Score: string;
	team2Score: string;
}

export interface ITeam extends IGame {
	teamName: string;
}

export interface IGamePlayedController {
	createGame: (info: IGame) => Promise<IGame>;
	getAllGames: () => Promise<IGame[]>;
	getGamesPlayed: (team1Name: string, team2Name: string) => Promise<IGamePlayed[]>;
	createGamePlayed: (info: IGamePlayed) => Promise<IGamePlayed>;
	getAllGamesPlayed: () => Promise<IGamePlayed[]>;
	getAllTeamNames: () => Promise<ITeam[]>;
	// getTeamName: (teamName: string) => Promise<ITeam>;
}

const createGameQuery = `
INSERT INTO games (time, location)
VALUES ($[time], $[location])
RETURNING (time, location);
`

const createGamePlayedQuery = `
INSERT INTO gameplayed (time, location, team1Name, team2Name, team1Score, team2Score)
VALUES ($[time], $[location], $[team1Name], $[team2Name], $[team1Score], $[team2Score])
RETURNING (time, location, team1Name, team2Name, team1Score, team2Score);
`

// better guarantee of fkey constraint
// const createGamePlayedQuery = `
// INSERT INTO gameplayed (time, location, team1Name, team2Name, team1Score, team2Score)
// VALUES ((SELECT time FROM games WHERE time = $[time]), (SELECT location FROM games WHERE location=$[location]), $[team1Name], $[team2Name], $[team1Score], $[team2Score])
// RETURNING (time, location, team1Name, team2Name, team1Score, team2Score);
// `
 
const getGamePlayedQuery = `
SELECT (time, location, team1Name, team2Name, team1Score, team2Score)
FROM gameplayed
WHERE 
((team1Name = $[team1Name] AND team2Name = $[team2Name]) OR (team1Name = $[team2Name] AND team2Name = $[team1Name]))
`

const getAllGamesPlayedQuery = `
SELECT time, location, team1Name, team2Name, team1Score, team2Score
FROM gameplayed;
`

const getAllGamesQuery = `
SELECT (time, location)
FROM games;
`

const getAllTeamNamesQuery = `
SELECT (teamName)
FROM teams;
`

const gamePlayedController: ((db: pgPromise.IDatabase<{}>) => IGamePlayedController) = (db) => ({
	createGame: async(info: IGame) => {
		return db.one(createGameQuery, { ...info });
	},

	getAllGames: async() => {
		return db.manyOrNone(getAllGamesQuery);
	},

	getAllTeamNames: async() => {
		return db.manyOrNone(getAllTeamNamesQuery);
	},

	getGamesPlayed: async (team1Name, team2Name) => {
		return db.manyOrNone(getGamePlayedQuery, {team1Name, team2Name});
	},

	getAllGamesPlayed: async () => {
		return db.manyOrNone(getAllGamesPlayedQuery);
	},
	createGamePlayed: async (info: IGamePlayed) => {
		return db.one(createGamePlayedQuery, { ...info });
	},
})

// export {gameController};
export default gamePlayedController;