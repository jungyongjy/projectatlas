import { readFileSync, existsSync, readdirSync } from "fs";
import { join } from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import type { HandbookMetadata } from "@/types/metadata";
import { mdxComponents } from "@/components/handbook/mdx-components";

const CONTENT_ROOT = join(process.cwd(), "content");

/**
 * Resolve a URL slug to a content file path.
 * /running/zone-2 → content/running/zone-2.mdx
 * /running         → content/running/index.mdx
 */
function resolveContentPath(slug: string[]): string {
  const base = join(CONTENT_ROOT, ...slug);

  // Try exact match with .mdx first
  const mdxPath = `${base}.mdx`;
  if (existsSync(mdxPath)) return mdxPath;

  // Try index.mdx inside a directory
  const indexPath = join(base, "index.mdx");
  if (existsSync(indexPath)) return indexPath;

  return "";
}

/**
 * Extract the raw frontmatter and content from an MDX file using gray-matter.
 * Returns the parsed frontmatter object, raw MDX body, and stripped plain text.
 */
async function parseMdxFile(
  filePath: string,
): Promise<{
  frontmatter: Record<string, unknown>;
  rawContent: string;
  plainText: string;
}> {
  const raw = readFileSync(filePath, "utf-8");

  // Use dynamic import for gray-matter (ESM)
  const matter = (await import("gray-matter")).default;
  const { data, content } = matter(raw);

  // Strip markdown for reading time calculation
  const plainText = content
    .replace(/#{1,6}\s/g, "") // headings
    .replace(/\*\*([^*]+)\*\*/g, "$1") // bold
    .replace(/\*([^*]+)\*/g, "$1") // italic
    .replace(/`([^`]+)`/g, "$1") // inline code
    .replace(/```[\s\S]*?```/g, "") // code blocks
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links
    .replace(/[<>]/g, "") // JSX tags
    .replace(/\n\s*\n/g, " ") // collapse whitespace
    .trim();

  return { frontmatter: data, rawContent: content, plainText };
}

/**
 * Collect all MDX content paths for generateStaticParams.
 * Returns arrays of slug segments.
 */
export function getAllContentSlugs(): string[][] {
  const slugs: string[][] = [];

  function walkDir(dir: string, base: string[]) {
    if (!existsSync(dir)) return;

    const entries = readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        walkDir(join(dir, entry.name), [...base, entry.name]);
      } else if (entry.name.endsWith(".mdx")) {
        const slug =
          entry.name === "index.mdx"
            ? base
            : [...base, entry.name.replace(".mdx", "")];
        slugs.push(slug);
      }
    }
  }

  walkDir(CONTENT_ROOT, []);
  return slugs;
}

/**
 * Resolve metadata for a handbook page from its MDX file.
 * Falls back to sensible defaults when frontmatter is missing.
 */
export async function getHandbookMetadata(
  slug: string[],
): Promise<HandbookMetadata | null> {
  const filePath = resolveContentPath(slug);
  if (!filePath) return null;

  const { frontmatter, plainText } = await parseMdxFile(filePath);

  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 225));

  return {
    title:
      (frontmatter.title as string) ??
      formatSlugToTitle(slug[slug.length - 1]),
    description: (frontmatter.description as string) ?? "",
    category: (frontmatter.category as string) ?? slug[0],
    tags: (frontmatter.tags as string[]) ?? [],
    readingTime:
      readingTime < 1
        ? "Less than a minute"
        : readingTime === 1
          ? "1 minute"
          : `${readingTime} minutes`,
    lastUpdated: (frontmatter.lastUpdated as string) ?? "",
    order: frontmatter.order as number | undefined,
  };
}

/**
 * Compile an MDX file for rendering.
 * Returns the compiled MDX content as a React component and the metadata.
 */
export async function getMdxPage(
  slug: string[],
): Promise<{
  content: React.ReactNode | null;
  metadata: HandbookMetadata | null;
}> {
  const filePath = resolveContentPath(slug);
  if (!filePath) return { content: null, metadata: null };

  const { rawContent } = await parseMdxFile(filePath);
  const metadata = await getHandbookMetadata(slug);

  // Compile MDX with next-mdx-remote, injecting Atlas components
  try {
    const { content } = await compileMDX<Record<string, unknown>>({
      source: rawContent,
      components: mdxComponents,
      options: {
        parseFrontmatter: false, // already parsed above
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [],
        },
      },
    });

    return { content, metadata };
  } catch (error) {
    console.error(`Error compiling MDX at ${filePath}:`, error);
    return { content: null, metadata };
  }
}

/**
 * Convert a kebab-case slug to Title Case.
 */
export function formatSlugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
