import { useState } from "react";
import "./TaskDeadlineTracker.css";

type TaskTracker = {
  name: string;
  date: string;
  status: boolean;
};
export const TaskDeadlineTracker = () => {
  const [tasks, setTasks] = useState<TaskTracker[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [editing, setEditing] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !date) return;

    if (editing !== null) {
      const updated = [...tasks];
      updated[editing] = { ...updated[editing], name, date };
      saveTask(updated);
      setEditing(null);
    } else {
      const newTask = { name, date, status: false };
      saveTask([...tasks, newTask]);
    }

    setName("");
    setDate("");
  };

  const saveTask = (updated: TaskTracker[]) => {
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const editTask = (i: number) => {
    const task = tasks[i];
    setName(task.name);
    setDate(task.date);
    setEditing(i);
  };

  const deleteTask = (index: number) => {
    const accepted = window.confirm("Are you sure to delete this Task!");

    if (!accepted) return;

    const filtered = tasks.filter((_, i) => i !== index);
    saveTask(filtered);
  };

  return (
    <div className="TaskDeadlineTracker">
      <form className="TaskForm" onSubmit={handleSubmit}>
        <div className="TaskContent">
          <label>Task Name</label>
          <input
            type="text"
            value={name}
            placeholder="Task Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="TaskContent">
          <label>Task Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button type="submit">
          {editing !== null ? "Update Task" : "Add Task"}
        </button>
      </form>
      <ul className="tasksList">
        {tasks.map((task, i) => (
          <li className="taskItem" key={i}>
            <h3>{task.name}</h3>
            <p>{task.date}</p>
            <div className="actions">
              <button className="btn editBtn" onClick={() => editTask(i)}>
                Edit
              </button>
              <button onClick={() => deleteTask(i)} className="btn deleteBtn">
                Delete{" "}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
