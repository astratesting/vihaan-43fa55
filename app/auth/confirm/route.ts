import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({
      type: type as "signup" | "recovery" | "email_change" | "invite",
      token_hash,
    });

    if (!error) {
      return NextResponse.redirect(`${origin}/dashboard?welcome=1`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=confirm`);
}
