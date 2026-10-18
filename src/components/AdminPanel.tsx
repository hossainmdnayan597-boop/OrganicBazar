import React, { useState } from 'react';
import { Product, Order } from '../types';
import { formatPrice, toBengaliNumber } from '../utils/format';
import {
  Shield,
  Lock,
  Plus,
  Trash2,
  Edit3,
  Package,
  ShoppingBag,
  DollarSign,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Truck,
  X,
  Search,
  RefreshCw,
  LogOut,
  Phone,
  Eye,
  Download,
} from 'lucide-react';

interface AdminPanelProps {
  products: Product[];
  orders: Order[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onDeleteOrder: (orderId: string) => void;
  onResetData: () => void;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  products,
  orders,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onDeleteOrder,
  onResetData,
  onClose,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('ghorer_bazar_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'analytics'>('orders');

  // Modal states for Product Add / Edit
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Filter states
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');

  // Selected Order Detail View
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Form state for Product creation / editing
  const [formNameBn, setFormNameBn] = useState('');
  const [formNameEn, setFormNameEn] = useState('');
  const [formCategory, setFormCategory] = useState<Product['category']>('oil-ghee');
  const [formPrice, setFormPrice] = useState<number>(350);
  const [formOriginalPrice, setFormOriginalPrice] = useState<number>(400);
  const [formWeight, setFormWeight] = useState('১ লিটার বোতল');
  const [formImage, setFormImage] = useState('/src/assets/images/product_mustard_oil_1792295614739.jpg');
  const [formStock, setFormStock] = useState<number>(50);
  const [formDescription, setFormDescription] = useState('');
  const [formFeatures, setFormFeatures] = useState('');

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    // Master pass codes: admin123 or 123456
    const clean = passwordInput.trim();
    if (clean === 'admin123' || clean === '123456' || clean === 'ghorerbazar') {
      setIsAuthenticated(true);
      sessionStorage.setItem('ghorer_bazar_admin_auth', 'true');
    } else {
      setAuthError('ভুল পাসওয়ার্ড! ডিফল্ট পাসওয়ার্ড: admin123 অথবা 123456 ব্যবহার করুন।');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('ghorer_bazar_admin_auth');
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormNameBn('');
    setFormNameEn('');
    setFormCategory('oil-ghee');
    setFormPrice(400);
    setFormOriginalPrice(450);
    setFormWeight('১ কেজি প্যাক');
    setFormImage('/src/assets/images/product_sundarban_honey_1792295615079.jpg');
    setFormStock(30);
    setFormDescription('১০০% খাঁটি ও প্রাকৃতিক উপাদান থেকে প্রস্তুতকৃত স্বাস্থ্যসম্মত খাদ্যপণ্য।');
    setFormFeatures('প্রাকৃতিক ও রাসায়নিকমুক্ত, সরাসরি উৎপাদনকারী থেকে সংগৃহীত');
    setIsProductModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormNameBn(p.nameBn);
    setFormNameEn(p.nameEn);
    setFormCategory(p.category);
    setFormPrice(p.price);
    setFormOriginalPrice(p.originalPrice);
    setFormWeight(p.weight);
    setFormImage(p.image);
    setFormStock(p.stockQuantity);
    setFormDescription(p.description);
    setFormFeatures(p.features.join(', '));
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const featArray = formFeatures
      .split(',')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    if (editingProduct) {
      // Update
      const updated: Product = {
        ...editingProduct,
        nameBn: formNameBn.trim(),
        nameEn: formNameEn.trim() || formNameBn.trim(),
        category: formCategory,
        price: Number(formPrice),
        originalPrice: Number(formOriginalPrice) || Number(formPrice),
        weight: formWeight.trim(),
        image: formImage.trim(),
        stockQuantity: Number(formStock),
        inStock: Number(formStock) > 0,
        description: formDescription.trim(),
        features: featArray.length > 0 ? featArray : ['১০০% খাঁটি ও অর্গানিক'],
      };
      onUpdateProduct(updated);
    } else {
      // Create New
      const newProduct: Product = {
        id: `gb-${Date.now().toString().slice(-4)}`,
        nameBn: formNameBn.trim(),
        nameEn: formNameEn.trim() || 'Organic Food',
        category: formCategory,
        price: Number(formPrice),
        originalPrice: Number(formOriginalPrice) || Number(formPrice),
        weight: formWeight.trim(),
        image: formImage.trim() || '/src/assets/images/product_mustard_oil_1792295614739.jpg',
        rating: 5.0,
        reviewsCount: 1,
        inStock: Number(formStock) > 0,
        stockQuantity: Number(formStock),
        description: formDescription.trim(),
        features: featArray.length > 0 ? featArray : ['১০০% খাঁটি ও অর্গানিক'],
        isFeatured: false,
      };
      onAddProduct(newProduct);
    }

    setIsProductModalOpen(false);
  };

  // Export orders as CSV
  const exportOrdersCSV = () => {
    const headers = ['Order ID', 'Customer Name', 'Phone', 'Address', 'Total', 'Payment', 'Status', 'Date'];
    const rows = orders.map((o) => [
      o.id,
      `"${o.customerName}"`,
      `"${o.phone}"`,
      `"${o.address.replace(/"/g, '""')}"`,
      o.total,
      o.paymentMethod,
      o.status,
      o.createdAt,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ghorer_bazar_orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculations for Analytics
  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;
  const lowStockCount = products.filter((p) => p.stockQuantity < 15).length;

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    const matchesStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
    const matchesSearch =
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.phone.includes(orderSearch);
    return matchesStatus && matchesSearch;
  });

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    return (
      p.nameBn.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.nameEn.toLowerCase().includes(productSearch.toLowerCase())
    );
  });

  // If Not Authenticated -> Show Password Login Gate
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="bg-emerald-950 text-white p-6 text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-emerald-800 text-amber-300 flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold">এডমিন প্যানেল লগইন</h2>
            <p className="text-xs text-emerald-200">
              ঘরের বাজার ড্যাশবোর্ড ও ইনভেন্টরি ম্যানেজমেন্ট
            </p>
          </div>

          <form onSubmit={handleLogin} className="p-6 space-y-4">
            {authError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs font-semibold text-red-700">
                {authError}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                এডমিন সিক্রেট পাসওয়ার্ড লিখুন:
              </label>
              <input
                type="password"
                placeholder="পাসওয়ার্ড লিখুন..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                autoFocus
                required
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700 focus:bg-white text-slate-900"
              />
              <p className="text-[11px] text-slate-500">
                পাসওয়ার্ড: <span className="font-mono font-bold text-emerald-800">admin123</span> বা <span className="font-mono font-bold text-emerald-800">123456</span>
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-2.5 border border-slate-300 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 transition-colors cursor-pointer"
              >
                বাতিল করুন
              </button>
              <button
                type="submit"
                className="w-1/2 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                প্রবেশ করুন
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="fixed inset-0 z-50 bg-slate-100 overflow-y-auto flex flex-col font-['Hind_Siliguri','Plus_Jakarta_Sans',sans-serif]">
      
      {/* Admin Top Navigation Bar */}
      <header className="bg-emerald-950 text-white border-b border-emerald-900 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-emerald-200 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium"
              title="দোকানে ফিরে যান"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">দোকানে ফিরে যান</span>
            </button>
            
            <div className="h-4 w-px bg-emerald-800 hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-400 text-emerald-950 flex items-center justify-center font-bold text-xs">
                GB
              </span>
              <h1 className="text-base sm:text-lg font-bold">এডমিন কন্ট্রোল সেন্টার</h1>
            </div>
          </div>

          {/* Quick tab switcher */}
          <div className="flex items-center gap-1 bg-emerald-900/80 p-1 rounded-xl text-xs font-medium">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'orders' ? 'bg-emerald-800 text-white shadow-xs font-bold' : 'text-emerald-200 hover:text-white'
              }`}
            >
              অর্ডার সমূহ ({toBengaliNumber(orders.length)})
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'products' ? 'bg-emerald-800 text-white shadow-xs font-bold' : 'text-emerald-200 hover:text-white'
              }`}
            >
              পণ্য ও ইনভেন্টরি ({toBengaliNumber(products.length)})
            </button>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="p-2 text-emerald-300 hover:text-red-300 transition-colors flex items-center gap-1 text-xs cursor-pointer"
            title="লগআউট"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">লগআউট</span>
          </button>

        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 space-y-6 flex-1">
        
