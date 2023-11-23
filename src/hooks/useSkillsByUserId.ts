import { useQuery } from "@tanstack/react-query";
import { getSkillsByUserId } from "@/queries/skills";
import useSupabase from "./useSupabase";

function useSkillsByUserId(userId: string) {
  const client = useSupabase();
  const queryKey = ["skills", userId];

  const queryFn = async () => {
    return getSkillsByUserId(client, userId).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export default useSkillsByUserId;
