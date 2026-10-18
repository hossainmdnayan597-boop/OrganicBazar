import React from 'react';
import { ArrowRight, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { HERO_IMAGE } from '../initialData';

interface HeroProps {
  onScrollToProducts: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToProducts }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/60 via-white to-white py-8 lg:py-16 border-b border-emerald-950/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Bengali Editorial Copy & Intent CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Clean unboxed kicker with dot separator (Zero-pill discipline) */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide text-emerald-800 uppercase">
              <span>প্রাকৃতিক ও অর্গানিক</span>
              <span aria-hidden="true" className="text-emerald-400">·</span>
              <span>কৃষকের মাঠ থেকে সরাসরি আপনার ঘরে</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold text-slate-900 leading-[1.25] tracking-tight">
              ১০০% ভেজালমুক্ত ও খাঁটি দেশীয় পণ্যের{' '}
              <span className="text-emerald-800 underline decoration-amber-400 decoration-4 underline-offset-6">
                বিশ্বস্ত ঠিকানা
              </span>
            </h1>

            {/* Description Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              আমরা কোনো কেমিক্যাল, কৃত্রিম সুবাস বা প্রিজারভেটিভ ব্যবহার করি না। সুন্দরবনের বুনো মধু, কাঠের ঘানির খাঁটি সরিষার তেল ও পাবনার গাওয়া ঘি সরাসরি বিশ্বস্ত উৎস থেকে সংগৃহীত। পণ্য হাতে পেয়ে নিশ্চিত হয়ে মূল্য পরিশোধ করুন।
            </p>

            {/* Trust Bullet Anchors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-700 font-medium">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>সারা বাংলাদেশে ক্যাশ অন ডেলিভারি</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>পণ্য পছন্দ না হলে শতভাগ মানিব্যাক গ্যারান্টি</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>ল্যাব পরীক্ষিত শতভাগ খাঁটি ও ফ্রেশ</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>২৪ থেকে ৪৮ ঘণ্টার ভেতর দ্রুত ডেলিভারি</span>
              </div>
            </div>

            {/* Actions: Primary CTA & Hotline Phone */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onScrollToProducts}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold text-white bg-emerald-800 hover:bg-emerald-900 active:scale-98 rounded-xl shadow-md shadow-emerald-900/15 transition-all cursor-pointer"
              >
                <span>এখনই অর্ডার করুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:01799001122"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-base font-semibold text-emerald-900 bg-amber-100/70 hover:bg-amber-100 active:scale-98 rounded-xl border border-amber-300/80 transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-800" />
                <span>সরাসরি ফোনে অর্ডার: ০১৭৯৯-০০১১২২</span>
              </a>
            </div>

            {/* Adjacent Quantitative Proof Strip */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-6 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm font-mono">৫০,০০০+</span>
                <span>সন্তুষ্ট গ্রাহক পরিবার</span>
              </div>
              <span className="text-slate-300">·</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm font-mono">৪.৯ ★</span>
                <span>গড় কাস্টমার রেটিং</span>
              </div>
              <span className="text-slate-300">·</span>
              <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>বিএসটিআই ও ল্যাব টেস্টে খাঁটি</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-emerald-950/10 shadow-xl bg-amber-50">
              <img
                src={HERO_IMAGE}
                alt="ঘরের বাজার খাঁটি দেশীয় অর্গানিক পণ্য - মধু, সরিষার তেল ও গাওয়া ঘি"
                referrerPolicy="no-referrer"
                className="w-full h-[320px] sm:h-[400px] lg:h-[450px] object-cover hover:scale-103 transition-transform duration-700"
              />
              {/* Subtle dark gradient scrim at bottom for legible tag */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-amber-300 font-medium">আসল গ্রামীন স্বাদ</p>
                    <p className="text-sm font-semibold">কাঠের ঘানি, সুন্দরবনের মধু ও ঐতিহ্যবাহী ঘি</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded-sm">
                      ১০০% খাঁটি
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Quality Stamp */}
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-white rounded-xl shadow-lg border border-amber-200 p-2.5 flex items-center gap-2 text-xs font-semibold text-emerald-900">
              <span className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800">
                <i className="fa-solid fa-certificate"></i>
              </span>
              <div className="leading-tight">
                <p className="text-[11px] text-slate-500 font-normal">গুণগত মান</p>
                <p>শতভাগ পরীক্ষিত</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
