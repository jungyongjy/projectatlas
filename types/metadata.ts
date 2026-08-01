// ── Handbook metadata types ──

export interface HandbookMetadata {
  title: string;
  description: string;
  category: string;
  tags: string[];
  readingTime: string;
  lastUpdated: string;
  order?: number;
}
