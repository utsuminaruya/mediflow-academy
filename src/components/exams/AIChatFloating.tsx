'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react';
import type { ExamQuestion } from '@/types/exam';

interface AIChatFloatingProps {
  question: ExamQuestion | null;
  locale: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChatFloating({ question, locale }: AIChatFloatingProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingText]);

  // 問題が変わったらチャット履歴をリセット
  useEffect(() => {
    setMessages([]);
    setStreamingText('');
  }, [question?.id]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading || !question) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);
    setStreamingText('');

    try {
      const res = await fetch('/api/exams/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question_id: question.id, user_message: userMsg, locale }),
      });

      if (!res.body) throw new Error('No stream');
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let aiText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        for (const line of chunk.split('\n')) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') break;
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) { aiText += parsed.text; setStreamingText(aiText); }
            } catch { /* ignore */ }
          }
        }
      }

      if (aiText) setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: locale === 'vi' ? 'Xin lỗi, đã có lỗi xảy ra.' : 'エラーが発生しました。もう一度お試しください。' }]);
    } finally {
      setIsLoading(false);
      setStreamingText('');
    }
  };

  const suggestedQuestions = locale === 'vi'
    ? ['Tại sao đáp án này đúng?', 'Giải thích thêm về thuật ngữ này', 'Ví dụ thực tế là gì?']
    : ['なぜこれが正解ですか？', 'この用語を詳しく説明して', '実際の現場ではどう使う？'];

  return (
    <>
      {/* フローティングボタン */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all ${isOpen ? 'hidden' : 'flex'}`}
        title={locale === 'vi' ? 'Hỏi AI' : 'AIに質問'}
      >
        <MessageCircle className="h-6 w-6" />
        {messages.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">
            {messages.filter(m => m.role === 'assistant').length}
          </span>
        )}
      </button>

      {/* チャットパネル */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 z-50 w-full sm:w-96 h-[500px] sm:h-[560px] sm:bottom-6 sm:right-6 bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col border border-gray-200">
          {/* ヘッダー */}
          <div className="flex items-center justify-between px-4 py-3 bg-blue-600 text-white rounded-t-2xl">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <span className="font-bold text-sm">Medi{locale === 'vi' ? ' Sensei' : '先生'}</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 rounded-lg p-1">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* メッセージエリア */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center py-4">
                <Bot className="h-10 w-10 text-blue-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500 mb-4">
                  {locale === 'vi' ? 'Hỏi tôi về bài này nhé!' : 'この問題について何でも聞いてください！'}
                </p>
                <div className="space-y-2">
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => { setInput(q); }}
                      className="w-full text-left text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {streamingText && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-bl-sm px-3 py-2 bg-gray-100 text-gray-900 text-sm leading-relaxed">
                  {streamingText}
                </div>
              </div>
            )}

            {isLoading && !streamingText && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-3 py-2 flex gap-1 items-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0s]" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.3s]" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* 入力エリア */}
          <div className="border-t border-gray-100 p-3 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }}}
              placeholder={locale === 'vi' ? 'Hỏi về bài này...' : 'この問題について質問...'}
              disabled={isLoading}
              className="flex-1 text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl transition-colors"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
