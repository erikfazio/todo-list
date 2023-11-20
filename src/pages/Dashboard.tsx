import { useEffect, useState } from "react";
import supabase from "../supabase";
import { useAuth } from "../context/AuthProvider";

function Dashboard() {
  const { user, signOut } = useAuth();
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  async function addTask() {
    const { data } = await supabase.from("tasks").insert({ text });
    setTasks([...tasks, data]);
  }

  async function getTasks() {
    const { data } = await supabase.from("tasks").select();
    setTasks(data);
  }

  async function deleteTask(id) {
    await supabase.from("tasks").delete().match({ id });
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <div>
      <header>
        <button onClick={signOut}>Logout</button>
      </header>
      <main>
        <input
          className="border"
          type="text"
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
        {tasks.map(({ id, text }) => (
          <li key={id}>
            <span>{text}</span>
            <button onClick={() => deleteTask(id)}>Delete</button>
          </li>
        ))}
      </main>
    </div>
  );
}

export default Dashboard;
