
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { errorMessage } from "../api";

const emptyForm = {
  name: "",
  email: "",
  rollNumber: "",
  course: "",
  year: "1",
};

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadStudents = useCallback(async () => {
    try {
      const { data } = await api.get("/students");
      setStudents(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const updateField = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const saveStudent = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const payload = { ...form, year: Number(form.year) };

      if (editingId) {
        await api.put(`/students/${editingId}`, payload);
        setSuccess("Student updated successfully.");
      } else {
        await api.post("/students", payload);
        setSuccess("Student added successfully.");
      }

      resetForm();
      await loadStudents();
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const editStudent = (student) => {
    setEditingId(student._id);
    setForm({
      name: student.name || "",
      email: student.email || "",
      rollNumber: student.rollNumber || "",
      course: student.course || "",
      year: String(student.year || 1),
    });
    setError("");
    setSuccess("");
    document.getElementById("student-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const deleteStudent = async (student) => {
    if (
      !window.confirm(
        `Delete ${student.name}'s record? This cannot be undone.`
      )
    ) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      await api.delete(`/students/${student._id}`);
      if (editingId === student._id) resetForm();
      setSuccess("Student deleted successfully.");
      await loadStudents();
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  const filteredStudents = students.filter((student) => {
    const text = `${student.name} ${student.email} ${student.rollNumber} ${student.course}`;
    return text.toLowerCase().includes(search.toLowerCase());
  });

  const coursesCount = new Set(
    students.map((student) => student.course?.trim()).filter(Boolean)
  ).size;

  return (
    <div className="cf-layout">
      <aside className="cf-sidebar">
        <Link to="/" className="cf-logo">
          <span className="cf-logo-icon">C</span>
          <span>Campus<span className="cf-logo-gold">Flow</span></span>
        </Link>

        <p className="cf-side-label">WORKSPACE</p>

        <a className="cf-side-link cf-side-active" href="#overview">
          <span>▦</span> Overview
        </a>
        <a className="cf-side-link" href="#student-records">
          <span>♙</span> Student records
        </a>
        <a className="cf-side-link" href="#student-form">
          <span>＋</span> Add a student
        </a>

        <div className="cf-sidebar-bottom">
          <div className="cf-sidebar-mark">CF</div>
          <div>
            <strong>CampusFlow</strong>
            <small>Student management</small>
          </div>
        </div>
      </aside>

      <main className="cf-main" id="overview">
        <header className="cf-topbar">
          <div>
            <p className="cf-eyebrow">YOUR WORKSPACE / OVERVIEW</p>
            <h1>Student dashboard</h1>
            <p className="cf-subtitle">
              Everything about your student records, in one place.
            </p>
          </div>
          <button
            className="cf-primary-btn"
            onClick={() =>
              document.getElementById("student-form")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
          >
            <span>＋</span> Add student
          </button>
        </header>

        {error && (
          <div className="cf-alert cf-error" role="alert">
            <span>!</span> {error}
          </div>
        )}

        {success && (
          <div className="cf-alert cf-success" role="status">
            <span>✓</span> {success}
          </div>
        )}

        <section className="cf-stats">
          <article className="cf-stat-card cf-stat-featured">
            <div className="cf-stat-top">
              <span>Total students</span>
              <span className="cf-stat-icon">♙</span>
            </div>
            <strong>{students.length}</strong>
            <p>Registered student records</p>
          </article>

          <article className="cf-stat-card">
            <div className="cf-stat-top">
              <span>Showing now</span>
              <span className="cf-stat-icon cf-icon-blue">⌕</span>
            </div>
            <strong>{filteredStudents.length}</strong>
            <p>Records matching your search</p>
          </article>

          <article className="cf-stat-card">
            <div className="cf-stat-top">
              <span>Courses</span>
              <span className="cf-stat-icon cf-icon-gold">▤</span>
            </div>
            <strong>{coursesCount}</strong>
            <p>Unique courses represented</p>
          </article>
        </section>

        <section className="cf-panel" id="student-form">
          <div className="cf-panel-heading">
            <div>
              <p className="cf-eyebrow">STUDENT DETAILS</p>
              <h2>{editingId ? "Edit student" : "Add a new student"}</h2>
              <p className="cf-subtitle">
                {editingId
                  ? "Update the information below."
                  : "Fill in the details to create a student record."}
              </p>
            </div>
            <span className="cf-heading-number">
              {editingId ? "EDIT" : "01"}
            </span>
          </div>

          <form onSubmit={saveStudent}>
            <div className="cf-form-grid">
              <label className="cf-field">
                <span>Full name <b>*</b></span>
                <input
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  placeholder="Enter student's full name"
                  required
                />
              </label>

              <label className="cf-field">
                <span>Email address <b>*</b></span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={updateField}
                  placeholder="student@example.com"
                  required
                />
              </label>

              <label className="cf-field">
                <span>Roll number <b>*</b></span>
                <input
                  name="rollNumber"
                  value={form.rollNumber}
                  onChange={updateField}
                  placeholder="e.g. 23CS001"
                  required
                />
              </label>

              <label className="cf-field">
                <span>Course <b>*</b></span>
                <input
                  name="course"
                  value={form.course}
                  onChange={updateField}
                  placeholder="e.g. B.E. CSE"
                  required
                />
              </label>

              <label className="cf-field">
                <span>Year of study</span>
                <select
                  name="year"
                  value={form.year}
                  onChange={updateField}
                >
                  <option value="1">1st year</option>
                  <option value="2">2nd year</option>
                  <option value="3">3rd year</option>
                  <option value="4">4th year</option>
                </select>
              </label>
            </div>

            <div className="cf-form-footer">
              <p><b>*</b> Required fields</p>
              <div className="cf-form-buttons">
                {editingId && (
                  <button
                    className="cf-secondary-btn"
                    type="button"
                    onClick={resetForm}
                    disabled={saving}
                  >
                    Cancel
                  </button>
                )}
                <button
                  className="cf-primary-btn"
                  type="submit"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Save changes →"
                      : "Create student →"}
                </button>
              </div>
            </div>
          </form>
        </section>

        <section className="cf-panel cf-records-panel" id="student-records">
          <div className="cf-records-heading">
            <div>
              <p className="cf-eyebrow">DIRECTORY</p>
              <h2>Student records</h2>
              <p className="cf-subtitle">
                Browse and manage registered students.
              </p>
            </div>

            <label className="cf-search">
              <span>⌕</span>
              <input
                type="search"
                aria-label="Search students"
                placeholder="Search students..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          </div>

          <div className="cf-table-meta">
            <span>
              <span className="cf-live-dot" />
              {loading ? "Loading records..." : "STUDENT DIRECTORY"}
            </span>
            <span>{filteredStudents.length} RECORD(S)</span>
          </div>

          {!loading && filteredStudents.length === 0 && (
            <div className="cf-empty">
              <div className="cf-empty-icon">♙</div>
              <h3>
                {students.length
                  ? "No matching students"
                  : "Your directory is empty"}
              </h3>
              <p>
                {students.length
                  ? "Try a different name, roll number, email, or course."
                  : "Add your first student using the form above."}
              </p>
              {!students.length && (
                <button
                  className="cf-primary-btn"
                  onClick={() =>
                    document.getElementById("student-form")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                >
                  ＋ Add first student
                </button>
              )}
            </div>
          )}

          {filteredStudents.length > 0 && (
            <div className="cf-table-wrap">
              <table className="cf-table">
                <thead>
                  <tr>
                    <th>STUDENT</th>
                    <th>ROLL NUMBER</th>
                    <th>EMAIL ADDRESS</th>
                    <th>COURSE</th>
                    <th>YEAR</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student._id}>
                      <td>
                        <div className="cf-student-cell">
                          <span className="cf-avatar">
                            {(student.name || "?").trim().charAt(0).toUpperCase()}
                          </span>
                          <strong>{student.name}</strong>
                        </div>
                      </td>
                      <td>
                        <span className="cf-roll">
                          {student.rollNumber}
                        </span>
                      </td>
                      <td className="cf-email-cell">{student.email}</td>
                      <td>{student.course}</td>
                      <td>
                        <span className="cf-year">
                          Year {student.year}
                        </span>
                      </td>
                      <td>
                        <div className="cf-row-actions">
                          <button
                            className="cf-edit-btn"
                            onClick={() => editStudent(student)}
                          >
                            Edit
                          </button>
                          <button
                            className="cf-delete-btn"
                            onClick={() => deleteStudent(student)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <footer className="cf-page-footer">
          <span>CampusFlow © Student Record Management</span>
          <span>Organized. Simple. Connected.</span>
        </footer>
      </main>
    </div>
  );
}
