"use server";

import { createClient } from "@/lib/supabase/server";
import { isEmail } from "@/lib/format";
import { ensureUserRows } from "@/lib/auth/ensureUserRows";
import { isDemoMode, createDemoUser, setDemoAuthCookies } from "@/lib/demo-auth";

interface SignupResult {
  error?: string;
  success?: boolean;
  needsConfirmation?: boolean;
}

export async function signupAction(
  prevState: SignupResult,
  formData: FormData
): Promise<SignupResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  if (!isEmail(email)) {
    return { error: "Please enter a valid email address." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  // Demo mode: skip Supabase entirely
  if (isDemoMode()) {
    const demoUser = createDemoUser(email);
    await setDemoAuthCookies(demoUser);
    return { success: true };
  }

  const supabase = await createClient();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${appUrl}/auth/callback`,
      },
    });

    if (error) {
      return { error: error.message };
    }

    if (data.user && !data.session) {
      return { needsConfirmation: true, success: true };
    }

    if (data.user && data.session) {
      await ensureUserRows(data.user.id);
      return { success: true };
    }
  } catch {
    // Supabase unreachable — fall back to demo mode
    const demoUser = createDemoUser(email);
    await setDemoAuthCookies(demoUser);
    return { success: true };
  }

  return { error: "Something went wrong. Please try again." };
}
