// src/database/mongo.provider.ts
import { MongoClient } from 'mongodb';
import { Provider } from '@nestjs/common';

const MONGO_URI = 'mongodb://localhost:27017';
const DB_NAME = 'citefix'; // ou le nom de ta base

export const MongoProvider: Provider = {
  provide: 'MONGO_CONNECTION',
  useFactory: async () => {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    return client.db(DB_NAME);
  },
};