        {/* KPI Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">মোট বিক্রি (Revenue)</p>
              <p className="text-lg sm:text-xl font-bold text-slate-900 font-mono">
                {formatPrice(totalRevenue)}
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">মোট অর্ডার</p>
              <p className="text-lg sm:text-xl font-bold text-slate-900 font-mono">
                {toBengaliNumber(orders.length)} টি
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">অপেক্ষমান অর্ডার</p>
              <p className="text-lg sm:text-xl font-bold text-amber-700 font-mono">
                {toBengaliNumber(pendingOrdersCount)} টি
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">কম স্টক সতর্কতা</p>
              <p className="text-lg sm:text-xl font-bold text-rose-700 font-mono">
                {toBengaliNumber(lowStockCount)} টি
              </p>
            </div>
          </div>
        </div>

        {/* TAB 1: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            
            {/* Filter toolbar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-700">ফিল্টার:</span>
                {[
                  { key: 'all', label: 'সব অর্ডার' },
                  { key: 'pending', label: 'অপেক্ষমান' },
                  { key: 'processing', label: 'প্রক্রিয়াধীন' },
                  { key: 'shipped', label: 'ডেলিভারিতে' },
                  { key: 'delivered', label: 'সম্পন্ন' },
                  { key: 'cancelled', label: 'বাতিল' },
                ].map((st) => (
                  <button
                    key={st.key}
                    onClick={() => setOrderStatusFilter(st.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      orderStatusFilter === st.key
                        ? 'bg-emerald-800 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <input
                    type="text"
                    placeholder="অর্ডার আইডি, ফোন বা নাম..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-700 text-slate-800"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>

                <button
                  onClick={exportOrdersCSV}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                  title="CSV ডাউনলোড করুন"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">CSV এক্সপোর্ট</span>
                </button>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                    <tr>
                      <th className="px-4 py-3">অর্ডার আইডি</th>
                      <th className="px-4 py-3">গ্রাহক ও মোবাইল</th>
                      <th className="px-4 py-3">ঠিকানা ও জোন</th>
                      <th className="px-4 py-3">অর্ডারকৃত পণ্য</th>
                      <th className="px-4 py-3">মোট টাকা</th>
                      <th className="px-4 py-3">স্ট্যাটাস পরিবর্তন</th>
                      <th className="px-4 py-3 text-right">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-slate-500">
                          কোনো অর্ডার পাওয়া যায়নি
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-4 py-3 font-mono font-bold text-slate-900">
                            {ord.id}
                            <span className="block text-[10px] text-slate-400 font-normal">
                              {new Date(ord.createdAt).toLocaleDateString('bn-BD')}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-bold text-slate-900 block">{ord.customerName}</span>
                            <a
                              href={`tel:${ord.phone}`}
                              className="text-emerald-700 font-mono hover:underline flex items-center gap-1"
                            >
                              <Phone className="w-3 h-3" />
                              {ord.phone}
                            </a>
                          </td>
                          <td className="px-4 py-3 max-w-[200px]">
                            <p className="truncate text-slate-600" title={ord.address}>
                              {ord.address}
                            </p>
                            <span className="text-[10px] text-slate-500 font-medium">
                              {ord.zone === 'inside_dhaka' ? 'ঢাকার ভেতরে (৳৭০)' : 'ঢাকার বাইরে (৳১৩০)'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-medium">
                              {toBengaliNumber(ord.items.length)} টি আইটেম
                            </span>
                            <div className="text-[11px] text-slate-500 truncate max-w-[180px]">
                              {ord.items.map((i) => `${i.productName} (${toBengaliNumber(i.quantity)})`).join(', ')}
                            </div>
                          </td>
                          <td className="px-4 py-3 font-mono font-bold text-emerald-900">
                            {formatPrice(ord.total)}
                            <span className="block text-[10px] text-slate-500 font-normal">
                              ক্যাশ অন ডেলিভারি
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <select
                              value={ord.status}
                              onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as Order['status'])}
                              className={`px-2.5 py-1 text-xs font-semibold rounded-lg border outline-none cursor-pointer ${
                                ord.status === 'delivered'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : ord.status === 'processing'
                                  ? 'bg-blue-50 text-blue-800 border-blue-300'
                                  : ord.status === 'shipped'
                                  ? 'bg-purple-50 text-purple-800 border-purple-300'
                                  : ord.status === 'cancelled'
                                  ? 'bg-rose-50 text-rose-800 border-rose-300'
                                  : 'bg-amber-50 text-amber-800 border-amber-300'
                              }`}
                            >
                              <option value="pending">অপেক্ষমান (Pending)</option>
                              <option value="processing">প্রক্রিয়াধীন (Processing)</option>
                              <option value="shipped">ডেলিভারিতে চলমান (Shipped)</option>
                              <option value="delivered">ডেলিভারি সম্পন্ন (Delivered)</option>
                              <option value="cancelled">বাতিল (Cancelled)</option>
                            </select>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setSelectedOrder(ord)}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-800 hover:bg-slate-100 transition-colors"
                                title="রসিদ ও বিবরণ"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm(`আপনি কি নিশ্চিত যে অর্ডার "${ord.id}" টি মুছে ফেলতে চান?`)) {
                                    onDeleteOrder(ord.id);
                                  }
                                }}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                title="অর্ডার ডিলিট করুন"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: PRODUCTS & INVENTORY MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            
            {/* Product Toolbar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <input
                  type="text"
                  placeholder="পণ্য খুঁজুন (বাংলা বা ইংরেজি)..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-700 text-slate-800"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onResetData}
                  className="px-3 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="ডেমো ডেটা রিস্টোর করুন"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                  <span>রিসেট ক্যাটালগ</span>
                </button>

                <button
                  onClick={openAddModal}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>নতুন পণ্য যোগ করুন</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                    <tr>
                      <th className="px-4 py-3">ছবি ও নাম</th>
                      <th className="px-4 py-3">ক্যাটাগরি</th>
                      <th className="px-4 py-3">মূল্য (বিক্রি / পূর্বের)</th>
                      <th className="px-4 py-3">প্যাকেজিং / ওজন</th>
                      <th className="px-4 py-3">স্টক সংখ্যা</th>
                      <th className="px-4 py-3">স্ট্যাটাস</th>
                      <th className="px-4 py-3 text-right">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image}
                              alt={p.nameBn}
                              referrerPolicy="no-referrer"
                              className="w-12 h-12 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                            />
                            <div>
                              <span className="font-bold text-slate-900 block">{p.nameBn}</span>
                              <span className="text-[11px] text-slate-400">{p.nameEn}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-slate-600 font-medium">
                            {p.category === 'oil-ghee' && 'তেল ও ঘি'}
                            {p.category === 'honey' && 'প্রাকৃতিক মধু'}
                            {p.category === 'sweets' && 'গুড় ও মিষ্টি'}
                            {p.category === 'nuts-spices' && 'বাদাম ও মসলা'}
                            {p.category === 'others' && 'অন্যান্য'}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono">
                          <span className="font-bold text-emerald-900">{formatPrice(p.price)}</span>
                          {p.originalPrice > p.price && (
                            <span className="text-slate-400 line-through text-[11px] block">
                              {formatPrice(p.originalPrice)}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">{p.weight}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                const newQty = Math.max(0, p.stockQuantity - 1);
                                onUpdateProduct({ ...p, stockQuantity: newQty, inStock: newQty > 0 });
                              }}
                              className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-600"
                            >
                              -
                            </button>
                            <span className={`font-mono font-bold ${p.stockQuantity < 10 ? 'text-red-600' : 'text-slate-900'}`}>
                              {toBengaliNumber(p.stockQuantity)}
                            </span>
                            <button
                              onClick={() => {
                                const newQty = p.stockQuantity + 1;
                                onUpdateProduct({ ...p, stockQuantity: newQty, inStock: true });
                              }}
                              className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-600"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                              p.inStock ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                            }`}
                          >
                            {p.inStock ? 'ইন স্টক' : 'আউট অফ স্টক'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditModal(p)}
                              className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-800 hover:bg-slate-100 transition-colors"
                              title="এডিট করুন"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`আপনি কি নিশ্চিত যে পণ্য "${p.nameBn}" টি মুছে ফেলতে চান?`)) {
                                  onDeleteProduct(p.id);
                                }
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="ডিলিট করুন"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* MODAL: ADD / EDIT PRODUCT */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="px-6 py-4 bg-emerald-950 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">
                {editingProduct ? 'পণ্য সম্পাদনা (Edit Product)' : 'নতুন পণ্য যোগ করুন (Add Product)'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">পণ্যের নাম (বাংলায়) *</label>
                  <input
                    type="text"
                    required
                    value={formNameBn}
                    onChange={(e) => setFormNameBn(e.target.value)}
                    placeholder="যেমন: খাঁটি গাওয়া ঘি"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">নাম (ইংরেজিতে)</label>
                  <input
                    type="text"
                    value={formNameEn}
                    onChange={(e) => setFormNameEn(e.target.value)}
                    placeholder="e.g. Pure Artisanal Cow Ghee"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">ক্যাটাগরি</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as Product['category'])}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none"
                  >
                    <option value="oil-ghee">তেল ও ঘি</option>
                    <option value="honey">প্রাকৃতিক মধু</option>
                    <option value="sweets">গুড় ও মিষ্টি</option>
                    <option value="nuts-spices">বাদাম ও মসলা</option>
                    <option value="others">অন্যান্য</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">বিক্রয় মূল্য (৳) *</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">পূর্বের মূল্য (৳)</label>
                  <input
                    type="number"
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">ওজন / প্যাকেজিং</label>
                  <input
                    type="text"
                    value={formWeight}
                    onChange={(e) => setFormWeight(e.target.value)}
                    placeholder="যেমন: ১ লিটার, ৫০০ গ্রাম জার"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">স্টক সংখ্যা</label>
                  <input
                    type="number"
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">পণ্যের ছবির লিঙ্ক (Image URL)</label>
                <input
                  type="text"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  placeholder="/src/assets/images/..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">বিস্তারিত বিবরণ (Description)</label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">বৈশিষ্ট্যসমূহ (কমা দিয়ে আলাদা করুন)</label>
                <input
                  type="text"
                  value={formFeatures}
                  onChange={(e) => setFormFeatures(e.target.value)}
                  placeholder="১০০% খাঁটি, কোল্ড প্রেসড, কোনো প্রিজারভেটিভ নেই"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-bold shadow-sm"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VIEW ORDER DETAILS */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="font-mono text-base font-bold text-slate-900">
                  {selectedOrder.id}
                </span>
                <span className="text-slate-500 block text-[11px]">
                  তারিখ: {new Date(selectedOrder.createdAt).toLocaleString('bn-BD')}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <p><span className="font-bold">গ্রাহক:</span> {selectedOrder.customerName}</p>
              <p><span className="font-bold">ফোন:</span> <span className="font-mono">{selectedOrder.phone}</span></p>
              <p><span className="font-bold">ঠিকানা:</span> {selectedOrder.address}</p>
              {selectedOrder.notes && (
                <p><span className="font-bold">নোট:</span> {selectedOrder.notes}</p>
              )}
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900">অর্ডারকৃত পণ্য তালিকা:</h4>
              <div className="space-y-1.5 divide-y divide-slate-100">
                {selectedOrder.items.map((i, idx) => (
                  <div key={idx} className="flex justify-between pt-1.5 first:pt-0">
                    <span>{i.productName} ({i.weight}) × {toBengaliNumber(i.quantity)}</span>
                    <span className="font-mono font-bold text-slate-900">{formatPrice(i.price * i.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-sm">
                <span>সর্বমোট:</span>
                <span className="font-mono text-emerald-900">{formatPrice(selectedOrder.total)}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <span className="font-semibold text-slate-600">স্ট্যাটাস:</span>
              <select
                value={selectedOrder.status}
                onChange={(e) => {
                  onUpdateOrderStatus(selectedOrder.id, e.target.value as Order['status']);
                  setSelectedOrder({ ...selectedOrder, status: e.target.value as Order['status'] });
                }}
                className="px-3 py-1.5 rounded-lg border text-xs font-bold"
              >
                <option value="pending">অপেক্ষমান (Pending)</option>
                <option value="processing">প্রক্রিয়াধীন (Processing)</option>
                <option value="shipped">ডেলিভারিতে চলমান (Shipped)</option>
                <option value="delivered">ডেলিভারি সম্পন্ন (Delivered)</option>
                <option value="cancelled">বাতিল (Cancelled)</option>
              </select>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
