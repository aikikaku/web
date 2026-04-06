'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const navLinks = [
  { href: '/properties', label: '物件を探す' },
  { href: '/stories', label: '暮らしを知る' },
];

const dropdownLinks = [
  { href: '/about', label: 'アイ企画について' },
  { href: '/message', label: 'ご挨拶' },
  { href: '/staff-interview', label: 'スタッフ紹介' },
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

const navLinksAfter = [
  { href: '/voice', label: 'お客様の声' },
  { href: '/contact', label: 'お問い合わせ' },
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
  { href: '/contact', label: 'お問い合わせ' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-cream"
    >
      {/* ナビゲーションバー */}
      <nav className="px-[75px] py-[30px] max-w-[1440px] mx-auto max-tablet:px-5 max-tablet:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="block shrink-0">
            <Image
              src="/images/logo-dark.svg"
              alt="有限会社 アイ企画"
              width={232}
              height={38}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden tablet:flex items-center">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2.5 font-gothic font-medium text-base leading-none text-dark-green transition-opacity ${
                  dropdownOpen ? 'opacity-40' : 'hover:opacity-70'
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* アイ企画を知る (ドロップダウントリガー) */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 px-4 py-2.5 font-gothic font-medium text-base leading-none text-dark-green hover:opacity-70 transition-opacity"
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
            </button>

            {navLinksAfter.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2.5 font-gothic font-medium text-base leading-none text-dark-green transition-opacity ${
                  dropdownOpen ? 'opacity-40' : 'hover:opacity-70'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="tablet:hidden p-2"
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

      {/* Desktop: フル幅ドロップダウンセクション */}
      {dropdownOpen && (
        <div className="hidden tablet:block bg-light-green">
          <div className="flex items-start justify-between px-[75px] py-12 max-w-[1440px] mx-auto">
            {/* 左: サブページリンク */}
            <div className="flex flex-col gap-4 w-[558px] py-[30px]">
              {dropdownLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-gothic font-medium text-[18px] leading-none tracking-[0.018px] text-dark-green hover:opacity-70 transition-opacity"
                  onClick={() => setDropdownOpen(false)}
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
                  className="bg-cream rounded-3xl overflow-hidden p-6 flex flex-col gap-[30px] group"
                  onClick={() => setDropdownOpen(false)}
                >
                  {/* テキスト + 矢印 */}
                  <div className="flex items-end w-full">
                    <div className="flex-1 flex flex-col gap-1 px-3">
                      <span
                        className="font-mincho text-[18px] leading-[1.6] tracking-[0.04em] text-dark-green"
                        style={{ fontFeatureSettings: "'palt' 1" }}
                      >
                        {card.label}
                      </span>
                      <span className="font-gothic font-medium text-base leading-[2] text-dark-green">
                        {card.sub}
                      </span>
                    </div>
                    <span className="w-12 h-12 rounded-full bg-accent-blue flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>

                  {/* 画像 */}
                  <div className="w-[294px] h-[220px] relative rounded-xl overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.label}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="tablet:hidden px-5 pb-6 border-t border-gray-100 pt-6">
          <ul className="space-y-1">
            {allNavItems.map((item) =>
              'children' in item && item.children ? (
                <li key={item.label}>
                  <span className="block px-3 py-2 text-caption text-gray-500 uppercase tracking-widest">
                    {item.label}
                  </span>
                  <ul className="pl-4">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block px-3 py-3 text-dark-green text-body-s hover:bg-cream transition-colors rounded-lg"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {'cards' in item && item.cards && (
                    <ul className="pl-4 mt-1">
                      {item.cards.map((card) => (
                        <li key={card.href}>
                          <Link
                            href={card.href}
                            className="block px-3 py-3 text-dark-green text-body-s hover:bg-cream transition-colors rounded-lg"
                            onClick={() => setMobileOpen(false)}
                          >
                            {card.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href!}
                    className="block px-3 py-3 text-dark-green text-body-s hover:bg-cream transition-colors rounded-lg"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
