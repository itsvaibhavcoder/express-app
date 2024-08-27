import mongoose from 'mongoose';
import Logger from './logger';

class Database {
  private DATABASE_URI: string; // Renamed to match the .env variable
  private logger;

  constructor() {
    // Replace database value in the .env file with your database config url
    this.DATABASE_URI =
      process.env.NODE_ENV === 'test'
        ? process.env.DATABASE_TEST || ''
        : process.env.DATABASE_URI || ''; // Ensure DATABASE_URI is used

    this.logger = Logger.logger;
  }

  public initializeDatabase = async (): Promise<void> => {
    try {
      await mongoose.connect(this.DATABASE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      this.logger.info('Connected to the database.');
    } catch (error) {
      this.logger.error('Could not connect to the database.', error);
    }
  };
}

export default Database;
