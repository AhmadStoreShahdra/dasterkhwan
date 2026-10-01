/* =========================================================
   Dasterkhwan — cart store
   Saves the cart in the browser (localStorage) so it survives
   page reloads and can be shared with a future Menu / Checkout page.
   ========================================================= */
window.DK = window.DK || {};

DK.cart = (function () {
  const KEY = "dk_cart_v1";
  const MAX_QTY = 50;
  let lines = load(); // [{ id, qty }]
  const listeners = [];

  function load() {
    try {
      const data = JSON.parse(localStorage.getItem(KEY) || "[]");
      return Array.isArray(data) ? data.filter((l) => l && l.id && l.qty > 0) : [];
    } catch { return []; }
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch {}
    listeners.forEach((fn) => fn(api));
  }

  const findItem = (id) => DK.menuItems.find((m) => m.id === id);
  const clamp = (n) => Math.max(0, Math.min(MAX_QTY, Math.floor(Number(n) || 0)));

  const api = {
    add(id, qty = 1) {
      if (!findItem(id)) return;
      const line = lines.find((l) => l.id === id);
      if (line) line.qty = clamp(line.qty + qty);
      else lines.push({ id, qty: clamp(qty) });
      lines = lines.filter((l) => l.qty > 0);
      save();
    },
    setQty(id, qty) {
      const line = lines.find((l) => l.id === id);
      if (!line) return;
      line.qty = clamp(qty);
      lines = lines.filter((l) => l.qty > 0);
      save();
    },
    remove(id) { lines = lines.filter((l) => l.id !== id); save(); },
    clear() { lines = []; save(); },

    // Cart lines joined with current menu data (drops items no longer on the menu).
    items() {
      return lines
        .map((l) => ({ ...findItem(l.id), qty: l.qty }))
        .filter((i) => i.id && i.available !== false)
        .map((i) => ({ ...i, lineTotal: i.price * i.qty }));
    },
    count() { return api.items().reduce((n, i) => n + i.qty, 0); },
    subtotal() { return api.items().reduce((s, i) => s + i.lineTotal, 0); },
    onChange(fn) { listeners.push(fn); },
  };

  // Keep multiple open tabs in sync.
  window.addEventListener("storage", (e) => {
    if (e.key === KEY) { lines = load(); listeners.forEach((fn) => fn(api)); }
  });

  return api;
})();
