'use client';

import Link from 'next/link';
import Image from 'next/image';
import ArrowButton from '@/components/ui/interactive/ArrowButton';
import { getContactUrl } from '@/lib/typeform';
import { useState, useEffect, useRef } from 'react';

const navLinks = [
  { href: '/properties', label: '物件を探す' },
  { href: '/stories', label: '暮らしを知る' },
];

const dropdownLinks = [
  { href: '/about', label: 'アイ企画について' },
  { href: '/message', label: 'ご挨拶' },
  { href: '/staff-interview', label: 'スタッフインタビュー' },
];

const dropdownCards = [
  {
    href: '/for-customer',
    label: '不動産をお探しの方へ',
    sub: '買いたい・借りたい',
    image: '/images/home/service-customer.jpg',
  },
  {
    href: '/for-owner',
    label: '不動産をお持ちの方へ',
    sub: '売りたい・貸したい',
    image: '/images/home/service-owner.jpg',
  },
];

const CONTACT_URL = getContactUrl();
const CONTACT_EXTERNAL = CONTACT_URL.startsWith('http');

const navLinksAfter = [
  { href: '/voice', label: 'お客様の声' },
  { href: CONTACT_URL, label: 'お問い合わせ', external: CONTACT_EXTERNAL },
];

// Mobile用: 全navItems
const allNavItems = [
  { href: '/properties', label: '物件を探す' },
  { href: '/stories', label: '暮らしを知る' },
  {
    label: 'アイ企画を知る',
    children: dropdownLinks,
    cards: dropdownCards,
  },
  { href: '/voice', label: 'お客様の声' },
  { href: CONTACT_URL, label: 'お問い合わせ', external: CONTACT_EXTERNAL },
  { href: 'https://nakabito.jp', label: '仲人', external: true, showExternalIcon: true },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  // ホバーインテント: トリガー/パネルから離れたら遅延して閉じる（トリガー↔パネル間の
  // 隙間を跨ぐ猶予）。トリガー配下の不可視ブリッジと併用してチラつきを防ぐ。
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const openDropdown = () => {
    clearCloseTimer();
    setDropdownOpen(true);
  };
  // トリガー/パネルから離れたら閉じる（他ナビ項目へ移っても閉じる）。250ms の猶予で隙間を跨ぐ。
  const scheduleCloseDropdown = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 250);
  };
  // クリックはトグル: 開いていれば閉じ、閉じていれば開く。
  const toggleDropdown = () => {
    clearCloseTimer();
    setDropdownOpen((prev) => !prev);
  };
  const closeDropdown = () => {
    clearCloseTimer();
    setDropdownOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setDropdownOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-cream"
    >
      {/* ナビゲーションバー */}
      <nav className="px-[2.8125rem] py-[1.875rem] max-w-[90rem] mx-auto max-tablet:px-4 max-tablet:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="block shrink-0">
            <Image
              src="/images/logo-dark.svg"
              alt="有限会社 アイ企画"
              width={232}
              height={38}
              priority
              className="w-[11rem] h-auto tablet:w-[14.5rem]"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden tablet:flex items-center">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2.5 font-gothic font-medium text-base leading-none text-dark-green transition-colors ${
                  dropdownOpen ? 'opacity-40' : 'hover:text-accent-blue'
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* アイ企画を知る (ドロップダウントリガー)。ホバーで開き、トリガー/パネルから
                離れると閉じる (#17)。クリックはトグル（開いていれば閉じる）。 */}
            <button
              onClick={toggleDropdown}
              onMouseEnter={openDropdown}
              onMouseLeave={scheduleCloseDropdown}
              aria-expanded={dropdownOpen}
              className="relative flex items-center gap-1 px-4 py-2.5 font-gothic font-medium text-base leading-none text-dark-green hover:text-accent-blue transition-colors"
            >
              アイ企画を知る
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
              {/* トリガー↔パネル間の隙間を跨ぐ不可視ブリッジ（開いている時のみ・トリガー幅のみ）。
                  他ナビ項目のクリックを妨げないよう幅はボタン内に限定。 */}
              {dropdownOpen && (
                <span
                  aria-hidden
                  className="absolute left-0 right-0 top-full h-[1.875rem]"
                />
              )}
            </button>

            {navLinksAfter.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className={`px-4 py-2.5 font-gothic font-medium text-base leading-none text-dark-green transition-colors ${
                  dropdownOpen ? 'opacity-40' : 'hover:text-accent-blue'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="tablet:hidden p-2 -mr-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="メニュー"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Desktop: フル幅ドロップダウンセクション。ホバー維持し、離れたら閉じる (#17)。 */}
      {dropdownOpen && (
        <div
          className="hidden tablet:block bg-light-green"
          onMouseEnter={openDropdown}
          onMouseLeave={scheduleCloseDropdown}
        >
          <div className="flex items-start justify-between px-[4.6875rem] py-12 max-w-[90rem] mx-auto">
            {/* 左: サブページリンク */}
            <div className="flex flex-col gap-4 w-[34.875rem] py-[1.875rem]">
              {dropdownLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-gothic font-medium text-[1.125rem] leading-none tracking-[0.00112rem] text-dark-green hover:text-accent-blue transition-colors"
                  onClick={closeDropdown}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* 右: カードリンク */}
            <div className="flex gap-3">
              {dropdownCards.map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="bg-cream rounded-3xl overflow-hidden p-6 flex flex-col gap-[1.875rem] group"
                  onClick={closeDropdown}
                >
                  {/* テキスト + 矢印 */}
                  <div className="flex items-end w-full">
                    <div className="flex-1 flex flex-col gap-1 px-3">
                      <span
                        className="font-mincho text-heading-18 text-dark-green"
                        style={{ fontFeatureSettings: "'palt' 1" }}
                      >
                        {card.label}
                      </span>
                      <span className="font-gothic font-medium text-body-m text-dark-green">
                        {card.sub}
                      </span>
                    </div>
                    <ArrowButton />
                  </div>

                  {/* 画像（hover で拡大、他カードと統一 #43） */}
                  <div className="w-[18.375rem] h-[13.75rem] relative rounded-xl overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.label}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu (Figma 4211:25413 SP_nav_open 準拠: bg-light-green, px-56/py-80, gap-32) */}
      {mobileOpen && (
        <div className="tablet:hidden bg-light-green px-[3.5rem] py-[5rem] flex flex-col gap-8">
          {allNavItems.map((item) =>
            'children' in item && item.children ? (
              <div key={item.label} className="flex flex-col gap-4">
                <p className="font-gothic font-medium text-[1.25rem] leading-none text-dark-green">
                  {item.label}
                </p>
                <div className="flex flex-col gap-4 pl-4 pt-2">
                  {[...item.children, ...(('cards' in item && item.cards) || [])].map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block font-gothic font-medium text-[1rem] leading-none text-dark-green hover:opacity-60 transition-opacity"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                target={'external' in item && item.external ? '_blank' : undefined}
                rel={'external' in item && item.external ? 'noopener noreferrer' : undefined}
                className="inline-flex items-end gap-2 font-gothic font-medium text-[1.25rem] leading-none text-dark-green hover:opacity-60 transition-opacity"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
                {'showExternalIcon' in item && item.showExternalIcon && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mb-0.5">
                    <path d="M7 17L17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </Link>
            )
          )}
        </div>
      )}
    </header>
  );
}
