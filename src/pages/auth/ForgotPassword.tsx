import { useState } from "react";
import AuthLayout from "../../components/auth/AuthLayout";
import FormField from "../../components/auth/FormField";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "@/context/UserContext";

const ForgotPassword = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");
const { BackendUrl } = useUser();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Form validation
    const newErrors: Record<string, string> = {};
    if (!email) newErrors.email = "Email is required";
    if (email && !/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Please enter a valid email";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        // API call to forgot password endpoint
        await axios.post(`${BackendUrl}/auth/forgot-password`, { email });
        
        setEmailSent(true);
        toast({
          title: "Email sent",
          description: "If an account exists with that email, you will receive a reset link shortly.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "There was a problem processing your request. Please try again.",
          variant: "destructive",
        });
        console.error("Forgot password error:", error);
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
        <h1 className="auth-title">Forgot your password?</h1>
        <p className="auth-subtitle mt-2">
          {emailSent
            ? "Check your email for a link to reset your password"
            : "Enter your email and we'll send you a reset link"}
        </p>
      </div>

      {!emailSent ? (
        <form onSubmit={handleSubmit} className="auth-form">
          <FormField
            label="Email"
            id="email"
            type="email"
            placeholder="youremail@example.com"
            required
            autoComplete="email"
            error={errors.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending email...
              </span>
            ) : (
              "Send reset link"
            )}
          </button>
        </form>
      ) : (
        <div className="text-center">
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-4">
            <p>
              We've sent an email to {email} with
              instructions to reset your password.
            </p>
          </div>

          <button
            className="text-sm text-primary hover:underline"
            onClick={() => setEmailSent(false)}
          >
            Try again
          </button>
        </div>
      )}

      <div className="mt-6 text-center text-sm">
        <Link to="/login" className="auth-link">
          Back to sign in
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;