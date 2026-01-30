import { getPageBySlug } from '@/lib/microcms/queries';
import RichText from '@/components/ui/RichText';
import Breadcrumb from '@/components/ui/Breadcrumb';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ご挨拶',
  description: 'アイ企画代表からのご挨拶です。',
};

export const revalidate = 3600;

export default async function MessagePage() {
  const page = await getPageBySlug('message');

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'ご挨拶' }]} />
      <h1 className="text-3xl font-bold mb-8">ご挨拶</h1>
      {page?.content ? (
        <div className="max-w-3xl mx-auto">
          <RichText content={page.content} />
        </div>
      ) : (
        <div className="max-w-3xl mx-auto prose prose-lg">
          <p>ご挨拶の内容はCMSから配信されます。</p>
        </div>
      )}
    </div>
  );
}
