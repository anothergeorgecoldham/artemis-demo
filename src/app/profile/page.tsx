import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { signOutFromMicrosoft } from "../actions";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const displayName = session.user.name ?? "Microsoft user";
  const email = session.user.email ?? "Email not provided";
  const initial = displayName.trim().charAt(0).toUpperCase() || "A";

  return (
    <main className="shell">
      <section className="profile-card" aria-labelledby="profile-title">
        <header className="profile-header">
          <div className="brand" aria-label="Artemis">
            <span className="brand-mark" aria-hidden="true">
              A
            </span>
            <span>Artemis</span>
          </div>
          <span className="status">
            <span className="status-dot" aria-hidden="true" />
            Signed in
          </span>
        </header>

        <div className="profile-content">
          <div className="avatar" aria-hidden="true">
            {initial}
          </div>
          <div>
            <p className="eyebrow">Your profile</p>
            <h1 id="profile-title">{displayName}</h1>
            <p className="profile-email">{email}</p>
          </div>
        </div>

        <dl className="details">
          <div>
            <dt>Display name</dt>
            <dd>{displayName}</dd>
          </div>
          <div>
            <dt>Email address</dt>
            <dd>{email}</dd>
          </div>
          <div>
            <dt>Identity provider</dt>
            <dd>Microsoft Entra ID</dd>
          </div>
        </dl>

        <form action={signOutFromMicrosoft}>
          <button className="button button-secondary" type="submit">
            Sign out
          </button>
        </form>
      </section>
    </main>
  );
}
