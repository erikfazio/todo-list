import useResumesQuery from "@/hooks/resumes/useResumesQuery";

function Dashboard() {
  const { data: resumes, isLoading: isResumesLoading } = useResumesQuery();

  console.log(resumes);

  return (
    <main className="mt-16 container mx-auto flex flex-col gap-y-8">
      <h1 className="font-bold text-4xl">Dashboard</h1>
    </main>
  );
}

export default Dashboard;
