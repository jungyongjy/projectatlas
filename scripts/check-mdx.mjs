// scripts/check-mdx.mjs
// Regression gate for the MDX remark/rehype pipeline.
//
// Verifies every MDX file:
//   1. compiles with the same pipeline the site uses (remark-gfm + rehype-slug),
//   2. produces a real <table> node when its body contains pipe-table markup,
//   3. produces heading nodes that carry ids (rehype-slug) when its body
//      contains headings.
//
// The structural assertions (2 & 3) run against the hast tree rather than
// @mdx-js/mdx's compiled JS source, because compile() emits React JSX function
// calls, not HTML — string-matching HTML against it would false-positive
// ("table:" matches the component map) and false-negative (no <hN id= exists).
import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { compile } from "@mdx-js/mdx";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import { visit } from "unist-util-visit";

const root = join(process.cwd(), "content");
let failures = 0;
let checked = 0;

// Same remark/rehype pipeline the site uses for MDX (via next-mdx-remote),
// driven through unified so the resulting hast tree can be inspected.
// remark-parse -> remark-gfm -> remark-rehype (mdast -> hast) -> rehype-slug.
const toHast = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true });
const addSlug = unified().use(rehypeSlug);

async function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (entry.name.endsWith(".mdx")) {
      checked++;
      const src = readFileSync(full, "utf-8");
      const body = src.replace(/^---[\s\S]*?\n---/, "");
      const hasTableMarkup = /\|.*\|\s*\n\s*\|[-:| ]+\|/.test(body);
      const hasHeadings = /#{1,6}\s/m.test(body);
      try {
        // 1) Compile with the real MDX pipeline — catches malformed MDX/JSX.
        await compile(body, {
          outputFormat: "function-body",
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug],
        });

        // 2) Inspect the hast tree for table nodes and heading ids.
        const mdast = toHast.parse(body);
        const tree = await toHast.run(mdast);
        await addSlug.run(tree);
        let sawTable = false;
        let headingsWithoutId = 0;
        visit(tree, (node) => {
          const tag = node.tagName || "";
          if (tag === "table") sawTable = true;
          else if (/^h[1-6]$/.test(tag) && !(node.properties && node.properties.id)) {
            headingsWithoutId++;
          }
        });

        if (hasTableMarkup && !sawTable) {
          failures++;
          console.log(`FAIL: ${full} — table markup does not produce a table node`);
        }
        if (hasHeadings && headingsWithoutId > 0) {
          failures++;
          console.log(`FAIL: ${full} — headings carry no id`);
        }
      } catch (e) {
        failures++;
        console.log(`FAIL: ${full} — ${e.message}`);
      }
    }
  }
}
await walk(root);
console.log(`Checked ${checked} files, ${failures} failures.`);
process.exit(failures ? 1 : 0);
