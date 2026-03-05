interface RichTextProps {
  content: string;
}

export default function RichText({ content }: RichTextProps) {
  return (
    <div
      className="prose prose-lg max-w-none prose-headings:font-mincho prose-headings:text-dark-green prose-headings:tracking-wider prose-a:text-accent-blue prose-img:w-full"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
