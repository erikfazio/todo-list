import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteContact } from "@/queries/contacts";
import useSupabase from "../useSupabase";

function useDeleteContactMutation() {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const mutationFn = async ({ from_id, to_id }) => {
    return deleteContact(client, from_id, to_id).then((result) => result.data);
  };

  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries(["contacts"]),
  });
}

export default useDeleteContactMutation;
