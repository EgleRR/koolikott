SET foreign_key_checks = 0;

CREATE TABLE Thumbnail (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  name varchar(250) COLLATE utf8_bin NOT NULL,
  data longblob NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
);

SET foreign_key_checks = 1;
