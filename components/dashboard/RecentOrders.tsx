import Link from "next/link";
import Card from "@/components/ui/Card";
import { formatMoney, formatDateFull } from "@/lib/format";
import type { Order } from "@/types/domain";

interface RecentOrdersProps {
  orders: Order[];
}

export default function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <Card>
      <h2 className="text-xl font-heading font-bold text-ink mb-4">Recent orders</h2>

      {orders.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/5 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 80 80" fill="none" className="text-primary/30">
              <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="1.5" />
              <ellipse cx="40" cy="40" rx="16" ry="32" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          <p className="text-muted font-body mb-4">
            No orders yet — your first box is on its way once you pick a plan.
          </p>
          <Link
            href="/dashboard/products"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-accent text-white font-heading font-semibold text-sm hover:bg-accent-dark transition-all"
          >
            Pick a plan
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-muted font-medium">Date</th>
                <th className="text-left py-2 text-muted font-medium">Items</th>
                <th className="text-left py-2 text-muted font-medium">Total</th>
                <th className="text-left py-2 text-muted font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-border/50">
                  <td className="py-3 text-ink">{formatDateFull(order.created_at)}</td>
                  <td className="py-3 text-muted">
                    {order.items.map((item) => `${item.qty}x ${item.name}`).join(", ")}
                  </td>
                  <td className="py-3 text-ink font-medium">{formatMoney(order.total_cents)}</td>
                  <td className="py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                      order.status === "delivered"
                        ? "bg-success/15 text-success"
                        : order.status === "shipped"
                        ? "bg-primary/15 text-primary"
                        : order.status === "cancelled"
                        ? "bg-muted/10 text-muted"
                        : "bg-warning/15 text-warning"
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
