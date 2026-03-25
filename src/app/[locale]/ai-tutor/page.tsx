'use client';

import { use, useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Send, Bot, User, Zap, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface AiTutorPageProps {
  params: Promise<{ locale: string }>;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AiTutorPage({ params }: AiTutorPageProps) {
  const { locale } = use(params);
  const t = useTranslations('aiTutor');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: t('welcome'),
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Mock user plan
  const userPlan = 'free';
  const FREE_LIMIT = 5;
  const isLimitReached = userPlan === 'free' && messageCount >= FREE_LIMIT;

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text) return;

    if (isLimitReached) {
      setShowUpgradeModal(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setMessageCount((prev) => prev + 1);

    // Add placeholder assistant message for streaming
    const assistantId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      {
        id: assistantId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      },
    ]);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            ...messages
              .filter((m) => m.role !== 'assistant' || m.content !== '')
              .slice(-10)
              .map((m) => ({ role: m.role, content: m.content })),
            { role: 'user', content: text },
          ],
          userProfile: {
            nativeLanguage: 'vi',
            currentLevel: 'N4',
            targetLevel: 'N3',
          },
        }),
      });

      if (!response.ok) {
        throw new Error('API error');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error('No reader');

      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') break;

            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                accumulated += parsed.text;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId ? { ...m, content: accumulated } : m
                  )
                );
              }
            } catch {
              // ignore parse errors
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: locale === 'ja' ? 'エラーが発生しました。もう一度お試しください。' : 'Đã xảy ra lỗi. Vui lòng thử lại.' }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    t('quickQ1'),
    t('quickQ2'),
    t('quickQ3'),
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#0066CC] to-[#00B894] rounded-full flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900">{t('title')}</h1>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[#00B894] animate-pulse" />
              <span className="text-xs text-gray-500">
                {locale === 'ja' ? 'オンライン' : 'Đang trực tuyến'}
              </span>
            </div>
          </div>
        </div>

        {/* Message counter for free users */}
        {userPlan === 'free' && (
          <div className={cn(
            'flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full',
            isLimitReached
              ? 'bg-red-100 text-red-600'
              : messageCount >= FREE_LIMIT - 2
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-gray-100 text-gray-600'
          )}>
            <Zap className="h-3.5 w-3.5" />
            {FREE_LIMIT - messageCount}/{FREE_LIMIT}
          </div>
        )}
      </div>

      {/* Limit warning */}
      {userPlan === 'free' && messageCount >= FREE_LIMIT - 1 && !isLimitReached && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-700">
            {locale === 'ja' ? 'あと1回で本日の無料利用回数に達します' : 'Còn 1 lần nữa là đạt giới hạn miễn phí hôm nay'}
          </p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex gap-3 chat-message',
              message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            )}
          >
            {/* Avatar */}
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
              message.role === 'assistant'
                ? 'bg-gradient-to-br from-[#0066CC] to-[#00B894]'
                : 'bg-gray-200'
            )}>
              {message.role === 'assistant' ? (
                <Bot className="h-4 w-4 text-white" />
              ) : (
                <User className="h-4 w-4 text-gray-600" />
              )}
            </div>

            {/* Bubble */}
            <div className={cn(
              'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
              message.role === 'assistant'
                ? 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
                : 'bg-[#0066CC] text-white rounded-tr-none'
            )}>
              {message.content || (
                <span className="flex items-center gap-1 text-gray-400">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick questions */}
      {messages.length === 1 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="text-sm bg-blue-50 text-[#0066CC] border border-blue-200 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input area */}
      <div className="relative">
        {isLimitReached ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
            <p className="text-red-600 text-sm font-medium mb-3">{t('limitReached')}</p>
            <Link href={`/${locale}/pricing`}>
              <Button size="sm" variant="accent">
                {t('upgrade')}
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex gap-2 bg-white border border-gray-200 rounded-2xl p-2 shadow-sm focus-within:border-[#0066CC] transition-colors">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('placeholder')}
              rows={1}
              className="flex-1 resize-none bg-transparent px-2 py-1.5 text-sm focus:outline-none text-gray-800 placeholder:text-gray-400 max-h-32"
              style={{ minHeight: '36px' }}
              disabled={isLoading}
            />
            <Button
              size="icon"
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="flex-shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Upgrade Modal */}
      <Modal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        title={locale === 'ja' ? 'メッセージ上限に達しました' : 'Đã đạt giới hạn tin nhắn'}
      >
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <p className="text-gray-700">{t('limitReached')}</p>
          </div>
          <div className="space-y-3">
            <Link href={`/${locale}/pricing`} onClick={() => setShowUpgradeModal(false)}>
              <Button fullWidth>
                {t('upgrade')}
              </Button>
            </Link>
            <Button
              fullWidth
              variant="outline"
              onClick={() => setShowUpgradeModal(false)}
            >
              {locale === 'ja' ? '明日また来る' : 'Quay lại ngày mai'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
