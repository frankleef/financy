import { auth } from "@/lib/auth";

export default async function HomePage() {
  const session = await auth();

  return (
    <main className="max-w-md mx-auto p-4">
      <h1 className="text-lg font-medium">Potjes</h1>
      <p className="text-sm text-gray-500">
        {session?.user?.email ?? "Nog niet ingelogd"}
      </p>
      {/* Maandoverzicht component komt hier in stap 5 */}
    </main>
  );
}
