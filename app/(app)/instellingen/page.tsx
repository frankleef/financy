import { auth, signOut } from "@/lib/auth";

export default async function InstellingenPage() {
  const session = await auth();
  const email = session?.user?.email ?? "";
  const initialen = email.slice(0, 2).toUpperCase();

  return (
    <div className="flex h-full flex-col overflow-y-auto px-5 py-5">
      <div className="text-xl font-bold tracking-tight">instellingen</div>

      <div className="mt-6 text-xs font-bold tracking-wide text-ink-secondary">ingelogd als</div>
      <div className="mt-2 flex items-center gap-3 rounded-card border border-line-soft bg-white p-3.5">
        <span className="flex h-[42px] w-[42px] flex-none items-center justify-center rounded-full bg-teal-light text-[16px] font-bold text-teal">
          {initialen}
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[15px] font-semibold">{email}</div>
        </div>
      </div>

      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/inloggen" });
        }}
        className="mt-7"
      >
        <button
          type="submit"
          className="h-[50px] w-full rounded-control border border-destructive-border bg-white text-[15px] font-semibold text-destructive"
        >
          uitloggen
        </button>
      </form>
    </div>
  );
}
