import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  Product, 
  Category, 
  DynamicSection, 
  SiteSettings, 
  Advertisement, 
  Announcement, 
  Order, 
  OrderItem,
  SupportTicket, 
  DirectMessage,
  AuditLog,
  ManagedFile,
  OrderStatus,
  PaymentStatus,
  UserRole
} from '../types';
import { 
  initialSiteSettings, 
  initialUsers, 
  initialCategories, 
  initialDynamicSections, 
  initialProducts, 
  initialOrders, 
  initialAnnouncements, 
  initialAdvertisements, 
  initialTickets, 
  initialDirectMessages, 
  initialAuditLogs, 
  initialManagedFiles 
} from '../data/initialData';
import { 
  AdminSession, 
  getAdminSession, 
  createAdminSession, 
  destroyAdminSession, 
  verifyPassword, 
  recordFailedAttempt, 
  resetFailedAttempts, 
  getLockoutRemainingSeconds, 
  OWNER_AUTH_CONFIG 
} from '../utils/security';

interface CartItem extends OrderItem {}

interface AppContextType {
  siteSettings: SiteSettings;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  
  // Authentication & Security
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  adminSession: AdminSession | null;
  isAdminAuthenticated: boolean;
  loginAdmin: (username: string, password: string, pin?: string) => Promise<{ 
    success: boolean; 
    message: string; 
    remainingAttempts?: number; 
    lockoutSeconds?: number 
  }>;
  logoutAdmin: () => void;
  loginUser: (email: string, password?: string) => Promise<{ success: boolean; message: string }>;
  registerUser: (name: string, email: string, phone: string, password?: string) => Promise<{ success: boolean; message: string }>;
  logoutUser: () => void;

  users: User[];
  updateUser: (id: string, updates: Partial<User>) => void;
  addUser: (user: Omit<User, 'id' | 'createdAt' | 'lastLoginAt' | 'ordersCount'>) => void;
  deleteUser: (id: string) => void;
  toggleVerifyUser: (id: string) => void;
  toggleBlockUser: (id: string) => void;
  toggleSpecialMember: (id: string) => void;
  
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'salesCount' | 'rating'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  categories: Category[];
  addCategory: (category: Omit<Category, 'id' | 'count'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  sections: DynamicSection[];
  addSection: (section: Omit<DynamicSection, 'id'>) => void;
  updateSection: (id: string, updates: Partial<DynamicSection>) => void;
  deleteSection: (id: string) => void;
  reorderSection: (id: string, direction: 'up' | 'down') => void;

  orders: Order[];
  createOrder: (shippingDetails?: any) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updateOrderPaymentStatus: (orderId: string, status: PaymentStatus, txnId?: string) => void;
  revokeDigitalToken: (orderId: string, productId: string) => void;

  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartDiscount: number;
  cartPayable: number;

  tickets: SupportTicket[];
  createTicket: (subject: string, department: SupportTicket['department'], priority: SupportTicket['priority'], message: string) => void;
  replyTicket: (ticketId: string, content: string) => void;
  updateTicketStatus: (ticketId: string, status: SupportTicket['status']) => void;

  directMessages: DirectMessage[];
  sendMessage: (receiverId: string, content: string, attachment?: { url: string; name: string }) => void;
  markMessagesAsRead: (senderId: string) => void;

  announcements: Announcement[];
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'publishedAt'>) => void;
  updateAnnouncement: (id: string, updates: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;

  advertisements: Advertisement[];
  addAdvertisement: (ad: Omit<Advertisement, 'id' | 'impressions' | 'clicks'>) => void;
  updateAdvertisement: (id: string, updates: Partial<Advertisement>) => void;
  deleteAdvertisement: (id: string) => void;
  trackAdClick: (adId: string) => void;

  managedFiles: ManagedFile[];
  uploadFile: (file: Omit<ManagedFile, 'id' | 'uploadedAt'>) => void;
  deleteFile: (id: string) => void;
  renameFile: (id: string, newName: string) => void;

  auditLogs: AuditLog[];
  logAction: (action: string, details: string) => void;

  theme: 'dark' | 'light';
  toggleTheme: () => void;

  exportBackup: () => void;
  importBackup: (jsonData: string) => boolean;
  resetToFactoryDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getInitial = <T,>(key: string, fallback: T): T => {
    try {
      const stored = localStorage.getItem(`electrometal_${key}`);
      return stored ? JSON.parse(stored) : fallback;
    } catch {
      return fallback;
    }
  };

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => getInitial('settings', initialSiteSettings));
  const [users, setUsers] = useState<User[]>(() => getInitial('users', initialUsers));

