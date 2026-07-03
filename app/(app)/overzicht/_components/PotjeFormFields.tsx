export function PotjeFormFields({
  defaultNaam = "",
  defaultType = "vast",
  defaultBedrag = "",
}: {
  defaultNaam?: string;
  defaultType?: "vast" | "variabel";
  defaultBedrag?: string;
}) {
  return (
    <>
      <input
        name="naam"
        type="text"
        required
        defaultValue={defaultNaam}
        placeholder="naam van het potje"
        className="h-[46px] rounded-control border border-line-input bg-white px-3.5 text-[15px] font-sans"
      />
      <div className="flex gap-2.5">
        <div className="flex flex-1 rounded-control border border-line-input bg-white p-1">
          <label className="flex-1">
            <input
              type="radio"
              name="type"
              value="vast"
              defaultChecked={defaultType === "vast"}
              className="peer sr-only"
            />
            <span className="block cursor-pointer rounded-[8px] py-2 text-center text-[13px] font-semibold text-ink-muted peer-checked:bg-teal peer-checked:text-white">
              vast
            </span>
          </label>
          <label className="flex-1">
            <input
              type="radio"
              name="type"
              value="variabel"
              defaultChecked={defaultType === "variabel"}
              className="peer sr-only"
            />
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
            defaultValue={defaultBedrag}
            placeholder="0,00"
            className="w-full border-none bg-transparent px-1 text-right text-[15px] font-sans outline-none"
          />
        </div>
      </div>
    </>
  );
}
