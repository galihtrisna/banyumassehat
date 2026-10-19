import React from "react";
import Link from "next/link";
import { Icon } from "../ui/Icon";

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest shadow-[0_-1px_8px_rgba(0,0,0,0.03)] border-t border-slate-100 mt-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* 4-Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1 */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                <img
                  src="/logo.png"
                  alt="Logo Priksa"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold text-lg text-primary">Priksa</span>
            </div>
            <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">
              Sistem Integrasi Pelayanan Kesehatan Terpadu Kabupaten Banyumas untuk transparansi dan kemudahan akses masyarakat.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <span className="font-bold text-base text-on-surface block mb-3">
              Integrasi Nasional
            </span>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://yankes.kemkes.go.id/app/siranap/" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">
                  <Icon name="link" size={16} /> Kemenkes SIRANAP 3.0
                </a>
              </li>
              <li>
                <a href="https://bpjs-kesehatan.go.id" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">
                  <Icon name="link" size={16} /> BPJS Kesehatan Mobile JKN
                </a>
              </li>
              <li>
                <a href="https://satusehat.kemkes.go.id" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">
                  <Icon name="link" size={16} /> SatuSehat Kemenkes RI
                </a>
              </li>
              <li>
                <a href="https://ayodonor.pmi.or.id" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">
                  <Icon name="link" size={16} /> PMI Banyumas SIMDONDAR
                </a>
              </li>
              <li className="pt-2 border-t border-slate-100">
                <Link href="/dashboard" className="text-primary font-semibold hover:underline flex items-center gap-1">
                  <Icon name="dashboard" size={16} /> Dashboard Pengelola Faskes
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">
                  <Icon name="lock" size={16} /> Portal Masuk Petugas
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <span className="font-bold text-base text-on-surface block mb-3">
              Akses Darurat
            </span>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:119" className="text-error font-bold hover:underline flex items-center gap-1">
                  <Icon name="call" size={16} /> Call Center NCC 119 Banyumas
                </a>
              </li>
              <li>
                <span className="text-on-surface-variant">SPGDT Brigade Sehat</span>
              </li>
              <li>
                <span className="text-on-surface-variant">Ambulans Siaga Desa</span>
              </li>
              <li>
                <a href="tel:0281621119" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">
                  <Icon name="phone" size={16} /> Hotline PSC: (0281) 621119
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <span className="font-bold text-base text-on-surface block mb-3">
              Tim Pengembang
            </span>
            <p className="text-sm text-on-surface-variant mb-2 leading-relaxed">
              Purwokerto, Kabupaten Banyumas, Jawa Tengah
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-on-surface-variant">
          <p>© 2026 Tim Pengembangan Priksa. Seluruh Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-primary transition-colors">Standar Pelayanan Publik</a>
            <a href="#" className="hover:text-primary transition-colors">Aksesibilitas</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
