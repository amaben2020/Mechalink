// import { relations } from 'drizzle-orm';
import { pgTable, timestamp, serial } from 'drizzle-orm/pg-core';

// import { mechanicsSchema } from '.';

export const jobs = pgTable('mechanicAvailability', {
  id: serial('id').primaryKey(),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time').notNull(),
});

// export const jobRelations = relations(jobs, ({ many, one }) => ({
//   mechanic: one(mechanicsSchema, {
//     fields: [jobs.mechanicId],
//     references: [mechanicsSchema.id],
//   }),
// }));
