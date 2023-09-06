-- Scripturi pt SQL

-- Script pt creearea unei tabele USER
create table user(
    id int primary key AUTO_INCREMENT,
    name varchar(150),
    contactNumber varchar(10),
    email varchar(50),
    password varchar(20),
    status varchar(20),
    role varchar(20),
    UNIQUE(email)
);

-- Inserare row in tabela user

insert into user(name,contactNumber,email,password,status,role) values ('Admin','0751585652','cristinaspineanu_136@yahoo.com','admin','true','admin');

-- Script pt creearea unei tabele CATEGORY
create table category(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(300) NOT NULL,
    primary key(id)
);


-- Script pt creearea unei tabele CAR
create table car(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(300) NOT NULL,
    categoryId integer NOT NULL,
    description varchar(700),
    price integer,
    status varchar(40),
    primary key(id)
);

-- Script pt aranjarea tabelei car

SET @column_width = 70;
SELECT
  id,
  name,
  categoryId,
  SUBSTRING(description, 1, @column_width) AS description,
  price,
  status
FROM CAR;


-- Script pt aranjarea tabelei bill

SELECT
  id,
  uuid,
  name,
  email,
  contactNumber,
  paymentMethod,
  startDate,
  endDate,
  FORMAT(total, 0) AS total,
  SUBSTRING_INDEX(JSON_UNQUOTE(JSON_EXTRACT(carDetails, '$[0].name')), ' ', 1) AS carName,
  createdBy
FROM BILL;


-- Script pt creearea unei tabele BILL
create table bill(
    id int NOT NULL AUTO_INCREMENT,
    uuid varchar(400) NOT NULL,
    name varchar(300) NOT NULL,
    email varchar(300) NOT NULL,
    contactNumber varchar(20) NOT NULL,
    paymentMethod varchar(100) NOT NULL,
    total int NOT NULL,
    carDetails JSON DEFAULT NULL,
    createdBy varchar(300) NOT NULL,
    primary key(id)
);


--Adauga enddate si startdate
ALTER TABLE bill
ADD startDate DATE,
ADD endDate DATE;