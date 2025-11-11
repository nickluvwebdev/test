-- Delete Databse if it already existed and create a new one
DROP DATABASE IF EXISTS v_election;
CREATE DATABASE v_election;
USE v_election;

CREATE TABLE voters (
    id int primary key auto_increment,
    voter_id varchar(50) unique not null,
    phone_number varchar(20) not null,
    password text not null,
    has_voted int default 0
);

CREATE TABLE votes(
	id int primary key auto_increment,
    encrypted_vote blob not null,
    aes_nonce blob not null,
    aes_key_encrypt blob not null,
    signature blob not null,
    foreign key (id) references voters(id)
);

CREATE TABLE candidates(
	candidate_id int primary key auto_increment,
    ballot_number int unique not null,
    candidate_name text not null
);

INSERT INTO voters (voter_id, phone_number, password, has_voted)
VALUES ('V001', '0812345678', '$2b$12$e0RGlgh0UUMQDObvyGL8uOoGz7Bu3jyd9sVXVhthJp0FanmfLPvDW', 0);

ALTER TABLE votes 
  ADD COLUMN aes_key_encrypted BLOB,
  ADD COLUMN vote_hash VARCHAR(64);

alter table votes drop column aes_key_encrypt;

alter table votes drop column signature;

USE v_election;

CREATE TABLE IF NOT EXISTS candidates (
  candidate_id   INT PRIMARY KEY AUTO_INCREMENT,
  ballot_number  INT NOT NULL UNIQUE,
  candidate_name VARCHAR(150) NOT NULL
) ENGINE=InnoDB;

REPLACE INTO candidates (ballot_number, candidate_name) VALUES
  (1, 'Paulwit Fakfaiphol - Unity Party'),
  (2, 'Kittiyakarn Kaewmungkun - Chill Party'),
  (3, 'Ratchapon Netpu - True Change Party'),
  (4, 'Patcharapol Luksanakam - Forward Party');

CREATE TABLE votes_count (
  candidate_id INT NOT NULL,
  voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (candidate_id) REFERENCES candidates(candidate_id)
    ON UPDATE CASCADE ON DELETE RESTRICT
);

SELECT
  c.candidate_id,
  c.candidate_name,
  COUNT(vl.candidate_id) AS total_votes
FROM votes_count vl
JOIN candidates c ON c.candidate_id = vl.candidate_id
GROUP BY c.candidate_id, c.candidate_name
ORDER BY c.candidate_id ASC;

