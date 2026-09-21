-- ==========================================
-- ORION DATABASE SCHEMA (PostgreSQL / Supabase)
-- ==========================================

-- Extension pour UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Table des Leads (Prospects avant conversion)
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

-- 2. Table des Projets (Lead converti ou client direct)
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
    client_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    name TEXT,
    division TEXT NOT NULL, -- 'web' | 'business' | 'systems' | 'ai_automation'
    status TEXT NOT NULL DEFAULT 'discovery', -- 'discovery' | 'design' | 'build' | 'review' | 'delivered'
    summary TEXT,
    budget_estimate TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Table des Conversations
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
    type TEXT NOT NULL DEFAULT 'qualification', -- 'qualification' | 'project_thread'
    session_token TEXT UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Table des Messages
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender_type TEXT NOT NULL, -- 'visitor' | 'ai' | 'client' | 'team'
    sender_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    attachments JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Table des Push Subscriptions (Admin PWA)
CREATE TABLE IF NOT EXISTS public.push_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    endpoint TEXT NOT NULL UNIQUE,
    keys JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anon create conversations" ON public.conversations FOR INSERT WITH CHECK (true);
CREATE POLICY "Anon read conversations" ON public.conversations FOR SELECT USING (true);
CREATE POLICY "Anon insert messages" ON public.messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Anon read messages" ON public.messages FOR SELECT USING (true);
