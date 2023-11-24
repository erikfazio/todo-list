import { SupabaseClient } from "@supabase/supabase-js";

export function getSkillLevels(client: SupabaseClient) {
  return client.from("skill_levels").select("*");
}
