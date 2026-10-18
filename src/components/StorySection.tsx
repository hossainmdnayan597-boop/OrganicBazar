import React from 'react';
import { Leaf, Award, HeartHandshake, ShieldCheck } from 'lucide-react';

export const StorySection: React.FC = () => {
  const points = [
    {
      icon: <Leaf className="w-5 h-5 text-emerald-700" />,
      title: 'সরাসরি উৎপাদক থেকে সংগ্রহ',
      desc: 'সুন্দরবনের মৌয়াল, পাবনার খামারি এবং যশোরের ঐতিহ্যবাহী গাছিদের থেকে সরাসরি পণ্য সংগ্রহ করা হয়। কোনো মধ্যস্বত্বভোগী নেই।',
    },
    {
      icon: <Award className="w-5 h-5 text-emerald-700" />,
      title: 'শতভাগ ল্যাব টেস্টেড খাঁটি',
      desc: 'প্রতিটি ব্যাচের মধু, ঘি ও তেলের ঘনত্ব ও বিশুদ্ধতা কঠোর বৈজ্ঞানিক পরীক্ষায় উত্তীর্ণ হওয়ার পরই আপনাদের জন্য প্যাকেজিং করা হয়।',
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-emerald-700" />,
      title: 'গ্রাহকের স্বাস্থ্য আমাদের অগ্রাধিকার',
      desc: 'আমরা নিজের পরিবারকে যে খাবার নিশ্চিন্তে খাওয়াতে পারি, কেবল সেই খাবারটুকুই পরম যত্নে আপনার পরিবারের কাছে পৌঁছে দেই।',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-700" />,
      title: 'নিরাপদ প্যাকেজিং ও ডেলিভারি',
      desc: 'কাঁচের জার ও পেট বোতল প্রিমিয়াম বাবল র‍্যাপ এবং ফুড-গ্রেড বক্সে প্যাক করা হয় যাতে পরিবহনে কোনো অপচয় বা ক্ষতি না হয়।',
    },
  ];

  return (
    <section id="why-us" className="py-14 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              আমাদের অঙ্গীকার ও গল্প
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              ভেজাল খাবারের ভিড়ে ঘরের বাজার কেন আপনার সেরা পছন্দ?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              বর্তমান যুগে খাঁটি ও নির্ভেজাল খাবার খুঁজে পাওয়া সত্যিই এক কঠিন চ্যালেঞ্জ। কেমিক্যালযুক্ত মধু, ভেজাল তেল আর ডালডামিশ্রিত ঘিয়ের ভিড়ে আপনার ও আপনার পরিবারের স্বাস্থ্য সবসময় ঝুঁকিতে থাকে।
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              ‘ঘরের বাজার’ প্রতিজ্ঞা করেছে—আমরা গ্রাম-বাংলার প্রত্যন্ত অঞ্চলের ঐতিহ্যবাহী চাষী ও খামারিদের সঙ্গে সরাসরি সংযোগ স্থাপন করে আসল ও প্রাকৃতিক পুষ্টি সরাসরি আপনার ডাইনিং টেবিলে পৌঁছে দেব।
            </p>

            <div className="pt-2 flex items-center gap-6 text-xs text-slate-700 font-semibold">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-seedling text-emerald-700 text-sm"></i>
                <span>প্রকৃতির শতভাগ দান</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-flask-vial text-emerald-700 text-sm"></i>
                <span>কেমিক্যাল মুক্ত</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-truck-fast text-emerald-700 text-sm"></i>
                <span>সারা দেশে হোম ডেলিভারি</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {points.map((pt, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-emerald-700/40 transition-colors space-y-2"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-100/80 flex items-center justify-center">
                  {pt.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-900">{pt.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{pt.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
