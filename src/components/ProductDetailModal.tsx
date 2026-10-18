import React, { useState } from 'react';
import { Product } from '../types';
import { formatPrice, toBengaliNumber } from '../utils/format';
import { X, Star, ShoppingBag, Zap, ShieldCheck, Check, Plus, Minus } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const discountAmount = product.originalPrice - product.price;
  const discountPercent = Math.round((discountAmount / product.originalPrice) * 100);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 shadow-md text-slate-600 hover:text-slate-900 flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Image Column */}
          <div className="relative aspect-square md:aspect-auto bg-slate-50 flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-slate-200">
            <img
              src={product.image}
              alt={product.nameBn}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover max-h-[420px]"
            />
            {discountAmount > 0 && (
              <div className="absolute top-4 left-4 bg-amber-500 text-slate-950 text-xs font-bold px-2.5 py-1 rounded shadow-xs">
                {toBengaliNumber(discountPercent)}% মূল্যছাড়
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-amber-500">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-slate-800 font-mono">
                  {toBengaliNumber(product.rating.toFixed(1))}
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500">
                  ({toBengaliNumber(product.reviewsCount)} টি গ্রাহক রিভিউ)
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 leading-snug">
                {product.nameBn}
              </h2>
              <p className="text-xs text-slate-400">{product.nameEn}</p>

              {/* Price baseline */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-2xl font-bold text-emerald-900 font-mono">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-slate-400 line-through font-mono">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs bg-emerald-50 text-emerald-800 font-medium px-2 py-0.5 rounded">
                  {product.weight}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed pt-2">
                {product.description}
              </p>

              {/* Feature Points */}
              <div className="space-y-1.5 pt-2">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchase Controls */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              {/* Quantity selector */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">পরিমাণ (Quantity):</span>
                <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-10 text-center text-xs font-bold font-mono">
                    {toBengaliNumber(quantity)}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAdd}
                  className="py-2.5 px-3 rounded-xl border border-emerald-700 text-emerald-900 bg-emerald-50/50 hover:bg-emerald-100 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-700" />
                      <span>কার্টে যোগ হয়েছে</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-emerald-700" />
                      <span>কার্টে যোগ করুন</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onBuyNow(product, quantity)}
                  className="py-2.5 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-900/15 transition-all cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>এখনই কিনুন</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>ক্যাশ অন ডেলিভারি · ১০০% খাঁটি পণ্যের নিশ্চয়তা</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
