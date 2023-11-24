import { useMutation } from "@tanstack/react-query";
import { updateUserById } from "@/queries/users";
import useSupabase from "../useSupabase";

function useUpdateUserByUserIdMutation() {
  const client = useSupabase();

  const mutationFn = async (data: any) => {
    console.log(data);
    return updateUserById(client, data).then((result) => result.data);
  };

  return useMutation({
    mutationFn,
  });
}

export default useUpdateUserByUserIdMutation;
