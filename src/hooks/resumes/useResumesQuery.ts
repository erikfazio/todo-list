import { useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { getResumes } from "@/queries/resumes";

function useResumesQuery() {
  const client = useSupabase();
  const queryKey = ["resumes"];

  const queryFn = async () => {
    return getResumes(client).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export default useResumesQuery;
