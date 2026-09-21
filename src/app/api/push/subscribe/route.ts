import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { inMemorySubscriptions } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const subscription = await req.json();

    if (!subscription || !subscription.endpoint) {
      return NextResponse.json(
        { error: "Invalid subscription" },
        { status: 400 }
      );
    }

    const exists = inMemorySubscriptions.some(
      (s) => s.endpoint === subscription.endpoint
    );
    if (!exists) {
      inMemorySubscriptions.push(subscription);
    }

    try {
      const supabase = await createClient();
      await supabase.from("push_subscriptions").upsert({
        endpoint: subscription.endpoint,
        keys: subscription.keys,
      });
    } catch (err) {
      console.log("[Supabase Push Save Fallback]:", err);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Push subscribe error:", error);
    return NextResponse.json(
      { error: "Failed to save subscription" },
      { status: 500 }
    );
  }
}
