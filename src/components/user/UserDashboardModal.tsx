import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  ShoppingBag, 
  Download, 
  LifeBuoy, 
  User as UserIcon, 
  CheckCircle2, 
  FileCode, 
  Clock, 
  ExternalLink,
  Plus
} from 'lucide-react';

interface UserDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenNewTicket: () => void;
}

export const UserDashboardModal: React.FC<UserDashboardModalProps> = ({
  isOpen,
  onClose,
  onOpenNewTicket
}) => {
  const { currentUser, orders, tickets, products, updateUser } = useApp();
  const [activeTab, setActiveTab] = useState<'downloads' | 'orders' | 'tickets' | 'profile'>('downloads');

  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen || !currentUser) return null;

  // Filter orders for current user
  const userOrders = orders.filter(o => o.userId === currentUser.id || currentUser.role === 'owner');

  // Collect all digital downloads
  const allDownloads: {
    orderId: string;
    orderNumber: string;
    productId: string;
    productTitle: string;
    token: string;
    expiresAt: string;
    downloadCount: number;
    maxDownloads: number;
  }[] = [];

  userOrders.forEach(o => {
    if (o.digitalDownloads) {
      o.digitalDownloads.forEach(d => {
        const prod = products.find(p => p.id === d.productId);
        allDownloads.push({
          orderId: o.id,
          orderNumber: o.orderNumber,
          productId: d.productId,
          productTitle: prod?.titleFa || 'فایل پروژه مهندسی',
          token: d.token,
          expiresAt: d.expiresAt,
          downloadCount: d.downloadCount,
          maxDownloads: d.maxDownloads
        });
      });
    }
  });

  const userTickets = tickets.filter(t => t.userId === currentUser.id || currentUser.role === 'owner');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(currentUser.id, {
      name: editName,
      phone: editPhone
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleDownloadFile = (dl: typeof allDownloads[0]) => {
    if (dl.downloadCount >= dl.maxDownloads) {
      alert('تعداد مجاز دانلود این فایل به پایان رسیده است. جهت تمدید با پشتیبانی تماس بگیرید.');
      return;
    }
    // Simulate secure file download triggering
    alert(`درخواست دانلود امن برای فایل "${dl.productTitle}" ارسال شد. توکن: ${dl.token}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl animate-in fade-in duration-200 text-right my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {/* User Quick Info Lockup */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-lg">
            {currentUser.name[0]}
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold text-white text-base">
              <span>{currentUser.name}</span>
              {currentUser.isVerified && (
                <span title="دارای تیک آبی تایید شده">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                </span>
              )}
            </div>
            <div className="text-xs text-slate-400 font-mono">{currentUser.email}</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-4 border-b border-slate-800 pb-2 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('downloads')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 font-medium transition-colors whitespace-nowrap ${activeTab === 'downloads' ? 'bg-cyan-500/10 text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            <Download className="h-4 w-4" />
            <span>فایل‌های دانلودی من ({allDownloads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 font-medium transition-colors whitespace-nowrap ${activeTab === 'orders' ? 'bg-cyan-500/10 text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            <ShoppingBag className="h-4 w-4" />
            <span>سفارش‌ها و تراکنش‌ها ({userOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('tickets')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 font-medium transition-colors whitespace-nowrap ${activeTab === 'tickets' ? 'bg-cyan-500/10 text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            <LifeBuoy className="h-4 w-4" />
            <span>تیکت‌های پشتیبانی ({userTickets.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 font-medium transition-colors whitespace-nowrap ${activeTab === 'profile' ? 'bg-cyan-500/10 text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            <UserIcon className="h-4 w-4" />
            <span>مشخصات حساب</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-5 min-h-[300px]">
          
          {/* Downloads Tab */}
          {activeTab === 'downloads' && (
            <div className="space-y-3">
              {allDownloads.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-500">
                  فایل دانلودی فعالی در حساب شما وجود ندارد.
                </div>
              ) : (
                allDownloads.map((dl, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950 p-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <FileCode className="h-4 w-4 text-cyan-400" />
                        <h4 className="text-sm font-bold text-white">{dl.productTitle}</h4>
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-3">
                        <span>سفارش: <span className="font-mono text-slate-300">{dl.orderNumber}</span></span>
                        <span>·</span>
                        <span>دانلود شده: <span className="font-mono text-cyan-400">{dl.downloadCount}/{dl.maxDownloads}</span></span>
                        <span>·</span>
                        <span className="font-mono text-[11px] text-slate-500">توکن: {dl.token.substring(0, 10)}...</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownloadFile(dl)}
                      className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition-colors shrink-0"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>دانلود فایل پروژه</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {userOrders.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-500">
                  سفارشی ثبت نشده است.
                </div>
              ) : (
                userOrders.map(order => (
                  <div key={order.id} className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-850 pb-2 text-xs">
                      <div>
                        <span className="text-slate-400">شماره سفارش:</span>{' '}
                        <span className="font-mono font-bold text-white">{order.orderNumber}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">تاریخ:</span>{' '}
                        <span className="font-mono text-slate-300">{new Date(order.createdAt).toLocaleDateString('fa-IR')}</span>
                      </div>
                      <div className="rounded bg-emerald-500/10 px-2 py-0.5 text-emerald-400 font-mono text-[11px]">
                        وضعیت: {order.orderStatus}
                      </div>
                    </div>

                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <span className="text-slate-200">{item.productTitle} × {item.quantity}</span>
                          <span className="font-mono text-cyan-400">{(item.productPrice * item.quantity).toLocaleString('fa-IR')} تومان</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-900 flex justify-between text-xs font-bold">
                      <span className="text-slate-400">مبلغ کل پرداختی:</span>
                      <span className="font-mono text-white">{order.payableAmount.toLocaleString('fa-IR')} تومان</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tickets Tab */}
          {activeTab === 'tickets' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-slate-400">تیکت‌های مطرح شده با تیم پشتیبانی Electro Metal</span>
                <button
                  onClick={onOpenNewTicket}
                  className="flex items-center gap-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-3 py-1.5 text-xs font-semibold hover:bg-cyan-500/30 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>ثبت تیکت جدید</span>
                </button>
              </div>

              {userTickets.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-500">
                  تیکت فعالی وجود ندارد.
                </div>
              ) : (
                userTickets.map(ticket => (
                  <div key={ticket.id} className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">{ticket.subject}</span>
                      <span className="rounded bg-cyan-500/10 px-2 py-0.5 text-[10px] font-mono text-cyan-400">
                        {ticket.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      آخرین پیام: {ticket.messages[ticket.messages.length - 1]?.content.substring(0, 80)}...
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs max-w-md">
              <div>
                <label className="block text-slate-400 mb-1">نام کامل</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">شماره تلفن همراه</label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">ایمیل (شناسه ورود)</label>
                <input
                  type="email"
                  disabled
                  value={currentUser.email}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950/50 px-3 py-2 text-slate-500 font-mono text-left dir-ltr cursor-not-allowed"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="rounded-xl bg-cyan-500 px-5 py-2 font-bold text-slate-950 hover:bg-cyan-400 transition-colors"
                >
                  ذخیره تغییرات
                </button>
                {saveSuccess && (
                  <span className="text-emerald-400 text-xs">تغییرات با موفقیت ذخیره شد.</span>
                )}
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
