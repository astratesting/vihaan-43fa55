import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center">
        <h1 className="text-6xl font-heading font-extrabold text-primary">404</h1>
        <p className="mt-4 text-xl font-heading font-bold text-ink">Page not found</p>
        <p className="mt-2 text-muted font-body">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-accent text-white font-heading font-semibold hover:bg-accent-dark transition-all"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
