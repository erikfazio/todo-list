import { SupabaseClient } from "@supabase/supabase-js";

export function getResumes(client: SupabaseClient) {
  return client.from("resumes").select("*");
}

export function getResumesByQuery(client: SupabaseClient, query: string) {
  return client.from("resumes").select("").textSearch(`search_resumes`, query);
}
