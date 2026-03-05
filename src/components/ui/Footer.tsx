'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const footerNav = [
  {
    label: '物件を探す',
    href: '/properties',
  },
  {
    label: '暮らしを知る',
    href: '/stories',
  },
  {
    label: 'アイ企画を知る',
    children: [
      { href: '/about', label: 'アイ企画について' },
      { href: '/message', label: 'ご挨拶' },
      { href: '/staff-interview', label: 'スタッフインタビュー' },
      { href: '/for-customer', label: '不動産をお探しの方へ' },
      { href: '/for-owner', label: '不動産をお持ちの方へ' },
    ],
  },
  {
    label: 'お客様の声',
    href: '/voice',
  },
  {
    label: 'お問い合わせ',
    href: '/for-customer',
  },
  {
    label: '仲人',
    href: 'https://nakabito.jp',
    external: true,
  },
];

export default function Footer() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  return (
    <footer className="bg-dark-green text-white">
      {/* Mobile: single column, px-4, pt-16, pb-8 */}
      {/* Desktop: two columns side-by-side, px-page, py-24 */}
      <div className="px-4 pt-16 pb-8 tablet:px-page tablet:py-24 max-w-container mx-auto">

        {/* === Mobile Layout === */}
        <div className="flex flex-col gap-12 tablet:hidden">
          {/* Logo */}
          <Link href="/" className="block">
            <Image
              src="/images/logo-white.svg"
              alt="有限会社 アイ企画"
              width={210}
              height={34}
            />
          </Link>

          {/* Nav links - 18px on mobile */}
          <nav className="flex flex-col gap-6">
            {footerNav.map((item) =>
              'children' in item && item.children ? (
                <div key={item.label} className="flex flex-col gap-2">
                  <button
                    onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                    className="flex items-center gap-1 text-white text-lg font-gothic font-medium leading-none tracking-[0.018px] cursor-pointer"
                  >
                    <span>{item.label}</span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className={`transition-transform duration-300 ease-in-out ${isAccordionOpen ? 'rotate-180' : ''}`}
                    >
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight: isAccordionOpen ? '300px' : '0px',
                      opacity: isAccordionOpen ? 1 : 0,
                    }}
                  >
                    <ul className="flex flex-col gap-1 pl-4 pt-2">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="text-body-s text-white hover:text-white/70 transition-colors"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : 'external' in item && item.external ? (
                <a
                  key={item.href}
                  href={item.href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white text-lg font-gothic font-medium leading-none tracking-[0.018px] hover:text-white/70 transition-colors"
                >
                  {item.label}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <path d="M15 3h6v6" />
                    <path d="M10 14L21 3" />
                  </svg>
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className="text-white text-lg font-gothic font-medium leading-none tracking-[0.018px] hover:text-white/70 transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Address & TEL */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <p className="text-body-s text-white whitespace-nowrap">
                静岡県三島市加茂18番地の7
              </p>
              <a
                href="https://maps.google.com/?q=静岡県三島市加茂18番地の7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-white rounded-full px-4 pt-0.5 pb-1 text-xs text-white leading-[1.8] hover:bg-white/10 transition-colors"
              >
                Google Maps
              </a>
            </div>
            <p className="text-body-m text-white">
              TEL: 055-976-5300
            </p>
          </div>

          {/* Bottom: left(privacy+copyright) right(social) */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <Link
                href="/privacy-policy"
                className="text-caption text-white hover:text-white/70 transition-colors"
              >
                プライバシーポリシー
              </Link>
              <p className="text-caption text-white/70">
                &copy; 2026 Aikikaku. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white hover:text-white/70 transition-colors">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-white hover:text-white/70 transition-colors">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* === Desktop Layout === */}
        <div className="hidden tablet:flex tablet:items-start tablet:justify-between">
          {/* Left: Logo + Company info */}
          <div className="flex flex-col justify-between self-stretch">
            <Link href="/" className="block">
              <Image
                src="/images/logo-white.svg"
                alt="有限会社 アイ企画"
                width={283}
                height={46}
              />
            </Link>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-4">
                <p className="text-body-s text-white whitespace-nowrap">
                  静岡県三島市加茂18番地の7
                </p>
                <a
                  href="https://maps.google.com/?q=静岡県三島市加茂18番地の7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border border-white rounded-full px-4 pt-0.5 pb-1 text-xs text-white leading-[1.8] hover:bg-white/10 transition-colors"
                >
                  Google Maps
                </a>
              </div>
              <p className="text-body-m text-white">
                TEL: 055-976-5300
              </p>
            </div>
          </div>

          {/* Right: Nav + Privacy + Social + Copyright */}
          <div className="flex items-end justify-between w-[409px]">
            <div className="flex flex-col gap-12">
              {/* Nav */}
              <nav className="flex flex-col gap-4">
                {footerNav.map((item) =>
                  'children' in item && item.children ? (
                    <div key={item.label} className="flex flex-col gap-2">
                      <button
                        onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                        className="flex items-center text-white text-base font-gothic font-medium leading-none cursor-pointer"
                      >
                        <span>{item.label}</span>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          className={`ml-1 transition-transform duration-300 ease-in-out ${isAccordionOpen ? 'rotate-180' : ''}`}
                        >
                          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <div
                        className="overflow-hidden transition-all duration-300 ease-in-out"
                        style={{
                          maxHeight: isAccordionOpen ? '300px' : '0px',
                          opacity: isAccordionOpen ? 1 : 0,
                        }}
                      >
                        <ul className="flex flex-col gap-1 pl-4 pt-1">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="text-body-s text-white hover:text-white/70 transition-colors"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : 'external' in item && item.external ? (
                    <a
                      key={item.href}
                      href={item.href!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-white text-base font-gothic font-medium leading-none hover:text-white/70 transition-colors"
                    >
                      {item.label}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                        <path d="M15 3h6v6" />
                        <path d="M10 14L21 3" />
                      </svg>
                    </a>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href!}
                      className="text-white text-base font-gothic font-medium leading-none hover:text-white/70 transition-colors"
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </nav>

              {/* Privacy */}
              <Link
                href="/privacy-policy"
                className="text-body-s text-white hover:text-white/70 transition-colors"
              >
                プライバシーポリシー
              </Link>

              {/* Social */}
              <div className="flex items-center gap-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white hover:text-white/70 transition-colors">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-white hover:text-white/70 transition-colors">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Copyright */}
            <p className="text-body-s text-white whitespace-nowrap">
              &copy; 2026 Aikikaku. All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
