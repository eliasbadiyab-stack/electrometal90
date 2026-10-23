import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  UserRole, 
  ProductType, 
  SectionContentType, 
  AdPlacement,
  OrderStatus 
} from '../../types';
import { 
  LayoutDashboard, 
  Settings, 
  Layers, 
  Cpu, 
  FolderOpen, 
  Users, 
  ShoppingBag, 
  LifeBuoy, 
  Megaphone, 
  Newspaper, 
  FileText, 
  Database, 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Check, 
  Download, 
  Upload, 
  ArrowUp, 
  ArrowDown, 
  ShieldCheck, 
  RefreshCw,
  Search,
  ExternalLink,
  ChevronDown,
  ShieldAlert,
  LogOut
} from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type AdminTab = 
  | 'dashboard' 
  | 'settings' 
  | 'sections' 
  | 'products' 
  | 'files' 
  | 'users' 
  | 'orders' 
  | 'tickets' 
  | 'ads' 
  | 'news' 
  | 'audit' 
  | 'backup';

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { 
    siteSettings, 
    updateSiteSettings, 
    currentUser, 
    isAdminAuthenticated,
    logoutAdmin,
    users, 
    updateUser, 
    addUser, 
    deleteUser, 
    toggleVerifyUser, 
    toggleBlockUser, 
    toggleSpecialMember,
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct,
    categories, 
    addCategory, 
    updateCategory, 
    deleteCategory,
    sections, 
    addSection, 
    updateSection, 
    deleteSection, 
    reorderSection,
    orders, 
    updateOrderStatus, 
    revokeDigitalToken,
    tickets, 
    replyTicket, 
    updateTicketStatus,
    announcements, 
    addAnnouncement, 
    deleteAnnouncement,
    advertisements, 
    addAdvertisement, 
    deleteAdvertisement,
    managedFiles, 
    uploadFile, 
    deleteFile, 
    renameFile,
    auditLogs, 
    exportBackup, 
    importBackup, 
    resetToFactoryDefaults 
  } = useApp();

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState(siteSettings);

  // New Product Modal/Form State
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProdTitleFa, setNewProdTitleFa] = useState('');
  const [newProdSku, setNewProdSku] = useState(`EM-${Math.floor(1000 + Math.random() * 9000)}`);
  const [newProdPrice, setNewProdPrice] = useState<number>(500000);
  const [newProdType, setNewProdType] = useState<ProductType>('digital');
  const [newProdCategory, setNewProdCategory] = useState(categories[0]?.id || '');
  const [newProdSection, setNewProdSection] = useState(sections[0]?.id || '');
  const [newProdShortDesc, setNewProdShortDesc] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdFileName, setNewProdFileName] = useState('');
  const [newProdFileExt, setNewProdFileExt] = useState('ZIP');
  const [newProdFileSize, setNewProdFileSize] = useState('15 MB');

  // New Section State
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [newSecTitleFa, setNewSecTitleFa] = useState('');
  const [newSecSubtitleFa, setNewSecSubtitleFa] = useState('');
  const [newSecType, setNewSecType] = useState<SectionContentType>('electronics');
  const [newSecIcon, setNewSecIcon] = useState('Cpu');

  // New User State
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('user');
  const [newUserSpecialTitle, setNewUserSpecialTitle] = useState('');

  // New Ad State
  const [newAdTitle, setNewAdTitle] = useState('');
  const [newAdPlacement, setNewAdPlacement] = useState<AdPlacement>('homepage');
  const [newAdUrl, setNewAdUrl] = useState('');

  // New Announcement State
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnSummary, setNewAnnSummary] = useState('');
  const [newAnnYoutube, setNewAnnYoutube] = useState('');
  const [newAnnTelegram, setNewAnnTelegram] = useState('');

  // Backup import JSON state
  const [importJsonText, setImportJsonText] = useState('');

  if (!isOpen) return null;

  if (!isAdminAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
        <div className="relative w-full max-w-md rounded-2xl border border-rose-500/30 bg-slate-900 p-8 text-center space-y-4">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
            <ShieldAlert className="h-7 w-7" />
          </div>
          <h3 className="font-extrabold text-white text-base">دسترسی امنیتی مسدود است</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            ورود به پنل مدیریت مستلزم احراز هویت با نام کاربری و رمز عبور رمزنگاری شده مالک سایت می‌باشد.
          </p>
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-slate-800 py-2.5 text-xs font-semibold text-white hover:bg-slate-700 transition-colors"
          >
            بستن
          </button>
        </div>
      </div>
    );
  }

  const showNotification = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(settingsForm);
    showNotification('تنظیمات سایت با موفقیت بروزرسانی شد.');
  };

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      sku: newProdSku,
      title: newProdTitleFa,
      titleFa: newProdTitleFa,
      slug: newProdTitleFa.toLowerCase().replace(/\s+/g, '-'),
      shortDescription: newProdShortDesc,
      description: newProdDesc,
      price: Number(newProdPrice),
      stock: newProdType === 'digital' ? 999 : 20,
      type: newProdType,
      categoryId: newProdCategory,
      sectionId: newProdSection,
      tags: ['New', newProdType],
      mainImage: '/assets/pcb_stm32_controller_1792786860807.jpg',
      gallery: ['/assets/pcb_stm32_controller_1792786860807.jpg'],
      digitalFile: newProdType === 'digital' ? {
        fileName: newProdFileName || `${newProdSku}_package.${newProdFileExt.toLowerCase()}`,
        fileExtension: newProdFileExt,
        fileSize: newProdFileSize,
        downloadLimit: 5,
        expiryHours: 72
      } : undefined,
      technicalSpecs: {
        'تست عملکرد': 'آزمایشگاه تایید شده Electro Metal',
        'نوع مجوز': 'تجاری و صنعتی'
      },
      isFeatured: true,
      isRecommended: true,
      isNew: true,
      isBestSeller: false,
      isPublished: true
    });
    setIsAddingProduct(false);
    showNotification('محصول جدید با موفقیت اضافه شد.');
  };

  const handleAddSectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSection({
      name: newSecTitleFa,
      titleFa: newSecTitleFa,
      subtitleFa: newSecSubtitleFa,
      iconName: newSecIcon,
      contentType: newSecType,
      order: sections.length + 1,
      isActive: true,
      isPublic: true,
      isPurchasable: true,
      description: newSecSubtitleFa
    });
    setIsAddingSection(false);
    showNotification('بخش جدید به صفحه اصلی سایت اضافه شد.');
  };

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUser({
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      isVerified: true,
      isSpecialMember: Boolean(newUserSpecialTitle),
      specialTitle: newUserSpecialTitle || undefined,
      isBlocked: false
    });
    setIsAddingUser(false);
    showNotification(`کاربر ${newUserName} ایجاد شد.`);
  };

  const handleAddAdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAdvertisement({
      title: newAdTitle,
      imageUrl: '/assets/hero_electro_metal_1792786859342.jpg',
      destinationUrl: newAdUrl || '#',
      placement: newAdPlacement,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2027-01-01',
      isActive: true
    });
    setNewAdTitle('');
    setNewAdUrl('');
    showNotification('بنر تبلیغاتی جدید ثبت شد.');
  };

  const handleAddAnnouncementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAnnouncement({
      title: newAnnTitle,
      summary: newAnnSummary,
      content: newAnnSummary,
      thumbnail: '/assets/hero_electro_metal_1792786859342.jpg',
      youtubeUrl: newAnnYoutube || undefined,
      telegramUrl: newAnnTelegram || undefined,
      isPublished: true
    });
    setNewAnnTitle('');
    setNewAnnSummary('');
    setNewAnnYoutube('');
    setNewAnnTelegram('');
    showNotification('خبر / اطلاعیه جدید منتشر شد.');
  };

  const handleImportJson = () => {
    if (!importJsonText.trim()) return;
    const ok = importBackup(importJsonText);
    if (ok) {
      showNotification('دیتابیس با موفقیت از فایل بازیابی شد.');
      setImportJsonText('');
    } else {
      alert('خطا در قالب فایل JSON! لطفاً فایل خروجی معتبر را وارد کنید.');
    }
  };

  // KPI calculations
  const totalSalesRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'successful' ? o.payableAmount : 0), 0);
  const totalDigitalDownloads = orders.reduce((sum, o) => sum + (o.digitalDownloads ? o.digitalDownloads.reduce((s, d) => s + d.downloadCount, 0) : 0), 0);
  const openTicketsCount = tickets.filter(t => t.status === 'open' || t.status === 'pending').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-hidden">
      <div 
        className="relative w-full max-w-7xl h-[95vh] rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl flex flex-col overflow-hidden text-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar of Admin Panel */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950/80 shrink-0">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-bold text-sm">
              EM
            </span>
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <span>پنل مدیریت مالک – {siteSettings.brandName}</span>
                <span className="rounded bg-cyan-500/20 px-2 py-0.5 text-[10px] text-cyan-300 font-mono">
                  Owner Suite
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                مدیریت کامل و مستقل بدون نیاز به تغییر کد منبع · سازنده: {siteSettings.creatorName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {successMessage && (
              <div className="hidden sm:flex items-center gap-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 text-xs text-emerald-400 animate-in fade-in">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>{successMessage}</span>
              </div>
            )}

            <button
              onClick={() => {
                logoutAdmin();
                onClose();
              }}
              className="flex items-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 transition-colors"
              title="خروج امن و انقضای نشست"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">خروج امن از پنل</span>
            </button>

            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Main Content Area with Sidebar Tabs */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Admin Navigation Sidebar (Right in RTL) */}
          <div className="w-60 border-l border-slate-800 bg-slate-950/70 p-3 space-y-1 overflow-y-auto shrink-0 hidden md:block text-xs font-medium">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 transition-colors ${activeTab === 'dashboard' ? 'bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/30' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>داشبورد و آمار</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 transition-colors ${activeTab === 'settings' ? 'bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/30' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
            >
              <Settings className="h-4 w-4" />
              <span>تنظیمات کلی سایت</span>
            </button>

            <button
              onClick={() => setActiveTab('sections')}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 transition-colors ${activeTab === 'sections' ? 'bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/30' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
            >
              <Layers className="h-4 w-4" />
              <span>مدیریت بخش‌ها (Page Builder)</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 transition-colors ${activeTab === 'products' ? 'bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/30' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
            >
              <Cpu className="h-4 w-4" />
              <span>محصولات و فایل‌ها ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 transition-colors ${activeTab === 'orders' ? 'bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/30' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
            >
              <ShoppingBag className="h-4 w-4" />
              <span>سفارش‌ها و تراکنش‌ها ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 transition-colors ${activeTab === 'users' ? 'bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/30' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
            >
              <Users className="h-4 w-4" />
              <span>کاربران و دسترسی‌ها ({users.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('files')}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 transition-colors ${activeTab === 'files' ? 'bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/30' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
            >
              <FolderOpen className="h-4 w-4" />
              <span>فایل منیجر ({managedFiles.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('tickets')}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 transition-colors ${activeTab === 'tickets' ? 'bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/30' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
            >
              <LifeBuoy className="h-4 w-4" />
              <span>تیکت‌های پشتیبانی ({tickets.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('ads')}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 transition-colors ${activeTab === 'ads' ? 'bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/30' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
            >
              <Megaphone className="h-4 w-4" />
              <span>تبلیغات داخلی ({advertisements.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('news')}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 transition-colors ${activeTab === 'news' ? 'bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/30' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
            >
              <Newspaper className="h-4 w-4" />
              <span>اخبار و یوتیوب ({announcements.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 transition-colors ${activeTab === 'audit' ? 'bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/30' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
            >
              <FileText className="h-4 w-4" />
              <span>لاگ فعالیت‌ها (Audit Log)</span>
            </button>

            <button
              onClick={() => setActiveTab('backup')}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 transition-colors ${activeTab === 'backup' ? 'bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/30' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
            >
              <Database className="h-4 w-4" />
              <span>پشتیبان‌گیری دیتابیس</span>
            </button>
          </div>

          {/* Active Tab View */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            
            {/* 1. Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-white">آمار عملکرد پلتفرم</h3>
                  <p className="text-xs text-slate-400">دید کلی وضعیت فروش، دانلود فایل‌ها و فعالیت کاربران</p>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-1">
                    <span className="text-xs text-slate-400">کل درآمد فروش:</span>
                    <div className="text-lg font-bold text-cyan-400 font-mono">
                      {totalSalesRevenue.toLocaleString('fa-IR')} تومان
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-1">
                    <span className="text-xs text-slate-400">تعداد سفارش‌ها:</span>
                    <div className="text-lg font-bold text-white font-mono">
                      {orders.length} سفارش
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-1">
                    <span className="text-xs text-slate-400">دانلود فایل‌های مهندسی:</span>
                    <div className="text-lg font-bold text-emerald-400 font-mono">
                      {totalDigitalDownloads} دانلود
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-1">
                    <span className="text-xs text-slate-400">تیکت‌های در انتظار پاسخ:</span>
                    <div className="text-lg font-bold text-amber-400 font-mono">
                      {openTicketsCount} تیکت
                    </div>
                  </div>
                </div>

                {/* Quick Shortcuts */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <div 
                    onClick={() => setActiveTab('settings')}
                    className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-cyan-500/40 cursor-pointer transition-colors space-y-2"
                  >
                    <Settings className="h-5 w-5 text-cyan-400" />
                    <h4 className="font-bold text-white text-xs">تنظیمات برند و مالک</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      تغییر نام برند، نام سازنده (الیاس بادیاب)، شماره تلفن، آدرس و متون سایت.
                    </p>
                  </div>

                  <div 
                    onClick={() => setActiveTab('sections')}
                    className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-cyan-500/40 cursor-pointer transition-colors space-y-2"
                  >
                    <Layers className="h-5 w-5 text-cyan-400" />
                    <h4 className="font-bold text-white text-xs">مدیریت بخش‌های صفحه اصلی</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      تغییر چینش، افزودن بخش موسیقی، کتاب، پروژه‌ها و دانلود فایل به صورت پویا.
                    </p>
                  </div>

                  <div 
                    onClick={() => setActiveTab('products')}
                    className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-cyan-500/40 cursor-pointer transition-colors space-y-2"
                  >
                    <Cpu className="h-5 w-5 text-cyan-400" />
                    <h4 className="font-bold text-white text-xs">افزودن و مدیریت محصولات</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      بارگذاری فایل‌های آلتیوم، پروتئوس، گربر، کتاب الکترونیکی و تجهیزات فیزیکی.
                    </p>
                  </div>
                </div>

                {/* Recent Orders Overview */}
                <div className="pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white">آخرین سفارش‌های ثبت شده</h4>
                    <button 
                      onClick={() => setActiveTab('orders')}
                      className="text-[11px] text-cyan-400 hover:underline"
                    >
                      مشاهده همه سفارش‌ها
                    </button>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950 divide-y divide-slate-850 overflow-hidden text-xs">
                    {orders.slice(0, 4).map(o => (
                      <div key={o.id} className="p-3 flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-bold text-white flex items-center gap-2">
                            <span>{o.orderNumber}</span>
                            <span className="text-slate-400 font-normal">({o.userName})</span>
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            {new Date(o.createdAt).toLocaleString('fa-IR')}
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="font-mono text-cyan-400">
                            {o.payableAmount.toLocaleString('fa-IR')} تومان
                          </span>
                          <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
                            {o.orderStatus}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. Site Settings Tab */}
            {activeTab === 'settings' && (
              <form onSubmit={handleSaveSettings} className="space-y-6 text-xs max-w-3xl">
                <div>
                  <h3 className="text-base font-bold text-white">تنظیمات اصلی و هویت برند</h3>
                  <p className="text-xs text-slate-400">تمام تغییرات فوراً در صفحه اصلی، هدر و فوتر اعمال می‌شوند.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">نام پیش‌فرض برند (انگلیسی)</label>
                    <input
                      type="text"
                      value={settingsForm.brandName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, brandName: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white font-mono focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">نام برند (فارسی)</label>
                    <input
                      type="text"
                      value={settingsForm.brandNameFa}
                      onChange={(e) => setSettingsForm({ ...settingsForm, brandNameFa: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">نام سازنده و بنیان‌گذار</label>
                    <input
                      type="text"
                      value={settingsForm.creatorName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, creatorName: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">ایمیل رسمی مالک / پشتیبانی</label>
                    <input
                      type="email"
                      value={settingsForm.creatorEmail}
                      onChange={(e) => setSettingsForm({ ...settingsForm, creatorEmail: e.target.value, email: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white font-mono text-left dir-ltr focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">عنوان کلی سایت (Title Tag)</label>
                  <input
                    type="text"
                    value={settingsForm.siteTitle}
                    onChange={(e) => setSettingsForm({ ...settingsForm, siteTitle: e.target.value })}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">توضیحات سایت (Meta Description)</label>
                  <textarea
                    rows={3}
                    value={settingsForm.siteDescription}
                    onChange={(e) => setSettingsForm({ ...settingsForm, siteDescription: e.target.value })}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">شماره تماس فروشگاه</label>
                    <input
                      type="text"
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white font-mono focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">آدرس فروشگاه / دفتر مرکزی</label>
                    <input
                      type="text"
                      value={settingsForm.storeAddress}
                      onChange={(e) => setSettingsForm({ ...settingsForm, storeAddress: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Social Links */}
                <div className="space-y-3 pt-2 border-t border-slate-800">
                  <h4 className="font-bold text-white text-xs">لینک شبکه‌های اجتماعی</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">لینک کانال یوتیوب</label>
                      <input
                        type="url"
                        value={settingsForm.socialLinks.youtube}
                        onChange={(e) => setSettingsForm({
                          ...settingsForm,
                          socialLinks: { ...settingsForm.socialLinks, youtube: e.target.value }
                        })}
                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white font-mono text-left dir-ltr focus:border-cyan-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">لینک کانال تلگرام</label>
                      <input
                        type="url"
                        value={settingsForm.socialLinks.telegram}
                        onChange={(e) => setSettingsForm({
                          ...settingsForm,
                          socialLinks: { ...settingsForm.socialLinks, telegram: e.target.value }
                        })}
                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white font-mono text-left dir-ltr focus:border-cyan-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">لینک اینستاگرام</label>
                      <input
                        type="url"
                        value={settingsForm.socialLinks.instagram}
                        onChange={(e) => setSettingsForm({
                          ...settingsForm,
                          socialLinks: { ...settingsForm.socialLinks, instagram: e.target.value }
                        })}
                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white font-mono text-left dir-ltr focus:border-cyan-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">لینک گیت‌هاب</label>
                      <input
                        type="url"
                        value={settingsForm.socialLinks.github}
                        onChange={(e) => setSettingsForm({
                          ...settingsForm,
                          socialLinks: { ...settingsForm.socialLinks, github: e.target.value }
                        })}
                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white font-mono text-left dir-ltr focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Feature Toggles */}
                <div className="space-y-3 pt-2 border-t border-slate-800">
                  <h4 className="font-bold text-white text-xs">فعال یا غیرفعال‌سازی امکانات سایت</h4>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <label className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 p-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settingsForm.features.messagingEnabled}
                        onChange={(e) => setSettingsForm({
                          ...settingsForm,
                          features: { ...settingsForm.features, messagingEnabled: e.target.checked }
                        })}
                        className="rounded border-slate-700 text-cyan-500 focus:ring-0"
                      />
                      <span>پیام‌رسان داخلی</span>
                    </label>

                    <label className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 p-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settingsForm.features.supportTicketsEnabled}
                        onChange={(e) => setSettingsForm({
                          ...settingsForm,
                          features: { ...settingsForm.features, supportTicketsEnabled: e.target.checked }
                        })}
                        className="rounded border-slate-700 text-cyan-500 focus:ring-0"
                      />
                      <span>سیستم تیکت پشتیبانی</span>
                    </label>

                    <label className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 p-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settingsForm.features.adsEnabled}
                        onChange={(e) => setSettingsForm({
                          ...settingsForm,
                          features: { ...settingsForm.features, adsEnabled: e.target.checked }
                        })}
                        className="rounded border-slate-700 text-cyan-500 focus:ring-0"
                      />
                      <span>تبلیغات داخلی</span>
                    </label>

                    <label className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 p-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settingsForm.features.digitalDownloadsEnabled}
                        onChange={(e) => setSettingsForm({
                          ...settingsForm,
                          features: { ...settingsForm.features, digitalDownloadsEnabled: e.target.checked }
                        })}
                        className="rounded border-slate-700 text-cyan-500 focus:ring-0"
                      />
                      <span>فروش فایل دیجیتال</span>
                    </label>

                    <label className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 p-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settingsForm.features.newsEnabled}
                        onChange={(e) => setSettingsForm({
                          ...settingsForm,
                          features: { ...settingsForm.features, newsEnabled: e.target.checked }
                        })}
                        className="rounded border-slate-700 text-cyan-500 focus:ring-0"
                      />
                      <span>اخبار و یوتیوب</span>
                    </label>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-2.5 font-bold text-slate-950 hover:bg-cyan-400 transition-colors shadow-md shadow-cyan-500/20"
                  >
                    <Check className="h-4 w-4" />
                    <span>ذخیره کلیه تنظیمات</span>
                  </button>
                </div>
              </form>
            )}

            {/* 3. Sections Management (Page Builder) */}
            {activeTab === 'sections' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white">مدیریت بخش‌های صفحه اصلی (Page Builder)</h3>
                    <p className="text-xs text-slate-400">بخش‌های جدید اضافه کنید، ترتیب نمایش را تغییر دهید یا موقتاً مخفی کنید.</p>
                  </div>

                  <button
                    onClick={() => setIsAddingSection(true)}
                    className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>افزودن بخش جدید</span>
                  </button>
                </div>

                {/* Add Section Form */}
                {isAddingSection && (
                  <form onSubmit={handleAddSectionSubmit} className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-5 space-y-4 text-xs">
                    <h4 className="font-bold text-white text-sm">مشخصات بخش جدید</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-400 mb-1">عنوان فارسی بخش *</label>
                        <input
                          type="text"
                          required
                          value={newSecTitleFa}
                          onChange={(e) => setNewSecTitleFa(e.target.value)}
                          placeholder="مثال: بخش دوره‌ها و آموزش‌های ویدیویی"
                          className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1">نوع محتوای این بخش *</label>
                        <select
                          value={newSecType}
                          onChange={(e) => setNewSecType(e.target.value as any)}
                          className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                        >
                          <option value="electronics">مدارها و پروژه‌های الکترونیک</option>
                          <option value="digital_files">فایل‌های دانلودی و گربر</option>
                          <option value="physical_products">محصولات فیزیکی و تجهیزات</option>
                          <option value="books">کتاب‌ها و دوره‌ها</option>
                          <option value="music_beats">بیت و موسیقی متال/الکترونیک</option>
                          <option value="news">اخبار و ویدیوهای یوتیوب</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">زیرعنوان / توضیحات بخش</label>
                      <input
                        type="text"
                        value={newSecSubtitleFa}
                        onChange={(e) => setNewSecSubtitleFa(e.target.value)}
                        placeholder="توضیح کوتاه ۱ خطی که زیر عنوان نمایش داده می‌شود..."
                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingSection(false)}
                        className="rounded-lg border border-slate-800 px-3 py-1.5 text-slate-400 hover:text-white"
                      >
                        انصراف
                      </button>
                      <button
                        type="submit"
                        className="rounded-lg bg-cyan-500 px-5 py-1.5 font-bold text-slate-950 hover:bg-cyan-400"
                      >
                        ایجاد بخش
                      </button>
                    </div>
                  </form>
                )}

                {/* Sections List */}
                <div className="space-y-3">
                  {sections.map((sec, idx) => (
                    <div 
                      key={sec.id}
                      className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-950/70 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded bg-slate-800 font-mono text-[11px] text-slate-300">
                          {idx + 1}
                        </span>
                        <div>
                          <h4 className="font-bold text-white text-sm">{sec.titleFa}</h4>
                          <span className="text-slate-400">نوع: {sec.contentType} · شناسه: {sec.id}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Toggle active */}
                        <button
                          onClick={() => updateSection(sec.id, { isActive: !sec.isActive })}
                          className={`rounded px-2.5 py-1 font-mono text-[11px] ${sec.isActive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}
                        >
                          {sec.isActive ? 'فعال در صفحه اصلی' : 'مخفی شده'}
                        </button>

                        {/* Reorder Buttons */}
                        <div className="flex items-center gap-1">
                          <button
                            disabled={idx === 0}
                            onClick={() => reorderSection(sec.id, 'up')}
                            className="p-1 text-slate-400 hover:text-cyan-400 disabled:opacity-20"
                            title="انتقال به بالا"
                          >
                            <ArrowUp className="h-4 w-4" />
                          </button>
                          <button
                            disabled={idx === sections.length - 1}
                            onClick={() => reorderSection(sec.id, 'down')}
                            className="p-1 text-slate-400 hover:text-cyan-400 disabled:opacity-20"
                            title="انتقال به پایین"
                          >
                            <ArrowDown className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Delete Section */}
                        <button
                          onClick={() => deleteSection(sec.id)}
                          className="text-slate-500 hover:text-rose-400 p-1"
                          title="حذف بخش"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Products Management */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white">مدیریت محصولات، فایل‌ها و قطعات</h3>
                    <p className="text-xs text-slate-400">محصولات فیزیکی یا فایل‌های دیجیتال (Altium, Proteus, KiCad, Gerber, Firmware, Book, Beats) را اضافه کنید.</p>
                  </div>

                  <button
                    onClick={() => setIsAddingProduct(true)}
                    className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>افزودن محصول جدید</span>
                  </button>
                </div>

                {/* Add Product Form */}
                {isAddingProduct && (
                  <form onSubmit={handleAddProductSubmit} className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-5 space-y-4 text-xs">
                    <h4 className="font-bold text-white text-sm">اطلاعات محصول جدید</h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-slate-400 mb-1">نام محصول (فارسی) *</label>
                        <input
                          type="text"
                          required
                          value={newProdTitleFa}
                          onChange={(e) => setNewProdTitleFa(e.target.value)}
                          placeholder="مثال: برد درایور موتور براشلس ۴۸ ولت"
                          className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1">کد محصول (SKU)</label>
                        <input
                          type="text"
                          value={newProdSku}
                          onChange={(e) => setNewProdSku(e.target.value)}
                          className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white font-mono focus:border-cyan-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1">قیمت (تومان) *</label>
                        <input
                          type="number"
                          required
                          value={newProdPrice}
                          onChange={(e) => setNewProdPrice(Number(e.target.value))}
                          className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white font-mono focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-slate-400 mb-1">نوع محصول</label>
                        <select
                          value={newProdType}
                          onChange={(e) => setNewProdType(e.target.value as ProductType)}
                          className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                        >
                          <option value="digital">فایل دانلودی دیجیتال</option>
                          <option value="physical">محصول فیزیکی / سخت‌افزار</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1">دسته‌بندی</label>
                        <select
                          value={newProdCategory}
                          onChange={(e) => setNewProdCategory(e.target.value)}
                          className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                        >
                          {categories.map(c => (
                            <option key={c.id} value={c.id}>{c.nameFa}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1">بخش صفحه اصلی</label>
                        <select
                          value={newProdSection}
                          onChange={(e) => setNewProdSection(e.target.value)}
                          className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                        >
                          {sections.map(s => (
                            <option key={s.id} value={s.id}>{s.titleFa}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {newProdType === 'digital' && (
                      <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-3">
                        <div className="font-bold text-cyan-400">تنظیمات فایل دیجیتال دانلودی:</div>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="block text-slate-400 mb-1">فرمت فایل</label>
                            <input
                              type="text"
                              value={newProdFileExt}
                              onChange={(e) => setNewProdFileExt(e.target.value)}
                              placeholder="ZIP, PDF, HEX, INO, GERBER, PRJ"
                              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-400 mb-1">حجم تقریبی</label>
                            <input
                              type="text"
                              value={newProdFileSize}
                              onChange={(e) => setNewProdFileSize(e.target.value)}
                              placeholder="مثال: 45 MB"
                              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-400 mb-1">نام فایل پکیج</label>
                            <input
                              type="text"
                              value={newProdFileName}
                              onChange={(e) => setNewProdFileName(e.target.value)}
                              placeholder="Project_Package.zip"
                              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-white font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-slate-400 mb-1">توضیح کوتاه</label>
                      <input
                        type="text"
                        value={newProdShortDesc}
                        onChange={(e) => setNewProdShortDesc(e.target.value)}
                        placeholder="خلاصه‌ای از قابلیت‌های مدار یا محصول..."
                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">شرح کامل و مستندات</label>
                      <textarea
                        rows={3}
                        value={newProdDesc}
                        onChange={(e) => setNewProdDesc(e.target.value)}
                        placeholder="محتویات پکیج دانلودی، مشخصات فنی و استانداردهای رعایت شده..."
                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingProduct(false)}
                        className="rounded-lg border border-slate-800 px-3 py-1.5 text-slate-400 hover:text-white"
                      >
                        انصراف
                      </button>
                      <button
                        type="submit"
                        className="rounded-lg bg-cyan-500 px-5 py-1.5 font-bold text-slate-950 hover:bg-cyan-400"
                      >
                        ذخیره و انتشار محصول
                      </button>
                    </div>
                  </form>
                )}

                {/* Products Table */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="p-3">محصول</th>
                        <th className="p-3">کد (SKU)</th>
                        <th className="p-3">نوع</th>
                        <th className="p-3">قیمت</th>
                        <th className="p-3">فروش</th>
                        <th className="p-3">وضعیت</th>
                        <th className="p-3">عملیات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850">
                      {products.map(p => (
                        <tr key={p.id} className="hover:bg-slate-900/50">
                          <td className="p-3 flex items-center gap-2.5">
                            <img src={p.mainImage} alt={p.titleFa} className="h-9 w-9 rounded-lg object-cover" />
                            <div>
                              <div className="font-bold text-white truncate max-w-xs">{p.titleFa}</div>
                              <div className="text-[10px] text-slate-500">{p.type === 'digital' ? 'فایل دانلودی' : 'قطعه فیزیکی'}</div>
                            </div>
                          </td>
                          <td className="p-3 font-mono text-slate-300">{p.sku}</td>
                          <td className="p-3 font-mono text-cyan-400 uppercase text-[11px]">{p.type}</td>
                          <td className="p-3 font-mono font-bold text-white">{p.price.toLocaleString('fa-IR')} ت</td>
                          <td className="p-3 font-mono text-slate-400">{p.salesCount}</td>
                          <td className="p-3">
                            <button
                              onClick={() => updateProduct(p.id, { isPublished: !p.isPublished })}
                              className={`rounded px-2 py-0.5 text-[10px] ${p.isPublished ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}
                            >
                              {p.isPublished ? 'منتشر شده' : 'پیش‌نویس'}
                            </button>
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => deleteProduct(p.id)}
                              className="text-slate-500 hover:text-rose-400 p-1"
                              title="حذف"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 5. Users Management & Verification */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white">مدیریت کاربران و سطوح دسترسی (RBAC)</h3>
                    <p className="text-xs text-slate-400">اعطای تیک آبی رسمی، تعیین نقش مدیر یا پشتیبان و مسدودسازی کاربران.</p>
                  </div>

                  <button
                    onClick={() => setIsAddingUser(true)}
                    className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>افزودن کاربر جدید</span>
                  </button>
                </div>

                {isAddingUser && (
                  <form onSubmit={handleAddUserSubmit} className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-5 space-y-4 text-xs">
                    <h4 className="font-bold text-white text-sm">افزودن کاربر یا مدیر</h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-400 mb-1">نام کامل</label>
                        <input
                          type="text"
                          required
                          value={newUserName}
                          onChange={(e) => setNewUserName(e.target.value)}
                          className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1">ایمیل کاربر</label>
                        <input
                          type="email"
                          required
                          value={newUserEmail}
                          onChange={(e) => setNewUserEmail(e.target.value)}
                          className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white font-mono text-left dir-ltr"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-400 mb-1">سطح دسترسی (نقش)</label>
                        <select
                          value={newUserRole}
                          onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                          className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white"
                        >
                          <option value="user">کاربر عادی (User)</option>
                          <option value="support">پشتیبانی مشتریان (Support)</option>
                          <option value="editor">ویرایشگر محتوا (Editor)</option>
                          <option value="product_manager">مدیر محصولات (Product Manager)</option>
                          <option value="admin">مدیر سیستم (Admin)</option>
                          <option value="super_admin">سوپر ادمین (Super Admin)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1">عنوان تخصصی (جهت نمایش در تیم سایت)</label>
                        <input
                          type="text"
                          value={newUserSpecialTitle}
                          onChange={(e) => setNewUserSpecialTitle(e.target.value)}
                          placeholder="مثال: طراح بردهای الکترونیکی"
                          className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingUser(false)}
                        className="rounded-lg border border-slate-800 px-3 py-1.5 text-slate-400 hover:text-white"
                      >
                        انصراف
                      </button>
                      <button
                        type="submit"
                        className="rounded-lg bg-cyan-500 px-5 py-1.5 font-bold text-slate-950 hover:bg-cyan-400"
                      >
                        ایجاد کاربر
                      </button>
                    </div>
                  </form>
                )}

                {/* Users Table */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="p-3">کاربر</th>
                        <th className="p-3">ایمیل</th>
                        <th className="p-3">نقش</th>
                        <th className="p-3">تیک آبی</th>
                        <th className="p-3">نمایش در تیم سایت</th>
                        <th className="p-3">وضعیت حساب</th>
                        <th className="p-3">عملیات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850">
                      {users.map(u => (
                        <tr key={u.id} className="hover:bg-slate-900/50">
                          <td className="p-3 flex items-center gap-2">
                            <span className="font-bold text-white">{u.name}</span>
                            {u.isVerified && (
                              <span title="دارای تیک آبی">
                                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                              </span>
                            )}
                          </td>
                          <td className="p-3 font-mono text-slate-400">{u.email}</td>
                          <td className="p-3">
                            <span className="rounded bg-cyan-500/10 px-2 py-0.5 text-[10px] font-mono text-cyan-400 uppercase">
                              {u.role}
                            </span>
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => toggleVerifyUser(u.id)}
                              className={`rounded px-2.5 py-1 text-[11px] font-medium transition-colors ${u.isVerified ? 'bg-cyan-500 text-slate-950 font-bold' : 'border border-slate-800 text-slate-400'}`}
                            >
                              {u.isVerified ? 'تیک آبی فعال' : 'غیرفعال'}
                            </button>
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => toggleSpecialMember(u.id)}
                              className={`rounded px-2 py-1 text-[11px] ${u.isSpecialMember ? 'bg-purple-500/20 text-purple-300 font-semibold' : 'text-slate-500'}`}
                            >
                              {u.isSpecialMember ? 'عضو ویژه' : 'عادی'}
                            </button>
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => toggleBlockUser(u.id)}
                              className={`rounded px-2 py-0.5 text-[10px] ${u.isBlocked ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'}`}
                            >
                              {u.isBlocked ? 'مسدود شده' : 'فعال'}
                            </button>
                          </td>
                          <td className="p-3">
                            {u.role !== 'owner' && (
                              <button
                                onClick={() => deleteUser(u.id)}
                                className="text-slate-500 hover:text-rose-400 p-1"
                                title="حذف کاربر"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 6. Orders & Transactions */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-white">مدیریت سفارش‌ها و تراکنش‌های بانکی</h3>
                  <p className="text-xs text-slate-400">تغییر وضعیت ارسال سفارشات فیزیکی، کنترل دسترسی دانلود و ابطال توکن‌ها.</p>
                </div>

                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3 text-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-850 pb-2">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-white text-sm">{order.orderNumber}</span>
                          <span className="text-slate-400">خریدار: {order.userName} ({order.userPhone})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 font-mono text-[11px]">شاپرک: {order.trackingCode}</span>
                          <select
                            value={order.orderStatus}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                            className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-white font-mono text-xs"
                          >
                            <option value="pending">در انتظار (Pending)</option>
                            <option value="paid">پرداخت شده (Paid)</option>
                            <option value="processing">در حال آماده‌سازی (Processing)</option>
                            <option value="shipped">ارسال شد (Shipped)</option>
                            <option value="completed">تکمیل شده (Completed)</option>
                            <option value="cancelled">لغو شده (Cancelled)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <div className="font-semibold text-slate-300">اقلام سفارش:</div>
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-slate-400">
                              <span>{item.productTitle} × {item.quantity}</span>
                              <span className="font-mono text-slate-200">{(item.productPrice * item.quantity).toLocaleString('fa-IR')} ت</span>
                            </div>
                          ))}
                        </div>

                        {order.digitalDownloads && order.digitalDownloads.length > 0 && (
                          <div className="rounded-lg bg-slate-900/60 p-3 space-y-2 border border-slate-850">
                            <div className="font-semibold text-cyan-400">توکن‌های دانلود دیجیتال:</div>
                            {order.digitalDownloads.map(d => (
                              <div key={d.token} className="flex items-center justify-between">
                                <span className="font-mono text-[11px] text-slate-400">
                                  {d.downloadCount}/{d.maxDownloads} دانلود
                                </span>
                                <button
                                  onClick={() => revokeDigitalToken(order.id, d.productId)}
                                  className="text-[10px] text-rose-400 hover:underline"
                                >
                                  ابطال دسترسی دانلود
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-slate-900 text-slate-400">
                        <span>مبلغ کل پرداختی: <span className="font-mono font-bold text-white">{order.payableAmount.toLocaleString('fa-IR')} تومان</span></span>
                        <span className="font-mono text-[11px]">تاریخ: {new Date(order.createdAt).toLocaleString('fa-IR')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. File Manager */}
            {activeTab === 'files' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white">فایل منیجر و مخزن پروژه‌ها</h3>
                    <p className="text-xs text-slate-400">مدیریت فایل‌های زیپ، شماتیک، گربر و فایل‌های پی‌دی‌اف.</p>
                  </div>

                  <button
                    onClick={() => {
                      uploadFile({
                        name: `ElectroMetal_Project_Update_${Date.now()}.zip`,
                        folder: 'firmware_and_pcb',
                        sizeBytes: 32000000,
                        type: 'application/zip',
                        url: '/assets/pcb_stm32_controller_1792786860807.jpg',
                        isDigitalProductFile: true
                      });
                      showNotification('فایل جدید در مخزن آپلود شد.');
                    }}
                    className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    <span>آپلود فایل جدید</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {managedFiles.map(file => (
                    <div key={file.id} className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="rounded bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] text-cyan-400 uppercase">
                          {file.type.split('/')[1] || 'FILE'}
                        </span>
                        <span className="font-mono text-slate-500 text-[10px]">
                          {(file.sizeBytes / (1024 * 1024)).toFixed(1)} MB
                        </span>
                      </div>

                      <h4 className="font-bold text-white break-all">{file.name}</h4>
                      <div className="text-[11px] text-slate-400">پوشه: {file.folder}</div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-900">
                        <button
                          onClick={() => {
                            const newName = prompt('نام جدید فایل را وارد کنید:', file.name);
                            if (newName) renameFile(file.id, newName);
                          }}
                          className="text-slate-400 hover:text-cyan-400"
                        >
                          تغییر نام
                        </button>
                        <button
                          onClick={() => deleteFile(file.id)}
                          className="text-slate-500 hover:text-rose-400"
                        >
                          حذف فایل
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. Advertisements */}
            {activeTab === 'ads' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-white">مدیریت تبلیغات داخلی و بنرها</h3>
                  <p className="text-xs text-slate-400">ایجاد بنرهای اطلاع‌رسانی، جایگاه‌های تبلیغاتی و مشاهده آمار کلیک.</p>
                </div>

                <form onSubmit={handleAddAdSubmit} className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3 text-xs">
                  <h4 className="font-bold text-white">ثبت تبلیغ جدید</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">عنوان تبلیغ</label>
                      <input
                        type="text"
                        required
                        value={newAdTitle}
                        onChange={(e) => setNewAdTitle(e.target.value)}
                        placeholder="مثال: تخفیف ویژه پکیج آلتیوم"
                        className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">جایگاه نمایش</label>
                      <select
                        value={newAdPlacement}
                        onChange={(e) => setNewAdPlacement(e.target.value as AdPlacement)}
                        className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-white"
                      >
                        <option value="homepage">صفحه اصلی (Top Banner)</option>
                        <option value="between_products">بین محصولات (In-Grid)</option>
                        <option value="sidebar">ستون کناری (Sidebar)</option>
                        <option value="footer">فوتر سایت</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">لینک مقصد</label>
                      <input
                        type="text"
                        value={newAdUrl}
                        onChange={(e) => setNewAdUrl(e.target.value)}
                        placeholder="https://..."
                        className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-white font-mono text-left dir-ltr"
                      />
                    </div>
                  </div>
                  <button type="submit" className="rounded-lg bg-cyan-500 px-4 py-1.5 font-bold text-slate-950">
                    افزودن تبلیغ
                  </button>
                </form>

                <div className="space-y-3">
                  {advertisements.map(ad => (
                    <div key={ad.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-950 text-xs">
                      <div>
                        <h4 className="font-bold text-white">{ad.title}</h4>
                        <div className="text-[11px] text-slate-400">
                          جایگاه: {ad.placement} · کلیک‌ها: <span className="font-mono text-cyan-400">{ad.clicks}</span> · نمایش: <span className="font-mono text-slate-200">{ad.impressions}</span>
                        </div>
                      </div>
                      <button onClick={() => deleteAdvertisement(ad.id)} className="text-slate-500 hover:text-rose-400">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 9. News & Announcements */}
            {activeTab === 'news' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-white">اخبار و اطلاع‌رسانی (یوتیوب و تلگرام)</h3>
                  <p className="text-xs text-slate-400">اطلاع‌رسانی ویدیوهای جدید یوتیوب الیاس بادیاب، آپدیت‌های فریمور و مقالات.</p>
                </div>

                <form onSubmit={handleAddAnnouncementSubmit} className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3 text-xs">
                  <h4 className="font-bold text-white">ثبت اطلاعیه جدید</h4>
                  <div>
                    <label className="block text-slate-400 mb-1">عنوان خبر</label>
                    <input
                      type="text"
                      required
                      value={newAnnTitle}
                      onChange={(e) => setNewAnnTitle(e.target.value)}
                      placeholder="ویدیوی جدید در کانال یوتیوب منتشر شد..."
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">متن خلاصه</label>
                    <textarea
                      rows={2}
                      required
                      value={newAnnSummary}
                      onChange={(e) => setNewAnnSummary(e.target.value)}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">لینک ویدیو یوتیوب</label>
                      <input
                        type="url"
                        value={newAnnYoutube}
                        onChange={(e) => setNewAnnYoutube(e.target.value)}
                        placeholder="https://youtube.com/watch?v=..."
                        className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-white font-mono text-left dir-ltr"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">لینک پست تلگرام</label>
                      <input
                        type="url"
                        value={newAnnTelegram}
                        onChange={(e) => setNewAnnTelegram(e.target.value)}
                        placeholder="https://t.me/electrometal_org/..."
                        className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-white font-mono text-left dir-ltr"
                      />
                    </div>
                  </div>
                  <button type="submit" className="rounded-lg bg-cyan-500 px-4 py-1.5 font-bold text-slate-950">
                    انتشار اطلاعیه
                  </button>
                </form>

                <div className="space-y-3">
                  {announcements.map(ann => (
                    <div key={ann.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-950 text-xs">
                      <div>
                        <h4 className="font-bold text-white">{ann.title}</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">{ann.summary}</p>
                      </div>
                      <button onClick={() => deleteAnnouncement(ann.id)} className="text-slate-500 hover:text-rose-400">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 10. Audit Log */}
            {activeTab === 'audit' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white">ثبت وقایع و لاگ امنیتی (Audit Log)</h3>
                  <p className="text-xs text-slate-400">رهگیری تغییرات صورت گرفته در سایت توسط مدیران و مالک.</p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 divide-y divide-slate-850 overflow-hidden text-xs">
                  {auditLogs.map(log => (
                    <div key={log.id} className="p-3 flex items-start justify-between gap-4">
                      <div className="space-y-0.5">
                        <div className="font-bold text-white flex items-center gap-2">
                          <span className="text-cyan-400">{log.action}</span>
                          <span className="text-slate-500">توسط {log.userName}</span>
                        </div>
                        <p className="text-slate-400 text-[11px]">{log.details}</p>
                      </div>
                      <span className="font-mono text-[10px] text-slate-500 shrink-0">
                        {new Date(log.timestamp).toLocaleString('fa-IR')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 11. Database Backup & Restore */}
            {activeTab === 'backup' && (
              <div className="space-y-6 max-w-xl text-xs">
                <div>
                  <h3 className="text-base font-bold text-white">پشتیبان‌گیری کامل دیتابیس (JSON Backup)</h3>
                  <p className="text-xs text-slate-400">ذخیره تمام محصولات، کاربران، تنظیمات، سفارش‌ها و بازیابی با یک کلیک.</p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-3">
                  <div className="font-bold text-white text-sm">دانلود نسخه پشتیبان کامل</div>
                  <p className="text-slate-400">یک فایل متنی کامل JSON از تمام دیتابیس سایت بر روی رایانه شما ذخیره می‌شود.</p>
                  <button
                    onClick={exportBackup}
                    className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 font-bold text-slate-950 hover:bg-cyan-400 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span>دریافت فایل پشتیبان (Export Database)</span>
                  </button>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-3">
                  <div className="font-bold text-white text-sm">بازیابی نسخه پشتیبان (Restore)</div>
                  <textarea
                    rows={4}
                    value={importJsonText}
                    onChange={(e) => setImportJsonText(e.target.value)}
                    placeholder="محتویات فایل JSON بک‌آپ را در اینجا Paste کنید..."
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 p-3 text-white font-mono text-[11px] focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={handleImportJson}
                    className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 font-bold text-slate-950 hover:bg-emerald-400 transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    <span>بازیابی اطلاعات دیتابیس</span>
                  </button>
                </div>

                <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-5 space-y-3">
                  <div className="font-bold text-rose-400 text-sm">بازنشانی به تنظیمات کارخانه (Factory Reset)</div>
                  <p className="text-slate-400">برگرداندن کلیه داده‌ها به حالت اولیه پیش‌فرض برند Electro Metal.</p>
                  <button
                    onClick={() => {
                      if (confirm('آیا مطمئن هستید؟ کلیه داده‌های جدید حذف و به حالت اولیه بازخواهد گشت.')) {
                        resetToFactoryDefaults();
                        showNotification('داده‌ها به حالت کارخانه بازنشانی شدند.');
                      }
                    }}
                    className="flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/10 px-5 py-2 font-bold text-rose-400 hover:bg-rose-500 hover:text-slate-950 transition-colors"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>بازنشانی به داده‌های اولیه</span>
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
