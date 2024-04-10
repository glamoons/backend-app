import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_products_blocks_color_color" AS ENUM('coldWhite', 'warmWhite');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_products_blocks_shape_shape" AS ENUM('circle', 'square', 'rectangle');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_products_blocks_size_size" AS ENUM('30', '40', '50', '60', '70', '80');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_orders_status" AS ENUM('cancelled', 'created', 'fulfilled', 'paid');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"login_attempts" numeric,
	"lock_until" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "products_blocks_color_color" (
	"order" integer NOT NULL,
	"parent_id" varchar NOT NULL,
	"value" "enum_products_blocks_color_color",
	"id" serial PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "products_blocks_color" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "products_blocks_shape" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"shape" "enum_products_blocks_shape_shape",
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "products_blocks_size" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"size" "enum_products_blocks_size_size",
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "products_blocks_product_variant" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"is_default" boolean,
	"sku" varchar NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"description" jsonb NOT NULL,
	"price" numeric NOT NULL,
	"rating" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "products_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"alt" varchar,
	"caption" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric,
	"sizes_thumbnail_url" varchar,
	"sizes_thumbnail_width" numeric,
	"sizes_thumbnail_height" numeric,
	"sizes_thumbnail_mime_type" varchar,
	"sizes_thumbnail_filesize" numeric,
	"sizes_thumbnail_filename" varchar,
	"sizes_card_url" varchar,
	"sizes_card_width" numeric,
	"sizes_card_height" numeric,
	"sizes_card_mime_type" varchar,
	"sizes_card_filesize" numeric,
	"sizes_card_filename" varchar,
	"sizes_laptop_url" varchar,
	"sizes_laptop_width" numeric,
	"sizes_laptop_height" numeric,
	"sizes_laptop_mime_type" varchar,
	"sizes_laptop_filesize" numeric,
	"sizes_laptop_filename" varchar,
	"sizes_tablet_url" varchar,
	"sizes_tablet_width" numeric,
	"sizes_tablet_height" numeric,
	"sizes_tablet_mime_type" varchar,
	"sizes_tablet_filesize" numeric,
	"sizes_tablet_filename" varchar
);

CREATE TABLE IF NOT EXISTS "reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"author" varchar NOT NULL,
	"description" jsonb NOT NULL,
	"email" varchar NOT NULL,
	"rating" numeric NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "reviews_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"products_id" integer
);

