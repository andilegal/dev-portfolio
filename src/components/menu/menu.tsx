"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu as MenuIcon, X } from "lucide-react";
import { DarkModeToggle } from "../dark-mode-toggle";
import { useTheme } from "next-themes";
import { MenuItemProps } from "./menu.type";

const menuVariants = {
  hidden: { opacity: 0, y: -20, rotateX: -15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.08,
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  }),
};

export function Menu({ data }: { data: MenuItemProps[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open && mobileMenuRef.current) {
      mobileMenuRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  const backgroundGradient = isDark
    ? `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, rgba(96, 165, 250, 0.2), transparent 60%)`
    : `radial-gradient(circle 300px at ${mousePos.x}px ${mousePos.y}px, rgba(147, 197, 253, 0.25), transparent 60%)`;

  const headerClasses = [
    "fixed top-0 w-full z-50 transition-colors duration-300 backdrop-blur-lg",
    scrolled
      ? "bg-white/90 dark:bg-slate-900/80 shadow-xl"
      : "bg-[#e0f2fe] dark:bg-slate-900",
  ].join(" ");

  const logoStyle = {
    color: "#ffffff",
    textShadow:
      "0 0 5px rgba(255,255,255,0.3), 0 0 10px rgba(255,255,255,0.4), 0 0 15px rgba(96,165,250,0.4)",
    transition: "color 0.3s ease",
  };

  if (!mounted) return null;

  return (
    <header
      className={headerClasses}
      onMouseMove={handleMouseMove}
      style={{
        background: `
          ${backgroundGradient},
          ${
            isDark
              ? "linear-gradient(90deg, #1e293b 0%, #334155 50%, #475569 100%)"
              : "linear-gradient(90deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%)"
          }
        `,
        backgroundBlendMode: "screen",
      }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-r from-blue-300 via-blue-200 to-blue-400 dark:from-slate-800 dark:via-slate-700 dark:to-slate-900"
        style={{ filter: "blur(60px)" }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          whileHover={{
            scale: 1.2,
            textShadow:
              "0 0 8px #3b82f6, 0 0 15px #3b82f6, 0 0 25px #60a5fa, 0 0 40px #60a5fa",
          }}
          transition={{ type: "spring", stiffness: 250, damping: 20 }}
        >
          <Link
            href="/"
            className="text-4xl font-extrabold tracking-wide select-none cursor-pointer"
            aria-label="Ir para a página inicial"
            style={logoStyle}
          >
            Anderson
          </Link>
        </motion.div>

        {/* Menu desktop + DarkModeToggle */}
        <nav
          className="hidden lg:flex items-center space-x-8"
          aria-label="Menu principal"
        >
          <ul className="flex space-x-12 text-lg font-bold text-white">
            {data.map(({ title, slug }, i) => {
              const isActive = pathname === slug;
              return (
                <motion.li
                  key={slug}
                  initial={{ opacity: 0, y: -10, rotateX: -15 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    delay: i * 0.1,
                    type: "spring",
                    stiffness: 300,
                  }}
                  className="list-none"
                >
                  <Link
                    href={slug === "home" ? "/" : slug}
                    className="relative group px-2 py-1 rounded-md"
                    aria-current={isActive ? "page" : undefined}
                  >
                    <motion.span
                      className={`transition-colors duration-300 ${
                        isActive
                          ? "text-blue-200 font-extrabold drop-shadow-lg"
                          : "group-hover:text-blue-300"
                      }`}
                      whileHover={{ scale: 1.15, rotateZ: 3, originX: 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {title}
                    </motion.span>
                    {isActive && (
                      <motion.span
                        layoutId="underline"
                        className="absolute -bottom-2 left-0 h-1 w-full bg-blue-300 rounded-xl shadow-lg"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    )}
                  </Link>
                </motion.li>
              );
            })}
          </ul>

          <div className="ml-4">
            <DarkModeToggle />
          </div>
        </nav>

        {/* Botão mobile */}
        <motion.button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white focus:outline-none"
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-controls="mobile-menu"
          aria-expanded={open}
          whileHover={{ scale: 1.1 }}
        >
          {open ? <X size={32} /> : <MenuIcon size={32} />}
        </motion.button>
      </div>

      {/* Menu mobile */}
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
            initial={{ opacity: 0, scale: 0.95, rotateX: -10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.95, rotateX: -10 }}
            transition={{ type: "spring", stiffness: 180, damping: 25 }}
            className="fixed top-0 left-0 w-full h-screen bg-[#bfdbfe] dark:bg-slate-900 z-40 flex flex-col items-center justify-center space-y-10 outline-none"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-blue-200 transition-colors"
              aria-label="Fechar menu"
            >
              <X size={36} />
            </button>

            <ul className="flex flex-col items-center space-y-10">
              {data.map(({ title, slug }, i) => (
                <motion.li
                  key={slug}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={menuVariants}
                  className="list-none"
                >
                  <Link
                    href={slug === "home" ? "/" : slug}
                    onClick={() => setOpen(false)}
                    className="text-3xl font-extrabold text-white hover:text-blue-200 drop-shadow-md transition-colors"
                    aria-current={pathname === slug ? "page" : undefined}
                  >
                    {title}
                  </Link>
                </motion.li>
              ))}

              <motion.li
                custom={data.length}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={menuVariants}
                className="list-none mt-8"
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
