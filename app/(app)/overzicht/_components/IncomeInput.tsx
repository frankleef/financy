"use client";

import { useState, useTransition } from "react";
import { updateNettoInkomen } from "@/lib/actions";

export function IncomeInput({
  maandId,
  initieelBedrag,
  disabled = false,
}: {
  maandId: number;
  initieelBedrag: string | null;
  disabled?: boolean;
}) {
  const [waarde, setWaarde] = useState(
    initieelBedrag ? Number(initieelBedrag).toFixed(2).replace(".", ",") : ""
  );
  const [, startTransition] = useTransition();

  function opslaan() {
    const genormaliseerd = waarde.replace(",", ".").trim();
    const bedrag = genormaliseerd ? Number(genormaliseerd) : null;
    startTransition(() => {
      updateNettoInkomen(maandId, bedrag !== null && !Number.isNaN(bedrag) ? bedrag : null);
    });
  }

  return (
    <div className="mt-1.5 flex items-baseline gap-1">
      <span className="text-[26px] font-bold">€</span>
      <input
        type="text"
        inputMode="decimal"
        value={waarde}
        placeholder="0,00"
        aria-label="netto inkomen deze maand"
        onChange={(e) => setWaarde(e.target.value)}
        onBlur={opslaan}
        disabled={disabled}
        className="w-full border-none bg-transparent text-[26px] font-bold text-ink outline-none placeholder:text-line-input disabled:text-ink-muted"
      />
    </div>
  );
}
