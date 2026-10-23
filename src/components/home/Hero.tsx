import React from 'react';
import { useApp } from '../../context/AppContext';
import { Cpu, Download, ShieldCheck, Zap } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const { siteSettings } = useApp();

  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950 py-12 lg:py-16">
      {/* Background glow and subtle circuit grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (Text & CTAs) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            <div className="inline-flex items-center gap-2 text-xs font-medium text-cyan-400">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>پلتفرم تخصصی سخت‌افزار و مدارهای الکترونیکی</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">توسعه توسط {siteSettings.creatorName}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              مرجع پروژه‌های پیشرفته{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 to-sky-200">
                مهندسی الکترونیک
              </span>{' '}
              و فایل‌های صنعتی PCB
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              دسترسی فوری به سورس کدهای معتبر میکروکنترلری، پروژه‌های آلتیوم دیزاینر، نقشه‌های شماتیک استاندارد، شبیه‌سازی پروتئوس و خرید بردهای مونتاژ شده در آزمایشگاه Electro Metal.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.98]"
              >
                <Cpu className="h-4 w-4" />
                <span>مشاهده کاتالوگ پروژه‌ها</span>
              </button>

              <a
                href="#sec_digital_files"
                className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-200 hover:border-slate-700 hover:text-white transition-all"
              >
                <Download className="h-4 w-4 text-cyan-400" />
                <span>فایل‌های دانلودی و گربر</span>
              </a>
            </div>

            {/* Creator Trust Mention */}
            <div className="pt-3 border-t border-slate-900 flex items-center gap-3 text-xs text-slate-400">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-xs">
                EB
              </div>
              <div>
                <span className="text-slate-200 font-semibold">{siteSettings.creatorName}</span>
                <span className="text-slate-500 mr-2">· طراح مدارهای فرکانس‌بالا و فریمورهای صنعتی</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group">
              <img 
                src="/assets/hero_electro_metal_1792786859342.jpg" 
                alt="Electro Metal Laboratory Workbench"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />
              
              {/* Floating Tech Stat Box */}
              <div className="absolute bottom-4 right-4 left-4 p-3 rounded-xl border border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="text-slate-200 font-medium">محیط تست آزمایشگاهی</span>
                  </div>
                  <span className="text-cyan-400 font-mono text-[11px]">Lab Verified</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  کلیه مدارهای قدرت و بردهای چندلایه پیش از انتشار تحت بار نامی آزمایش می‌شوند.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column KPI Trust Strip below hero */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-slate-800/80 pt-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">طراحی چندلایه</div>
              <div className="text-xs text-slate-400">کنترل امپدانس و استاندارد IPC</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Download className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">دانلود آنی و نامحدود</div>
              <div className="text-xs text-slate-400">تولید توکن امن پس از پرداخت</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">شبیه‌سازی کامل</div>
              <div className="text-xs text-slate-400">پروتئوس، متلب و کدهای C/C++</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">پشتیبانی مستقیم سازنده</div>
              <div className="text-xs text-slate-400">پاسخگویی تیکت توسط مهندس بادیاب</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
