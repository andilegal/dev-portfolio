import Link from "next/link";
import { motion } from "framer-motion";
import { MenuItemProps } from "./menu.type";
import { DarkModeToggle } from "@/components/common";

interface DesktopMenuProps {
  data: MenuItemProps[];
  pathname: string | null;
  isDark: boolean;
}

export function DesktopMenu({ data, pathname, isDark }: DesktopMenuProps) {
  return (
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

                {isActive && (
                  <motion.span
                    layoutId="underline"
                    className={`absolute left-0 -bottom-1 h-0.5 rounded-full ${
                      isDark ? "bg-cyan-400" : "bg-blue-600"
                    }`}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
  );
}
