import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Youtube, 
  Send, 
  Instagram, 
  Github, 
  Linkedin, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Cpu,
  Download
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { siteSettings } = useApp();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Creator Bio */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-sm font-bold">
                EM
              </span>
              <span className="text-xl font-black text-white tracking-tight">
                {siteSettings.brandNameFa || siteSettings.brandName}
              </span>
            </div>
            
            <p className="text-sm leading-relaxed text-slate-300 max-w-md">
              {siteSettings.siteDescription}
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div>
                <span className="text-slate-500">سازنده و سرپرست تیم طراحی:</span>{' '}
                <span className="text-cyan-400 font-medium">{siteSettings.creatorName}</span>
              </div>
              <div>
                <span className="text-slate-500">پشتیبانی و ارتباط مستقیم:</span>{' '}
                <span className="text-slate-300 font-mono">{siteSettings.creatorEmail}</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 pt-2">
              {siteSettings.socialLinks.youtube && (
                <a 
                  href={siteSettings.socialLinks.youtube} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-red-500 hover:border-red-500/30 transition-colors"
                  title="کانال یوتیوب"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              )}
              {siteSettings.socialLinks.telegram && (
                <a 
                  href={siteSettings.socialLinks.telegram} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-sky-400 hover:border-sky-400/30 transition-colors"
                  title="کانال تلگرام"
                >
                  <Send className="h-4 w-4" />
                </a>
              )}
              {siteSettings.socialLinks.instagram && (
                <a 
                  href={siteSettings.socialLinks.instagram} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-pink-500 hover:border-pink-500/30 transition-colors"
                  title="صفحه اینستاگرام"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {siteSettings.socialLinks.github && (
                <a 
                  href={siteSettings.socialLinks.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
                  title="گیت‌هاب"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              {siteSettings.socialLinks.linkedin && (
                <a 
                  href={siteSettings.socialLinks.linkedin} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-blue-400 hover:border-blue-400/30 transition-colors"
                  title="لینکدین"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">اطلاعات تماس و دفتر</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2 text-slate-300">
                <MapPin className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{siteSettings.storeAddress}</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Phone className="h-4 w-4 text-cyan-400 shrink-0" />
                <span className="font-mono">{siteSettings.phone}</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Mail className="h-4 w-4 text-cyan-400 shrink-0" />
                <span className="font-mono">{siteSettings.email}</span>
              </li>
            </ul>
          </div>

          {/* Trust, Security & Guarantee */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">استانداردهای مهندسی</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>اتصال به درگاه امن شاپرک و زرین‌پال</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>لینک دانلود مستقیم و امن بلافاصله پس از پرداخت</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>تست شده در آزمایشگاه الکترونیک و تطابق کامل با استانداردهای IPC</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{siteSettings.copyrightText}</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>نسخه پایدار پلتفرم: ۲.۴.۰</span>
            <span>·</span>
            <span>طراحی اختصاصی الیاس بادیاب</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