CREATE TABLE IF NOT EXISTS "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"lines" jsonb NOT NULL,
	"status" "enum_orders_status",
	"total_amount" numeric NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "cart" (
	"id" serial PRIMARY KEY NOT NULL,
	"quantity" numeric NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "cart_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"products_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");
CREATE INDEX IF NOT EXISTS "products_blocks_color_color_order_idx" ON "products_blocks_color_color" ("order");
CREATE INDEX IF NOT EXISTS "products_blocks_color_color_parent_idx" ON "products_blocks_color_color" ("parent_id");
CREATE INDEX IF NOT EXISTS "products_blocks_color_order_idx" ON "products_blocks_color" ("_order");
CREATE INDEX IF NOT EXISTS "products_blocks_color_parent_id_idx" ON "products_blocks_color" ("_parent_id");
CREATE INDEX IF NOT EXISTS "products_blocks_color_path_idx" ON "products_blocks_color" ("_path");
CREATE INDEX IF NOT EXISTS "products_blocks_shape_order_idx" ON "products_blocks_shape" ("_order");
CREATE INDEX IF NOT EXISTS "products_blocks_shape_parent_id_idx" ON "products_blocks_shape" ("_parent_id");
CREATE INDEX IF NOT EXISTS "products_blocks_shape_path_idx" ON "products_blocks_shape" ("_path");
CREATE INDEX IF NOT EXISTS "products_blocks_size_order_idx" ON "products_blocks_size" ("_order");
CREATE INDEX IF NOT EXISTS "products_blocks_size_parent_id_idx" ON "products_blocks_size" ("_parent_id");
CREATE INDEX IF NOT EXISTS "products_blocks_size_path_idx" ON "products_blocks_size" ("_path");
CREATE INDEX IF NOT EXISTS "products_blocks_product_variant_order_idx" ON "products_blocks_product_variant" ("_order");
CREATE INDEX IF NOT EXISTS "products_blocks_product_variant_parent_id_idx" ON "products_blocks_product_variant" ("_parent_id");
CREATE INDEX IF NOT EXISTS "products_blocks_product_variant_path_idx" ON "products_blocks_product_variant" ("_path");
CREATE UNIQUE INDEX IF NOT EXISTS "products_name_idx" ON "products" ("name");
CREATE UNIQUE INDEX IF NOT EXISTS "products_slug_idx" ON "products" ("slug");
CREATE INDEX IF NOT EXISTS "products_created_at_idx" ON "products" ("created_at");
CREATE INDEX IF NOT EXISTS "products_rels_order_idx" ON "products_rels" ("order");
CREATE INDEX IF NOT EXISTS "products_rels_parent_idx" ON "products_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "products_rels_path_idx" ON "products_rels" ("path");
CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" ("filename");
CREATE INDEX IF NOT EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" ("sizes_thumbnail_filename");
CREATE INDEX IF NOT EXISTS "media_sizes_card_sizes_card_filename_idx" ON "media" ("sizes_card_filename");
CREATE INDEX IF NOT EXISTS "media_sizes_laptop_sizes_laptop_filename_idx" ON "media" ("sizes_laptop_filename");
CREATE INDEX IF NOT EXISTS "media_sizes_tablet_sizes_tablet_filename_idx" ON "media" ("sizes_tablet_filename");
CREATE INDEX IF NOT EXISTS "reviews_created_at_idx" ON "reviews" ("created_at");
CREATE INDEX IF NOT EXISTS "reviews_rels_order_idx" ON "reviews_rels" ("order");
CREATE INDEX IF NOT EXISTS "reviews_rels_parent_idx" ON "reviews_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "reviews_rels_path_idx" ON "reviews_rels" ("path");
CREATE INDEX IF NOT EXISTS "orders_created_at_idx" ON "orders" ("created_at");
CREATE INDEX IF NOT EXISTS "cart_created_at_idx" ON "cart" ("created_at");
CREATE INDEX IF NOT EXISTS "cart_rels_order_idx" ON "cart_rels" ("order");
CREATE INDEX IF NOT EXISTS "cart_rels_parent_idx" ON "cart_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "cart_rels_path_idx" ON "cart_rels" ("path");
CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" ("key");
CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" ("created_at");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" ("order");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" ("path");
CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" ("created_at");
DO $$ BEGIN
 ALTER TABLE "products_blocks_color_color" ADD CONSTRAINT "products_blocks_color_color_parent_id_products_blocks_color_id_fk" FOREIGN KEY ("parent_id") REFERENCES "products_blocks_color"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "products_blocks_color" ADD CONSTRAINT "products_blocks_color__parent_id_products_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "products_blocks_shape" ADD CONSTRAINT "products_blocks_shape__parent_id_products_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "products_blocks_size" ADD CONSTRAINT "products_blocks_size__parent_id_products_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "products_blocks_product_variant" ADD CONSTRAINT "products_blocks_product_variant__parent_id_products_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_id_products_id_fk" FOREIGN KEY ("parent_id") REFERENCES "products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "reviews_rels" ADD CONSTRAINT "reviews_rels_parent_id_reviews_id_fk" FOREIGN KEY ("parent_id") REFERENCES "reviews"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "reviews_rels" ADD CONSTRAINT "reviews_rels_products_id_products_id_fk" FOREIGN KEY ("products_id") REFERENCES "products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "cart_rels" ADD CONSTRAINT "cart_rels_parent_id_cart_id_fk" FOREIGN KEY ("parent_id") REFERENCES "cart"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "cart_rels" ADD CONSTRAINT "cart_rels_products_id_products_id_fk" FOREIGN KEY ("products_id") REFERENCES "products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_id_payload_preferences_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "users";
DROP TABLE "products_blocks_color_color";
DROP TABLE "products_blocks_color";
DROP TABLE "products_blocks_shape";
DROP TABLE "products_blocks_size";
DROP TABLE "products_blocks_product_variant";
DROP TABLE "products";
DROP TABLE "products_rels";
DROP TABLE "media";
DROP TABLE "reviews";
DROP TABLE "reviews_rels";
DROP TABLE "orders";
DROP TABLE "cart";
DROP TABLE "cart_rels";
DROP TABLE "payload_preferences";
DROP TABLE "payload_preferences_rels";
DROP TABLE "payload_migrations";`);

};
