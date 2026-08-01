import { readFileSync, existsSync, readdirSync } from "fs";
import { join } from "path";
import type { SearchIndex } from "@/types/search";

const CONTENT_ROOT = join(process.cwd(), "content");

/**
 * Build the search index from all MDX files at build time.
 * Extracts title, description, first 300 chars of content, category, and tags
 * from frontmatter. Falls back to filename for title.
 */
export function buildSearchIndex(): SearchIndex[] {
  const index: SearchIndex[] = [];

  function walkDir(dir: string, base: string[]) {
    if (!existsSync(dir)) return;

    const entries = readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        walkDir(join(dir, entry.name), [...base, entry.name]);
      } else if (entry.name.endsWith(".mdx")) {
        try {
          const filePath = join(dir, entry.name);
          const raw = readFileSync(filePath, "utf-8");
          const entry_data = extractSearchEntry(raw, entry.name, base);
          if (entry_data) {
            index.push(entry_data);
          }
        } catch {
          // Skip files that fail to parse
        }
      }
    }
  }

  walkDir(CONTENT_ROOT, []);
  return index;
}

/**
 * Extract a single search entry from raw MDX content.
 */
function extractSearchEntry(
  raw: string,
  filename: string,
  base: string[],
): SearchIndex | null {
  // Parse frontmatter manually (avoid async dependency)
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/);
  const fmText = fmMatch ? fmMatch[1] : "";
  const body = fmMatch ? raw.slice(fmMatch[0].length).trim() : raw;

  // Parse simple YAML-style frontmatter fields
  const title = extractFrontmatterField(fmText, "title") ?? filenameToTitle(filename, base);
  const description = extractFrontmatterField(fmText, "description") ?? "";
  const category = extractFrontmatterField(fmText, "category") ?? base[0] ?? "";
  const tagsRaw = extractFrontmatterField(fmText, "tags");

  const tags: string[] = tagsRaw
    ? tagsRaw
        .replace(/[\[\]'"]/g, "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  // Build href from base path segments
  const slug = filename === "index.mdx" ? base : [...base, filename.replace(".mdx", "")];
  const href = "/" + slug.join("/");

  // Extract first ~300 chars of plain text content for search
  const content = body
    .replace(/#{1,6}\s/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[<>]/g, "")
    .replace(/\n\s*\n/g, " ")
    .trim()
    .slice(0, 300);

  return {
    title,
    href,
    content: description ? `${description} ${content}` : content,
    category,
    tags,
  };
}

/**
 * Extract a single YAML frontmatter field value.
 */
function extractFrontmatterField(
  fmText: string,
  field: string,
): string | null {
  // Match field: value (single line)
  const lineMatch = fmText.match(
    new RegExp(`^${field}:\\s*(.+)$`, "m"),
  );
  if (lineMatch) return lineMatch[1].trim();

  // Match field: (multiline list)
  const multilineMatch = fmText.match(
    new RegExp(`^${field}:\\s*\\n([\\s\\S]*?)(?=^\\w|\\Z)`, "m"),
  );
  if (multilineMatch) return multilineMatch[1].trim();

  return null;
}

/**
 * Convert a filename to a readable title.
 * "zone-2.mdx" → "Zone 2"
 * "index.mdx" with base ["running"] → "Running"
 */
function filenameToTitle(filename: string, base: string[]): string {
  if (filename === "index.mdx") {
    const last = base[base.length - 1] ?? "";
    return last
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  return filename
    .replace(".mdx", "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
