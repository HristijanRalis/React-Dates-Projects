import { useState } from "react";
import "./DailyPlanner.css";

type TaskProp = {
  id: string;
  text: string;
  day: string;
  completed: boolean;
};

export const DailyPlanner = () => {
  const [tasks, setTasks] = useState<TaskProp[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [dayInput, setDayInput] = useState("");
  const [taskInput, setTaskInput] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const randomId = () => {
    return Math.random().toString(36).substring(2, 10);
  };

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (!dayInput || !taskInput) return;

    if (editingTaskId) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTaskId
          ? { ...task, text: taskInput, day: dayInput }
          : task
      );
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } else {
      const newTask: TaskProp = {
        id: randomId(),
        text: taskInput,
        day: dayInput,
        completed: false,
      };

      const updatedTask = [...tasks, newTask];
      setTasks(updatedTask);

      localStorage.setItem("tasks", JSON.stringify(updatedTask));
    }

    setDayInput("");
    setTaskInput("");
  };

  const groupedTask = tasks.reduce<Record<string, TaskProp[]>>((acc, task) => {
    if (!acc[task.day]) acc[task.day] = [];
    acc[task.day].push(task);
    return acc;
  }, {});

  const handleDelete = (id: string) => {
    const okey = window.confirm("Are you sure to delete this task ?");
    if (!okey) return;
    const updatedTask = tasks.filter((task) => task.id !== id);
    setTasks(updatedTask);
    localStorage.setItem("tasks", JSON.stringify(updatedTask));
  };

  const handleEdit = (id: string) => {
    const taskEdit = tasks.find((task) => task.id === id);
    if (!taskEdit) return;
    setEditingTaskId(id);
    setDayInput(taskEdit.day);
    setTaskInput(taskEdit.text);
  };

  return (
    <div className="DailyPlanner">
      <form className="DayPlannerForm" onSubmit={handleForm}>
        <div className="DayPlannerContent">
          <label>Pick a Day</label>
          <input
            type="date"
            value={dayInput}
            onChange={(e) => setDayInput(e.target.value)}
          />
        </div>
        <div className="DayPlannerContent">
          <label>Enter a Day</label>
          <input
            type="text"
            placeholder="Enter day plan"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
        </div>

        <button className="PlanBtn" type="submit">
          {editingTaskId ? "Save Task" : "Add Day"}
        </button>
      </form>

      <ul className="DaysList">
        {tasks.length === 0 ? (
          <h2>Please Add Day Plan!</h2>
        ) : (
          Object.keys(groupedTask).map((day) => (
            <li className="DayItem" key={day}>
              <h3 className="Day">Day: {day}</h3>
              <ul>
                {groupedTask[day].map((task) => (
                  <li key={task.id} className="taskItem">
                    {task.text}

                    <div className="actions">
                      <button
                        className="Edit"
                        onClick={() => handleEdit(task.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="Delete"
                        onClick={() => handleDelete(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
