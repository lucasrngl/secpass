import 'reflect-metadata';
import { app } from './app';
import { postgres } from './database/postgres';

const port = Number(process.env.PORT);

postgres.initialize().catch((error) => console.log(error));

app.listen(port);
