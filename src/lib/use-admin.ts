import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

const BOOTSTRAP_ADMIN_EMAIL = "cheluvecreations@gmail.com";

export function useAuthUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return { user, loading };
}

export function useIsAdmin(userId: string | undefined) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;
    if (!userId) {
      setIsAdmin(false);
      setChecking(false);
      return;
    }
    setChecking(true);

    (async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const email = sessionData.session?.user?.email?.toLowerCase() ?? "";

      // 1) Check user_roles for admin
      const { data: roleRow } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();

      if (roleRow) {
        if (!cancelled) { setIsAdmin(true); setChecking(false); }
        return;
      }

      // 2) Bootstrap: if signed in as the primary admin email, self-assign via RPC.
      if (email === BOOTSTRAP_ADMIN_EMAIL) {
        const { data: ok } = await supabase.rpc("ensure_bootstrap_admin");
        if (!cancelled) {
          setIsAdmin(!!ok);
          setChecking(false);
        }
        return;
      }

      if (!cancelled) { setIsAdmin(false); setChecking(false); }
    })();

    return () => { cancelled = true; };
  }, [userId]);

  return { isAdmin, checking };
}
