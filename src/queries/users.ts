import { SupabaseClient } from "@supabase/supabase-js";

export function getUsers(client: SupabaseClient) {
  return client.from("users").select("*");
}
