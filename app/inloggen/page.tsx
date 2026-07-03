import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { PotMark } from "@/components/PotMark";
import { requestMagicLink } from "./actions";

export default async function InloggenPage() {
  const session = await auth();
  if (session) redirect("/overzicht");

  return (
    <main className="flex min-h-dvh flex-col justify-center px-8 py-16">
      <div className="mx-auto flex w-full max-w-sm flex-col gap-7">
        <div className="flex flex-col items-center gap-4">
          <PotMark size={64} />
          <div className="text-center">
            <div className="text-2xl font-bold tracking-tight">potjes</div>
            <div className="mt-1 text-sm text-ink-muted">onze potjes, elke maand opnieuw</div>
          </div>
        </div>

        <form action={requestMagicLink} className="flex flex-col gap-3">
          <label htmlFor="email" className="text-sm font-semibold text-ink-secondary">
            e-mailadres
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jij@voorbeeld.nl"
            className="h-[50px] rounded-control border border-line-input bg-white px-4 text-[15px] font-sans text-ink"
          />
          <button
            type="submit"
            className="mt-1 h-[50px] rounded-control bg-teal text-[15px] font-semibold text-white"
          >
            stuur inloglink
          </button>
          <p className="mt-2 text-center text-[13px] leading-relaxed text-ink-faint">
            we sturen je een link om in te loggen. geen wachtwoord nodig.
          </p>
        </form>
      </div>
    </main>
  );
}
