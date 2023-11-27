import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteUserSkill } from "@/queries/userSkills";
import useSupabase from "../useSupabase";

function useDeleteUserSkillMutation() {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const mutationFn = async ({ skillId, userId }) => {
    return deleteUserSkill(client, skillId, userId).then(
      (result) => result.data
    );
  };

  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries(["user_skills"]),
  });
}

export default useDeleteUserSkillMutation;
