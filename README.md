# SecPass

SecPass is a platform for password management.

In our platform, you can just create an account and use all the features we provide.

SecPass is still in development.

## Want to run our code locally?

All you need to run is:

- Clone the repository
- Create a .env file in the root project folder with the following variables:
  - `DB_HOST` - Your database host
  - `DB_PORT` - Your database port
  - `DB_USERNAME` - Your database username
  - `DB_PASSWORD` - Your database password
  - `DB_SCHEMA` - Your database name (I call it schema because DB_DB sounds strange lol)
  - `PORT` - A port to start the server
  - `KEY` - The secret key to encode JWT
  - `AUD_ACCESS` - JWT audience info for Access Token
  - `AUD_REFRESH` - JWT audience info for Refresh Token
  - `ISSUER` - JWT issuer info
  - `SALT` - The salt for bcrypt password encrypt
- Run `npm install` to install all the dependencies
- Run `npm run typeorm migration:run -- -d src/database/postgres.ts` to run the TypeORM migrations
- And finally, run `npm run dev` to start the application

## Testing

There are **Integration Tests** available in the project and you can run all the tests by running `npm test`.

## API Documentation

Since the app is running, you can access `localhost:PORT/api/v1/docs` to visualize the documentation with all the possible routes and parameters needed.

## Tecnologies used

- Node.js
- TypeScript
- Express
- TypeORM
- PostgreSQL
- Jest
- Swagger

---

Developed with 💙 by [Lucas Rangel](https://www.linkedin.com/in/lucasrngl/)
