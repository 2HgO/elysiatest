import { MongoClient } from 'mongodb';

import { ENV } from '../config';

const client = new MongoClient(ENV.DB_URL);
await client.connect();

export default client.db(ENV.DB_NAME);
