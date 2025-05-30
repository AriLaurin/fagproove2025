import React from 'react';

// Function to sanitize input and prevent XSS
const sanitizeInput = (input: string): string => {
  // Remove any HTML tags
  const withoutHtml = input.replace(/<[^>]*>/g, '');
  
  const sanitized = withoutHtml
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/on\w+=/gi, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');

  return sanitized;
};

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
  ariaLabel: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  label,
  placeholder,
  ariaLabel
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const sanitizedValue = sanitizeInput(e.target.value);
    onChange(sanitizedValue);
  };

  return (
    <div className="text-area-wrapper">
      <h3>{label}</h3>
      <textarea
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={15}
        aria-label={ariaLabel}
      />
    </div>
  );
}; 