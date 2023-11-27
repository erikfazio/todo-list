import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { updateContact } from "@/queries/contacts";

function useUpdateContactMutation() {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const mutationFn = async (data: any) => {
    return updateContact(client, data).then((result) => result.data);
  };

  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries(["contacts"]),
  });
}

export default useUpdateContactMutation;
