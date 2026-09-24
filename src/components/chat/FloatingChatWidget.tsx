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
} from "lucide-react";
import { OPEN_CHAT_EVENT } from "./OpenChatButton";

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

  useEffect(() => {
    // Permet à n'importe quel bouton de la page ("Démarrer un projet", etc.)
    // d'ouvrir ce chat, qui est désormais l'unique formulaire de contact du site.
    const openHandler = () => setIsOpen(true);
    document.addEventListener(OPEN_CHAT_EVENT, openHandler);
    return () => document.removeEventListener(OPEN_CHAT_EVENT, openHandler);
  }, []);

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
          className="group relative flex items-center gap-2.5 rounded-full bg-lime px-4 py-3 font-semibold text-[#080808] shadow-[0_0_25px_-5px_rgba(200,255,69,0.5)] transition-all duration-300 hover:scale-105"
          aria-label="Ouvrir le chat de qualification IA"
        >
          <div className="absolute -top-1 -right-1 h-2.5 w-2.5 animate-ping rounded-full bg-[#080808]/60" />
          <div className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-[#080808]/60" />
          <MessageSquare className="h-5 w-5 transition-transform group-hover:rotate-6" />
          <span className="hidden text-sm sm:inline">Échanger avec l'IA ORION</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="flex h-[540px] max-h-[85vh] w-[360px] flex-col overflow-hidden rounded-2xl border border-line bg-[#0b0b0b] shadow-2xl sm:w-[400px]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line bg-surface-2 p-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-lime/40 bg-lime/10 text-lime">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-ink bg-emerald-500" />
              </div>
              <div>
                <h3 className="flex items-center gap-1.5 text-sm font-semibold text-white">
                  {t("headerTitle")}
                  <Sparkles className="h-3.5 w-3.5 text-lime" />
                </h3>
                <p className="text-[11px] text-muted">{t("headerStatus")}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-muted transition-colors hover:bg-line hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Lead Qualified Success Banner */}
          {leadQualified && (
            <div className="flex items-center gap-2 border-b border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs text-emerald-400">
              <CheckCircle className="h-4 w-4 shrink-0" />
              <span>Votre demande a été transmise à notre équipe !</span>
            </div>
          )}

          {/* Messages Feed */}
          <div className="flex-1 space-y-3.5 overflow-y-auto bg-ink/60 p-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "ai" && (
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-lime/10 text-lime">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed sm:text-sm ${
                    msg.role === "user"
                      ? "rounded-tr-none bg-lime text-[#080808]"
                      : "rounded-tl-none border border-line bg-surface-2 text-[#ddd]"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <span
                    className={`mt-1 block text-right text-[10px] ${
                      msg.role === "user" ? "text-[#080808]/60" : "text-muted"
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-lime/10 text-lime">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-1 rounded-2xl rounded-tl-none border border-line bg-surface-2 px-4 py-2">
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-lime" />
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-lime [animation-delay:0.2s]" />
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-lime [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length <= 2 && (
            <div className="flex flex-wrap gap-1.5 border-t border-line/50 bg-[#080808] px-3 py-2">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  className="max-w-full truncate rounded-full border border-line bg-surface-2 px-2.5 py-1 text-left text-[11px] text-[#ccc] transition-all hover:border-lime/40 hover:text-white"
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
            className="flex items-center gap-2 border-t border-line bg-surface-2 p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("inputPlaceholder")}
              className="flex-1 rounded-xl border border-line bg-[#080808] px-3.5 py-2 text-xs text-white placeholder-muted focus:border-lime focus:outline-none sm:text-sm"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="shrink-0 rounded-xl bg-lime p-2.5 text-[#080808] transition-all hover:brightness-95 disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
