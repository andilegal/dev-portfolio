"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu as MenuIcon, X } from "lucide-react";
import { useTheme } from "next-themes";
import { MenuItemProps } from "./menu.type";
import { Logo } from "./logo";
import { DesktopMenu } from "./desktop-menu";
import { MobileMenu } from "./mobile-menu";
import { DarkModeToggle } from "@/components/common";

export function Menu({ data }: { data: MenuItemProps[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (open && mobileMenuRef.current) mobileMenuRef.current.focus();
  }, [open]);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const headerLightBg = scrolled
    ? "bg-white border-b border-gray-300 shadow-sm"
    : "bg-white border-b border-gray-200";

  const headerDarkBg = scrolled
    ? "bg-[#121721] border-b border-[#2e3a59] shadow-md"
    : "bg-[#1e263a] border-b border-[#2e3a59]";

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-300 backdrop-blur-sm ${
        isDark ? headerDarkBg : headerLightBg
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Logo isDark={isDark} />
        <DesktopMenu data={data} pathname={pathname} isDark={isDark} />
        <motion.button
          onClick={() => setOpen(!open)}
          className={`lg:hidden focus:outline-none ${
            isDark ? "text-cyan-400" : "text-gray-700"
          }`}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-controls="mobile-menu"
          aria-expanded={open}
          whileHover={{ scale: 1.1 }}
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {open ? <X size={28} /> : <MenuIcon size={28} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <MobileMenu
            data={data}
            pathname={pathname}
            isDark={isDark}
            setOpen={setOpen}
            mobileMenuRef={mobileMenuRef as React.RefObject<HTMLDivElement>}
          >
            <DarkModeToggle />
          </MobileMenu>
        )}
      </AnimatePresence>
    </header>
  );
}
