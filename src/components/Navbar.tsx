import React, { useState } from 'react';
import { ShoppingBag, Search, Phone, Shield, X, Menu } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenOrderTrack: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  searchQuery,
  onSearchChange,
  onOpenOrderTrack,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {/* Slim Top Hotline Announcement Bar */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="font-medium text-amber-300">হটলাইন:</span>
            <a href="tel:01799001122" className="hover:underline font-mono tracking-wider">
              ০১৭৯৯-০০১১২২
            </a>
            <span className="text-emerald-500 hidden sm:inline">|</span>
            <span className="hidden sm:inline text-emerald-200">
              সারা বাংলাদেশে ক্যাশ অন ডেলিভারি (পণ্য পেয়ে মূল্য পরিশোধ)
            </span>
          </div>
          <div className="flex items-center gap-4 shrink-0 text-xs">
            <button
              onClick={onOpenOrderTrack}
              className="text-emerald-200 hover:text-white transition-colors cursor-pointer"
            >
              অর্ডার ট্র্যাক করুন
            </button>
            <span className="text-emerald-600 hidden md:inline">|</span>
            <button
              onClick={onOpenAdmin}
              className="text-emerald-300 hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
              title="এডমিন প্যানেল (#admin)"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>এডমিন</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Header - 3-Zone Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-950/10 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 lg:gap-8">
          
          {/* Zone 1: Single Brand Wordmark */}
          <a href="#" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center text-amber-300 shadow-sm shadow-emerald-900/20 group-hover:scale-105 transition-transform">
              <i className="fa-solid fa-leaf text-lg"></i>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-emerald-950 leading-tight">
                ঘরের বাজার
              </span>
              <span className="text-[10px] uppercase tracking-wider text-emerald-700 font-medium -mt-0.5">
                Ghorer Bazar · 100% Organic
              </span>
            </div>
          </a>

          {/* Zone 2: Search Bar + Nav Links */}
          <div className="hidden lg:flex items-center flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="খাঁটি সরিষার তেল, সুন্দরবনের মধু, গাওয়া ঘি খুঁজুন..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-1 focus:ring-emerald-600 transition-all text-slate-800 placeholder-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-700 whitespace-nowrap">
            <a href="#products" className="hover:text-emerald-800 transition-colors">পণ্যসমূহ</a>
            <a href="#why-us" className="hover:text-emerald-800 transition-colors">কেন আমরা?</a>
            <a href="#reviews" className="hover:text-emerald-800 transition-colors">গ্রাহক রিভিউ</a>
            <a href="#contact" className="hover:text-emerald-800 transition-colors">যোগাযোগ</a>
          </nav>

          {/* Zone 3: 1 Primary Action (Cart Drawer Trigger) & Mobile Nav Toggles */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-emerald-800 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Direct Call Quick Link */}
            <a
              href="tel:01799001122"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-900 bg-emerald-50 rounded-lg hover:bg-emerald-100 border border-emerald-200/60 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>০১৭৯৯-০০১১২২</span>
            </a>

            {/* Primary Action: Shopping Cart Button with Dynamic Badge */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-medium text-sm transition-all shadow-xs active:scale-95 cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">কার্ট</span>
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-emerald-950 bg-amber-400 rounded-full font-mono">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-700 hover:text-emerald-900 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Dropdown Bar */}
        {searchOpen && (
          <div className="lg:hidden px-4 pb-3 pt-1 border-t border-slate-100 bg-white">
            <div className="relative">
              <input
                type="text"
                placeholder="পণ্য খুঁজুন (যেমন: তেল, মধু, ঘি)..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                autoFocus
                className="w-full pl-10 pr-8 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600 focus:bg-white text-slate-800"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-3">
            <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
              <a
                href="#products"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-900 transition-colors"
              >
                পণ্যসমূহ (Products)
              </a>
              <a
                href="#why-us"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-900 transition-colors"
              >
                কেন আমরা? (Why Choose Us)
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-900 transition-colors"
              >
                গ্রাহক রিভিউ (Reviews)
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-900 transition-colors"
              >
                যোগাযোগ (Contact)
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrderTrack();
                }}
                className="text-left px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-900 transition-colors"
              >
                অর্ডার ট্র্যাক করুন
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="text-left px-3 py-2 text-emerald-800 font-semibold rounded-lg bg-emerald-50/80 hover:bg-emerald-100 transition-colors flex items-center justify-between"
              >
                <span>এডমিন ড্যাশবোর্ড (#admin)</span>
                <Shield className="w-4 h-4" />
              </button>
            </nav>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>জরুরি অর্ডার হটলাইন:</span>
              <a href="tel:01799001122" className="font-semibold text-emerald-800">
                ০১৭৯৯-০০১১২২
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
