import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DRMZ Paper Hands | Perpetuals Trading Sandbox",
  description:
    "Learn perpetuals trading safely without risking real capital. Real Cardano Strike quotes, virtual execution, and Morpheus guidance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen selection:bg-drmz-purple selection:text-white">
        {children}
      </body>
    </html>
  );
}
