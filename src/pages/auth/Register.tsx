import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import FormField from "../../components/auth/FormField";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { useUser } from "@/context/UserContext";

// Define type for form errors
interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
}

const Register = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const { BackendUrl } = useUser();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password && formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    )
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const response = await fetch(`${BackendUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          role: formData.role
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      // Store token in localStorage or other state management
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      toast({
        title: "Registration successful",
        description: "Your account has been created successfully.",
      });
      
      // Navigate to home page
      navigate('/');
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mb-6">
        <h1 className="auth-title">Create an account</h1>
        <p className="auth-subtitle mt-2">Enter your information to get started</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            label="First name"
            id="firstName"
            placeholder="John"
            required
            autoComplete="given-name"
            error={errors.firstName}
            value={formData.firstName}
            onChange={handleChange}
          />

          <FormField
            label="Last name"
            id="lastName"
            placeholder="Doe"
            required
            autoComplete="family-name"
            error={errors.lastName}
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <FormField
          label="Email"
          id="email"
          type="email"
          placeholder="your.email@example.com"
          required
          autoComplete="email"
          error={errors.email}
          value={formData.email}
          onChange={handleChange}
        />

        <FormField
          label="Password"
          id="password"
          type="password"
          placeholder="••••••••"
          required
          autoComplete="new-password"
          error={errors.password}
          value={formData.password}
          onChange={handleChange}
        />

        <FormField
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          required
          autoComplete="new-password"
          error={errors.confirmPassword}
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <FormField
          label="Role"
          id="role"
          required
          error={errors.role}
          value={formData.role}
          onChange={handleChange}
        >
          <select id="role" name="role" className="auth-input" value={formData.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
          </select>
        </FormField>

        <button
          type="submit"
          className="auth-button"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating account...
            </span>
          ) : (
            "Create account"
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">Already have an account?</span>{" "}
        <Link to="/login" className="auth-link">
          Sign in
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Register;