-- Drop tables

DROP TABLE IF EXISTS Material_Author;
DROP TABLE IF EXISTS Material;
DROP TABLE IF EXISTS Author;

-- Create tables

CREATE TABLE Author (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	surname varchar(255) NOT NULL
);

CREATE TABLE Material (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	day SMALLINT,
	month SMALLINT,
	year INTEGER
);

CREATE TABLE Material_Author (
	material BIGINT NOT NULL,
	author BIGINT NOT NULL,
	
	FOREIGN KEY (material) 
        REFERENCES Material(id)
        ON DELETE RESTRICT,
	
	FOREIGN KEY (author)
        REFERENCES Author(id)
        ON DELETE RESTRICT
);