// General Form Validators

export const emailPattern = {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  message: 'Invalid email address format'
};

export const phonePattern = {
  value: /^\+?[1-9]\d{1,14}$/,
  message: 'Invalid phone number format (must include country code)'
};

export const alphanumericPattern = {
  value: /^[a-zA-Z0-9]+$/,
  message: 'Only alphanumeric characters allowed'
};

export const numericPattern = {
  value: /^\d+$/,
  message: 'Only digits allowed'
};

export const validateRequired = (fieldName) => ({
  required: `${fieldName} is a required field`
});

export const validateMinLength = (fieldName, min) => ({
  minLength: {
    value: min,
    message: `${fieldName} must be at least ${min} characters long`
  }
});
