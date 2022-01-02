import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import { config } from '../lib/config';

const db = new JsonDB(new Config(config.dbLocation, true, false, '/'));
console.log(`Initialized database at ${config.dbLocation}`);
export default db;
