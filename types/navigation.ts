// ── Navigation types ──
// Single source of truth for Atlas navigation structure

export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  children?: NavItem[];
  external?: boolean;
}

export interface NavGroup {
  title: string;
  icon?: string;
  items: NavItem[];
}

export interface NavigationConfig {
  groups: NavGroup[];
}
