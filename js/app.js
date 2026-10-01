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
    setTimeout(() => { overlay.hidden = true; }, 300);
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

  function sendOrder() {
    const items = cart.items();
    if (!items.length) return;
    // Checkout form (name, phone, address, delivery/pickup, notes) plugs in here later.
    const message = order.buildMessage({ items, orderNumber: order.generateOrderNumber() });
    window.open(order.whatsappUrl(message), "_blank", "noopener");
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
  $("#sendOrderBtn").addEventListener("click", sendOrder);
  $("#clearCartBtn").addEventListener("click", () => { cart.clear(); toast("کارٹ خالی کر دیا گیا"); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { if (drawer.classList.contains("open")) closeCart(); closeNav(); }
  });

  // WhatsApp CTA: review the cart if it has items, otherwise start a chat.
  $("#waCtaBtn").addEventListener("click", (e) => {
    if (cart.count() > 0) { e.preventDefault(); openCart(); }
  });

  cart.onChange(renderCart);

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
})();
