"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { toggleAfgevinkt } from "@/lib/actions";
import { formatEuro } from "@/lib/format";
import type { Potje } from "@/drizzle/schema";

export function PotRow({ potje, periode }: { potje: Potje; periode: string }) {
  const [afgevinkt, setAfgevinkt] = useState(potje.afgevinkt);
  const [isPending, startTransition] = useTransition();
  const isVast = potje.type === "vast";

  function handleChange() {
    const nieuw = !afgevinkt;
    setAfgevinkt(nieuw);
    startTransition(() => {
      toggleAfgevinkt(potje.id, nieuw);
    });
  }

  return (
    <label className="flex min-h-[56px] cursor-pointer items-center gap-3 border-t border-line-faint px-3.5 py-3 first:border-t-0">
      <input type="checkbox" checked={afgevinkt} onChange={handleChange} className="sr-only" />
      <span
        aria-hidden
        className="flex h-6 w-6 flex-none items-center justify-center rounded-chip border-2"
        style={{
          borderColor: afgevinkt ? "#0f6e56" : "#cdc9bf",
          background: afgevinkt ? "#0f6e56" : "#fff",
          opacity: isPending ? 0.6 : 1,
        }}
      >
        {afgevinkt && (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5 L10 17.5 L19 6.5" />
          </svg>
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-medium leading-tight">{potje.naam}</span>
        <span className="mt-1 flex items-center gap-1.5">
          <span
            className="rounded-full px-2 py-0.5 text-[10.5px] font-bold"
            style={{
              background: isVast ? "#e6f0ec" : "#f0ede4",
              color: isVast ? "#0f6e56" : "#8a7f5f",
            }}
          >
            {isVast ? "vast" : "variabel"}
          </span>
          {afgevinkt ? (
            <span className="text-[11px] font-semibold text-teal">overgemaakt</span>
          ) : (
            <span className="text-[11px] text-ink-faint">nog niet</span>
          )}
        </span>
      </span>
      <span className="text-[15px] font-bold tabular-nums">{formatEuro(potje.bedrag)}</span>
      <Link
        href={`/overzicht?edit=${potje.id}&periode=${periode}`}
        aria-label={`${potje.naam} bewerken`}
        className="-mr-1 flex h-7 w-7 flex-none items-center justify-center text-ink-faint"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      </Link>
    </label>
  );
}
