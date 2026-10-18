import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AmbientGlow } from "@/components/layout/AmbientGlow";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import { SiteShell } from "@/components/layout/SiteShell";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Priksa - Portal Integrasi Layanan Kesehatan Kabupaten Banyumas",
  description:
    "Portal Priksa: Transparansi ketersediaan tempat tidur RS (SIRANAP), jadwal dokter spesialis poliklinik, stok obat esensial, stok darah PMI & BDRS, serta direktori IGD faskes se-Kabupaten Banyumas.",
  keywords: [
    "Priksa",
    "Priksa Banyumas",
    "Banyumas Sehat",
    "SIRANAP Banyumas",
    "RSUD Margono",
    "RSUD Banyumas",
    "Jadwal Dokter Purwokerto",
    "Stok Darah PMI Banyumas",
    "PSC 119 Banyumas",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${plusJakarta.variable} antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background text-on-surface">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
