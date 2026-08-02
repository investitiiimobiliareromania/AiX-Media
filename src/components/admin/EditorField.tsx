import React from 'react';

interface EditorFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'textarea' | 'select' | 'date';
  options?: { value: string; label: string }[];
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  required?: boolean;
}

export function EditorField({ label, name, type = 'text', options, placeholder, value, onChange, required }: EditorFieldProps) {
  const baseClasses = "w-full bg-transparent border-b border-border py-3 text-lg focus:outline-none focus:border-foreground transition-colors";

  return (
    <div className="mb-8">
      <label htmlFor={name} className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          className={`${baseClasses} resize-none min-h-[120px]`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      ) : type === 'select' ? (
        <select
          id={name}
          name={name}
          className={baseClasses}
          value={value}
          onChange={onChange}
          required={required}
        >
          <option value="" disabled>Selectează {label}</option>
          {options?.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          className={baseClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
    </div>
  );
}
