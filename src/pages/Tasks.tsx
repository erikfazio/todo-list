import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import supabase from "../supabase";
import { useAuth } from "../context/AuthProvider";
import clsx from "clsx";

function Tasks() {
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

  async function updateTaskStatus(id: number, done: boolean) {
    try {
      const { data: updatedTask, error } = await supabase
        .from("tasks")
        .update({ done })
        .eq("id", id)
        .select("*");

      setTasks(
        tasks.map((task) => {
          if (task.id === id) {
            return updatedTask[0];
          }
          return task;
        })
      );
    } catch (error) {
      console.log("error", error);
    }
  }

  async function deleteTask(id: number) {
    try {
      await supabase.from("tasks").delete().eq("id", id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.log("error", error);
    }
  }

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
        {tasks.map(({ id, text, done }) => (
          <li
            className="flex items-center justify-between bg-white p-4 border border-gray-200 rounded"
            key={id}
          >
            <div className="flex items-center gap-x-8">
              <input
                type="checkbox"
                checked={done}
                onChange={() => updateTaskStatus(id, !done)}
              />
              <span className={clsx("", {})}>{text}</span>
            </div>
            <Button variant="outline" onClick={() => deleteTask(id)}>
              Delete
            </Button>
          </li>
        ))}
      </main>
    </div>
  );
}

export default Tasks;
