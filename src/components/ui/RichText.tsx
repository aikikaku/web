interface RichTextProps {
  content: string;
}

export default function RichText({ content }: RichTextProps) {
  return (
    <div
      className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-blue-600"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
