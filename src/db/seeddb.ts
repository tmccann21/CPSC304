import * as dotenv from "dotenv";
import * as fs from "fs-extra";
import { Client } from "pg";
import log from '../util/log';
import path from "path";

const seeds = ['seed_users.pgsql'];

const init = async () => {
  dotenv.config();
  const client = new Client();

  for (const seedFile of seeds) {
    log.info(`Seeding from file ${seedFile}`);

    try {
      await client.connect();
      const sql = await fs.readFile(path.join(__dirname, seedFile), { encoding: "UTF-8" });
      const statements = sql.split( /;\s*$/m );
      for ( const statement of statements ) {
        if ( statement.length > 3 ) {
          await client.query( statement );
        }
      }
    } catch (err) {
      log.error(err)
      throw err;
    } finally {
      await client.end();
    }
  }
};

log.info('Seeding database');

init().then(() => {
  log.info('Database seeded');
}).catch(() => {
  log.error('Database seeding failed!');
});