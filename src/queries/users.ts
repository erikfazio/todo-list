import { SupabaseClient } from "@supabase/supabase-js";

export function getUsers(client: SupabaseClient) {
  return client.from("users").select("*");
}

export function getUserById(client: SupabaseClient, id: string) {
  return client.from("users").select("*").eq("id", id);
}

export function updateUserById(client: SupabaseClient, id: string, data: any) {
  return client.from("users").update(data).eq("id", id);
}
