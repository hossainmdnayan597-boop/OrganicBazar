import React from 'react';
import { Order } from '../types';
import { formatPrice, toBengaliNumber } from '../utils/format';
import { CheckCircle2, Phone, X, Printer } from 'lucide-react';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const whatsappMessage = encodeURIComponent(
    `আসসালামু আলাইকুম, আমি ঘরের বাজার থেকে একটি অর্ডার করেছি।\nঅর্ডার আইডি: ${order.id}\nনাম: ${order.customerName}\nমোবাইল: ${order.phone}\nমোট মূল্য: ৳${order.total}\nঠিকানা: ${order.address}`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header Ribbon */}
        <div className="bg-emerald-800 text-white p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-emerald-200 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-16 h-16 rounded-full bg-white text-emerald-800 flex items-center justify-center mx-auto mb-3 shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold">আপনার অর্ডারটি সফল হয়েছে!</h2>
          <p className="text-xs text-emerald-100 mt-1">
            ঘরে বসে আসল খাঁটি স্বাদ উপভোগের জন্য ধন্যবাদ।
          </p>
        </div>

        {/* Body Receipt Details */}
        <div className="p-6 space-y-4 text-xs text-slate-700">
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-amber-900 block">অর্ডার ট্র্যাকিং নম্বর (Order ID):</span>
              <span className="font-mono text-base font-bold text-slate-900">{order.id}</span>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-amber-900 block">পেমেন্ট মেথড:</span>
              <span className="font-bold text-emerald-800">ক্যাশ অন ডেলিভারি</span>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-3.5 space-y-2">
            <h4 className="font-bold text-slate-900 text-xs">গ্রাহকের ডেলিভারি বিবরণ:</h4>
            <div className="space-y-1 text-slate-600">
              <p><span className="font-medium text-slate-900">নাম:</span> {order.customerName}</p>
              <p><span className="font-medium text-slate-900">মোবাইল:</span> <span className="font-mono">{order.phone}</span></p>
              <p><span className="font-medium text-slate-900">ঠিকানা:</span> {order.address}</p>
              <p><span className="font-medium text-slate-900">ডেলিভারি এলাকা:</span> {order.zone === 'inside_dhaka' ? 'ঢাকার ভেতরে' : 'ঢাকার বাইরে'}</p>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-3.5 space-y-2">
            <h4 className="font-bold text-slate-900 text-xs">অর্ডারকৃত আইটেম:</h4>
            <div className="space-y-1.5 divide-y divide-slate-100">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between pt-1.5 first:pt-0">
                  <span>{item.productName} ({item.weight}) × {toBengaliNumber(item.quantity)}</span>
                  <span className="font-mono font-bold text-slate-900">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-slate-900 text-sm">
              <span>সর্বমোট প্রদেয়:</span>
              <span className="text-emerald-900 font-mono text-base">{formatPrice(order.total)}</span>
            </div>
          </div>

          {/* Customer action shortcuts */}
          <div className="space-y-2 pt-2">
            <a
              href={`https://wa.me/8801799001122?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <i className="fa-brands fa-whatsapp text-base"></i>
              <span>হোয়াটসঅ্যাপে দ্রুত কনফার্মেশন পাঠান</span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handlePrint}
                className="py-2 px-3 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg font-medium flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>রসিদ প্রিন্ট</span>
              </button>

              <button
                onClick={onClose}
                className="py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold flex items-center justify-center cursor-pointer"
              >
                আরো কেনাকাটা করুন
              </button>
            </div>
          </div>

          <p className="text-[11px] text-center text-slate-500 pt-1">
            কোনো জিজ্ঞাসা থাকলে কল করুন: <a href="tel:01799001122" className="text-emerald-800 font-bold underline">০১৭৯৯-০০১১২২</a>
          </p>
        </div>

      </div>
    </div>
  );
};
