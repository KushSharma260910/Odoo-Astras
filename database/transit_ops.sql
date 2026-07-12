-- ===========================================================
-- DATABASE : TransitOps
-- Smart Transport Operations Platform
-- MySQL 8.0+
-- ===========================================================

DROP DATABASE IF EXISTS transit_ops;
CREATE DATABASE transit_ops;
USE transit_ops;

-- ===========================================================
-- USERS TABLE
-- ===========================================================

CREATE TABLE users (
user_id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(120) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,

role ENUM(
'Fleet Manager',
'Driver',
'Safety Officer',
'Financial Analyst'
) NOT NULL,

status ENUM(
'ACTIVE',
'INACTIVE'
) DEFAULT 'ACTIVE',

last_login TIMESTAMP NULL,

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================================
-- VEHICLES TABLE
-- ===========================================================

CREATE TABLE vehicles (

vehicle_id INT AUTO_INCREMENT PRIMARY KEY,

registration_number VARCHAR(30) NOT NULL UNIQUE,

vehicle_name VARCHAR(100) NOT NULL,

vehicle_type ENUM(
'Truck',
'Van',
'Pickup',
'Bus',
'Mini Truck'
) NOT NULL,

max_load_capacity DECIMAL(10,2) NOT NULL,

odometer DECIMAL(12,2) DEFAULT 0,

acquisition_cost DECIMAL(12,2),

purchase_date DATE,

status ENUM(
'AVAILABLE',
'ON_TRIP',
'IN_SHOP',
'RETIRED'
) DEFAULT 'AVAILABLE',

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================================
-- DRIVERS TABLE
-- ===========================================================

CREATE TABLE drivers (

driver_id INT AUTO_INCREMENT PRIMARY KEY,

name VARCHAR(100) NOT NULL,

license_number VARCHAR(60) NOT NULL UNIQUE,

license_category VARCHAR(30),

license_expiry DATE NOT NULL,

contact_number VARCHAR(20),

safety_score DECIMAL(4,2) DEFAULT 100.00,

ALTER TABLE drivers
ADD user_id INT UNIQUE;

ALTER TABLE drivers
ADD CONSTRAINT fk_driver_user
FOREIGN KEY (user_id)
REFERENCES users(user_id)
ON DELETE CASCADE;

status ENUM(
'AVAILABLE',
'ON_TRIP',
'OFF_DUTY',
'SUSPENDED'
) DEFAULT 'AVAILABLE',

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================================
-- TRIPS TABLE
-- ===========================================================

CREATE TABLE trips (

trip_id INT AUTO_INCREMENT PRIMARY KEY,

vehicle_id INT NOT NULL,

driver_id INT NOT NULL,

source VARCHAR(150) NOT NULL,

destination VARCHAR(150) NOT NULL,

cargo_weight DECIMAL(10,2) NOT NULL,

planned_distance DECIMAL(10,2),

actual_distance DECIMAL(10,2),

fuel_used DECIMAL(8,2) DEFAULT 0,

revenue DECIMAL(12,2) DEFAULT 0,

start_time DATETIME,

end_time DATETIME,

status ENUM(
'DRAFT',
'DISPATCHED',
'COMPLETED',
'CANCELLED'
) DEFAULT 'DRAFT',

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

CONSTRAINT fk_trip_vehicle
FOREIGN KEY(vehicle_id)
REFERENCES vehicles(vehicle_id)
ON UPDATE CASCADE
ON DELETE RESTRICT,

CONSTRAINT fk_trip_driver
FOREIGN KEY(driver_id)
REFERENCES drivers(driver_id)
ON UPDATE CASCADE
ON DELETE RESTRICT
);

-- ===========================================================
-- MAINTENANCE TABLE
-- ===========================================================

CREATE TABLE maintenance (

maintenance_id INT AUTO_INCREMENT PRIMARY KEY,

vehicle_id INT NOT NULL,

maintenance_type VARCHAR(100),

description TEXT,

cost DECIMAL(12,2),

start_date DATE,

completion_date DATE,

status ENUM(
'PENDING',
'IN_PROGRESS',
'COMPLETED'
) DEFAULT 'PENDING',

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

CONSTRAINT fk_maintenance_vehicle
FOREIGN KEY(vehicle_id)
REFERENCES vehicles(vehicle_id)
ON UPDATE CASCADE
ON DELETE RESTRICT
);

-- ===========================================================
-- FUEL LOGS
-- ===========================================================

CREATE TABLE fuel_logs (

fuel_log_id INT AUTO_INCREMENT PRIMARY KEY,

vehicle_id INT NOT NULL,

trip_id INT,

fuel_date DATE NOT NULL,

liters DECIMAL(8,2) NOT NULL,

cost DECIMAL(10,2) NOT NULL,

odometer DECIMAL(10,2),

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

CONSTRAINT fk_fuel_vehicle
FOREIGN KEY(vehicle_id)
REFERENCES vehicles(vehicle_id)
ON UPDATE RESTRICT
ON DELETE CASCADE,

CONSTRAINT fk_fuel_trip
FOREIGN KEY(trip_id)
REFERENCES trips(trip_id)
ON UPDATE CASCADE
ON DELETE SET NULL
);

-- ===========================================================
-- EXPENSES
-- ===========================================================

CREATE TABLE expenses (

expense_id INT AUTO_INCREMENT PRIMARY KEY,

vehicle_id INT NOT NULL,

trip_id INT,

expense_type ENUM(
'Fuel',
'Maintenance',
'Repair',
'Parking',
'Insurance',
'Toll'
) NOT NULL,

amount DECIMAL(12,2) NOT NULL,

expense_date DATE NOT NULL,

remarks TEXT,

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

CONSTRAINT fk_expense_vehicle
FOREIGN KEY(vehicle_id)
REFERENCES vehicles(vehicle_id)
ON UPDATE CASCADE
ON DELETE RESTRICT,

CONSTRAINT fk_expense_trip
FOREIGN KEY(trip_id)
REFERENCES trips(trip_id)
ON UPDATE CASCADE
ON DELETE SET NULL
);

-- ===========================================================
-- VEHICLE DOCUMENTS
-- ===========================================================

CREATE TABLE vehicle_documents (

document_id INT AUTO_INCREMENT PRIMARY KEY,

vehicle_id INT NOT NULL,

document_name VARCHAR(100),

document_number VARCHAR(100),

expiry_date DATE,

file_path VARCHAR(255),

status ENUM(
'VALID',
'EXPIRED'
) DEFAULT 'VALID',

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

CONSTRAINT fk_document_vehicle
FOREIGN KEY(vehicle_id)
REFERENCES vehicles(vehicle_id)
ON UPDATE CASCADE
ON DELETE CASCADE
);

-- ===========================================================
-- TRIP HISTORY
-- ===========================================================

CREATE TABLE trip_history (

history_id INT AUTO_INCREMENT PRIMARY KEY,

trip_id INT NOT NULL,

old_status VARCHAR(30),

new_status VARCHAR(30),

changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

changed_by INT,

remarks TEXT,

CONSTRAINT fk_history_trip
FOREIGN KEY(trip_id)
REFERENCES trips(trip_id)
ON DELETE CASCADE,

CONSTRAINT fk_history_user
FOREIGN KEY(changed_by)
REFERENCES users(user_id)
ON DELETE SET NULL
);

-- ===========================================================
-- INDEXES
-- ===========================================================

CREATE INDEX idx_vehicle_status
ON vehicles(status);

CREATE INDEX idx_vehicle_registration
ON vehicles(registration_number);

CREATE INDEX idx_driver_status
ON drivers(status);

CREATE INDEX idx_driver_license
ON drivers(license_expiry);

CREATE INDEX idx_trip_status
ON trips(status);

CREATE INDEX idx_trip_vehicle
ON trips(vehicle_id);

CREATE INDEX idx_trip_driver
ON trips(driver_id);

CREATE INDEX idx_maintenance_vehicle
ON maintenance(vehicle_id);

CREATE INDEX idx_fuel_vehicle
ON fuel_logs(vehicle_id);

CREATE INDEX idx_expense_vehicle
ON expenses(vehicle_id);

CREATE INDEX idx_trip_dates
ON trips(start_time, end_time);

CREATE INDEX idx_fuel_trip
ON fuel_logs(trip_id);

CREATE INDEX idx_expense_trip
ON expenses(trip_id);

CREATE INDEX idx_maintenance_status
ON maintenance(status);

CREATE INDEX idx_users_role
ON users(role);

CREATE INDEX idx_users_email
ON users(email);


-- ===========================================================
-- SAMPLE BUSINESS RULE CHECKS
-- ===========================================================

-- Available Vehicles
SELECT *
FROM vehicles
WHERE status='AVAILABLE';

-- Available Drivers
SELECT *
FROM drivers
WHERE status='AVAILABLE';

-- Drivers with Expired Licenses
SELECT *
FROM drivers
WHERE license_expiry < CURDATE();

-- Vehicles Currently in Maintenance
SELECT *
FROM vehicles
WHERE status='IN_SHOP';

-- Fleet Utilization
SELECT
ROUND(
COUNT(CASE WHEN status='ON_TRIP' THEN 1 END)
* 100.0/
COUNT(*),2
) AS fleet_utilization
FROM vehicles;

-- Total Fuel Cost Per Vehicle
SELECT
v.vehicle_name,
SUM(f.cost) AS total_fuel_cost
FROM vehicles v
JOIN fuel_logs f
ON v.vehicle_id=f.vehicle_id
GROUP BY v.vehicle_name;

-- Total Maintenance Cost
SELECT
v.vehicle_name,
SUM(m.cost) AS maintenance_cost
FROM vehicles v
JOIN maintenance m
ON v.vehicle_id=m.vehicle_id
GROUP BY v.vehicle_name;

-- Operational Cost
SELECT
v.vehicle_name,
COALESCE(SUM(e.amount),0) AS operational_cost
FROM vehicles v
LEFT JOIN expenses e
ON v.vehicle_id=e.vehicle_id
GROUP BY v.vehicle_name;

-- Vehicles On Trip
SELECT
vehicle_name,
registration_number
FROM vehicles
WHERE status='ON_TRIP';

-- Trips with Driver & Vehicle Details
SELECT
t.trip_id,
v.vehicle_name,
d.name AS driver_name,
t.source,
t.destination,
t.status
FROM trips t
JOIN vehicles v
ON t.vehicle_id=v.vehicle_id
JOIN drivers d
ON t.driver_id=d.driver_id;
