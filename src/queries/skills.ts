import { SupabaseClient } from "@supabase/supabase-js";

export function getSkills(client: SupabaseClient) {
  return client.from("skills").select("*");
}

export function addSkill(client: SupabaseClient, name: string) {
  return client.from("skills").insert({ name }).select();
}

export function deleteSkill(client: SupabaseClient, id: number) {
  return client.from("skills").delete().eq("id", id);
}
