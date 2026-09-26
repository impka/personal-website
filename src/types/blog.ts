export default interface Blog {
  id: string;
  title: string;
  date?: string;
  contentHtml: string;
}

// what the blogs list shows for each post, derived from its markdown
export interface BlogSummary {
  id: string;
  title: string;
  date?: string;
  category?: string;
  excerpt: string;
  readingMinutes: number;
  cover?: { src: string; alt: string };
}
