"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "../ui/Icon";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Beranda", href: "/" },
    { label: "Ketersediaan Kamar", href: "/kamar" },
    { label: "Jadwal Dokter", href: "/jadwal-dokter" },
    { label: "Info Obat", href: "/info-obat" },
    { label: "Stok Darah", href: "/stok-darah" },
    { label: "Direktori RS", href: "/direktori-faskes" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-slate-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
            <img
              src="/logo.png"
              alt="Logo Priksa"
              className="w-full h-full object-contain drop-shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-primary leading-tight tracking-tight">
              Priksa
            </span>
            <span className="text-xs text-on-surface-variant font-medium leading-none hidden sm:block">
              Portal Integrasi Faskes Banyumas
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls & Emergency CTA */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Emergency 119 Button */}
          <a
            href="tel:119"
            className="relative inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-error text-on-error font-semibold text-xs sm:text-sm shadow-[0_4px_12px_rgba(186,26,26,0.25)] hover:bg-red-700 transition-all active:scale-95 shrink-0"
            title="Panggil Layanan Medis Gawat Darurat Bebas Pulsa"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-85" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
            </span>
            <span className="hidden sm:inline">Darurat 119</span>
            <span className="sm:hidden font-bold tracking-wider">119</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2.5 ml-1 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors touch-manipulation"
            aria-label="Menu navigasi"
          >
            <Icon name={mobileMenuOpen ? "close" : "menu"} size={26} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface-container-lowest border-b border-slate-200 px-6 py-4 shadow-xl animate-fadeIn">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                    isActive
                      ? "bg-primary text-on-primary shadow-sm"
                      : "text-on-surface hover:bg-surface-container-high"
                  }`}
                >
                  <span>{link.label}</span>
                  <Icon
                    name="chevron_right"
                    size={18}
                    className={isActive ? "text-on-primary" : "text-outline"}
                  />
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
