import bodyParser from 'body-parser';
import 'dotenv/config';
import express from 'express';
import 'module-alias/register';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerConfig } from './configs';
import './configs/db';
import { authRouter } from './routes';
import { envUtil } from './utils';
const app = express();

const {
  app: { port },
} = envUtil.getEnv();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerConfig)));

app.use('/auth', authRouter);

app.get('/', async (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
