"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";

export async function signInWithMicrosoft() {
  try {
    await signIn("microsoft-entra-id", { redirectTo: "/profile" });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect(`/auth/error?error=${encodeURIComponent(error.type)}`);
    }

    throw error;
  }
}

export async function signOutFromMicrosoft() {
  await signOut({ redirectTo: "/" });
}
