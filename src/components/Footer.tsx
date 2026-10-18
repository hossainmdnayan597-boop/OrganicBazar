import React from 'react';
import { Phone, Mail, MapPin, Shield, MessageCircle } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenOrderTrack: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenOrderTrack }) => {
  return (
    <footer id="contact" className="bg-emerald-950 text-slate-300 pt-12 pb-8 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Brand & Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white">
              <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center text-amber-300">
                <i className="fa-solid fa-leaf text-base"></i>
              </div>
              <span className="text-xl font-bold tracking-tight">ঘরের বাজার</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              ১০০% খাঁটি ও ভেজালমুক্ত দেশীয় খাদ্যপণ্যের নির্ভরযোগ্য প্ল্যাটফর্ম। আমরা কোনো রাসায়নিক বা ক্ষতিকর উপাদান ছাড়া সরাসরি মাঠ ও খামার থেকে পণ্য সংগ্রহ করি।
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-900 hover:bg-emerald-800 flex items-center justify-center text-white transition-colors"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook-f text-sm"></i>
              </a>
              <a
                href="https://wa.me/8801799001122"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-900 hover:bg-emerald-800 flex items-center justify-center text-emerald-400 transition-colors"
                aria-label="WhatsApp"
              >
                <i className="fa-brands fa-whatsapp text-sm"></i>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-900 hover:bg-emerald-800 flex items-center justify-center text-red-400 transition-colors"
                aria-label="YouTube"
              >
                <i className="fa-brands fa-youtube text-sm"></i>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">জরুরি লিংক</h4>
            <ul className="space-y-2">
              <li>
                <a href="#products" className="hover:text-amber-300 transition-colors">সব পণ্য তালিকা</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-amber-300 transition-colors">কেন আমাদের বেছে নেবেন?</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-300 transition-colors">গ্রাহক সন্তুষ্টি ও রিভিউ</a>
              </li>
              <li>
                <button
                  onClick={onOpenOrderTrack}
                  className="hover:text-amber-300 transition-colors text-left cursor-pointer"
                >
                  অর্ডার ট্র্যাকিং
                </button>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-300 transition-colors">ডেলিভারি ও রিটার্ন পলিসি</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Support */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">যোগাযোগ ও হেল্পলাইন</h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white font-mono">০১৭৯৯-০০১১২২</p>
                  <p className="text-[11px] text-slate-400 font-mono">০১৮৮৮-২২৩৩৪৪ (সকাল ৯টা - রাত ১০টা)</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="font-mono">support@ghorerbazar.com.bd</span>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  বাড়ি #২৪, রোড #১০, সেক্টর #১১, উত্তরা, ঢাকা - ১২৩০
                </span>
              </div>
            </div>
          </div>

          {/* Column 4: Trust & Guarantee */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">নিরাপত্তা ও বিশ্বাস</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              আমরা শতভাগ ক্যাশ অন ডেলিভারিতে পণ্য সরবরাহ করি। পণ্য হাতে পেয়ে দেখে বুঝে মূল্য পরিশোধ করুন।
            </p>
            <div className="p-3 bg-emerald-900/60 rounded-xl border border-emerald-800/80 space-y-1">
              <p className="text-amber-300 font-bold text-xs">ট্রেড লাইসেন্স নম্বর:</p>
              <p className="font-mono text-[11px] text-emerald-200">TRAD/DNCC/049182/2024</p>
            </div>
            <div className="pt-1">
              <span className="text-[11px] text-slate-400 block mb-1">পেমেন্ট গ্রহণ মাধ্যম:</span>
              <div className="flex items-center gap-2 text-slate-300 text-xs font-mono">
                <span className="px-1.5 py-0.5 bg-emerald-900 rounded">COD</span>
                <span className="px-1.5 py-0.5 bg-pink-900/60 rounded text-pink-300">bKash</span>
                <span className="px-1.5 py-0.5 bg-orange-900/60 rounded text-orange-300">Nagad</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Admin Portal Link */}
        <div className="pt-8 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} ঘরের বাজার (Ghorer Bazar). সর্বস্বত্ব সংরক্ষিত।</p>
          
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenOrderTrack}
              className="hover:text-white transition-colors cursor-pointer"
            >
              ট্র্যাক অর্ডার
            </button>
            <span>·</span>
            <button
              onClick={onOpenAdmin}
              className="text-emerald-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="এডমিন প্যানেল প্রবেশ করুন"
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="font-semibold">এডমিন প্যানেল (#admin)</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
