CREATE DATABASE  recipe;

\c recipe;

CREATE TABLE  users (
    id serial PRIMARY KEY NOT NULL,
    name VARCHAR (80) NOT NULL,
    email VARCHAR (100) NOT NULL,
    image  VARCHAR (200) NOT Null,
    recipes text[] UNIQUE 
);
