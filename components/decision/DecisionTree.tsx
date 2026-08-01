"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  DecisionNode as DecisionNodeType,
  DecisionOutcome as DecisionOutcomeType,
} from "@/types/decision-tree";

interface DecisionTreeProps {
  tree: DecisionNodeType;
}

export function DecisionTree({ tree }: DecisionTreeProps) {
  return (
    <div className="my-6 rounded-lg border border-atlas-border bg-atlas-surface overflow-hidden">
      <DecisionTreeNode node={tree} depth={0} />
    </div>
  );
}

function DecisionTreeNode({
  node,
  depth,
}: {
  node: DecisionNodeType;
  depth: number;
}) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  return (
    <div>
      {/* Question */}
      <div
        className={cn(
          "px-5 py-4 border-b border-atlas-border",
          depth === 0 && "bg-atlas-accent/5",
        )}
      >
        <div className="flex items-start gap-3">
          <span
            className={cn(
              "inline-flex items-center justify-center rounded-full shrink-0 mt-0.5",
              "h-6 w-6 text-xs font-semibold",
              depth === 0
                ? "bg-atlas-accent text-white"
                : "bg-atlas-hover text-atlas-text-secondary",
            )}
          >
            {depth === 0 ? "?" : "→"}
          </span>
          <div>
            <p className="text-sm font-semibold text-atlas-text-primary">
              {node.question}
            </p>
            {node.description && (
              <p className="text-xs text-atlas-text-muted mt-1">
                {node.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="divide-y divide-atlas-border">
        {node.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isOutcome = "recommendation" in option.outcome;

          return (
            <div key={index}>
              <button
                type="button"
                onClick={() =>
                  setSelectedOption(isSelected ? null : index)
                }
                className={cn(
                  "w-full flex items-center gap-3 px-5 py-3 text-left transition-colors",
                  "hover:bg-atlas-hover focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-atlas-accent",
                  isSelected && "bg-atlas-hover",
                )}
                aria-expanded={isSelected}
              >
                <ChevronRight
                  className={cn(
                    "h-4 w-4 text-atlas-text-muted shrink-0 transition-transform duration-150",
                    isSelected && "rotate-90",
                  )}
                />
                <span className="text-sm text-atlas-text-secondary">
                  {option.label}
                </span>
              </button>

              {/* Expanded content */}
              {isSelected && (
                <div className="px-5 pb-4 pl-12">
                  {isOutcome ? (
                    <OutcomeDisplay
                      outcome={
                        option.outcome as DecisionOutcomeType
                      }
                    />
                  ) : (
                    <DecisionTreeNode
                      node={option.outcome as unknown as DecisionNodeType}
                      depth={depth + 1}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OutcomeDisplay({
  outcome,
}: {
  outcome: DecisionOutcomeType;
}) {
  return (
    <div className="space-y-3 pt-1">
      {/* Recommendation */}
      <div className="rounded-md bg-atlas-accent/5 border border-atlas-accent/20 p-3">
        <p className="text-xs font-semibold text-atlas-accent mb-1">
          Recommendation
        </p>
        <p className="text-sm text-atlas-text-primary font-medium">
          {outcome.recommendation}
        </p>
      </div>

      {/* Reason */}
      <p className="text-sm text-atlas-text-secondary leading-relaxed">
        <span className="font-medium text-atlas-text-primary">Why: </span>
        {outcome.reason}
      </p>

      {/* Coach Notes */}
      {outcome.coachNotes && (
        <div className="rounded-md bg-cyan-500/5 border border-cyan-500/20 p-3">
          <p className="text-xs font-semibold text-cyan-400 mb-1">
            Coach Notes
          </p>
          <p className="text-sm text-atlas-text-secondary leading-relaxed">
            {outcome.coachNotes}
          </p>
        </div>
      )}

      {/* Scientific Notes */}
      {outcome.scientificNotes && (
        <div className="rounded-md bg-purple-500/5 border border-purple-500/20 p-3">
          <p className="text-xs font-semibold text-purple-400 mb-1">
            Scientific Notes
          </p>
          <p className="text-sm text-atlas-text-secondary leading-relaxed">
            {outcome.scientificNotes}
          </p>
        </div>
      )}
    </div>
  );
}
