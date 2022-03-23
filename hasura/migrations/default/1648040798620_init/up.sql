SET check_function_bodies = false;
CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE public.classroom_enrollments (
    classroom_id uuid NOT NULL,
    user_id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.classrooms (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    title text NOT NULL,
    description text,
    created_by text NOT NULL
);
CREATE TABLE public.resources (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    published boolean DEFAULT false NOT NULL,
    classroom_id uuid NOT NULL,
    type text DEFAULT 'NOTE'::text NOT NULL,
    schedule timestamp with time zone,
    schedule_id text
);
CREATE TABLE public.submissions (
    assignment_id uuid NOT NULL,
    student_id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    content text NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.users (
    id text NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    fullname text NOT NULL,
    role text DEFAULT 'STUDENT'::text NOT NULL,
    profile_picture text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE ONLY public.classroom_enrollments
    ADD CONSTRAINT classroom_enrollments_pkey PRIMARY KEY (classroom_id, user_id);
ALTER TABLE ONLY public.classrooms
    ADD CONSTRAINT classrooms_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.resources
    ADD CONSTRAINT resourses_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.submissions
    ADD CONSTRAINT submissions_pkey PRIMARY KEY (assignment_id, student_id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
CREATE TRIGGER set_public_classrooms_updated_at BEFORE UPDATE ON public.classrooms FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_classrooms_updated_at ON public.classrooms IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_resourses_updated_at BEFORE UPDATE ON public.resources FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_resourses_updated_at ON public.resources IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_submissions_updated_at BEFORE UPDATE ON public.submissions FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_submissions_updated_at ON public.submissions IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_users_updated_at ON public.users IS 'trigger to set value of column "updated_at" to current timestamp on row update';
ALTER TABLE ONLY public.classroom_enrollments
    ADD CONSTRAINT classroom_enrollments_classroom_id_fkey FOREIGN KEY (classroom_id) REFERENCES public.classrooms(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.classroom_enrollments
    ADD CONSTRAINT classroom_enrollments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.classrooms
    ADD CONSTRAINT classrooms_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.resources
    ADD CONSTRAINT resourses_classroom_id_fkey FOREIGN KEY (classroom_id) REFERENCES public.classrooms(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.submissions
    ADD CONSTRAINT submissions_assignment_id_fkey FOREIGN KEY (assignment_id) REFERENCES public.resources(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.submissions
    ADD CONSTRAINT submissions_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
