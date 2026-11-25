import { describe, expect, it } from 'vitest';
import { formatPropertyPrice, formatYen, formatYenText } from './propertyDisplay';
import type { Property } from '@/types/microcms';

const property = (fields: Partial<Property>) => fields as Property;

describe('formatYen', () => {
  it('円を万円にする', () => {
    expect(formatYen(38_000_000)).toEqual({ amount: '3,800', unit: '万円' });
    expect(formatYen(3_100_000)).toEqual({ amount: '310', unit: '万円' });
  });

  it('1万円に満たない端数は小数で出す', () => {
    expect(formatYen(38_005_000)).toEqual({ amount: '3,800.5', unit: '万円' });
  });

  it('1億円以上は億と万に分ける', () => {
    expect(formatYen(120_000_000)).toEqual({ amount: '1億2,000', unit: '万円' });
    expect(formatYen(100_000_000)).toEqual({ amount: '1', unit: '億円' });
  });

  it('formatYenText は数字と単位をつなげる', () => {
    expect(formatYenText(38_000_000)).toBe('3,800万円');
    expect(formatYenText(100_000_000)).toBe('1億円');
  });
});

describe('formatPropertyPrice', () => {
  it('価格は円から万円にする', () => {
    expect(formatPropertyPrice(property({ price: 58_000_000 }), false)).toEqual({ amount: '5,800', unit: '万円' });
  });

  it('賃料は円/月のまま出す', () => {
    expect(formatPropertyPrice(property({ rent: 72_000 }), false)).toEqual({ amount: '72,000', unit: '円/月' });
  });

  it('成約済みは金額を出さない', () => {
    expect(formatPropertyPrice(property({ price: 58_000_000 }), true)).toEqual({ amount: '-', unit: '万円' });
  });

  it('価格も賃料も無ければ応談', () => {
    expect(formatPropertyPrice(property({}), false)).toEqual({ amount: '応談', unit: '' });
  });
});
