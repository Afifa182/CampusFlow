import { useEffect, useState } from "react";

const empty = { title: "", description: "", status: "todo", priority: "medium", dueDate: "" };

// Used for both Add and Edit. When `task` is given the form is in edit mode.
export default function TaskForm({ task, onSave, onCancel }) {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    setForm(
      task
        ? { ...task, dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "" }
        : empty
    );
  }, [task]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onSave(form);
    if (!task) setForm(empty);
  };

  return (
    <form className="card task-form" onSubmit={submit}>
      <h2>{task ? "Edit task" : "Add a task"}</h2>

      <label>Title
        <input name="title" value={form.title} onChange={change} placeholder="e.g. Finish DBMS assignment" required />
      </label>

      <label>Description
        <textarea name="description" rows="3" value={form.description} onChange={change} placeholder="Optional details" />
      </label>

      <div className="grid-3">
        <label>Status
          <select name="status" value={form.status} onChange={change}>
            <option value="todo">To do</option>
            <option value="in-progress">In progress</option>
            <option value="done">Done</option>
          </select>
        </label>
        <label>Priority
          <select name="priority" value={form.priority} onChange={change}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <label>Due date
          <input type="date" name="dueDate" value={form.dueDate} onChange={change} />
        </label>
      </div>

      <div className="row">
        <button className="btn btn-primary" type="submit">{task ? "Save changes" : "Add task"}</button>
        {task && <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
