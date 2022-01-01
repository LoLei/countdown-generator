import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';

const dbFileName = 'data/countdownDb'; // TODO: Perhaps read from environment
const db = new JsonDB(new Config(dbFileName, true, false, '/'));
console.log(`Initialized database at ${dbFileName}`);
export default db;
