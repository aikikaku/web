import Image from 'next/image';
import TocNav from '@/components/ui/TocNav';
import MobileTocNav from '@/components/ui/MobileTocNav';
import HeroCardStory from '@/components/ui/HeroCardStory';
import ServiceCTA from '@/components/ui/ServiceCTA';
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
  type: 'conversation' | 'heading' | 'image' | 'photos';
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
  // Figma 4211:11346: 画像は「三島の魅力」セクション会話の末尾に配置
  { type: 'image', image: '/images/staff-interview/photo-caption.jpg' },
  { type: 'heading', heading: '中古住宅も大切にする「もったいない精神」' },
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

// Figma 4211:11373 は 5 項目だがインタビュー内容の自然な区切りに合わせて 3 項目に。
// toc-0 = 主旨見出し / toc-1 = 三島の魅力 / toc-2 = もったいない精神
const tocItems = [
  '会社のこと',
  '三島の魅力を伝え続けるということ',
  '中古住宅も大切にする「もったいない精神」',
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

function InterviewItemComponent({ item }: { item: InterviewItem }) {
  const info = speakerInfo[item.speaker];
  return (
    <div className="flex gap-4 tablet:gap-[51px] items-start min-h-[90px] tablet:min-h-0 pb-6 tablet:pb-0">
      <div className="flex flex-col items-center shrink-0 w-[40px] tablet:w-auto">
        {info.avatar ? (
          <div className="w-10 h-10 tablet:w-[50px] tablet:h-[50px] rounded-full overflow-hidden relative shrink-0">
            <Image src={info.avatar} alt={info.name} fill className="object-cover" sizes="50px" />
          </div>
        ) : (
          <div className="w-10 h-10 tablet:w-[50px] tablet:h-[50px] rounded-full bg-light-green flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="tablet:w-6 tablet:h-6">
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                fill="#2a363b"
              />
            </svg>
          </div>
        )}
        <p className="font-gothic font-medium text-[10px] tablet:text-[12px] leading-none text-dark-green text-center whitespace-nowrap mt-1">
          {info.name}
        </p>
      </div>
      <div className="flex-1 min-w-0 tablet:pb-12 tablet:pt-2">
        <p className="font-gothic font-medium text-[14px] leading-[1.8] tablet:text-[18px] tablet:leading-[1.8] text-black">{item.text}</p>
      </div>
    </div>
  );
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-kikaku.co.jp';

export default function StaffInterviewPage() {
  return (
    <div className="bg-cream">
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
      {/* ヒーローセクション (Figma PC 4211:11332 / SP 4211:11616) */}
      <section className="relative bg-cream overflow-hidden pt-[60px] tablet:pt-[100px] pb-[60px] tablet:pb-24">
        {/* SP: 見出し → card-story (Figma 4211:11616: 60px section padding, title 358×48, 32px gap to card-story) */}
        <div className="tablet:hidden px-4 mb-8">
          <h1 className="font-mincho text-[32px] leading-[1.5] tracking-[1.28px] text-dark-green pl-2" style={{ fontFeatureSettings: "'palt' 1" }}>
            スタッフインタビュー
          </h1>
        </div>
        {/* PC: タイトル左上 (絶対位置) */}
        <div className="hidden tablet:block relative max-w-[1440px] mx-auto">
          <h1 className="absolute left-[75px] top-[96px] w-[528px] font-mincho text-[48px] leading-[1.5] tracking-[1.92px] text-dark-green z-10" style={{ fontFeatureSettings: "'palt' 1" }}>
            スタッフインタビュー
          </h1>
        </div>
        <HeroCardStory
          mainImage="/images/staff-interview/hero.jpg"
          leftImage="/images/staff-interview/photo-interview-1.jpg"
          rightImage="/images/staff-interview/photo-caption.jpg"
          mainAlt="髙野大地と髙野恒成のインタビュー風景"
          priority
        />
      </section>

      {/* SP: フローティング TOC ボタン (Figma 4211:11761 closed / 4211:11779 open) */}
      <MobileTocNav items={tocItems} />

      {/* インタビューセクション（PC: サイドバー付き / SP: フローティング TOC）
          Figma SP 4211:11660: section pb-[120px]、各 item pb-[24px] */}
      <section className="pt-12 tablet:pt-24 pb-[120px] tablet:pb-24 px-4 tablet:pl-[45px] tablet:pr-[75px] max-w-[1440px] mx-auto">
        <div className="flex max-tablet:flex-col items-start tablet:justify-between">
          {/* PC: TOC サイドバー（スクロール追従）。SP は MobileTocNav で代替 */}
          <div className="hidden tablet:block tablet:w-[323px] shrink-0 tablet:sticky tablet:top-24">
            <div className="bg-light-green rounded-[32px] px-[30px] py-[45px]">
              <TocNav items={tocItems} />
            </div>
          </div>

          {/* 右コンテンツ */}
          <div className="w-full tablet:w-[792px]" data-mobile-toc-start>
            {/* セクション見出し */}
            <div className="mb-16" id="toc-0">
              <p className="text-body-m font-gothic font-medium text-dark-green mb-4">インタビュー</p>
              <h2 className="font-mincho text-[32px] tablet:text-[48px] leading-[1.5] tracking-[1.92px] text-dark-green mb-4" style={{ fontFeatureSettings: "'palt' 1" }}>
                地域に開かれたサステナブルな不動産屋を目指して
              </h2>
              <p className="text-body-m text-dark-green">髙野大地 × 髙野恒成</p>
            </div>

            {/* インタビュー本文 */}
            <div>
              {(() => {
                let headingIndex = 1; // toc-0 is the main heading
                return interviewSections.map((section, sIdx) => {
                if (section.type === 'heading') {
                  const tocId = `toc-${headingIndex++}`;
                  return (
                    <div key={sIdx} className="py-12" id={tocId}>
                      <h3 className="font-mincho text-2xl tablet:text-[32px] leading-[1.5] tracking-[0.04em] text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
                        {section.heading}
                      </h3>
                    </div>
                  );
                }

                if (section.type === 'image') {
                  return section.image ? (
                    <div key={sIdx} className="my-8 tablet:my-12 w-full aspect-[792/528] relative rounded-2xl overflow-hidden">
                      <Image
                        src={section.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(min-width: 992px) 792px, 100vw"
                      />
                    </div>
                  ) : null;
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
                        className=""
                      >
                        <InterviewItemComponent item={item} />
                      </div>
                    ))}
                  </div>
                );
              });
              })()}
            </div>

            {/* スタッフプロフィール (data-mobile-toc-end: ここまで TOC ボタン表示) */}
            <div className="bg-light-green rounded-2xl p-12 mt-16" data-mobile-toc-end>
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
                      <h4 className="font-mincho text-[18px] leading-[1.6] tracking-[0.04em] text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
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

      {/* サービス CTA (共通コンポーネント Figma 4211:11395) */}
      <ServiceCTA
        customerImage="/images/staff-interview/cta-customer.jpg"
        ownerImage="/images/staff-interview/cta-owner.jpg"
      />
    </div>
  );
}
