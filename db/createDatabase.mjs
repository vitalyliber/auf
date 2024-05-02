import pg from "pg";
import databaseCredentials from "./databaseCredentials.mjs";

const createDatabase = async () => {
  const dbConfig = databaseCredentials;

  const databaseName = dbConfig.database;

  delete dbConfig.database;

  console.log("dbConfig:", dbConfig);

  const pool = new pg.Pool(dbConfig);

  try {
    const client = await pool.connect();

    try {
      const result = await client.query(
        `
        SELECT datname
        FROM pg_database
        WHERE datname = $1
      `,
        [databaseName],
      );

      if (result.rows.length === 0) {
        try {
          await client.query(`CREATE DATABASE ${databaseName}`);
          console.log("DB is successfully created");
        } catch (error) {
          console.error("DB creation error:", error);
        }
      } else {
        console.log(`The DB ${databaseName} is already exists.`);
      }
    } catch (e) {
    } finally {
      client.release();
    }
  } catch (error) {
    console.log("Error:", error);
  } finally {
    await pool.end();
  }
};

export default createDatabase;
