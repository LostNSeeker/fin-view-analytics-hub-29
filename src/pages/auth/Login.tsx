import { useState } from "react";
import AuthLayout from "../../components/auth/AuthLayout";
import FormField from "../../components/auth/FormField";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const Login = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form validation
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        // Show success toast
        toast({
          title: "Success",
          description: "You have been logged in successfully.",
        });
      }, 1500);
    } else {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mb-6">
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle mt-2">Sign in to your account to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
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
          autoComplete="current-password"
          error={errors.password}
          value={formData.password}
          onChange={handleChange}
        />

        <div className="flex justify-end">
          <Link to="/forgot-password" className="auth-link text-sm">
            Forgot password?
          </Link>
        </div>

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
              Signing in...
            </span>
          ) : (
            "Sign in"
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">Don't have an account?</span>{" "}
        <Link to="/register" className="auth-link">
          Sign up
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Login;