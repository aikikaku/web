'use client';

import Link from 'next/link';
import { useState } from 'react';

const navItems = [
  { href: '/properties', label: '物件を探す' },
  { href: '/stories', label: '暮らしを知る' },
  {
    label: 'アイ企画を知る',
    children: [
      { href: '/about', label: 'アイ企画について' },
      { href: '/message', label: 'ご挨拶' },
      { href: '/staff-interview', label: 'スタッフインタビュー' },
    ],
  },
  { href: '/for-customer', label: 'お探しの方へ' },
  { href: '/for-owner', label: 'お持ちの方へ' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            アイ企画
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex gap-6 items-center">
            {navItems.map((item) =>
              'children' in item && item.children ? (
                <li key={item.label} className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {item.label}
                  </button>
                  {dropdownOpen && (
                    <ul className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-2 min-w-[180px]">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                            onClick={() => setDropdownOpen(false)}
                          >
                            {child.label}
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
                    className="hover:text-blue-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="メニュー"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <ul className="lg:hidden mt-4 space-y-2 pb-4">
            {navItems.map((item) =>
              'children' in item && item.children ? (
                <li key={item.label}>
                  <span className="block px-2 py-2 font-semibold text-gray-500 text-sm">
                    {item.label}
                  </span>
                  <ul className="pl-4 space-y-1">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block px-2 py-2 hover:bg-gray-100 rounded"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href!}
                    className="block px-2 py-2 hover:bg-gray-100 rounded"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        )}
      </nav>
    </header>
  );
}
