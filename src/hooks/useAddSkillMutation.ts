import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addSkill } from "@/queries/skills";
import useSupabase from "./useSupabase";

function useAddSkillMutation() {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const mutationFn = async (name: string) => {
    return addSkill(client, name).then((result) => result.data);
  };

  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries(["skills"]),
  });
}

export default useAddSkillMutation;
