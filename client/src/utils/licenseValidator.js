// CDL License Level Verifications

const LICENSE_HIERARCHY = {
  'Class A CDL': 3,
  'Class B CDL': 2,
  'Class C CDL': 1,
  'Standard': 0
};

const VEHICLE_LICENSE_REQUIREMENTS = {
  'Semi-Truck': 'Class A CDL',
  'Heavy Duty': 'Class A CDL',
  'Reefer Cab': 'Class A CDL',
  'Reefer': 'Class A CDL',
  'Flatbed Cab': 'Class A CDL',
  'Flatbed': 'Class A CDL',
  'Medium Duty': 'Class B CDL',
  'Cargo Van': 'Standard'
};

export const getVehicleRequiredLicense = (vehicleType) => {
  return VEHICLE_LICENSE_REQUIREMENTS[vehicleType] || 'Class A CDL';
};

export const validateCdlRequirement = (vehicleType, driverLicenseType) => {
  const required = getVehicleRequiredLicense(vehicleType);
  
  const driverLevel = LICENSE_HIERARCHY[driverLicenseType] || 0;
  const requiredLevel = LICENSE_HIERARCHY[required] || 0;

  return {
    valid: driverLevel >= requiredLevel,
    requiredLicense: required,
    driverLicense: driverLicenseType
  };
};
