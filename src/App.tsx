
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { MainLayout } from "@/components/layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import Claims from "@/pages/Claims";
import Analytics from "@/pages/Analytics";
import Settings from "@/pages/Settings";
import Employees from "@/pages/Employees";
import CustomerList from "@/pages/CustomerList";
import HelpCenter from "@/pages/HelpCenter";
import Notifications from "@/pages/Notifications";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import { ToasterProvider } from "@/hooks/use-toast";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ToasterProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
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
                  <Claims />
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ToasterProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
