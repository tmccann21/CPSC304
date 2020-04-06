import pgPromise from "pg-promise";

export interface IJoinQuery {
  field: string;
  condition: string;
}

export interface IStatsController {
  runJoinQuery: (query: IJoinQuery) => Promise<{}>;
}

const joinStatsQuery = `
SELECT u.name, p.jerseyNumber, ps.goals, ps.assists, ps.saves, ps.plusminus
FROM player p, playerStats ps, users u
WHERE u.userId = p.playerid and p.playerid = ps.playerid and $[condition];
`

const statsController: ((db: pgPromise.IDatabase<{}>) => IStatsController) = (db) => ({
  runJoinQuery: async (query) => {
    const condition = `ps.${query.field} ${query.condition}`;


    // this is SUPER unsafe but pg-promise wasn't letting me insert the condition
    // as a variable for whatever reason
    const response = await db.manyOrNone(joinStatsQuery.replace('$[condition]', condition));
    return response;
  },
})

export default statsController;