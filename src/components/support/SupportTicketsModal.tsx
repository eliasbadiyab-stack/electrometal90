import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SupportTicket } from '../../types';
import { 
  X, 
  LifeBuoy, 
  Send, 
  Plus, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface SupportTicketsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportTicketsModal: React.FC<SupportTicketsModalProps> = ({
  isOpen,
  onClose
}) => {
  const { tickets, createTicket, replyTicket, currentUser, updateTicketStatus } = useApp();

  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // New ticket state
  const [subject, setSubject] = useState('');
  const [department, setDepartment] = useState<SupportTicket['department']>('technical');
  const [priority, setPriority] = useState<SupportTicket['priority']>('normal');
  const [message, setMessage] = useState('');

  // Reply state
  const [replyText, setReplyText] = useState('');

  if (!isOpen) return null;

  const isStaff = currentUser?.role === 'owner' || currentUser?.role === 'admin' || currentUser?.role === 'support';
  const displayTickets = isStaff ? tickets : tickets.filter(t => t.userId === currentUser?.id);

  const selectedTicket = tickets.find(t => t.id === selectedTicketId);

  const handleCreateTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    createTicket(subject, department, priority, message);
    setSubject('');
    setMessage('');
    setIsCreatingNew(false);
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicketId || !replyText.trim()) return;
    replyTicket(selectedTicketId, replyText);
    setReplyText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl animate-in fade-in duration-200 text-right my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <LifeBuoy className="h-5 w-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white">مرکز پشتیبانی فنی و تیکت‌ها</h2>
          </div>
          {!isCreatingNew && !selectedTicket && (
            <button
              onClick={() => setIsCreatingNew(true)}
              className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>ارسال تیکت جدید</span>
            </button>
          )}
        </div>

        {/* Create New Ticket Form */}
        {isCreatingNew ? (
          <form onSubmit={handleCreateTicketSubmit} className="mt-5 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-850 pb-2">
              <h3 className="font-bold text-white text-sm">ثبت درخواست جدید پشتیبانی</h3>
              <button
                type="button"
                onClick={() => setIsCreatingNew(false)}
                className="text-slate-400 hover:text-white"
              >
                بازگشت به لیست
              </button>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">موضوع تیکت *</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="مثال: سوال در مورد نحوه کامپایل سورس کد STM32"
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 mb-1">دپارتمان مربوطه</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value as any)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="technical">پشتیبانی فنی و فایل‌های پروژه</option>
                  <option value="downloads">مشکل در لینک دانلود و توکن</option>
                  <option value="orders">پیگیری ارسال محصولات فیزیکی</option>
                  <option value="suggestions">پیشنهادات و همکاری</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">میزان اولویت</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="normal">عادی</option>
                  <option value="low">کم</option>
                  <option value="high">فوری</option>
                  <option value="urgent">بسیار بحرانی</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">شرح دقیق مشکل یا درخواست *</label>
              <textarea
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="لطفاً شماره سفارش یا خطای دریافتی را به طور دقیق شرح دهید..."
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsCreatingNew(false)}
                className="rounded-xl border border-slate-800 px-4 py-2 text-slate-400 hover:text-white"
              >
                انصراف
              </button>
              <button
                type="submit"
                className="rounded-xl bg-cyan-500 px-6 py-2 font-bold text-slate-950 hover:bg-cyan-400 transition-colors"
              >
                ارسال تیکت
              </button>
            </div>
          </form>
        ) : selectedTicket ? (
          /* Single Ticket Conversation Thread */
          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-850 pb-3">
              <div>
                <button
                  onClick={() => setSelectedTicketId(null)}
                  className="text-xs text-cyan-400 hover:underline flex items-center gap-1 mb-1"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                  <span>بازگشت به لیست تیکت‌ها</span>
                </button>
                <h3 className="font-bold text-white text-base">{selectedTicket.subject}</h3>
                <div className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                  <span className="font-mono text-cyan-400">{selectedTicket.ticketNumber}</span>
                  <span>·</span>
                  <span>دپارتمان: {selectedTicket.department}</span>
                  <span>·</span>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
                    وضعیت: {selectedTicket.status}
                  </span>
                </div>
              </div>

              {isStaff && (
                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={() => updateTicketStatus(selectedTicket.id, 'closed')}
                    className="rounded border border-rose-500/30 bg-rose-500/10 px-2.5 py-1 text-rose-400 hover:bg-rose-500/20"
                  >
                    بستن تیکت
                  </button>
                  <button
                    onClick={() => updateTicketStatus(selectedTicket.id, 'answered')}
                    className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-emerald-400 hover:bg-emerald-500/20"
                  >
                    پاسخ داده شد
                  </button>
                </div>
              )}
            </div>

            {/* Messages Thread */}
            <div className="max-h-80 overflow-y-auto space-y-3 p-2">
              {selectedTicket.messages.map(msg => (
                <div
                  key={msg.id}
                  className={`rounded-xl p-4 text-xs leading-relaxed space-y-1 ${msg.isStaff ? 'bg-cyan-950/30 border border-cyan-500/20 mr-6' : 'bg-slate-950 border border-slate-800 ml-6'}`}
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="font-bold text-white">
                      {msg.senderName} {msg.isStaff && <span className="text-cyan-400 text-[10px]">(تیم پشتیبانی Electro Metal)</span>}
                    </span>
                    <span className="font-mono text-slate-500">
                      {new Date(msg.createdAt).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-slate-300 whitespace-pre-line">{msg.content}</p>
                </div>
              ))}
            </div>

            {/* Reply Form */}
            {selectedTicket.status !== 'closed' ? (
              <form onSubmit={handleReplySubmit} className="pt-2 flex gap-2">
                <input
                  type="text"
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="پاسخ خود را اینجا بنویسید..."
                  className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition-colors"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>ارسال</span>
                </button>
              </form>
            ) : (
              <div className="rounded-lg bg-slate-950 p-3 text-center text-xs text-slate-500">
                این تیکت بسته شده است. در صورت نیاز تیکت جدیدی ایجاد نمایید.
              </div>
            )}
          </div>
        ) : (
          /* Tickets List View */
          <div className="mt-5 space-y-3">
            {displayTickets.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-500">
                هیچ تیکت پشتیبانی ثبت نشده است. برای مطرح کردن سوال، دکمه "ارسال تیکت جدید" را انتخاب کنید.
              </div>
            ) : (
              displayTickets.map(ticket => (
                <div
                  key={ticket.id}
                  onClick={() => setSelectedTicketId(ticket.id)}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-950/70 hover:border-cyan-500/40 hover:bg-slate-950 cursor-pointer transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-cyan-400 font-bold">{ticket.ticketNumber}</span>
                      <h4 className="text-sm font-bold text-white">{ticket.subject}</h4>
                    </div>
                    <div className="text-xs text-slate-400">
                      ایجاد کننده: <span className="text-slate-300">{ticket.userName}</span> · دپارتمان: {ticket.department}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`rounded px-2.5 py-1 text-[11px] font-mono ${ticket.status === 'open' ? 'bg-amber-500/10 text-amber-400' : ticket.status === 'answered' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                      {ticket.status}
                    </span>
                    <span className="text-xs text-slate-500">
                      {ticket.messages.length} پیام
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
};
