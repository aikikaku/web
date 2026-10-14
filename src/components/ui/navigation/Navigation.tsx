'use client';

import Link from 'next/link';
import Image from 'next/image';
import Arrow from '@/components/ui/interactive/Arrow';
import { getContactUrl } from '@/lib/typeform';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { usePresence, presenceClass } from '@/lib/usePresence';

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
    image: '/images/about/service-customer.jpg',
  },
  {
    href: '/for-owner',
    label: '不動産をお持ちの方へ',
    sub: '売りたい・貸したい',
    image: '/images/about/service-owner.jpg',
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
  // 開閉のフェード（出る時も消える時もふわっと）
  const mega = usePresence(dropdownOpen, 300);
  const mobileMenu = usePresence(mobileOpen, 400);
  const pathname = usePathname();

  // 表示中のページが属するナビ項目（詳細ページ含む）。「アイ企画を知る」配下は 'about'
  const inSection = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const currentKey =
    [...navLinks, ...navLinksAfter].find((l) => l.href.startsWith('/') && inSection(l.href))?.href ??
    ([...dropdownLinks, ...dropdownCards].some((l) => inSection(l.href)) ? 'about' : null);

  const navItemClass = (key: string) => {
    const isCurrent = key === currentKey;
    const dimmed = dropdownOpen ? key !== 'about' : currentKey !== null && !isCurrent;
    return [
      'font-gothic font-medium text-base leading-none text-dark-green transition-opacity',
      dimmed ? 'opacity-40' : '',
      // メガメニューを開いている間はホバーで濃淡を変えない。
      // 表示中のページの項目は、ほかの項目をホバーしても透過させない（濃いまま）
      dropdownOpen || isCurrent ? '' : 'group-has-[>*:hover]/nav:opacity-40 hover:!opacity-100',
    ].join(' ');
  };
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
          <Link href="/" className="block shrink-0 transition-opacity hover:opacity-70">
            <Image
              src="/images/logo-dark.svg"
              alt="有限会社 アイ企画"
              width={232}
              height={38}
              priority
              className="w-[11rem] h-auto tablet:w-[14.5rem]"
            />
          </Link>

          {/* Desktop nav。表示中のページの項目以外、ホバー中の項目以外、メガメニューを開いている時は
              「アイ企画を知る」以外を 40% に透過する (Figma Header Type=Open 4470:13222 の表現。
              2026-10-14 MTG でホバーにも適用)。クリック範囲は文字だけにするため項目に padding は持たせず、
              項目間 32px は gap で取る (Figma の各ボタン左右 padding 16px 相当)。 */}
          <div className="group/nav hidden tablet:flex items-center gap-8">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={currentKey === item.href ? 'page' : undefined}
                className={navItemClass(item.href)}
              >
                {item.label}
              </Link>
            ))}

            {/* アイ企画を知る (ドロップダウントリガー)。ホバーで開き、トリガー/パネルから
                離れると閉じる (#17)。クリックはトグル（開いていれば閉じる）。 */}
            <button
              onClick={toggleDropdown}
              aria-expanded={dropdownOpen}
              className={navItemClass('about')}
            >
              <span
                onMouseEnter={openDropdown}
                onMouseLeave={scheduleCloseDropdown}
                className="relative flex items-center gap-1"
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
                {/* 文字↔パネル間の隙間（nav 下 padding 30px + ロゴとの高さ差）を跨ぐ
                    不可視ブリッジ（開いている時のみ・文字幅のみ）。 */}
                {dropdownOpen && (
                  <span
                    aria-hidden
                    className="absolute left-0 right-0 top-full h-[3rem]"
                  />
                )}
              </span>
            </button>

            {navLinksAfter.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                aria-current={currentKey === item.href ? 'page' : undefined}
                className={navItemClass(item.href)}
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
            {/* Figma 4470:16321 (ハンバーガー) / 4470:16320 (×): stroke 1.5, linecap square */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Desktop: フル幅ドロップダウンセクション。ホバー維持し、離れたら閉じる (#17)。 */}
      {mega.mounted && (
        <div
          className={`hidden tablet:block bg-light-green paper-texture paper-texture-light ${presenceClass(mega.visible)}`}
          onMouseEnter={openDropdown}
          onMouseLeave={scheduleCloseDropdown}
        >
          {/* パネルが開いてから中身が少し遅れてふわっと出る */}
          <div
            className={`flex items-start justify-between px-[4.6875rem] py-12 max-w-[90rem] mx-auto transition-opacity duration-500 ease-out motion-reduce:transition-none ${
              mega.visible ? 'opacity-100 delay-100' : 'opacity-0'
            }`}
          >
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
                    <Arrow />
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
      {mobileMenu.mounted && (
        <div className={`tablet:hidden bg-light-green paper-texture paper-texture-light px-[3.5rem] py-[5rem] flex flex-col gap-8 ${presenceClass(mobileMenu.visible, 'duration-[400ms]')}`}>
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
                  // 外部リンクアイコン (Figma 4470:16320: 四角 + 右上矢印, 16px, stroke 1.5)
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className="shrink-0 mb-0.5">
                    <path d="M12 8.66667V12.6667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V5.33333C2 4.97971 2.14048 4.64057 2.39052 4.39052C2.64057 4.14048 2.97971 4 3.33333 4H7.33333" />
                    <path d="M10 2H14V6" />
                    <path d="M8 8L14 2" />
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
