import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const feedback = pgTable("feedback", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertFeedbackSchema = createInsertSchema(feedback)
  .omit({ id: true, createdAt: true })
  .extend({
    email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
    message: z.string().min(1, "Message is required"),
    name: z.string().min(1, "Name is required"),
  });

export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;
export type Feedback = typeof feedback.$inferSelect;
