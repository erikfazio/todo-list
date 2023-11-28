import { useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { getResumesByQuery } from "@/queries/resumes";

function useResumesQuery(query: string) {
  const client = useSupabase();
  const queryKey = ["resumes", query];

  const queryFn = async () => {
    return getResumesByQuery(client, query).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn, enabled: false });
}

export default useResumesQuery;
