export type PostRecord = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export type CommentRecord = {
  id: number;
  postId: number;
  author: string;
  content: string;
  createdAt: string;
};

function parseDate(value: string) {
  const normalized = value.includes('T') ? value : `${value.replace(' ', 'T')}Z`;
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? new Date(value) : date;
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(parseDate(value));
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(parseDate(value));
}

export function readingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function excerpt(content: string, maxLength = 160) {
  const text = content.replace(/\s+/g, ' ').trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}

export function paragraphs(content: string) {
  return content
    .split(/\r?\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}
