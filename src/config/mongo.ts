import mongoose from 'mongoose';

const connectMongo = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect('mongodb+srv://rti_system:3nRkB4mAdyTusjzo@rticluster.k1lim.mongodb.net/rti_records_db');

    if (connection) {
      console.log('Connected to mongodb');
    }
  } catch (error) {
    console.log(error);
    throw new Error('Error connecting to MongoDB');
  }
};

export default connectMongo;
