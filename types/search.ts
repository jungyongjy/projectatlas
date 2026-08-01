// ── Search types ──

export interface SearchResult {
  title: string;
  href: string;
  snippet: string;
  category: string;
  tags: string[];
  matches?: ReadonlyArray<{
    indices: ReadonlyArray<[number, number]>;
    value?: string;
    key?: string;
  }>;
}

export interface SearchIndex {
  title: string;
  href: string;
  content: string;
  category: string;
  tags: string[];
}
