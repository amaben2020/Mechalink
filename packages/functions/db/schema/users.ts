import { pgEnum, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('role', ['admin', 'customer']);

export const users = pgTable('user', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  createdBy: text('created_by'),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
  updatedBy: text('updated_by'),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
  deletedBy: text('deleted_by'),
  firstName: text('first_name'),
  lastName: text('last_name'),
  email: text('email').unique(),
  phone: text('phone').unique(),
  lastLogin: timestamp('last_login', { withTimezone: true }),
  token: text('token'),
  addressOne: text('address_one'),
  addressTwo: text('address_two'),
  city: text('city'),
  state: text('state'),
  zip: text('zip'),
  country: text('country'),
  role: userRoleEnum('role'),
  cognitoSub: text('cognito_sub').unique(),
});
