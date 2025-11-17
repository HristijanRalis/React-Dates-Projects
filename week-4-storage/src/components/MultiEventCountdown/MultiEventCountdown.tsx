import { useEffect, useState } from "react";
import "./MultiEventCountdown.css";

type CountdownEvent = {
  title: string;
  date: string;
  color: string;
};

export const MultiEventCountdown = () => {
  const [events, setEvents] = useState<CountdownEvent[]>(() => {
    const saved = localStorage.getItem("events");
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [editing, setEditing] = useState<number | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(interval);
  });

  const randomColor = () =>
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString()
      .padStart(6, "0");

  const saveEvents = (updated: CountdownEvent[]) => {
    setEvents(updated);
    localStorage.setItem("events", JSON.stringify(updated));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !date) return;

    if (editing !== null) {
      const updated = [...events];
      updated[editing] = { ...updated[editing], title, date };
      setEvents(updated);
      setEditing(null);
    } else {
      const newEvent = { title, date, color: randomColor() };
      saveEvents([...events, newEvent]);
    }

    setTitle("");
    setDate("");
  };

  const handleDelete = (index: number) => {
    const filtered = events.filter((_, i) => index !== i);
    saveEvents(filtered);
  };

  const handleEdit = (i: number) => {
    const ev = events[i];
    setTitle(ev.title);
    setDate(ev.date);
    setEditing(i);
  };

  const getTimeLeft = (target: string) => {
    const now = Date.now();
    const eventTime = new Date(target).getTime();
    const diff = eventTime - now;

    if (diff < 0) return null;

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  return (
    <div className="MultiEventCountdown">
      <form className="eventForm" onSubmit={handleSubmit}>
        <div className="eventContent">
          <label htmlFor="">Enter Title</label>
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="eventContent">
          <label htmlFor="">Enter Date</label>
          <input
            type="date"
            placeholder="Pick a Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button type="submit" className="submitBtn btn">
          {editing !== null ? "Update Event" : "Add Event"}
        </button>
      </form>

      <ul className="eventList">
        {events.map((event, i) => {
          const time = getTimeLeft(event.date);

          return (
            <li
              className="eventItem"
              key={i}
              style={{ borderLeft: `5px solid ${event.color}` }}
            >
              <h3>{event.title}</h3>
              {time ? (
                <p>
                  {time.days}d - {time.hours}h - {time.minutes}m -{" "}
                  {time.seconds}
                </p>
              ) : (
                <p className="expired">Event Started</p>
              )}

              <div className="actions">
                <button className="editBtn btn" onClick={() => handleEdit(i)}>
                  Edit
                </button>
                <button
                  className="deleteBtn btn"
                  onClick={() => handleDelete(i)}
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
