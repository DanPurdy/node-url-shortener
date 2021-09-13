import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ConnectionOptions } from 'tls';

let mongod: MongoMemoryServer;

export const connect = async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
  };

  await mongoose.connect(uri, mongooseOpts as ConnectionOptions);
};

export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

export const clearDatabase = async () => {
  if (mongod) {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
};
