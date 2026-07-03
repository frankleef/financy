"use client";

import { useTransition } from "react";
import { zetMaandAfgerond } from "@/lib/actions";

export function MaandAfrondenButton({ maandId, afgerond }: { maandId: number; afgerond: boolean }) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(() => {
      zetMaandAfgerond(maandId, !afgerond);
    });
  }

  return (
    <div className="px-3.5 pb-6">
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        className={
          afgerond
            ? "h-[50px] w-full rounded-control border border-line-input bg-white text-[15px] font-semibold text-ink-muted disabled:opacity-60"
            : "h-[50px] w-full rounded-control bg-teal text-[15px] font-semibold text-white disabled:opacity-60"
        }
      >
        {afgerond ? "maand bewerken" : "maand afronden"}
      </button>
    </div>
  );
}
