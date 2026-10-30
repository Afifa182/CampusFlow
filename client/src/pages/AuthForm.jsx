import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { errorMessage } from "../api";

// One component renders both the Login and Register screens
export default function AuthForm({ mode }) {
  const isRegister = mode === "register";
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isRegister) await register(form.name, form.email, form.password);
      else await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container auth-wrap">
      <form className="card auth-card" onSubmit={submit}>
        <h1>{isRegister ? "Create your account" : "Welcome back"}</h1>

        {error && <div className="alert" role="alert">{error}</div>}

        {isRegister && (
          <label>Full name
            <input name="name" value={form.name} onChange={change} required autoComplete="name" />
          </label>
        )}
        <label>Email
          <input type="email" name="email" value={form.email} onChange={change} required autoComplete="email" />
        </label>
        <label>Password
          <input type="password" name="password" value={form.password} onChange={change} minLength={6} required
            autoComplete={isRegister ? "new-password" : "current-password"} />
        </label>

        <button className="btn btn-primary btn-block" disabled={loading}>
          {loading ? "Please wait…" : isRegister ? "Sign up" : "Log in"}
        </button>

        <p className="muted center">
          {isRegister ? (
            <>Already registered? <Link to="/login">Log in</Link></>
          ) : (
            <>New here? <Link to="/register">Create an account</Link></>
          )}
        </p>
      </form>
    </main>
  );
}
