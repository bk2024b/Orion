import { NextResponse } from "next/server";
import { inMemoryLeads } from "@/lib/store";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    try {
      const supabase = await createClient();
      const { data: dbLeads, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && dbLeads && dbLeads.length > 0) {
        return NextResponse.json({
          leads: [
            ...inMemoryLeads,
            ...dbLeads.map((l) => ({
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
          ],
        });
      }
    } catch (e) {
      // Fallback in-memory
    }

    return NextResponse.json({
      leads: inMemoryLeads,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
