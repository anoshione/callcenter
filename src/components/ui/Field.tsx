import React from 'react';
import { AlertCircle, CheckCircle2, ChevronDown } from 'lucide-react';

export type FieldStatus = 'default' | 'success' | 'error';

export interface BaseFieldProps {
  label?: string;
  name?: string;
  id?: string;
  status?: FieldStatus;
  message?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface InputFieldProps
  extends BaseFieldProps,
    React.InputHTMLAttributes<HTMLInputElement> {}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  id = name,
  status = 'default',
  message,
  required = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const getBorderColor = () => {
    if (disabled) return 'border-grey-3 bg-grey-2 text-grey-4 cursor-not-allowed';
    if (status === 'error') return 'border-error text-text focus:ring-error/20 focus:border-error';
    if (status === 'success') return 'border-success text-text focus:ring-success/20 focus:border-success';
    return 'border-grey-3 text-text focus:border-secondary focus:ring-secondary/20';
  };

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-14 font-medium text-text flex items-center gap-1">
          <span>{label}</span>
          {required && <span className="text-error" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          id={id}
          name={name}
          disabled={disabled}
          required={required}
          aria-invalid={status === 'error'}
          aria-describedby={message ? `${id}-feedback` : undefined}
          className={`w-full rounded-16 border bg-surface px-16 py-12 text-14 outline-none transition-all duration-fast placeholder:text-grey-4 ${getBorderColor()}`}
          {...props}
        />

        {status === 'error' && (
          <div className="absolute right-3 pointer-events-none text-error">
            <AlertCircle className="h-5 w-5" />
          </div>
        )}

        {status === 'success' && (
          <div className="absolute right-3 pointer-events-none text-success">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        )}
      </div>

      {message && (
        <div
          id={`${id}-feedback`}
          className={`flex items-center gap-1.5 text-12 ${
            status === 'error' ? 'text-error' : status === 'success' ? 'text-success' : 'text-grey-5'
          }`}
        >
          {status === 'error' && <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />}
          {status === 'success' && <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />}
          <span>{message}</span>
        </div>
      )}
    </div>
  );
};

export interface SelectFieldProps
  extends BaseFieldProps,
    React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string }[];
  placeholder?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  id = name,
  status = 'default',
  message,
  required = false,
  disabled = false,
  options,
  placeholder,
  className = '',
  ...props
}) => {
  const getBorderColor = () => {
    if (disabled) return 'border-grey-3 bg-grey-2 text-grey-4 cursor-not-allowed';
    if (status === 'error') return 'border-error text-text focus:border-error';
    if (status === 'success') return 'border-success text-text focus:border-success';
    return 'border-grey-3 text-text focus:border-secondary';
  };

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-14 font-medium text-text flex items-center gap-1">
          <span>{label}</span>
          {required && <span className="text-error" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative w-full">
        <select
          id={id}
          name={name}
          disabled={disabled}
          required={required}
          aria-invalid={status === 'error'}
          className={`w-full appearance-none rounded-16 border bg-surface pl-16 pr-48 py-12 text-14 outline-none transition-all duration-fast cursor-pointer ${getBorderColor()}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 text-grey-5 flex items-center justify-center">
          <ChevronDown size={18} strokeWidth={2.25} />
        </div>
      </div>

      {message && (
        <span
          className={`text-12 ${
            status === 'error' ? 'text-error' : status === 'success' ? 'text-success' : 'text-grey-5'
          }`}
        >
          {message}
        </span>
      )}
    </div>
  );
};

export interface TextareaFieldProps
  extends BaseFieldProps,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  name,
  id = name,
  status = 'default',
  message,
  required = false,
  disabled = false,
  className = '',
  rows = 4,
  ...props
}) => {
  const getBorderColor = () => {
    if (disabled) return 'border-grey-3 bg-grey-2 text-grey-4 cursor-not-allowed';
    if (status === 'error') return 'border-error text-text focus:border-error';
    if (status === 'success') return 'border-success text-text focus:border-success';
    return 'border-grey-3 text-text focus:border-secondary';
  };

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-14 font-medium text-text flex items-center gap-1">
          <span>{label}</span>
          {required && <span className="text-error" aria-hidden="true">*</span>}
        </label>
      )}

      <textarea
        id={id}
        name={name}
        rows={rows}
        disabled={disabled}
        required={required}
        aria-invalid={status === 'error'}
        className={`w-full rounded-16 border bg-surface px-16 py-12 text-14 outline-none transition-all duration-fast resize-none placeholder:text-grey-4 ${getBorderColor()}`}
        {...props}
      />

      {message && (
        <span
          className={`text-12 ${
            status === 'error' ? 'text-error' : status === 'success' ? 'text-success' : 'text-grey-5'
          }`}
        >
          {message}
        </span>
      )}
    </div>
  );
};
