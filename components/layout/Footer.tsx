import Link from "next/link";
import { APP_VERSION, GITHUB_URL, APP_AUTHOR } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-atlas-border bg-atlas-bg-secondary">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 lg:px-8 py-6">
        <div className="flex items-center gap-4 text-xs text-atlas-text-muted">
          <span className="font-mono bg-atlas-surface border border-atlas-border rounded px-1.5 py-0.5">
            v{APP_VERSION}
          </span>
          <span>
            &copy; {currentYear} {APP_AUTHOR}
          </span>
        </div>

        <div className="flex items-center gap-5 text-xs text-atlas-text-muted">
          <Link
            href={GITHUB_URL}
            className="hover:text-atlas-text-secondary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
          <Link
            href="/version-history"
            className="hover:text-atlas-text-secondary transition-colors"
          >
            Version History
          </Link>
          <span>MIT Licence</span>
        </div>
      </div>
    </footer>
  );
}
