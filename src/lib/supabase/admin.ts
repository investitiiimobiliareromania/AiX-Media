import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";

if (typeof globalThis.WebSocket === "undefined") {
  // Polyfill dummy WebSocket for Node.js 20 environment
  (globalThis as unknown as { WebSocket: unknown }).WebSocket = class DummyWebSocket {};
}

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fcpsafjgjnecdlyqfcid.supabase.co';
  // Enforce presence of service role key for admin operations
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for admin client');
  }

  return createClient<Database>(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
