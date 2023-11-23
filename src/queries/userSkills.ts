import { SupabaseClient } from "@supabase/supabase-js";

export function getUserSkills(client: SupabaseClient) {
  return client.from("user_skills").select("*");
}

export function getUserSkillsByUserId(client: SupabaseClient, userId: string) {
  return client
    .from("user_skills")
    .select("name:skills(name), level:skill_levels(name)")
    .eq("user_id", userId);
}

export function deleteUserSkill(client: SupabaseClient, id: number) {
  return client.from("user_skills").delete().eq("id", id);
}
