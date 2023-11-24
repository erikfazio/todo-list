import { useQueryClient, useMutation } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { addUserSkill } from "@/queries/userSkills";

function useAddUserSkillMutation() {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const mutationFn = async (data: any) => {
    return addUserSkill(client, data).then((result) => result.data);
  };

  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries(["user_skills"]),
  });
}

export default useAddUserSkillMutation;
