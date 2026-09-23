import { NextRequest, NextResponse } from "next/server";
import { groq, GROQ_MODEL } from "@/lib/groq";
import {
  QUALIFICATION_SYSTEM_PROMPT,
  CREATE_LEAD_TOOL,
} from "@/lib/ai/qualification-prompt";
import { createClient } from "@/lib/supabase/server";
import { inMemoryLeads } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const { messages, sessionToken } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages array" },
        { status: 400 }
      );
    }

    const groqApiKey = process.env.GROQ_API_KEY;

    // Mode simulation si aucune clé valide n'est injectée
    if (!groqApiKey || groqApiKey === "dummy_key_for_build" || groqApiKey.startsWith("gsk_your")) {
      const lastUserMsg = messages[messages.length - 1]?.content || "";

      const hasContact =
        /[\w.-]+@[\w.-]+\.\w+/.test(lastUserMsg) ||
        /\+?[0-9]{8,15}/.test(lastUserMsg.replace(/[\s-]/g, ""));

      if (hasContact) {
        const lead = {
          id: `lead_${Date.now()}`,
          name: "Prospect Qualifié",
          email_or_whatsapp: lastUserMsg,
          division: "web",
          need_summary: "Demande de création de système digital via le chat.",
          budget_range: "Standard",
          timeline: "1-2 mois",
          created_at: new Date().toISOString(),
          status: "qualified",
        };
        inMemoryLeads.unshift(lead);

        return NextResponse.json({
          reply:
            "Parfait ! Vos coordonnées ont bien été enregistrées. Un lead architect d'ORION vous recontacte sous 24h avec un plan de cadrage détaillé. Merci pour votre confiance !",
          leadCreated: true,
          lead,
        });
      }

      return NextResponse.json({
        reply:
          "C'est très clair ! Pouvez-vous me préciser l'objectif business prioritaire et un email ou numéro WhatsApp où vous joindre ?",
        leadCreated: false,
      });
    }

    const groqMessages = [
      { role: "system" as const, content: QUALIFICATION_SYSTEM_PROMPT },
      ...messages.map((m: any) => ({
        role: (m.role === "ai" || m.role === "assistant" ? "assistant" : "user") as "assistant" | "user",
        content: m.content || m.text || "",
      })),
    ];

    const response = await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages: groqMessages,
      tools: [CREATE_LEAD_TOOL],
      tool_choice: "auto",
      temperature: 0.6,
      max_tokens: 600,
    });

    const choice = response.choices[0];
    const message = choice.message;

    if (message.tool_calls && message.tool_calls.length > 0) {
      const toolCall = message.tool_calls[0];
      if (toolCall.function.name === "create_lead") {
        let args: any = {};
        try {
          args = JSON.parse(toolCall.function.arguments);
        } catch (e) {
          console.error("Error parsing tool arguments:", e);
        }

        const leadData = {
          id: `lead_${Date.now()}`,
          name: args.contact_name || "Prospect Inconnu",
          email_or_whatsapp: args.contact || "",
          division: args.division || "web",
          need_summary: args.need_summary || "",
          budget_range: args.budget_range || "Non précisé",
          timeline: args.timeline || "Non précisé",
          created_at: new Date().toISOString(),
          status: "qualified",
        };

        inMemoryLeads.unshift(leadData);

        try {
          const supabase = await createClient();
          await supabase.from("leads").insert({
            name: args.contact_name || null,
            email: args.contact?.includes("@") ? args.contact : null,
            whatsapp: !args.contact?.includes("@") ? args.contact : null,
            division: args.division,
            need_summary: args.need_summary,
            budget_range: args.budget_range,
            timeline: args.timeline,
            status: "qualified",
            source: "chat",
          });
        } catch (dbErr) {
          console.log("[Supabase Lead Insert Fallback]:", dbErr);
        }

        const followUp = await groq.chat.completions.create({
          model: GROQ_MODEL,
          messages: [
            ...groqMessages,
            message,
            {
              role: "tool",
              tool_call_id: toolCall.id,
              content: JSON.stringify({ success: true, lead_id: leadData.id }),
            },
          ],
          temperature: 0.6,
        });

        return NextResponse.json({
          reply:
            followUp.choices[0]?.message?.content ||
            "Merci beaucoup ! Vos coordonnées ont bien été enregistrées. Notre équipe vous recontactera sous 24h.",
          leadCreated: true,
          lead: leadData,
        });
      }
    }

    return NextResponse.json({
      reply: message.content || "",
      leadCreated: false,
    });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
