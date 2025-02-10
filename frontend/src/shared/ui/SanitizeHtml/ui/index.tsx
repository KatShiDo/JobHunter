import sanitizeHtml from 'sanitize-html';

interface SanitizeHtmlProps {
  content: string;
  color?: string;
}

export const SanitizeHtmlViewer = ({ content, color }: SanitizeHtmlProps) => {
  const clean = sanitizeHtml(content, {
    allowedTags: [
      'b',
      'i',
      'em',
      'strong',
      'a',
      'ol',
      'li',
      'span',
      'strong',
      'mark',
      'sub',
      'sup',
      'br',
      'p',
      'div',
      'u',
    ],
    allowedAttributes: {
      a: ['href'],
    },
    allowedIframeHostnames: ['www.youtube.com'],
  });

  return <div style={{color: color}} dangerouslySetInnerHTML={{ __html: clean }} />;
};
