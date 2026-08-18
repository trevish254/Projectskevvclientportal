import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, CheckCheck, Send, Image as ImageIcon, Smile } from 'lucide-react';
import { GlassCard } from './GlassCard.tsx';
import { ChatMessage } from '../types.ts';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'Anna M.',
    time: '07:23 AM',
    text: "Let's help each other out! 🤗 Maybe we can do a quick quiz together later? 📝",
    isYou: false,
    avatar: 'https://framerusercontent.com/images/vvPLPw59fpFHr4f5fTzD3clqPs.png',
  },
  {
    id: 'msg-2',
    sender: 'You',
    time: '07:34 AM',
    text: 'Sure, absolutely! That sounds great! 🙌',
    isYou: true,
  },
  {
    id: 'msg-3',
    sender: 'You',
    time: '07:35 AM',
    text: 'By the way, could you send me an invitation to the next English lesson?',
    isYou: true,
  },
  {
    id: 'msg-4',
    sender: 'Jake T.',
    time: '07:40 AM',
    text: 'Yes, of course! Here you go 😄',
    isYou: false,
    avatar: 'https://framerusercontent.com/images/CKUL4OElXdNJgyym2CEdnemp9I.png',
    isPromo: true,
    promoTitle: 'Unlock Your English Potential',
    promoAvatars: [
      'https://framerusercontent.com/images/UdLuwJVnNqzikbdCbwoMH6YMu4.png',
      'https://framerusercontent.com/images/k69zlZLfKDyfEsIVIyZYZwUH9wQ.png',
    ],
    promoCta: 'Join Now',
  },
];

