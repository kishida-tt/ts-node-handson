import * as dotenv from 'dotenv';

// dotenv config
dotenv.config();
const config = {
  openaiKey: process.env['OPENAI_KEY'] || '',
  port: 3000,
};

export default config;
