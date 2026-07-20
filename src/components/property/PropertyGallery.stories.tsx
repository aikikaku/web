import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { within, userEvent } from 'storybook/test';
import PropertyGallery from './PropertyGallery';
import { mockProperties } from '@/lib/mock/data';

const withThumbs = mockProperties[0]; // prop-1: mainImage + 5枚 = サムネイル行あり
const singleImage = mockProperties[2]; // prop-3: images=[] = サムネイル行なし

const meta: Meta<typeof PropertyGallery> = {
  title: 'property/PropertyGallery',
  component: PropertyGallery,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof PropertyGallery>;

export const Default: Story = {
  args: { mainImage: withThumbs.mainImage, images: withThumbs.images },
};

// 画像が1枚のみの場合、サムネイル一覧は表示されない
export const SingleImage: Story = {
  args: { mainImage: singleImage.mainImage, images: singleImage.images },
};

// メイン画像クリックで開くライトボックス
export const LightboxOpen: Story = {
  args: { mainImage: withThumbs.mainImage, images: withThumbs.images },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const mainImageButton = canvas.getByAltText('物件画像');
    await userEvent.click(mainImageButton);
  },
};
