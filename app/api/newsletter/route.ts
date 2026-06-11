import { NextResponse } from "next/server";
import { isEmail } from "@/lib/format";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !isEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }

    // In production, this would save to a newsletter provider or database.
    // For now, we just acknowledge the subscription.
    return NextResponse.json({ message: "Thanks — we'll be in touch." });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
