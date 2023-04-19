import { useAuth } from "@/hooks/use-auth";
import { lazy, Suspense, useMemo } from "react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { trpcProxy, withTRPC } from "./lib/trpc";
import { InitialLoading } from "./layouts/components/initial-loading";

import styles from "@/styles/tailwind.css";
import { Toaster } from "react-hot-toast";

const MemberLayout = lazy(() =>
  import("@/layouts").then((m) => ({ default: m.MemberLayout }))
);
const VisitorLayout = lazy(() =>
  import("@/layouts").then((m) => ({ default: m.VisitorLayout }))
);

export const links = () => [{ rel: "stylesheet", href: styles }];

export const loader = async () => {
  const user = await trpcProxy.auth.user.query();

  return { user };
};

export default withTRPC(function App() {
  const { isLoggedIn } = useAuth();

  const Layout = useMemo(
    () => (isLoggedIn ? MemberLayout : VisitorLayout),
    [isLoggedIn]
  );

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Suspense fallback={<InitialLoading />}>
          <div className="flex flex-col items-center min-h-[100vh]">
            <Layout>
              <Outlet />
            </Layout>
          </div>
        </Suspense>
        <Toaster />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
});
