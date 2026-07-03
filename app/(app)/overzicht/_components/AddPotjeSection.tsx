"use client";

import { useState, useTransition } from "react";
import { maakPotje } from "@/lib/actions";
import { parseEuroInput } from "@/lib/format";
import type { Categorie, PotjeType } from "@/drizzle/schema";
import { PotjeFormFields } from "./PotjeFormFields";

export function AddPotjeSection({ maandId, categorie }: { maandId: number; categorie: Categorie }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const naam = String(formData.get("naam") ?? "");
    const type = (String(formData.get("type") ?? "vast") === "variabel" ? "variabel" : "vast") as PotjeType;
    const bedrag = parseEuroInput(String(formData.get("bedrag") ?? ""));

    startTransition(async () => {
      await maakPotje({ maandId, naam, categorie, type, bedrag });
      setOpen(false);
    });
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex min-h-[52px] w-full items-center gap-2 border-t border-line-faint px-3.5 py-3 text-[13.5px] font-semibold text-teal first:border-t-0"
      >
        <PlusIcon />
        potje toevoegen
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 border-t border-line-faint bg-field-alt px-3.5 py-4">
      <div className="text-xs font-bold text-ink-secondary">nieuw potje</div>
      <PotjeFormFields />
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
          onClick={() => setOpen(false)}
          className="flex h-[46px] items-center rounded-control border border-line-input bg-white px-4 text-[14px] font-semibold text-ink-muted"
        >
          annuleren
        </button>
      </div>
    </form>
  );
}

function PlusIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
