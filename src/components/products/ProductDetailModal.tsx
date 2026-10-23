import React, { useState } from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  ShoppingBag, 
  FileCode, 
  Package, 
  Download, 
  ShieldCheck, 
  Share2, 
  Layers, 
  Clock, 
  HardDrive, 
  Check, 
  Zap,
  ArrowRight
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onInstantBuy: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onInstantBuy
}) => {
  const { addToCart, categories } = useApp();
  const [selectedImage, setSelectedImage] = useState(product.mainImage);
  const [copied, setCopied] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const category = categories.find(c => c.id === product.categoryId);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-right my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Gallery Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950 relative">
              <img 
                src={selectedImage} 
                alt={product.titleFa}
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md px-2.5 py-1 text-xs font-mono text-cyan-300 border border-slate-800">
                {product.type === 'digital' ? <FileCode className="h-3.5 w-3.5" /> : <Package className="h-3.5 w-3.5" />}
                <span>{product.type === 'digital' ? 'فایل پروژه مهندسی' : 'محصول سخت‌افزاری'}</span>
              </div>
            </div>

            {/* Thumbnails */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {product.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`h-16 w-20 overflow-hidden rounded-lg border transition-all shrink-0 ${selectedImage === img ? 'border-cyan-500 ring-2 ring-cyan-500/30' : 'border-slate-800 opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt={`preview ${i}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Guarantee Box */}
            <div className="rounded-xl border border-slate-800/80 bg-slate-950/50 p-4 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                <ShieldCheck className="h-4 w-4" />
                <span>گارانتی تست و تطابق فنی Electro Metal</span>
              </div>
              <p className="leading-relaxed">
                تمام فایل‌های آلتیوم و شماتیک با قوانین DRC تست شده و بردهای مدار چاپی فاقد هرگونه اتصال کوتاه یا خطای پکیج می‌باشند.
              </p>
            </div>
          </div>

          {/* Details & Contiguous Purchase Module */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Meta */}
            <div className="flex items-center justify-between gap-4 text-xs text-slate-400 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span>{category?.nameFa || 'الکترونیک'}</span>
                <span className="text-slate-600">·</span>
                <span className="font-mono text-slate-300">{product.sku}</span>
              </div>
              <button 
                onClick={handleShare}
                className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5" />}
                <span className="text-[11px]">{copied ? 'کپی شد' : 'اشتراک‌گذاری'}</span>
              </button>
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              {product.titleFa}
            </h2>

            {/* Price Box */}
            <div className="flex items-baseline gap-3 rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-4">
              <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono tabular-nums">
                {product.price.toLocaleString('fa-IR')}
              </span>
              <span className="text-xs text-cyan-200/80">تومان</span>
              {product.previousPrice && (
                <span className="text-sm text-slate-500 line-through font-mono mr-2">
                  {product.previousPrice.toLocaleString('fa-IR')} تومان
                </span>
              )}
            </div>

            {/* Digital File Specs Box (if Digital) */}
            {product.type === 'digital' && product.digitalFile && (
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2 text-xs">
                <div className="font-semibold text-slate-200 flex items-center gap-2">
                  <Download className="h-4 w-4 text-cyan-400" />
                  <span>مشخصات پکیج دانلودی:</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-400 pt-1">
                  <div className="flex items-center gap-1.5">
                    <FileCode className="h-3.5 w-3.5 text-slate-500" />
                    <span>فرمت: <span className="font-mono text-slate-200">{product.digitalFile.fileExtension}</span></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <HardDrive className="h-3.5 w-3.5 text-slate-500" />
                    <span>حجم: <span className="font-mono text-slate-200">{product.digitalFile.fileSize}</span></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-slate-500" />
                    <span>سقف دفعات دانلود: <span className="font-mono text-slate-200">{product.digitalFile.downloadLimit} بار</span></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-slate-500" />
                    <span>مهلت دانلود: <span className="font-mono text-slate-200">{product.digitalFile.expiryHours} ساعت</span></span>
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300">توضیحات و مستندات فنی</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* Technical Specifications Table */}
            {product.technicalSpecs && Object.keys(product.technicalSpecs).length > 0 && (
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-slate-300">مشخصات مهندسی دقیق</h4>
                <div className="rounded-xl border border-slate-800 divide-y divide-slate-800/80 bg-slate-950/60 overflow-hidden text-xs">
                  {Object.entries(product.technicalSpecs).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between px-3.5 py-2">
                      <span className="text-slate-400">{key}</span>
                      <span className="font-mono text-slate-200 text-left dir-ltr">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Buy Buttons */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              {product.type === 'physical' && (
                <div className="flex items-center justify-between text-xs text-slate-400 pb-1">
                  <span>تعداد سفارش:</span>
                  <div className="flex items-center rounded-lg border border-slate-800 bg-slate-950">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2.5 py-1 text-slate-400 hover:text-white"
                    >
                      -
                    </button>
                    <span className="px-3 font-mono text-white">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-2.5 py-1 text-slate-400 hover:text-white"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 py-3 text-xs sm:text-sm font-bold text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 transition-all"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>افزودن به سبد خرید</span>
                </button>

                <button
                  onClick={() => {
                    handleAddToCart();
                    onInstantBuy(product);
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3 text-xs sm:text-sm font-bold text-slate-950 hover:bg-cyan-400 transition-all shadow-md shadow-cyan-500/20"
                >
                  <Zap className="h-4 w-4" />
                  <span>خرید سریع و پرداخت</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
