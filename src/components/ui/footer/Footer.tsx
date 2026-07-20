'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getContactUrl } from '@/lib/typeform';
import { FooterSocialLinks } from '@/components/ui/icons/icons';

const CONTACT_URL = getContactUrl();

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
    href: CONTACT_URL,
    external: CONTACT_URL.startsWith('http'),
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
      {/* Desktop: two columns side-by-side, px-[4.6875rem], py-[6rem] */}
      <div className="px-4 pt-16 pb-8 tablet:px-[4.6875rem] tablet:py-[6rem] max-w-[90rem] mx-auto">

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
                    className="flex items-center gap-1 text-cream text-lg font-gothic font-medium leading-none tracking-[0.00112rem] cursor-pointer"
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
                            className="text-body-s text-light-green hover:text-light-green/70 transition-colors"
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
                  className="inline-flex items-center gap-2 text-white text-lg font-gothic font-medium leading-none tracking-[0.00112rem] hover:text-white/70 transition-colors"
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
                  className="text-white text-lg font-gothic font-medium leading-none tracking-[0.00112rem] hover:text-white/70 transition-colors"
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
                className="inline-flex items-center justify-center border border-white rounded-full px-4 pt-0.5 pb-1 text-xs text-white leading-[1.8] hover:opacity-70 transition-opacity"
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
              <FooterSocialLinks />
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
                  className="inline-flex items-center justify-center border border-white rounded-full px-4 pt-0.5 pb-1 text-xs text-white leading-[1.8] hover:opacity-70 transition-opacity"
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
          <div className="flex items-end justify-between w-[25.5625rem]">
            <div className="flex flex-col gap-12">
              {/* Nav */}
              <nav className="flex flex-col gap-4">
                {footerNav.map((item) =>
                  'children' in item && item.children ? (
                    <div key={item.label} className="flex flex-col gap-2">
                      <button
                        onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                        className="flex items-center text-cream text-base font-gothic font-medium leading-none cursor-pointer"
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
                                className="text-body-s text-light-green hover:text-light-green/70 transition-colors"
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
                <FooterSocialLinks />
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
