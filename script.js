// ===== Menu data — apni dishes aur prices yahan badlein =====
const MENU = [
  { cat: "karahi", en: "Chicken Karahi", ur: "چکن کڑاہی", den: "Full, with fresh tomatoes and green chilli", dur: "فل، تازہ ٹماٹر اور ہری مرچ کے ساتھ", price: 1800 },
  { cat: "karahi", en: "Mutton Karahi", ur: "مٹن کڑاہی", den: "Full, cooked in desi ghee", dur: "فل، دیسی گھی میں تیار", price: 3200 },
  { cat: "karahi", en: "Chicken White Karahi", ur: "چکن وائٹ کڑاہی", den: "Creamy, mild and rich", dur: "کریمی اور ہلکی مصالحے دار", price: 2000 },
  { cat: "rice", en: "Chicken Biryani", ur: "چکن بریانی", den: "Single plate with raita and salad", dur: "سنگل پلیٹ، رائتہ اور سلاد کے ساتھ", price: 450 },
  { cat: "rice", en: "Mutton Pulao", ur: "مٹن پلاؤ", den: "Single plate, Shinwari style", dur: "سنگل پلیٹ، شنواری اسٹائل", price: 650 },
  { cat: "bbq", en: "Chicken Tikka", ur: "چکن تکہ", den: "Leg or chest piece", dur: "لیگ یا چیسٹ پیس", price: 450 },
  { cat: "bbq", en: "Seekh Kebab", ur: "سیخ کباب", den: "4 pieces, beef", dur: "4 عدد، بیف", price: 700 },
  { cat: "bbq", en: "Chicken Malai Boti", ur: "چکن ملائی بوٹی", den: "12 pieces", dur: "12 عدد", price: 950 },
  { cat: "bread", en: "Roghni Naan", ur: "روغنی نان", den: "Fresh from the tandoor", dur: "تندور سے تازہ", price: 80 },
  { cat: "bread", en: "Garlic Naan", ur: "گارلک نان", den: "With butter and garlic", dur: "مکھن اور لہسن کے ساتھ", price: 120 },
  { cat: "drinks", en: "Mint Margarita", ur: "منٹ مارگریٹا", den: "Chilled and fresh", dur: "ٹھنڈا اور تازہ", price: 300 },
  { cat: "drinks", en: "Lassi (Sweet / Salted)", ur: "لسی (میٹھی / نمکین)", den: "Large glass", dur: "بڑا گلاس", price: 250 },
];

const CATEGORIES = [
  { id: "all", en: "All", ur: "سب" },
  { id: "karahi", en: "Karahi", ur: "کڑاہی" },
  { id: "rice", en: "Rice", ur: "چاول" },
  { id: "bbq", en: "BBQ", ur: "باربی کیو" },
  { id: "bread", en: "Naan", ur: "نان" },
  { id: "drinks", en: "Drinks", ur: "مشروبات" },
];

