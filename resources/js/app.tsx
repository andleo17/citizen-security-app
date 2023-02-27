import "./bootstrap";
import "../css/app.css";

import { hydrateRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { StrictMode } from "react";

const appName =
  window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob("./Pages/**/*.tsx")
    ),
  setup({ el, App, props }) {
    hydrateRoot(
      el,
      <StrictMode>
        <App {...props} />
      </StrictMode>
    );
  },
  progress: {
    color: "#4B5563",
  },
});
