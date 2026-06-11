import type { Metadata } from "next";
import { Manrope, Source_Sans_3 } from "next/font/google";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Vihaan — A treat you can say yes to",
  description:
    "Prebiotic fiber gummies, chews, and bites for kids. 5g fiber per piece, sweetened with allulose and monk fruit. One swap, one habit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-background text-ink">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
