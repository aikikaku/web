import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 会社情報 */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">アイ企画</h3>
            <p className="text-sm leading-relaxed">
              静岡県三島市を中心に、不動産の売買・賃貸を
              お手伝いしています。
            </p>
          </div>

          {/* サイトマップ */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">サイトマップ</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/properties" className="hover:text-white transition-colors">
                  物件を探す
                </Link>
              </li>
              <li>
                <Link href="/stories" className="hover:text-white transition-colors">
                  暮らしを知る
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  アイ企画について
                </Link>
              </li>
              <li>
                <Link href="/for-customer" className="hover:text-white transition-colors">
                  不動産をお探しの方へ
                </Link>
              </li>
              <li>
                <Link href="/for-owner" className="hover:text-white transition-colors">
                  不動産をお持ちの方へ
                </Link>
              </li>
              <li>
                <Link href="/voice" className="hover:text-white transition-colors">
                  お客様の声
                </Link>
              </li>
            </ul>
          </div>

          {/* リンク */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">その他</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} アイ企画 All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
