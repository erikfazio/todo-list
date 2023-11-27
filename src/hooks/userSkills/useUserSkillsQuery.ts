import useSupabase from "../useSupabase";
import { useQuery } from "@tanstack/react-query";
import { getUserSkillsByUserId } from "@/queries/userSkills";

function useUserSkillsByUserIdQuery(userId: string) {
  const client = useSupabase();
  const queryKey = ["user_skills", userId];

  const queryFn = async () => {
    return getUserSkillsByUserId(client, userId).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export default useUserSkillsByUserIdQuery;
