import React from 'react';
import { FormField as FormFieldType } from '../../types';

interface FormFieldProps {
  field: FormFieldType;
  value: any;
  onChange: (fieldId: string, value: any) => void;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({ field, value, onChange, error }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (field.type === 'checkbox') {
      if (e.target instanceof HTMLInputElement) {
        onChange(field.fieldId, e.target.checked);
      }
    } else {
      onChange(field.fieldId, e.target.value);
    }
  };

  const renderField = () => {
    const commonProps = {
      id: field.fieldId,
      'data-testid': field.dataTestId,
      placeholder: field.placeholder,
      required: field.required,
      className: `mt-1 block w-full px-3 py-2 border ${
        error ? 'border-red-500' : 'border-gray-300'
      } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm`,
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
        return (
          <input
            type={field.type}
            value={value || ''}
            onChange={handleChange}
            maxLength={field.maxLength}
            minLength={field.minLength}
            {...commonProps}
          />
        );
      
      case 'date':
        return (
          <input
            type="date"
            value={value || ''}
            onChange={handleChange}
            {...commonProps}
          />
        );
      
      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={handleChange}
            maxLength={field.maxLength}
            minLength={field.minLength}
            rows={4}
            {...commonProps}
          />
        );
      
      case 'dropdown':
        return (
          <select
            value={value || ''}
            onChange={handleChange}
            {...commonProps}
          >
            <option value="">Select an option</option>
            {field.options?.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                data-testid={option.dataTestId}
              >
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'radio':
        return (
          <div className="mt-2 space-y-2">
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  type="radio"
                  id={`${field.fieldId}-${option.value}`}
                  name={field.fieldId}
                  value={option.value}
                  checked={value === option.value}
                  onChange={handleChange}
                  data-testid={option.dataTestId}
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label 
                  htmlFor={`${field.fieldId}-${option.value}`}
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );
      
      case 'checkbox':
        return (
          <div className="mt-2 flex items-center">
            <input
              type="checkbox"
              checked={value === true}
              onChange={handleChange}
              {...commonProps}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label 
              htmlFor={field.fieldId}
              className="ml-3 block text-sm font-medium text-gray-700"
            >
              {field.label}
            </label>
          </div>
        );
      
      default:
        return <div>Unsupported field type: {field.type}</div>;
    }
  };

  
  if (field.type === 'checkbox') {
    return (
      <div className="mb-4">
        {renderField()}
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label 
        htmlFor={field.fieldId}
        className="block text-sm font-medium text-gray-700"
      >
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderField()}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormField;
