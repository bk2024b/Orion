-- ==========================================
-- ORION DATABASE SCHEMA (PostgreSQL / Supabase)
-- Version simplifiée : le site ne fait plus que capturer les contacts
-- des visiteurs via le chatbot. Idempotent : peut être rejoué sans risque.
-- ==========================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Si vous aviez déjà exécuté l'ancienne version du schéma (avec projects,
-- conversations, messages, push_subscriptions), ces tables ne sont plus
-- utilisées par le site et peuvent être supprimées :
DROP TABLE IF EXISTS public.messages;
DROP TABLE IF EXISTS public.conversations;
DROP TABLE IF EXISTS public.projects;
DROP TABLE IF EXISTS public.push_subscriptions;

-- Table des Contacts (visiteurs qualifiés par le chatbot)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT,
    email TEXT,
    whatsapp TEXT,
    company TEXT,
    status TEXT NOT NULL DEFAULT 'new', -- 'new' | 'qualified' | 'contacted' | 'converted' | 'lost'
    source TEXT NOT NULL DEFAULT 'chat',
    need_summary TEXT,
    budget_range TEXT,
    timeline TEXT,
    division TEXT, -- 'web' | 'business' | 'systems' | 'ai_automation'
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Le chatbot écrit avec la clé anonyme (publique, côté navigateur) : il ne
-- peut que CRÉER un contact, jamais lire les contacts des autres visiteurs.
-- (L'ancien schéma activait la RLS sans jamais définir cette policy, ce qui
-- bloquait silencieusement l'enregistrement des leads dans Supabase.)
DROP POLICY IF EXISTS "Anon can create a lead" ON public.leads;
CREATE POLICY "Anon can create a lead"
  ON public.leads FOR INSERT
  WITH CHECK (true);

-- La page Admin (/admin) lit les contacts exclusivement depuis le serveur,
-- via la clé service_role (voir SUPABASE_SERVICE_ROLE_KEY dans .env), qui
-- contourne la RLS. Aucune policy SELECT publique n'est donc nécessaire —
-- et il ne faut surtout pas en ajouter une, sous peine d'exposer les
-- coordonnées de tous les visiteurs à n'importe qui.
