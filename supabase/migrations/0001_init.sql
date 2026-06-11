-- Vihaan database schema
-- Run this in your Supabase SQL editor or via CLI: supabase db push

-- profiles (1:1 with auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text,
  last_name text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);
create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- subscriptions (1:1 with profile)
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade unique,
  plan text check (plan in ('starter','monthly','family')) not null default 'monthly',
  selected_sku text check (selected_sku in ('gummy-bears','fruit-chews','chocolate-bites')) not null default 'gummy-bears',
  status text check (status in ('not_started','active','paused','cancelled')) not null default 'not_started',
  paused_until date,
  current_period_start date,
  current_period_end date,
  next_ship_date date,
  stripe_customer_id text,
  stripe_subscription_id text,
  updated_at timestamptz default now()
);

alter table public.subscriptions enable row level security;

create policy "Users can view own subscription"
  on public.subscriptions for select using (auth.uid() = user_id);
create policy "Users can insert own subscription"
  on public.subscriptions for insert with check (auth.uid() = user_id);
create policy "Users can update own subscription"
  on public.subscriptions for update using (auth.uid() = user_id);

-- addresses (1:1 with profile)
create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade unique,
  line1 text not null,
  line2 text,
  city text not null,
  state text not null,
  zip text not null,
  updated_at timestamptz default now()
);

alter table public.addresses enable row level security;

create policy "Users can view own address"
  on public.addresses for select using (auth.uid() = user_id);
create policy "Users can insert own address"
  on public.addresses for insert with check (auth.uid() = user_id);
create policy "Users can update own address"
  on public.addresses for update using (auth.uid() = user_id);

-- notification_prefs (1:1)
create table if not exists public.notification_prefs (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  order_updates_email boolean default true,
  marketing_email boolean default false
);

alter table public.notification_prefs enable row level security;

create policy "Users can view own notification prefs"
  on public.notification_prefs for select using (auth.uid() = user_id);
create policy "Users can insert own notification prefs"
  on public.notification_prefs for insert with check (auth.uid() = user_id);
create policy "Users can update own notification prefs"
  on public.notification_prefs for update using (auth.uid() = user_id);

-- orders (n:1 with profile)
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  created_at timestamptz default now(),
  items jsonb not null,
  total_cents int not null,
  status text check (status in ('pending','shipped','delivered','cancelled')) not null default 'pending'
);

alter table public.orders enable row level security;

create policy "Users can view own orders"
  on public.orders for select using (auth.uid() = user_id);

-- ingredients (public read-only seed)
create table if not exists public.ingredients (
  id text primary key,
  display_name text not null,
  one_line_benefit text not null,
  sort_order int default 0
);

alter table public.ingredients enable row level security;

create policy "Anyone can read ingredients"
  on public.ingredients for select using (true);

-- products (public read-only seed)
create table if not exists public.products (
  sku text primary key,
  name text not null,
  flavor text not null,
  shape_emoji text,
  pieces_per_box int not null,
  price_cents int not null,
  description text,
  sort_order int default 0
);

alter table public.products enable row level security;

create policy "Anyone can read products"
  on public.products for select using (true);

-- plans (public read-only seed)
create table if not exists public.plans (
  id text primary key,
  name text not null,
  price_cents int not null,
  interval text not null,
  description text,
  features jsonb not null default '[]'
);

alter table public.plans enable row level security;

create policy "Anyone can read plans"
  on public.plans for select using (true);

-- Seed data

insert into public.ingredients (id, display_name, one_line_benefit, sort_order) values
  ('prebiotic_fiber', 'Fiber from chicory root', 'Supports healthy digestion and helps kids feel fuller longer.', 0),
  ('chromium', 'Chromium picolinate', 'Helps support healthy blood sugar levels already in the normal range.', 1),
  ('green_tea', 'Green tea extract', 'Provides natural antioxidants that support overall wellness.', 2),
  ('vitamin_d3', 'Vitamin D3', 'Supports bone health and immune function during growing years.', 3)
on conflict (id) do nothing;

insert into public.products (sku, name, flavor, shape_emoji, pieces_per_box, price_cents, description, sort_order) values
  ('gummy-bears', 'Gummy Bears', 'Fruit Punch', '🍬', 60, 3499, 'Classic gummy bears with a fruity punch flavor. Each piece packs 5g prebiotic fiber, chromium, green tea extract, and vitamin D3.', 0),
  ('fruit-chews', 'Fruit Chews', 'Strawberry-Watermelon', '🍓', 60, 3499, 'Soft, chewy strawberry-watermelon bites. 5g prebiotic fiber per piece with chromium, green tea extract, and vitamin D3.', 1),
  ('chocolate-bites', 'Chocolate Bites', 'Creamy Chocolate', '🍫', 60, 3499, 'Rich, creamy chocolate bites that taste like a real treat. 5g prebiotic fiber per piece, plus chromium, green tea extract, and vitamin D3.', 2)
on conflict (sku) do nothing;

insert into public.plans (id, name, price_cents, interval, description, features) values
  ('starter', 'Starter Kit', 3999, 'one_time', 'Try one flavor before committing. 60 pieces shipped once.', '["60 pieces", "1 flavor", "One-time purchase", "Free shipping"]'),
  ('monthly', 'Monthly Plan', 3499, 'month', 'Your favorite flavor, delivered every month. Cancel or pause anytime.', '["60 pieces", "1 flavor", "Delivered monthly", "Free shipping", "Pause or cancel anytime"]'),
  ('family', 'Family Bundle', 5999, 'month', 'All three flavors for the whole family. 180 pieces monthly.', '["180 pieces", "All 3 flavors", "Delivered monthly", "Free shipping", "Pause or cancel anytime", "Best value"]')
on conflict (id) do nothing;
