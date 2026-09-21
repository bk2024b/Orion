"use client";

import { useState } from "react";
import { ProjectMessage } from "@/lib/projects";
import { Send, User, Bot, Sparkles, Shield } from "lucide-react";

interface Props {
  initialMessages: ProjectMessage[];
  projectId: string;
}

export default function ProjectChatThread({ initialMessages, projectId }: Props) {
  const [messages, setMessages] = useState<ProjectMessage[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg: ProjectMessage = {
      id: Date.now().toString(),
      sender: "client",
      senderName: "Vous (Client)",
      content: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Simulation de réponse de l'équipe ORION
    setTimeout(() => {
      const reply: ProjectMessage = {
        id: (Date.now() + 1).toString(),
        sender: "team",
        senderName: "Équipe ORION Support",
        content: "Message bien reçu ! Votre chef de projet vous répond dans les plus brefs délais.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, reply]);
    }, 1200);
  };

  return (
    <div className="p-6 rounded-3xl bg-obsidian-card border border-obsidian-border flex flex-col h-[520px]">
      <div className="pb-4 border-b border-obsidian-border flex items-center justify-between">
        <div>
          <h3 className="font-heading font-bold text-base text-white">
            Fil de discussion direct
          </h3>
          <p className="text-[11px] text-slate-400">
            Échangez directement avec l'équipe de développement et le lead architect.
          </p>
        </div>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
      </div>

      <div className="flex-1 overflow-y-auto py-4 space-y-3">
        {messages.map((m) => {
          const isMe = m.sender === "client";
          return (
            <div
              key={m.id}
              className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
            >
              <span className="text-[10px] text-slate-400 mb-1 px-1">
                {m.senderName} • {m.timestamp}
              </span>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                  isMe
                    ? "bg-violet-electric text-white rounded-tr-none shadow-violet"
                    : m.sender === "ai"
                    ? "bg-obsidian-surface border border-violet-electric/30 text-violet-200 rounded-tl-none"
                    : "bg-obsidian-surface border border-obsidian-border text-slate-200 rounded-tl-none"
                }`}
              >
                {m.content}
              </div>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSend} className="pt-3 border-t border-obsidian-border flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Écrire un message à l'équipe ORION..."
          className="flex-1 bg-obsidian-surface border border-obsidian-border rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-glow transition-colors"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="p-2.5 rounded-xl bg-violet-electric disabled:opacity-40 hover:bg-violet-hover text-white transition-all shadow-violet shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
