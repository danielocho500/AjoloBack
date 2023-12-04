DROP DATABASE IF EXISTS ajoloferia;
CREATE DATABASE ajoloferia;
USE ajoloferia;

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    normalized_name VARCHAR(100) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stallTypes (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    normalized_name VARCHAR(100) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE weekDays (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    normalized_name VARCHAR(100) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE paymentMethods (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    normalized_name VARCHAR(100) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    uuid VARCHAR(100) PRIMARY KEY NOT NULL,
    id_rol int NOT NULL,
    email VARCHAR(100) NOT NULL,
    ps VARCHAR(150) NOT NULL,
    user_name VARCHAR(50) NOT NULL,
    coins double NOT NULL,
    image_url varchar(2000) NOT NULL,
    language_configured VARCHAR(20) NOT NULL,
    enabled bool NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_rol) REFERENCES roles(id)
);

CREATE TABLE creditCards (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    uuid_client VARCHAR(100) NOT NULL,
    card_number varchar(20) NOT NULL,
    card_holder varchar(100) NOT NULL,
    card_expiration_month int NOT NULL,
    card_expiration_year int NOT NULL,
    normalized_name VARCHAR(100) NOT NULL,
    enabled bool NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uuid_client) REFERENCES users(uuid)
);

CREATE TABLE couponTypes (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    normalized_name VARCHAR(100) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE coupons (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_coupon_type int NOT NULL,
    code_coupon varchar(20) NOT NULL,
    minimun_amount double,
    value_coupon double NOT NULL,
    expiration_time TIMESTAMP NOT NULL,
    uses_per_user int NOT NULL,
    total_uses int NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (id_coupon_type) REFERENCES couponTypes(id)
);

CREATE TABLE shopCoins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid_client VARCHAR(100) NOT NULL,
    uuid_employeer VARCHAR(100) NOT NULL,
    id_payment_method int NOT NULL,
    id_coupon int,
    cost double NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (uuid_client) REFERENCES users(uuid),
    FOREIGN KEY (uuid_employeer) REFERENCES users(uuid),
	FOREIGN KEY (id_payment_method) REFERENCES paymentMethods(id),
	FOREIGN KEY (id_coupon) REFERENCES coupons(id)
);

CREATE TABLE qrCodes (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    uuid VARCHAR(100) NOT NULL,
    code_qr varchar(20) NOT NULL,
    expiration_time TIMESTAMP NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (uuid) REFERENCES users(uuid)
);

CREATE TABLE stalls (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_stall_type int NOT NULL,
    name varchar(100) NOT NULL,
    description varchar(2000) NOT NULL,
    image_url varchar(5000) NOT NULL,
    cost double NOT NULL,
    minimun_height_cm int,
    enabled bool NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_stall_type) REFERENCES stallTypes(id)
);

CREATE TABLE schedubles (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_stall int NOT NULL,
    id_week_day int NOT NULL,
    start_time time NOT NULL,
    end_time time NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_stall) REFERENCES stalls(id),
    FOREIGN KEY (id_week_day) REFERENCES weekDays(id)
);

CREATE TABLE eventDates (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_stall int NOT NULL,
    event_date datetime NOT NULL,
    event_hour time NOT NULL,
    duration_minutes double NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_stall) REFERENCES stalls(id)
);

CREATE TABLE userStalls (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_stall int NOT NULL,
    uuid VARCHAR(100) NOT NULL,
    description varchar(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_stall) REFERENCES stalls(id),
    FOREIGN KEY (uuid) REFERENCES users(uuid)
);

CREATE TABLE reviewStalls (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_stall int NOT NULL,
    uuid VARCHAR(100) NOT NULL,
    description varchar(255) NOT NULL,
    points double NOT NULL,
    image_url varchar(255),
    enabled bool NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_stall) REFERENCES stalls(id),
    FOREIGN KEY (uuid) REFERENCES users(uuid)
);

CREATE TABLE tickets (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    uuid_client VARCHAR(100) NOT NULL,
    uuid_employeer VARCHAR(100) NOT NULL,
    cost int NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (uuid_client) REFERENCES users(uuid),
    FOREIGN KEY (uuid_employeer) REFERENCES users(uuid)
);

CREATE TABLE offerStalls (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_stall int NOT NULL,
    id_ticket int NOT NULL,
    description varchar(255) NOT NULL,
    end_time timestamp NOT NULL,
    image_url varchar(255),
    enabled bool NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_stall) REFERENCES stalls(id),
    FOREIGN KEY (id_ticket) REFERENCES tickets(id)
);

CREATE TABLE costLessTickets (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_offer int NOT NULL,
    cost_per_person double NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_offer) REFERENCES offerStalls(id)
);


INSERT INTO `ajoloferia`.`paymentmethods` (`normalized_name`) VALUES ('Contado');  # method -> 1
INSERT INTO `ajoloferia`.`paymentmethods` (`normalized_name`) VALUES ('Crédito');  # method -> 2

INSERT INTO `ajoloferia`.`coupontypes` (`normalized_name`) VALUES ('Descuento del 10%');   # method -> 1
INSERT INTO `ajoloferia`.`coupontypes` (`normalized_name`) VALUES ('Descuento del 20%'); # method -> 2

INSERT INTO `ajoloferia`.`coupons` (`id_coupon_type`, `code_coupon`, `minimun_amount`, `value_coupon`, `expiration_time`, `uses_per_user`, `total_uses`) VALUES ('1', '3F34F3', '1', '1', '2023-11-29 13:53:17', '1', '1');


INSERT INTO roles (id, normalized_name, createdAt, updatedAt) VALUES (1, 'CLIENT', NOW(), NOW());
INSERT INTO roles (id, normalized_name, createdAt, updatedAt) VALUES (2, 'ADMIN', NOW(), NOW());
INSERT INTO roles (id, normalized_name, createdAt, updatedAt) VALUES (3, 'EMPLOYEER', NOW(), NOW());
INSERT INTO roles (id, normalized_name, createdAt, updatedAt) VALUES (4, 'STALLEMPLOYEER', NOW(), NOW());

INSERT INTO users (uuid, id_rol, email, ps, user_name, coins, image_url, language_configured, enabled, createdAt, updatedAt) VALUES ('a133a4ac-25ce-4e18-9943-e6897f4d1c3d', 2, 'paponcio@gmail.com', '$2b$10$ZUP5Jo4344Oifn0yPGAT2eQPSslozoJWiIlnBAngVTmHqPZNAh6c2', 'Patron', 0, '', '', true, NOW(), NOW());

INSERT INTO stallTypes (id, normalized_name, createdAt, updatedAt) VALUES (1, 'EVENT', NOW(), NOW());
INSERT INTO stallTypes (id, normalized_name, createdAt, updatedAt) VALUES (2, 'ATTRACTION', NOW(), NOW());
