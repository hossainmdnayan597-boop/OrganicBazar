import React from 'react';
import { Banknote, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: <Banknote className="w-6 h-6 text-emerald-800" />,
      title: 'ক্যাশ অন ডেলিভারি',
      desc: 'পণ্য হাতে পেয়ে চেক করে সম্পূর্ণ নিশ্চিত হয়ে মূল্য পরিশোধ করুন।',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-800" />,
      title: '১০০% খাঁটি ও অর্গানিক',
      desc: 'কোনো কেমিক্যাল, ভেজাল বা প্রিজারভেটিভ ছাড়া শতভাগ প্রাকৃতিক।',
    },
    {
      icon: <Truck className="w-6 h-6 text-emerald-800" />,
      title: 'দ্রুত হোম ডেলিভারি',
      desc: 'ঢাকায় ২৪-৪৮ ঘণ্টায় এবং দেশের যেকোনো প্রান্তে দ্রুত নির্ভরযোগ্য ডেলিভারি।',
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-emerald-800" />,
      title: 'সহজ রিটার্ন ও মানিব্যাক',
      desc: 'পণ্যের মানে বিন্দুমাত্র অসন্তুষ্ট হলে রয়েছে দ্রুত রিপ্লেসমেন্ট ও রিফান্ড।',
    },
  ];

  return (
    <section className="py-8 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:border-emerald-700/40 transition-colors flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100/70 flex items-center justify-center shrink-0">
                {badge.icon}
              </div>
              <div className="space-y-1">
                <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {badge.title}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {badge.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
