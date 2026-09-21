self.addEventListener("push", (event) => {
  if (!event.data) return;

  try {
    const data = event.data.json();
    const title = data.title || "ORION Admin — Nouveau Lead !";
    const options = {
      body: data.body || "Un visiteur vient d'être qualifié par l'assistant IA.",
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      vibrate: [200, 100, 200],
      data: {
        url: data.url || "/fr/admin",
      },
    };

    event.waitUntil(self.registration.showNotification(title, options));
  } catch (err) {
    const rawText = event.data.text();
    event.waitUntil(
      self.registration.showNotification("ORION Notification", {
        body: rawText,
        data: { url: "/fr/admin" },
      })
    );
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || "/fr/admin";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url.includes("/admin") && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
  );
});
