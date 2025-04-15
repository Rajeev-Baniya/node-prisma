import dotenv from 'dotenv';

dotenv.config();

export const settings = {
  port: parseInt(process.env.APP_PORT || '5000'),
  nodeEnv: process.env.NODE_ENV,
};
