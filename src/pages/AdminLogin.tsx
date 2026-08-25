import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

const API_URL = "http://10.26.60.23:8080";

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ==========================================
  // CHECK IF ALREADY LOGGED IN
  // ==========================================

  useEffect(() => {
    const checkExistingLogin = async () => {
      const token = localStorage.getItem("admin_token");

      if (!token) {
        return;
      }

      try {
        const response = await fetch(`${API_URL}/admin/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (response.ok) {
          navigate("/admin", { replace: true });
        } else {
          localStorage.removeItem("admin_token");
        }
      } catch (error) {
        console.error(
          "Failed to verify existing login:",
          error
        );

        localStorage.removeItem("admin_token");
      }
    };

    checkExistingLogin();
  }, [navigate]);

  // ==========================================
  // LOGIN
  // ==========================================

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/admin/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify({
            username: username.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ||
            "Invalid username or password"
        );
      }

      if (!data.access_token) {
        throw new Error(
          "Login succeeded but no authentication token was received."
        );
      }

      // ==========================================
      // SAVE TOKEN
      // ==========================================

      localStorage.setItem(
        "admin_token",
        data.access_token
      );

      console.log("Admin authentication successful");

      // ==========================================
      // VERIFY TOKEN
      // ==========================================

      const verifyResponse = await fetch(
        `${API_URL}/admin/me`,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${data.access_token}`,
            Accept: "application/json",
          },
        }
      );

      if (!verifyResponse.ok) {
        localStorage.removeItem("admin_token");

        throw new Error(
          "Authentication verification failed."
        );
      }

      // ==========================================
      // REDIRECT
      // ==========================================

      const from =
        (location.state as { from?: string })
          ?.from || "/admin";

      navigate(from, {
        replace: true,
      });

    } catch (error) {
      console.error("Login error:", error);

      localStorage.removeItem("admin_token");

      setError(
        error instanceof Error
          ? error.message
          : "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">

      <div className="w-full max-w-md bg-card border rounded-2xl shadow-lg p-8">

        {/* HEADER */}

        <h1 className="text-3xl font-bold text-center mb-2">
          Admin Login
        </h1>

        <p className="text-center text-muted-foreground mb-8">
          Elite Store Administration
        </p>

        {/* ERROR */}

        {error && (
          <div className="mb-5 p-3 rounded-lg bg-red-100 text-red-700">
            {error}
          </div>
        )}

        {/* FORM */}

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* USERNAME */}

          <div>

            <label className="block font-medium mb-2">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              placeholder="Admin username"
              autoComplete="username"
              className="w-full border rounded-lg px-4 py-3 bg-background"
              required
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label className="block font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Admin password"
              autoComplete="current-password"
              className="w-full border rounded-lg px-4 py-3 bg-background"
              required
            />

          </div>

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground rounded-lg py-3 font-semibold disabled:opacity-50"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default AdminLogin;