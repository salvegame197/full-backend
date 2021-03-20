import mongoose from 'mongoose';

class Database {
  constructor() {
    this.init();
  }

  init() {
    mongoose.connect(
      `${process.env.MONGODB_CONNECT}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      },
      () => {
        console.log('MongoDB Connected');
      }
    );
  }
}

export default new Database();
