DROP DATABASE IF EXISTS potluck_db;

CREATE DATABASE potluck_db;

use potluck_db;

CREATE TABLE people(
    id INT(50) NOT NULL AUTO_INCREMENT,
    Firstname VARCHAR(50),
    food VARCHAR(255),
    PRIMARY KEY (id)
);

INSERT INTO people(Firstname, food)
VALUES("Brenda", "Bread");