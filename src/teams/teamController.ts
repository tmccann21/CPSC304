import pgPromise from "pg-promise";

export interface ITeamController {
  getTeams: () => Promise<any>;
  getTeamSeasons: (teamName: string) => Promise<any>;
  getAllSeasons: () => Promise<any>;
}

const getTeamsQuery = `
SELECT *
FROM teams;
`

const getTeamSeasonsQuery = `
SELECT t.teamName, s.seasonYear, s.leagueName
FROM teams t, seasonParticipation sp, seasons s
WHERE t.teamName = $[teamName] AND t.teamName = sp.teamName AND sp.seasonYear = s.seasonYear AND sp.leagueName = s.leagueName

`

const getSeasonsQuery = `
SELECT *
FROM seasons;
`

const teamController: ((db: pgPromise.IDatabase<{}>) => ITeamController) = (db) => ({
  getTeams: async () => {
    return db.manyOrNone(getTeamsQuery);
  },
  getTeamSeasons: async (teamName: string) => {
    return db.manyOrNone(getTeamSeasonsQuery, { teamName });
  },
  getAllSeasons: async () => {
    return db.manyOrNone(getSeasonsQuery);
  },
})

export default teamController;