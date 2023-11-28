import { Input } from "@/components/ui/input";
import useResumesSearchQuery from "@/hooks/resumes/useResumesSearchQuery";
import useDebounce from "@/hooks/useDebounce";
import { useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const {
    data: resumes,
    isLoading: isResumesLoading,
    refetch,
  } = useResumesSearchQuery(debouncedSearch);

  const handleSearch = (e: any) => {
    setSearch(e.target.value);

    refetch();
  };

  console.log();

  return (
    <main className="mt-16 container mx-auto flex flex-col gap-y-8">
      <h1 className="font-bold text-4xl">Dashboard</h1>
      <div className="w-full">
        <Input
          type="search"
          placeholder="Search"
          className="w-full"
          value={search}
          onChange={handleSearch}
        />
        {!isResumesLoading && resumes && (
          <ul className="relative top-0 mt-4 p-4 w-full border border-black">
            {resumes?.map((resume) => (
              <li key={`${resume.id} ${resume.skill_name}`}>
                <Link to={`/cv/${resume.id}`}>
                  {resume.first_name} {resume.last_name} - {resume.skill_name} -
                  {resume.skill_level}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

export default Dashboard;
