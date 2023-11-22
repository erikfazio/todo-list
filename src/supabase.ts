import { createBrowserClient } from "@supabase/ssr";
import invariant from "tiny-invariant";

let client: ReturnType<typeof createBrowserClient<any>> | undefined;

export function getSupabaseBrowserClient() {
  if (client) {
    return client;
  }

  invariant(import.meta.env.VITE_SUPABASE_URL, `Supabase URL was not provided`);
  invariant(
    import.meta.env.VITE_SUPABASE_ANON_KEY,
    `Supabase Anon key was not provided`
  );

  client = createBrowserClient<any>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );

  return client;
}
