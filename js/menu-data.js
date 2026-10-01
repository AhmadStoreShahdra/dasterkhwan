/* =========================================================
   Dasterkhwan — menu data (sample)
   ---------------------------------------------------------
   To ADD a dish:    copy one item block, give it a new unique `id`.
   To REMOVE a dish: delete its block (or set available: false).
   To show on the home page "Popular" list: set popular: true.
   Prices are in PKR (numbers only, no commas).

   Later, an admin panel / API can replace this file — the rest of
   the site only reads DK.categories and DK.menuItems.
   ========================================================= */
window.DK = window.DK || {};

// Unsplash helper: returns a resized, compressed image URL.
DK.img = (id, w = 600, h = 450) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=70`;

DK.categories = [
  { id: "biryani", nameUr: "بریانی",       nameEn: "Biryani",     icon: "🍛", image: DK.img("1589302168068-964664d93dc0", 500, 500) },
  { id: "karahi",  nameUr: "کڑاہی",        nameEn: "Karahi",      icon: "🍲", image: DK.img("1708782340793-ec5f2159a689", 500, 500) },
  { id: "bbq",     nameUr: "BBQ",          nameEn: "BBQ",         icon: "🍗", image: DK.img("1599487488170-d11ec9c172f0", 500, 500) },
  { id: "desi",    nameUr: "دیسی کھانے",   nameEn: "Desi Dishes", icon: "🥘", image: DK.img("1710091691780-c7eb0dc50cf8", 500, 500) },
  { id: "bread",   nameUr: "نان / روٹی",   nameEn: "Naan / Roti", icon: "🫓", image: DK.img("1640625314547-aee9a7696589", 500, 500) },
  { id: "drinks",  nameUr: "مشروبات",      nameEn: "Drinks",      icon: "🥤", image: DK.img("1623065422902-30a2d299bbe4", 500, 500) },
];

DK.menuItems = [
  // ---- Biryani ----
  { id: "chicken-biryani", category: "biryani", name: "Chicken Biryani", nameUr: "چکن بریانی",
    description: "خوشبودار باسمتی چاول، نرم چکن اور خاص مصالحے — رائتہ اور سلاد کے ساتھ",
    price: 450, image: DK.img("1631515243349-e0cb75fb8d3a"), popular: true, available: true },
  { id: "mutton-biryani", category: "biryani", name: "Mutton Biryani", nameUr: "مٹن بریانی",
    description: "دم پخت مٹن بریانی، تازہ پودینے اور تلی ہوئی پیاز کے ساتھ",
    price: 750, image: DK.img("1563379091339-03b21ab4a4f8"), popular: false, available: true },
  { id: "mutton-pulao", category: "biryani", name: "Mutton Pulao", nameUr: "مٹن پلاؤ",
    description: "یخنی میں پکا ہوا شنواری طرز کا لذیذ پلاؤ",
    price: 650, image: DK.img("1633945274405-b6c8069047b0"), popular: false, available: true },

  // ---- Karahi ----
  { id: "chicken-karahi", category: "karahi", name: "Chicken Karahi", nameUr: "چکن کڑاہی",
    description: "تازہ مصالحوں کے ساتھ تیار کردہ مزیدار چکن کڑاہی",
    price: 1250, image: DK.img("1603496987351-f84a3ba5ec85"), popular: true, available: true },
  { id: "mutton-karahi", category: "karahi", name: "Mutton Karahi", nameUr: "مٹن کڑاہی",
    description: "دیسی گھی میں بھونی ہوئی نرم مٹن کڑاہی، ادرک اور ہری مرچ کے ساتھ",
    price: 2400, image: DK.img("1545247181-516773cae754"), popular: true, available: true },
  { id: "white-karahi", category: "karahi", name: "Chicken White Karahi", nameUr: "چکن وائٹ کڑاہی",
    description: "کریمی، ہلکے مصالحے والی شاہی وائٹ کڑاہی",
    price: 1450, image: DK.img("1694579740719-0e601c5d2437"), popular: false, available: true },

  // ---- BBQ ----
  { id: "chicken-tikka", category: "bbq", name: "Chicken Tikka", nameUr: "چکن تکہ",
    description: "کوئلوں پر سینکا ہوا رسیلا چکن تکہ، چٹنی کے ساتھ",
    price: 550, image: DK.img("1605908580297-f3e1c02e64ff"), popular: true, available: true },
  { id: "seekh-kebab", category: "bbq", name: "Seekh Kebab", nameUr: "سیخ کباب",
    description: "4 عدد بیف سیخ کباب — نرم، مصالحے دار اور دھوئیں کی خوشبو والے",
    price: 700, image: DK.img("1599487488170-d11ec9c172f0"), popular: false, available: true },
  { id: "malai-boti", category: "bbq", name: "Chicken Malai Boti", nameUr: "چکن ملائی بوٹی",
    description: "کریم اور ہلکے مصالحوں میں میرینیٹ کی گئی 12 عدد ملائی بوٹیاں",
    price: 950, image: DK.img("1781332143834-19a40f746cd9"), popular: true, available: true },

  // ---- Desi ----
  { id: "butter-chicken", category: "desi", name: "Butter Chicken", nameUr: "بٹر چکن",
    description: "مکھن اور ٹماٹر کی گاڑھی گریوی میں نرم چکن",
    price: 1100, image: DK.img("1603894584373-5ac82b2ae398"), popular: false, available: true },
  { id: "nihari", category: "desi", name: "Beef Nihari", nameUr: "بیف نہاری",
    description: "رات بھر دھیمی آنچ پر پکی ہوئی روایتی نہاری",
    price: 600, image: DK.img("1596797038530-2c107229654b"), popular: true, available: true },
  { id: "daal-mash", category: "desi", name: "Daal Mash", nameUr: "دال ماش",
    description: "دیسی گھی کے تڑکے والی گاڑھی دال ماش",
    price: 400, image: DK.img("1631292784640-2b24be784d5d"), popular: false, available: true },

  // ---- Bread ----
  { id: "roghni-naan", category: "bread", name: "Roghni Naan", nameUr: "روغنی نان",
    description: "تندور سے تازہ، تل والا نرم روغنی نان",
    price: 80, image: DK.img("1611107415406-1c12f8cda424"), popular: false, available: true },
  { id: "garlic-naan", category: "bread", name: "Garlic Naan", nameUr: "گارلک نان",
    description: "مکھن اور لہسن کے ساتھ گرم گرم نان",
    price: 120, image: DK.img("1640625314547-aee9a7696589"), popular: false, available: true },
  { id: "tandoori-roti", category: "bread", name: "Tandoori Roti", nameUr: "تندوری روٹی",
    description: "گندم کے آٹے کی تازہ تندوری روٹی",
    price: 30, image: DK.img("1697155406014-04dc649b0953"), popular: false, available: true },

  // ---- Drinks ----
  { id: "mango-lassi", category: "drinks", name: "Mango Lassi", nameUr: "مینگو لسی",
    description: "تازہ آم اور دہی سے بنی ٹھنڈی لسی",
    price: 350, image: DK.img("1623065422902-30a2d299bbe4"), popular: false, available: true },
  { id: "mint-margarita", category: "drinks", name: "Mint Margarita", nameUr: "منٹ مارگریٹا",
    description: "پودینے اور لیموں کا تازگی بھرا مشروب",
    price: 300, image: DK.img("1507281549113-040fcfef650e"), popular: false, available: true },
  { id: "soft-drink", category: "drinks", name: "Soft Drink (500ml)", nameUr: "سافٹ ڈرنک",
    description: "ٹھنڈی بوتل — اپنی پسند کا فلیور",
    price: 150, image: "", popular: false, available: true },
];
