"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "../ui/Icon";

interface AnchorItem {
  id: string;
  label: string;
  icon: string;
}

const ANCHORS: AnchorItem[] = [
  { id: "kamar", label: "1. Ketersediaan Kamar Rawat", icon: "bed" },
  { id: "jadwal", label: "2. Jadwal & Poliklinik Dokter", icon: "calendar_month" },
  { id: "obat", label: "3. Stok Obat Esensial", icon: "vaccines" },
  { id: "darah", label: "4. Stok Darah (PMI & BDRS)", icon: "bloodtype" },
  { id: "direktori", label: "5. Direktori Faskes & IGD", icon: "apartment" },
];

export function FloatingAnchorNav() {
  const [activeSection, setActiveSection] = useState<string>("kamar");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of ANCHORS) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-20 z-40 bg-surface-container-lowest/80 backdrop-blur-xl py-3 shadow-sm border-b border-slate-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto gap-2 no-scrollbar">
        <div className="flex items-center gap-2">
          {ANCHORS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`px-4 py-2 rounded-full font-medium text-xs sm:text-sm flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-primary text-on-primary shadow-sm shadow-primary/20 scale-[1.02]"
                    : "bg-surface-container-low hover:bg-surface-container-high text-on-surface"
                }`}
              >
                <Icon
                  name={item.icon}
                  size={18}
                  className={isActive ? "text-on-primary" : "text-primary"}
                />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
