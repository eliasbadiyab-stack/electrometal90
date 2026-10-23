export type UserRole = 
  | 'owner' 
  | 'super_admin' 
  | 'admin' 
  | 'product_manager' 
  | 'editor' 
  | 'support' 
  | 'moderator' 
  | 'user';

export type UserPermission = 
  | 'manage_settings'
  | 'manage_products'
  | 'manage_files'
  | 'manage_orders'
  | 'manage_users'
  | 'manage_tickets'
  | 'manage_messages'
  | 'manage_ads'
  | 'manage_news'
  | 'view_audit_logs'
  | 'export_backup';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  isVerified: boolean; // تیک آبی
  isSpecialMember: boolean; // نمایش در بخش کاربران ویژه/تیم
  specialTitle?: string; // e.g. "مدیر ارشد طراحی سخت‌افزار"
  isBlocked: boolean;
  avatarUrl?: string;
  createdAt: string;
  lastLoginAt: string;
  ordersCount: number;
}

export type ProductType = 'digital' | 'physical';

export interface DigitalFileDetails {
  fileName: string;
  fileExtension: string; // e.g. 'ZIP', 'PDF', 'HEX', 'BIN', 'INO', 'GERBER', 'PRJ', 'PDS', 'MP3'
  fileSize: string;
  downloadUrl?: string;
  downloadLimit: number;
  expiryHours: number;
  checksum?: string;
}

export interface PhysicalDetails {
  weightGrams?: number;
  dimensionsCm?: string;
  packageContents?: string;
}

export interface Product {
  id: string;
  sku: string;
  title: string;
  titleFa: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number; // in Tomans or Rials
  previousPrice?: number;
  discountPercent?: number;
  stock: number;
  type: ProductType;
  categoryId: string;
  sectionId?: string;
  tags: string[];
  mainImage: string;
  gallery: string[];
  videoUrl?: string;
  digitalFile?: DigitalFileDetails;
  physicalSpecs?: PhysicalDetails;
  technicalSpecs: Record<string, string>; // e.g. "میکروکنترلر": "STM32H753XI", "لایه برد": "4 Layer"
  isFeatured: boolean;
  isRecommended: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  isPublished: boolean;
  salesCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  nameFa: string;
  slug: string;
  iconName: string;
  description: string;
  count: number;
}

export type SectionContentType = 
  | 'electronics' 
  | 'digital_files' 
  | 'physical_products' 
  | 'music_beats' 
  | 'books' 
  | 'projects' 
  | 'tutorials' 
  | 'news' 
  | 'ads';

export interface DynamicSection {
  id: string;
  name: string;
  titleFa: string;
  subtitleFa: string;
  iconName: string;
  imageUrl?: string;
  contentType: SectionContentType;
  order: number;
  isActive: boolean;
  isPublic: boolean;
  isPurchasable: boolean;
  description: string;
  productIds?: string[];
}

export interface OrderItem {
  productId: string;
  productTitle: string;
  productPrice: number;
  quantity: number;
  isDigital: boolean;
  digitalToken?: string;
  image: string;
}

export type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'completed' | 'cancelled' | 'refunded';
export type PaymentStatus = 'pending' | 'successful' | 'failed' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  items: OrderItem[];
  totalAmount: number;
  discountAmount: number;
  payableAmount: number;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  paymentGateway: 'shaparak_zarinpal' | 'idpay' | 'mellat';
  transactionId?: string;
  trackingCode?: string;
  shippingAddress?: {
    province: string;
    city: string;
    address: string;
    postalCode: string;
    recipientName: string;
    recipientPhone: string;
  };
  digitalDownloads?: {
    productId: string;
    token: string;
    expiresAt: string;
    downloadCount: number;
    maxDownloads: number;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  department: 'technical' | 'orders' | 'downloads' | 'suggestions';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status: 'open' | 'pending' | 'answered' | 'closed';
  messages: {
    id: string;
    senderId: string;
    senderName: string;
    isStaff: boolean;
    content: string;
    attachmentUrl?: string;
    attachmentName?: string;
    createdAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface DirectMessage {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  content: string;
  attachmentUrl?: string;
  attachmentName?: string;
  isRead: boolean;
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  summary: string;
  content: string;
  thumbnail: string;
  youtubeUrl?: string;
  telegramUrl?: string;
  externalUrl?: string;
  isPublished: boolean;
  publishedAt: string;
}

export type AdPlacement = 'homepage' | 'header' | 'sidebar' | 'product_page' | 'between_products' | 'footer';

export interface Advertisement {
  id: string;
  title: string;
  imageUrl: string;
  destinationUrl: string;
  placement: AdPlacement;
  startDate: string;
  endDate: string;
  isActive: boolean;
  impressions: number;
  clicks: number;
}

export interface ManagedFile {
  id: string;
  name: string;
  folder: string;
  sizeBytes: number;
  type: string;
  url: string;
  isDigitalProductFile: boolean;
  uploadedAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface SiteSettings {
  siteName: string;
  brandName: string;
  brandNameFa: string;
  siteTitle: string;
  siteDescription: string;
  creatorName: string;
  creatorEmail: string;
  phone: string;
  storeAddress: string;
  email: string;
  copyrightText: string;
  aboutText: string;
  logoUrl: string;
  mobileLogoUrl: string;
  faviconUrl: string;
  footerLogoUrl: string;
  socialLinks: {
    youtube: string;
    telegram: string;
    instagram: string;
    github: string;
    linkedin?: string;
  };
  theme: {
    defaultMode: 'dark' | 'light';
    accentColor: 'cyan' | 'amber' | 'emerald' | 'blue' | 'purple';
    fontFamily: string;
  };
  features: {
    messagingEnabled: boolean;
    supportTicketsEnabled: boolean;
    userRegistrationEnabled: boolean;
    googleLoginEnabled: boolean;
    adsEnabled: boolean;
    newsEnabled: boolean;
    digitalDownloadsEnabled: boolean;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    ogImage: string;
  };
  paymentGateway: {
    gatewayProvider: 'zarinpal' | 'idpay' | 'shaparak';
    merchantId: string;
    sandboxMode: boolean;
  };
}
