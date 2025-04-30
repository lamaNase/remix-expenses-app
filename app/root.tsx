import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  useMatches,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import Error from "~/components/util/Error";
import "~/styles/shared.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const matches = useMatches();
  const disabled = matches.some(match => match.handle?.disabled);
  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        {!disabled && <Scripts />}
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <Layout>
      < Error title={isRouteErrorResponse(error) ? error.statusText : "Something went wrong"}>
        <main>
          <p>{isRouteErrorResponse(error) ? error.data : error.message}</p>
          <p>Back to <Link to="/">safety</Link></p>
        </main>
      </Error>
    </Layout>
  );
}

export default function App() {
  return <Outlet />;
}