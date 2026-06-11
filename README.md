# Vihaan

A treat you can say yes to. Prebiotic fiber gummies, chews, and bites for kids.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Auth + Database)
- Stripe (placeholder)

## Setup

1. **Clone and install:**
   ```bash
   git clone <repo-url>
   cd vihaan
   npm install
   ```

2. **Set up environment:**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Supabase project URL, anon key, and service role key.

3. **Set up Supabase:**
   - Create a project at [supabase.com](https://supabase.com)
   - Run the migration SQL in your Supabase SQL editor:
     ```bash
     cat supabase/migrations/0001_init.sql | supabase db execute
     ```
   - Or use Supabase CLI: `supabase db push`

4. **Run the dev server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## Environment Variables

| Variable | Description |
|---|---|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anonymous/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only) |
| `NEXT_PUBLIC_SUPABASE_URL` | Same as SUPABASE_URL (client-side) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same as SUPABASE_ANON_KEY (client-side) |
| `NEXT_PUBLIC_APP_URL` | Your app URL (default: http://localhost:3000) |
| `STRIPE_SECRET_KEY` | Stripe secret key (placeholder) |

## Pages

- `/` — Landing page
- `/products` — Public product catalog
- `/pricing` — Public pricing
- `/signup` — Create account
- `/login` — Log in
- `/dashboard` — Subscription overview
- `/dashboard/products` — Manage subscription
- `/dashboard/settings` — Account settings
