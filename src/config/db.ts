import * as SQLite from 'expo-sqlite';
import { ConnectionOptions } from 'typeorm/browser';

import { News, Settings } from '../models';

const connectionOptions: ConnectionOptions = {
  driver: SQLite,
  name: 'default',
  type: 'expo',
  database: 'appdb',
  logging: ['error', 'query', 'schema'],
  synchronize: true,
  entities: [News, Settings],
};

export default connectionOptions;
