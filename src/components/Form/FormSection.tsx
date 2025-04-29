import React from 'react';
import { FormSection as FormSectionType, FormField as FormFieldt , ValidationErrors } from '../../types';
import FormField from './FormField';

interface FormSectionProps {
  section: FormSectionType;
  formData: Record<string, any>;
  errors: ValidationErrors;
  onChange: (fieldId: string, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const FormSection: React.FC<FormSectionProps> = ({
  section,
  formData,
  errors,
  onChange,
  onNext,
  onPrev,
  isFirst,
  isLast,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
        <p className="mt-2 text-gray-600">{section.description}</p>
      </div>

      <div className="space-y-4">
        {section.fields.map((field: FormFieldt) => (
          <FormField
            key={field.fieldId}
            field={field}
            value={formData[field.fieldId]}
            onChange={onChange}
            error={errors[field.fieldId]}
          />
        ))}
      </div>

      <div className="flex justify-between mt-8">
        {!isFirst && (
          <button
            type="button"
            onClick={onPrev}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Previous
          </button>
        )}
        
        {isFirst && <div></div>}
        
        {isLast ? (
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default FormSection;