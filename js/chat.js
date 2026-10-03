/* =========================================================
   Dasterkhwan — chat assistant widget
   UI only for now: every message gets the same mock reply.
   No API is called. To connect a real assistant later, replace getReply().
   ========================================================= */
(function () {
  const $ = (sel) => document.querySelector(sel);
  const fab = $("#chatFab");
  const win = $("#chatWindow");
  const messages = $("#chatMessages");
  const form = $("#chatForm");
  const input = $("#chatInput");

  const MOCK_REPLY = "Hi! I’m Dastarkhwan Assistant. My AI brain isn’t connected yet.";
  const REPLY_DELAY_MS = 600;

  function getReply(/* text */) {
    return MOCK_REPLY;
  }

  function addBubble(text, from) {
    const el = document.createElement("div");
    el.className = `chat-bubble chat-bubble-${from}`;
    el.dir = "auto";
    el.textContent = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
    return el;
  }

  function showTyping() {
    const el = document.createElement("div");
    el.className = "chat-bubble chat-bubble-bot chat-typing";
    el.setAttribute("aria-label", "Assistant is typing");
    el.innerHTML = "<span></span><span></span><span></span>";
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
    return el;
  }

  function setOpen(open) {
    win.classList.toggle("open", open);
    win.setAttribute("aria-hidden", String(!open));
    fab.classList.toggle("open", open);
    fab.setAttribute("aria-expanded", String(open));
    fab.setAttribute("aria-label", open ? "Close chat" : "Open Dastarkhwan Assistant chat");
    document.body.classList.toggle("chat-open", open);
    if (open) {
      if (!messages.children.length) addBubble("Assalam-o-Alaikum! How can I help you today?", "bot");
      setTimeout(() => input.focus(), 250);
    } else {
      fab.focus();
    }
  }

  fab.addEventListener("click", () => setOpen(!win.classList.contains("open")));
  $("#chatClose").addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && win.classList.contains("open")) setOpen(false);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    addBubble(text, "user");
    input.value = "";
    input.focus();

    const typing = showTyping();
    setTimeout(() => {
      typing.remove();
      addBubble(getReply(text), "bot");
    }, REPLY_DELAY_MS);
  });
})();
