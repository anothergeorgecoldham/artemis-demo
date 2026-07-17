import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { signInWithMicrosoft } from "./actions";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect("/profile");
  }

  return (
    <main className="shell">
      <section className="auth-card" aria-labelledby="welcome-title">
        <div className="brand" aria-label="Artemis">
          <span className="brand-mark" aria-hidden="true">
            A
          </span>
          <span>Artemis</span>
        </div>

        <div className="hero-copy">
          <p className="eyebrow">Secure access</p>
          <h1 id="welcome-title">Welcome to Artemis</h1>
          <p className="lede">
            Sign in with your Microsoft work account to view your profile.
          </p>
        </div>

        <form action={signInWithMicrosoft}>
          <button className="button button-primary" type="submit">
            <svg
              aria-hidden="true"
              className="microsoft-mark"
              viewBox="0 0 20 20"
            >
              <path fill="#f25022" d="M1 1h8.5v8.5H1z" />
              <path fill="#7fba00" d="M10.5 1H19v8.5h-8.5z" />
              <path fill="#00a4ef" d="M1 10.5h8.5V19H1z" />
              <path fill="#ffb900" d="M10.5 10.5H19V19h-8.5z" />
            </svg>
            Continue with Microsoft
          </button>
        </form>

        <p className="privacy-note">
          Authentication is handled securely by Microsoft Entra ID. Artemis
          never sees your password.
        </p>
      </section>
      <p className="footer-note">
        A simple Auth.js and Next.js demonstration
      </p>
    </main>
  );
}
