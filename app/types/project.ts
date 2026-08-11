export interface ProjectLinks {
  live?: string | null;
  repo?: string | null;
}

export type ProjectStatus = "Production" | "Internal" | "In development";

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
  brandColor: string;
  logo: string;
  logoText?: string | null;
  /** Short problem / product context shown above the demo */
  context?: string | null;
  /** Concrete ownership bullets — what you personally built */
  contribution?: string[];
  demo?: string | null;
  hero?: string | null;
  screenshots?: string[];
  links?: ProjectLinks;
  featured: boolean;
  order: number;
}
