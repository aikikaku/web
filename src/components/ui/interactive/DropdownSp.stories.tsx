import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import DropdownSp from './DropdownSp';

// 実際の呼び出し例 (src/components/property/MobileFilterNav.tsx) に準拠したオプション
const propertyTypes = [
  { value: 'sell_property', label: '売物件' },
  { value: 'sell_land', label: '売土地' },
  { value: 'rent_property', label: '貸物件' },
  { value: 'rent_land', label: '貸土地' },
];

const meta: Meta<typeof DropdownSp> = {
  title: 'ui/interactive/DropdownSp',
  component: DropdownSp,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof DropdownSp>;

/** 未選択・閉じた状態 */
export const Closed: Story = {
  args: {
    isOpen: false,
    options: propertyTypes,
    selected: [],
    onToggle: () => {},
    onChange: () => {},
    onClear: () => {},
    placeholder: '物件',
  },
};

/** 開いた状態・未選択（チェックリストが表示される） */
export const OpenEmpty: Story = {
  args: {
    isOpen: true,
    options: propertyTypes,
    selected: [],
    onToggle: () => {},
    onChange: () => {},
    onClear: () => {},
    placeholder: '物件',
  },
};

/** 1件選択済み（pill 表示） */
export const OneSelected: Story = {
  args: {
    isOpen: false,
    options: propertyTypes,
    selected: ['sell_property'],
    onToggle: () => {},
    onChange: () => {},
    onClear: () => {},
    placeholder: '物件',
  },
};

/** 複数選択済み（先頭 pill + 「+N」バッジ） */
export const MultipleSelectedOpen: Story = {
  args: {
    isOpen: true,
    options: propertyTypes,
    selected: ['sell_property', 'rent_property', 'rent_land'],
    onToggle: () => {},
    onChange: () => {},
    onClear: () => {},
    placeholder: '物件',
  },
};

/** インタラクティブ版: 実際にトグル・クリアが動作する（useState でラップ） */
export const Interactive: Story = {
  render: () => {
    function Wrapper() {
      const [isOpen, setIsOpen] = useState(false);
      const [selected, setSelected] = useState<string[]>(['sell_property']);
      return (
        <DropdownSp
          isOpen={isOpen}
          onToggle={() => setIsOpen((v) => !v)}
          options={propertyTypes}
          selected={selected}
          onChange={(value) =>
            setSelected((prev) =>
              prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
            )
          }
          onClear={() => setSelected([])}
          placeholder="物件"
        />
      );
    }
    return <Wrapper />;
  },
};
