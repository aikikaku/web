import { getStaffInterviews } from '@/lib/microcms/queries';
import Image from 'next/image';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { getImageUrl } from '@/lib/microcms/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'スタッフインタビュー',
  description: 'アイ企画のスタッフをご紹介します。',
};

export const revalidate = 3600;

export default async function StaffInterviewPage() {
  const data = await getStaffInterviews().catch(() => ({ contents: [], totalCount: 0, offset: 0, limit: 20 }));

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'スタッフインタビュー' }]} />
      <h1 className="text-3xl font-bold mb-8">スタッフインタビュー</h1>

      {data.contents.length > 0 ? (
        <div className="space-y-16">
          {data.contents.map((staff) => (
            <article key={staff.id} className="max-w-3xl mx-auto">
              <div className="flex items-center gap-6 mb-6">
                {staff.photo && (
                  <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={getImageUrl(staff.photo, { width: 200, height: 200, format: 'webp' })}
                      alt={staff.staffName}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-bold">{staff.staffName}</h2>
                  {staff.position && (
                    <p className="text-gray-600">{staff.position}</p>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                {staff.questions.map((qa, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-blue-600 mb-2">
                      Q. {qa.question}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{qa.answer}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-12">
          スタッフインタビューはまだありません
        </p>
      )}
    </div>
  );
}
