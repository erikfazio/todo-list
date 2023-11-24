import { useQuery } from "@tanstack/react-query";
import useSupabase from "../useSupabase";
import { getUserById } from "@/queries/users";
import { useAuth } from "@/context/AuthProvider";

function useUserByIdQuery() {
  const { user } = useAuth();
  const client = useSupabase();
  const queryKey = ["users", user.id];

  const queryFn = async () => {
    return getUserById(client, user.id).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export default useUserByIdQuery;
