import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateUserById } from "@/queries/users";
import useSupabase from "../useSupabase";

function useUpdateUserByUserIdMutation() {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const mutationFn = async (id: string, data: any) => {
    return updateUserById(client, id, data).then((result) => result.data);
  };

  return useMutation({ mutationFn });
}

export default useUpdateUserByUserIdMutation;
