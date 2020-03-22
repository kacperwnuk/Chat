-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.9.2
-- PostgreSQL version: 12.0
-- Project Site: pgmodeler.io
-- Model Author: ---


-- Database creation must be done outside a multicommand file.
-- These commands were put in this file only as a convenience.
-- -- object: "rso-user" | type: DATABASE --
-- -- DROP DATABASE IF EXISTS "rso-user";
-- CREATE DATABASE "rso-user";
-- -- ddl-end --
-- 

-- object: public.users | type: TABLE --
-- DROP TABLE IF EXISTS public.users CASCADE;
CREATE TABLE public.users (
	user_id uuid NOT NULL,
	law_type text,
	name_family text,
	name_given text,
	name_middle text,
	name_prefix text,
	name_suffix text,
	address text,
	address_data json,
	deleted boolean,
	CONSTRAINT users_pk PRIMARY KEY (user_id)

);
-- ddl-end --
-- ALTER TABLE public.users OWNER TO postgres;
-- ddl-end --

-- object: public.basic_auth | type: TABLE --
-- DROP TABLE IF EXISTS public.basic_auth CASCADE;
CREATE TABLE public.basic_auth (
	user_id uuid NOT NULL,
	password text,
	CONSTRAINT basic_auth_pk PRIMARY KEY (user_id)

);
-- ddl-end --
-- ALTER TABLE public.basic_auth OWNER TO postgres;
-- ddl-end --

-- object: users_fk | type: CONSTRAINT --
-- ALTER TABLE public.basic_auth DROP CONSTRAINT IF EXISTS users_fk CASCADE;
ALTER TABLE public.basic_auth ADD CONSTRAINT users_fk FOREIGN KEY (user_id)
REFERENCES public.users (user_id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: basic_auth_uq | type: CONSTRAINT --
-- ALTER TABLE public.basic_auth DROP CONSTRAINT IF EXISTS basic_auth_uq CASCADE;
ALTER TABLE public.basic_auth ADD CONSTRAINT basic_auth_uq UNIQUE (user_id);
-- ddl-end --


