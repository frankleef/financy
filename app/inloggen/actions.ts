"use server";

import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";

export async function requestMagicLink(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!email.includes("@")) {
    redirect("/inloggen?error=ongeldig-email");
  }

  try {
    await signIn("resend", { email, redirect: false });
  } catch (error) {
    if (!(error instanceof AuthError)) throw error;
    // Bewust stil: ook voor niet-gewhitelisте adressen tonen we dezelfde
    // bevestiging, zodat we niet lekken wie er wel/niet mag inloggen.
    console.error("magic link signIn geweigerd", error);
  }

  redirect(`/inloggen/check-je-mail?email=${encodeURIComponent(email)}`);
}
