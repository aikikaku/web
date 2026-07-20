import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CmsImage from './CmsImage';

const meta: Meta<typeof CmsImage> = {
  title: 'ui/misc/CmsImage',
  component: CmsImage,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof CmsImage>;

// mockStories (src/lib/mock/data.ts) の thumbnail 形状に合わせた MicroCMSImage
const sampleImage = { url: '/images/mock/story-1.jpg', width: 800, height: 600 };

export const WithImage: Story = {
  args: {
    image: sampleImage,
    alt: '家族の夢を叶えた、三島市谷田での新生活',
    width: 400,
    height: 300,
    className: 'rounded-2xl object-cover',
  },
};

export const Placeholder: Story = {
  name: 'Missing image (fallback)',
  args: {
    image: null,
    alt: '画像未設定の物件',
    width: 400,
    height: 300,
    className: 'rounded-2xl object-cover',
  },
};

export const FillContainer: Story = {
  render: (args) => (
    <div className="relative w-[400px] h-[300px] rounded-2xl overflow-hidden">
      <CmsImage {...args} />
    </div>
  ),
  args: {
    image: sampleImage,
    alt: '家族の夢を叶えた、三島市谷田での新生活',
    fill: true,
    className: 'object-cover',
    sizes: '400px',
  },
};
