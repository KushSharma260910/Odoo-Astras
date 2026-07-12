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
*100.0/
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