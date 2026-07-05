// Dev-only: force a full reload of the preview iframe whenever Vite's HMR
// signals an update or reconnect. Ensures the preview mirrors dev-server
// rebuilds without manual hard refreshes.
if (import.meta.env.DEV && typeof window !== "undefined" && import.meta.hot) {
  const reload = () => {
    try {
      window.location.reload();
    } catch {
      /* noop */
    }
  };

  // Any HMR update: reload rather than partial-patch, so SSR routes,
  // loaders, and server functions all pick up the new build.
  import.meta.hot.on("vite:afterUpdate", reload);
  // Vite explicitly requests a full page reload (e.g. non-HMR-able module).
  import.meta.hot.on("vite:beforeFullReload", reload);
  // Dev server restarted / websocket reconnected after a rebuild.
  import.meta.hot.on("vite:ws:connect", (() => {
    let first = true;
    return () => {
      if (first) {
        first = false;
        return;
      }
      reload();
    };
  })());
}

export {};
