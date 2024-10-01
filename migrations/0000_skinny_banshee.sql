CREATE TABLE IF NOT EXISTS "jobs" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"created_by" varchar(256) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" varchar(256),
	"updated_at" timestamp with time zone,
	"description" text NOT NULL,
	"dispatcher" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "jobRequests" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_by" varchar(256) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" varchar(256),
	"updated_at" timestamp with time zone,
	"status" varchar(256),
	"job_id" bigint NOT NULL,
	"mechanic_id" varchar(256),
	"distance" text,
	"duration" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "jobRequests" ADD CONSTRAINT "jobRequests_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
