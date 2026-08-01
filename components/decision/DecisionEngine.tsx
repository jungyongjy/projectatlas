"use client";

import { DecisionTree } from "@/components/decision/DecisionTree";
import { decisionTrees } from "@/lib/decision-data";

/**
 * Renders all decision trees from the decision data configuration.
 * Registered in MDX components so the Decision Engine page
 * can simply use <DecisionEngine />.
 */
export function DecisionEngine() {
  return (
    <div className="space-y-12">
      {decisionTrees.map((tree) => (
        <section key={tree.id}>
          <h3 className="text-lg font-semibold text-atlas-text-primary mb-1">
            {tree.title}
          </h3>
          <p className="text-sm text-atlas-text-muted mb-4">
            {tree.description}
          </p>
          <DecisionTree tree={tree.rootNode} />
        </section>
      ))}
    </div>
  );
}
