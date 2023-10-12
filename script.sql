DROP DATABASE IF EXISTS ajoloferia;
CREATE DATABASE ajoloferia;
USE ajoloferia;

CREATE TABLE Roles (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    normalized_name VARCHAR(100) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE StallTypes (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    normalized_name VARCHAR(100) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE WeekDays (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    normalized_name VARCHAR(100) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE PaymentMethods (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    normalized_name VARCHAR(100) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Users (
    uuid VARCHAR(100) PRIMARY KEY NOT NULL,
    id_rol int NOT NULL,
    email VARCHAR(100) NOT NULL,
    ps VARCHAR(150) NOT NULL,
    user_name VARCHAR(50) NOT NULL,
    coins double NOT NULL,
    image_url varchar(200) NOT NULL,
    language_configured VARCHAR(20) NOT NULL,
    enabled bool NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_rol) REFERENCES Roles(id)
);

CREATE TABLE CreditCards (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    card_number varchar(20) NOT NULL,
    card_holder varchar(100) NOT NULL,
    card_expiration_month datetime NOT NULL,
    card_expiration_year int NOT NULL,
    normalized_name VARCHAR(100) NOT NULL,
    enabled bool NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE CouponTypes (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    normalized_name VARCHAR(100) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Coupons (
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
	FOREIGN KEY (id_coupon_type) REFERENCES CouponTypes(id)
);

CREATE TABLE ShopCoins (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    uuid_client VARCHAR(100) NOT NULL,
    uuid_employeer VARCHAR(100) NOT NULL,
    id_payment_method int NOT NULL,
    id_credit_card int NOT NULL,
    id_coupon int NOT NULL,
    cost double NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (uuid_client) REFERENCES Users(uuid),
    FOREIGN KEY (uuid_employeer) REFERENCES Users(uuid),
	FOREIGN KEY (id_payment_method) REFERENCES PaymentMethods(id),
	FOREIGN KEY (id_credit_card) REFERENCES CreditCards(id),
	FOREIGN KEY (id_coupon) REFERENCES Coupons(id)
);

CREATE TABLE QrCodes (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    uuid VARCHAR(100) NOT NULL,
    code_qr varchar(20) NOT NULL,
    expiration_time TIMESTAMP NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (uuid) REFERENCES Users(uuid)
);

CREATE TABLE Stalls (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_stall_type int NOT NULL,
    name varchar(100) NOT NULL,
    description varchar(2000) NOT NULL,
    image_url varchar(200) NOT NULL,
    cost double NOT NULL,
    minimun_height_cm int,
    enabled bool NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_stall_type) REFERENCES StallTypes(id)
);

CREATE TABLE Schedubles (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_stall int NOT NULL,
    id_week_day int NOT NULL,
    start_time time NOT NULL,
    end_time time NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_stall) REFERENCES Stalls(id),
    FOREIGN KEY (id_week_day) REFERENCES WeekDays(id)
);

CREATE TABLE EventDates (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_stall int NOT NULL,
    event_date datetime NOT NULL,
    event_hour time NOT NULL,
    duration_minutes double NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_stall) REFERENCES Stalls(id)
);

CREATE TABLE UserStalls (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_stall int NOT NULL,
    uuid VARCHAR(100) NOT NULL,
    description varchar(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_stall) REFERENCES Stalls(id),
    FOREIGN KEY (uuid) REFERENCES Users(uuid)
);

CREATE TABLE ReviewStalls (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_stall int NOT NULL,
    uuid VARCHAR(100) NOT NULL,
    description varchar(255) NOT NULL,
    points double NOT NULL,
    image_url varchar(255),
    enabled bool NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_stall) REFERENCES Stalls(id),
    FOREIGN KEY (uuid) REFERENCES Users(uuid)
);

CREATE TABLE Tickets (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    uuid_client VARCHAR(100) NOT NULL,
    uuid_employeer VARCHAR(100) NOT NULL,
    cost int NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (uuid_client) REFERENCES Users(uuid),
    FOREIGN KEY (uuid_employeer) REFERENCES Users(uuid)
);

CREATE TABLE OfferStalls (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_stall int NOT NULL,
    id_ticket int NOT NULL,
    description varchar(255) NOT NULL,
    end_time timestamp NOT NULL,
    image_url varchar(255),
    enabled bool NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_stall) REFERENCES Stalls(id),
    FOREIGN KEY (id_ticket) REFERENCES Tickets(id)
);

CREATE TABLE CostLessTickets (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_offer int NOT NULL,
    cost_per_person double NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_offer) REFERENCES OfferStalls(id)
);

CREATE TABLE BuyGets (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_offer int NOT NULL,
    amount_buyed double NOT NULL,
    amount_Getted double NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_offer) REFERENCES OfferStalls(id)
);