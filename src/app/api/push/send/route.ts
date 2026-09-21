import { NextRequest, NextResponse } from "next/server";
import { sendPushNotification } from "@/lib/push";
import { inMemorySubscriptions } from "@/lib/store";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { title, body, url } = await req.json();

    const payload = {
      title: title || "🔔 Alerte ORION Admin",
      body: body || "Test de notification Web Push.",
      url: url || "/fr/admin",
    };

    let totalSent = 0;

    try {
      const supabase = await createClient();
      const { data: subs } = await supabase.from("push_subscriptions").select("*");
      if (subs && subs.length > 0) {
        for (const sub of subs) {
          await sendPushNotification(
            { endpoint: sub.endpoint, keys: sub.keys },
            payload
          );
          totalSent++;
        }
      }
    } catch (dbErr) {
      for (const sub of inMemorySubscriptions) {
        await sendPushNotification(sub as any, payload);
        totalSent++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Notification envoyée à ${totalSent} appareils.`,
    });
  } catch (error: any) {
    console.error("Push send error:", error);
    return NextResponse.json(
      { error: "Failed to send push notification" },
      { status: 500 }
    );
  }
}
