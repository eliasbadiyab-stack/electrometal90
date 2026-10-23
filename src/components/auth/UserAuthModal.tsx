import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  User as UserIcon, 
  LogIn, 
  UserPlus, 
  AlertCircle, 
  CheckCircle2, 
  Lock, 
  Mail, 
  Phone 
} from 'lucide-react';

interface UserAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const UserAuthModal: React.FC<UserAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { loginUser, registerUser } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      if (mode === 'login') {
        const res = await loginUser(email, password);
        setIsLoading(false);
        if (res.success) {
          onSuccess();
          onClose();
        } else {
          setErrorMessage(res.message);
        }
      } else {
        if (!name.trim() || !email.trim() || !phone.trim()) {
          setIsLoading(false);
          setErrorMessage('لطفاً تمامی فیلدهای الزامی را تکمیل کنید.');
          return;
        }
        const res = await registerUser(name, email, phone, password);
        setIsLoading(false);
        if (res.success) {
          onSuccess();
          onClose();
        } else {
          setErrorMessage(res.message);
        }
      }
    } catch {
      setIsLoading(false);
      setErrorMessage('خطایی رخ داد. لطفاً مجدداً تلاش نمایید.');
    }
  };

  const fillDemoCustomer = () => {
    setEmail('kian.lab@gmail.com');
    setPassword('demo123456');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-6">
          <button
            onClick={() => { setMode('login'); setErrorMessage(null); }}
            className={`flex items-center gap-2 pb-2 text-sm font-bold transition-colors ${mode === 'login' ? 'text-cyan-400 border-b-2 border-cyan-400 -mb-[18px]' : 'text-slate-400 hover:text-white'}`}
          >
            <LogIn className="h-4 w-4" />
            <span>ورود به حساب</span>
          </button>

          <button
            onClick={() => { setMode('register'); setErrorMessage(null); }}
            className={`flex items-center gap-2 pb-2 text-sm font-bold transition-colors mr-4 ${mode === 'register' ? 'text-cyan-400 border-b-2 border-cyan-400 -mb-[18px]' : 'text-slate-400 hover:text-white'}`}
          >
            <UserPlus className="h-4 w-4" />
            <span>ثبت‌نام کاربر جدید</span>
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'register' && (
            <div>
              <label className="block text-slate-400 mb-1">نام و نام‌خانوادگی *</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: رضا صادقی"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
                />
                <UserIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-slate-400 mb-1">آدرس ایمیل *</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-white font-mono text-left dir-ltr focus:border-cyan-500 focus:outline-none"
              />
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-slate-400 mb-1">شماره تلفن همراه *</label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-white font-mono focus:border-cyan-500 focus:outline-none"
                />
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-slate-400 mb-1">رمز عبور *</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-white font-mono text-left dir-ltr focus:border-cyan-500 focus:outline-none"
              />
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-cyan-500 py-3 font-bold text-slate-950 hover:bg-cyan-400 transition-all shadow-md shadow-cyan-500/20 disabled:opacity-50"
            >
              {isLoading ? (
                <span>در حال پردازش...</span>
              ) : mode === 'login' ? (
                <span>ورود به حساب کاربری</span>
              ) : (
                <span>تکمیل ثبت‌نام و ایجاد حساب</span>
              )}
            </button>
          </div>
        </form>

        {mode === 'login' && (
          <div className="mt-4 pt-3 border-t border-slate-800/80 text-center">
            <button
              type="button"
              onClick={fillDemoCustomer}
              className="text-[11px] text-cyan-400 hover:underline"
            >
              تست سریع: ورود به عنوان خریدار نمونه (کیان مهرآذر)
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
