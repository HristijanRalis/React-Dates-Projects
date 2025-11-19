import { useEffect, useState } from "react";
import "./TaskDeadlineTracker.css";

type TaskTracker = {
  name: string;
  date: string;
  status: boolean;
  description: string;
};
export const TaskDeadlineTracker = () => {
  const [tasks, setTasks] = useState<TaskTracker[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [editing, setEditing] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [timeleft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);
  const saveTask = (updated: TaskTracker[]) => {
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !date) return;

    if (editing !== null) {
      const updated = [...tasks];
      updated[editing] = { ...updated[editing], name, date, description };
      saveTask(updated);
      setEditing(null);
    } else {
      const newTask = { name, date, description, status: false };
      saveTask([...tasks, newTask]);
    }

    setName("");
    setDate("");
    setDescription("");
  };

  const editTask = (i: number) => {
    const task = tasks[i];
    setName(task.name);
    setDate(task.date);
    setDescription(task.description);
    setEditing(i);
  };

  const deleteTask = (index: number) => {
    const accepted = window.confirm("Are you sure to delete this Task!");

    if (!accepted) return;

    const filtered = tasks.filter((_, i) => i !== index);
    saveTask(filtered);
  };

  const toggleStatus = (index: number) => {
    const updated = [...tasks];
    updated[index].status = !updated[index].status;
    saveTask(updated);
  };

  const getTimeLeft = (taskDate: string) => {
    const now = new Date().getTime();
    const target = new Date(taskDate).getTime();

    const diff = target - now;
    if (diff < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

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

        <div className="TaskContent">
          <textarea
            className="TextDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit" className="submitBtn">
          {editing !== null ? "Update Task" : "Add Task"}
        </button>
      </form>

      <ul className="tasksList">
        {sortedTasks.map((task) => {
          const timeLeft = getTimeLeft(task.date);
          const isOverdue = new Date(task.date).getTime() < Date.now();
          const index = tasks.indexOf(task); // original index

          return (
            <li
              className={`taskItem ${isOverdue ? "expired" : ""} ${
                task.status ? "active" : ""
              }`}
              key={index}
            >
              <div className="taskDescription">
                <div className="taskDate">
                  <h3>{task.name}</h3>
                  <p>{task.date}</p>
                </div>

                {!task.status && !isOverdue && (
                  <p className="countdown">
                    {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
                    {timeLeft.seconds}s
                  </p>
                )}
                {isOverdue && <p className="expiredText">Expired</p>}

                <p>{task.description}</p>
              </div>
              <div className="actions">
                <button className="btn editBtn" onClick={() => editTask(index)}>
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  className="btn deleteBtn"
                >
                  Delete
                </button>
                <button
                  onClick={() => toggleStatus(index)}
                  className="btn statusBtn"
                >
                  {task.status ? "Undo" : "Done"}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
