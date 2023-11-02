CREATE DATABASE  recipe;

\c recipe;

CREATE TABLE  users (
    id serial PRIMARY KEY NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    image  text NOT Null,
    recipes text[]
);

