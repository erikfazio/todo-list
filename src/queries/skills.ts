import { SupabaseClient } from "@supabase/supabase-js";

export function getSkillsByUserId(client: SupabaseClient, userId: string) {
  return client.from("skills").select("*").eq("user_id", userId);
}
