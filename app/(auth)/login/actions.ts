"use server";

import { createClient } from "@/lib/supabase/server";
import { isEmail } from "@/lib/format";

interface LoginResult {
  error?: string;
  success?: boolean;
}

export async function loginAction(
  prevState: LoginResult,
  formData: FormData
): Promise<LoginResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  if (!isEmail(email)) {
    return { error: "Please enter a valid email address." };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "Invalid email or password." };
  }

  return { success: true };
}

interface ResetResult {
  error?: string;
  success?: boolean;
}

export async function resetPasswordAction(
  prevState: ResetResult,
  formData: FormData
): Promise<ResetResult> {
  const email = formData.get("email") as string;

  if (!email || !isEmail(email)) {
    return { error: "Please enter a valid email address." };
  }

  const supabase = await createClient();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${appUrl}/auth/callback?type=recovery`,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function updatePasswordAction(
  prevState: ResetResult,
  formData: FormData
): Promise<ResetResult> {
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}
