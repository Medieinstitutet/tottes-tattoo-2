import mongoose from 'mongoose';
import config from '../config/config.mjs';

const connectDb = async () => {
  const uri = config.mongoUri;
  if (!uri)
    throw new Error('MONGO_URI is not defined in environment variables');
  await mongoose.connect(uri);
};

export { connectDb };
