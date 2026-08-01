import { navigationConfig } from "@/lib/navigation";

/**
 * Extract all URL slugs from the navigation configuration.
 * Used by generateStaticParams to pre-render every navigation route
 * at build time, even before MDX content is authored.
 */
export function getAllNavigationSlugs(): string[][] {
  const slugs: string[][] = [];

  for (const group of navigationConfig.groups) {
    for (const item of group.items) {
      // Top-level item (e.g., /blueprint)
      slugs.push(item.href.split("/").filter(Boolean));

      // Child items (e.g., /running/zone-2)
      if (item.children) {
        for (const child of item.children) {
          slugs.push(child.href.split("/").filter(Boolean));
        }
      }
    }
  }

  return slugs;
}
