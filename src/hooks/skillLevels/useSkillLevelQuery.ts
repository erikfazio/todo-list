import { useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { getSkillLevels } from "@/queries/skillLevels";

function useSkillLevelQuery() {
  const client = useSupabase();
  const queryKey = ["skill_levels"];

  const queryFn = async () => {
    return getSkillLevels(client).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export default useSkillLevelQuery;
