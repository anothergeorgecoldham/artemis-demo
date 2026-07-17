# Artemis Demo

Artemis is a small Next.js application that demonstrates secure Microsoft Entra ID sign-in with [Auth.js](https://authjs.dev/). After authentication, a server-protected profile page displays the signed-in user's display name and email address.

## Prerequisites

- Node.js 20.9 or later
- A Microsoft Entra tenant where you can create an app registration

## 1. Create the Microsoft Entra app registration

1. Open the [Microsoft Entra admin center](https://entra.microsoft.com/) and go to **Identity > Applications > App registrations**.
2. Select **New registration**.
3. Enter a name such as `artemis-demo`.
4. Choose **Accounts in this organizational directory only** for a single-tenant demo.
5. Under **Redirect URI**, select **Web** and enter:

   ```text
   http://localhost:3000/api/auth/callback/microsoft-entra-id
   ```

6. Create the registration, then copy the **Application (client) ID** and **Directory (tenant) ID** from its overview page.
7. Go to **Certificates & secrets > Client secrets**, create a client secret, and copy its **Value** immediately.

The standard OpenID Connect scopes supplied by Entra are sufficient for this demo. No Microsoft Graph integration is required.

## 2. Configure the application

Install dependencies:

```bash
npm install
```

Copy `.env.example` to `.env.local`, then replace each placeholder:

```dotenv
AUTH_SECRET="a-long-random-value"
AUTH_MICROSOFT_ENTRA_ID_TENANT_ID="your-directory-tenant-id"
AUTH_MICROSOFT_ENTRA_ID_ID="your-application-client-id"
AUTH_MICROSOFT_ENTRA_ID_SECRET="your-client-secret-value"
AUTH_URL="http://localhost:3000"
```

Generate a strong Auth.js session secret with:

```bash
npx auth secret
```

This command may create or update `.env.local`; confirm that the resulting variable is named `AUTH_SECRET`. Environment files are ignored by Git, while `.env.example` is intentionally committed without real credentials.

## 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), select **Continue with Microsoft**, and sign in with an account from the registered tenant.

## Production configuration

- Add the production callback URI to the Entra app registration:
  `https://your-domain.example/api/auth/callback/microsoft-entra-id`
- Set `AUTH_URL` to the same HTTPS origin.
- Store `AUTH_SECRET` and the Entra client secret in the hosting platform's secret manager.
- Rotate client secrets regularly, restrict access to the app registration, and never expose secrets through `NEXT_PUBLIC_` variables.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run lint` | Run ESLint |
| `npm run build` | Create a production build and type-check the app |

The `/profile` route checks the session on the server and redirects unauthenticated visitors to the sign-in page. Auth.js uses encrypted, HTTP-only cookies and a JWT session strategy; credentials are handled only by Microsoft Entra ID.
