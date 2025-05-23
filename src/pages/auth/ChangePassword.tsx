import { useState } from "react";
import AuthLayout from "../../components/auth/AuthLayout";
import FormField from "../../components/auth/FormField";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "@/context/UserContext";

const ChangePassword = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { BackendUrl } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Form validation
    const newErrors: Record<string, string> = {};
    if (!formData.currentPassword)
      newErrors.currentPassword = "Current password is required";
    if (!formData.newPassword) newErrors.newPassword = "New password is required";
    if (formData.newPassword && formData.newPassword.length < 8)
      newErrors.newPassword = "Password must be at least 8 characters";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your new password";
    if (
      formData.newPassword &&
      formData.confirmPassword &&
      formData.newPassword !== formData.confirmPassword
    )
      newErrors.confirmPassword = "Passwords do not match";
    
    // Check if new password is the same as current
    if (formData.currentPassword && 
        formData.newPassword && 
        formData.currentPassword === formData.newPassword)
      newErrors.newPassword = "New password must be different from current password";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        // API call to change password endpoint
        await axios.post(`${BackendUrl}/auth//change-password`, {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        }, {
          withCredentials: true // Important for authentication
        });
        
        toast({
          title: "Password updated",
          description: "Your password has been changed successfully.",
        });
        
        // Reset form
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } catch (error) {
        // Handle specific error cases
        if (error.response?.status === 401) {
          setErrors({
            currentPassword: "Current password is incorrect"
          });
        } else {
          toast({
            title: "Error",
            description: error.response?.data?.message || "Failed to update password. Please try again.",
            variant: "destructive",
          });
        }
        console.error("Change password error:", error);
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
        <h1 className="auth-title">Change your password</h1>
        <p className="auth-subtitle mt-2">
          Update your password to keep your account secure
        </p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <FormField
          label="Current Password"
          id="currentPassword"
          type="password"
          placeholder="••••••••"
          required
          autoComplete="current-password"
          error={errors.currentPassword}
          value={formData.currentPassword}
          onChange={handleChange}
        />

        <div className="text-sm text-muted-foreground mb-2">
          <p>
            Your new password must:
          </p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Be at least 8 characters long</li>
            <li>Contain uppercase and lowercase letters</li>
            <li>Contain at least one number</li>
          </ul>
        </div>

        <FormField
          label="New Password"
          id="newPassword"
          type="password"
          placeholder="••••••••"
          required
          autoComplete="new-password"
          error={errors.newPassword}
          value={formData.newPassword}
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
              Updating password...
            </span>
          ) : (
            "Update password"
          )}
        </button>

        <div className="flex justify-center mt-2">
          <button
            type="button"
            className="text-sm text-muted-foreground hover:text-gray-700"
            onClick={() => {
              setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
              });
              setErrors({});
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ChangePassword;