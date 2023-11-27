import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserById } from "@/queries/users";
import useSupabase from "../useSupabase";
import { useAuth } from "@/context/AuthProvider";

function useUpdateUserByUserIdMutation() {
  const { user } = useAuth();
  const client = useSupabase();
  const queryClient = useQueryClient();

  const mutationFn = async (data: any) => {
    return updateUserById(client, data).then((result) => result.data);
  };

  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries(["users", user.id]),
  });
}

export default useUpdateUserByUserIdMutation;
