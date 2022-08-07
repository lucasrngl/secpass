import 'reflect-metadata';
import { app } from './app';
import { postgres } from './database/postgres';

postgres
  .initialize()
  .then(() => console.log('Database is connected'))
  .catch((error) => console.log(error));

app.listen(3000, () => {
  console.log('Server is running');
});
