import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    if (conn) {
      console.log(`Database is connected to ${conn.connection.host}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
