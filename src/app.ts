import 'module-alias/register';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { swaggerConfig } from './configs';
import { errorMiddleware } from './middlewares';
import { authRouter } from './routes';
import { envUtil } from './utils';
import './configs/db';

const {
  app: { port, client },
} = envUtil.getEnv();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: client,
  }),
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerConfig)));

app.use('/auth', authRouter);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
