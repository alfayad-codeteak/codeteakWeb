// components/ChatMessage.tsx
// Reusable chat bubble for user/assistant messages.

import React from "react";
import { cn } from "@/lib/utils"; // assuming existing utility; if not, replace with simple join

export type ChatRole = "user" | "assistant" | "system";

export interface ChatMessageProps {
  id?: string;
  role: ChatRole;
  content: string;
  isStreaming?: boolean;
  onCopy?: (content: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  role,
  content,
  isStreaming,
  onCopy,
}) => {
  const isUser = role === "user";
  const isSystem = role === "system";

  if (isSystem) {
    // Typically we do not render system messages in the transcript.
    return null;
  }

  const handleCopy = () => {
    if (!onCopy) return;
    onCopy(content);
  };

  return (
    <div
      className={cn(
        "flex w-full gap-2 md:gap-3",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      {/* Bubble */}
      <div
        className={cn(
          "relative max-w-[80%] rounded-2xl px-3 py-2 text-sm md:text-[0.95rem] leading-relaxed shadow-sm",
          isUser
            ? "bg-blue-600 text-white rounded-br-sm"
            : "bg-muted text-foreground/90 rounded-bl-sm",
        )}
      >
        <div className="whitespace-pre-wrap break-words">
          {content}
          {isStreaming && (
            <span className="ml-[1px] inline-block h-4 w-[2px] animate-pulse bg-current align-baseline" />
          )}
        </div>

        {/* Copy button (top-right of bubble) */}
        {onCopy && (
          <button
            type="button"
            aria-label="Copy message"
            onClick={handleCopy}
            className={cn(
              "absolute -top-2",
              isUser ? "-left-2" : "-right-2",
              "rounded-full border border-border bg-background/80 p-1 text-[0.65rem] text-muted-foreground shadow-sm backdrop-blur hover:text-foreground",
            )}
          >
            ⧉
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;

