-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.9.2
-- PostgreSQL version: 12.0
-- Project Site: pgmodeler.io
-- Model Author: ---

SET check_function_bodies = false;
-- ddl-end --

-- object: "backend-server" | type: ROLE --
DROP ROLE IF EXISTS "backend-server";
CREATE ROLE "backend-server" WITH 
	INHERIT
	LOGIN
	ENCRYPTED PASSWORD 'a6a09838afff6c0c9046904dd3fc2f86';
-- ddl-end --


-- Database creation must be done outside a multicommand file.
-- These commands were put in this file only as a convenience.
-- -- object: "rso-main" | type: DATABASE --
-- -- DROP DATABASE IF EXISTS "rso-main";
-- CREATE DATABASE "rso-main"
-- 	ENCODING = 'UTF8'
-- 	LC_COLLATE = 'en_US.utf8'
-- 	LC_CTYPE = 'en_US.utf8'
-- 	TABLESPACE = pg_default
-- 	OWNER = postgres;
-- -- ddl-end --
-- 

-- object: public.server_journal | type: TABLE --
-- DROP TABLE IF EXISTS public.server_journal CASCADE;
CREATE TABLE public.server_journal (
	input_time timestamp with time zone,
	version text,
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
	input_time timestamp with time zone NOT NULL DEFAULT current_timestamp,
	version text,
	event text,
	args json,
	session_id uuid NOT NULL
);
-- ddl-end --
-- ALTER TABLE public.session_events OWNER TO postgres;
-- ddl-end --

-- object: public.sessions | type: TABLE --
-- DROP TABLE IF EXISTS public.sessions CASCADE;
CREATE TABLE public.sessions (
	input_time timestamp with time zone NOT NULL DEFAULT current_timestamp,
	version text NOT NULL,
	session_id uuid NOT NULL,
	user_id uuid NOT NULL,
	server_address text[] NOT NULL,
	args json NOT NULL,
	secret_key text NOT NULL,
	CONSTRAINT sessions_pk PRIMARY KEY (session_id)

);
-- ddl-end --
-- ALTER TABLE public.sessions OWNER TO postgres;
-- ddl-end --

-- object: sessions_fk | type: CONSTRAINT --
-- ALTER TABLE public.session_events DROP CONSTRAINT IF EXISTS sessions_fk CASCADE;
ALTER TABLE public.session_events ADD CONSTRAINT sessions_fk FOREIGN KEY (session_id)
REFERENCES public.sessions (session_id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: public.messages | type: TABLE --
-- DROP TABLE IF EXISTS public.messages CASCADE;
CREATE TABLE public.messages (
	input_time timestamp with time zone NOT NULL DEFAULT current_timestamp,
	version text,
	from_user_id uuid NOT NULL,
	conversation_id uuid NOT NULL,
	message_id uuid NOT NULL,
	content json,
	session_id uuid,
	read boolean DEFAULT false,
	CONSTRAINT messages_pk PRIMARY KEY (from_user_id,message_id,conversation_id)

);
-- ddl-end --
-- ALTER TABLE public.messages OWNER TO postgres;
-- ddl-end --

-- object: sessions_fk | type: CONSTRAINT --
-- ALTER TABLE public.messages DROP CONSTRAINT IF EXISTS sessions_fk CASCADE;
ALTER TABLE public.messages ADD CONSTRAINT sessions_fk FOREIGN KEY (session_id)
REFERENCES public.sessions (session_id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: public.active_sessions | type: VIEW --
-- DROP VIEW IF EXISTS public.active_sessions CASCADE;
CREATE VIEW public.active_sessions
AS 

SELECT sessions.input_time,
    sessions.version,
    sessions.server_address,
    sessions.args,
    sessions.user_id,
    sessions.session_id
   FROM sessions
  WHERE (sessions.input_time > (CURRENT_TIMESTAMP - '00:02:00'::interval));
-- ddl-end --
-- ALTER VIEW public.active_sessions OWNER TO postgres;
-- ddl-end --

-- object: public.emit_session_create_event | type: FUNCTION --
-- DROP FUNCTION IF EXISTS public.emit_session_create_event() CASCADE;
CREATE FUNCTION public.emit_session_create_event ()
	RETURNS trigger
	LANGUAGE plpgsql
	VOLATILE 
	CALLED ON NULL INPUT
	SECURITY INVOKER
	COST 1
	AS $$
begin

insert into public.session_events
    ("version", session_id, "event", args)
values ('database', new.session_id, 'create','{}'::json);

return new;

end
$$;
-- ddl-end --
-- ALTER FUNCTION public.emit_session_create_event() OWNER TO postgres;
-- ddl-end --

-- object: emit_session_create_event | type: TRIGGER --
-- DROP TRIGGER IF EXISTS emit_session_create_event ON public.sessions CASCADE;
CREATE TRIGGER emit_session_create_event
	AFTER INSERT 
	ON public.sessions
	FOR EACH ROW
	EXECUTE PROCEDURE public.emit_session_create_event();
-- ddl-end --

-- object: public.user_contacts | type: TABLE --
-- DROP TABLE IF EXISTS public.user_contacts CASCADE;
CREATE TABLE public.user_contacts (
	user_id uuid NOT NULL,
	contact_id uuid NOT NULL,
	is_accepted boolean NOT NULL DEFAULT false,
	CONSTRAINT user_contacts_pk PRIMARY KEY (user_id,contact_id)

);
-- ddl-end --
-- ALTER TABLE public.user_contacts OWNER TO postgres;
-- ddl-end --

-- object: grant_4636335612 | type: PERMISSION --
GRANT SELECT,INSERT,UPDATE,DELETE
   ON TABLE public.messages
   TO "backend-server";
-- ddl-end --

-- object: grant_5945bb2664 | type: PERMISSION --
GRANT SELECT,INSERT
   ON TABLE public.sessions
   TO "backend-server";
-- ddl-end --

-- object: grant_b1283f8863 | type: PERMISSION --
GRANT SELECT,INSERT,UPDATE,DELETE
   ON TABLE public.session_events
   TO "backend-server";
-- ddl-end --

-- object: grant_62433e71ed | type: PERMISSION --
GRANT SELECT,INSERT
   ON TABLE public.server_journal
   TO "backend-server";
-- ddl-end --


