CREATE DATABASE buildit;
USE buildit;
CREATE TABLE tournaments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    organizerName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    phoneNumber VARCHAR(20) NOT NULL,
    matchTitle VARCHAR(255) NOT NULL,
    matchImage VARCHAR(255), 
    matchDate DATE NOT NULL,
    venue VARCHAR(255) NOT NULL,
    regnFees VARCHAR(50) NOT NULL,
    matchType VARCHAR(100) NOT NULL
);
