import { useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { getUsers } from "@/queries/users";

function useUsersQuery() {
  const client = useSupabase();
  const queryKey = ["users"];

  const queryFn = async () => {
    return getUsers(client).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export default useUsersQuery;
