import React from 'react';
import { useApp } from '../../context/AppContext';
import { Cpu, ShieldCheck, Award, Mail, Phone, MapPin } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { siteSettings } = useApp();

  return (
    <section id="about_section" className="py-16 border-t border-slate-800/80 bg-slate-950/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Image & Lab Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
              <img 
                src="/assets/electronics_digital_book_1792786861344.jpg" 
                alt="Electro Metal Engineering Manual" 
                className="w-full h-80 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 p-4 rounded-xl border border-slate-800/80 bg-slate-950/90">
                <div className="text-xs font-mono text-cyan-400">تعهد به کیفیت سخت‌افزار</div>
                <div className="text-sm font-bold text-white mt-0.5">استانداردهای مهندسی بردهای چاپی</div>
              </div>
            </div>
          </div>

          {/* Text and Creator bio */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            <div className="inline-flex items-center gap-2 text-xs font-medium text-cyan-400">
              <Award className="h-4 w-4" />
              <span>درباره پلتفرم و طراح</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              درباره برند {siteSettings.brandNameFa || siteSettings.brandName} و بنیان‌گذار
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {siteSettings.aboutText}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 space-y-1">
                <span className="text-xs text-slate-400">نام طراح و سرپرست پروژه:</span>
                <div className="text-sm font-bold text-cyan-400">{siteSettings.creatorName}</div>
                <p className="text-[11px] text-slate-500">طراح سیستم‌های تعبیه‌شده و الکترونیک قدرت</p>
              </div>

              <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 space-y-1">
                <span className="text-xs text-slate-400">ارتباط کاری مستقیم:</span>
                <div className="text-sm font-mono font-bold text-slate-200">{siteSettings.creatorEmail}</div>
                <p className="text-[11px] text-slate-500">پاسخگویی به درخواست‌های صنعتی و پروژه‌ای</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
