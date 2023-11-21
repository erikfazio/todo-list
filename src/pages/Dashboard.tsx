import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
    const { data: task, error } = await supabase
      .from("tasks")
      .insert({ text, user_id: user.id })
      .select("*");
    if (error) console.log("error");
    else {
      setTasks([...tasks, task[0]]);
      setText("");
    }
  }

  async function getTasks() {
    const { data } = await supabase
      .from("tasks")
      .select()
      .eq("user_id", user.id);
    setTasks(data);
  }

  async function deleteTask(id: number) {
    try {
      await supabase.from("tasks").delete().eq("id", id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.log("error", error);
    }
  }

  console.log(tasks);

  return (
    <div>
      <main className="container mx-auto">
        <input
          className="border"
          type="text"
          onChange={(e) => setText(e.target.value)}
        />
        <Button variant="outline" onClick={addTask}>
          Add
        </Button>
        {tasks.map(({ id, text }) => (
          <li key={id}>
            <span>{text}</span>
            <Button variant="outline" onClick={() => deleteTask(id)}>
              Delete
            </Button>
          </li>
        ))}
      </main>
    </div>
  );
}

export default Dashboard;
