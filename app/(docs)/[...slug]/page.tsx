import type { Metadata } from "next";
import { getMdxPage, getHandbookMetadata, getAllContentSlugs } from "@/lib/mdx";
import { getAllNavigationSlugs } from "@/lib/navigation-slugs";
import { HandbookLayout } from "@/components/handbook/HandbookLayout";
import { ComingSoon } from "@/components/documentation/ComingSoon";

interface HandbookPageProps {
  params: Promise<{ slug: string[] }>;
}

/**
 * Build-time: enumerate all known routes (MDX content + navigation config).
 * This ensures navigation links never 404 — they show ComingSoon when
 * no MDX file exists yet.
 */
export async function generateStaticParams() {
  const contentSlugs = getAllContentSlugs();
  const navSlugs = getAllNavigationSlugs();

  // Merge unique slugs (using string key for dedup)
  const seen = new Set<string>();
  const allSlugs: { slug: string[] }[] = [];

  for (const slug of [...contentSlugs, ...navSlugs]) {
    const key = slug.join("/");
    if (!seen.has(key)) {
      seen.add(key);
      allSlugs.push({ slug });
    }
  }

  return allSlugs;
}

/**
 * Build-time: generate page metadata from frontmatter.
 */
export async function generateMetadata({
  params,
}: HandbookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const metadata = await getHandbookMetadata(slug);

  if (!metadata) {
    const fallbackTitle = slugToTitle(slug);
    return {
      title: fallbackTitle,
    };
  }

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.tags,
  };
}

/**
 * Handbook page — renders MDX content based on URL slug.
 * Falls back to ComingSoon when no MDX file exists for the route.
 */
export default async function HandbookPage({ params }: HandbookPageProps) {
  const { slug } = await params;
  const { content, metadata } = await getMdxPage(slug);

  // If we have MDX content, render it with the handbook layout
  if (content && metadata) {
    return <HandbookLayout metadata={metadata}>{content}</HandbookLayout>;
  }

  // No MDX content yet — show placeholder
  const title = metadata?.title ?? slugToTitle(slug);
  const description =
    metadata?.description ??
    "This section will be populated with detailed handbook content during the content authoring phases.";

  if (metadata) {
    return (
      <HandbookLayout metadata={metadata}>
        <ComingSoon title={title} description={description} />
      </HandbookLayout>
    );
  }

  return <ComingSoon title={title} description={description} />;
}

/**
 * Convert a slug array to a readable title.
 */
function slugToTitle(slug: string[]): string {
  if (slug.length === 1) {
    return slug[0].charAt(0).toUpperCase() + slug[0].slice(1);
  }
  return slug[slug.length - 1]
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
