/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Product, CartItem, Order } from './types';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS, INITIAL_ORDERS } from './initialData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBadges } from './components/TrustBadges';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { OrderTrackModal } from './components/OrderTrackModal';
import { ReviewsSection } from './components/ReviewsSection';
import { StorySection } from './components/StorySection';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { toBengaliNumber } from './utils/format';
import { CheckCircle2, ShoppingBag, Sparkles, SlidersHorizontal, ArrowDown } from 'lucide-react';

export default function App() {
  // Products State with localStorage persistence
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('ghorer_bazar_products');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PRODUCTS;
  });

  // Orders State with localStorage persistence
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('ghorer_bazar_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_ORDERS;
  });

  // Cart State with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ghorer_bazar_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Delivery zone in cart & checkout
  const [deliveryZone, setDeliveryZone] = useState<'inside_dhaka' | 'outside_dhaka'>('inside_dhaka');

  // Filter and Search states
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Panels
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isOrderTrackOpen, setIsOrderTrackOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Sync products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ghorer_bazar_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ghorer_bazar_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ghorer_bazar_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Check URL hash for #admin routing
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };

    if (window.location.hash === '#admin') {
      setIsAdminOpen(true);
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openAdmin = () => {
    window.location.hash = 'admin';
    setIsAdminOpen(true);
  };

  const closeAdmin = () => {
    if (window.location.hash === '#admin') {
      window.history.replaceState(null, '', window.location.pathname);
    }
    setIsAdminOpen(false);
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`"${product.nameBn}" কার্টে যোগ করা হয়েছে`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('পণ্যটি কার্ট থেকে সরানো হয়েছে');
  };

  const handleBuyNow = (product: Product, quantity = 1) => {
    // Add to cart and directly launch checkout
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCheckoutOpen(true);
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setConfirmedOrder(newOrder);
    setCart([]);
    setIsCheckoutOpen(false);
    setIsOrderSuccessOpen(true);
    showToast(`ধন্যবাদ! অর্ডার #${newOrder.id} সফলভাবে সম্পন্ন হয়েছে`);
  };

  // Admin Product CRUD handlers
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`নতুন পণ্য "${newProduct.nameBn}" যোগ করা হয়েছে`);
  };

  const handleUpdateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`পণ্য "${updated.nameBn}" সফলভাবে আপডেট করা হয়েছে`);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('পণ্যটি মুছে ফেলা হয়েছে');
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
    showToast(`অর্ডার #${orderId} এর স্ট্যাটাস আপডেট করা হয়েছে`);
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    showToast('অর্ডারটি তালিকা থেকে মুছে ফেলা হয়েছে');
  };

  const handleResetData = () => {
    if (window.confirm('আপনি কি নিশ্চিত যে ডেমো পণ্য ও ডেটা রিস্টোর করতে চান?')) {
      setProducts(INITIAL_PRODUCTS);
      setOrders(INITIAL_ORDERS);
      localStorage.removeItem('ghorer_bazar_products');
      localStorage.removeItem('ghorer_bazar_orders');
      showToast('সকল ডেটা সফলভাবে রিস্টোর করা হয়েছে');
    }
  };

  // Filtered Products for landing page
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const cleanSearch = searchQuery.trim().toLowerCase();
      const matchSearch =
        cleanSearch === '' ||
        p.nameBn.toLowerCase().includes(cleanSearch) ||
        p.nameEn.toLowerCase().includes(cleanSearch) ||
        p.description.toLowerCase().includes(cleanSearch);
      return matchCategory && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/20 text-slate-800 antialiased selection:bg-emerald-800 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-950 text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-xl shadow-xl border border-emerald-800 flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Navigation */}
      <Navbar
        cartCount={cartTotalItems}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenOrderTrack={() => setIsOrderTrackOpen(true)}
        onOpenAdmin={openAdmin}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero onScrollToProducts={scrollToProducts} />

        {/* Trust Badges */}
        <TrustBadges />

        {/* Product Catalog Section */}
        <section id="products" className="py-12 sm:py-16 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            
            {/* Catalog Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>আমাদের পণ্যসম্ভার</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                  জনপ্রিয় খাঁটি ও অর্গানিক খাদ্যপণ্য
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  সরাসরি মাঠ ও ঐতিহ্যবাহী প্রস্তুতকারক থেকে সংগৃহীত। প্রতিটি পণ্যে রয়েছে আসল স্বাদ ও পুষ্টির প্রতিশ্রুতি।
                </p>
              </div>

              {/* Category Filter Tabs (Zero-Pill: Clean segmented control buttons) */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
                {[
                  { key: 'all', label: 'সব পণ্য' },
                  { key: 'oil-ghee', label: 'তেল ও ঘি' },
                  { key: 'honey', label: 'প্রাকৃতিক মধু' },
                  { key: 'sweets', label: 'গুড় ও খেজুর' },
                  { key: 'nuts-spices', label: 'বাদাম ও মসলা' },
                ].map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategory === cat.key
                        ? 'bg-emerald-800 text-white shadow-xs'
                        : 'bg-white text-slate-600 hover:text-emerald-900 hover:bg-emerald-50 border border-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search feedback when searching */}
            {searchQuery && (
              <div className="flex items-center justify-between text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
                <span>
                  খুঁজছেন: <strong className="text-slate-900">"{searchQuery}"</strong> (পাওয়া গেছে{' '}
                  <span className="font-mono font-bold text-emerald-800">
                    {toBengaliNumber(filteredProducts.length)}
                  </span>{' '}
                  টি পণ্য)
                </span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-emerald-800 underline font-semibold cursor-pointer"
                >
                  সার্চ ক্লিয়ার করুন
                </button>
              </div>
            )}

            {/* Products Grid: 4 columns desktop, 2 columns mobile */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onAddToCart={(p) => handleAddToCart(p, 1)}
                    onBuyNow={(p) => handleBuyNow(p, 1)}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">কোনো পণ্য খুঁজে পাওয়া যায়নি</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  আপনার সার্চ ফিল্টার পরিবর্তন করুন অথবা সব পণ্য তালিকা দেখতে ফিল্টার রিসেট করুন।
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-emerald-800 text-white rounded-lg text-xs font-semibold hover:bg-emerald-900 transition-colors"
                >
                  সব পণ্য দেখুন
                </button>
              </div>
            )}

          </div>
        </section>

        {/* Sourcing Story / Why Us Section */}
        <StorySection />

        {/* Customer Reviews Section */}
        <ReviewsSection reviews={INITIAL_REVIEWS} />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={openAdmin}
        onOpenOrderTrack={() => setIsOrderTrackOpen(true)}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedCheckout={handleProceedCheckout}
        deliveryZone={deliveryZone}
        onChangeDeliveryZone={setDeliveryZone}
      />

      {/* Checkout Modal Form */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        deliveryZone={deliveryZone}
        onChangeDeliveryZone={setDeliveryZone}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Confirmed Success Modal */}
      <OrderSuccessModal
        order={confirmedOrder}
        onClose={() => setIsOrderSuccessOpen(false)}
      />

      {/* Product Quick View / Detail Modal */}
      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, q) => handleAddToCart(p, q)}
        onBuyNow={(p, q) => handleBuyNow(p, q)}
      />

      {/* Customer Order Tracking Modal */}
      <OrderTrackModal
        isOpen={isOrderTrackOpen}
        onClose={() => setIsOrderTrackOpen(false)}
        orders={orders}
      />

      {/* Protected Admin Panel (#admin) */}
      {isAdminOpen && (
        <AdminPanel
          products={products}
          orders={orders}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onDeleteOrder={handleDeleteOrder}
          onResetData={handleResetData}
          onClose={closeAdmin}
        />
      )}

    </div>
  );
}
