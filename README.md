# LE DÉSIR — Platform Foundation

> Private. Elegant. Personal.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env.local
# → fill in DATABASE_URL and other values

# 3. Generate Prisma client
npm run db:generate

# 4. Push schema to database
npm run db:push

# 5. Run dev server
npm run dev
# → http://localhost:3000
```

---

## Project Structure

```
app/
  (auth)/          → Login, Register pages (no header/footer)
  (main)/          → All public pages with Header + Footer
  (dashboard)/     → User dashboard (requires auth)
  (legal)/         → Privacy, Terms, Age Verification, etc.
  (policies)/      → Marketplace policies
  api/             → API routes (Next.js route handlers)

components/
  layout/          → Header, Footer, Navigation, MobileMenu
  common/          → Shared UI: cards, heroes, headings, logo

lib/
  db.ts            → Prisma client
  auth.ts          → Auth placeholder → replace Phase 2
  storage.ts       → Storage placeholder → Supabase Phase 2
  payments.ts      → Payment placeholder → integrate Phase 2

hooks/
  useAuth.ts       → Global auth state (Zustand)
  useCart.ts       → Cart state (Zustand + persist)

types/             → All TypeScript interfaces
constants/         → Navigation, categories, config
prisma/
  schema.prisma    → Full database schema
```

---

## Phase 2 Checklist (Luxury Theme)

Apply final design by editing these files only:

- [ ] `tailwind.config.ts` → add luxury color palette
- [ ] `app/globals.css` → set CSS variables (gold, rose, black)
- [ ] `components/common/Logo.tsx` → replace with SVG logo asset
- [ ] All `bg-foreground`, `bg-muted`, `border-border` → luxury tokens
- [ ] Add `font-display` (Cormorant Garamond or Playfair Display)
- [ ] Replace placeholder images with real photography
- [ ] Enable dark mode as default in `layout.tsx`

---

## Phase 2 Integrations Checklist

- [ ] Auth: NextAuth.js or Clerk
- [ ] Storage: Supabase Storage
- [ ] Payments: PayPal + Stripe + USDT wallet
- [ ] AI Companion: OpenAI / Anthropic API
- [ ] Live Streaming: integrate streaming provider
- [ ] Email: Resend or SendGrid
- [ ] CDN: Cloudflare

---

## Tech Stack

| Layer      | Technology                |
|------------|---------------------------|
| Frontend   | Next.js 15, TypeScript    |
| Styling    | Tailwind CSS, Shadcn UI   |
| Database   | PostgreSQL via Prisma ORM |
| State      | Zustand                   |
| Auth       | Placeholder (Phase 2)     |
| Storage    | Placeholder (Phase 2)     |
| Payments   | Placeholder (Phase 2)     |

---

Powered by **RB Media Ecosystem**
