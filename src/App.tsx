
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { MainLayout } from "@/components/layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import Analytics from "@/pages/Analytics";
import Settings from "@/pages/Settings";
import Employees from "@/pages/Employees";
import CustomerList from "@/pages/CustomerList";
import HelpCenter from "@/pages/HelpCenter";
import Notifications from "@/pages/Notifications";
import NotFound from "@/pages/NotFound";
//
import ClaimsList from "./pages/ClaimsList";
import ClaimDetail from "./pages/ClaimDetail";
import ClaimForm from "./pages/ClaimForm";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import ChangePassword from "./pages/auth/ChangePassword";

const queryClient = new QueryClient();
export const Server = 'http://localhost:3000/api'; 

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            } 
          />
          <Route 
            path="/claims" 
            element={
              <MainLayout>
                <ClaimsList />
              </MainLayout>
            } 
          />
          <Route 
            path="/claims/new" 
            element={
              <MainLayout>
                <ClaimForm />
              </MainLayout>
            } 
          />
          <Route
            path="/claims/edit/:id"
            element={
              <MainLayout>
                <ClaimForm />
              </MainLayout>
            }
          />
        
          <Route
            path="/claims/:id"
            element={
              <MainLayout>
                <ClaimDetail />
              </MainLayout>
            }
          />
          <Route 
            path="/analytics" 
            element={
              <MainLayout>
                <Analytics />
              </MainLayout>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <MainLayout>
                <Settings />
              </MainLayout>
            } 
          />
          <Route 
            path="/employees" 
            element={
              <MainLayout>
                <Employees />
              </MainLayout>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <MainLayout>
                <Settings />
              </MainLayout>
            } 
          />
          <Route 
            path="/help" 
            element={
              <MainLayout>
                <HelpCenter />
              </MainLayout>
            } 
          />
          <Route 
            path="/customers" 
            element={
              <MainLayout>
                <CustomerList />
              </MainLayout>
            } 
          />
          <Route 
            path="/notifications" 
            element={
              <MainLayout>
                <Notifications />
              </MainLayout>
            } 
          />
          //auth
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
