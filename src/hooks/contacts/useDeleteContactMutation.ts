import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteContact } from "@/queries/contacts";
import useSupabase from "../useSupabase";

function useDeleteContactMutation() {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const mutationFn = async ({ fromId, toId }) => {
    return deleteContact(client, fromId, toId).then((result) => result.data);
  };

  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries(["contacts"]),
  });
}

export default useDeleteContactMutation;
