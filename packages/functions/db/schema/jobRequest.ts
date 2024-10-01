import { JobRequestStatuses } from '@/constants/constants';
import { relations } from 'drizzle-orm';
import {
  text,
  serial,
  pgTable,
  varchar,
  timestamp,
  integer,
  bigint,
} from 'drizzle-orm/pg-core';
import { jobs } from './job';

export const jobRequests = pgTable('jobRequests', {
  id: serial('id').primaryKey(),
  created_by: varchar('created_by', { length: 256 }).notNull(),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updated_by: varchar('updated_by', { length: 256 }),
  updated_at: timestamp('updated_at', { withTimezone: true }),
  status: varchar('status', {
    enum: Object.values(JobRequestStatuses) as [string, ...string[]],
    length: 256,
  }),
  jobId: bigint('job_id', { mode: 'number' })
    .references(() => jobs.id)
    .notNull(),
  mechanicId: varchar('mechanic_id', { length: 256 }),
  distance: text('distance'),
  duration: text('duration'),
});

// a job can have many requests, only one mechanic can be added to a jobRequest
export const jobRequestRelations = relations(jobRequests, ({ one }) => ({
  job: one(jobs, {
    fields: [jobRequests.jobId], // field on the table
    references: [jobs.id], // field on the referenced table
  }),
}));
