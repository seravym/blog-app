import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const posts = sqliteTable("posts", {
  id: integer("id")
  .primaryKey({ autoIncrement: true }),
  title: text("title")
  .notNull(),
  content: text("content")
  .notNull(),
  createdAt: text("createdAt")
  .notNull()
  .default(sql`CURRENT_TIMESTAMP`),
});

export const comments = sqliteTable("comments", {
  id: integer("id")
  .primaryKey({ autoIncrement: true }),
  postId: integer("post_id")
  .notNull()
  .references(() => posts.id, { onDelete: "cascade" }),
  author: text("author")
  .notNull(),
  content: text("content")
  .notNull(),
  createdAt: text("createdAt")
  .notNull()
  .default(sql`CURRENT_TIMESTAMP`),
});