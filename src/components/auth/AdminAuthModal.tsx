import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { getLockoutRemainingSeconds } from '../../utils/security';
import { 
  Lock, 
  ShieldCheck, 
  KeyRound, 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  Eye, 
  EyeOff,
  Fingerprint
} from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { loginAdmin } = useApp();

  const [username, setUsername] = useState('eliasbadiyab@gmail.com');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lockoutSeconds, setLockoutSeconds] = useState<number>(0);

  // Poll lockout timer if active
  useEffect(() => {
    const updateLockout = () => {
      const remaining = getLockoutRemainingSeconds();
      setLockoutSeconds(remaining);
    };
    updateLockout();
    const interval = setInterval(updateLockout, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (lockoutSeconds > 0) {
      setErrorMessage(`ورود موقتاً مسدود است. لطفاً ${lockoutSeconds} ثانیه دیگر مجدداً تلاش کنید.`);
      return;
    }

    if (!username.trim() || !password) {
      setErrorMessage('لطفاً نام کاربری و رمز عبور را وارد کنید.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await loginAdmin(username, password, pin);
      setIsLoading(false);

      if (result.success) {
        setPassword('');
        setPin('');
        onSuccess();
      } else {
        setErrorMessage(result.message);
        if (result.lockoutSeconds) {
          setLockoutSeconds(result.lockoutSeconds);
        }
      }
    } catch {
      setIsLoading(false);
      setErrorMessage('خطای غیرمنتظره در احراز هویت امنیتی.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-md rounded-2xl border border-cyan-500/30 bg-slate-900 p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Security Shield Lockup */}
        <div className="text-center space-y-2 mb-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-inner">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h2 className="text-lg font-black text-white tracking-tight">
            درگاه احراز هویت امنیتی مالک سایت
          </h2>
          <p className="text-xs text-slate-400">
            Electro Metal Security Core · ورود انحصاری مالک و مدیران ارشد
          </p>
        </div>

        {/* Lockout Warning Banner */}
        {lockoutSeconds > 0 && (
          <div className="mb-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400" />
            <span>
              حساب موقتاً قفل شده است: <span className="font-mono font-bold text-white">{lockoutSeconds}</span> ثانیه باقیمانده
            </span>
          </div>
        )}

        {/* Error message */}
        {errorMessage && lockoutSeconds === 0 && (
          <div className="mb-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300 flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">نام کاربری یا ایمیل مالک</label>
            <div className="relative">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="eliasbadiyab@gmail.com"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-white font-mono text-left dir-ltr focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">رمز عبور امنیتی مالک</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••••"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 pl-10 text-white font-mono text-left dir-ltr focus:border-cyan-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-2.5 text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">
              پین امنیتی دو مرحله‌ای (2FA PIN) - اختیاری
            </label>
            <div className="relative">
              <input
                type="password"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="۶ رقم (اختیاری جهت افزایش امنیت)"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-white font-mono text-center tracking-widest focus:border-cyan-500 focus:outline-none"
              />
              <Fingerprint className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading || lockoutSeconds > 0}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3 font-bold text-slate-950 hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span>در حال رمزگشایی و اعتبارسنجی هش...</span>
              ) : (
                <>
                  <KeyRound className="h-4 w-4" />
                  <span>تایید هویت و ورود به پنل مدیریت</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-5 border-t border-slate-800/80 pt-4 text-center">
          <p className="text-[11px] text-slate-500 leading-relaxed">
            محافظت شده با هش رمزنگاری شده ۲۵۶ بیتی (Salted SHA-256) و سیستم ضد بروت‌فورس هوشمند.
          </p>
        </div>

      </div>
    </div>
  );
};
