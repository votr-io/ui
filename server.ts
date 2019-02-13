import { createServer } from "http";
import { parse } from "url";
import * as next from "next";

import { ROUTES } from "./components/routes";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url || "", true);
    const { pathname } = parsedUrl;

    const dynamicRoutes = [
      ROUTES.admin,
      ROUTES.register,
      ROUTES.results,
      ROUTES.vote
    ];

    const matchedRoute = dynamicRoutes.find(route =>
      (pathname || "").startsWith(`/${route}`)
    );

    if (matchedRoute) {
      return app.render(req, res, `/${matchedRoute}`);
    }

    return handle(req, res, parsedUrl);
  }).listen(3000, (err: any) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
