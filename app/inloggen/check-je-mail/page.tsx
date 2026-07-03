import { requestMagicLink } from "../actions";

export default async function CheckJeMailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <main className="flex min-h-dvh flex-col justify-center px-8 py-16">
      <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col items-center gap-5">
          <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-teal-light">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0f6e56" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3.5 6.5 L12 13 L20.5 6.5" />
            </svg>
          </div>
          <div className="text-center">
            <div className="text-[22px] font-bold">check je mail</div>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-secondary">
              we hebben een inloglink gestuurd naar{" "}
              {email ? <strong className="text-ink">{email}</strong> : "je e-mailadres"}. open de link
              op deze telefoon om verder te gaan.
            </p>
          </div>
        </div>

        <form action={requestMagicLink} className="flex flex-col gap-3">
          <input type="hidden" name="email" value={email ?? ""} />
          <button
            type="submit"
            className="h-[50px] rounded-control border border-teal-border bg-white text-[15px] font-semibold text-teal"
          >
            opnieuw versturen
          </button>
          <p className="mt-1 text-center text-[13px] leading-relaxed text-ink-faint">
            geen mail? check je spam of probeer het opnieuw.
          </p>
        </form>
      </div>
    </main>
  );
}
