import mongoose from 'mongoose';

// lives in an env var for docker build - could use dot-env or similar for local
const connection =
  process.env.MONGODB_URL || 'mongodb://localhost:27017/short-urls';

const mongoConnect = async () => {
  return await mongoose.connect(connection);
};

export default mongoConnect;
