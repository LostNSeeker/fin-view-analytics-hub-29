import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
