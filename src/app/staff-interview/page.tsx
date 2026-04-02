import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'スタッフインタビュー',
  description: 'アイ企画のスタッフをご紹介します。地域に開かれたサステナブルな不動産屋を目指して。',
};

type Speaker = 'moderator' | 'daichi' | 'tsunenari';

interface InterviewItem {
  speaker: Speaker;
  text: string;
}

interface InterviewSection {
  type: 'conversation' | 'heading' | 'heading-with-image' | 'photos';
  heading?: string;
  image?: string;
  items?: InterviewItem[];
}

const speakerInfo: Record<Speaker, { name: string; avatar: string | null }> = {
  moderator: { name: '司会', avatar: null },
  daichi: { name: '大地', avatar: '/images/staff-interview/avatar-daichi.jpg' },
  tsunenari: { name: '恒成', avatar: '/images/staff-interview/avatar-tsunenari.jpg' },
};

const interviewSections: InterviewSection[] = [
  {
    type: 'conversation',
    items: [
      {
        speaker: 'moderator',
        text: '今日はよろしくお願いします。私、お父さん（社長） には随分お世話になってきたんです。畑を借りたのがきっかけで親しくなり、祖父母の家や自分の家を売却してもらい、子育てや車のこと、果樹のことなど、不動産に限らずアドバイスしてもらいました。今は若いお二人が会社を引っ張っているのですね！',
      },
      {
        speaker: 'daichi',
        text: '私は2014年からアイ企画の仕事をしています。大学では建築を専攻して、工務店に就職して大工をしていました。',
      },
      {
        speaker: 'moderator',
        text: '不動産業を手伝うつもりはあったんですか？',
      },
      {
        speaker: 'daichi',
        text: '知らない人と話をするのが苦手だったので、実家を手伝うなんて思ってもみませんでした。',
      },
      {
        speaker: 'tsunenari',
        text: '私も家業を継ぐことは考えていませんでした。大学進学をきっかけに上京して、途中でアメリカのポートランドに留学、社会人になってからはゼネコンで現場監督をして全国転勤を経験しました。退職して3ヶ月ほど旅人をして、2019年に三島に戻ってきてアイ企画で働き始めました。',
      },
      {
        speaker: 'moderator',
        text: 'お二人とも、三島で生まれ育ったのですか？',
      },
      {
        speaker: 'daichi',
        text: 'そうです。三島市加茂で生まれて、加茂で育ちました。',
      },
      {
        speaker: 'moderator',
        text: '大人になってみて、地域の印象はどうですか？',
      },
      {
        speaker: 'daichi',
        text: '山田学区って良いところだったんだなと感じます。今は妻が新幹線通勤していることもあり三島駅前に住んでいますが、駅前だと車との距離が近くて危ないので、子どもを自由に遊ばせてあげられない。保育園の後や休みの日には山田学区の公園や川などで自由にのびのび遊んでいます。',
      },
      {
        speaker: 'tsunenari',
        text: '坂が多くて高校に通うのが大変で、当時は東京に出たかったですね。国内外のいろいろな街のことを知って初めて、三島にも目が向くようになりました。三島には自然がたくさんあるし、面白い人がたくさんいる、とても魅力的な街だと思います。',
      },
      {
        speaker: 'moderator',
        text: '恒成さんは、今はどちらにお住まいなんですか？',
      },
      {
        speaker: 'tsunenari',
        text: '加茂の実家に住んでいます。（最近、三島市内に古民家を購入。現在改装中。）',
      },
      {
        speaker: 'moderator',
        text: 'ご両親と一緒に暮らしているんですね。そういえば、お父さんと一緒に畑仕事をしている姿を見かけたことがあります。',
      },
      {
        speaker: 'tsunenari',
        text: '畑や自然が好きなんです。だから、アイ企画の取り組みのひとつ「コンポスト活動」のような、サステナブルな生活を提案していきたくて。',
      },
      {
        speaker: 'daichi',
        text: '不動産屋だからといって、不動産の売買だけやっていても、やりがいがないように感じてしまう。地域をつくることが、私たちの役目だと思っています。',
      },
    ],
  },
  { type: 'heading', heading: '三島の魅力を伝え続けるということ' },
  {
    type: 'conversation',
    items: [
      {
        speaker: 'moderator',
        text: 'お父さんも、地域全体のこと、社会や地球の循環のことをよくおっしゃっていました。大地さんや恒成さんにもその意志が受け継がれているようですね。',
      },
      {
        speaker: 'daichi',
        text: '父は35年間「三島ってこんなにいいところなんだよ」とお客様に伝え続けていました。他の地域の物件を探している人にでも、その人に合う学区を探し、時間と労力をかけて魅力を伝えていました。',
      },
      {
        speaker: 'tsunenari',
        text: 'お客様本位なんですよね。新築を希望されている人にも、その人のこれからの子育てにかかる費用とか将来のことを考えて中古を進めたり…そんなだから合わないお客様もいましたけど、お客様の人生をまじめに考えてこそ信頼も得られてきたと思います。',
      },
      {
        speaker: 'moderator',
        text: 'そんな真摯な不動産屋さんって、滅多にいないような気がします。',
      },
      {
        speaker: 'daichi',
        text: '僕らの場合は同じ地域内で生活しているから、売れたら終わりではないし、売れたら終わりではいけないと思っています。かつて父の仲介で不動産を購入された人が、いま私たちのところに売却の相談などに来られていたりもするんです。私たちも、次の世代に繋げられるような不動産屋でいたいと思います。',
      },
    ],
  },
  {
    type: 'heading-with-image',
    heading: '中古住宅も大切にする「もったいない精神」',
    image: '/images/staff-interview/photo-caption.jpg',
  },
  {
    type: 'conversation',
    items: [
      {
        speaker: 'tsunenari',
        text: '父の「もったいない精神」も受け継ぎたいことのひとつです。父は新築全盛の時代から中古住宅の活用に力を入れてきました。いまでこそ中古住宅のリノベーションが見直されていますが、30年も前から続けてきた。これからは、自分たちらしい中古住宅のリノベーション提案もしていきたいと思っています。',
      },
      {
        speaker: 'moderator',
        text: 'そいえいば大地さん、三島市内で引っ越しされたいという希望があるのだとか。',
      },
      {
        speaker: 'daichi',
        text: '駅前も便利で良いですが、今は妻も私も、三島ならではの自然いっぱいの環境で子育てできたらいいなと思って引っ越しを検討しています。山田学区は候補のひとつなんです。子どもの頃の楽しかった思い出がたくさんありますし、山田小のときの友だちとは未だに仲が良いんです。',
      },
      {
        speaker: 'tsunenari',
        text: '私も山田学区を含め三島市内のいくつかの町に住んだことがありますが、それぞれいろんな良さがありますよね。三島の環境って、全国的に見ても良いですよね。',
      },
      {
        speaker: 'daichi',
        text: '本当に。自信を持っておすすめできる街です。',
      },
      {
        speaker: 'tsunenari',
        text: 'これからは、マルシェなどの地域イベントを開催して、地域の人たちの交流の場を増やしていきたいです。ほかにも、地域の価値を上げるための取り組みや発信方法を、工夫していきたい。',
      },
      {
        speaker: 'moderator',
        text: '不動産屋のイメージが変わりますね。これからのアイ企画、楽しみにしています！',
      },
    ],
  },
];

