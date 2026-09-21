import webpush from "web-push";

const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "";
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY || "";
const vapidSubject = process.env.VAPID_SUBJECT || "mailto:contact@orion-digital.io";

if (vapidPublicKey && vapidPrivateKey) {
  webpush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);
}

export interface PushPayload {
  title: string;
  body: string;
  url?: string;
  data?: any;
}

export async function sendPushNotification(
  subscription: webpush.PushSubscription,
  payload: PushPayload
) {
  try {
    if (!vapidPublicKey || !vapidPrivateKey) {
      console.log("[Push Notification (Simulated)]:", payload);
      return { success: true, simulated: true };
    }

    const response = await webpush.sendNotification(
      subscription,
      JSON.stringify(payload)
    );
    return { success: true, statusCode: response.statusCode };
  } catch (error: any) {
    console.error("Error sending web push notification:", error);
    return { success: false, error: error.message };
  }
}
