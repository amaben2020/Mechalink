import { relations } from 'drizzle-orm';
import {
  text,
  serial,
  pgTable,
  varchar,
  timestamp,
  bigserial,
} from 'drizzle-orm/pg-core';
import { jobRequests } from './jobRequest';

export const jobs = pgTable('jobs', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  created_by: varchar('created_by', { length: 256 }).notNull(),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updated_by: varchar('updated_by', { length: 256 }),
  updated_at: timestamp('updated_at', { withTimezone: true }),
  description: text('description').notNull(),
  dispatcher: text('dispatcher').notNull(),
});

export const jobRelations = relations(jobs, ({ one, many }) => ({
  jobRequests: many(jobRequests),
}));
