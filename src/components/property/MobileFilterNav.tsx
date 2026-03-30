'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const propertyTypes = [
  { value: 'sell_property', label: '売物件' },
  { value: 'sell_land', label: '売土地' },
  { value: 'rent_property', label: '貸物件' },
  { value: 'rent_land', label: '貸土地' },
];

const regions = [
  '三島市',
  '長泉町',
  '清水町',
  '沼津市',
  '裾野市',
  '函南町',
  '伊豆の国市',
  'そのほかの地域',
];

export default function MobileFilterNav() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get('status') || 'all';
  const selectedTypes = searchParams.get('types')?.split(',').filter(Boolean) || [];
  const selectedRegions = searchParams.get('regions')?.split(',').filter(Boolean) || [];

  // ローカルステートで一時的にフィルター値を保持
  const [localStatus, setLocalStatus] = useState(currentStatus);
  const [localType, setLocalType] = useState(selectedTypes[0] || '');
  const [localRegion, setLocalRegion] = useState(selectedRegions[0] || '');

  const openModal = useCallback(() => {
    // モーダルを開く時に現在のパラメータを同期
    setLocalStatus(currentStatus);
    setLocalType(selectedTypes[0] || '');
    setLocalRegion(selectedRegions[0] || '');
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, [currentStatus, selectedTypes, selectedRegions]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
  }, []);

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams();
    if (localStatus && localStatus !== 'all') {
      params.set('status', localStatus);
    }
    if (localType) {
      params.set('types', localType);
    }
    if (localRegion) {
      params.set('regions', localRegion);
    }
    router.push(`/properties?${params.toString()}`);
    closeModal();
  }, [router, localStatus, localType, localRegion, closeModal]);

  const clearFilters = useCallback(() => {
    setLocalStatus('all');
    setLocalType('');
    setLocalRegion('');
  }, []);

  return (
    <div className="tablet:hidden">
      {/* フローティングバー */}
      <button
        onClick={openModal}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 bg-white rounded-full pl-6 pr-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.12)] border border-gray-100"
      >
        <span className="font-gothic font-medium text-[14px] leading-none text-dark-green whitespace-nowrap">
          物件を絞り込む
        </span>
        <span className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2.25 4.5H15.75" stroke="#2a363b" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M4.5 9H13.5" stroke="#2a363b" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M6.75 13.5H11.25" stroke="#2a363b" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      {/* モーダルオーバーレイ */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* 背景ぼかし */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* 閉じるボタン */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-dark-green flex items-center justify-center"
            aria-label="閉じる"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          {/* モーダルカード */}
          <div className="relative bg-white rounded-3xl px-6 py-8 w-full max-w-[340px] max-h-[80vh] overflow-y-auto">
            {/* ステータストグル */}
            <div className="flex rounded-full border border-dark-green mb-6 h-[52px] overflow-hidden">
              {[
                { value: 'all', label: 'すべて' },
                { value: 'available', label: 'ご案内中の物件' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setLocalStatus(option.value)}
                  className={`flex-1 font-gothic font-medium text-[14px] leading-none transition-colors ${
                    localStatus === option.value
                      ? 'bg-dark-green text-white rounded-full'
                      : 'bg-white text-dark-green'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {/* 物件種別ドロップダウン */}
            <div className="mb-4">
              <select
                value={localType}
                onChange={(e) => setLocalType(e.target.value)}
                className="w-full h-[52px] px-5 border border-gray-200 rounded-full text-[14px] font-gothic font-medium bg-white text-dark-green/30 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill%3D%22%232a363b%22%20d%3D%22M3%205l5%206%205-6%22/%3E%3C/svg%3E')] bg-[length:16px] bg-[right_20px_center] bg-no-repeat pr-12"
              >
                <option value="">物件</option>
                {propertyTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 地域ドロップダウン */}
            <div className="mb-8">
              <select
                value={localRegion}
                onChange={(e) => setLocalRegion(e.target.value)}
                className="w-full h-[52px] px-5 border border-gray-200 rounded-full text-[14px] font-gothic font-medium bg-white text-dark-green/30 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill%3D%22%232a363b%22%20d%3D%22M3%205l5%206%205-6%22/%3E%3C/svg%3E')] bg-[length:16px] bg-[right_20px_center] bg-no-repeat pr-12"
              >
                <option value="">地域</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            {/* アクションボタン */}
            <div className="flex items-center gap-3">
              <button
                onClick={applyFilters}
                className="flex-1 h-[52px] bg-dark-green text-white rounded-full font-gothic font-medium text-[14px] leading-none"
              >
                絞り込み
              </button>
              <button
                onClick={clearFilters}
                className="w-[52px] h-[52px] border border-gray-200 rounded-full flex items-center justify-center shrink-0"
                aria-label="条件をクリア"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M10.5 3.5L3.5 10.5M3.5 3.5l7 7" stroke="#2a363b" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
