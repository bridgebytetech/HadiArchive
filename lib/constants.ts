export const SITE_CONFIG = {
  name: {
    bn: "শহীদ ওসমান হাদির স্মৃতি সংগ্রহশালা",
    en: "Shaheed Osman Hadi Memorial",
  },
  shortName: {
    bn: "ওসমান হাদি মেমোরিয়াল",
    en: "Osman Hadi Memorial",
  },
  description: {
    bn: "শহীদ শরীফ ওসমান বিন হাদির জীবন, কর্ম ও আদর্শের ডিজিটাল সংগ্রহশালা",
    en: "Digital archive of Shaheed Sharif Osman Bin Hadi's life, work and ideals",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://shaheedosmanhadir.org",
};

export const OSMAN_HADI_INFO = {
  fullName: {
    bn: "শরীফ ওসমান বিন হাদি",
    en: "Sharif Osman Bin Hadi",
  },
  birthName: {
    bn: "ওসমান গণি",
    en: "Osman Goni",
  },
  birthDate: "1993-06-30",
  birthPlace: {
    bn: "নলছিটি, ঝালকাঠি, বাংলাদেশ",
    en: "Nalchiti, Jhalokati, Bangladesh",
  },
  martyrdomDate: "2025-12-18",
  martyrdomPlace: {
    bn: "সিঙ্গাপুর জেনারেল হাসপাতাল",
    en: "Singapore General Hospital",
  },
  burialPlace: {
    bn: "ঢাকা বিশ্ববিদ্যালয় কেন্দ্রীয় মসজিদ প্রাঙ্গণ",
    en: "Dhaka University Central Mosque",
  },
role: {
  bn: "বিপ্লবী জুলাই যোদ্ধা ও ইনকিলাব মঞ্চের মুখপাত্র",
  en: "Revolutionary July Fighter & Spokesperson of Inqilab Moncho",
},
};

export const VIDEO_TYPES = [
  { value: "SPEECH", labelBn: "বক্তৃতা", labelEn: "Speech" },
  { value: "INTERVIEW", labelBn: "সাক্ষাৎকার", labelEn: "Interview" },
  { value: "DOCUMENTARY", labelBn: "প্রামাণ্যচিত্র", labelEn: "Documentary" },
  { value: "NEWS", labelBn: "সংবাদ", labelEn: "News" },
  { value: "RALLY", labelBn: "সমাবেশ", labelEn: "Rally" },
  { value: "TRIBUTE", labelBn: "শ্রদ্ধাঞ্জলি", labelEn: "Tribute" },
  { value: "OTHER", labelBn: "অন্যান্য", labelEn: "Other" },
];

export const PHOTO_TYPES = [
  { value: "POLITICAL", labelBn: "রাজনৈতিক", labelEn: "Political" },
  { value: "PERSONAL", labelBn: "ব্যক্তিগত", labelEn: "Personal" },
  { value: "FAMILY", labelBn: "পারিবারিক", labelEn: "Family" },
  { value: "EDUCATIONAL", labelBn: "শিক্ষা", labelEn: "Educational" },
  { value: "RALLY", labelBn: "সমাবেশ", labelEn: "Rally" },
  { value: "JANAZA", labelBn: "জানাযা", labelEn: "Janaza" },
  { value: "MEMORIAL", labelBn: "স্মরণ", labelEn: "Memorial" },
  { value: "OTHER", labelBn: "অন্যান্য", labelEn: "Other" },
];

export const POSTER_TYPES = [
  { value: "POSTER", labelBn: "পোস্টার", labelEn: "Poster" },
  { value: "TYPOGRAPHY", labelBn: "টাইপোগ্রাফি", labelEn: "Typography" },
  { value: "EDITED", labelBn: "এডিটেড", labelEn: "Edited" },
  { value: "BANNER", labelBn: "ব্যানার", labelEn: "Banner" },
  { value: "SOCIAL_MEDIA", labelBn: "সোশ্যাল মিডিয়া", labelEn: "Social Media" },
];


export const EVENT_TYPES = [
  { value: "JANAZA", labelBn: "জানাযা", labelEn: "Janaza" },
  { value: "BURIAL", labelBn: "দাফন", labelEn: "Burial" },
  { value: "MEMORIAL", labelBn: "স্মরণসভা", labelEn: "Memorial" },
  { value: "ANNIVERSARY", labelBn: "বার্ষিকী", labelEn: "Anniversary" },
  { value: "PROTEST", labelBn: "প্রতিবাদ", labelEn: "Protest" },
  { value: "OTHER", labelBn: "অন্যান্য", labelEn: "Other" },
];

export const TIMELINE_EVENT_TYPES = [
  { value: "BIRTH", labelBn: "জন্ম", labelEn: "Birth" },
  { value: "EDUCATION", labelBn: "শিক্ষা", labelEn: "Education" },
  { value: "CAREER", labelBn: "কর্মজীবন", labelEn: "Career" },
  { value: "POLITICAL", labelBn: "রাজনৈতিক", labelEn: "Political" },
  { value: "MOVEMENT", labelBn: "আন্দোলন", labelEn: "Movement" },
  { value: "ACHIEVEMENT", labelBn: "অর্জন", labelEn: "Achievement" },
  { value: "MARTYRDOM", labelBn: "শাহাদাত", labelEn: "Martyrdom" },
  { value: "OTHER", labelBn: "অন্যান্য", labelEn: "Other" },
];

export const TRIBUTE_TYPES = [
  { value: "MEMORY", labelBn: "স্মৃতিচারণ", labelEn: "Memory" },
  { value: "MESSAGE", labelBn: "বার্তা", labelEn: "Message" },
  { value: "POEM", labelBn: "কবিতা", labelEn: "Poem" },
  { value: "PRAYER", labelBn: "দোয়া", labelEn: "Prayer" },
];

export const WRITING_TYPES = [
  { value: "ARTICLE", labelBn: "প্রবন্ধ", labelEn: "Article" },
  { value: "COLUMN", labelBn: "কলাম", labelEn: "Column" },
  { value: "ESSAY", labelBn: "রচনা", labelEn: "Essay" },
  { value: "STATEMENT", labelBn: "বিবৃতি", labelEn: "Statement" },
  { value: "OTHER", labelBn: "অন্যান্য", labelEn: "Other" },
];

export const SOCIAL_PLATFORMS = [
  { value: "FACEBOOK", labelBn: "ফেসবুক", labelEn: "Facebook" },
  { value: "TWITTER", labelBn: "টুইটার/এক্স", labelEn: "Twitter/X" },
  { value: "YOUTUBE", labelBn: "ইউটিউব", labelEn: "YouTube" },
  { value: "INSTAGRAM", labelBn: "ইনস্টাগ্রাম", labelEn: "Instagram" },
];

export const ADMIN_ROLES = [
  { value: "SUPER_ADMIN", label: "Super Admin" },
  { value: "ADMIN", label: "Admin" },
  { value: "EDITOR", label: "Editor" },
];

export const NAV_ITEMS = [
  { href: "/", labelBn: "হোম", labelEn: "Home" },
  { href: "/about", labelBn: "জীবনী", labelEn: "Biography" },
  { href: "/videos", labelBn: "ভিডিও", labelEn: "Videos" },
  { href: "/photos", labelBn: "ছবি", labelEn: "Photos" },
  { href: "/speeches", labelBn: "বক্তৃতা", labelEn: "Speeches" },
  { href: "/writings", labelBn: "লেখালেখি", labelEn: "Writings" },
  { href: "/timeline", labelBn: "টাইমলাইন", labelEn: "Timeline" },
  { href: "/events", labelBn: "ইভেন্ট", labelEn: "Events" },
  { href: "/tributes", labelBn: "শ্রদ্ধাঞ্জলি", labelEn: "Tributes" },
];

export const ADMIN_NAV_ITEMS = [
  { href: "/admin/dashboard", icon: "LayoutDashboard", label: "Dashboard" },
  { href: "/admin/videos", icon: "Video", label: "Videos" },
  { href: "/admin/photos", icon: "Image", label: "Photos" },
  { href: "/admin/audios", icon: "Music", label: "Audios" },
  { href: "/admin/speeches", icon: "Mic", label: "Speeches" },
  { href: "/admin/writings", icon: "FileText", label: "Writings" },
  { href: "/admin/poems", icon: "BookOpen", label: "Poems" },
  { href: "/admin/quotes", icon: "Quote", label: "Quotes" },
  { href: "/admin/news", icon: "Newspaper", label: "News" },
  { href: "/admin/timeline", icon: "Clock", label: "Timeline" },
  { href: "/admin/locations", icon: "MapPin", label: "Locations" },
  { href: "/admin/events", icon: "Calendar", label: "Events" },
  { href: "/admin/tributes", icon: "Heart", label: "Tributes" },
  { href: "/admin/requests", icon: "Inbox", label: "Requests" },
  { href: "/admin/social-posts", icon: "Share2", label: "Social Posts" },
  { href: "/admin/documents", icon: "File", label: "Documents" },
  { href: "/admin/settings", icon: "Settings", label: "Settings" },
  { href: "/admin/admins", icon: "Users", label: "Admins" },
];
