import type { Metadata } from "next";
import "@fontsource/archivo-black";
import "@fontsource-variable/dm-sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "J’ai Bistrot București | Grădină, meniu și rezervări",
  description: "Descoperă J’ai Bistrot din București: bistro, grădină, meniul actual și rezervări telefonice la Calea Griviței 55.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className="antialiased">{children}</body>
    </html>
  );
}
