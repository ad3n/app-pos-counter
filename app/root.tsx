import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import styles from "~/app.css?url"
import { useRouteError } from "@remix-run/react";
import { LoaderCenter } from "./components/Core/Spinner";
import { ToastProvider } from "./components/Context/Toast";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/icon-72x72.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/icon-72x72.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/icon-72x72.png',
  },
  {
    rel: 'icon',
    type: 'image/x-icon',
    href: '/icon-72x72.png',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="dark:bg-gray-900">
        <div className="container mx-auto sm:max-w-full h-screen max-w-lg">
          {children}
        </div>        
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        {/* add the UI you want your users to see */}
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (<div>
    <ToastProvider>
      <Outlet />
    </ToastProvider>
    
  </div>)
 
}

export function HydrateFallback() {
  return <LoaderCenter />
}
