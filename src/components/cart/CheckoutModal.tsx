import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order } from '../../types';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Download, 
  CheckCircle2, 
  Clock, 
  FileCode, 
  Truck, 
  Lock,
  ArrowRight
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderSuccess
}) => {
  const { cart, cartPayable, createOrder, siteSettings, currentUser } = useApp();

  const [step, setStep] = useState<'info' | 'gateway' | 'success'>('info');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Form states
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [province, setProvince] = useState('تهران');
  const [city, setCity] = useState('تهران');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');

  // Gateway Simulation State
  const [cardNumber, setCardNumber] = useState('6037-9975-4412-8821');
  const [cvv2, setCvv2] = useState('342');
  const [expMonth, setExpMonth] = useState('08');
  const [expYear, setExpYear] = useState('06');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const hasPhysical = cart.some(i => !i.isDigital);

  if (!isOpen) return null;

  const handleProceedToGateway = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('gateway');
  };

  const handleGatewayPayment = async () => {
    setIsProcessing(true);
    setTimeout(async () => {
      const shippingDetails = hasPhysical ? {
        province,
        city,
        address,
        postalCode,
        recipientName: name,
        recipientPhone: phone
      } : undefined;

      const order = await createOrder(shippingDetails);
      setCreatedOrder(order);
      setIsProcessing(false);
      setStep('success');
      onOrderSuccess(order);
    }, 1200);
  };

  const triggerOtp = () => {
    setOtpSent(true);
    setOtpCode('749102');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-right my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {step !== 'success' && (
          <button
            onClick={onClose}
            className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {/* Step 1: Customer Information & Delivery Address */}
        {step === 'info' && (
          <div>
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <ShieldCheck className="h-5 w-5 text-cyan-400" />
              <h2 className="text-base font-bold text-white">اطلاعات خریدار و تحویل سفارش</h2>
            </div>

            <form onSubmit={handleProceedToGateway} className="mt-5 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">نام و نام‌خانوادگی *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: الیاس بادیاب"
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">شماره تماس (جهت پیامک تحویل) *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">آدرس ایمیل (جهت ارسال لینک دانلود) *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none font-mono text-left dir-ltr"
                />
              </div>

              {hasPhysical && (
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-cyan-400">
                    <Truck className="h-4 w-4" />
                    <span>آدرس پستی ارسال قطعات سخت‌افزاری</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">استان</label>
                      <input
                        type="text"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">شهر</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">آدرس دقیق پستی</label>
                    <textarea
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="خیابان، پلاک، واحد..."
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">کد پستی ۱۰ رقمی</label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="1439957131"
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Order total */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-400">مبلغ نهایی قابل پرداخت:</div>
                  <div className="text-lg font-bold text-cyan-400 font-mono">
                    {cartPayable.toLocaleString('fa-IR')} تومان
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition-all"
                >
                  <CreditCard className="h-4 w-4" />
                  <span>انتقال به درگاه امن شاپرک</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 2: Realistic Shaparak Gateway UI */}
        {step === 'gateway' && (
          <div className="space-y-4">
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span>درگاه پرداخت اینترنتی شاپرک (شبکه الکترونیکی پرداخت کارت)</span>
              </div>
              <span className="font-mono text-[11px]">SSL 256-Bit</span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3 text-xs">
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">پذیرنده:</span>
                <span className="font-bold text-white">الکترومتال - الیاس بادیاب</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">مبلغ تراکنش:</span>
                <span className="font-bold text-cyan-400 font-mono">
                  {cartPayable.toLocaleString('fa-IR')} تومان ({(cartPayable * 10).toLocaleString('fa-IR')} ریال)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">کد ترمینال / پذیرنده:</span>
                <span className="font-mono text-slate-300">SHP-9921482</span>
              </div>
            </div>

            <div className="space-y-3 text-xs pt-1">
              <div>
                <label className="block text-slate-400 mb-1">شماره کارت ۱۶ رقمی</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white font-mono text-center tracking-widest text-sm focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">کد امنیتی CVV2</label>
                  <input
                    type="password"
                    maxLength={4}
                    value={cvv2}
                    onChange={(e) => setCvv2(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white font-mono text-center focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">تاریخ انقضا (ماه / سال)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={2}
                      value={expMonth}
                      onChange={(e) => setExpMonth(e.target.value)}
                      placeholder="ماه"
                      className="w-1/2 rounded-lg border border-slate-800 bg-slate-950 px-2 py-2 text-white font-mono text-center focus:border-cyan-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      maxLength={2}
                      value={expYear}
                      onChange={(e) => setExpYear(e.target.value)}
                      placeholder="سال"
                      className="w-1/2 rounded-lg border border-slate-800 bg-slate-950 px-2 py-2 text-white font-mono text-center focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">رمز پویا (رمز یکبار مصرف SMS)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="کد ۶ رقمی"
                    className="flex-1 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white font-mono text-center focus:border-cyan-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={triggerOtp}
                    className="rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-3 py-2 text-[11px] font-semibold text-cyan-400 hover:bg-cyan-500/20 shrink-0"
                  >
                    {otpSent ? 'ارسال مجدد رمز' : 'دریافت رمز پویا'}
                  </button>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep('info')}
                  className="rounded-xl border border-slate-800 px-4 py-2.5 text-xs text-slate-400 hover:text-white"
                >
                  انصراف
                </button>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleGatewayPayment}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-xs sm:text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
                >
                  {isProcessing ? (
                    <span>در حال اعتبارسنجی تراکنش...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      <span>پرداخت و تایید نهایی</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Success & Instant Digital Token Access */}
        {step === 'success' && createdOrder && (
          <div className="space-y-5 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-white">پرداخت با موفقیت انجام شد</h3>
              <p className="text-xs text-slate-400">
                سفارش شما در سیستم ثبت و شناسه پیگیری صادر گردید.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs space-y-2 text-right">
              <div className="flex justify-between">
                <span className="text-slate-500">شماره سفارش:</span>
                <span className="font-mono font-bold text-white">{createdOrder.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">کد پیگیری شاپرک:</span>
                <span className="font-mono text-cyan-400">{createdOrder.trackingCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">شناسه مرجع تراکنش (RRN):</span>
                <span className="font-mono text-slate-300">{createdOrder.transactionId}</span>
              </div>
              <div className="flex justify-between border-t border-slate-900 pt-2">
                <span className="text-slate-500">مبلغ پرداخت شده:</span>
                <span className="font-mono font-bold text-emerald-400">
                  {createdOrder.payableAmount.toLocaleString('fa-IR')} تومان
                </span>
              </div>
            </div>

            {/* Instant Digital Downloads List */}
            {createdOrder.digitalDownloads && createdOrder.digitalDownloads.length > 0 && (
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4 text-right space-y-3">
                <div className="flex items-center gap-2 font-bold text-cyan-300 text-xs">
                  <Download className="h-4 w-4" />
                  <span>دسترسی آنی به فایل‌های دانلودی سفارش:</span>
                </div>

                <div className="space-y-2">
                  {createdOrder.digitalDownloads.map((dl) => (
                    <div 
                      key={dl.token}
                      className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 p-2.5 text-xs"
                    >
                      <div>
                        <div className="font-semibold text-white">فایل مهندسی پروژه</div>
                        <div className="text-[10px] text-slate-400 font-mono">توکن امن: {dl.token.substring(0, 14)}...</div>
                      </div>

                      <button
                        onClick={() => alert(`دانلود فایل با توکن امن ${dl.token} آغاز گردید.`)}
                        className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition-colors"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>دانلود فایل</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full rounded-xl bg-slate-800 py-2.5 text-xs font-semibold text-white hover:bg-slate-700 transition-colors"
            >
              بستن و بازگشت به سایت
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
