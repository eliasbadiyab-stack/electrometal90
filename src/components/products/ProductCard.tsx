import React from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, FileCode, Package, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { addToCart, categories } = useApp();

  const category = categories.find(c => c.id === product.categoryId);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div 
      onClick={() => onSelect(product)}
      className="group relative flex flex-col justify-between rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5 transition-all duration-200 hover:-translate-y-1 hover:border-cyan-500/40 hover:bg-slate-900/90 cursor-pointer shadow-sm hover:shadow-cyan-950/20"
    >
      <div>
        {/* Product Image Box */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-slate-950 border border-slate-800">
          <img 
            src={product.mainImage} 
            alt={product.titleFa}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />

          {/* Type Indicator */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded bg-slate-950/80 backdrop-blur-md px-2 py-0.5 text-[11px] font-mono text-cyan-300 border border-slate-800">
            {product.type === 'digital' ? (
              <>
                <FileCode className="h-3 w-3" />
                <span>فایل دانلودی</span>
              </>
            ) : (
              <>
                <Package className="h-3 w-3" />
                <span>ارسال فیزیکی</span>
              </>
            )}
          </div>

          {/* Discount badge */}
          {product.discountPercent && product.discountPercent > 0 && (
            <div className="absolute top-2.5 left-2.5 rounded bg-rose-500/90 px-1.5 py-0.5 text-[10px] font-bold text-white font-mono">
              {product.discountPercent}% تخفیف
            </div>
          )}
        </div>

        {/* Unboxed Metadata (Zero-Pill Discipline) */}
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
          <span>{category?.nameFa || 'الکترونیک'}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="font-mono text-[11px]">{product.sku}</span>
          {product.salesCount > 0 && (
            <>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-500">{product.salesCount} فروش</span>
            </>
          )}
        </div>

        {/* Product Title */}
        <h3 className="mt-1 text-sm font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
          {product.titleFa}
        </h3>

        {/* Short description */}
        <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {product.shortDescription}
        </p>

        {/* File extension / Physical specs preview */}
        {product.type === 'digital' && product.digitalFile && (
          <div className="mt-2 text-[11px] font-mono text-cyan-400/80">
            فرمت: {product.digitalFile.fileExtension} · حجم: {product.digitalFile.fileSize}
          </div>
        )}
      </div>

      {/* Card Footer: Price & Add to Cart button */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <div>
          {product.previousPrice && (
            <div className="text-[11px] text-slate-500 line-through font-mono">
              {product.previousPrice.toLocaleString('fa-IR')}
            </div>
          )}
          <div className="text-sm font-extrabold text-cyan-400 font-mono tabular-nums">
            {product.price.toLocaleString('fa-IR')}{' '}
            <span className="text-[10px] font-normal text-slate-400 font-sans">تومان</span>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 transition-all shrink-0"
          title="افزودن به سبد خرید"
        >
          <ShoppingBag className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
