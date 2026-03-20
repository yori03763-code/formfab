export const ENV = {
  PORT: parseInt(process.env.PORT || '3001'),
  MESHY_API_KEY: process.env.MESHY_API_KEY || '',
  SHAPEWAYS_CLIENT_ID: process.env.SHAPEWAYS_CLIENT_ID || '',
  SHAPEWAYS_CLIENT_SECRET: process.env.SHAPEWAYS_CLIENT_SECRET || '',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
  DATABASE_URL: process.env.DATABASE_URL || '',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
};