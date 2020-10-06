CREATE DATABASE matcha;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name varchar(50)
);

CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	first_name VARCHAR (100) NOT NULL,
	last_name VARCHAR (100) NOT NULL,
	username VARCHAR (100) NOT NULL, 
	email VARCHAR (255) NOT NULL, 
	verified SMALLINT NOT NULL DEFAULT '0', 
	token varchar(255) DEFAULT NULL, 
	password VARCHAR (500) NOT NULL, 
	gender varchar (50), 
	bio varchar (1000), 
	tags varchar (500)
);