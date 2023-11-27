import { SupabaseClient } from "@supabase/supabase-js";

export function getContactsByUserId(client: SupabaseClient, userId: string) {
  console.log(userId);
  return client
    .from("contacts")
    .select("to:users!to_id(*)")
    .eq("from_id", userId);
}

export function addContact(client: SupabaseClient, data: any) {
  console.log(data);
  return client.from("contacts").insert(data);
}

export function deleteContact(
  client: SupabaseClient,
  fromId: string,
  toId: string
) {
  return client
    .from("contacts")
    .delete()
    .eq("from_id", fromId)
    .eq("to_id", toId);
}
