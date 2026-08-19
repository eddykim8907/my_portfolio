export interface ProjectLinks {
  live?: string | null;
  repo?: string | null;
}

export type ProjectStatus = "Production" | "Internal" | "In development";

export interface ProjectContributionGroup {
  title: string;
  items: string[];
}

export interface ProjectStackGroup {
  category: string;
  items: string[];
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  role: string;
  year: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
  stack: string[];
  /** Optional grouped stack for the project detail page */
  stackGroups?: ProjectStackGroup[];
  brandColor: string;
  logo: string;
  logoText?: string | null;
  /** Short problem / product context shown above the demo */
  context?: string | null;
  /** One-line outcome shown on project cards when present */
  highlight?: string | null;
  /** Concrete ownership bullets — what you personally built */
  contribution?: string[];
  /** Optional grouped contribution sections for larger projects */
  contributionGroups?: ProjectContributionGroup[];
  /** Outcome paragraph shown after contribution */
  impact?: string | null;
  demo?: string | null;
  hero?: string | null;
  screenshots?: string[];
  links?: ProjectLinks;
  featured: boolean;
  order: number;
}
