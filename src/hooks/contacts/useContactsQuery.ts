import { useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { getContactsByUserId } from "@/queries/contacts";

function useContactsByUserIdQuery(userId: string) {
  const client = useSupabase();
  const queryKey = ["contacts"];

  const queryFn = async () => {
    return getContactsByUserId(client, userId).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export default useContactsByUserIdQuery;
