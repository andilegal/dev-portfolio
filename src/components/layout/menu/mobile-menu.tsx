import Link from "next/link";
import { motion } from "framer-motion";
import { MenuItemProps } from "./menu.type";
import { X } from "lucide-react";

interface MobileMenuProps {
  data: MenuItemProps[];
  pathname: string | null;
  isDark: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mobileMenuRef: React.RefObject<HTMLDivElement>;
  children?: React.ReactNode; // para o DarkModeToggle por exemplo
}

export function MobileMenu({
  data,
  pathname,
  isDark,
  setOpen,
  mobileMenuRef,
  children,
}: MobileMenuProps) {
  return (
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
          {children}
        </motion.li>
      </ul>
    </motion.div>
  );
}
