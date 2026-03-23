"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Send, BookOpen, MessageCircle, HelpCircle, PenLine, HeartPulse, type LucideIcon } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const QUICK_ACTIONS: { key: string; Icon: LucideIcon; color: string }[] = [
  { key: "vocabQuiz", Icon: BookOpen, color: "bg-blue-50 text-blue-700 border-blue-200" },
  { key: "grammar", Icon: PenLine, color: "bg-green-50 text-green-700 border-green-200" },
  { key: "careTerms", Icon: HeartPulse, color: "bg-red-50 text-red-700 border-red-200" },
  { key: "conversation", Icon: MessageCircle, color: "bg-purple-50 text-purple-700 border-purple-200" },
  { key: "question", Icon: HelpCircle, color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
];

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: `こんにちは！Medi先生です😊

日本で医療・介護の夢を持つあなたを全力でサポートします！

今日は何を練習しますか？

🎯 **できること:**
• 語彙・文法の練習
• 介護用語クイズ
• JLPT模擬問題
• 介護記録の添削
• 会話練習

下のボタンから選んでも、自由に質問してもOKです！
Xin hãy cứ hỏi tôi bất cứ điều gì! 😊`,
  timestamp: new Date().toISOString(),
};

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${
        isUser ? "bg-secondary-500" : "bg-primary-500"
      }`}>
        {isUser ? "You" : "M"}
      </div>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
          isUser
            ? "bg-primary-500 text-white rounded-tr-sm"
            : "bg-white text-gray-800 rounded-tl-sm border border-gray-100"
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        <p className={`text-xs mt-1 ${isUser ? "text-white/60" : "text-gray-400"}`}>
          {new Date(message.timestamp).toLocaleTimeString("ja-JP", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}

export default function AITutorPage() {
  const t = useTranslations("aiTutor");
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: content.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setShowQuickActions(false);

    try {
      const response = await fetch("/api/ai/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          userProfile: {
            nativeLanguage: "vi",
            japaneseLevel: "N4",
          },
        }),
      });

      if (!response.ok) throw new Error("API error");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      let assistantContent = "";
      const assistantMessage: Message = {
        role: "assistant",
        content: "",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") break;
              try {
                const parsed = JSON.parse(data);
                if (parsed.type === "content_block_delta") {
                  assistantContent += parsed.delta?.text || "";
                  setMessages((prev) => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = {
                      ...assistantMessage,
                      content: assistantContent,
                    };
                    return newMessages;
                  });
                }
              } catch {}
            }
          }
        }
      }
    } catch (error) {
      const errorMessage: Message = {
        role: "assistant",
        content: "申し訳ありません。エラーが発生しました。もう一度お試しください。\nXin lỗi, đã xảy ra lỗi. Vui lòng thử lại.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (key: string) => {
    const actions: Record<string, string> = {
      vocabQuiz: "今日の単語テストをしてください。介護の語彙で5問出題してください。",
      grammar: "「〜てください」の文法を教えてください。例文もお願いします。",
      careTerms: "介護用語クイズを10問出題してください。",
      conversation: "食事介助の場面で利用者さんとの会話練習をしてください。",
      question: "質問があります。",
    };
    sendMessage(actions[key] || key);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 shadow-sm">
        <div className="container mx-auto max-w-2xl flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
            M
          </div>
          <div>
            <h1 className="font-bold text-gray-900">{t("title")}</h1>
            <p className="text-xs text-muted">{t("subtitle")}</p>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-xs text-gray-500">オンライン</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="container mx-auto max-w-2xl space-y-4">
          {messages.map((message, idx) => (
            <MessageBubble key={idx} message={message} />
          ))}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                M
              </div>
              <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100">
                <div className="flex gap-1 items-center">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                  <span className="text-xs text-gray-400 ml-2">{t("thinking")}</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Actions */}
      {showQuickActions && (
        <div className="bg-white border-t border-gray-100 px-4 py-3">
          <div className="container mx-auto max-w-2xl">
            <p className="text-xs text-muted mb-2">クイックアクション</p>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.key}
                  onClick={() => handleQuickAction(action.key)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium whitespace-nowrap transition-all hover:scale-105 ${action.color}`}
                >
                  <action.Icon className="w-4 h-4" />
                  {t(`quickActions.${action.key}` as any)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="bg-white border-t border-gray-100 px-4 py-3 safe-area-inset-bottom">
        <div className="container mx-auto max-w-2xl flex gap-3 items-end">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(input);
                }
              }}
              placeholder={t("placeholder")}
              rows={1}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-500 transition-all resize-none"
              style={{ minHeight: "48px", maxHeight: "120px" }}
            />
          </div>
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            className="w-12 h-12 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-200 text-white rounded-2xl flex items-center justify-center transition-all disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
