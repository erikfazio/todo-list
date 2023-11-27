import { useQueryClient, useMutation } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { addContact } from "@/queries/contacts";

function useAddContactMutation() {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const mutationFn = async (data: any) => {
    return addContact(client, data).then((result) => result.data);
  };

  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries(["contacts"]),
  });
}

export default useAddContactMutation;
