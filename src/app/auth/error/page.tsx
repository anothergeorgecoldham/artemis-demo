import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign-in error",
};

type ErrorPageProps = {
  searchParams: Promise<{ error?: string }>;
};

const errorMessages: Record<string, string> = {
  AccessDenied: "Your account does not have permission to access Artemis.",
  Configuration:
    "Authentication is not configured correctly. Ask the application administrator to check the Entra settings.",
  OAuthCallbackError:
    "Microsoft could not complete the sign-in request. Please try again.",
  OAuthSignin: "The Microsoft sign-in service could not be reached.",
};

export default async function AuthErrorPage({
  searchParams,
}: ErrorPageProps) {
  const { error } = await searchParams;
  const message =
    (error && errorMessages[error]) ||
    "We could not sign you in. Please try again or contact the application administrator.";

  return (
    <main className="shell">
      <section className="error-card" aria-labelledby="error-title">
        <div className="error-icon" aria-hidden="true">
          !
        </div>
        <p className="eyebrow">Authentication error</p>
        <h1 id="error-title">Sign-in was not completed</h1>
        <p className="lede">{message}</p>
        <Link className="button button-primary" href="/">
          Return to sign in
        </Link>
      </section>
    </main>
  );
}
