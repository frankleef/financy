"use client";

import { useState, useTransition } from "react";
import { toggleAfgevinkt, updatePotje, verwijderPotje } from "@/lib/actions";
import { formatEuro, parseEuroInput } from "@/lib/format";
import type { Potje, PotjeType } from "@/drizzle/schema";
import { PotjeFormFields } from "./PotjeFormFields";

export function PotRow({ potje, afgerond = false }: { potje: Potje; afgerond?: boolean }) {
  const [afgevinkt, setAfgevinkt] = useState(potje.afgevinkt);
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isVast = potje.type === "vast";

  function handleChange() {
    if (afgerond) return;
    const nieuw = !afgevinkt;
    setAfgevinkt(nieuw);
    startTransition(() => {
      toggleAfgevinkt(potje.id, nieuw);
    });
  }

  function handleOpslaan(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const naam = String(formData.get("naam") ?? "");
    const type = (String(formData.get("type") ?? "vast") === "variabel" ? "variabel" : "vast") as PotjeType;
    const bedrag = parseEuroInput(String(formData.get("bedrag") ?? ""));

    startTransition(async () => {
      await updatePotje({ potjeId: potje.id, naam, type, bedrag });
      setIsEditing(false);
    });
  }

  function handleVerwijderen() {
    if (!confirm(`"${potje.naam}" verwijderen?`)) return;
    startTransition(() => {
      verwijderPotje(potje.id);
    });
  }

  if (isEditing) {
    return (
      <div className="flex flex-col gap-3 border-t border-line-faint bg-field-alt px-3.5 py-4 first:border-t-0">
        <div className="text-xs font-bold text-ink-secondary">potje bewerken</div>
        <form onSubmit={handleOpslaan} className="flex flex-col gap-3">
          <PotjeFormFields
            defaultNaam={potje.naam}
            defaultType={potje.type}
            defaultBedrag={potje.bedrag ? Number(potje.bedrag).toFixed(2).replace(".", ",") : ""}
          />
          <div className="mt-0.5 flex gap-2.5">
            <button
              type="submit"
              disabled={isPending}
              className="h-[46px] flex-1 rounded-control bg-teal text-[14px] font-semibold text-white disabled:opacity-60"
            >
              bewaren
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex h-[46px] items-center rounded-control border border-line-input bg-white px-4 text-[14px] font-semibold text-ink-muted"
            >
              annuleren
            </button>
          </div>
        </form>
        <button
          type="button"
          onClick={handleVerwijderen}
          disabled={isPending}
          className="w-full text-center text-[13px] font-semibold text-destructive disabled:opacity-60"
        >
          potje verwijderen
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-[56px] items-center gap-3 border-t border-line-faint px-3.5 py-3 first:border-t-0">
      <label className={`flex min-w-0 flex-1 items-center gap-3 ${afgerond ? "" : "cursor-pointer"}`}>
        <input
          type="checkbox"
          checked={afgevinkt}
          onChange={handleChange}
          disabled={afgerond}
          className="sr-only"
        />
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
      </label>
      {!afgerond && (
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          aria-label={`${potje.naam} bewerken`}
          className="-mr-1 flex h-7 w-7 flex-none items-center justify-center text-ink-faint"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
        </button>
      )}
    </div>
  );
}
