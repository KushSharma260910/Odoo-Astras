// Cargo Weight Capacity Thresholds (Lbs)

const VEHICLE_MAX_CAPACITIES = {
  'Semi-Truck': 45000,
  'Heavy Duty': 50000,
  'Flatbed Cab': 48000,
  'Flatbed': 48000,
  'Reefer Cab': 42050,
  'Reefer': 42050,
  'Medium Duty': 26000,
  'Cargo Van': 5000,
  'Hazmat': 35000
};

export const getVehicleMaxCapacity = (vehicleType) => {
  return VEHICLE_MAX_CAPACITIES[vehicleType] || 40000; // Default fallback to 40,000 lbs
};

export const validateCargoFit = (vehicleType, cargoWeightLbs) => {
  const weight = parseInt(cargoWeightLbs, 10) || 0;
  const maxCap = getVehicleMaxCapacity(vehicleType);
  
  return {
    fits: weight <= maxCap,
    maxCapacity: maxCap,
    marginLbs: maxCap - weight
  };
};
