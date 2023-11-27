import { useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { getUserById } from "@/queries/users";

function useUserByIdQuery(userId: string) {
  const client = useSupabase();
  const queryKey = ["users", userId];

  const queryFn = async () => {
    return getUserById(client, userId).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export default useUserByIdQuery;
