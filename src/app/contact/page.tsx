import ContactForm from './ContactForm';
import type { Metadata } from 'next';
import Breadcrumb from '@/components/ui/navigation/Breadcrumb';
import { isInquiryCategory } from '@/lib/contact/inquiry';
import { getProperty } from '@/lib/microcms/queries';

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description:
    '不動産の購入・売却・賃貸に関するご相談やお問い合わせは、アイ企画までお気軽にどうぞ。',
};

/**
 * お問い合わせ。?category=buy|sell|parking|other で種類を、?property=<物件ID> で物件を選んだ状態で開く。
 */
export default async function ContactPage({ searchParams }: { searchParams: { category?: string; property?: string } }) {
  const found = searchParams.property ? await getProperty(searchParams.property).catch(() => null) : null;
  const property = found ? { id: found.id, title: found.title } : null;
  const initialCategory = property ? 'property' : isInquiryCategory(searchParams.category) ? searchParams.category : '';

  return (
    <div className="bg-cream">
      <Breadcrumb items={[{ label: 'お問い合わせ' }]} />
      <section className="page-container py-16 tablet:py-24">
        <div className="max-w-[49.5rem] mx-auto">
          {/* Heading */}
          <div className="flex flex-col gap-4 mb-12">
            <h1 className="tracking-wider">お問い合わせ</h1>
            <p className="text-body-m font-gothic font-medium text-dark-green/70">
              不動産に関するご相談やお問い合わせは、下記フォームよりお気軽にご連絡ください。
              <br />
              内容を確認次第、担当者よりご連絡いたします。
            </p>
          </div>

          {/* Contact info */}
          <div className="bg-light-green rounded-2xl p-6 tablet:p-8 mb-12">
            <div className="flex flex-col tablet:flex-row gap-6 tablet:gap-12">
              <div className="flex flex-col gap-1">
                <p className="font-gothic font-medium text-body-s text-dark-green/60">
                  お電話でのお問い合わせ
                </p>
                <p className="font-gothic font-medium text-lg text-dark-green">
                  TEL: 055-976-5300
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-gothic font-medium text-body-s text-dark-green/60">
                  所在地
                </p>
                <p className="font-gothic font-medium text-body-m text-dark-green">
                  静岡県三島市加茂18番地の7
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-gothic font-medium text-body-s text-dark-green/60">
                  営業時間
                </p>
                <p className="font-gothic font-medium text-body-m text-dark-green">
                  9:00〜19:00（時間外の対応可）
                  <br />
                  定休日：日曜日・祝日
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <ContactForm initialCategory={initialCategory} property={property} />
        </div>
      </section>
    </div>
  );
}
