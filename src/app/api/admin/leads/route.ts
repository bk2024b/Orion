import { NextResponse } from "next/server";
import { inMemoryLeads } from "@/lib/store";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const supabase = createAdminClient();

    if (supabase) {
      const { data: dbLeads, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && dbLeads) {
        return NextResponse.json({
          leads: dbLeads.map((l) => ({
            id: l.id,
            name: l.name || "Prospect",
            email_or_whatsapp: l.email || l.whatsapp || "Non renseigné",
            division: l.division,
            need_summary: l.need_summary,
            budget_range: l.budget_range,
            timeline: l.timeline,
            status: l.status,
            created_at: l.created_at,
          })),
        });
      }
    }

    // Pas de Supabase configuré (variables d'env absentes) : données de démo.
    return NextResponse.json({ leads: inMemoryLeads });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