// ===== Translations =====
const T = {
  en: {
    nav_home: "Home", nav_menu: "Menu", nav_about: "About", nav_contact: "Contact",
    hero_eyebrow: "Traditional Pakistani Food",
    hero_title: "Food that brings the family together",
    hero_text: "Fresh karahi, biryani, BBQ and naan — cooked daily with desi ghee and homemade masalas.",
    hero_cta_menu: "View Menu", hero_cta_order: "Order Now",
    menu_title: "Our Menu", menu_sub: "Prices in Pakistani Rupees",
    about_title: "About Us",
    about_text: "Dasterkhwan is a family restaurant serving the real taste of Pakistan. Every dish is made fresh in our kitchen, the way our elders taught us.",
    f1_title: "Fresh Daily", f1_text: "Cooked fresh every day",
    f2_title: "Homemade Masala", f2_text: "Our own spice blends",
    f3_title: "Family Seating", f3_text: "Comfortable space for families",
    contact_title: "Visit or Order",
    c_address: "Address", c_address_val: "Shahdara, Lahore",
    c_phone: "Phone", c_hours: "Hours", c_hours_val: "Daily: 12:00 PM – 12:00 AM",
    c_whatsapp: "Order on WhatsApp",
    footer: "All rights reserved",
    currency: "Rs.", langBtn: "اردو",
  },
  ur: {
    nav_home: "ہوم", nav_menu: "مینو", nav_about: "ہمارے بارے میں", nav_contact: "رابطہ",
    hero_eyebrow: "روایتی پاکستانی کھانے",
    hero_title: "وہ ذائقہ جو پورے خاندان کو ایک دسترخوان پر لے آئے",
    hero_text: "تازہ کڑاہی، بریانی، باربی کیو اور نان — روزانہ دیسی گھی اور گھر کے مصالحوں سے تیار۔",
    hero_cta_menu: "مینو دیکھیں", hero_cta_order: "ابھی آرڈر کریں",
    menu_title: "ہمارا مینو", menu_sub: "قیمتیں پاکستانی روپے میں",
    about_title: "ہمارے بارے میں",
    about_text: "دسترخوان ایک فیملی ریسٹورنٹ ہے جو پاکستان کا اصل ذائقہ پیش کرتا ہے۔ ہر ڈش ہمارے کچن میں تازہ تیار ہوتی ہے، بالکل ویسے جیسے ہمارے بزرگوں نے سکھایا۔",
    f1_title: "روزانہ تازہ", f1_text: "ہر روز تازہ پکایا جاتا ہے",
    f2_title: "گھر کا مصالحہ", f2_text: "ہمارے اپنے تیار کردہ مصالحے",
    f3_title: "فیملی ہال", f3_text: "فیملیز کے لیے آرام دہ جگہ",
    contact_title: "تشریف لائیں یا آرڈر کریں",
    c_address: "پتہ", c_address_val: "شاہدرہ، لاہور",
    c_phone: "فون", c_hours: "اوقات", c_hours_val: "روزانہ: دوپہر 12 بجے سے رات 12 بجے تک",
    c_whatsapp: "واٹس ایپ پر آرڈر کریں",
    footer: "جملہ حقوق محفوظ ہیں",
    currency: "روپے", langBtn: "English",
  },
};

let lang = "en";
let activeCat = "all";

function safeGet(key) { try { return localStorage.getItem(key); } catch { return null; } }
function safeSet(key, val) { try { localStorage.setItem(key, val); } catch {} }

function renderTabs() {
  const tabs = document.getElementById("menuTabs");
  tabs.innerHTML = "";
  CATEGORIES.forEach((c) => {
    const b = document.createElement("button");
    b.className = "tab" + (c.id === activeCat ? " active" : "");
    b.textContent = c[lang];
    b.onclick = () => { activeCat = c.id; renderTabs(); renderMenu(); };
    tabs.appendChild(b);
  });
}

function renderMenu() {
  const grid = document.getElementById("menuGrid");
  const items = MENU.filter((m) => activeCat === "all" || m.cat === activeCat);
  const cur = T[lang].currency;
  grid.innerHTML = items.map((m) => `
    <div class="menu-item">
      <div>
        <h3>${lang === "en" ? m.en : m.ur}</h3>
        <p>${lang === "en" ? m.den : m.dur}</p>
      </div>
      <span class="price">${lang === "en" ? cur + " " + m.price.toLocaleString() : m.price.toLocaleString() + " " + cur}</span>
    </div>`).join("");
}

function applyLang(l) {
  lang = l;
  const html = document.documentElement;
  html.lang = l;
  html.dir = l === "ur" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (T[l][key]) el.textContent = T[l][key];
  });
  document.getElementById("langBtn").textContent = T[l].langBtn;
  renderTabs();
  renderMenu();
  safeSet("dk-lang", l);
}

document.getElementById("langBtn").addEventListener("click", () => applyLang(lang === "en" ? "ur" : "en"));

const navLinks = document.getElementById("navLinks");
document.getElementById("menuToggle").addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => navLinks.classList.remove("open")));

document.getElementById("year").textContent = new Date().getFullYear();

applyLang(safeGet("dk-lang") === "ur" ? "ur" : "en");
