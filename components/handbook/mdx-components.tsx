import type { MDXComponents } from "mdx/types";
import { InfoBox } from "@/components/documentation/InfoBox";
import { CoachNote } from "@/components/documentation/CoachNote";
import { ScientificNote } from "@/components/documentation/ScientificNote";
import { WarningBox } from "@/components/documentation/WarningBox";
import { TipBox } from "@/components/documentation/TipBox";
import { ReferenceCard } from "@/components/documentation/ReferenceCard";
import { VersionTimeline } from "@/components/documentation/VersionTimeline";
import { DrillCard, DrillStep } from "@/components/documentation/DrillCard";
import { DecisionTree } from "@/components/decision/DecisionTree";
import { DecisionEngine } from "@/components/decision/DecisionEngine";
import { Figure } from "@/components/illustrations/Figure";

/**
 * Reusable MDX component map.
 * These components are available inside any .mdx file without explicit imports.
 */
export const mdxComponents: MDXComponents = {
  InfoBox,
  CoachNote,
  ScientificNote,
  WarningBox,
  TipBox,
  ReferenceCard,
  VersionTimeline,
  DrillCard,
  DrillStep,
  DecisionTree,
  DecisionEngine,
  Figure,

  // Semantic HTML overrides for consistent styling
  h1: ({ children, ...props }) => (
    <h1
      className="text-3xl sm:text-4xl font-bold tracking-tight text-atlas-text-primary mb-8 mt-6"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, id, ...props }) => (
    <h2
      id={id}
      className="text-2xl font-semibold text-atlas-text-primary mt-14 mb-5 pb-2 border-b border-atlas-border scroll-mt-10"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, id, ...props }) => (
    <h3
      id={id}
      className="text-xl font-semibold text-atlas-text-primary mt-10 mb-4 scroll-mt-10"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4
      className="text-lg font-medium text-atlas-text-primary mt-8 mb-3"
      {...props}
    >
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p
      className="text-base leading-[1.75] text-atlas-text-secondary mb-6 max-w-[72ch]"
      {...props}
    >
      {children}
    </p>
  ),
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="text-atlas-accent underline-offset-2 hover:underline transition-colors"
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul className="list-disc list-outside mb-6 pl-6 space-y-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal list-outside mb-6 pl-6 space-y-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="text-atlas-text-secondary leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-2 border-atlas-accent pl-4 my-4 text-atlas-text-secondary italic"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, className, ...props }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code
          className="font-mono text-sm bg-atlas-hover rounded px-1.5 py-0.5 text-atlas-text-primary"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }) => (
    <pre
      className="bg-atlas-surface border border-atlas-border rounded-lg p-4 overflow-x-auto my-4"
      {...props}
    >
      {children}
    </pre>
  ),
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto my-8">
      <table
        className="w-full border-collapse text-sm"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th
      className="text-left font-semibold text-atlas-text-primary px-4 py-2 border-b border-atlas-border bg-atlas-surface"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td
      className="px-4 py-2 border-b border-atlas-border text-atlas-text-secondary"
      {...props}
    >
      {children}
    </td>
  ),
  hr: (props) => <hr className="border-atlas-border my-10" {...props} />,
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-atlas-text-primary" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic text-atlas-text-secondary" {...props}>
      {children}
    </em>
  ),
};
