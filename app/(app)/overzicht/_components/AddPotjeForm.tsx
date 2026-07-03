import { maakPotjeForm } from "@/lib/actions";
import type { Categorie } from "@/drizzle/schema";

export function AddPotjeForm({
  maandId,
  categorie,
  periode,
}: {
  maandId: number;
  categorie: Categorie;
  periode: string;
}) {
  const action = maakPotjeForm.bind(null, maandId, categorie, periode);

  return (
    <form action={action} className="flex flex-col gap-3 border-t border-line-faint bg-field-alt px-3.5 py-4">
      <div className="text-xs font-bold text-ink-secondary">nieuw potje</div>
      <input
        name="naam"
        type="text"
        required
        placeholder="naam van het potje"
        className="h-[46px] rounded-control border border-line-input bg-white px-3.5 text-[15px] font-sans"
      />
      <div className="flex gap-2.5">
        <div className="flex flex-1 rounded-control border border-line-input bg-white p-1">
          <label className="flex-1">
            <input type="radio" name="type" value="vast" defaultChecked className="peer sr-only" />
            <span className="block cursor-pointer rounded-[8px] py-2 text-center text-[13px] font-semibold text-ink-muted peer-checked:bg-teal peer-checked:text-white">
              vast
            </span>
          </label>
          <label className="flex-1">
            <input type="radio" name="type" value="variabel" className="peer sr-only" />
            <span className="block cursor-pointer rounded-[8px] py-2 text-center text-[13px] font-semibold text-ink-muted peer-checked:bg-teal peer-checked:text-white">
              variabel
            </span>
          </label>
        </div>
        <div className="flex w-[118px] flex-none items-center rounded-control border border-line-input bg-white px-3">
          <span className="text-[15px] text-ink-faint">€</span>
          <input
            name="bedrag"
            type="text"
            inputMode="decimal"
            placeholder="0,00"
            className="w-full border-none bg-transparent px-1 text-right text-[15px] font-sans outline-none"
          />
        </div>
      </div>
      <div className="mt-0.5 flex gap-2.5">
        <button type="submit" className="h-[46px] flex-1 rounded-control bg-teal text-[14px] font-semibold text-white">
          bewaren
        </button>
        <a
          href={`/overzicht?periode=${periode}`}
          className="flex h-[46px] items-center rounded-control border border-line-input bg-white px-4 text-[14px] font-semibold text-ink-muted"
        >
          annuleren
        </a>
      </div>
    </form>
  );
}
