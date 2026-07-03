import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { TabBar } from "@/components/TabBar";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/inloggen");

  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex-1 overflow-hidden">{children}</main>
      <TabBar />
    </div>
  );
}
