import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Nav } from "../components/site/Nav";
import { Footer } from "../components/site/Footer";
import { Cursor } from "../components/site/Cursor";
import { PageTransition } from "../components/site/PageTransition";
import { Toaster } from "../components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="grain flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <p className="mono text-[10px] uppercase tracking-widest text-ember">[ 404 — off the map ]</p>
        <h1 className="serif mt-4 text-7xl text-bone md:text-9xl">Not found.</h1>
        <p className="mt-4 text-bone/60">This page has slipped between the frames.</p>
        <Link to="/" className="mono mt-8 inline-block border border-bone/30 px-6 py-3 text-xs uppercase tracking-widest hover:bg-bone hover:text-ink">
          Return home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root" }); }, [error]);
  return (
    <div className="grain flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <p className="mono text-[10px] uppercase tracking-widest text-ember">[ Error ]</p>
        <h1 className="serif mt-4 text-5xl text-bone md:text-7xl">Something broke.</h1>
        <div className="mt-8 flex justify-center gap-3">
          <button onClick={() => { router.invalidate(); reset(); }} className="mono border border-bone/30 px-6 py-3 text-xs uppercase tracking-widest hover:bg-bone hover:text-ink">Try again</button>
          <a href="/" className="mono border border-bone/30 px-6 py-3 text-xs uppercase tracking-widest hover:bg-bone hover:text-ink">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "WeDo Studio — Design. Develop. Automate." },
      { name: "description", content: "WeDo is a digital studio building cinematic websites, mobile apps, and intelligent automations." },
      { name: "theme-color", content: "#0A0A0A" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "WeDo Studio — Design. Develop. Automate." },
      { property: "og:description", content: "Cinematic websites, mobile apps and intelligent automations." },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head><HeadContent /></head>
      <body className="grain min-h-screen bg-ink text-bone">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Cursor />
      <Nav />
      <PageTransition>
        <Outlet />
      </PageTransition>
      <Footer />
      <Toaster theme="dark" position="bottom-right" />
    </QueryClientProvider>
  );
}
