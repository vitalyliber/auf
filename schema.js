import { sql, relations } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const doors = sqliteTable("doors", {
  id: integer("id").primaryKey(),
  name: text("name").default(""),
  timestamp: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
});

export const doorsRelations = relations(doors, ({ many }) => ({
  users: many(users),
}));

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  timestamp: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
  email: text("email"),
  doorId: integer("door_id"),
});

export const usersRelations = relations(users, ({ one }) => ({
  door: one(doors, {
    fields: [users.doorId],
    references: [doors.id],
  }),
}));
