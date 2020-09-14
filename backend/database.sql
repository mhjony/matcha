CREATE DATABASE matcha;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name varchar(50)
);

CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	name VARCHAR (50) NOT NULL,
	username VARCHAR (50) NOT NULL,
	email VARCHAR (255) NOT NULL,
	verified SMALLINT NOT NULL DEFAULT '0',
	token varchar(255) DEFAULT NULL,
	password VARCHAR (50) NOT NULL,
	recieveEmail varchar(255) NOT NULL DEFAULT '0'	
);