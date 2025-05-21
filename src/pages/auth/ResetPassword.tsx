import { useState } from "react";
import AuthLayout from "../../components/auth/AuthLayout";
import FormField from "../../components/auth/FormField";
import { useToast } from "@/components/ui/use-toast";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Server } from "@/App";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Form validation
    const newErrors: Record<string, string> = {};
    if (!token) newErrors.token = "Invalid or expired token";
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

    if (Object.keys(newErrors).length === 0) {
      try {
        // API call to reset password endpoint
        await axios.post(`${Server}/auth/reset-password`, {
          token,
          newPassword: formData.password
        });
        
        setResetComplete(true);
        toast({
          title: "Password reset",
          description: "Your password has been reset successfully.",
        });
      } catch (error) {
        const errorMessage = error.response?.data?.message || "There was a problem resetting your password. The link may be invalid or expired.";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        
        if (error.response?.status === 400) {
          setErrors({ token: "Invalid or expired token" });
        }
        
        console.error("Reset password error:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mb-6">
        <h1 className="auth-title">Reset your password</h1>
        <p className="auth-subtitle mt-2">
          {resetComplete
            ? "Your password has been successfully reset"
            : "Enter a new password for your account"}
        </p>
      </div>

      {!resetComplete ? (
        <form onSubmit={handleSubmit} className="auth-form">
          {!token && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-md mb-4">
              <p className="text-sm">
                This reset link appears to be invalid or expired. Please request
                a new link.
              </p>
            </div>
          )}

          {errors.token && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-md mb-4">
              <p className="text-sm">
                {errors.token}. Please request a new reset link.
              </p>
            </div>
          )}

          {token && !errors.token && (
            <>
              <div className="text-sm text-muted-foreground mb-4">
                <p>
                  Please create a new password that meets the following criteria:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>At least 8 characters long</li>
                  <li>Contains uppercase and lowercase letters</li>
                  <li>Contains at least one number</li>
                </ul>
              </div>

              <FormField
                label="New Password"
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
                label="Confirm New Password"
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
                autoComplete="new-password"
                error={errors.confirmPassword}
                value={formData.confirmPassword}
                onChange={handleChange}
              />

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
                    Resetting password...
                  </span>
                ) : (
                  "Reset password"
                )}
              </button>
            </>
          )}
        </form>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-center text-green-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-center">
            Your password has been changed successfully.
          </p>
          <Link to="/login" className="auth-button block text-center">
            Sign in with new password
          </Link>
        </div>
      )}

      {!resetComplete && (
        <div className="mt-6 text-center text-sm">
          <Link to="/login" className="auth-link">
            Back to sign in
          </Link>
        </div>
      )}
    </AuthLayout>
  );
};

export default ResetPassword;