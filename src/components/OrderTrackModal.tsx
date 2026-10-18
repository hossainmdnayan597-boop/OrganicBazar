import React, { useState } from 'react';
import { Order } from '../types';
import { formatPrice, toBengaliNumber } from '../utils/format';
import { X, Search, Clock, CheckCircle2, Truck, Package, AlertCircle } from 'lucide-react';

interface OrderTrackModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export const OrderTrackModal: React.FC<OrderTrackModalProps> = ({ isOpen, onClose, orders }) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const [matchedOrder, setMatchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return;

    const found = orders.find(
      (o) =>
        o.id.toLowerCase() === cleanQuery ||
        o.phone.includes(cleanQuery) ||
        o.customerName.toLowerCase().includes(cleanQuery)
    );

    setMatchedOrder(found || null);
    setHasSearched(true);
  };

  const statusSteps = [
    { key: 'pending', label: 'অর্ডার গৃহীত', desc: 'অর্ডারটি সিস্টেমে সংরক্ষিত হয়েছে' },
    { key: 'processing', label: 'প্রস্তুতকরণ', desc: 'পণ্য প্যাকেটজাত করা হচ্ছে' },
    { key: 'shipped', label: 'ডেলিভারিতে চলমান', desc: 'ডেলিভারি রাইডারের নিকট হস্তান্তর' },
    { key: 'delivered', label: 'সফল ডেলিভারি', desc: 'গ্রাহকের নিকট হস্তান্তর সম্পন্ন' },
  ];

  const getStepIndex = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 0;
      case 'processing':
        return 1;
      case 'shipped':
        return 2;
      case 'delivered':
        return 3;
      case 'cancelled':
        return -1;
      default:
        return 0;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-4 bg-emerald-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold">অর্ডার ট্র্যাকিং সিস্টেম</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-300 hover:text-white rounded-lg hover:bg-emerald-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 space-y-4">
          <form onSubmit={handleSearch} className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 block">
              আপনার অর্ডার আইডি (যেমন: GB-9841) অথবা ১১ ডিজিটের মোবাইল নম্বর দিন:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="GB-XXXX অথবা 01712345678"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
                className="flex-1 px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700 font-mono"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-800 text-white text-xs font-bold rounded-lg hover:bg-emerald-900 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>খুঁজুন</span>
              </button>
            </div>
          </form>

          {/* Results Area */}
          {hasSearched && matchedOrder && (
            <div className="space-y-4 pt-2 border-t border-slate-100 text-xs text-slate-700">
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 block">অর্ডার আইডি:</span>
                  <span className="font-mono text-base font-bold text-slate-900">
                    {matchedOrder.id}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-500 block">স্ট্যাটাস:</span>
                  <span className="font-bold text-emerald-800 text-sm">
                    {matchedOrder.status === 'pending' && 'অপেক্ষমান'}
                    {matchedOrder.status === 'processing' && 'প্রক্রিয়াধীন'}
                    {matchedOrder.status === 'shipped' && 'ডেলিভারিতে আছে'}
                    {matchedOrder.status === 'delivered' && 'ডেলিভারি সম্পন্ন'}
                    {matchedOrder.status === 'cancelled' && 'বাতিল করা হয়েছে'}
                  </span>
                </div>
              </div>

              {/* Progress Stepper */}
              {matchedOrder.status !== 'cancelled' ? (
                <div className="py-2 space-y-3">
                  {statusSteps.map((step, idx) => {
                    const currentStepIdx = getStepIndex(matchedOrder.status);
                    const isCompleted = currentStepIdx >= idx;
                    const isCurrent = currentStepIdx === idx;

                    return (
                      <div key={step.key} className="flex items-start gap-3">
                        <div className="relative flex flex-col items-center">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                              isCompleted
                                ? 'bg-emerald-700 text-white shadow-xs'
                                : 'bg-slate-200 text-slate-500'
                            }`}
                          >
                            {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                          </div>
                          {idx < statusSteps.length - 1 && (
                            <div
                              className={`w-0.5 h-6 mt-1 ${
                                currentStepIdx > idx ? 'bg-emerald-600' : 'bg-slate-200'
                              }`}
                            />
                          )}
                        </div>
                        <div className="pt-0.5">
                          <p className={`font-bold ${isCurrent ? 'text-emerald-900' : 'text-slate-800'}`}>
                            {step.label}
                          </p>
                          <p className="text-[11px] text-slate-500">{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  অর্ডারটি বাতিল করা হয়েছে। বিস্তারিত জানতে আমাদের কাস্টমার কেয়ারে যোগাযোগ করুন।
                </div>
              )}

              {/* Summary */}
              <div className="bg-slate-50 p-3 rounded-lg space-y-1 text-slate-600">
                <p><span className="font-semibold text-slate-900">গ্রাহক:</span> {matchedOrder.customerName}</p>
                <p><span className="font-semibold text-slate-900">ঠিকানা:</span> {matchedOrder.address}</p>
                <p><span className="font-semibold text-slate-900">মোট টাকা:</span> <span className="font-mono font-bold text-slate-900">{formatPrice(matchedOrder.total)}</span> (ক্যাশ অন ডেলিভারি)</p>
              </div>
            </div>
          )}

          {hasSearched && !matchedOrder && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-center space-y-2 text-xs text-amber-900">
              <AlertCircle className="w-6 h-6 text-amber-600 mx-auto" />
              <p className="font-bold">কোনো অর্ডার খুঁজে পাওয়া যায়নি</p>
              <p className="text-slate-600">
                দয়া করে সঠিক অর্ডার আইডি অথবা অর্ডার করার সময় ব্যবহৃত মোবাইল নম্বরটি দিন।
              </p>
            </div>
          )}

          <div className="pt-2 text-center text-xs text-slate-500">
            জরুরি প্রয়োজনে ফোন করুন: <a href="tel:01799001122" className="text-emerald-800 font-bold underline">০১৭৯৯-০০১১২২</a>
          </div>
        </div>

      </div>
    </div>
  );
};
