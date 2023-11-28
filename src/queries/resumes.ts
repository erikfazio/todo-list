import { SupabaseClient } from "@supabase/supabase-js";

export function getResumes(client: SupabaseClient) {
  return client.from("resumes").select("*");
}
