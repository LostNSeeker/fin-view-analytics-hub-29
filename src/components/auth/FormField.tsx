import React from "react";
import { Eye, EyeOff } from "lucide-react";

interface FormFieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  children?: React.ReactNode;
}

const FormField = ({
  label,
  id,
  type = "text",
  placeholder,
  required = false,
  error,
  autoComplete,
  value,
  onChange,
  children,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;

  return (
    <div className="auth-field">
      <label htmlFor={id} className="auth-label">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <div className="relative">
        {children || (
          <input
            id={id}
            name={id}
            type={inputType}
            className="auth-input"
            placeholder={placeholder}
            required={required}
            autoComplete={autoComplete}
            value={value}
            onChange={onChange}
          />
        )}
        {isPasswordField && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff size={18} className="text-muted-foreground" />
            ) : (
              <Eye size={18} className="text-muted-foreground" />
            )}
          </button>
        )}
      </div>
      {error && <p className="auth-error">{error}</p>}
    </div>
  );
};

export default FormField;