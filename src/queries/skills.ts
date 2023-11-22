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

export function deleteUserSkill(client: SupabaseClient, id: number) {
  return client.from("user_skills").delete().eq("id", id);
}

export function getSkillsByUserId(client: SupabaseClient, userId: string) {
  return client
    .from("user_skills")
    .select("id, skills(name) as name")
    .eq("user_id", userId);
}
