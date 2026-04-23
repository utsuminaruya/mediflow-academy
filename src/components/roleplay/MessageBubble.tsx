'use client';
import { RoleplayMessage } from '@/types/roleplay';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface Props {
  message: RoleplayMessage;
  characterName?: string;
  characterEmoji?: string;
}

export default function MessageBubble({ message, characterName = 'AI', characterEmoji = '👴' }: Props) {
  const isAI = message.role === 'ai';

  const ratingIcon = message.evaluation?.rating === 'good'
    ? <CheckCircle size={14} className="text-green-500" />
    : message.evaluation?.rating === 'okay'
    ? <AlertCircle size={14} className="text-yellow-500" />
    : message.evaluation?.rating === 'needs_work'
    ? <XCircle size={14} className="text-red-500" />
    : null;

  return (
    <div className={`flex gap-2 ${isAI ? 'justify-start' : 'justify-end'}`}>
      {isAI && (
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-lg">
          {characterEmoji}
        </div>
      )}
      <div className={`max-w-[75%] ${isAI ? '' : 'items-end'} flex flex-col gap-1`}>
        {isAI && (
          <span className="text-xs text-gray-400 ml-1">{characterName}</span>
        )}
        <div
          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
            ${isAI
              ? 'bg-gray-100 text-gray-800 rounded-tl-sm'
              : 'bg-blue-600 text-white rounded-tr-sm'
            }`}
        >
          {message.content}
        </div>
        {message.evaluation && (
          <div className={`flex items-center gap-1 text-xs ${isAI ? '' : 'justify-end'}`}>
            {ratingIcon}
            {message.evaluation.note && (
              <span className="text-gray-400">{message.evaluation.note}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
