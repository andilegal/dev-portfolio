"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu as MenuIcon, X } from "lucide-react";
import { DarkModeToggle } from "../dark-mode-toggle";
import { useTheme } from "next-themes";
import { MenuItemProps } from "./menu.type";

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
        {/* Logo com animação pulsante, sem underline */}
        <motion.div
          initial={{ scale: 1, textShadow: "0 0 0 rgba(0,0,0,0)" }}
          animate={{
            scale: [1, 1.05, 1],
            textShadow: isDark
              ? [
                  "0 0 10px rgba(6,182,212,0.7)",
                  "0 0 20px rgba(6,182,212,1)",
                  "0 0 10px rgba(6,182,212,0.7)",
                ]
              : [
                  "0 0 8px rgba(59,130,246,0.7)",
                  "0 0 16px rgba(59,130,246,1)",
                  "0 0 8px rgba(59,130,246,0.7)",
                ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Link
            href="/"
            aria-label="Ir para a página inicial"
            className={`font-extrabold text-3xl select-none cursor-pointer ${
              isDark ? "text-cyan-400" : "text-blue-600"
            }`}
          >
            Anderson
          </Link>
        </motion.div>

        {/* Menu Desktop */}
        <nav
          className="hidden lg:flex items-center space-x-8"
          aria-label="Menu principal"
        >
          <ul
            className={`flex space-x-10 text-lg font-semibold ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {data.map(({ title, slug }) => {
              const isActive =
                pathname === slug || (slug === "home" && pathname === "/");

              return (
                <li key={slug} className="relative list-none">
                  <Link
                    href={slug === "home" ? "/" : slug}
                    aria-current={isActive ? "page" : undefined}
                    className={`px-2 py-1 rounded relative transition-colors ${
                      isActive
                        ? isDark
                          ? "text-cyan-400 font-bold"
                          : "text-blue-600 font-bold"
                        : isDark
                        ? "hover:text-cyan-300"
                        : "hover:text-blue-500"
                    }`}
                  >
                    {title}

                    {/* Underline animada */}
                    {isActive && (
                      <motion.span
                        layoutId="underline"
                        className={`absolute left-0 -bottom-1 h-0.5 rounded-full ${
                          isDark ? "bg-cyan-400" : "bg-blue-600"
                        }`}
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                        style={{ transformOrigin: "left center" }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="ml-6">
            <DarkModeToggle />
          </div>
        </nav>

        {/* Botão mobile */}
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

      {/* Menu Mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            ref={mobileMenuRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Menu principal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 180, damping: 25 }}
            className={`fixed top-0 left-0 w-full h-screen z-40 flex flex-col items-center justify-center space-y-10 outline-none ${
              isDark ? "bg-[#121721]" : "bg-white"
            }`}
          >
            <button
              onClick={() => setOpen(false)}
              className={`absolute top-6 right-6 cursor-pointer focus:outline-none ${
                isDark
                  ? "text-cyan-400 hover:text-cyan-300"
                  : "text-gray-700 hover:text-gray-900"
              }`}
              aria-label="Fechar menu"
            >
              <X size={36} />
            </button>

            <ul
              className={`flex flex-col items-center space-y-10 text-2xl font-semibold ${
                isDark ? "text-cyan-400" : "text-gray-800"
              }`}
            >
              {data.map(({ title, slug }) => {
                const isActive =
                  pathname === slug || (slug === "home" && pathname === "/");

                return (
                  <motion.li
                    key={slug}
                    custom={slug}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Link
                      href={slug === "home" ? "/" : slug}
                      onClick={() => setOpen(false)}
                      className={`transition-colors border-b-2 ${
                        isActive
                          ? isDark
                            ? "border-cyan-300 underline font-bold"
                            : "border-blue-600 underline font-bold"
                          : isDark
                          ? "border-transparent hover:border-cyan-300 hover:text-cyan-300"
                          : "border-transparent hover:border-blue-600 hover:text-blue-600"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {title}
                    </Link>
                  </motion.li>
                );
              })}

              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.3 }}
              >
                <DarkModeToggle />
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
