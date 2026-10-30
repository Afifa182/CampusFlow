import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import AuthForm from "./pages/AuthForm";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthForm mode="login" />} />
        <Route path="/register" element={<AuthForm mode="register" />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <footer className="footer">CampusFlow · MERN Micro Project</footer>
    </>
  );
}
