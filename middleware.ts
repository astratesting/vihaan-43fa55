import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isDemoMode, getDemoUserFromRequest } from "@/lib/demo-auth";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");
  const isApiAccount = request.nextUrl.pathname.startsWith("/api/account");

  // In demo mode, check for demo auth cookies
  if (isDemoMode()) {
    const demoUser = getDemoUserFromRequest(request.cookies);

    if ((isDashboard || isApiAccount) && !demoUser) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  }

  // Real Supabase mode
  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if ((isDashboard || isApiAccount) && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
