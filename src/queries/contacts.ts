import { SupabaseClient } from "@supabase/supabase-js";

export function getContactsByUserId(client: SupabaseClient, userId: string) {
  console.log(userId);
  return client
    .from("contacts")
    .select("to:users!to_id(*), is_favorite")
    .eq("from_id", userId);
}

export function addContact(client: SupabaseClient, data: any) {
  console.log(data);
  return client.from("contacts").insert(data);
}

export function updateContact(client: SupabaseClient, data: any) {
  const { from_id, to_id } = data;
  return client
    .from("contacts")
    .update(data)
    .eq("from_id", from_id)
    .eq("to_id", to_id);
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
