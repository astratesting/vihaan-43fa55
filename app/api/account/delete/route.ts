import { NextResponse } from "next/server";
import { getUser } from "@/lib/supabase/server";
import { isDemoMode, clearDemoAuth } from "@/lib/demo-auth";

export async function POST() {
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (isDemoMode()) {
    await clearDemoAuth();
    return NextResponse.json({ message: "Account deleted." });
  }

  const { getServiceClient } = await import("@/lib/supabase/service");
  const serviceClient = getServiceClient();
  const { error } = await serviceClient.auth.admin.deleteUser(user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Account deleted." });
}
