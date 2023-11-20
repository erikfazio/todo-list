import { useAuth } from "../context/AuthProvider";

function Home() {
  const { user } = useAuth();

  return <div>Welcome to To-do list</div>;
}

export default Home;
