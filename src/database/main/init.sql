-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.9.2
-- PostgreSQL version: 12.0
-- Project Site: pgmodeler.io
-- Model Author: ---


-- Database creation must be done outside a multicommand file.
-- These commands were put in this file only as a convenience.
-- -- object: "rso-main" | type: DATABASE --
-- -- DROP DATABASE IF EXISTS "rso-main";
-- CREATE DATABASE "rso-main";
-- -- ddl-end --
--

SET search_path TO pg_catalog,public;
-- ddl-end --

-- object: public.server_journal | type: TABLE --
-- DROP TABLE IF EXISTS public.server_journal CASCADE;
CREATE TABLE public.server_journal (
	input_time timestamp with time zone,
	id uuid,
	address text,
	type text,
	args json
);
-- ddl-end --
-- ALTER TABLE public.server_journal OWNER TO postgres;
-- ddl-end --

-- object: public.session_events | type: TABLE --
-- DROP TABLE IF EXISTS public.session_events CASCADE;
CREATE TABLE public.session_events (
	input_time timestamp with time zone,
	sessions_id uuid NOT NULL,
	event text,
	args json
);
-- ddl-end --
-- ALTER TABLE public.session_events OWNER TO postgres;
-- ddl-end --

-- object: public.sessions | type: TABLE --
-- DROP TABLE IF EXISTS public.sessions CASCADE;
CREATE TABLE public.sessions (
	input_time timestamp with time zone,
	id uuid NOT NULL,
	"user" uuid,
	server_address text,
	args json,
	CONSTRAINT sessions_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.sessions OWNER TO postgres;
-- ddl-end --

-- object: sessions_fk | type: CONSTRAINT --
-- ALTER TABLE public.session_events DROP CONSTRAINT IF EXISTS sessions_fk CASCADE;
ALTER TABLE public.session_events ADD CONSTRAINT sessions_fk FOREIGN KEY (sessions_id)
REFERENCES public.sessions (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: public.messages | type: TABLE --
-- DROP TABLE IF EXISTS public.messages CASCADE;
CREATE TABLE public.messages (
	input_time timestamp with time zone,
	"from" uuid NOT NULL,
	id uuid NOT NULL,
	sessions_id uuid,
	to_type text,
	to_id uuid,
	content json,
	CONSTRAINT messages_pk PRIMARY KEY ("from",id)

);
-- ddl-end --
-- ALTER TABLE public.messages OWNER TO postgres;
-- ddl-end --

-- object: sessions_fk | type: CONSTRAINT --
-- ALTER TABLE public.messages DROP CONSTRAINT IF EXISTS sessions_fk CASCADE;
ALTER TABLE public.messages ADD CONSTRAINT sessions_fk FOREIGN KEY (sessions_id)
REFERENCES public.sessions (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --


