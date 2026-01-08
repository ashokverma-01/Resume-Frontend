import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../context/Auth/auth";

const AuthPage = () => {
  const { register, login } = useAuth();
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = () => {
    setIsRedirecting(true); // show loading
    window.location.href =
      "https://resume-backend-s69p.onrender.com/api/auth/google-login";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset error

    try {
      if (isLogin) {
        // Login API
        const result = await login(email, password);
        if (result.success) {
          if (rememberMe && result.token) {
            localStorage.setItem("token", result.token);
          }
          navigate("/");
        } else {
          setError(result.message || "Login failed");
        }
      } else {
        // Sign Up API
        if (!username.trim()) {
          setError("Username is required");
          return;
        }
        const result = await register(username, email, password);
        if (result.success) {
          setIsLogin(true);
        } else {
          setError(result.message || "Registration failed");
        }
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-black relative h-32 flex items-center justify-center">
          <h2 className="text-white text-2xl font-bold absolute bottom-4 left-6">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <p className="text-gray-300 absolute  left-6 text-sm ">
            Please {isLogin ? "sign in" : "create account"} to continue
          </p>

          <div className="absolute top-3 right-3 w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-500 font-bold">AV</span>
          </div>
        </div>

        {/* Toggle */}
        <div className="bg-gray-200 flex rounded-full p-1 mx-4 mt-4">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
              isLogin
                ? "bg-white text-orange-500 shadow"
                : "text-gray-600 hover:text-orange-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
              !isLogin
                ? "bg-white text-orange-500 shadow"
                : "text-gray-600 hover:text-orange-500"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form className="p-6 space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full pl-10 pr-4 h-12 rounded-full border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>
          )}

          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full pl-10 pr-4 h-12 rounded-full border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-12 h-12 rounded-full border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          {isLogin && (
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="w-4 h-4 accent-orange-500"
                />
                <span className="text-sm">Remember me</span>
              </label>
            </div>
          )}

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Normal Login / Sign Up Button */}
          <button
            type="submit"
            className="w-full h-12 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className={`w-full flex items-center justify-center h-12 rounded-full ${
              isRedirecting ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
            } text-white font-semibold transition duration-300 mt-4`}
            disabled={isRedirecting}
          >
            <img
              src="https://img.icons8.com/color/20/google-logo.png"
              alt="Google"
              className="mr-2"
            />
            {isRedirecting ? "Redirecting..." : "Sign in with Google"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
