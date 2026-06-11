import { cookies } from "next/headers";

const DEMO_USER_COOKIE = "vihaan_demo_user";
const DEMO_AUTH_COOKIE = "vihaan_demo_auth";

export function isDemoMode(): boolean {
  const url = process.env.SUPABASE_URL || "";
  const key = process.env.SUPABASE_ANON_KEY || "";
  return (
    !url ||
    !key ||
    url.includes("placeholder") ||
    key.includes("placeholder") ||
    url === "your-supabase-url" ||
    key === "your-supabase-anon-key"
  );
}

export interface DemoUser {
  id: string;
  email: string;
  created_at: string;
}

export function createDemoUser(email: string): DemoUser {
  return {
    id: `demo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    email,
    created_at: new Date().toISOString(),
  };
}

export async function setDemoAuthCookies(user: DemoUser) {
  const cookieStore = await cookies();
  cookieStore.set(DEMO_AUTH_COOKIE, "true", {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  cookieStore.set(DEMO_USER_COOKIE, JSON.stringify(user), {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getDemoUser(): Promise<DemoUser | null> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(DEMO_AUTH_COOKIE);
  const userCookie = cookieStore.get(DEMO_USER_COOKIE);

  if (!authCookie || !userCookie) return null;

  try {
    return JSON.parse(userCookie.value) as DemoUser;
  } catch {
    return null;
  }
}

export async function clearDemoAuth() {
  const cookieStore = await cookies();
  cookieStore.delete(DEMO_AUTH_COOKIE);
  cookieStore.delete(DEMO_USER_COOKIE);
}

export function getDemoUserFromRequest(
  requestCookies: { get(name: string): { value: string } | undefined }
): DemoUser | null {
  const authCookie = requestCookies.get(DEMO_AUTH_COOKIE);
  const userCookie = requestCookies.get(DEMO_USER_COOKIE);

  if (!authCookie || !userCookie) return null;

  try {
    return JSON.parse(userCookie.value) as DemoUser;
  } catch {
    return null;
  }
}
