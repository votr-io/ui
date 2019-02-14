export enum ROUTES {
  about = "/about",
  admin = "/admin",
  index = "/index",
  login = "/login",
  register = "/register",
  results = "/results",
  vote = "/vote",
  list = "/list"
}

export type DIRECTION = "h" | "v";

interface Link {
  from: ROUTES;
  to: ROUTES;
  direction: DIRECTION;
}

type LinkMap = Record<ROUTES, Record<ROUTES, DIRECTION>>;

const links: Link[] = [
  { from: ROUTES.index, to: ROUTES.admin, direction: "h" },
  { from: ROUTES.index, to: ROUTES.about, direction: "v" },
  { from: ROUTES.index, to: ROUTES.vote, direction: "v" },
  { from: ROUTES.admin, to: ROUTES.vote, direction: "v" },
  { from: ROUTES.admin, to: ROUTES.results, direction: "v" },
  { from: ROUTES.list, to: ROUTES.results, direction: "v" }
];

export const validLinks = links.reduce(
  (validLinks, link) => {
    const { from, to, direction } = link;

    validLinks[from] = { ...(validLinks[from] || {}), [to]: direction };

    return validLinks;
  },
  {} as LinkMap
);

export function matchRoute(pathname: string | undefined) {
  return Object.values(ROUTES).find(route =>
    (pathname || "").startsWith(route)
  );
}
