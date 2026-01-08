import { useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/Auth/AuthContext";
import { ResumeProvider } from "./context/Resume/ResumeContext";
import { AccentColorProvider } from "./context/Color/ColorContext";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import ResumeDashboard from "./pages/ResumeDashboard";
import ProtectedRoute from "./components/Protected/ProtectedRoute";
import Layout from "./components/Protected/Layout";
import GoogleSuccess from "./pages/google";
import PublicResume from "./pages/PublicResume";

function App() {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) return;
    didMount.current = true;
    console.log("App component rendering");
  }, []);

  return (
    <ResumeProvider>
      <AuthProvider>
        <AccentColorProvider>
          <Router>
            <Routes>
              {/* Public Route */}
              <Route path="/login" element={<AuthPage />} />
              <Route path="/google-success" element={<GoogleSuccess />} />
              <Route
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route path="/" element={<Dashboard />} />
                <Route path="/resume" element={<ResumeDashboard />} />
                <Route path="/resume/:id" element={<ResumeDashboard />} />
                <Route path="/public/:resumeId" element={<PublicResume />} />
              </Route>
            </Routes>
          </Router>
        </AccentColorProvider>
      </AuthProvider>
    </ResumeProvider>
  );
}

export default App;
