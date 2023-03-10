module.exports = {
  MONGO_IP: process.env.MONGO_IP || 'mongodb',
  MONGO_PORT: process.env.MONGO_PORT || 27017,
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  APP_PORT: process.env.APP_PORT || 3000,
  REDIS_URL: process.env.REDIS_URL || 'redis',
  REDIS_PORT: process.env.REDIS_PORT || '6379',
  COOKIE_SECRET: process.env.COOKIE_SECRET || 'keyboard cat',
}
