/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Hero } from './components/home/Hero';
import { DynamicSectionRenderer } from './components/home/DynamicSectionRenderer';
import { SpecialMembersShowcase } from './components/home/SpecialMembersShowcase';
import { AboutSection } from './components/home/AboutSection';
import { Footer } from './components/layout/Footer';
import { ProductCard } from './components/products/ProductCard';
import { ProductDetailModal } from './components/products/ProductDetailModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { UserDashboardModal } from './components/user/UserDashboardModal';
import { AdminPanel } from './components/admin/AdminPanel';
import { AdminAuthModal } from './components/auth/AdminAuthModal';
import { UserAuthModal } from './components/auth/UserAuthModal';
import { SupportTicketsModal } from './components/support/SupportTicketsModal';
import { MessengerModal } from './components/messenger/MessengerModal';
import { Product, Order } from './types';
import { Search, X, Sparkles } from 'lucide-react';

const MainApp: React.FC = () => {
  const { products, siteSettings, advertisements, trackAdClick, isAdminAuthenticated } = useApp();

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isUserDashboardOpen, setIsUserDashboardOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [isUserAuthOpen, setIsUserAuthOpen] = useState(false);
  const [isTicketsOpen, setIsTicketsOpen] = useState(false);
  const [isMessengerOpen, setIsMessengerOpen] = useState(false);
  const [messengerTargetUserId, setMessengerTargetUserId] = useState<string | null>(null);

  // Top dismissible promotion banner (compliant with promotional surface governance)
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const topAd = advertisements.find(a => a.placement === 'homepage' && a.isActive);

  // Filter products if search active
  const isSearching = searchQuery.trim().length > 0;
  const searchResults = isSearching 
    ? products.filter(p => 
        p.isPublished && (
          p.titleFa.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      )
    : [];

  const handleInstantBuy = (product: Product) => {
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleOpenDirectMessage = (userId: string) => {
    setMessengerTargetUserId(userId);
    setIsMessengerOpen(true);
  };

  const handleScrollToFeatured = () => {
    const el = document.getElementById('sec_electronics_featured');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAdmin = () => {
    if (isAdminAuthenticated) {
      setIsAdminOpen(true);
    } else {
      setIsAdminAuthOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Top Banner (Optional, governed by 15% mobile sticky cap & dismissible) */}
      {!bannerDismissed && topAd && (
        <div 
          onClick={() => trackAdClick(topAd.id)}
          className="relative bg-gradient-to-r from-cyan-950 via-slate-900 to-cyan-950 border-b border-cyan-500/20 px-4 py-2 text-center text-xs text-cyan-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
          <span className="font-semibold">{topAd.title}</span>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">پروژه‌های مهندسی پیشرفته با مدیریت الیاس بادیاب</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setBannerDismissed(true);
            }}
            className="absolute left-3 text-slate-400 hover:text-white"
            aria-label="Dismiss banner"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Header */}
      <Header
        onOpenCart={() => setIsCartOpen(true)}
        onOpenUserDashboard={() => setIsUserDashboardOpen(true)}
        onOpenAdmin={handleOpenAdmin}
        onOpenAdminAuth={() => setIsAdminAuthOpen(true)}
        onOpenUserAuth={() => setIsUserAuthOpen(true)}
        onOpenMessenger={() => {
          setMessengerTargetUserId(null);
          setIsMessengerOpen(true);
        }}
        onOpenTickets={() => setIsTicketsOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1">
        {/* Search Results Mode */}
        {isSearching ? (
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">
                  نتایج جستجو برای: <span className="text-cyan-400 font-mono">"{searchQuery}"</span>
                </h2>
                <span className="text-xs text-slate-400">{searchResults.length} محصول یافت شد</span>
              </div>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-400 hover:text-white"
              >
                پاک کردن جستجو
              </button>
            </div>

            {searchResults.length === 0 ? (
              <div className="py-24 text-center text-xs text-slate-500">
                موردی با این عبارت یافت نشد. می‌توانید با کلمات کلیدی دیگری مانند STM32، آلتیوم، گربر یا کتاب جستجو کنید.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map(p => (
                  <ProductCard key={p.id} product={p} onSelect={setSelectedProduct} />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Normal Dynamic Storefront Mode */
          <>
            <Hero onExploreClick={handleScrollToFeatured} />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {/* Dynamic Sections (Electronics, Files, Hardware, Books, Beats, News) */}
              <DynamicSectionRenderer onSelectProduct={setSelectedProduct} />

              {/* Verified Team / Special Members Showcase */}
              <SpecialMembersShowcase onDirectMessage={handleOpenDirectMessage} />

              {/* About Brand & Creator */}
              <AboutSection />
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onInstantBuy={handleInstantBuy}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onProceedCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={(order: Order) => {
          // Keep checkout open on success step
        }}
      />

      <UserDashboardModal
        isOpen={isUserDashboardOpen}
        onClose={() => setIsUserDashboardOpen(false)}
        onOpenNewTicket={() => {
          setIsUserDashboardOpen(false);
          setIsTicketsOpen(true);
        }}
      />

      {/* Secure Admin Portal & Auth */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      <AdminAuthModal
        isOpen={isAdminAuthOpen}
        onClose={() => setIsAdminAuthOpen(false)}
        onSuccess={() => {
          setIsAdminAuthOpen(false);
          setIsAdminOpen(true);
        }}
      />

      {/* Public Customer Authentication */}
      <UserAuthModal
        isOpen={isUserAuthOpen}
        onClose={() => setIsUserAuthOpen(false)}
        onSuccess={() => {
          setIsUserAuthOpen(false);
        }}
      />

      <SupportTicketsModal
        isOpen={isTicketsOpen}
        onClose={() => setIsTicketsOpen(false)}
      />

      <MessengerModal
        isOpen={isMessengerOpen}
        onClose={() => setIsMessengerOpen(false)}
        targetUserId={messengerTargetUserId}
      />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
