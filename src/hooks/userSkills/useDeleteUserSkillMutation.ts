import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteUserSkill } from "@/queries/skills";
import useSupabase from "../useSupabase";

function useDeleteUserSkillMutation() {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const mutationFn = async (id: number) => {
    return deleteUserSkill(client, id).then((result) => result.data);
  };

  return useMutation({ mutationFn });
}

export default useDeleteUserSkillMutation;
