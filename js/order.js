/* =========================================================
   Dasterkhwan — order helpers
   Price formatting, order numbers and the WhatsApp message.
   ========================================================= */
window.DK = window.DK || {};

DK.order = {
  formatPrice(n) {
    return `${DK.config.currency} ${Number(n).toLocaleString("en-PK")}`;
  },

  // e.g. DK-261001-4821  (prefix - YYMMDD - random 4 digits)
  generateOrderNumber(date = new Date()) {
    const pad = (n) => String(n).padStart(2, "0");
    const ymd = `${String(date.getFullYear()).slice(2)}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `${DK.config.orderPrefix}-${ymd}-${rand}`;
  },

  /**
   * Builds the WhatsApp order text.
   * `customer` / `type` / `notes` are optional now and will be filled
   * by the checkout form (name, phone, address, delivery/pickup) later.
   */
  buildMessage({ items, orderNumber, customer = {}, type = "", notes = "", deliveryFee = 0 }) {
    const fmt = DK.order.formatPrice;
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const total = subtotal + (deliveryFee || 0);
    const out = [];

    out.push(`*${DK.config.nameEn} | ${DK.config.nameUr}*`);
    out.push(`New Order — ${orderNumber}`);
    out.push("");
    items.forEach((i, n) => out.push(`${n + 1}. ${i.name} × ${i.qty} = ${fmt(i.price * i.qty)}`));
    out.push("");
    out.push(`Subtotal: ${fmt(subtotal)}`);
    if (deliveryFee) out.push(`Delivery: ${fmt(deliveryFee)}`);
    out.push(`*Total: ${fmt(total)}*`);

    const details = [
      type && `Order type: ${type}`,
      customer.name && `Name: ${customer.name}`,
      customer.phone && `Phone: ${customer.phone}`,
      customer.address && `Address: ${customer.address}`,
      notes && `Notes: ${notes}`,
    ].filter(Boolean);
    if (details.length) { out.push(""); out.push(...details); }

    return out.join("\n");
  },

  whatsappUrl(message = "") {
    const base = `https://wa.me/${DK.config.whatsappNumber}`;
    return message ? `${base}?text=${encodeURIComponent(message)}` : base;
  },

  greetingMessage() {
    return `السلام علیکم! میں ${DK.config.nameUr} سے کھانا آرڈر کرنا چاہتا/چاہتی ہوں۔`;
  },
};
