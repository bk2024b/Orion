"use client";

export const OPEN_CHAT_EVENT = "orion:open-chat";

export default function OpenChatButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => document.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT))}
      className={className}
    >
      {children}
    </button>
  );
}
