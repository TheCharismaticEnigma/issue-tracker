import mongoose from 'mongoose';

export async function connectToDatabase() {
  try {
    //   Without connect, no DB connection.
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      // console.log('CONNECTION WITH DATABASE ESTABLISHED');
    });

    connection.on('error', () => {
      // console.log('CONNECTION WITH DATABASE FAILED');
      process.exit();
    });
  } catch (error) {
    console.log(error);
  }
}
