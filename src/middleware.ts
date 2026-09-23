import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Matcher excluant strictement les routes API, les ressources internes Next.js et les fichiers statiques
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
