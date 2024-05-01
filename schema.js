import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  timestamp: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
  email: text("email"),
});
