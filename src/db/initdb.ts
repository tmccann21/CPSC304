import * as dotenv from "dotenv";
import * as fs from "fs-extra";
import { Client } from "pg";
import log from '../util/log';
import path from "path";

const init = async () => {
  // read environment variables
  dotenv.config();
  // create an instance of the PostgreSQL client
  const client = new Client();
  try {
    // connect to the local database server
    await client.connect();
    // read the contents of the initdb.pgsql file
    const sql = await fs.readFile(path.join(__dirname, 'initdb.pgsql'), { encoding: "UTF-8" });
    // split the file into separate statements
    const statements = sql.split( /;\s*$/m );
    for ( const statement of statements ) {
      if ( statement.length > 3 ) {
        // execute each of the statements
        await client.query( statement );
      }
    }
  } catch (err) {
    log.error(err)
    throw err;
  } finally {
    // close the database client
    await client.end();
  }
};

init().then(() => {
  log.info('PGSQL Database has been Initialized');
}).catch(() => {
  log.error('Database initialization failed!');
});