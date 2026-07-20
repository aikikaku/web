import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import PropertyDetailClient from './PropertyDetailClient';
import { mockProperties } from '@/lib/mock/data';
import type { Property, MicroCMSImage } from '@/types/microcms';

/**
 * 本番 (src/app/properties/[id]/page.tsx) と同じ組み立て方で detailsSlot / spLabelsSlot を
 * 生成するヘルパー。物件詳細ページのヒーローカードで実際に渡している JSX 構造を流用する。
 */
function buildSlots(property: Property) {
  const isSold = property.status === 'sold';
  const statusLabel = isSold ? '成約済み' : property.status === 'negotiating' ? '商談中' : null;
  const categoryLabel =
    property.label ||
    (property.category === 'property'
      ? property.type === 'sell'
        ? '中古住宅'
        : '賃貸物件'
      : property.type === 'sell'
        ? '売土地'
        : '貸土地');
  const locationText = property.regions?.map((r) => r.name).join('・') || property.location || '';
  const priceValue = isSold
    ? '-'
    : property.price
      ? property.price.toLocaleString()
      : property.rent
        ? property.rent.toLocaleString()
        : null;
  const priceUnit = property.price ? '万円' : property.rent ? '円/月' : '';

  const spLabelsSlot = (
    <div className="flex items-center gap-2 min-w-0">
      <span className="tag-pill shrink-0">{categoryLabel}</span>
      {locationText && (
        <span className="font-gothic font-medium text-body-s text-dark-green truncate">
          {locationText}
        </span>
      )}
    </div>
  );

  const detailsSlot = (
    <div className="flex flex-col gap-6 tablet:gap-10 pt-4 tablet:pt-3 min-w-0">
      <div>
        <div className="hidden tablet:flex gap-3 items-center">
          {statusLabel && <span className="tag-pill-dark">{statusLabel}</span>}
          <span className="tag-pill">{categoryLabel}</span>
          {locationText && (
            <span className="font-gothic font-medium text-[1rem] leading-none text-dark-green">
              {locationText}
            </span>
          )}
        </div>
        <div className="py-6 tablet:py-[1.875rem]">
          <h1
            className="font-mincho text-[1.5rem] tablet:text-[2rem] leading-[1.5] tracking-[0.04em] text-black"
            style={{ fontFeatureSettings: "'palt' 1" }}
          >
            {property.title}
          </h1>
        </div>
        <div className="pb-4">
          <div className="flex border-t border-b border-dark-green/10">
            <div className="flex-1 border-r border-dark-green/10 pt-2 pb-4">
              <div className="pl-2">
                <span className="font-gothic font-medium text-body-s text-dark-green">価格</span>
              </div>
              <div className="flex items-end justify-center">
                <span className="font-gothic font-medium text-category-1 text-black px-1">
                  {priceValue || '応談'}
                </span>
                {priceUnit && (
                  <span className="font-gothic font-medium text-[0.875rem] leading-[1.5] text-black pb-1">
                    {priceUnit}
                  </span>
                )}
              </div>
            </div>
            {property.layout && (
              <div className="flex-1 pt-2 pb-4">
                <div className="pl-2">
                  <span className="font-gothic font-medium text-body-s text-dark-green">間取り</span>
                </div>
                <div className="flex items-end justify-center">
                  <span className="font-gothic font-medium text-category-1 text-black">
                    {property.layout}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center flex-wrap">
          {property.nearestStation && (
            <span className="font-gothic font-medium text-body-m text-black px-2">
              {property.nearestStation}
            </span>
          )}
          {property.constructionDate && (
            <span className="font-gothic font-medium text-body-m text-black px-2">
              築{property.constructionDate}
            </span>
          )}
        </div>
      </div>
      {!isSold && (
        <div>
          <a
            href="#property-detail-body"
            className="inline-flex items-center justify-center h-[2.75rem] px-6 border border-dark-green rounded-full font-gothic font-medium text-[1rem] leading-none text-dark-green transition-colors hover:bg-dark-green hover:text-white"
          >
            物件詳細
          </a>
        </div>
      )}
    </div>
  );

  return { spLabelsSlot, detailsSlot };
}

function toAllImages(property: Property): MicroCMSImage[] {
  return [property.mainImage, ...(property.images || [])].filter(Boolean) as MicroCMSImage[];
}

const meta: Meta<typeof PropertyDetailClient> = {
  title: 'property/PropertyDetailClient',
  component: PropertyDetailClient,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof PropertyDetailClient>;

const available = mockProperties[0]; // prop-1: 案内中・画像6枚
const soldWithStory = mockProperties.find((p) => p.id === 'prop-5')!; // 成約済み・画像1枚

export const Default: Story = {
  render: () => {
    const { detailsSlot, spLabelsSlot } = buildSlots(available);
    return (
      <div className="bg-light-green rounded-[2rem] p-4 tablet:p-[1.875rem]">
        <PropertyDetailClient
          allImages={toAllImages(available)}
          title={available.title}
          isSold={false}
          spLabelsSlot={spLabelsSlot}
          detailsSlot={detailsSlot}
        />
      </div>
    );
  },
};

// 成約済み: 画像に暗転オーバーレイがかかり、「物件詳細」アンカーボタンが非表示になる
export const Sold: Story = {
  render: () => {
    const { detailsSlot, spLabelsSlot } = buildSlots(soldWithStory);
    return (
      <div className="bg-light-green rounded-[2rem] p-4 tablet:p-[1.875rem]">
        <PropertyDetailClient
          allImages={toAllImages(soldWithStory)}
          title={soldWithStory.title}
          isSold
          spLabelsSlot={spLabelsSlot}
          detailsSlot={detailsSlot}
        />
      </div>
    );
  },
};

// detailsSlot を渡さないケース（画像ギャラリーのみのレイアウト、詳細カラムなし）
export const WithoutDetailsSlot: Story = {
  args: {
    allImages: toAllImages(available),
    title: available.title,
    isSold: false,
  },
};
