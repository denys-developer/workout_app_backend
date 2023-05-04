import 'module-alias/register';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { authRouter, exercisesRouter, usersRouter } from '@/routes';

import { swaggerConfig } from './configs';
import { envUtil } from './utils';

import './configs/db';
import './services/crone';
import './services/passport';
import './services/redis';

const {
  app: { port, client },
} = envUtil.getEnv();

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: client,
  }),
);

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  }),
);

app.use((err, req, res, next) => {
  const status = err.status || 400;
  res.status(status).send(err.message);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerConfig)));

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/exercises', exercisesRouter);

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
