import { buildSearchIndex } from "@/lib/search";
import { DocsLayout } from "@/components/layout/DocsLayout";

export default function DocsRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Build the search index at build time (runs on server during SSG)
  const searchIndex = buildSearchIndex();

  return <DocsLayout searchIndex={searchIndex}>{children}</DocsLayout>;
}
