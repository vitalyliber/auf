import { migrate } from "drizzle-orm/node-postgres/migrator";
import createDatabase from "./createDatabase.mjs";
// Create db if doesn't exists
import { db, connection } from "./db.mjs";
await createDatabase()
// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: "./drizzle" });
// Don't forget to close the connection, otherwise the script will hang
await connection.end();
