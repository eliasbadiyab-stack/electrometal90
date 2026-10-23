import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../products/ProductCard';
import { Product, DynamicSection } from '../../types';
import { 
  Cpu, 
  DownloadCloud, 
  Package, 
  BookMarked, 
  Headphones, 
  Video, 
  Youtube, 
  Send, 
  ExternalLink,
  ChevronLeft
} from 'lucide-react';

interface DynamicSectionRendererProps {
  onSelectProduct: (product: Product) => void;
}

export const DynamicSectionRenderer: React.FC<DynamicSectionRendererProps> = ({ onSelectProduct }) => {
  const { sections, products, announcements, advertisements, trackAdClick } = useApp();

  // Sort active sections by order
  const activeSections = [...sections].filter(s => s.isActive).sort((a, b) => a.order - b.order);

  const getSectionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="h-5 w-5 text-cyan-400" />;
      case 'DownloadCloud': return <DownloadCloud className="h-5 w-5 text-cyan-400" />;
      case 'Package': return <Package className="h-5 w-5 text-cyan-400" />;
      case 'BookMarked': return <BookMarked className="h-5 w-5 text-cyan-400" />;
      case 'Headphones': return <Headphones className="h-5 w-5 text-cyan-400" />;
      case 'Video': return <Video className="h-5 w-5 text-cyan-400" />;
      default: return <Cpu className="h-5 w-5 text-cyan-400" />;
    }
  };

  const getProductsForSection = (section: DynamicSection): Product[] => {
    return products.filter(p => {
      if (!p.isPublished) return false;
      if (p.sectionId === section.id) return true;
      if (section.contentType === 'electronics' && p.categoryId === 'cat_pcb_altium') return true;
      if (section.contentType === 'digital_files' && (p.categoryId === 'cat_proteus_sim' || p.categoryId === 'cat_firmware_code')) return true;
      if (section.contentType === 'physical_products' && p.type === 'physical') return true;
      if (section.contentType === 'books' && p.categoryId === 'cat_engineering_books') return true;
      if (section.contentType === 'music_beats' && p.categoryId === 'cat_music_beats') return true;
      return false;
    });
  };

  return (
    <div className="space-y-16 py-8">
      {activeSections.map((section, index) => {
        const sectionProducts = getProductsForSection(section);

        // Check if there's an ad between products
        const betweenAd = advertisements.find(ad => ad.placement === 'between_products' && ad.isActive);

        return (
          <React.Fragment key={section.id}>
            <section id={section.id} className="scroll-mt-24">
              
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-slate-800/80 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                      {getSectionIcon(section.iconName)}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {section.titleFa}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400">
                    {section.subtitleFa}
                  </p>
                </div>

                <div className="text-xs font-mono text-cyan-400/80 shrink-0">
                  {section.contentType === 'news' 
                    ? `${announcements.filter(a => a.isPublished).length} اطلاعیه` 
                    : `${sectionProducts.length} محصول`}
                </div>
              </div>

              {/* News / YouTube section rendering */}
              {section.contentType === 'news' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {announcements.filter(a => a.isPublished).map(ann => (
                    <div 
                      key={ann.id}
                      className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden p-5 flex flex-col justify-between hover:border-slate-700 transition-colors"
                    >
                      <div className="space-y-3">
                        {ann.thumbnail && (
                          <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-slate-950">
                            <img src={ann.thumbnail} alt={ann.title} className="h-full w-full object-cover" />
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span>اطلاعیه رسمی</span>
                          <span>·</span>
                          <span className="font-mono">{new Date(ann.publishedAt).toLocaleDateString('fa-IR')}</span>
                        </div>
                        <h3 className="text-base font-bold text-white leading-snug">
                          {ann.title}
                        </h3>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {ann.summary}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-3">
                        {ann.youtubeUrl && (
                          <a
                            href={ann.youtubeUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Youtube className="h-4 w-4" />
                            <span>مشاهده در یوتیوب</span>
                          </a>
                        )}
                        {ann.telegramUrl && (
                          <a
                            href={ann.telegramUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 transition-colors"
                          >
                            <Send className="h-4 w-4" />
                            <span>کانال تلگرام</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Products Grid */
                sectionProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sectionProducts.map(product => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        onSelect={onSelectProduct} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center text-xs text-slate-500">
                    محصولی در این بخش یافت نشد. می‌توانید از پنل مدیریت محصولات جدید اضافه کنید.
                  </div>
                )
              )}

            </section>

            {/* Optional Advertisement Banner inserted after specific index */}
            {index === 1 && betweenAd && (
              <div 
                onClick={() => trackAdClick(betweenAd.id)}
                className="my-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 cursor-pointer hover:border-cyan-500/50 transition-all"
              >
                <div className="space-y-2 text-right">
                  <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">حمایت شده / Advertisement</span>
                  <h3 className="text-lg font-bold text-white">{betweenAd.title}</h3>
                  <p className="text-xs text-slate-300">مجموعه مستندات و کدهای آموزشی مهندس الیاس بادیاب</p>
                </div>
                <a
                  href={betweenAd.destinationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 shrink-0"
                >
                  <span>مشاهده جزئیات</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
