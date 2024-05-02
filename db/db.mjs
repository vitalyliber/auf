import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema.mjs";
import databaseCredentials from "./databaseCredentials.mjs";

export const connection = new pg.Pool(databaseCredentials);
export const db = drizzle(connection, { schema });
