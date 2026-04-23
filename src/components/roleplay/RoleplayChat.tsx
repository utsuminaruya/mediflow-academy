'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { RoleplayMessage, RoleplayScenario } from '@/types/roleplay';
import MessageBubble from './MessageBubble';
import { Send, Mic, MicOff, Lightbulb, HelpCircle, X } from 'lucide-react';

interface HintData {
  suggestion_ja: string;
  explanation_vi: string;
  alternative_ja: string;
}

interface Props {
  scenario: RoleplayScenario;
  sessionId: string;
  initialMessages: RoleplayMessage[];
  locale: string;
  onEnd: () => void;
}

const CATEGORY_EMOJI: Record<string, string> = {
  morning_care: '🌅', meal_assistance: '🍱', bathing: '🛁',
  toileting: '🚿', mobility: '♿', vital_check: '💓',
  handover: '📋', family_communication: '👨‍👩‍👧', emergency: '🚨',
};

export default function RoleplayChat({ scenario, sessionId, initialMessages, locale, onEnd }: Props) {
  const [messages, setMessages] = useState<RoleplayMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [hint, setHint] = useState<HintData | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingText]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;
    setInput('');
    setHint(null);
    setIsLoading(true);
    setStreamingText('');

    const userMsg: RoleplayMessage = { role: 'user', content: text, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);

    try {
      const res = await fetch('/api/roleplay/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, userMessage: text }),
      });

      if (!res.ok) throw new Error('Response failed');
      if (!res.body) throw new Error('No body');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let aiText = '';

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
                aiText += parsed.text;
                setStreamingText(aiText);
              }
            } catch { /* ignore */ }
          }
        }
      }

      if (aiText) {
        const aiMsg: RoleplayMessage = { role: 'ai', content: aiText, timestamp: new Date().toISOString() };
        setMessages(prev => [...prev, aiMsg]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setStreamingText('');
      textareaRef.current?.focus();
    }
  }, [sessionId, isLoading]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const fetchHint = async () => {
    try {
      const res = await fetch('/api/roleplay/hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });
      if (res.ok) {
        const data = await res.json();
        setHint(data);
      }
    } catch (err) { console.error(err); }
  };

  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('音声入力はChrome/Safariのみ対応しています');
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    const SpeechRecognitionAPI = win.SpeechRecognition || win.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) return;
    const recognition = new SpeechRecognitionAPI();
    recognition.lang = 'ja-JP';
    recognition.interimResults = false;
    recognition.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = e.results[0][0].transcript;
      setInput((prev: string) => prev + transcript);
    };
    recognition.onend = () => setIsRecording(false);
    recognition.onerror = () => setIsRecording(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  };

  const stopVoiceInput = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  };

  const characterEmoji = CATEGORY_EMOJI[scenario.category] || '👤';

  return (
    <div className="flex flex-col h-full bg-white">
      {/* ヘッダー */}
      <div className="flex-shrink-0 border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="text-xl">{characterEmoji}</span>
            <div>
              <h2 className="font-bold text-sm text-gray-900">
                {locale === 'vi' ? scenario.title.vi : scenario.title.ja}
              </h2>
              <p className="text-xs text-gray-400">{scenario.ai_character.name} · {scenario.difficulty}</p>
            </div>
          </div>
          <button
            onClick={onEnd}
            className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors"
          >
            <X size={14} /> 終了
          </button>
        </div>
        {/* シーン説明 */}
        <div className="bg-amber-50 rounded-lg px-3 py-1.5 text-xs text-amber-800">
          {locale === 'vi' ? scenario.scene_setting.vi : scenario.scene_setting.ja}
        </div>
      </div>

      {/* メッセージ一覧 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 text-sm py-8">
            {locale === 'vi'
              ? 'Hãy bắt đầu hội thoại! Nói chào buổi sáng với ông/bà ấy.'
              : '会話を始めましょう。声かけをしてみてください。'}
          </div>
        )}
        {messages.map((msg, i) => (
          <MessageBubble
            key={i}
            message={msg}
            characterName={msg.role === 'ai' ? scenario.ai_character.name : undefined}
            characterEmoji={msg.role === 'ai' ? characterEmoji : undefined}
          />
        ))}
        {/* ストリーミング中の表示 */}
        {streamingText && (
          <MessageBubble
            message={{ role: 'ai', content: streamingText, timestamp: new Date().toISOString() }}
            characterName={scenario.ai_character.name}
            characterEmoji={characterEmoji}
          />
        )}
        {isLoading && !streamingText && (
          <div className="flex gap-2 justify-start">
            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-lg">{characterEmoji}</div>
            <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0s]" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.15s]" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.3s]" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* ヒント表示 */}
      {hint && (
        <div className="flex-shrink-0 mx-4 mb-2 bg-blue-50 rounded-xl p-3 text-sm border border-blue-100">
          <div className="flex justify-between items-start mb-1">
            <span className="text-blue-700 font-medium text-xs">ヒント</span>
            <button onClick={() => setHint(null)} className="text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          </div>
          <p className="text-blue-800 font-medium">「{hint.suggestion_ja}」</p>
          {hint.alternative_ja && (
            <p className="text-blue-600 text-xs mt-0.5">別の言い方: 「{hint.alternative_ja}」</p>
          )}
          <p className="text-gray-500 text-xs mt-1">{hint.explanation_vi}</p>
          <button
            className="mt-1.5 text-xs text-blue-600 underline"
            onClick={() => { setInput(hint.suggestion_ja); setHint(null); textareaRef.current?.focus(); }}
          >
            この文を使う
          </button>
        </div>
      )}

      {/* 困った時 */}
      {showHelp && (
        <div className="flex-shrink-0 mx-4 mb-2 bg-green-50 rounded-xl p-3 border border-green-100">
          <div className="flex justify-between mb-1">
            <span className="text-green-700 font-medium text-xs">困った時のフレーズ</span>
            <button onClick={() => setShowHelp(false)}><X size={14} className="text-gray-400" /></button>
          </div>
          {scenario.key_phrases.map((kp, i) => (
            <div key={i} className="flex items-center gap-2 py-1 border-b border-green-100 last:border-0">
              <button
                className="text-sm font-medium text-green-800 hover:underline text-left"
                onClick={() => { setInput(kp.phrase); setShowHelp(false); textareaRef.current?.focus(); }}
              >
                {kp.phrase}
              </button>
              <span className="text-xs text-gray-400">— {locale === 'vi' ? kp.meaning.vi : kp.meaning.ja}</span>
            </div>
          ))}
        </div>
      )}

      {/* 入力エリア */}
      <div className="flex-shrink-0 border-t border-gray-100 px-4 py-3">
        <div className="flex items-end gap-2">
          {/* ヒント/困ったボタン */}
          <div className="flex flex-col gap-1">
            <button
              onClick={fetchHint}
              className="p-2 rounded-lg hover:bg-yellow-50 text-yellow-500 transition-colors"
              title="ヒントを見る"
            >
              <Lightbulb size={18} />
            </button>
            <button
              onClick={() => setShowHelp(v => !v)}
              className="p-2 rounded-lg hover:bg-green-50 text-green-500 transition-colors"
              title="困った時"
            >
              <HelpCircle size={18} />
            </button>
          </div>

          {/* テキスト入力 */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="日本語で話しかけてください..."
              rows={1}
              className="w-full resize-none rounded-2xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent pr-10"
              style={{ minHeight: '44px', maxHeight: '120px' }}
              disabled={isLoading}
            />
            <span className="absolute right-3 bottom-2.5 text-xs text-gray-300">{input.length}</span>
          </div>

          {/* 音声入力 */}
          <button
            onPointerDown={startVoiceInput}
            onPointerUp={stopVoiceInput}
            className={`p-2.5 rounded-xl transition-colors ${isRecording ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
          >
            {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
          </button>

          {/* 送信 */}
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
