import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ServiceCTA from './ServiceCTA';

const meta: Meta<typeof ServiceCTA> = {
  title: 'ui/card/ServiceCTA',
  component: ServiceCTA,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof ServiceCTA>;

/** デフォルト画像 (全ページ共通・引数省略) */
export const Default: Story = {};
