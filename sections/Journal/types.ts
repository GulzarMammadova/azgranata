export type JournalLayout = "featured" | "editorial";

export type JournalCategory =
  | "HARVEST"
  | "INNOVATION"
  | "AWARDS"
  | "PEOPLE"
  | "EVENTS"
  | "EXPORT";

export interface JournalArticle {
  id: string;

  slug: string;

  title: string;

  excerpt: string;

  category: JournalCategory;

  readTime: string;

  date: string;

  publishedAt: string;

  image: string;

  featured?: boolean;

  position?: "featured" | "editorial" | "standard";
}

export interface JournalQuote {
  text: string;

  author: string;
}