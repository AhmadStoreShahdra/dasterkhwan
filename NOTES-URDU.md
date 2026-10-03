# 📅 Dasterkhwan Website — Kaam ki Timeline

> Ye notes yaad rakhne ke liye hain: Claude par kya kiya, GitHub par kya kiya, aur Git ke steps.

**Repo:** https://github.com/AhmadStoreShahdra/dasterkhwan

---

## Step 1 — 27 September: Website banai (Claude + Git)
- Claude se restaurant ki website banwai — English + Urdu dono mein.
- Files: `index.html`, `styles.css`, `script.js`, `README.md`
- Git mein pehla commit: **"Add Dasterkhwan restaurant website (English + Urdu)"**

## Step 2 — 1 October: Home page dobara banwaya (Claude + Git)
- Claude se naya home page banwaya jisme:
  - Online menu (dishes, prices, Urdu naam)
  - Cart (quantity badalna, item hatana, total)
  - WhatsApp par order bhejna, order number ke saath (misaal: `DK-261001-4821`)
- Code alag files mein organize hua:
  - `css/styles.css` → design
  - `js/config.js` → WhatsApp number, address, timing
  - `js/menu-data.js` → menu ki dishes
  - `js/cart.js`, `js/order.js`, `js/app.js` → cart aur order system
- Purani `script.js` aur `styles.css` delete hui.
- Commit: **"Rebuild home page with online menu, cart and WhatsApp ordering"**

## Step 3 — 2 October: Checkout form (Claude ne GitHub par branch banai)
- Claude ne alag branch `claude/exciting-euler-fj9red` par kaam kiya.
- Checkout form add hua: customer ka naam, phone, address, notes, **Delivery / Pickup** option, aur order confirmation.
- Commit: **"Add checkout form with delivery/pickup, customer details and order confirmation"**

## Step 4 — 2 October: GitHub par Pull Request merge kiya (khud)
- GitHub par **Pull Request #1** khola aur **merge** kiya.
- Is se Claude ka checkout wala kaam `main` branch mein aa gaya.

## Step 5 — 2 October: GitHub Pages setup (khud)
- GitHub par **GitHub Actions workflow** add kiya (`.github/workflows/jekyll-gh-pages.yml`).
- Is ka kaam: website khud ba khud **GitHub Pages** par live ho jaye.

## Step 6 — 3 October: Ye notes file banai
- Claude se ye `NOTES-URDU.md` file banwai.
- ⚠️ Computer wala code GitHub se 3 commits peeche tha (Step 3, 4, 5) — `git pull origin main` chalana hai.

---

## 🧠 Git Commands — Yaad Rakhne Wali

| Command | Kaam |
|---|---|
| `git status` | Dekhen kya kya badla hai |
| `git add .` | Saari tabdeeliyan commit ke liye tayyar karen |
| `git commit -m "message"` | Tabdeeliyan save karen |
| `git push origin main` | Apna kaam GitHub par bhejen |
| `git pull origin main` | GitHub ka naya kaam apne computer par layen |
| `git log --oneline` | Purane commits ki list dekhen |

### Roz ka tareeqa (step by step)
1. Kaam shuru karne se pehle: `git pull origin main`
2. Claude se kaam karwayen / khud tabdeeli karen
3. `git status` — dekhen kya badla
4. `git add .`
5. `git commit -m "kya kiya, mukhtasar likhen"`
6. `git push origin main` — GitHub par bhej den

---

## 🔜 Aage ke kaam (README ke mutabiq)
- Full menu page
- Admin panel (menu database/API se)
