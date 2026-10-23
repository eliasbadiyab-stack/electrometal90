import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShoppingBag, 
  User as UserIcon, 
  Sun, 
  Moon, 
  MessageSquare, 
  LifeBuoy, 
  Menu, 
  X, 
  CheckCircle2, 
  LayoutDashboard,
  Search,
  Lock,
  LogOut,
  LogIn
} from 'lucide-react';

interface HeaderProps {
  onOpenCart: () => void;
  onOpenUserDashboard: () => void;
  onOpenAdmin: () => void;
  onOpenAdminAuth: () => void;
  onOpenUserAuth: () => void;
  onOpenMessenger: () => void;
  onOpenTickets: () => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCart,
  onOpenUserDashboard,
  onOpenAdmin,
  onOpenAdminAuth,
  onOpenUserAuth,
  onOpenMessenger,
  onOpenTickets,
  onSearchChange,
  searchQuery
}) => {
  const { 
    siteSettings, 
    currentUser, 
    isAdminAuthenticated, 
    logoutAdmin, 
    logoutUser, 
    cart, 
    theme, 
    toggleTheme 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAdminClick = () => {
    if (isAdminAuthenticated) {
      onOpenAdmin();
    } else {
      onOpenAdminAuth();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md transition-colors duration-200">
      {/* Top Bar 3-Zone Contract */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <a href="#" className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-sm font-bold">
              EM
            </span>
            <span>{siteSettings.brandNameFa || siteSettings.brandName}</span>
          </a>
        </div>

        {/* Zone 2: 4-5 Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#sec_electronics_featured" className="hover:text-cyan-400 transition-colors whitespace-nowrap">
            پروژه‌های آلتیوم
          </a>
          <a href="#sec_digital_files" className="hover:text-cyan-400 transition-colors whitespace-nowrap">
            فایل‌های گربر و شبیه‌سازی
          </a>
          <a href="#sec_physical_store" className="hover:text-cyan-400 transition-colors whitespace-nowrap">
            تجهیزات فیزیکی
          </a>
          <a href="#sec_engineering_library" className="hover:text-cyan-400 transition-colors whitespace-nowrap">
            کتابخانه مهندسی
          </a>
          <a href="#team_showcase" className="hover:text-cyan-400 transition-colors whitespace-nowrap">
            تیم مهندسی
          </a>
          <a href="#about_section" className="hover:text-cyan-400 transition-colors whitespace-nowrap">
            درباره ما
          </a>
        </nav>

        {/* Zone 3: Primary action & controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Quick Search */}
          <div className="relative hidden md:block w-40 lg:w-52">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="جستجوی مدار، قطعه، فایل..."
              className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 pr-8 text-xs text-slate-200 placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
            />
            <Search className="absolute right-2.5 top-2 h-3.5 w-3.5 text-slate-500" />
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-cyan-400 hover:border-slate-700 transition-colors"
            title="تغییر تم تاریک/روشن"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Messaging Quick Button */}
          {siteSettings.features.messagingEnabled && (
            <button
              onClick={onOpenMessenger}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-cyan-400 hover:border-slate-700 transition-colors"
              title="پیام‌رسان داخلی"
              aria-label="Messenger"
            >
              <MessageSquare className="h-4 w-4" />
            </button>
          )}

          {/* Support Ticket Quick Button */}
          {siteSettings.features.supportTicketsEnabled && (
            <button
              onClick={onOpenTickets}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-cyan-400 hover:border-slate-700 transition-colors"
              title="پشتیبانی و تیکت‌ها"
              aria-label="Support Tickets"
            >
              <LifeBuoy className="h-4 w-4" />
            </button>
          )}

          {/* Shopping Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative flex h-9 items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 text-slate-300 hover:text-cyan-400 hover:border-slate-700 transition-colors"
            aria-label="سبد خرید"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline text-xs font-medium">سبد خرید</span>
            {cartItemsCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-cyan-500 px-1 text-[10px] font-bold text-slate-950 font-mono">
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* User Section: If logged in vs not logged in */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex h-9 items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-2.5 text-xs text-slate-300 hover:border-slate-700 transition-colors"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-[10px]">
                  {currentUser.name[0]}
                </div>
                <span className="max-w-[75px] sm:max-w-[100px] truncate font-medium">
                  {currentUser.name}
                </span>
                {currentUser.isVerified && (
                  <span title="دارای تیک آبی تایید شده">
                    <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                  </span>
                )}
              </button>

              {userDropdownOpen && (
                <div 
                  className="absolute left-0 mt-2 w-60 rounded-xl border border-slate-800 bg-slate-900 p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  <div className="border-b border-slate-800 px-3 py-2 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-white">
                      <span>{currentUser.name}</span>
                      {currentUser.isVerified && (
                        <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate mt-0.5">{currentUser.email}</div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={onOpenUserDashboard}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                      <UserIcon className="h-3.5 w-3.5" />
                      <span>داشبورد کاربری و دانلودها</span>
                    </button>

                    {isAdminAuthenticated && (
                      <button
                        onClick={onOpenAdmin}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-cyan-400 font-semibold hover:bg-cyan-500/10 transition-colors"
                      >
                        <LayoutDashboard className="h-3.5 w-3.5" />
                        <span>ورود به پنل مدیریت مالک</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        if (isAdminAuthenticated) {
                          logoutAdmin();
                        } else {
                          logoutUser();
                        }
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 transition-colors border-t border-slate-800/80 mt-1"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>{isAdminAuthenticated ? 'خروج امن از پنل مدیریت' : 'خروج از حساب کاربری'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Public Guest: Login / Register Button */
            <button
              onClick={onOpenUserAuth}
              className="flex h-9 items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 text-xs font-semibold text-slate-200 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>ورود / ثبت‌نام</span>
            </button>
          )}

          {/* Owner Admin Access Button (Locked behind cryptographic auth if not authenticated) */}
          {isAdminAuthenticated ? (
            <button
              onClick={onOpenAdmin}
              className="hidden sm:flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-500 px-3 py-2 text-xs font-semibold text-slate-950 hover:from-cyan-500 hover:to-cyan-400 transition-all shadow-sm shadow-cyan-500/20 whitespace-nowrap shrink-0"
              title="پنل مدیریت مالک"
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              <span>پنل مدیریت</span>
            </button>
          ) : (
            <button
              onClick={onOpenAdminAuth}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-950 text-slate-500 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors shrink-0"
              title="ورود امن مدیریت (رمزگذاری شده)"
              aria-label="Admin Login"
            >
              <Lock className="h-4 w-4" />
            </button>
          )}

          {/* Mobile menu toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex lg:hidden h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-800 bg-slate-950 p-4 lg:hidden space-y-3">
          <div>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="جستجوی مدار، قطعه یا فایل..."
              className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-slate-200"
            />
          </div>

          <nav className="flex flex-col gap-1 text-xs font-medium text-slate-300">
            <a 
              href="#sec_electronics_featured" 
              onClick={() => setMobileMenuOpen(false)} 
              className="rounded-lg px-3 py-2 hover:bg-slate-900 hover:text-cyan-400 transition-colors"
            >
              پروژه‌های آلتیوم
            </a>
            <a 
              href="#sec_digital_files" 
              onClick={() => setMobileMenuOpen(false)} 
              className="rounded-lg px-3 py-2 hover:bg-slate-900 hover:text-cyan-400 transition-colors"
            >
              فایل‌های گربر و شبیه‌سازی
            </a>
            <a 
              href="#sec_physical_store" 
              onClick={() => setMobileMenuOpen(false)} 
              className="rounded-lg px-3 py-2 hover:bg-slate-900 hover:text-cyan-400 transition-colors"
            >
              تجهیزات فیزیکی
            </a>
            <a 
              href="#sec_engineering_library" 
              onClick={() => setMobileMenuOpen(false)} 
              className="rounded-lg px-3 py-2 hover:bg-slate-900 hover:text-cyan-400 transition-colors"
            >
              کتابخانه مهندسی
            </a>
            <a 
              href="#team_showcase" 
              onClick={() => setMobileMenuOpen(false)} 
              className="rounded-lg px-3 py-2 hover:bg-slate-900 hover:text-cyan-400 transition-colors"
            >
              تیم مهندسی
            </a>
            <a 
              href="#about_section" 
              onClick={() => setMobileMenuOpen(false)} 
              className="rounded-lg px-3 py-2 hover:bg-slate-900 hover:text-cyan-400 transition-colors"
            >
              درباره ما
            </a>
          </nav>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            {!currentUser ? (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenUserAuth(); }}
                className="flex items-center gap-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 px-3 py-2 text-xs font-bold text-cyan-400"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>ورود / ثبت‌نام</span>
              </button>
            ) : (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenUserDashboard(); }}
                className="flex items-center gap-1.5 text-xs text-slate-300"
              >
                <UserIcon className="h-3.5 w-3.5 text-cyan-400" />
                <span>داشبورد کاربری</span>
              </button>
            )}

            <button
              onClick={() => { setMobileMenuOpen(false); handleAdminClick(); }}
              className="flex items-center gap-1.5 rounded-lg border border-slate-800 px-3 py-2 text-xs text-slate-400 hover:text-white"
            >
              <Lock className="h-3.5 w-3.5 text-cyan-400" />
              <span>{isAdminAuthenticated ? 'پنل مدیریت' : 'ورود مدیریت'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
