import { FormField, ValidationErrors } from '../types';

export const validateField = (
  field: FormField,
  value: string | string[] | boolean | undefined
): string => {
  // Check if required but empty
  if (field.required && (value === undefined || value === null || value === '')) {
    return field.validation?.message || `${field.label} is required`;
  }

  // Skip further validation if field is optional and empty
  if (!field.required && (value === undefined || value === null || value === '')) {
    return '';
  }

  // Type-specific validations
  if (typeof value === 'string') {
    // Minimum length validation
    if (field.minLength !== undefined && value.length < field.minLength) {
      return `${field.label} should be at least ${field.minLength} characters`;
    }

    // Maximum length validation
    if (field.maxLength !== undefined && value.length > field.maxLength) {
      return `${field.label} should not exceed ${field.maxLength} characters`;
    }

    // Email validation
    if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Please enter a valid email address';
    }

    // Phone number validation
    if (field.type === 'tel' && !/^\d{10}$/.test(value)) {
      return 'Please enter a valid 10-digit phone number';
    }
  }

  // For checkbox type
  if (field.type === 'checkbox' && field.required && value !== true) {
    return field.validation?.message || `${field.label} is required`;
  }

  return '';
};

export const validateSection = (
  fields: FormField[],
  formData: Record<string, any>
): ValidationErrors => {
  const errors: ValidationErrors = {};

  fields.forEach((field) => {
    const value = formData[field.fieldId];
    const error = validateField(field, value);
    
    if (error) {
      errors[field.fieldId] = error;
    }
  });

  return errors;
};

export const isSectionValid = (
  fields: FormField[],
  formData: Record<string, any>
): boolean => {
  const errors = validateSection(fields, formData);
  return Object.keys(errors).length === 0;
};