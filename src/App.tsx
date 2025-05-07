
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
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

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
                <NotFound />
              </MainLayout>
            } 
          />
          <Route 
            path="/customers" 
            element={
              <MainLayout>
                <NotFound />
              </MainLayout>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
