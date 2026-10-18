import React from 'react';
import { Review } from '../types';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { toBengaliNumber } from '../utils/format';

interface ReviewsSectionProps {
  reviews: Review[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  return (
    <section id="reviews" className="py-14 bg-amber-50/40 border-b border-emerald-950/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            সন্তুষ্ট গ্রাহকদের প্রতিক্রিয়া
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            আমাদের খাঁটি পণ্যের প্রতি মানুষের আস্থা ও ভালোবাসা
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            সারা দেশের হাজারো পরিবার নিয়মিত ঘরের বাজারের নির্ভেজাল খাদ্যপণ্য গ্রহণ করছেন।
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-700/40 transition-colors"
            >
              <div className="space-y-3">
                {/* Stars and verified tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {rev.verified && (
                    <span className="text-[11px] text-emerald-800 font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      ভেরিফায়েড ক্রেতা
                    </span>
                  )}
                </div>

                {/* Comment quote */}
                <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Reviewer info */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900">{rev.name}</h4>
                  <p className="text-[11px] text-slate-500">{rev.location}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-emerald-800 font-medium block truncate max-w-[120px]">
                    {rev.productName}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Aggregated Proof Ribbon */}
        <div className="p-4 rounded-xl bg-white border border-emerald-900/10 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-sm">
              <i className="fa-solid fa-thumbs-up"></i>
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">৯৯.২% গ্রাহক সন্তুষ্টি স্কোর</p>
              <p className="text-slate-500">আমাদের পণ্যের মান ও প্যাকেজিং নিয়ে গ্রাহকদের অটুট বিশ্বাস</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-slate-600">
            <span>ক্যাশ অন ডেলিভারি</span>
            <span className="text-slate-300">·</span>
            <span>দ্রুত রিপ্লেসমেন্ট</span>
            <span className="text-slate-300">·</span>
            <span>২৪/৭ হেল্পলাইন</span>
          </div>
        </div>

      </div>
    </section>
  );
};
