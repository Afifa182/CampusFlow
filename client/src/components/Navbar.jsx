import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="brand">CampusFlow</Link>
        <nav className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          {user ? (
            <>
              <NavLink to="/dashboard">My tasks</NavLink>
              <span className="nav-user">Hi, {user.name.split(" ")[0]}</span>
              <button className="btn btn-ghost" onClick={handleLogout}>Log out</button>
            </>
          ) : (
            <>
              <NavLink to="/login">Log in</NavLink>
              <Link to="/register" className="btn btn-primary">Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
