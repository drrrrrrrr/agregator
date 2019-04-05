export interface IArticle {
  author?: string;
  content: string;
  description: string;
  source?: {id: string, name: string};
  title: string;
  url_img: string;
  url_to_source: string;
  publish_at: string;
}
