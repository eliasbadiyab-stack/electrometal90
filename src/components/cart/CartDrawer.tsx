import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Trash2, ShoppingBag, ArrowLeft, FileCode, Package, Zap } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onProceedCheckout
}) => {
  const { cart, removeFromCart, updateCartQuantity, cartTotal, cartPayable } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative flex h-full w-full max-w-md flex-col justify-between border-r border-slate-800 bg-slate-900 p-6 shadow-2xl text-right animate-in slide-in-from-left duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-cyan-400" />
              <h2 className="text-base font-bold text-white">سبد خرید شما</h2>
              <span className="text-xs font-mono text-slate-400">({cart.length} مورد)</span>
            </div>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Cart items list */}
          <div className="mt-4 max-h-[60vh] space-y-4 overflow-y-auto pr-1">
            {cart.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-500">
                <ShoppingBag className="mx-auto h-12 w-12 text-slate-700 mb-3" />
                سبد خرید شما خالی است.
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.productId}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-800/80 bg-slate-950/60 p-3"
                >
                  <img 
                    src={item.image} 
                    alt={item.productTitle} 
                    className="h-14 w-14 rounded-lg object-cover border border-slate-800 shrink-0" 
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] text-cyan-400 font-mono">
                      {item.isDigital ? (
                        <>
                          <FileCode className="h-3 w-3" />
                          <span>فایل دانلودی</span>
                        </>
                      ) : (
                        <>
                          <Package className="h-3 w-3" />
                          <span>محصول فیزیکی</span>
                        </>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-white truncate">{item.productTitle}</h4>
                    <div className="text-xs text-slate-300 font-mono">
                      {item.productPrice.toLocaleString('fa-IR')} تومان
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-slate-500 hover:text-rose-400 transition-colors"
                      title="حذف از سبد"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>

                    {!item.isDigital ? (
                      <div className="flex items-center rounded border border-slate-800 bg-slate-900 text-xs">
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                          className="px-2 py-0.5 text-slate-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 font-mono text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                          className="px-2 py-0.5 text-slate-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-500">لایسنس تک کاربره</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer Summary */}
        {cart.length > 0 && (
          <div className="border-t border-slate-800 pt-4 space-y-4">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>جمع کل اقلام:</span>
                <span className="font-mono text-slate-200">{cartTotal.toLocaleString('fa-IR')} تومان</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-slate-800/80">
                <span>مبلغ قابل پرداخت:</span>
                <span className="font-mono text-cyan-400">{cartPayable.toLocaleString('fa-IR')} تومان</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedCheckout();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-400 transition-all shadow-md shadow-cyan-500/20"
            >
              <Zap className="h-4 w-4" />
              <span>تکمیل سفارش و اتصال به درگاه</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
