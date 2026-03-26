import 'server-only';

import mongoose from 'mongoose';

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var __mongoose_cache__: MongooseCache | undefined;
}

const cache: MongooseCache = global.__mongoose_cache__ ?? {
  conn: null,
  promise: null
};

global.__mongoose_cache__ = cache;

export async function connectMongo() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) throw new Error('Missing MONGO_URI');

  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = mongoose.connect(mongoUri).then((m) => m);
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
