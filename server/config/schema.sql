-- Create the database
CREATE DATABASE IF NOT EXISTS perf_db;
USE perf_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    type ENUM('ESTABLISHEMENT', 'PARTICULIER', 'ADMIN') NOT NULL,
    roles JSON NOT NULL,
    customers JSON,  -- Store array of customer IDs for establishments
    age INT,
    height INT,
    weight INT,
    gender VARCHAR(10),
    has_allergies BOOLEAN,
    allergies_details TEXT,
    has_medical_conditions BOOLEAN,
    medical_conditions_details TEXT,
    plan JSON,  -- Store plan information directly in JSON format
    burned_calories JSON, -- Store burned calories data in JSON format
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