const sidebarLinks = [
  { label: 'スタッフの紹介', href: '/staff-interview', active: true },
  { label: '会社の理念', href: '/message', active: false },
  { label: 'スタッフの専門性', href: '/about', active: false },
  { label: 'お客様との関係', href: '/about', active: false },
  { label: '地域貢献活動', href: '/about', active: false },
];

const staffProfiles = [
  {
    name: '髙野大地',
    avatar: '/images/staff-interview/avatar-daichi.jpg',
    description:
      '髙野家の第三子で長男。現在は一児の父であり、山田学区の子育て環境に魅力を感じ、妻と共に住まい探し中。前職は大工で、黙々と何かを作ることが好き。',
  },
  {
    name: '髙野恒成',
    avatar: '/images/staff-interview/avatar-tsunenari.jpg',
    description:
      '髙野家の第四子で次男。アメリカ・ポートランドへの留学で「街を作っているのは人だ」と気づき、後に三島の人の魅力に惹かれて帰郷。自然やアウトドアが好き。',
  },
];

function ModeratorIcon() {
  return (
    <div className="w-[50px] h-[50px] rounded-full bg-light-blue flex items-center justify-center shrink-0">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
          fill="#2a363b"
        />
      </svg>
    </div>
  );
}

function InterviewItemComponent({ item }: { item: InterviewItem }) {
  const info = speakerInfo[item.speaker];
  return (
    <div className="flex gap-6 tablet:gap-[51px] items-start">
      <div className="flex flex-col items-center shrink-0">
        {info.avatar ? (
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden relative shrink-0">
            <Image
              src={info.avatar}
              alt={info.name}
              fill
              className="object-cover"
              sizes="50px"
            />
          </div>
        ) : (
          <ModeratorIcon />
        )}
        <p className="text-caption text-dark-green text-center whitespace-nowrap mt-1">
          {info.name}
        </p>
      </div>
      <div className="flex-1 pb-12 pt-2">
        <p className="text-body-l text-black leading-[1.8]">{item.text}</p>
      </div>
    </div>
  );
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-kikaku.co.jp';

export default function StaffInterviewPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'ホーム', item: BASE_URL },
              { '@type': 'ListItem', position: 2, name: 'スタッフインタビュー' },
            ],
          }),
        }}
      />
      <div className="page-container">
        <Breadcrumb items={[{ label: 'スタッフインタビュー' }]} />
      </div>

      {/* ヒーローセクション（3枚の写真レイアウト） */}
      <section className="relative overflow-hidden">
        <div className="page-container pt-12 pb-0">
          <h1 className="font-mincho text-[48px] leading-[1.5] tracking-[0.04em]">
            スタッフインタビュー
          </h1>
        </div>

        <div className="relative h-[700px] tablet:h-[838px]">
          {/* 左の縦長写真（下部） */}
          <div className="hidden tablet:block absolute left-0 top-[470px] w-[280px] h-[368px] rounded-2xl overflow-hidden">
            <Image
              src="/images/staff-interview/photo-interview-1.jpg"
              alt=""
              fill
              className="object-cover"
            />
          </div>

          {/* 中央のメイン写真 */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[259px] w-full max-w-[704px] rounded-2xl overflow-hidden">
            <div className="aspect-[704/469] relative">
              <Image
                src="/images/staff-interview/hero.jpg"
                alt="髙野大地と髙野恒成のインタビュー風景"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* 右の縦長写真（上部） */}
          <div className="hidden tablet:block absolute right-0 top-[96px] w-[280px] h-[374px] rounded-2xl overflow-hidden">
            <Image
              src="/images/staff-interview/photo-caption.jpg"
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* インタビューセクション（サイドバー付き） */}
      <section className="page-container">
        <div className="flex gap-16">
          {/* 左サイドバー（PC only） */}
          <div className="hidden tablet:block w-[323px] shrink-0">
            <div className="sticky top-8 bg-light-green rounded-2xl py-[45px] px-[30px]">
              <nav className="flex flex-col gap-0">
                {sidebarLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-0 py-2"
                  >
                    <span className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${link.active ? 'bg-dark-green' : ''}`}>
                      {!link.active && (
                        <span className="w-[10px] h-[10px] rounded-full bg-dark-green/30" />
                      )}
                    </span>
                    <span className={`text-body-m text-dark-green ${link.active ? 'font-bold' : ''}`}>
                      {link.label}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* 右コンテンツ */}
          <div className="flex-1 max-w-[792px]">
            {/* セクション見出し */}
            <div className="mb-16">
              <p className="text-body-s text-dark-green mb-4">インタビュー</p>
              <h2 className="mb-4">
                地域に開かれたサステナブルな不動産屋を目指して
              </h2>
              <p className="text-body-m text-dark-green">髙野大地 × 髙野恒成</p>
            </div>

            {/* インタビュー本文 */}
            <div>
              {interviewSections.map((section, sIdx) => {
                if (section.type === 'heading') {
                  return (
                    <div key={sIdx} className="py-12">
                      <h3 className="text-2xl tablet:text-[32px]">
                        {section.heading}
                      </h3>
                    </div>
                  );
                }

                if (section.type === 'heading-with-image') {
                  return (
                    <div key={sIdx} className="py-12">
                      <h3 className="text-2xl tablet:text-[32px] mb-8">
                        {section.heading}
                      </h3>
                      {section.image && (
                        <div className="w-full aspect-[792/528] relative rounded-2xl overflow-hidden">
                          <Image
                            src={section.image}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="792px"
                          />
                        </div>
                      )}
                    </div>
                  );
                }

                if (section.type === 'photos') {
                  return (
                    <div
                      key={sIdx}
                      className="grid grid-cols-1 tablet:grid-cols-2 gap-6 my-12"
                    >
                      <div className="aspect-[3/2] relative rounded-2xl overflow-hidden">
                        <Image
                          src="/images/staff-interview/hero.jpg"
                          alt="インタビュー風景"
                          fill
                          className="object-cover"
                          sizes="(min-width: 993px) 50vw, 100vw"
                        />
                      </div>
                      <div className="aspect-[3/2] relative rounded-2xl overflow-hidden">
                        <Image
                          src="/images/staff-interview/photo-interview-1.jpg"
                          alt="インタビュー風景"
                          fill
                          className="object-cover"
                          sizes="(min-width: 993px) 50vw, 100vw"
                        />
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={sIdx}>
                    {section.items?.map((item, iIdx) => (
                      <div
                        key={iIdx}
                        className={
                          iIdx < (section.items?.length ?? 0) - 1
                            ? 'border-b border-dark-green/10'
                            : ''
                        }
                      >
                        <InterviewItemComponent item={item} />
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>

            {/* スタッフプロフィール */}
            <div className="bg-light-green rounded-2xl p-12 mt-16">
              <div className="grid grid-cols-1 tablet:grid-cols-2 gap-12">
                {staffProfiles.map((staff) => (
                  <div key={staff.name}>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-[51px] h-[51px] rounded-full overflow-hidden relative shrink-0">
                        <Image
                          src={staff.avatar}
                          alt={staff.name}
                          fill
                          className="object-cover"
                          sizes="51px"
                        />
                      </div>
                      <h4 className="font-gothic font-medium text-[18px] text-dark-green">
                        {staff.name}
                      </h4>
                    </div>
                    <p className="text-body-s text-dark-green leading-[1.8]">
                      {staff.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SP用関連リンク */}
      <section className="tablet:hidden py-12">
        <div className="page-container">
          <div className="bg-light-green rounded-2xl py-[45px] px-[30px]">
            <nav className="flex flex-col gap-0">
              {sidebarLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-0 py-2"
                >
                  <span className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${link.active ? 'bg-dark-green' : ''}`}>
                    {!link.active && (
                      <span className="w-[10px] h-[10px] rounded-full bg-dark-green/30" />
                    )}
                  </span>
                  <span className={`text-body-m text-dark-green ${link.active ? 'font-bold' : ''}`}>
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* 下部CTA */}
      <section className="relative py-24">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/staff-interview/bg-section.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 page-container">
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-8">
            <Link href="/for-customer" className="group block bg-cream rounded-3xl p-8 overflow-hidden">
              <div className="flex gap-8 items-start">
                <div className="flex-1">
                  <div className="mb-auto">
                    <h3 className="font-mincho text-[32px] leading-[1.5] tracking-[0.04em] text-dark-green mb-2">
                      不動産を<br />お探しの方へ
                    </h3>
                    <p className="text-body-l text-dark-green">買いたい・借りたい</p>
                  </div>
                  <div className="mt-8">
                    <span className="bg-accent-blue w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="w-[294px] h-[220px] relative rounded-xl overflow-hidden shrink-0 hidden tablet:block">
                  <Image
                    src="/images/staff-interview/cta-customer.jpg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </Link>
            <Link href="/for-owner" className="group block bg-cream rounded-3xl p-8 overflow-hidden">
              <div className="flex gap-8 items-start">
                <div className="flex-1">
                  <div className="mb-auto">
                    <h3 className="font-mincho text-[32px] leading-[1.5] tracking-[0.04em] text-dark-green mb-2">
                      不動産を<br />お持ちの方へ
                    </h3>
                    <p className="text-body-l text-dark-green">売りたい・貸したい</p>
                  </div>
                  <div className="mt-8">
                    <span className="bg-accent-blue w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="w-[294px] h-[220px] relative rounded-xl overflow-hidden shrink-0 hidden tablet:block">
                  <Image
                    src="/images/staff-interview/cta-owner.jpg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
