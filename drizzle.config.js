export default {
  schema: "./schema.js",
  out: "./drizzle",
  driver: "better-sqlite",
  dbCredentials: {
    url: "sqlite.db",
  },
};
