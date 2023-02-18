const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const postRouter = require('./routes/postRoute');
const { userRouter } = require('./routes/userRoute');

const { MONGO_IP, MONGO_PORT, MONGO_USER, MONGO_PASSWORD, APP_PORT, COOKIE_SECRET, REDIS_URL, REDIS_PORT } = require('./config/config');

const session = require("express-session")
let RedisStore = require("connect-redis")(session)
const { createClient } = require("redis")
let redisClient = createClient({
    legacyMode: true,
    url: `redis://${REDIS_URL}:${REDIS_PORT}`,
  });

redisClient.on("error", console.error)
redisClient
.connect()
.then(() => console.log('redis connect ok'))
.catch(console.error);

mongoose.set('strictQuery', false);

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}`

const connectDBWithRetry = () => {
  return mongoose
    .connect(mongoURL)
    .then(res => {
      // console.log(res);
      console.log('succesfully connect to DB');
      return 1;
    })
    .catch(err => {
      console.error(err.message);
      return 0;
    });
}

(async () => {
  // connect mongoDB
  while(await connectDBWithRetry() !== 1) {
    console.log(`retry connect db...`);
    await new Promise(r => setTimeout(r, 5000));
  }

  // starup express
  console.log('starting express...');
  const app = express();

  app.enable('trust proxy');
  app.use(cors({}));

  // setup redisDB for store session
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      saveUninitialized: true,
      secret: 'COOKIE_SECRET',
      resave: false,
      name: '__resid3',
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 30000,
        asd: 12,
      }
    })
  )

  app.use(express.json());

  app.get('/', (req, res) => {
    console.log(`hi, there`);
    res.send('<h1>2. Hi docker with watch over~~!</h1>');
  })

  app.use('/api/v1/posts', postRouter);
  app.use('/api/v1/user', userRouter);

  app.listen(APP_PORT, () => console.log(`app listening on http://localhost:${APP_PORT}`));

})()
