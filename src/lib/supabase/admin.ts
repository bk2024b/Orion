import { createClient } from "@supabase/supabase-js";

/**
 * Client Supabase réservé au serveur (route API admin uniquement).
 * Utilise la clé service_role pour lire la table "leads" sans être
 * limité par les policies RLS (qui n'autorisent que l'INSERT anonyme
 * depuis le chatbot). Ne jamais importer ce fichier dans du code
 * exécuté côté navigateur : la clé service_role donne un accès total
 * à la base de données.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
