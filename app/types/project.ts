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
  status: ProjectStatus;
  stack: string[];
  brandColor: string;
  logo: string;
  logoText?: string | null;
  hero?: string | null;
  screenshots?: string[];
  links?: ProjectLinks;
  highlights: string[];
  featured: boolean;
  order: number;
}
