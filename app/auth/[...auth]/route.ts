import { redirect } from "next/navigation";
import { auth } from "@/edgedb";

export const { GET, POST } = auth.createAuthRouteHandlers({
  async onBuiltinUICallback({ error, tokenData, isSignUp }) {
    if (error) {
      console.error("sign in failed", error);
    }
    if (!tokenData) {
      console.log("email verification required");
    }
    if (isSignUp) {
      const client = auth.getSession().client;
      await client.query(`
        INSERT User {
          name := '',
          email := '',
          userRole := 'user',
          identity := (global ext::auth::ClientTokenIdentity)
        }
      `);
    }
    redirect("/");
  },
  onSignout() {
    redirect("/");
  },
});
