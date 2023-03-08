import ReactDOMServer from "react-dom/server";
import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import route from "ziggy-js";
import { Page } from "@inertiajs/core";

const appName = process.env.APP_NAME || "Laravel";

createServer((page: Page<any>) => {
  return createInertiaApp({
    render: ReactDOMServer.renderToString,
    page,
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
      resolvePageComponent(
        `./Pages/${name}.tsx`,
        import.meta.glob("./Pages/**/*.tsx")
      ),
    setup: ({ App, props }) => {
      globalThis.route = (name, params, absolute) =>
        route(name, params, absolute, {
          ...page.props.ziggy,
          location: new URL(page.props.ziggy.location),
        });

      return <App {...props} />;
    },
  });
}, Number(process.env.VITE_INERTIA_SSR_PORT) || 13714);
