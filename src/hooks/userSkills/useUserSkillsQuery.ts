import useSupabase from "../useSupabase";
import { useQuery } from "@tanstack/react-query";
import { getUserSkillsByUserId } from "@/queries/userSkills";
import { useAuth } from "@/context/AuthProvider";

function useUserSkillsQuery() {
  const { user } = useAuth();
  const client = useSupabase();
  const queryKey = ["user_skills", user.id];

  const queryFn = async () => {
    return getUserSkillsByUserId(client, user.id).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export default useUserSkillsQuery;
