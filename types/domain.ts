export type Plan = "starter" | "monthly" | "family";
export type Sku = "gummy-bears" | "fruit-chews" | "chocolate-bites";
export type SubscriptionStatus = "not_started" | "active" | "paused" | "cancelled";
export type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan: Plan;
  selected_sku: Sku;
  status: SubscriptionStatus;
  paused_until: string | null;
  current_period_start: string | null;
  current_period_end: string | null;
  next_ship_date: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  updated_at: string;
}

export interface Address {
  id: string;
  user_id: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  zip: string;
  updated_at: string;
}

export interface NotificationPrefs {
  user_id: string;
  order_updates_email: boolean;
  marketing_email: boolean;
}

export interface Order {
  id: string;
  user_id: string;
  created_at: string;
  items: OrderItem[];
  total_cents: number;
  status: OrderStatus;
}

export interface OrderItem {
  sku: string;
  name: string;
  qty: number;
  price_cents: number;
}

export interface Product {
  sku: string;
  name: string;
  flavor: string;
  shape_emoji: string | null;
  pieces_per_box: number;
  price_cents: number;
  description: string | null;
  sort_order: number;
}

export interface PlanInfo {
  id: string;
  name: string;
  price_cents: number;
  interval: string;
  description: string | null;
  features: string[];
}

export interface Ingredient {
  id: string;
  display_name: string;
  one_line_benefit: string;
  sort_order: number;
}
