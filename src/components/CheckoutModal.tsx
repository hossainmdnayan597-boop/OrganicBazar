import React, { useState } from 'react';
import { CartItem, Order } from '../types';
import { formatPrice, toBengaliNumber } from '../utils/format';
import { X, ShieldCheck, Banknote, Truck, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  deliveryZone: 'inside_dhaka' | 'outside_dhaka';
  onChangeDeliveryZone: (zone: 'inside_dhaka' | 'outside_dhaka') => void;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  deliveryZone,
  onChangeDeliveryZone,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const isFreeDelivery = subtotal >= 2500;
  const deliveryFee = isFreeDelivery ? 0 : deliveryZone === 'inside_dhaka' ? 70 : 130;
  const total = subtotal + deliveryFee;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('দয়া করে আপনার পূর্ণ নাম লিখুন');
      return;
    }

    const cleanPhone = phone.trim().replace(/[- ]/g, '');
    if (!cleanPhone || cleanPhone.length < 11 || !cleanPhone.startsWith('01')) {
      setErrorMessage('দয়া করে সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01712345678)');
      return;
    }

    if (!address.trim() || address.trim().length < 5) {
      setErrorMessage('দয়া করে পূর্ণ ডেলিভারি ঠিকানা বিস্তারিত লিখুন');
      return;
    }

    setIsSubmitting(true);

    const newOrder: Order = {
      id: `GB-${Math.floor(10000 + Math.random() * 90000)}`,
      customerName: fullName.trim(),
      phone: cleanPhone,
      address: address.trim(),
      zone: deliveryZone,
      deliveryFee,
      items: items.map((i) => ({
        productId: i.product.id,
        productName: i.product.nameBn,
        quantity: i.quantity,
        price: i.product.price,
        weight: i.product.weight,
      })),
      subtotal,
      total,
      paymentMethod: 'cod',
      notes: notes.trim() || undefined,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    try {
      // Backend integration hook template: Ready for Node/Express, PHP, or Firebase Webhook
      /* 
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });
      */
      // Simulate network response latency
      await new Promise((resolve) => setTimeout(resolve, 800));

      onOrderSuccess(newOrder);
      onClose();
    } catch (err) {
      console.error('Order submission error:', err);
      // Fallback save locally
      onOrderSuccess(newOrder);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-4 bg-emerald-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h2 className="text-base sm:text-lg font-bold">অর্ডার কনফার্মেশন ও চেকআউট</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-300 hover:text-white rounded-lg hover:bg-emerald-900 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmitOrder} className="p-6 space-y-6">
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2.5 text-xs font-semibold text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Customer Delivery Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-800" />
              <span>১. আপনার ডেলিভারি তথ্য দিন</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  আপনার নাম <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="যেমন: মোঃ কামরুল হাসান"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700 focus:bg-white text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  মোবাইল নম্বর (১১ ডিজিট) <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="যেমন: 01712345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700 focus:bg-white font-mono text-slate-900"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">
                ডেলিভারির সম্পূর্ণ ঠিকানা <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="বাসা নং, রোড নং, এলাকা/মহল্লা, থানা ও জেলা বিস্তারিত লিখুন..."
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700 focus:bg-white text-slate-900"
              />
            </div>

            {/* Delivery Zone selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                ডেলিভারি এলাকা নির্বাচন করুন:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label
                  onClick={() => onChangeDeliveryZone('inside_dhaka')}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    deliveryZone === 'inside_dhaka'
                      ? 'border-emerald-700 bg-emerald-50/80 text-emerald-950 font-bold'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="zone"
                      checked={deliveryZone === 'inside_dhaka'}
                      onChange={() => onChangeDeliveryZone('inside_dhaka')}
                      className="accent-emerald-700"
                    />
                    <span className="text-xs">ঢাকার ভেতরে (২৪-৪৮ ঘণ্টা)</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-900">
                    {isFreeDelivery ? 'ফ্রি' : '৳৭০'}
                  </span>
                </label>

                <label
                  onClick={() => onChangeDeliveryZone('outside_dhaka')}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    deliveryZone === 'outside_dhaka'
                      ? 'border-emerald-700 bg-emerald-50/80 text-emerald-950 font-bold'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="zone"
                      checked={deliveryZone === 'outside_dhaka'}
                      onChange={() => onChangeDeliveryZone('outside_dhaka')}
                      className="accent-emerald-700"
                    />
                    <span className="text-xs">ঢাকার বাইরে (২-৩ দিন)</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-900">
                    {isFreeDelivery ? 'ফ্রি' : '৳১৩০'}
                  </span>
                </label>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-600">
                অতিরিক্ত নির্দেশিকা বা নোট (ঐচ্ছিক):
              </label>
              <input
                type="text"
                placeholder="যেমন: অফিসের সময় ডেলিভারি দিন অথবা ফোন দিয়ে আসবেন"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-700 text-slate-800"
              />
            </div>
          </div>

          {/* Payment Method Notice */}
          <div className="p-3.5 bg-emerald-50/80 border border-emerald-200/80 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5 text-emerald-950 font-semibold">
              <Banknote className="w-5 h-5 text-emerald-700" />
              <div>
                <p>পেমেন্ট মেথড: ক্যাশ অন ডেলিভারি (COD)</p>
                <p className="text-[11px] font-normal text-emerald-800">
                  পণ্য হাতে পেয়ে চেক করে ডেলিভারিম্যানকে মূল্য পরিশোধ করবেন।
                </p>
              </div>
            </div>
            <span className="text-emerald-700 font-bold text-xs flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              নির্বাচিত
            </span>
          </div>

          {/* Order Summary Breakdown */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-700">
            <h4 className="font-bold text-slate-900 text-xs mb-2">অর্ডার সামারি ({toBengaliNumber(items.length)}টি পণ্য):</h4>
            
            <div className="max-h-32 overflow-y-auto space-y-1.5 pr-2">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-slate-600">
                  <span className="truncate max-w-[280px]">
                    {item.product.nameBn} × {toBengaliNumber(item.quantity)}
                  </span>
                  <span className="font-mono font-medium">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 pt-2 space-y-1">
              <div className="flex justify-between">
                <span>পণ্যের মোট মূল্য:</span>
                <span className="font-mono">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>ডেলিভারি চার্জ:</span>
                <span className="font-mono">
                  {deliveryFee === 0 ? 'ফ্রি (০)' : formatPrice(deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-1.5 border-t border-slate-300">
                <span>মোট প্রদেয় টাকা:</span>
                <span className="text-emerald-900 font-mono text-base">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 transition-all cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>অর্ডার প্রসেস হচ্ছে...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>অর্ডার নিশ্চিত করুন ({formatPrice(total)})</span>
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
