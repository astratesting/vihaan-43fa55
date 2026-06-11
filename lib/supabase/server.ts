import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { isDemoMode, getDemoUser } from "@/lib/demo-auth";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.SUPABASE_URL || "https://placeholder.supabase.co",
    process.env.SUPABASE_ANON_KEY || "placeholder",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method is called from a Server Component.
          }
        },
      },
    }
  );
}

export async function getUser() {
  // In demo mode, return the demo user from cookies
  if (isDemoMode()) {
    const demoUser = await getDemoUser();
    if (demoUser) {
      return {
        id: demoUser.id,
        email: demoUser.email,
        created_at: demoUser.created_at,
        app_metadata: {},
        user_metadata: {},
        aud: "authenticated",
        role: "authenticated",
      } as Awaited<ReturnType<Awaited<ReturnType<typeof createClient>>["auth"]["getUser"]>>["data"]["user"];
    }
    return null;
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
