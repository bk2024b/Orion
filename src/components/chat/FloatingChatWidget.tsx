"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: "ai" | "user";
  text: string;
  timestamp: string;
}

export default function FloatingChatWidget() {
  const t = useTranslations("chatWidget");
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [leadQualified, setLeadQualified] = useState(false);
  const [sessionToken, setSessionToken] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialiser ou récupérer un sessionToken unique
    let token = localStorage.getItem("orion_chat_session");
    if (!token) {
      token = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem("orion_chat_session", token);
    }
    setSessionToken(token);

    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "ai",
          text: t("welcomeMessage"),
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }
  }, [t, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const msg = textToSend || input;
    if (!msg.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: msg,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    if (!textToSend) setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role === "ai" ? "assistant" : "user",
            content: m.text,
          })),
          sessionToken,
        }),
      });

      const data = await response.json();

      if (data.reply) {
        const aiMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "ai",
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, aiMsg]);
      }

      if (data.leadCreated) {
        setLeadQualified(true);
      }
    } catch (err) {
      console.error("Chat error:", err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        text: "Désolé, une petite erreur réseau est survenue. Pouvez-vous nous laisser directement vos coordonnées ou réessayer ?",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickPrompts = [t("quick1"), t("quick2"), t("quick3")];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-violet-electric to-violet-glow text-white font-semibold shadow-violet-lg hover:scale-105 transition-all duration-300"
          aria-label="Ouvrir le chat de qualification IA"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping absolute -top-1 -right-1" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -top-1 -right-1" />
          <MessageSquare className="w-5 h-5 transition-transform group-hover:rotate-6" />
          <span className="text-sm font-heading hidden sm:inline">
            Échanger avec l'IA ORION
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[540px] max-h-[85vh] rounded-2xl bg-obsidian-card border border-obsidian-border shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-4 bg-obsidian-surface border-b border-obsidian-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-violet-electric/20 border border-violet-glow/40 flex items-center justify-center text-violet-glow">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute -bottom-0.5 -right-0.5 border-2 border-obsidian" />
              </div>
              <div>
                <h3 className="text-sm font-semibold font-heading text-white flex items-center gap-1.5">
                  {t("headerTitle")}
                  <Sparkles className="w-3.5 h-3.5 text-violet-glow" />
                </h3>
                <p className="text-[11px] text-slate-400">{t("headerStatus")}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-obsidian-border transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lead Qualified Success Banner */}
          {leadQualified && (
            <div className="bg-emerald-500/10 border-b border-emerald-500/20 px-4 py-2 flex items-center gap-2 text-xs text-emerald-400">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>Votre demande a été transmise à notre équipe !</span>
            </div>
          )}

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-obsidian/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "ai" && (
                  <div className="w-7 h-7 rounded-lg bg-violet-electric/20 flex items-center justify-center text-violet-glow shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-violet-electric text-white rounded-tr-none shadow-violet"
                      : "bg-obsidian-surface border border-obsidian-border text-slate-200 rounded-tl-none"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <span className="block text-[10px] text-slate-400 mt-1 text-right">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-lg bg-violet-electric/20 flex items-center justify-center text-violet-glow shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="px-4 py-2 rounded-2xl bg-obsidian-surface border border-obsidian-border rounded-tl-none flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-glow animate-bounce" />
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-glow animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-glow animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length <= 2 && (
            <div className="px-3 py-2 bg-obsidian-card border-t border-obsidian-border/50 flex flex-wrap gap-1.5">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-obsidian-surface hover:bg-violet-soft border border-obsidian-border hover:border-violet-glow/40 text-slate-300 hover:text-white transition-all text-left truncate max-w-full"
                >
                  + {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-obsidian-surface border-t border-obsidian-border flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("inputPlaceholder")}
              className="flex-1 bg-obsidian-card border border-obsidian-border rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-glow transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-2.5 rounded-xl bg-violet-electric disabled:opacity-40 hover:bg-violet-hover text-white transition-all shadow-violet shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
