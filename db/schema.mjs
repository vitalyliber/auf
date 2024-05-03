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
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const doorsRelations = relations(doors, ({ many }) => ({
  users: many(users),
}));

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    email: varchar("email", { length: 256 }).notNull(),
    doorId: integer("door_id").notNull(),
  },
  (t) => ({
    unique: unique("door_user").on(t.email, t.doorId),
  }),
);

export const usersRelations = relations(users, ({ one, many }) => ({
  door: one(doors, {
    fields: [users.doorId],
    references: [doors.id],
  }),
  devices: many(devices),
}));

export const devices = pgTable("devices", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  onlineAt: timestamp("online_at").notNull().defaultNow(),
  userId: integer("user_id").notNull(),
  userAgent: varchar("user_agent").notNull(),
});

export const devicesRelations = relations(devices, ({ one }) => ({
  user: one(users, {
    fields: [devices.userId],
    references: [users.id],
  }),
}));
