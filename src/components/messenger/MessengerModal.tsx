import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  MessageSquare, 
  Send, 
  Paperclip, 
  CheckCheck, 
  Check, 
  Search,
  User as UserIcon
} from 'lucide-react';

interface MessengerModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUserId?: string | null;
}

export const MessengerModal: React.FC<MessengerModalProps> = ({
  isOpen,
  onClose,
  targetUserId
}) => {
  const { 
    currentUser, 
    users, 
    directMessages, 
    sendMessage, 
    siteSettings 
  } = useApp();

  const [selectedPeerId, setSelectedPeerId] = useState<string>(targetUserId || (users.find(u => u.id !== currentUser?.id)?.id || ''));
  const [messageInput, setMessageInput] = useState('');

  if (!isOpen) return null;

  if (!siteSettings.features.messagingEnabled) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center space-y-4">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
          <MessageSquare className="mx-auto h-12 w-12 text-slate-600" />
          <h3 className="font-bold text-white text-base">پیام‌رسان در دسترس نیست</h3>
          <p className="text-xs text-slate-400">
            سیستم پیام‌رسان داخلی در حال حاضر توسط مدیریت سایت غیرفعال شده است.
          </p>
        </div>
      </div>
    );
  }

  const peers = users.filter(u => u.id !== currentUser?.id);
  const activePeer = users.find(u => u.id === selectedPeerId);

  // Filter messages between current user and active peer
  const conversation = directMessages.filter(m => 
    (m.senderId === currentUser?.id && m.receiverId === selectedPeerId) ||
    (m.senderId === selectedPeerId && m.receiverId === currentUser?.id)
  ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedPeerId) return;
    sendMessage(selectedPeerId, messageInput);
    setMessageInput('');
  };

  const handleSendFileAttachment = () => {
    if (!selectedPeerId) return;
    sendMessage(selectedPeerId, '📎 فایل پروژه ضمیمه شد: STM32_Schematic_Rev2.pdf', {
      url: '/assets/pcb_stm32_controller_1792786860807.jpg',
      name: 'STM32_Schematic_Rev2.pdf'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-hidden">
      <div 
        className="relative w-full max-w-4xl h-[600px] rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl flex overflow-hidden text-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 flex h-7 w-7 items-center justify-center rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-white"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        {/* Contacts Sidebar (Right on RTL) */}
        <div className="w-64 border-l border-slate-800 bg-slate-950/60 p-4 flex flex-col justify-between shrink-0 hidden sm:flex">
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <MessageSquare className="h-4 w-4 text-cyan-400" />
              <h3 className="text-xs font-bold text-white">گفتگوهای پیام‌رسان</h3>
            </div>

            <div className="space-y-1 overflow-y-auto max-h-[460px]">
              {peers.map(peer => {
                const isSelected = peer.id === selectedPeerId;
                return (
                  <button
                    key={peer.id}
                    onClick={() => setSelectedPeerId(peer.id)}
                    className={`flex w-full items-center gap-2.5 rounded-xl p-2.5 text-right transition-colors ${isSelected ? 'bg-cyan-500/10 border border-cyan-500/30 text-white' : 'hover:bg-slate-900 text-slate-400'}`}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-xs font-bold text-cyan-400 shrink-0">
                      {peer.name[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold truncate text-white">{peer.name}</div>
                      <div className="text-[10px] text-slate-500 truncate">{peer.specialTitle || peer.role}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col justify-between bg-slate-900/50">
          
          {/* Active Peer Header */}
          <div className="flex items-center justify-between border-b border-slate-800 px-6 py-3.5 bg-slate-950/40">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 font-bold text-sm">
                {activePeer?.name[0] || '?'}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{activePeer?.name}</h4>
                <div className="text-[11px] text-slate-400 font-mono">
                  {activePeer?.role} · آنلاین
                </div>
              </div>
            </div>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {conversation.length === 0 ? (
              <div className="py-24 text-center text-xs text-slate-500">
                پیامی هنوز رد و بدل نشده است. پیامی ارسال کنید!
              </div>
            ) : (
              conversation.map(msg => {
                const isMine = msg.senderId === currentUser?.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMine ? 'items-start' : 'items-end'}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-2xl p-3 text-xs leading-relaxed space-y-1 ${isMine ? 'bg-cyan-600 text-white rounded-br-none' : 'bg-slate-800 text-slate-200 rounded-bl-none'}`}
                    >
                      <p>{msg.content}</p>
                      {msg.attachmentName && (
                        <div className="mt-2 rounded-lg bg-black/20 p-2 text-[10px] flex items-center gap-1.5 border border-white/10">
                          <Paperclip className="h-3 w-3" />
                          <span>{msg.attachmentName}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-end gap-1 text-[10px] text-white/60 pt-0.5 font-mono">
                        <span>{new Date(msg.createdAt).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}</span>
                        {isMine && (msg.isRead ? <CheckCheck className="h-3 w-3 text-cyan-200" /> : <Check className="h-3 w-3 text-white/60" />)}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSend} className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center gap-2">
            <button
              type="button"
              onClick={handleSendFileAttachment}
              title="ارسال فایل ضمیمه"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors shrink-0"
            >
              <Paperclip className="h-4 w-4" />
            </button>

            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="پیام خود را بنویسید..."
              className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />

            <button
              type="submit"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
