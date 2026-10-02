/* =========================================================
   Dasterkhwan — home page UI
   Reads DK.config, DK.categories, DK.menuItems, DK.cart, DK.order.
   ========================================================= */
(function () {
  const { config, categories, menuItems, cart, order } = DK;
  const $ = (sel, root = document) => root.querySelector(sel);
  const fmt = order.formatPrice;
  const POPULAR = "popular";
  let activeTab = POPULAR;

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const categoryById = (id) => categories.find((c) => c.id === id);
  const visibleItems = () => menuItems.filter((m) => m.available !== false);

  /* ---------- Shared image markup (falls back to an emoji tile) ---------- */
  function imageHtml(src, alt, icon, cls) {
    const fallback = `<span class="img-fallback" aria-hidden="true">${icon || "🍽️"}</span>`;
    if (!src) return `<div class="${cls} no-img">${fallback}</div>`;
    return `<div class="${cls}">${fallback}<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async" onerror="this.remove()"></div>`;
  }

  /* ---------- Categories ---------- */
  function renderCategories() {
    $("#categoryGrid").innerHTML = categories.map((c) => {
      const count = visibleItems().filter((m) => m.category === c.id).length;
      return `
        <a class="category-card" href="#menu" data-cat="${esc(c.id)}">
          ${imageHtml(c.image, c.nameEn, c.icon, "category-img")}
          <span class="category-info">
            <span class="category-icon" aria-hidden="true">${c.icon}</span>
            <span class="category-name">${esc(c.nameUr)}</span>
            <span class="category-count">${count} items</span>
          </span>
        </a>`;
    }).join("");

    $("#footerCategories").innerHTML = categories.map((c) =>
      `<li><a href="#menu" data-cat="${esc(c.id)}">${esc(c.nameUr)}</a></li>`).join("");
  }

  /* ---------- Menu tabs + dish cards ---------- */
  function renderTabs() {
    const tabs = [{ id: POPULAR, nameUr: "مقبول", icon: "⭐" }, ...categories];
    $("#menuTabs").innerHTML = tabs.map((t) => `
      <button class="tab${t.id === activeTab ? " active" : ""}" role="tab"
        aria-selected="${t.id === activeTab}" data-tab="${esc(t.id)}">
        <span aria-hidden="true">${t.icon}</span> ${esc(t.nameUr)}
      </button>`).join("");
  }

  function dishCard(item) {
    const cat = categoryById(item.category);
    return `
      <article class="dish-card" data-id="${esc(item.id)}">
        ${imageHtml(item.image, item.name, cat && cat.icon, "dish-img")}
        ${item.popular ? `<span class="dish-badge">مقبول</span>` : ""}
        <div class="dish-body">
          <div class="dish-head">
            <h3 class="dish-name ltr">${esc(item.name)}</h3>
            <span class="dish-name-ur">${esc(item.nameUr)}</span>
          </div>
          <p class="dish-desc">${esc(item.description)}</p>
          <div class="dish-price ltr">${fmt(item.price)}</div>
          <div class="dish-actions">
            <div class="qty" role="group" aria-label="Quantity for ${esc(item.name)}">
              <button type="button" class="qty-btn" data-qty="-1" aria-label="Decrease">−</button>
              <span class="qty-val" aria-live="polite">1</span>
              <button type="button" class="qty-btn" data-qty="1" aria-label="Increase">+</button>
            </div>
            <button type="button" class="btn btn-primary add-btn" data-add>
              <span class="ltr">Add to Cart</span>
            </button>
          </div>
        </div>
      </article>`;
  }

  function renderDishes() {
    const items = activeTab === POPULAR
      ? visibleItems().filter((m) => m.popular).slice(0, 6)
      : visibleItems().filter((m) => m.category === activeTab);

    const cat = categoryById(activeTab);
    $("#menuKicker").textContent = cat ? cat.nameEn : "Popular Dishes";
    $("#menuTitle").textContent = cat ? cat.nameUr : "ہماری مقبول ڈشز";

    $("#dishGrid").innerHTML = items.length
      ? items.map(dishCard).join("")
      : `<p class="empty-note">اس کیٹیگری میں ابھی کوئی ڈش موجود نہیں۔</p>`;
  }

  function selectTab(id, scroll) {
    activeTab = id;
    renderTabs();
    renderDishes();
    if (scroll) $("#menu").scrollIntoView({ behavior: "smooth" });
  }

  /* ---------- Cart drawer ---------- */
  const drawer = $("#cartDrawer");
  const overlay = $("#drawerOverlay");
  let lastFocus = null;

  function openCart() {
    lastFocus = document.activeElement;
    if (currentView !== "checkout" || !cart.count()) showView("cart");
    overlay.hidden = false;
    requestAnimationFrame(() => {
      drawer.classList.add("open");
      overlay.classList.add("show");
    });
    drawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    drawer.focus();
  }

  function closeCart() {
    drawer.classList.remove("open");
    overlay.classList.remove("show");
    drawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    setTimeout(() => {
      overlay.hidden = true;
      if (currentView === "done") showView("cart");
    }, 300);
    if (lastFocus) lastFocus.focus();
  }

  function renderCart() {
    const items = cart.items();
    const count = cart.count();
    const badge = $("#cartCount");
    if (String(count) !== badge.textContent) {
      badge.classList.remove("bump");
      void badge.offsetWidth; // restart the animation
      badge.classList.add("bump");
    }
    badge.textContent = count;
    badge.hidden = count === 0;

    $("#cartFoot").hidden = items.length === 0;
    $("#cartSubtotal").textContent = fmt(cart.subtotal());

    $("#cartItems").innerHTML = items.length ? items.map((i) => `
      <div class="cart-line" data-id="${esc(i.id)}">
        ${imageHtml(i.image, i.name, (categoryById(i.category) || {}).icon, "cart-img")}
        <div class="cart-info">
          <div class="cart-name ltr">${esc(i.name)}</div>
          <div class="cart-unit ltr">${fmt(i.price)}</div>
          <div class="qty qty-sm">
            <button type="button" class="qty-btn" data-cart-qty="-1" aria-label="Decrease">−</button>
            <span class="qty-val">${i.qty}</span>
            <button type="button" class="qty-btn" data-cart-qty="1" aria-label="Increase">+</button>
          </div>
        </div>
        <div class="cart-side">
          <strong class="ltr">${fmt(i.lineTotal)}</strong>
          <button type="button" class="link-btn" data-remove>ہٹائیں</button>
        </div>
      </div>`).join("") : `
      <div class="cart-empty">
        <div class="cart-empty-icon" aria-hidden="true">🍽️</div>
        <p>آپ کا کارٹ ابھی خالی ہے</p>
        <a href="#menu" class="btn btn-primary" data-close-cart><span class="ltr">Menu</span> دیکھیں</a>
      </div>`;
  }

  /* ---------- Checkout (cart → form → sent) ---------- */
  const CUSTOMER_KEY = "dk_customer_v1";
  const form = $("#checkoutView");
  const views = { cart: $("#cartView"), checkout: form, done: $("#doneView") };
  const titles = {
    cart: `آپ کا آرڈر <span class="ltr">(Cart)</span>`,
    checkout: `آرڈر کی تفصیل <span class="ltr">(Checkout)</span>`,
    done: `آرڈر بھیج دیا <span class="ltr">(Sent)</span>`,
  };
  let currentView = "cart";

  function showView(name) {
    currentView = name;
    Object.entries(views).forEach(([k, el]) => { el.hidden = k !== name; });
    $("#cartTitle").innerHTML = titles[name];
    $("#checkoutBack").hidden = name !== "checkout";
    if (name === "checkout") renderSummary();
    $(".drawer-body", views[name]).scrollTop = 0;
  }

  const orderType = () => form.elements.type.value;
  const deliveryFee = () => (orderType() === "delivery" ? Number(config.deliveryFee) || 0 : 0);

  function renderSummary() {
    const items = cart.items();
    const subtotal = cart.subtotal();
    const fee = deliveryFee();
    const isDelivery = orderType() === "delivery";

    $("#summaryLines").innerHTML = items.map((i) => `
      <li><span><span class="ltr">${esc(i.name)}</span> × ${i.qty}</span><span class="ltr">${fmt(i.lineTotal)}</span></li>`).join("");
    $("#sumSubtotal").textContent = fmt(subtotal);
    $("#sumDeliveryRow").hidden = !isDelivery;
    $("#sumDelivery").textContent = fee ? fmt(fee) : "مفت";
    $("#sumTotal").textContent = fmt(subtotal + fee);

    $("#addressField").hidden = !isDelivery;
    $("#pickupNote").hidden = isDelivery;
  }

  // Accepts 03001234567, 0300-1234567, +92 300 1234567, 923001234567.
  function normalizePhone(raw) {
    const d = String(raw).replace(/[\s\-()]/g, "").replace(/^\+/, "");
    if (/^03\d{9}$/.test(d)) return d;
    if (/^923\d{9}$/.test(d)) return `0${d.slice(2)}`;
    return "";
  }

  function setError(input, msg) {
    input.classList.toggle("invalid", !!msg);
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    $(`#${input.id}Err`).textContent = msg;
  }

  function validate() {
    const { name, phone, address } = form.elements;
    const checks = [
      [name, name.value.trim().length >= 2 ? "" : "براہ کرم اپنا نام لکھیں"],
      [phone, normalizePhone(phone.value) ? "" : "درست موبائل نمبر لکھیں، مثلاً 03001234567"],
      [address, orderType() !== "delivery" || address.value.trim().length >= 8 ? "" : "براہ کرم مکمل پتہ لکھیں"],
    ];
    checks.forEach(([el, msg]) => setError(el, msg));
    const firstBad = checks.find(([, msg]) => msg);
    if (firstBad) firstBad[0].focus();
    return !firstBad;
  }

  function loadCustomer() {
    try {
      const c = JSON.parse(localStorage.getItem(CUSTOMER_KEY) || "{}");
      ["name", "phone", "address"].forEach((k) => { if (c[k]) form.elements[k].value = c[k]; });
      if (c.type === "pickup" || c.type === "delivery") form.elements.type.value = c.type;
    } catch {}
  }

  function saveCustomer(c) {
    try { localStorage.setItem(CUSTOMER_KEY, JSON.stringify(c)); } catch {}
  }

  function goToCheckout() {
    if (!cart.count()) return;
    showView("checkout");
    form.elements.name.focus({ preventScroll: true });
  }

  function sendOrder(e) {
    e.preventDefault();
    const items = cart.items();
    if (!items.length) { showView("cart"); return; }
    if (!validate()) return;

    const f = form.elements;
    const type = orderType();
    const customer = {
      name: f.name.value.trim(),
      phone: normalizePhone(f.phone.value),
      address: type === "delivery" ? f.address.value.trim() : "",
    };
    saveCustomer({ ...customer, address: f.address.value.trim(), type });

    const orderNumber = order.generateOrderNumber();
    const message = order.buildMessage({
      items,
      orderNumber,
      customer,
      type: type === "delivery" ? "Delivery (ڈیلیوری)" : "Pickup (خود لے جائیں)",
      notes: f.notes.value.trim(),
      deliveryFee: deliveryFee(),
    });
    const url = order.whatsappUrl(message);
    window.open(url, "_blank", "noopener");

    $("#doneNumber").textContent = orderNumber;
    $("#doneResend").href = url;
    f.notes.value = "";
    showView("done");
    cart.clear();
  }

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
  }

  /* ---------- Events ---------- */
  document.addEventListener("click", (e) => {
    const catLink = e.target.closest("[data-cat]");
    if (catLink) { e.preventDefault(); closeNav(); selectTab(catLink.dataset.cat, true); return; }

    const tab = e.target.closest("[data-tab]");
    if (tab) { selectTab(tab.dataset.tab, false); return; }

    const card = e.target.closest(".dish-card");
    if (card) {
      const valEl = $(".qty-val", card);
      const step = e.target.closest("[data-qty]");
      if (step) {
        valEl.textContent = Math.max(1, Math.min(50, Number(valEl.textContent) + Number(step.dataset.qty)));
        return;
      }
      const add = e.target.closest("[data-add]");
      if (add) {
        const qty = Number(valEl.textContent);
        cart.add(card.dataset.id, qty);
        valEl.textContent = "1";
        add.classList.add("added");
        setTimeout(() => add.classList.remove("added"), 900);
        const item = menuItems.find((m) => m.id === card.dataset.id);
        toast(`✓ ${item.name} × ${qty} کارٹ میں شامل`);
        return;
      }
    }

    const line = e.target.closest(".cart-line");
    if (line) {
      const id = line.dataset.id;
      const step = e.target.closest("[data-cart-qty]");
      if (step) {
        const current = cart.items().find((i) => i.id === id);
        if (current) cart.setQty(id, current.qty + Number(step.dataset.cartQty));
      }
      if (e.target.closest("[data-remove]")) cart.remove(id);
      return;
    }

    if (e.target.closest("[data-close-cart]")) closeCart();
  });

  $("#cartBtn").addEventListener("click", openCart);
  $("#cartClose").addEventListener("click", closeCart);
  overlay.addEventListener("click", closeCart);
  $("#checkoutBtn").addEventListener("click", goToCheckout);
  $("#checkoutBack").addEventListener("click", () => showView("cart"));
  form.addEventListener("submit", sendOrder);
  form.addEventListener("change", (e) => { if (e.target.name === "type") renderSummary(); });
  form.addEventListener("input", (e) => { if (e.target.classList.contains("invalid")) setError(e.target, ""); });
  $("#clearCartBtn").addEventListener("click", () => { cart.clear(); toast("کارٹ خالی کر دیا گیا"); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { if (drawer.classList.contains("open")) closeCart(); closeNav(); }
  });

  // WhatsApp CTA: review the cart if it has items, otherwise start a chat.
  $("#waCtaBtn").addEventListener("click", (e) => {
    if (cart.count() > 0) { e.preventDefault(); openCart(); }
  });

  cart.onChange(renderCart);
  cart.onChange(() => {
    if (currentView !== "checkout") return;
    if (cart.count()) renderSummary(); else showView("cart");
  });

  /* ---------- Header: mobile nav, scroll state, active link ---------- */
  const nav = $("#nav");
  const toggle = $("#menuToggle");
  function closeNav() {
    nav.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeNav));

  const header = $("#header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if ("IntersectionObserver" in window) {
    const links = [...document.querySelectorAll(".nav-link")];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === `#${en.target.id}`));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["home", "menu", "about", "contact"].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
  }

  /* ---------- Fill restaurant details from config ---------- */
  function applyConfig() {
    document.querySelectorAll("[data-config]").forEach((el) => { el.textContent = config[el.dataset.config] || ""; });
    const phone = $("#footerPhone");
    phone.textContent = config.phoneDisplay;
    phone.href = `tel:+${config.whatsappNumber}`;
    const wa = $("#footerWa");
    wa.textContent = config.phoneDisplay;
    wa.href = order.whatsappUrl(order.greetingMessage());
    $("#waCtaBtn").href = order.whatsappUrl(order.greetingMessage());
    $("#year").textContent = new Date().getFullYear();
  }

  /* ---------- Init ---------- */
  applyConfig();
  renderCategories();
  renderTabs();
  renderDishes();
  renderCart();
  loadCustomer();
})();
