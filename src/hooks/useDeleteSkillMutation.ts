import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteSkill } from "@/queries/skills";
import useSupabase from "./useSupabase";

function useDeleteSkillMutation() {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const mutationFn = async (id: number) => {
    return deleteSkill(client, id).then((result) => result.data);
  };

  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries(["skills"]),
  });
}

export default useDeleteSkillMutation;
