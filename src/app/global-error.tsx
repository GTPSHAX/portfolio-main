"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);

  return (
    <html lang="en">
      <body>
        <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
          <h1 className="text-3xl font-semibold">Application error</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            A critical error occurred. You can retry or return home.
          </p>
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={reset}
              className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
            >
              Retry
            </button>
            <Link
              href="/"
              className="rounded-md border border-border px-4 py-2 text-foreground"
            >
              Back home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
