import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/auth";

const GoogleSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useAuth(); // <-- make sure these exist

  useEffect(() => {
    const token = searchParams.get("token");
    const fullName = searchParams.get("fullName") || "Google User";
    const email = searchParams.get("email") || "";

    if (token) {
      // Save to localStorage
      localStorage.setItem("token", token);
      const googleUser = { fullName, email };
      localStorage.setItem("user", JSON.stringify(googleUser));

      // Update Auth context state
      setUser(googleUser);
      setIsAuthenticated(true); // <-- IMPORTANT!

      // Redirect to dashboard
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [searchParams, navigate, setIsAuthenticated, setUser]);

  return (
    <div className="flex justify-center items-center h-screen text-xl font-semibold">
      Logging in...
    </div>
  );
};

export default GoogleSuccess;
