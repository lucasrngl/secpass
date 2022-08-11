import 'dotenv/config';
import express from 'express';
import { routes } from './routes';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

const app = express();

app.use(express.json());

app.use('/api/v1', routes);
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

export { app };
