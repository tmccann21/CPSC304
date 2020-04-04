import pgPromise from "pg-promise";

export interface IGamePlayed {
	time: string;
	location: string;
	team1Name: string;
	team2Name: string;
	team1Score: string;
	team2Score: string;
}

export interface IGamePlayedController {
	getGamePlayed: (time: string, location: string, team1Name: string, team2Name: string) => Promise<IGamePlayed>;
	createGamePlayed: (info: IGamePlayed) => Promise<IGamePlayed>;
	getAllGamesPlayed: () => Promise<IGamePlayed[]>;
}

const createGamePlayedQuery = `
INSERT INTO gameplayed (time, location, team1Name, team2Name, team1Score, team2Score)
VALUES ($[time], $[location], $[team1Name], $[team2Name])
RETURNING (time, location, team1Name, team2Name);
`

const getGamePlayedQuery = `
SELECT (time, location, team1Name, team2Name)
FROM gameplayed
WHERE team1Name = $[team1Name] OR team1Name = $[team2Name]
UNION
WHERE team2Name = $[team1Name] OR team2Name = $[team2Name];
`

const getAllGamesPlayedQuery = `
SELECT (time, location, team1Name, team2Name, team1Score, team2Score)
FROM gameplayed;
`

const gamePlayedController: ((db: pgPromise.IDatabase<{}>) => IGamePlayedController) = (db) => ({
	getGamePlayed: async (time, location, team1Name, team2Name) => {
		return db.one(getGamePlayedQuery, { time, location , team1Name, team2Name});
	},
	getAllGamesPlayed: async () => {
		return db.manyOrNone(getAllGamesPlayedQuery);
	},
	createGamePlayed: async (info: IGamePlayed) => {
		return db.one(createGamePlayedQuery, { ...info });
	},
})


export default gamePlayedController;