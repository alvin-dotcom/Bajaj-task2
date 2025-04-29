import React, { useState, useEffect } from 'react';
import { Form, FormSection, ValidationErrors } from '../../types';
import FormSectionComponent from './FormSection';
import { validateSection, isSectionValid } from '../../utils/validation';

interface DynamicFormProps {
  form: Form;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ form }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [sectionValidity, setSectionValidity] = useState<boolean[]>([]);

  // Initialize section validity array
  useEffect(() => {
    setSectionValidity(new Array(form.sections.length).fill(false));
  }, [form.sections.length]);

  const currentSection = form.sections[currentSectionIndex];

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));

    // Clear error for the field when it changes
    if (errors[fieldId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const validateCurrentSection = (): boolean => {
    const currentSectionErrors = validateSection(currentSection.fields, formData);
    setErrors(currentSectionErrors);
    const isValid = Object.keys(currentSectionErrors).length === 0;
    
    // Update section validity
    const newSectionValidity = [...sectionValidity];
    newSectionValidity[currentSectionIndex] = isValid;
    setSectionValidity(newSectionValidity);
    
    return isValid;
  };

  const handleNext = () => {
    if (validateCurrentSection()) {
      setCurrentSectionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentSectionIndex((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateCurrentSection()) {
      console.log('Form submitted with data:', formData);
      // Here you can add additional submit logic if needed
      alert('Form submitted successfully! Check the console for data.');
    }
  };

  // Calculate progress percentage
  const progress = ((currentSectionIndex + 1) / form.sections.length) * 100;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">{form.formTitle}</h1>
      
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs mb-1">
          <span>Section {currentSectionIndex + 1} of {form.sections.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-indigo-600 h-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <FormSectionComponent
          section={currentSection}
          formData={formData}
          errors={errors}
          onChange={handleFieldChange}
          onNext={handleNext}
          onPrev={handlePrev}
          isFirst={currentSectionIndex === 0}
          isLast={currentSectionIndex === form.sections.length - 1}
        />
      </form>
    </div>
  );
};

export default DynamicForm;