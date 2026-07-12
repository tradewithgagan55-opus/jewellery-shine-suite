import { createFileRoute, redirect } from "@tanstack/react-router";

// Alias: /admin/dashboard → /admin (admin page IS the dashboard)
export const Route = createFileRoute("/admin/dashboard")({
  beforeLoad: () => {
    throw redirect({ to: "/admin" });
  },
});
