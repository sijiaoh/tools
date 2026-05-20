export interface Tool {
  slug: string;
  title: string;
  description: string;
  tags?: string[];
}

export const tools: Tool[] = [];
