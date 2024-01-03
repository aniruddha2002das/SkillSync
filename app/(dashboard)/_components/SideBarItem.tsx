"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
};

export const SideBarItem = ({
  icon: Icon,
  label,
  href,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-violet-500 text-sm font-[500] pl-6 transition-all hover:text-violet-600 hover:bg-violet-300/20",
        isActive && "text-violet-700 bg-violet-200/20 hover:bg-violet-200/20 hover:text-violet-700"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-violet-500",
            isActive && "text-violet-700"
          )}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-violet-700 h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  )
}


export default SideBarItem