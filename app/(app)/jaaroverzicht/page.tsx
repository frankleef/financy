import { PotMark } from "@/components/PotMark";

export default function JaaroverzichtPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
      <PotMark size={48} className="opacity-70" />
      <div>
        <div className="text-lg font-bold">binnenkort beschikbaar</div>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          het jaaroverzicht met trends over meerdere maanden bouwen we later.
        </p>
      </div>
    </div>
  );
}
