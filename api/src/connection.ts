import mongoose from 'mongoose';

const connection =
  process.env.MONGODB_URL || 'mongodb://localhost:27017/short-urls';

console.log(process.env.MONGODB_URL);
// const connection = 'mongodb://localhost:27017/short-urls';

const mongoConnect = async () => {
  return await mongoose.connect(connection);
};

export default mongoConnect;
