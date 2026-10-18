import { Product, Review, Order } from './types';

export const HERO_IMAGE = '/src/assets/images/hero_organic_grocery_1792295614028.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'gb-001',
    nameBn: 'ঘানি ভাঙা খাঁটি সরিষার তেল',
    nameEn: 'Cold Pressed Pure Mustard Oil',
    category: 'oil-ghee',
    price: 360,
    originalPrice: 420,
    weight: '১ লিটার বোতল',
    image: '/src/assets/images/product_mustard_oil_1792295614739.jpg',
    rating: 4.9,
    reviewsCount: 340,
    inStock: true,
    stockQuantity: 45,
    isFeatured: true,
    description: 'রাজশাহীর বাছাইকৃত লাল সরিষা থেকে কাঠের ঘানিতে ভাঙা খাঁটি সরিষার তেল। ঝাঁঝালো সুবাস, গাঢ় সোনালী বর্ণ এবং শতভাগ কেমিক্যালমুক্ত। ভর্তা, ভাজি বা রান্নায় অতুলনীয় স্বাদ।',
    features: ['কাঠের ঘানিতে ভাঙা কোল্ড প্রেসড', '১০০% ঝাঁঝালো ও প্রাকৃতিক', 'কোনো কৃত্রিম ফ্লেভার বা কেমিক্যাল নেই', 'কোলেস্টেরল মুক্ত ও হৃদযন্ত্রের জন্য উপকারী']
  },
  {
    id: 'gb-002',
    nameBn: 'সুন্দরবনের প্রাকৃতিক চাকের খাঁটি মধু',
    nameEn: 'Sundarban Raw Organic Wild Honey',
    category: 'honey',
    price: 850,
    originalPrice: 980,
    weight: '৫০০ গ্রাম কাঁচের জার',
    image: '/src/assets/images/product_sundarban_honey_1792295615079.jpg',
    rating: 5.0,
    reviewsCount: 420,
    inStock: true,
    stockQuantity: 38,
    isFeatured: true,
    description: 'সুন্দরবনের গভীর অরণ্যের বুনো ফুলের খাঁটি মধু, যা অভিজ্ঞ মৌয়ালদের মাধ্যমে সংগ্রহ করা হয়। আনফিল্টারড ও কাঁচা মধু হওয়ায় এতে প্রাকৃতিক পরাগরেণু এবং অ্যান্টিঅক্সিডেন্ট অক্ষুণ্ণ থাকে।',
    features: ['সুন্দরবনের বুনো ফুলের তাজা মধু', 'আনপাস্তুরিত ও কাঁচা (Raw Honey)', 'প্রাকৃতিক অ্যান্টিঅক্সিডেন্ট ও রোগ প্রতিরোধক', 'ল্যাব টেস্টে শতভাগ খাঁটি প্রমাণিত']
  },
  {
    id: 'gb-003',
    nameBn: 'খাঁটি গাওয়া ঘি (দানাযুক্ত ও সুবাসিত)',
    nameEn: 'Artisanal Pure Cow Milk Ghee',
    category: 'oil-ghee',
    price: 1150,
    originalPrice: 1350,
    weight: '৫০০ গ্রাম প্রিমিয়াম পট',
    image: '/src/assets/images/product_pure_cow_ghee_1792295616519.jpg',
    rating: 4.9,
    reviewsCount: 295,
    inStock: true,
    stockQuantity: 28,
    isFeatured: true,
    description: 'পাবনার চারণভূমির দেশি গরুর খাঁটি দুধের মাখন থেকে ঐতিহ্যবাহী পদ্ধতিতে প্রস্তুতকৃত সুস্বাদু গাওয়া ঘি। সোনালী দানাযুক্ত টেক্সচার এবং মন মাতানো সুবাস আপনার প্রতিটি খাবারকে করে তুলবে রাজকীয়।',
    features: ['দেশি গরুর দুধের নির্ভেজাল মাখন থেকে তৈরি', 'প্রাকৃতিক দানাযুক্ত ও মন জুড়ানো ঘ্রাণ', 'কোনো ডালডা বা পাম তেলের সংমিশ্রণ নেই', 'পোলাও, কাচ্চি ও মিষ্টি তৈরিতে সেরা']
  },
  {
    id: 'gb-004',
    nameBn: 'যশোরের স্পেশাল পাটালি খেজুরের গুড়',
    nameEn: 'Authentic Date Palm Patali Jaggery',
    category: 'sweets',
    price: 480,
    originalPrice: 580,
    weight: '১ কেজি সলিড প্যাক',
    image: '/src/assets/images/product_khejur_gur_1792295616042.jpg',
    rating: 4.8,
    reviewsCount: 210,
    inStock: true,
    stockQuantity: 50,
    isFeatured: true,
    description: 'যশোরের ঐতিহ্যবাহী গাছিদের সংগৃহীত তাজা খেজুরের রস থেকে তৈরি খাঁটি পাটালি গুড়। কোনো চিনি বা হাইড্রোজ ছাড়া সম্পূর্ণ প্রাকৃতিক উপায়ে জ্বাল দিয়ে তৈরি। শীতের পিঠা-পায়েসের জন্য অতুলনীয়।',
    features: ['চিনি ও হাইড্রোজ মুক্ত শতভাগ খাঁটি গুড়', 'তাজা খেজুর রসের আসল সুবাস ও স্বাদ', 'ঐতিহ্যবাহী গাছিদের হাতে মাটির চুলায় প্রস্তুত', 'পিঠা, পায়েস ও ক্ষীরের জন্য আবশ্যক']
  },
  {
    id: 'gb-005',
    nameBn: 'স্পেশাল খাসির মাংসের রোস্টেড মসলা',
    nameEn: 'Special Roasted Mutton Spice Blend',
    category: 'nuts-spices',
    price: 290,
    originalPrice: 350,
    weight: '২০০ গ্রাম এয়ারটাইট প্যাক',
    image: '/src/assets/images/product_meat_masala_1792295677754.jpg',
    rating: 4.9,
    reviewsCount: 185,
    inStock: true,
    stockQuantity: 65,
    isFeatured: false,
    description: '১৬টি খাঁটি আস্ত মসলা পরিমিত তাপে ভেজে গুঁড়ো করে তৈরি বিশেষ মিট মসলা। শাহী এলাচ, দারুচিনি, জয়ফল, জয়ত্রী ও কাশ্মীরি লঙ্কার অনন্য মিশ্রণ যা খাসির রেজালা বা ভুনাতে এনে দেয় খাঁটি ঘরোয়া বাবুর্চি স্বাদ।',
    features: ['১৬টি প্রিমিয়াম আস্ত মসলার ফর্মুলা', 'ধীর তাপে রোস্ট করে টাটকা প্যাক করা', 'কৃত্রিম রং বা টেস্টিং সল্ট মুক্ত', 'মাংস রান্নায় অতিরিক্ত গরম মসলা দেয়ার প্রয়োজন নেই']
  },
  {
    id: 'gb-006',
    nameBn: 'প্রিমিয়াম অর্গানিক ড্রাই ফ্রুটস ও বাদাম মিক্স',
    nameEn: 'Premium Mixed Organic Nuts & Berries',
    category: 'nuts-spices',
    price: 920,
    originalPrice: 1100,
    weight: '৫০০ গ্রাম জিপলক জার',
    image: '/src/assets/images/product_organic_nuts_1792295677549.jpg',
    rating: 5.0,
    reviewsCount: 310,
    inStock: true,
    stockQuantity: 32,
    isFeatured: false,
    description: 'কাজুবাদাম, কাঠবাদাম, পেস্তাবাদাম, আখরোট, কিশমিশ এবং ক্র্যানবেরির সুষম মিশ্রণ। স্বাস্থ্য সচেতনদের জন্য সকালের নাস্তা বা শরীরচর্চার পর আদর্শ পুষ্টিকর খাবার।',
    features: ['৮ ধরনের প্রিমিয়াম বাদাম ও বেরির মিশ্রণ', '১০০% রোস্টেড ও লবণবিহীন প্রাকৃতিক স্বাদ', 'ওমেগা-৩ ও প্রাকৃতিক প্রোটিনে ভরপুর', 'এয়ারটাইট ফুডগ্রেড জিপলক প্যাকেজিং']
  },
  {
    id: 'gb-007',
    nameBn: 'কোল্ড প্রেসড খাঁটি কালোজিরা তেল',
    nameEn: 'Pure Cold Pressed Black Seed Oil',
    category: 'oil-ghee',
    price: 450,
    originalPrice: 520,
    weight: '১০০ মিলি ড্রপার বোতল',
    image: '/src/assets/images/product_kalojira_oil_1792295677255.jpg',
    rating: 4.9,
    reviewsCount: 198,
    inStock: true,
    stockQuantity: 40,
    isFeatured: false,
    description: 'দেশি বাছাইকৃত কালোজিরা থেকে সরাসরি কোল্ড প্রেস পদ্ধতিতে তৈরি শতভাগ খাঁটি কালোজিরার তেল। নানা রোগ নিরাময় এবং ত্বকের যত্নে এর কার্যকারিতা সর্বজনবিদিত।',
    features: ['১০০% কোল্ড প্রেসড আনরিফাইন্ড তেল', 'প্রাকৃতিক থাইমোকুইনোন সমৃদ্ধ', 'রোগ প্রতিরোধ ক্ষমতা বৃদ্ধিতে সহায়ক', 'চুল ও ত্বকের যত্নে উপকারী']
  },
  {
    id: 'gb-008',
    nameBn: 'প্রিমিয়াম মরিয়ম খেঁজুর (সৌদি আরব)',
    nameEn: 'Premium Maryam Organic Dates',
    category: 'sweets',
    price: 750,
    originalPrice: 880,
    weight: '১ কেজি অরিজিনাল প্যাক',
    image: '/src/assets/images/product_organic_nuts_1792295677549.jpg',
    rating: 4.8,
    reviewsCount: 165,
    inStock: true,
    stockQuantity: 35,
    isFeatured: false,
    description: 'মদিনার বাগান থেকে সরাসরি সংগৃহীত তাজা ও রসালো মরিয়ম খেজুর। নরম মাংসল টেক্সচার, প্রাকৃতিক মিষ্টি এবং চমৎকার পুষ্টিমানে সমৃদ্ধ।',
    features: ['সরাসরি মদিনা থেকে আমদানিকৃত', 'কোনো কৃত্রিম সুগার বা রাসায়নিক দেওয়া নেই', 'ফাইবার ও আয়রনে ভরপুর এনার্জির উৎস', 'রমজান ও সারা বছরের জন্য আদর্শ পুষ্টি']
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'তানভীর আহমেদ',
    location: 'ধানমন্ডি, ঢাকা',
    rating: 5,
    comment: 'ঘানি ভাঙা সরিষার তেলটার ঝাঁঝ অসাধারণ! কাঁচা তেল দিয়ে আলু ভর্তা খাওয়ার যে তৃপ্তি তা অনেকদিন পর পেলাম। ঘরের বাজারের প্যাকেজিং এবং ডেলিভারি স্পিড প্রশংসার দাবিদার।',
    productName: 'ঘানি ভাঙা খাঁটি সরিষার তেল',
    date: '২ দিন আগে',
    verified: true
  },
  {
    id: 'rev-2',
    name: 'ফারহানা ইসলাম চৌধুরী',
    location: 'পাঁচলাইশ, চট্টগ্রাম',
    rating: 5,
    comment: 'সুন্দরবনের মধুটা আসলেও খাঁটি। ফ্রিজে রেখে এবং পানিতে ফেলে টেস্ট করেছি, একটুও ভেজাল নেই। বাচ্চাদের প্রতিদিন দুধের সাথে দিয়ে থাকি। নিশ্চিত হয়ে খাওয়া যায়।',
    productName: 'সুন্দরবনের প্রাকৃতিক চাকের খাঁটি মধু',
    date: '১ সপ্তাহ আগে',
    verified: true
  },
  {
    id: 'rev-3',
    name: 'মুহাম্মদ রফিকুল আলম',
    location: 'উপশহর, সিলেট',
    rating: 5,
    comment: 'গাওয়া ঘিয়ের সুবাসটা পুরো ঘর ছড়িয়ে গিয়েছিল পট খোলার সাথে সাথেই! ভাতের সাথে গরম ঘি আর শুঁটকি ভর্তা—অতুলনীয় ছিল। ক্যাশ অন ডেলিভারিতে চেক করে নিতে পেরেছি।',
    productName: 'খাঁটি গাওয়া ঘি',
    date: '৩ দিন আগে',
    verified: true
  },
  {
    id: 'rev-4',
    name: 'নাসরিন আক্তার রীমা',
    location: 'উত্তরা, ঢাকা',
    rating: 5,
    comment: 'শীতের শুরুতেই যশোরের পাটালি গুড় নিলাম। পাটিসাপটা ও ভাপা পিঠা বানিয়েছি, একদম আসল খেজুর রসের মিষ্টি স্বাদ। ধন্যবাদ ঘরের বাজার টিমকে এমন খাঁটি পণ্য সরবরাহের জন্য।',
    productName: 'যশোরের স্পেশাল পাটালি খেজুরের গুড়',
    date: '৫ দিন আগে',
    verified: true
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'GB-9841',
    customerName: 'মাহবুবুর রহমান',
    phone: '01711223344',
    address: 'বাড়ি নং ১২, রোড নং ৫, ব্লক-ডি, মিরপুর-২, ঢাকা',
    zone: 'inside_dhaka',
    deliveryFee: 70,
    items: [
      {
        productId: 'gb-001',
        productName: 'ঘানি ভাঙা খাঁটি সরিষার তেল',
        quantity: 2,
        price: 360,
        weight: '১ লিটার বোতল'
      },
      {
        productId: 'gb-003',
        productName: 'খাঁটি গাওয়া ঘি',
        quantity: 1,
        price: 1150,
        weight: '৫০০ গ্রাম প্রিমিয়াম পট'
      }
    ],
    subtotal: 1870,
    total: 1940,
    paymentMethod: 'cod',
    notes: 'বিকেল ৪টার পর ডেলিভারি দিলে ভালো হয়।',
    status: 'delivered',
    createdAt: '2026-10-15T14:32:00'
  },
  {
    id: 'gb-9842',
    customerName: 'শারমিন সুলতানা',
    phone: '01822334455',
    address: 'সবুজবাগ আবাসিক এলাকা, নাসিরাবাদ, চট্টগ্রাম',
    zone: 'outside_dhaka',
    deliveryFee: 130,
    items: [
      {
        productId: 'gb-002',
        productName: 'সুন্দরবনের প্রাকৃতিক চাকের খাঁটি মধু',
        quantity: 1,
        price: 850,
        weight: '৫০০ গ্রাম কাঁচের জার'
      },
      {
        productId: 'gb-004',
        productName: 'যশোরের স্পেশাল পাটালি খেজুরের গুড়',
        quantity: 2,
        price: 480,
        weight: '১ কেজি সলিড প্যাক'
      }
    ],
    subtotal: 1810,
    total: 1940,
    paymentMethod: 'cod',
    notes: 'দয়া করে কাঁচের জার ভালো করে বাবল র‍্যাপ করে পাঠাবেন।',
    status: 'processing',
    createdAt: '2026-10-17T09:15:00'
  }
];
