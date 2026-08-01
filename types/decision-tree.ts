// ── Decision tree types ──

export interface DecisionOption {
  label: string;
  outcome: DecisionOutcome;
}

export interface DecisionOutcome {
  recommendation: string;
  reason: string;
  coachNotes?: string;
  scientificNotes?: string;
}

export interface DecisionNode {
  id: string;
  question: string;
  description?: string;
  options: DecisionOption[];
}

export interface DecisionTree {
  id: string;
  title: string;
  description: string;
  trigger: string;
  rootNode: DecisionNode;
}
