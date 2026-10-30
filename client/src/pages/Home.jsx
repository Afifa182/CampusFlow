import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  return (
    <main className="container home">
      <section className="hero">
        <h1>Know what's due before it's due.</h1>
        <p className="lead">
          CampusFlow keeps your assignments, labs and projects in one place.
          Add a task, set a priority, and tick it off when it's done.
        </p>
        <div className="row">
          {user ? (
            <Link to="/dashboard" className="btn btn-primary btn-lg">Open my tasks</Link>
          ) : (
            <>
              <Link to="/register" className="btn btn-primary btn-lg">Create a free account</Link>
              <Link to="/login" className="btn btn-ghost btn-lg">Log in</Link>
            </>
          )}
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <h3>Your tasks, only yours</h3>
          <p>Each account has a private list, protected with a secure login.</p>
        </div>
        <div className="feature">
          <h3>Add, edit, delete</h3>
          <p>Change a deadline or status in two clicks. Remove what you no longer need.</p>
        </div>
        <div className="feature">
          <h3>Find things fast</h3>
          <p>Search by title and filter by status to focus on what's left.</p>
        </div>
      </section>
    </main>
  );
}
