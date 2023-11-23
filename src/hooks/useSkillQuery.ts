import { useQuery } from "@tanstack/react-query";
import { getSkills } from "@/queries/skills";
import useSupabase from "./useSupabase";

function useSkillQuery() {
  const client = useSupabase();
  const queryKey = ["skills"];

  const queryFn = async () => {
    return getSkills(client).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export default useSkillQuery;
