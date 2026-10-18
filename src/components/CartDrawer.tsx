import React from 'react';
import { CartItem } from '../types';
import { formatPrice, toBengaliNumber } from '../utils/format';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedCheckout: () => void;
  deliveryZone: 'inside_dhaka' | 'outside_dhaka';
  onChangeDeliveryZone: (zone: 'inside_dhaka' | 'outside_dhaka') => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
  deliveryZone,
  onChangeDeliveryZone,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const FREE_DELIVERY_THRESHOLD = 2500;
  const isFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee = isFreeDelivery ? 0 : deliveryZone === 'inside_dhaka' ? 70 : 130;
  const total = subtotal + deliveryFee;
  const remainingForFreeDelivery = FREE_DELIVERY_THRESHOLD - subtotal;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Cart Header */}
          <div className="px-6 py-4 bg-emerald-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold">শপিং ব্যাগ</h2>
              <span className="text-xs bg-emerald-950 px-2 py-0.5 rounded-full text-emerald-200 font-mono">
                {toBengaliNumber(items.length)} আইটেম
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-800 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Strip */}
          <div className="px-6 py-2.5 bg-amber-50 border-b border-amber-200/60 text-xs text-amber-950">
            {isFreeDelivery ? (
              <div className="flex items-center gap-1.5 font-semibold text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>অভিনন্দন! আপনি ফ্রি ডেলিভারি পাচ্ছেন।</span>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex justify-between font-medium">
                  <span>আর মাত্র {formatPrice(remainingForFreeDelivery)} এর পণ্য কিনলেই ফ্রি ডেলিভারি!</span>
                  <span>{toBengaliNumber(Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100)))}%</span>
                </div>
                <div className="w-full bg-amber-200/60 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-700 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-800">আপনার শপিং ব্যাগটি খালি</h3>
                  <p className="text-xs text-slate-500 max-w-xs">
                    আমাদের খাঁটি ও প্রাকৃতিক পণ্যের তালিকা থেকে আপনার পছন্দের পণ্যটি কার্টে যোগ করুন।
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-emerald-800 text-white rounded-lg text-sm font-semibold hover:bg-emerald-900 transition-colors cursor-pointer"
                >
                  পণ্য দেখতে চলুন
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3.5 pb-4 border-b border-slate-100 last:border-b-0 items-start"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.nameBn}
                    referrerPolicy="no-referrer"
                    className="w-18 h-18 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-200/70"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-1">
                      {item.product.nameBn}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">{item.product.weight}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-bold text-emerald-900 font-mono">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>

                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-slate-800 font-mono">
                          {toBengaliNumber(item.quantity)}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                        title="মুছে ফেলুন"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer & Checkout Controls */}
          {items.length > 0 && (
            <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
              {/* Delivery Zone Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  ডেলিভারি এলাকা নির্বাচন করুন:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onChangeDeliveryZone('inside_dhaka')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-left flex items-center justify-between transition-colors cursor-pointer ${
                      deliveryZone === 'inside_dhaka'
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span>ঢাকার ভেতরে</span>
                    <span className="font-mono text-emerald-800">
                      {isFreeDelivery ? 'ফ্রি' : '৳৭০'}
                    </span>
                  </button>

                  <button
                    onClick={() => onChangeDeliveryZone('outside_dhaka')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-left flex items-center justify-between transition-colors cursor-pointer ${
                      deliveryZone === 'outside_dhaka'
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span>ঢাকার বাইরে</span>
                    <span className="font-mono text-emerald-800">
                      {isFreeDelivery ? 'ফ্রি' : '৳১৩০'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-200/80 pt-3">
                <div className="flex justify-between">
                  <span>পণ্যের মূল্য (Subtotal):</span>
                  <span className="font-bold text-slate-900 font-mono">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>ডেলিভারি চার্জ:</span>
                  <span className="font-bold text-slate-900 font-mono">
                    {deliveryFee === 0 ? 'ফ্রি (০)' : formatPrice(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>সর্বমোট প্রদেয়:</span>
                  <span className="text-emerald-900 font-mono">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={onProceedCheckout}
                className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-900/15 transition-all cursor-pointer"
              >
                <span>অর্ডার সম্পন্ন করতে এগিয়ে যান</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-slate-500">
                🔒 ক্যাশ অন ডেলিভারি · পণ্য হাতে পেয়ে মূল্য পরিশোধ
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
