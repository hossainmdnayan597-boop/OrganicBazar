import React, { useState } from 'react';
import { Product } from '../types';
import { formatPrice, toBengaliNumber } from '../utils/format';
import { ShoppingBag, Zap, Eye, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onBuyNow,
  onQuickView,
}) => {
  const [imgError, setImgError] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const discountAmount = product.originalPrice - product.price;
  const discountPercent = Math.round((discountAmount / product.originalPrice) * 100);

  const handleAddToCart = () => {
    onAddToCart(product);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div className="group bg-white rounded-xl border border-slate-200/90 hover:border-emerald-700/50 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Discount Badge */}
      {discountAmount > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-amber-500 text-slate-950 text-xs font-bold px-2 py-0.5 rounded shadow-xs">
          {toBengaliNumber(discountPercent)}% ছাড়
        </div>
      )}

      {/* Quick View Button on Image Hover */}
      <button
        onClick={() => onQuickView(product)}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-slate-700 hover:text-emerald-800 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm cursor-pointer"
        title="বিস্তারিত দেখুন"
        aria-label="Quick view"
      >
        <Eye className="w-4 h-4" />
      </button>

      {/* Product Image Area */}
      <div 
        onClick={() => onQuickView(product)}
        className="relative aspect-4/3 bg-slate-100/80 overflow-hidden cursor-pointer"
      >
        {!imgError ? (
          <img
            src={product.image}
            alt={product.nameBn}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-emerald-950/5 text-emerald-900">
            <i className="fa-solid fa-seedling text-3xl mb-2 text-emerald-700"></i>
            <span className="text-xs font-medium text-center">{product.nameBn}</span>
          </div>
        )}

        {/* Weight Tag */}
        <div className="absolute bottom-2.5 left-2.5 bg-slate-900/75 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded">
          {product.weight}
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Rating & Review Count */}
          <div className="flex items-center gap-1.5 text-xs text-amber-500 mb-1">
            <div className="flex items-center">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </div>
            <span className="font-bold text-slate-800 font-mono">
              {toBengaliNumber(product.rating.toFixed(1))}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500 text-[11px]">
              ({toBengaliNumber(product.reviewsCount)} রিভিউ)
            </span>
          </div>

          {/* Bengali Product Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="text-base font-bold text-slate-900 line-clamp-2 hover:text-emerald-800 transition-colors cursor-pointer leading-snug"
          >
            {product.nameBn}
          </h3>

          {/* English Subtitle */}
          <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
            {product.nameEn}
          </p>
        </div>

        {/* Pricing & Stock baseline */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-emerald-900 font-mono tabular-nums">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through font-mono tabular-nums">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[11px] text-emerald-700 font-medium">
              {product.inStock ? 'স্টকে আছে' : 'স্টক আউট'}
            </span>
          </div>

          {/* Action Buttons: Add to Cart & Buy Now */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                addedAnimation
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : 'bg-emerald-50 text-emerald-900 border border-emerald-300/70 hover:bg-emerald-100 hover:border-emerald-400'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>যোগ হয়েছে</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-emerald-700" />
                  <span>কার্ট</span>
                </>
              )}
            </button>

            <button
              onClick={() => onBuyNow(product)}
              disabled={!product.inStock}
              className="py-2 px-2.5 rounded-lg text-xs font-semibold bg-emerald-800 hover:bg-emerald-900 text-white flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>এখনই কিনুন</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
