import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const API_URL = "http://10.26.60.23:8080";

const ProtectedAdminRoute = () => {
  const location = useLocation();

  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuthentication = async () => {
      const token = localStorage.getItem("admin_token");

      // No token
      if (!token) {
        setAuthenticated(false);
        setChecking(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/admin/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          // Token expired or invalid
          localStorage.removeItem("admin_token");
          setAuthenticated(false);
          setChecking(false);
          return;
        }

        setAuthenticated(true);
      } catch (error) {
        console.error("Authentication verification failed:", error);

        localStorage.removeItem("admin_token");
        setAuthenticated(false);
      } finally {
        setChecking(false);
      }
    };

    verifyAuthentication();
  }, []);

  // While checking the token
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-4" />

          <p className="text-muted-foreground">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!authenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  // Authenticated
  return <Outlet />;
};

export default ProtectedAdminRoute;