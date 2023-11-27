import { SupabaseClient } from "@supabase/supabase-js";

export function getContactsByUserId(client: SupabaseClient, userId: string) {
  console.log(userId);
  return client
    .from("contacts")
    .select("to:users!to_id(*)")
    .eq("from_id", userId);
}

// .select("skill_id, user_id, name:skills(name), level:skill_levels(name)")
