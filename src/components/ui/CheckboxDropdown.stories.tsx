import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CheckboxDropdown from './CheckboxDropdown';

const meta: Meta<typeof CheckboxDropdown> = {
  title: 'ui/CheckboxDropdown',
  component: CheckboxDropdown,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof CheckboxDropdown>;

// 実際の呼び出し例 (PropertyFilter.tsx): 物件種別のドロップダウン
const propertyTypes = [
  { value: 'sell_property', label: '売物件' },
  { value: 'sell_land', label: '売土地' },
  { value: 'rent_property', label: '貸物件' },
  { value: 'rent_land', label: '貸土地' },
];

// StoriesFilter.tsx: カテゴリのドロップダウン (variant="light-green")
const categoryOptions = [
  { value: 'すべて', label: 'すべて' },
  { value: 'property', label: '物件のこと' },
  { value: 'regional', label: '地域のこと' },
  { value: 'daily', label: '暮らしのこと' },
];

function Interactive(props: React.ComponentProps<typeof CheckboxDropdown>) {
  const [selected, setSelected] = useState(props.selected);
  return (
    <CheckboxDropdown
      {...props}
      selected={selected}
      onToggle={(value) =>
        setSelected((prev) =>
          prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
        )
      }
      onClear={props.onClear ? () => setSelected([]) : undefined}
    />
  );
}

export const Default: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    label: '物件',
    options: propertyTypes,
    selected: [],
    onToggle: () => {},
    onClear: () => {},
  },
};

export const SingleSelected: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    label: '物件',
    options: propertyTypes,
    selected: ['sell_property'],
    onToggle: () => {},
    onClear: () => {},
  },
};

export const MultipleSelected: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    label: '物件',
    options: propertyTypes,
    selected: ['sell_property', 'sell_land', 'rent_property'],
    onToggle: () => {},
    onClear: () => {},
  },
};

export const LightGreenVariant: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    label: 'カテゴリ',
    options: categoryOptions,
    selected: [],
    onToggle: () => {},
    variant: 'light-green',
  },
};
