export interface Tool {
  slug: string;
  title: string;
  description: string;
  tags?: string[];
}

export const tools: Tool[] = [
  {
    slug: 'pdf-extract',
    title: 'PDF文本提取',
    description: '仅在浏览器内从PDF提取文本并下载为 .txt',
  },
];
