import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { HeroSetProvider, HeroSetSlot } from './HeroSets';
import { HERO_SETS } from '@/lib/heroSets';

const meta: Meta<typeof HeroSetSlot> = {
  title: 'home/HeroSets',
  component: HeroSetSlot,
};
export default meta;

type Story = StoryObj<typeof HeroSetSlot>;

const frame = (w: number, h: number, r: number) => ({
  position: 'relative' as const,
  width: w,
  height: h,
  overflow: 'hidden',
  borderRadius: r,
});

// トップ PC ヒーローの3枠（縮小）。セット単位で同時に切り替わり、各セットで1枠が動画になる
export const ThreeSlots: Story = {
  render: () => (
    <HeroSetProvider sets={HERO_SETS}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <div style={frame(279, 371, 16)}>
          <HeroSetSlot slot="main" alt="三島の風景" sizes="279px" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={frame(110, 147, 16)}>
            <HeroSetSlot slot="topRight" alt="三島の暮らし" sizes="110px" />
          </div>
          <div style={frame(103, 77, 12)}>
            <HeroSetSlot slot="bottomRight" alt="三島の街並み" sizes="103px" />
          </div>
        </div>
      </div>
    </HeroSetProvider>
  ),
};