  // Admin Session State
  const [adminSession, setAdminSession] = useState<AdminSession | null>(() => getAdminSession());
  const isAdminAuthenticated = Boolean(adminSession && Date.now() < adminSession.expiresAt);

  // Current User (Public visitor is null by default, or loaded customer, or owner if admin session active)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const existingAdmin = getAdminSession();
    if (existingAdmin && Date.now() < existingAdmin.expiresAt) {
      // Find Owner user
      return initialUsers.find(u => u.role === 'owner') || initialUsers[0];
    }
    const saved = getInitial<User | null>('currentUser', null);
    return saved; // null if guest
  });

  const [products, setProducts] = useState<Product[]>(() => getInitial('products', initialProducts));
  const [categories, setCategories] = useState<Category[]>(() => getInitial('categories', initialCategories));
  const [sections, setSections] = useState<DynamicSection[]>(() => getInitial('sections', initialDynamicSections));
  const [orders, setOrders] = useState<Order[]>(() => getInitial('orders', initialOrders));
  const [cart, setCart] = useState<CartItem[]>(() => getInitial('cart', []));
  const [tickets, setTickets] = useState<SupportTicket[]>(() => getInitial('tickets', initialTickets));
  const [directMessages, setDirectMessages] = useState<DirectMessage[]>(() => getInitial('messages', initialDirectMessages));
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => getInitial('announcements', initialAnnouncements));
  const [advertisements, setAdvertisements] = useState<Advertisement[]>(() => getInitial('ads', initialAdvertisements));
  const [managedFiles, setManagedFiles] = useState<ManagedFile[]>(() => getInitial('files', initialManagedFiles));
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => getInitial('auditLogs', initialAuditLogs));
  const [theme, setTheme] = useState<'dark' | 'light'>(siteSettings.theme.defaultMode || 'dark');

  // Persistence
  useEffect(() => {
    localStorage.setItem('electrometal_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem('electrometal_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('electrometal_currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('electrometal_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('electrometal_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('electrometal_sections', JSON.stringify(sections));
  }, [sections]);

  useEffect(() => {
    localStorage.setItem('electrometal_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('electrometal_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('electrometal_tickets', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('electrometal_messages', JSON.stringify(directMessages));
  }, [directMessages]);

  useEffect(() => {
    localStorage.setItem('electrometal_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('electrometal_ads', JSON.stringify(advertisements));
  }, [advertisements]);

  useEffect(() => {
    localStorage.setItem('electrometal_files', JSON.stringify(managedFiles));
  }, [managedFiles]);

  useEffect(() => {
    localStorage.setItem('electrometal_auditLogs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    if (siteSettings.siteTitle) {
      document.title = `${siteSettings.brandName} | ${siteSettings.siteTitle}`;
    }
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [siteSettings, theme]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  const logAction = (action: string, details: string) => {
    const newLog: AuditLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      userId: currentUser?.id || 'sys',
      userName: currentUser?.name || 'مهمان / سیستم',
      action,
      details,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev.slice(0, 99)]);
  };

  // Dedicated Cryptographic Admin Authentication
  const loginAdmin = async (username: string, password: string, pin?: string): Promise<{
    success: boolean;
    message: string;
    remainingAttempts?: number;
    lockoutSeconds?: number;
  }> => {
    const remainingLockout = getLockoutRemainingSeconds();
    if (remainingLockout > 0) {
      logAction('هشدار امنیتی', `تلاش ورود در حین مسدودی امنیتی موقت (${remainingLockout} ثانیه باقیمانده)`);
      return {
        success: false,
        message: `حساب به دلیل تلاش‌های ناموفق متعدد مسدود موقت شده است. لطفاً ${remainingLockout} ثانیه دیگر مجدداً تلاش کنید.`,
        lockoutSeconds: remainingLockout
      };
    }

    // Verify Username
    const cleanUser = username.trim().toLowerCase();
    const cleanOwnerEmail = OWNER_AUTH_CONFIG.username.toLowerCase();

    if (cleanUser !== cleanOwnerEmail && cleanUser !== 'elias_admin') {
      const lockRes = recordFailedAttempt();
      logAction('تلاش ناموفق برای ورود به پنل مدیریت', `نام کاربری نامعتبر وارد شد: ${cleanUser}`);
      return {
        success: false,
        message: lockRes.lockedOut 
          ? 'تعداد دفعات مجاز به پایان رسید. حساب به مدت ۶۰ ثانیه قفل شد.' 
          : `اطلاعات ورود نادرست است. فرصت‌های باقیمانده: ${lockRes.remainingAttempts}`,
        remainingAttempts: lockRes.remainingAttempts,
        lockoutSeconds: lockRes.lockoutSeconds
      };
    }

    // Cryptographic Password Verification
    const isPasswordValid = await verifyPassword(password, OWNER_AUTH_CONFIG.salt, OWNER_AUTH_CONFIG.passwordHash);

    // If PIN is provided, also verify PIN
    if (pin && pin.trim().length > 0) {
      const isPinValid = await verifyPassword(pin.trim(), OWNER_AUTH_CONFIG.pinSalt, OWNER_AUTH_CONFIG.pinHash);
      if (!isPinValid) {
        const lockRes = recordFailedAttempt();
        logAction('خطای احراز هویت دومرحله‌ای (PIN)', 'پین امنیتی وارد شده برای مالک اشتباه بود.');
        return {
          success: false,
          message: 'کد امنیتی (PIN) نامعتبر است.',
          remainingAttempts: lockRes.remainingAttempts,
          lockoutSeconds: lockRes.lockoutSeconds
        };
      }
    }

    if (!isPasswordValid) {
      const lockRes = recordFailedAttempt();
      logAction('تلاش ناموفق ورود به پنل مدیریت', `رمز عبور اشتباه برای کاربر ${cleanUser} ثبت شد.`);
      return {
        success: false,
        message: lockRes.lockedOut 
          ? 'تعداد دفعات ورود اشتباه به ۵ بار رسید. پنل مدیریت به مدت ۶۰ ثانیه قفل شد.' 
          : `رمز عبور نادرست است. دفعات باقیمانده: ${lockRes.remainingAttempts}`,
        remainingAttempts: lockRes.remainingAttempts,
        lockoutSeconds: lockRes.lockoutSeconds
      };
    }

    // Successful login: reset failed attempts, create cryptographic session
    resetFailedAttempts();
    const session = createAdminSession(OWNER_AUTH_CONFIG.username, 'owner');
    setAdminSession(session);

    // Set active current user to Owner account
    const ownerUser = users.find(u => u.email === OWNER_AUTH_CONFIG.username || u.role === 'owner') || initialUsers[0];
    setCurrentUser(ownerUser);

    logAction('ورود موفقیت‌آمیز به پنل مدیریت', `مالک سایت (${ownerUser.name}) با موفقیت احراز هویت شد و نشست امن برقرار گردید.`);
    return {
      success: true,
      message: 'ورود امن با موفقیت انجام شد.'
    };
  };

  const logoutAdmin = () => {
    destroyAdminSession();
    setAdminSession(null);
    setCurrentUser(null);
    logAction('خروج امن از پنل مدیریت', 'نشست مدیریتی مالک خاتمه یافت.');
  };

  // Public User Login & Registration
  const loginUser = async (email: string, password?: string): Promise<{ success: boolean; message: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const foundUser = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!foundUser) {
      return { success: false, message: 'کاربری با این مشخصات یافت نشد.' };
    }
    if (foundUser.isBlocked) {
      return { success: false, message: 'این حساب کاربری توسط مدیریت مسدود شده است.' };
    }

    setCurrentUser(foundUser);
    logAction('ورود کاربر', `کاربر ${foundUser.name} وارد سیستم شد.`);
    return { success: true, message: `خوش آمدید، ${foundUser.name}` };
  };

  const registerUser = async (name: string, email: string, phone: string, password?: string): Promise<{ success: boolean; message: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const existing = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return { success: false, message: 'کاربری با این ایمیل قبلاً ثبت‌نام کرده است.' };
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      phone: phone.trim(),
      role: 'user',
      isVerified: false,
      isSpecialMember: false,
      isBlocked: false,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      ordersCount: 0
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    logAction('ثبت‌نام کاربر جدید', `کاربر ${newUser.name} (${newUser.email}) در سایت ثبت‌نام کرد.`);
    return { success: true, message: 'ثبت‌نام شما با موفقیت انجام شد.' };
  };

  const logoutUser = () => {
    if (adminSession) {
      logoutAdmin();
    } else {
      setCurrentUser(null);
    }
  };

  const updateSiteSettings = (updates: Partial<SiteSettings>) => {
    setSiteSettings(prev => {
      const merged = { ...prev, ...updates };
      logAction('بروزرسانی تنظیمات سایت', `تنظیمات کلی توسط ${currentUser?.name || 'مالک'} ویرایش شد.`);
      return merged;
    });
  };

  // User Management
  const updateUser = (id: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
    if (currentUser?.id === id) {
      setCurrentUser(prev => prev ? { ...prev, ...updates } : null);
    }
    logAction('ویرایش مشخصات کاربر', `کاربر ${id} بروزرسانی گردید.`);
  };

  const addUser = (userData: Omit<User, 'id' | 'createdAt' | 'lastLoginAt' | 'ordersCount'>) => {
    const newUser: User = {
      ...userData,
      id: `usr_${Date.now()}`,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      ordersCount: 0
    };
    setUsers(prev => [...prev, newUser]);
    logAction('ایجاد کاربر جدید', `کاربر ${newUser.name} (${newUser.email}) ایجاد شد.`);
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    logAction('حذف کاربر', `کاربر شناسه ${id} حذف شد.`);
  };

  const toggleVerifyUser = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const next = !u.isVerified;
        logAction('تغییر وضعیت تیک آبی', `تیک آبی کاربر ${u.name} به ${next ? 'فعال' : 'غیرفعال'} تغییر یافت.`);
        return { ...u, isVerified: next };
      }
      return u;
    }));
  };

  const toggleBlockUser = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const next = !u.isBlocked;
        logAction('تغییر وضعیت مسدودی', `کاربر ${u.name} ${next ? 'مسدود' : 'فعال'} شد.`);
        return { ...u, isBlocked: next };
      }
      return u;
    }));
  };

  const toggleSpecialMember = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const next = !u.isSpecialMember;
        logAction('نمایش در بخش اعضای ویژه', `عضویت ویژه ${u.name} ${next ? 'فعال' : 'غیرفعال'} شد.`);
        return { ...u, isSpecialMember: next };
      }
      return u;
    }));
  };

  // Products
  const addProduct = (prodData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'salesCount' | 'rating'>) => {
    const newProd: Product = {
      ...prodData,
      id: `prod_${Date.now()}`,
      salesCount: 0,
      rating: 5.0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setProducts(prev => [newProd, ...prev]);
    logAction('افزودن محصول جدید', `محصول ${newProd.titleFa} به سیستم اضافه شد.`);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p));
    logAction('ویرایش محصول', `مشخصات محصول شناسه ${id} ویرایش شد.`);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    logAction('حذف محصول', `محصول شناسه ${id} از سایت حذف شد.`);
  };

  // Categories
  const addCategory = (catData: Omit<Category, 'id' | 'count'>) => {
    const newCat: Category = {
      ...catData,
      id: `cat_${Date.now()}`,
      count: 0
    };
    setCategories(prev => [...prev, newCat]);
    logAction('افزودن دسته‌بندی', `دسته‌بندی ${newCat.nameFa} ایجاد شد.`);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    logAction('ویرایش دسته‌بندی', `دسته‌بندی ${id} ویرایش گردید.`);
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    logAction('حذف دسته‌بندی', `دسته‌بندی شناسه ${id} حذف شد.`);
  };

  // Sections (Page Builder)
  const addSection = (secData: Omit<DynamicSection, 'id'>) => {
    const newSec: DynamicSection = {
      ...secData,
      id: `sec_${Date.now()}`,
      order: sections.length + 1
    };
    setSections(prev => [...prev, newSec]);
    logAction('افزودن بخش به صفحه اصلی', `بخش جدید: ${newSec.titleFa} اضافه گردید.`);
  };

  const updateSection = (id: string, updates: Partial<DynamicSection>) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    logAction('ویرایش بخش صفحه اصلی', `بخش ${id} تغییر یافت.`);
  };

  const deleteSection = (id: string) => {
    setSections(prev => prev.filter(s => s.id !== id));
    logAction('حذف بخش از صفحه اصلی', `بخش شناسه ${id} حذف شد.`);
  };

  const reorderSection = (id: string, direction: 'up' | 'down') => {
    setSections(prev => {
      const idx = prev.findIndex(s => s.id === id);
      if (idx === -1) return prev;
      if (direction === 'up' && idx === 0) return prev;
      if (direction === 'down' && idx === prev.length - 1) return prev;

      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      const copy = [...prev];
      const temp = copy[idx];
      copy[idx] = copy[targetIdx];
      copy[targetIdx] = temp;

      return copy.map((item, index) => ({ ...item, order: index + 1 }));
    });
  };

  // Cart
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item => 
          item.productId === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          productId: product.id,
          productTitle: product.titleFa,
          productPrice: product.price,
          quantity,
          isDigital: product.type === 'digital',
          image: product.mainImage
        };
        return [...prev, newItem];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prev => prev.map(item => item.productId === productId ? { ...item, quantity } : item));
    }
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + (item.productPrice * item.quantity), 0);
  const cartDiscount = 0;
  const cartPayable = Math.max(0, cartTotal - cartDiscount);

  // Orders and Checkout
  const createOrder = async (shippingDetails?: any): Promise<Order> => {
    const orderNum = `EM-${Math.floor(1000 + Math.random() * 9000)}`;
    const hasDigital = cart.some(i => i.isDigital);
    const hasPhysical = cart.some(i => !i.isDigital);

    const digitalTokens = cart.filter(i => i.isDigital).map(i => ({
      productId: i.productId,
      token: `tok_${Math.random().toString(36).substring(2, 10)}_${Date.now()}`,
      expiresAt: new Date(Date.now() + 72 * 3600 * 1000).toISOString(),
      downloadCount: 0,
      maxDownloads: 5
    }));

    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber: orderNum,
      userId: currentUser?.id || 'usr_guest',
      userName: shippingDetails?.recipientName || currentUser?.name || 'کاربر مهمان',
      userEmail: currentUser?.email || 'guest@electrometal.com',
      userPhone: shippingDetails?.recipientPhone || currentUser?.phone || '۰۹۱۲۰۰۰۰۰۰۰',
      items: [...cart],
      totalAmount: cartTotal,
      discountAmount: cartDiscount,
      payableAmount: cartPayable,
      paymentStatus: 'successful',
      orderStatus: hasPhysical ? 'processing' : 'completed',
      paymentGateway: 'shaparak_zarinpal',
      transactionId: `TXN-SHP-${Math.floor(10000000 + Math.random() * 90000000)}`,
      trackingCode: `ZP-${Math.floor(1000000 + Math.random() * 9000000)}`,
      shippingAddress: hasPhysical ? shippingDetails : undefined,
      digitalDownloads: hasDigital ? digitalTokens : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    logAction('ثبت سفارش جدید', `سفارش ${newOrder.orderNumber} به مبلغ ${newOrder.payableAmount.toLocaleString('fa-IR')} تومان ثبت شد.`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, orderStatus: status, updatedAt: new Date().toISOString() } : o));
    logAction('تغییر وضعیت سفارش', `وضعیت سفارش ${orderId} به ${status} تغییر یافت.`);
  };

  const updateOrderPaymentStatus = (orderId: string, status: PaymentStatus, txnId?: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { 
      ...o, 
      paymentStatus: status, 
      transactionId: txnId || o.transactionId,
      updatedAt: new Date().toISOString() 
    } : o));
    logAction('تغییر وضعیت پرداخت', `وضعیت پرداخت سفارش ${orderId} به ${status} تغییر یافت.`);
  };

  const revokeDigitalToken = (orderId: string, productId: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId && o.digitalDownloads) {
        return {
          ...o,
          digitalDownloads: o.digitalDownloads.map(d => d.productId === productId ? { ...d, downloadCount: d.maxDownloads } : d)
        };
      }
      return o;
    }));
    logAction('لغو دسترسی دانلود', `دسترسی دانلود فایل محصول ${productId} در سفارش ${orderId} لغو شد.`);
  };

  // Support Tickets
  const createTicket = (subject: string, department: SupportTicket['department'], priority: SupportTicket['priority'], message: string) => {
    const newTicket: SupportTicket = {
      id: `tkt_${Date.now()}`,
      ticketNumber: `TKT-${Math.floor(100 + Math.random() * 900)}`,
      userId: currentUser?.id || 'usr_guest',
      userName: currentUser?.name || 'کاربر مهمان',
      userEmail: currentUser?.email || 'guest@electrometal.com',
      subject,
      department,
      priority,
      status: 'open',
      messages: [
        {
          id: `msg_${Date.now()}`,
          senderId: currentUser?.id || 'usr_guest',
          senderName: currentUser?.name || 'کاربر مهمان',
          isStaff: false,
          content: message,
          createdAt: new Date().toISOString()
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTickets(prev => [newTicket, ...prev]);
    logAction('ایجاد تیکت پشتیبانی', `تیکت ${newTicket.ticketNumber} با موضوع "${subject}" ثبت شد.`);
  };

  const replyTicket = (ticketId: string, content: string) => {
    const isStaff = isAdminAuthenticated || currentUser?.role === 'owner' || currentUser?.role === 'admin' || currentUser?.role === 'support';
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        const newMsg = {
          id: `msg_${Date.now()}`,
          senderId: currentUser?.id || 'usr_unknown',
          senderName: currentUser?.name || 'پشتیبانی',
          isStaff,
          content,
          createdAt: new Date().toISOString()
        };
        return {
          ...t,
          status: isStaff ? 'answered' : 'pending',
          messages: [...t.messages, newMsg],
          updatedAt: new Date().toISOString()
        };
      }
      return t;
    }));
    logAction('ارسال پاسخ تیکت', `پاسخ به تیکت ${ticketId} ارسال گردید.`);
  };

  const updateTicketStatus = (ticketId: string, status: SupportTicket['status']) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status, updatedAt: new Date().toISOString() } : t));
    logAction('تغییر وضعیت تیکت', `وضعیت تیکت ${ticketId} به ${status} تغییر یافت.`);
  };

  // Direct Messaging
  const sendMessage = (receiverId: string, content: string, attachment?: { url: string; name: string }) => {
    const receiver = users.find(u => u.id === receiverId);
    const newMsg: DirectMessage = {
      id: `dm_${Date.now()}`,
      senderId: currentUser?.id || 'usr_guest',
      senderName: currentUser?.name || 'کاربر',
      receiverId,
      receiverName: receiver?.name || 'کاربر',
      content,
      attachmentUrl: attachment?.url,
      attachmentName: attachment?.name,
      isRead: false,
      createdAt: new Date().toISOString()
    };
    setDirectMessages(prev => [...prev, newMsg]);
  };

  const markMessagesAsRead = (senderId: string) => {
    setDirectMessages(prev => prev.map(m => 
      m.senderId === senderId && m.receiverId === currentUser?.id 
        ? { ...m, isRead: true } 
        : m
    ));
  };

  // Announcements
  const addAnnouncement = (annData: Omit<Announcement, 'id' | 'publishedAt'>) => {
    const newAnn: Announcement = {
      ...annData,
      id: `ann_${Date.now()}`,
      publishedAt: new Date().toISOString()
    };
    setAnnouncements(prev => [newAnn, ...prev]);
    logAction('انتشار خبر/اطلاعیه', `اطلاعیه "${newAnn.title}" منتشر شد.`);
  };

  const updateAnnouncement = (id: string, updates: Partial<Announcement>) => {
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    logAction('ویرایش اطلاعیه', `اطلاعیه شناسه ${id} ویرایش شد.`);
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
    logAction('حذف اطلاعیه', `اطلاعیه شناسه ${id} حذف گردید.`);
  };

  // Ads
  const addAdvertisement = (adData: Omit<Advertisement, 'id' | 'impressions' | 'clicks'>) => {
    const newAd: Advertisement = {
      ...adData,
      id: `ad_${Date.now()}`,
      impressions: 0,
      clicks: 0
    };
    setAdvertisements(prev => [...prev, newAd]);
    logAction('افزودن بنر تبلیغاتی', `تبلیغ جدید: "${newAd.title}" اضافه شد.`);
  };

  const updateAdvertisement = (id: string, updates: Partial<Advertisement>) => {
    setAdvertisements(prev => prev.map(ad => ad.id === id ? { ...ad, ...updates } : ad));
    logAction('ویرایش تبلیغ', `تبلیغ ${id} ویرایش گردید.`);
  };

  const deleteAdvertisement = (id: string) => {
    setAdvertisements(prev => prev.filter(ad => ad.id !== id));
    logAction('حذف تبلیغ', `تبلیغ ${id} حذف شد.`);
  };

  const trackAdClick = (adId: string) => {
    setAdvertisements(prev => prev.map(ad => ad.id === adId ? { ...ad, clicks: ad.clicks + 1 } : ad));
  };

  // File Manager
  const uploadFile = (fileData: Omit<ManagedFile, 'id' | 'uploadedAt'>) => {
    const newFile: ManagedFile = {
      ...fileData,
      id: `fl_${Date.now()}`,
      uploadedAt: new Date().toISOString()
    };
    setManagedFiles(prev => [newFile, ...prev]);
    logAction('آپلود فایل', `فایل ${newFile.name} در پوشه ${newFile.folder} آپلود شد.`);
  };

  const deleteFile = (id: string) => {
    setManagedFiles(prev => prev.filter(f => f.id !== id));
    logAction('حذف فایل', `فایل با شناسه ${id} حذف شد.`);
  };

  const renameFile = (id: string, newName: string) => {
    setManagedFiles(prev => prev.map(f => f.id === id ? { ...f, name: newName } : f));
    logAction('تغییر نام فایل', `نام فایل ${id} به ${newName} تغییر یافت.`);
  };

  // Backup & Restore
  const exportBackup = () => {
    const backupData = {
      exportedAt: new Date().toISOString(),
      siteSettings,
      users,
      products,
      categories,
      sections,
      orders,
      tickets,
      announcements,
      advertisements,
      managedFiles,
      auditLogs
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ElectroMetal_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    logAction('پشتیبان‌گیری از دیتابیس', 'فایل کامل دیتابیس دانلود شد.');
  };

  const importBackup = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.siteSettings) setSiteSettings(parsed.siteSettings);
      if (parsed.users) setUsers(parsed.users);
      if (parsed.products) setProducts(parsed.products);
      if (parsed.categories) setCategories(parsed.categories);
      if (parsed.sections) setSections(parsed.sections);
      if (parsed.orders) setOrders(parsed.orders);
      if (parsed.tickets) setTickets(parsed.tickets);
      if (parsed.announcements) setAnnouncements(parsed.announcements);
      if (parsed.advertisements) setAdvertisements(parsed.advertisements);
      if (parsed.managedFiles) setManagedFiles(parsed.managedFiles);
      logAction('بازیابی نسخه پشتیبان', 'داده‌های دیتابیس از فایل بک‌آپ با موفقیت بارگذاری گردید.');
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const resetToFactoryDefaults = () => {
    setSiteSettings(initialSiteSettings);
    setUsers(initialUsers);
    setProducts(initialProducts);
    setCategories(initialCategories);
    setSections(initialDynamicSections);
    setOrders(initialOrders);
    setTickets(initialTickets);
    setDirectMessages(initialDirectMessages);
    setAnnouncements(initialAnnouncements);
    setAdvertisements(initialAdvertisements);
    setManagedFiles(initialManagedFiles);
    setAuditLogs(initialAuditLogs);
    setCart([]);
    destroyAdminSession();
    setAdminSession(null);
    setCurrentUser(null);
    logAction('بازنشانی به تنظیمات کارخانه', 'کلیه اطلاعات سایت به داده‌های اولیه بازگشت.');
  };

  return (
    <AppContext.Provider value={{
      siteSettings,
      updateSiteSettings,
      currentUser,
      setCurrentUser,
      adminSession,
      isAdminAuthenticated,
      loginAdmin,
      logoutAdmin,
      loginUser,
      registerUser,
      logoutUser,
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
      createOrder,
      updateOrderStatus,
      updateOrderPaymentStatus,
      revokeDigitalToken,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      cartTotal,
      cartDiscount,
      cartPayable,
      tickets,
      createTicket,
      replyTicket,
      updateTicketStatus,
      directMessages,
      sendMessage,
      markMessagesAsRead,
      announcements,
      addAnnouncement,
      updateAnnouncement,
      deleteAnnouncement,
      advertisements,
      addAdvertisement,
      updateAdvertisement,
      deleteAdvertisement,
      trackAdClick,
      managedFiles,
      uploadFile,
      deleteFile,
      renameFile,
      auditLogs,
      logAction,
      theme,
      toggleTheme,
      exportBackup,
      importBackup,
      resetToFactoryDefaults
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
