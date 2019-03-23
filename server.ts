import { createServer } from "http";
import * as next from "next";
import { parse } from "url";
import { matchRoute } from "./src/components/routes";
import console = require("console");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
console.log(process.env);
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url || "", true);
    const { pathname } = parsedUrl;

    const matchedRoute = matchRoute(pathname);

    if (matchedRoute) {
      return app.render(req, res, matchedRoute);
    }

    return handle(req, res, parsedUrl);
    //@ts-ignore
  }).listen(port, (err: any) => {
    if (err) throw err;
  });
});
