import mongoose from 'mongoose';

const connectDb = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri)
    throw new Error('MONGO_URI is not defined in environment variables');
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export { connectDb };
