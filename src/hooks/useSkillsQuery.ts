import { useAuth } from "@/context/AuthProvider";
import useSupabase from "./useSupabase";
import { getSkillsByUserId } from "@/queries/skills";
import { useQuery } from "react-query";

const useSkillsQuery = () => {
  const { user } = useAuth();
  const client = useSupabase();
  const queryKey = ["skills", user.id];

  const queryFn = async () => {
    return getSkillsByUserId(client, user.id).then(({ data }) => data);
  };

  return useQuery({ queryKey, queryFn });
};

export default useSkillsQuery;
