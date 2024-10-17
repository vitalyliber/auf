import {
  timestamp,
  pgTable,
  serial,
  varchar,
  integer,
  unique,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const doors = pgTable("doors", {
  id: serial().primaryKey(),
  name: varchar({ length: 256 }).notNull(),
  domain: varchar( { length: 256 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  userId: integer("user_id").references(() => users.id),
  usersCount: integer("users_count").default(0),
});

export const doorsRelations = relations(doors, ({ many, one }) => ({
  users: many(users),
  user: one(users, {
    fields: [doors.userId],
    references: [users.id],
  }),
}));

export const users = pgTable(
  "users",
  {
    id: serial().primaryKey(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    email: varchar( { length: 256 }).notNull(),
    doorId: integer("door_id").notNull(),
    confirmed: boolean().default(false),
    devicesCount: integer("devices_count").default(0),
    onlineAt: timestamp("online_at").notNull().defaultNow(),
    roles: jsonb().default({}),
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
  id: serial().primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  onlineAt: timestamp("online_at").notNull().defaultNow(),
  userId: integer("user_id").notNull(),
  userAgent: jsonb("user_agent").default({}),
  token: varchar().unique().notNull(),
});

export const devicesRelations = relations(devices, ({ one }) => ({
  user: one(users, {
    fields: [devices.userId],
    references: [users.id],
  }),
}));
