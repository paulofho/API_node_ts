import { timestamp } from 'drizzle-orm/pg-core'
import { pgTable, uuid, text, pgEnum} from 'drizzle-orm/pg-core'


export const userRole = pgEnum('user_role', [
    'STUDENT', 
    'INSTRUCTOR'
])


export const users = pgTable('users', {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    email: text().notNull().unique(),
    password: text().notNull(),
    role: userRole().notNull().default('STUDENT'),
})

export const courses = pgTable('courses', {
    id: uuid().primaryKey().defaultRandom(),
    title: text().notNull().unique(),
    description: text(),
})

export const enrollments = pgTable(`enrollments`, {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid().notNull().references(() => users.id),
    courseId: uuid().notNull().references(() => courses.id),
    createdAt: timestamp({withTimezone: true}).defaultNow().notNull(),
})