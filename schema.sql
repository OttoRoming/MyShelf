CREATE TABLE users (
    id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT,
    password TEXT NOT NULL,
    is_admin BOOL NOT NULL DEFAULT FALSE
);

CREATE TABLE library (
    name TEXT PRIMARY KEY NOT NULL,
    is_public BOOL NOT NULL DEFAULT FALSE
);

CREATE TABLE library_access (
    user_id UUID NOT NULL REFERENCES users(id),
    library_name TEXT NOT NULL REFERENCES library(name),
    PRIMARY KEY (user_id, library_name)
);