export const ChatPanel: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState<number>(0);
  const [showTyping, setShowTyping] = useState<boolean>(false);
  const [customMessages, setCustomMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Progressive reveal sequence
  useEffect(() => {
    const delays = [800, 2200, 3800, 5500];
    const timeouts: NodeJS.Timeout[] = [];

    delays.forEach((delay, idx) => {
      // Show typing indicator slightly before message appears
      const typingTimer = setTimeout(() => {
        setShowTyping(true);
      }, delay - 600);

      const msgTimer = setTimeout(() => {
        setShowTyping(false);
        setVisibleCount((prev) => Math.max(prev, idx + 1));
      }, delay);

      timeouts.push(typingTimer, msgTimer);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleCount, customMessages, showTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const mins = now.getMinutes().toString().padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';

    const newMsg: ChatMessage = {
      id: `custom-${Date.now()}`,
      sender: 'You',
      time: `${hours}:${mins} ${ampm}`,
      text: inputValue.trim(),
      isYou: true,
    };

    setCustomMessages((prev) => [...prev, newMsg]);
    setInputValue('');
  };

  return (
    <div
      className={`w-full h-full flex flex-col min-h-0 transition-all duration-300 ${
        isExpanded ? 'fixed inset-4 z-50 lg:static' : ''
      }`}
      id="chat-panel-container"
    >
      <GlassCard className="w-full h-full flex flex-col p-3 sm:p-4 min-h-0 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="px-2 pt-1 pb-3 flex items-start justify-between flex-shrink-0 border-b border-black/5" id="chat-header">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-[20px] lg:text-[22px] font-semibold text-black leading-tight">
              Room Chat
            </h2>
            <div className="flex items-center gap-1.5">
              <div className="relative w-2.5 h-2.5 flex items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-[#29c012] opacity-30 animate-ping" />
                <span className="w-2 h-2 rounded-full bg-[#29c012]" />
              </div>
              <span className="text-[13px] font-medium text-[#29c012]">
                67 People in chat
              </span>
            </div>
          </div>

          <button
            id="chat-expand-toggle"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-9 h-9 bg-white/80 border border-black/5 rounded-[12px] flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-colors duration-200 shadow-sm"
            title={isExpanded ? 'Collapse Chat' : 'Expand Chat'}
            aria-label="Expand Chat"
          >
            <Maximize2
              size={16}
              className="transition-colors duration-200"
            />
          </button>
        </div>

        {/* Inner Chat Area */}
        <div
          className="flex-1 mt-3 rounded-[16px] flex flex-col relative min-h-0 overflow-hidden backdrop-blur-xl"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,235,230,0.4) 0%, rgba(255,225,220,0.4) 100%)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
          id="chat-messages-container"
        >
          {/* Gradient Border Mask */}
          <div
            className="absolute inset-0 rounded-[16px] pointer-events-none"
            style={{
              padding: '1px',
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)',
              WebkitMask:
                'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />

          {/* Messages Scroll Area */}
          <div className="flex-1 p-3 sm:p-4 pb-[85px] sm:pb-[95px] flex flex-col gap-3 overflow-y-auto min-h-0 z-0">
            {/* Render progressive initial messages */}
            {INITIAL_MESSAGES.slice(0, visibleCount).map((msg, index) => {
              if (msg.isYou) {
                return (
                  <div
                    key={msg.id}
                    id={`chat-message-${msg.id}`}
                    className="animate-chat-bubble-right flex flex-col items-end self-end max-w-[300px] sm:max-w-[320px] w-full"
                  >
                    <div
                      className={`p-3 sm:p-3.5 bg-black text-white w-full shadow-md ${
                        index === 2
                          ? 'rounded-[16px_16px_4px_16px]'
                          : 'rounded-[16px]'
                      }`}
                      style={{
                        boxShadow: 'inset 0 0 12px 2px rgba(255,255,255,0.5)',
                      }}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[13px] font-semibold text-white">
                          You
                        </span>
                        <div className="flex items-center gap-1">
                          <CheckCheck size={14} className="text-white/60" />
                          <span className="text-[11px] text-white/60">
                            {msg.time}
                          </span>
                        </div>
                      </div>
                      <p className="text-[14px] font-medium text-white leading-relaxed">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={msg.id}
                  id={`chat-message-${msg.id}`}
                  className="animate-chat-bubble flex gap-2.5 items-end max-w-[340px]"
                >
                  {/* Avatar */}
                  {msg.avatar && (
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[12px] overflow-hidden flex-shrink-0 bg-white/50 shadow-sm">
                      <img
                        src={msg.avatar}
                        alt={msg.sender}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  {/* Bubble */}
                  <div
                    className="flex-1 rounded-[16px_16px_16px_4px] p-3 sm:p-3.5 shadow-sm"
                    style={{ background: 'rgba(255, 255, 255, 0.95)' }}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[14px] font-semibold text-black">
                        {msg.sender}
                      </span>
                      <span className="text-[11px] text-[#a0a0a0]">
                        {msg.time}
                      </span>
                    </div>
                    <p className="text-[14px] font-medium text-black leading-relaxed">
                      {msg.text}
                    </p>

                    {/* Jake T Promo Card */}
                    {msg.isPromo && (
                      <div
                        className="rounded-[10px] p-3 flex flex-col gap-2.5 mt-2.5 shadow-md"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(51,51,51,1) 100%)',
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-[14px] font-medium text-white w-[120px] leading-tight">
                            {msg.promoTitle}
                          </h4>
                          {/* Overlapping Avatars */}
                          <div className="flex -space-x-2.5 items-center">
                            {msg.promoAvatars?.map((av, avIdx) => (
                              <img
                                key={avIdx}
                                src={av}
                                alt="Student"
                                className={`w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm ${
                                  avIdx === 0 ? 'z-10' : 'z-0'
                                }`}
                                referrerPolicy="no-referrer"
                              />
                            ))}
                          </div>
                        </div>

                        {/* Join Now CTA */}
                        <button
                          id="promo-join-now-button"
                          className="w-full bg-white text-black text-[13px] font-semibold py-2 rounded-lg text-center cursor-pointer hover:bg-neutral-100 transition-colors"
                          style={{
                            boxShadow: 'inset 0 0 6px 1px rgba(0,0,0,0.32)',
                          }}
                        >
                          {msg.promoCta || 'Join Now'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Custom User Messages */}
            {customMessages.map((msg) => (
              <div
                key={msg.id}
                className="animate-chat-bubble-right flex flex-col items-end self-end max-w-[300px] sm:max-w-[320px] w-full"
              >
                <div
                  className="p-3 sm:p-3.5 bg-black text-white w-full rounded-[16px] shadow-md"
                  style={{
                    boxShadow: 'inset 0 0 12px 2px rgba(255,255,255,0.5)',
                  }}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[13px] font-semibold text-white">
                      You
                    </span>
                    <div className="flex items-center gap-1">
                      <CheckCheck size={14} className="text-white/60" />
                      <span className="text-[11px] text-white/60">
                        {msg.time}
                      </span>
                    </div>
                  </div>
                  <p className="text-[14px] font-medium text-white leading-relaxed">
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {showTyping && (
              <div className="animate-chat-bubble flex items-center gap-2">
                <div
                  className="rounded-[14px] px-4 py-2.5 flex items-center gap-1 shadow-sm"
                  style={{ background: 'rgba(255, 255, 255, 0.95)' }}
                >
                  <span className="typing-dot w-1.5 h-1.5 bg-black/50 rounded-full" />
                  <span className="typing-dot w-1.5 h-1.5 bg-black/50 rounded-full" />
                  <span className="typing-dot w-1.5 h-1.5 bg-black/50 rounded-full" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Input Panel with Frosted Glass Overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-auto">
            {/* Backdrop blur gradient container */}
            <div
              className="absolute inset-0 backdrop-blur-xl bg-white/50 pointer-events-none"
              style={{
                WebkitBackdropFilter: 'blur(20px)',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, transparent 0%, black 25%)',
              }}
            />

            <div className="relative p-2.5">
              <form
                onSubmit={handleSendMessage}
                className="flex items-center gap-1.5 bg-white/95 rounded-[14px] p-1 pl-3 shadow-sm border border-white/80"
                id="chat-input-form"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Send message..."
                  className="flex-1 bg-transparent border-none outline-none text-[14px] text-black placeholder:text-[#a0a0a0] font-medium"
                />

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
                    title="Add Emoji"
                    aria-label="Add Emoji"
                    onClick={() => setInputValue((prev) => prev + ' 👋')}
                  >
                    <Smile size={16} />
                  </button>

                  <button
                    type="button"
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
                    title="Attach Media"
                    aria-label="Attach Media"
                  >
                    <ImageIcon size={16} />
                  </button>

                  <button
                    type="submit"
                    id="chat-send-message-btn"
                    className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-[10px] hover:bg-neutral-800 transition-colors cursor-pointer shadow-sm disabled:opacity-40 inset-glow"
                    style={{
                      boxShadow: 'inset 0 0 8px 1px rgba(255,255,255,0.4)',
                    }}
                    disabled={!inputValue.trim()}
                    title="Send message"
                    aria-label="Send message"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
