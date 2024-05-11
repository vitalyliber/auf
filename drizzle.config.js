import databaseCredentials from "@/db/databaseCredentials";

export default {
  schema: "./db/schema.mjs",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: databaseCredentials,
};
