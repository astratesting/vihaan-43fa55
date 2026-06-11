import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 py-12">
      <Link href="/" className="mb-8 font-heading font-extrabold text-2xl text-primary">
        Vihaan
      </Link>
      {children}
    </div>
  );
}
