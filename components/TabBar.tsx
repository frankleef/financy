"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/overzicht", label: "overzicht", icon: OverzichtIcon },
  { href: "/jaaroverzicht", label: "jaaroverzicht", icon: JaarIcon },
  { href: "/instellingen", label: "instellingen", icon: InstellingenIcon },
] as const;

export function TabBar() {
  const pathname = usePathname();

  return (
    <nav className="flex h-[66px] flex-none items-stretch border-t border-line bg-white">
      {TABS.map(({ href, label, icon: Icon }) => {
        const active = pathname?.startsWith(href) ?? false;
        const color = active ? "#0f6e56" : "#9b988f";
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-1 flex-col items-center justify-center gap-[5px]"
          >
            <Icon color={color} />
            <span
              className="text-[11px]"
              style={{ color, fontWeight: active ? 600 : 400 }}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

function OverzichtIcon({ color }: { color: string }) {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="14" y2="17" />
    </svg>
  );
}

function JaarIcon({ color }: { color: string }) {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
      <line x1="6" y1="20" x2="6" y2="13" />
      <line x1="12" y1="20" x2="12" y2="8" />
      <line x1="18" y1="20" x2="18" y2="4" />
    </svg>
  );
}

function InstellingenIcon({ color }: { color: string }) {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
      <line x1="4" y1="8" x2="20" y2="8" />
      <circle cx="15" cy="8" r="2.4" fill="#ffffff" />
      <line x1="4" y1="16" x2="20" y2="16" />
      <circle cx="9" cy="16" r="2.4" fill="#ffffff" />
    </svg>
  );
}
