
-- Backfill: ensure the primary admin account has the admin role
INSERT INTO public.user_roles (user_id, role)
SELECT u.id, 'admin'::public.app_role
FROM auth.users u
WHERE lower(u.email) = 'cheluvecreations@gmail.com'
ON CONFLICT DO NOTHING;

-- Ensure trigger exists so future signups of the primary admin email auto-grant the role
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Bootstrap RPC: any authenticated user whose JWT email matches the primary admin email
-- can self-assign the admin role. Runs as definer so it bypasses RLS on user_roles.
CREATE OR REPLACE FUNCTION public.ensure_bootstrap_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  uid uuid := auth.uid();
  email text := lower(coalesce(auth.jwt() ->> 'email', ''));
BEGIN
  IF uid IS NULL THEN
    RETURN false;
  END IF;
  IF email <> 'cheluvecreations@gmail.com' THEN
    RETURN public.has_role(uid, 'admin');
  END IF;
  INSERT INTO public.user_roles (user_id, role)
  VALUES (uid, 'admin')
  ON CONFLICT DO NOTHING;
  RETURN true;
END;
$$;

REVOKE ALL ON FUNCTION public.ensure_bootstrap_admin() FROM public;
GRANT EXECUTE ON FUNCTION public.ensure_bootstrap_admin() TO authenticated;
