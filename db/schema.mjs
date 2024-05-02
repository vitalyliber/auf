import {
  timestamp,
  pgTable,
  serial,
  varchar,
  integer,
  unique,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const doors = pgTable("doors", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).default(""),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const doorsRelations = relations(doors, ({ many }) => ({
  users: many(users),
}));

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    email: varchar("email", { length: 256 }).notNull(),
    doorId: integer("door_id").notNull(),
  },
  (t) => ({
    unique: unique("door_user").on(t.email, t.doorId),
  }),
);

export const usersRelations = relations(users, ({ one }) => ({
  door: one(doors, {
    fields: [users.doorId],
    references: [doors.id],
  }),
}));
