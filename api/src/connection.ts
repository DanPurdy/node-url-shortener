import mongoose from 'mongoose';

// TODO env vars
// const connection = 'mongodb://mongo-server:27017/short-urls';
const connection = 'mongodb://localhost:27017/short-urls';

const mongoConnect = async () => {
  return await mongoose.connect(connection);
};

export default mongoConnect;
