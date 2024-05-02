import pgConnectionString from "pg-connection-string";

const databaseCredentials = process.env.DATABASE_URL
  ? pgConnectionString.parse(process.env.DATABASE_URL)
  : {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    };

export default databaseCredentials;
