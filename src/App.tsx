import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";


import Index from "./pages/Index";
import Products from "./pages/Products";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Payment from "./pages/Payment";
import NotFound from "./pages/NotFound";


import ProtectedAdminRoute from "./components/ProtectedAdminRoute";


const queryClient = new QueryClient();


const App = () => {

  return (

    <QueryClientProvider
      client={queryClient}
    >

      <TooltipProvider>

        <Toaster />

        <Sonner />


        <BrowserRouter>

          <div className="flex flex-col min-h-screen">


            <Navbar />


            <main className="flex-1">

              <Routes>


                {/* =========================================
                    CUSTOMER PAGES
                ========================================= */}

                <Route
                  path="/"
                  element={<Index />}
                />


                <Route
                  path="/products"
                  element={<Products />}
                />


                <Route
                  path="/about"
                  element={<About />}
                />


                <Route
                  path="/contacts"
                  element={<Contacts />}
                />


                <Route
                  path="/payment"
                  element={<Payment />}
                />


                {/* =========================================
                    ADMIN LOGIN
                ========================================= */}

                <Route
                  path="/admin/login"
                  element={<AdminLogin />}
                />


                {/* =========================================
                    PROTECTED ADMIN
                ========================================= */}

                <Route
                  element={
                    <ProtectedAdminRoute />
                  }
                >

                  <Route
                    path="/admin"
                    element={<Admin />}
                  />

                </Route>


                {/* =========================================
                    404
                ========================================= */}

                <Route
                  path="*"
                  element={<NotFound />}
                />

              </Routes>

            </main>


            <Footer />

          </div>

        </BrowserRouter>

      </TooltipProvider>

    </QueryClientProvider>

  );
};


export default App;