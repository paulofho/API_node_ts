CREATE TYPE "public"."user_role" AS ENUM('STUDENT', 'INSTRUCTOR');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" text DEFAULT '123456';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "user_role" DEFAULT 'STUDENT' NOT NULL;