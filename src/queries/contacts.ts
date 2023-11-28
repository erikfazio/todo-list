import { SupabaseClient } from "@supabase/supabase-js";

export function getContactsByUserId(client: SupabaseClient, userId: string) {
  return client.from("contacts").select("*").eq("user_id", userId);
}

export function addContact(client: SupabaseClient, data: any) {
  return client.from("contacts").insert(data);
}

export function updateContact(client: SupabaseClient, data: any) {
  const { user_id, type } = data;
  return client
    .from("contacts")
    .update(data)
    .eq("user_id", user_id)
    .eq("type", type);
}

export function deleteContact(
  client: SupabaseClient,
  userId: string,
  type: string
) {
  return client
    .from("contacts")
    .delete()
    .eq("user_id", userId)
    .eq("type", type);
}
