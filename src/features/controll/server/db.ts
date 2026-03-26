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

function normalizeMongoUri(mongoUri: string) {
  const dbName = (
    process.env.MONGO_DB_NAME ??
    process.env.MONGO_DB ??
    ''
  ).trim();
  if (!dbName) return mongoUri;

  const schemeIndex = mongoUri.indexOf('://');
  if (schemeIndex === -1) return mongoUri;

  const pathStart = mongoUri.indexOf('/', schemeIndex + 3);
  if (pathStart === -1) return `${mongoUri}/${encodeURIComponent(dbName)}`;

  const afterSlash = mongoUri.slice(pathStart + 1);
  if (afterSlash === '' || afterSlash.startsWith('?')) {
    return (
      mongoUri.slice(0, pathStart + 1) +
      encodeURIComponent(dbName) +
      (afterSlash ? afterSlash : '')
    );
  }

  return mongoUri;
}

export async function connectMongo() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) throw new Error('Missing MONGO_URI');

  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = mongoose
      .connect(normalizeMongoUri(mongoUri))
      .then((m) => m);
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
