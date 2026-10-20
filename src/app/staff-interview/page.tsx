import Image from 'next/image';
import TocNav from '@/components/ui/navigation/TocNav';
import PageNavSp from '@/components/ui/navigation/PageNavSp';
import ServiceCTA from '@/components/ui/card/ServiceCTA';
import Reveal from '@/components/common/Reveal';
import type { Metadata } from 'next';
import Breadcrumb from '@/components/ui/navigation/Breadcrumb';

const ARTICLE_TITLE = '街をつくるのは、そこに暮らす人たち。';
const ARTICLE_LEAD = '三島で暮らし、三島で働く。アイ企画が大切にしていること。';

export const metadata: Metadata = {
  title: 'スタッフインタビュー',
  description: `${ARTICLE_LEAD}三島で不動産業を営むアイ企画の二人を、nakabito の取材メンバーが紹介します。`,
};

/**
 * 原稿は nakabito の取材メンバー（宮﨑 美咲さん）による読み物記事。
 * 以前の「司会／話し手」の対談形式から、ストーリー詳細（/stories/[id]）と同じ記事レイアウトに変更。
 * 段落内の改行は原稿どおり \n で持ち、white-space: pre-line で表示する。
 */
interface ArticleSection {
  /** 目次に出す見出し。冒頭のリード部分は見出しなし */
  heading?: string;
  paragraphs: string[];
  /** セクション末尾に置く写真 */
  image?: string;
}

const articleSections: ArticleSection[] = [
  {
    paragraphs: [
      '「子どもの頃は、三島のことをつまらない街だと思っていました」',
      'そう話すのは、三島で不動産業を営むアイ企画のお二人。',
      '田舎すぎるわけでもなければ、都会でもない。東京で流行したものが遅れてやってくるような、どこか中途半端な街。学生時代は刺激を求め、遊びに行くのは隣の沼津市や東京だったという。',
      'そんな三島への印象が変わったのは、一度街を離れ、再び戻ってきてからのこと。',
      '「戻ってきたら、意外と面白い街だなと思ったんです。学生の頃には気づけなかった人たちの面白さに気づくようになって」',
      'かつて物足りなく感じていた街の姿は、時間を経て、暮らしやすさへと変わっていた。',
    ],
  },
  {
    heading: '街を面白くするのは、人だった。',
    paragraphs: [
      '学生時代に留学したポートランド。\nもともとは工場の街だった場所に、ヒッピーやアーティスト、さまざまな表現者が集まり、街の雰囲気が少しずつ変わっていった変化を目の当たりにした経験が、街を見る視点を変えたという。',
      '「こうやって街って変わっていくんだな、と実感したんです」',
      '三島に戻ってきてからも、個人で店を営む人や、自分たちなりの表現を続ける人たちの存在に目が向くようになった。',
      '街の魅力は、大きな商業施設や目新しい観光資源だけで生まれるものではない。そこに暮らす人たちが、それぞれの生活のなかで小さな営みを重ねていくこと。その積み重ねが、街の表情をつくっていく。',
      '「結局、人なんだなと思いました」',
      '三島には、外から来た人や新しいものを、自然に受け入れる空気があるという。',
      '誰かが新しい店を始めれば、昔から街にいる人たちが受け入れ、若い世代の挑戦を面白がり、ときには世話を焼きながら見守る。',
      '新しいものを拒むのでも、ただ流行を追いかけるのでもない。\nそんな人と人との距離感が、この街には残っている。',
    ],
    image: '/images/staff-interview/photo-body-1.jpg',
  },
  {
    heading: '中途半端だからこその、豊かさ。',
    paragraphs: [
      'お二人が三島を語るとき、何度も出てきたのが「中途半端」という言葉だった。都会でもなく、田舎でもない。けれど、東京へ行こうと思えばすぐに行ける。少し車を走らせれば、海や山など豊かな自然がある。\n大きなスーパーもあれば、昔から続く八百屋や肉屋、魚屋もある。',
      '「若い頃は刺激を求めて外に出たんですけど、今は昔から続いているもののほうに、豊かさを感じるようになりました」',
      'この土地は、休日には海へ出かけたり、釣りをしたり、特別な施設へ行かなくても、自然のなかで過ごすこともできる。\n一方で、日々の買い物に困ることもない。\nそうした暮らしのバランスが心地よい街。',
      '「三島が東京になろうとする必要はないと思うんです。刺激が欲しければ東京にはすぐに行けるんだから」',
      '街が必要以上に盛り上がらなくてもいい。\n新しいものが次々と生まれることだけが、街の豊かさではない。\nむしろ、昔から続いてきた普通の営みが、これからも当たり前に続いていくこと。そんな素朴な暮らしにこそ、価値を感じるようになったという。',
    ],
  },
  {
    heading: '家を売るのではなく、暮らしの選択肢を増やしたい。',
    paragraphs: [
      'お二人がお父様から仕事を引き継いで、およそ4年。\n二人で事業を担うようになってから、アイ企画の働き方も少しずつ変化してきた。',
      '以前はチラシを中心に情報を届けていたが、今ではSNSを使った発信やオンラインでの打ち合わせも増えた。それに伴い、若い世代や首都圏からの移住者との出会いも増えている。',
      '三島への移住を考える人たちが求めているのは、必ずしも不便を楽しむような田舎暮らしではない。自然の近くで暮らしたい。でも、これまで当たり前だった生活の便利さも失いたくない。そんな人たちにとって、三島はちょうどよい場所なのかもしれない。',
      '「三島は田舎だから不動産が安い、という場所ではないんです。がっつり田舎暮らしをしたい人には、少し物足りないかもしれない。でも、そのバランスがいいんですよね」',
      'アイ企画が大切にしているのは、そうした一人ひとりの暮らしに合った選択肢を提案すること。家を建てるとなれば、まずハウスメーカーを思い浮かべる人も多い。けれど、設計事務所に依頼する方法もあれば、中古住宅を購入して手を入れる方法もある。',
      '「ハウスメーカーが悪いということではなくて、それ以外にも選択肢があることを知ってほしいんです」',
      '住まいの選び方が変われば、暮らしのあり方も変わる。だからこそ、すぐに何かを売るのではなく、まずはその人がどんな暮らしをしたいのかを考える。時には、今はまだ買わなくてもいいのではないかと伝えることもあるそう。',
      '「基本的には、お客さんファーストです。それが巡り巡って次の出会い、仕事にもつながっていくと思っているので」',
      '目先の利益よりも、その先にある生活を考える。\nそれが、アイ企画の仕事の根底にあるように感じた。',
    ],
    image: '/images/staff-interview/photo-body-2.jpg',
  },
  {
    heading: '残せるものは残し、使えるものは使う。',
    paragraphs: [
      'お二人とも古い建物が好きだという。',
      '不動産の仕事では、古い家を取り壊して土地として売ったほうが、取引を進めやすい場合もある。それでも、まだ使えるものを簡単に壊してしまうことには、違和感があると話す。',
      '「残せるものは残したいし、使えるものは使いたいんです」',
      'この地域には、腕のよい職人や工務店がいる。\n古い建物を生かすための知恵や技術もある。\nそうした人たちとのつながりを生かしながら、一つひとつの建物に向き合っていく。',
      '建物を残すこと自体が目的なのではない。\nそこに暮らす人にとって、本当に心地よい選択は何なのか。\nその答えを一緒に考えることを大切にしているように感じた。',
      '「自分たちも、この街に住んでいるということが大きいのかもしれません」',
      '家を売ったあとも、街のどこかで顔を合わせるかもしれない。同じ地域で暮らしているからこそ、売ったら終わりという関係ではなく、長く安心して暮らせる住まいを届けたいという想いが強くある。',
    ],
  },
  {
    heading: 'この街に、ずっといるという仕事。',
    paragraphs: [
      'そうした想いから、アイ企画と地域のつながりは、不動産の仕事だけにとどまらない。',
      '事務所の前で餅つきを開けば、近所の人や昔からのお客さんが顔を出す。畑で育てたみかんなど、季節の作物をお客さんに届けることもある。町の祭りや地域の行事にも参加する。子どもが地域のしゃぎりに参加していることも、近所の人たちとのつながりをつくっている。\n特別大きなことをしなくても、日々の暮らしのなかで自然と関係が生まれていく。',
      '「ここにずっといることも、仕事なのかもしれません」',
      '住まいを紹介することは、その街での暮らしを紹介することでもある。\nだからこそ、街のことを知り、そこで暮らす人たちと関わり続ける。\n長く地域に根づいてきた不動産会社だからこそ、築ける関係があると思う。',
    ],
  },
  {
    heading: '変わっていく街と、変わらずにいてほしいもの。',
    paragraphs: [
      '今、三島の周辺でも新しい動きが生まれている。\n沼津、裾野、御殿場、伊豆…\nそれぞれの街に、それぞれの面白さがある。',
      '何か新しいものに触れたくなったら、少し足を延ばせばいい。\nそしてまた、いつもの暮らしへ戻ってくることができる。',
      '「三島は、ゆるいんですよね」',
      '街を変えてやろうという強い気負いよりも、自分が心地よく暮らせる場所を選び、好きなことを始める。そんな人たちが集まっているように感じるという。',
      '10年後、三島がどんな街になっているのかは分からない。\nけれど、大きな開発や一時的な流行だけが、街の未来を決めるわけではない。',
      '昔から続く商店があり、新しく店を始める若い人がいて、そこへ足を運ぶ地域の人たちがいる。そんな何気ない営みの積み重ねが、これからの街をつくっていく。',
      '家を売ることも、街で暮らすことも、その先にある日常を大切にするという意味では同じなのかもしれない。',
      'アイ企画は今日も、三島という街のなかで、人と人をつなぎながら仕事を続けている。',
    ],
  },
];

const tocItems = articleSections.flatMap((s) => (s.heading ? [s.heading] : []));

const writer = {
  name: '宮﨑 美咲｜nemurineco',
  description: '写真家。日本とインドの２拠点生活。写真のこと、仕事のこと、旅の記憶、日々の想いを綴っています。',
};

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

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-kikaku.co.jp';

export default function StaffInterviewPage() {
  let tocIndex = 0;

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
              { '@type': 'ListItem', position: 2, name: 'アイ企画を知る' },
              { '@type': 'ListItem', position: 3, name: 'スタッフインタビュー' },
            ],
          }),
        }}
      />
      <Breadcrumb items={[{ label: 'アイ企画を知る' }, { label: 'スタッフインタビュー' }]} />

      {/* ヒーロー: ストーリー詳細 (/stories/[id]) と同じ「左に写真・右にタグ＋タイトル＋書き手」の構成
          (Figma 4470:14621 PC: pt-48 pb-96 px-45 / 4470:16255 SP: py-60 px-16, gap-32) */}
      <section className="pt-12 pb-24 px-[2.8125rem] max-w-[90rem] mx-auto max-tablet:px-4 max-tablet:py-[3.75rem]">
        <div className="flex max-tablet:flex-col gap-0 max-tablet:gap-8">
          <div className="max-tablet:order-2 tablet:w-[42.1875rem] shrink-0 h-[40rem] max-tablet:h-auto max-tablet:aspect-square rounded-3xl overflow-hidden relative">
            <Image
              src="/images/staff-interview/hero.jpg"
              alt="髙野大地と髙野恒成"
              fill
              className="object-cover"
              sizes="(min-width: 1440px) 46.88vw, (max-width: 992px) 100vw, 675px"
              priority
            />
          </div>

          <div className="flex-1 flex flex-col gap-12 items-start justify-center tablet:pl-[5.5625rem] tablet:pr-[3.75rem] max-tablet:contents">
            <div className="max-tablet:order-1 flex flex-col gap-4 tablet:gap-8 items-start tablet:items-center w-full">
              <span className="tag">スタッフインタビュー</span>
              <h1
                className="font-mincho text-heading-32 tablet:text-heading-48 text-dark-green text-left tablet:text-center"
                style={{ fontFeatureSettings: "'palt' 1" }}
              >
                {ARTICLE_TITLE}
              </h1>
            </div>

            <p className="max-tablet:order-3 w-full text-body-m tablet:text-body-l font-gothic font-medium text-dark-green text-center">
              文：{writer.name}
            </p>
          </div>
        </div>
      </section>

      {/* SP: フローティング TOC ボタン */}
      <PageNavSp items={tocItems} />

      {/* 本文: 目次サイドバー + 記事 (Figma 4470:14633 PC: pb-96 / 4470:16266 SP: pb-120) */}
      <Reveal
        as="section"
        className="pb-24 px-[2.8125rem] tablet:pr-[4.6875rem] max-w-[90rem] mx-auto max-tablet:px-4 max-tablet:pb-[7.5rem]"
      >
        <div className="flex max-tablet:flex-col items-start tablet:justify-between">
          <div className="hidden tablet:block tablet:w-[20.1875rem] shrink-0 tablet:sticky tablet:top-24">
            <div className="bg-light-green rounded-[2rem] px-[1.875rem] py-[2.8125rem]">
              <TocNav items={tocItems} />
            </div>
          </div>

          <div className="w-full tablet:w-[45.875rem]" data-mobile-toc-start>
            {/* 見出し・本文・写真の文字組みと余白は microCMS のストーリー本文と同じ .rich-content を使う */}
            <div className="rich-content tablet:pt-6">
              <h3>{ARTICLE_LEAD}</h3>
              {articleSections.map((section, sIdx) => (
                <div key={sIdx}>
                  {section.heading && (
                    <h3 id={`toc-${tocIndex++}`} className="pt-7 tablet:pt-12">
                      {section.heading}
                    </h3>
                  )}
                  {section.paragraphs.map((text, pIdx) => (
                    <p key={pIdx} className="whitespace-pre-line">
                      {text}
                    </p>
                  ))}
                  {section.image && (
                    <div className="relative w-full aspect-[763/509] rounded-2xl tablet:rounded-3xl overflow-hidden mb-8 tablet:mb-12">
                      <Image
                        src={section.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(min-width: 1440px) 51.0vw, (min-width: 992px) 734px, 100vw"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 書き手とスタッフのプロフィール (data-mobile-toc-end: ここまで TOC ボタン表示)。
                カードの寸法は以前のスタッフプロフィール (PC 4470:15497 / SP 4470:15818) を踏襲 */}
            <div
              className="bg-light-green rounded-2xl px-6 py-8 tablet:px-[3.75rem] tablet:py-12 flex flex-col gap-8 tablet:gap-10"
              data-mobile-toc-end
            >
              <div>
                <p className="font-gothic font-medium text-body-s text-dark-green mb-2">この記事を書いた人</p>
                <p
                  className="font-mincho text-heading-16 tablet:text-heading-18 text-dark-green mb-1 tablet:mb-2"
                  style={{ fontFeatureSettings: "'palt' 1" }}
                >
                  {writer.name}
                </p>
                <p className="font-gothic text-body-s text-dark-green">{writer.description}</p>
              </div>

              <div className="border-t border-dark-green/10 pt-8 tablet:pt-10">
                <p className="font-gothic font-medium text-body-s text-dark-green mb-4">アイ企画のふたり</p>
                <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6 tablet:gap-[1.875rem]">
                  {staffProfiles.map((staff) => (
                    <div key={staff.name}>
                      <div className="flex items-center gap-3 tablet:gap-4 h-[3.1875rem] mb-1 tablet:mb-2">
                        <div className="w-11 h-11 tablet:w-[3.1875rem] tablet:h-[3.1875rem] rounded-full overflow-hidden relative shrink-0">
                          <Image src={staff.avatar} alt={staff.name} fill className="object-cover" sizes="51px" />
                        </div>
                        <h4
                          className="font-mincho text-heading-16 tablet:text-heading-18 text-dark-green"
                          style={{ fontFeatureSettings: "'palt' 1" }}
                        >
                          {staff.name}
                        </h4>
                      </div>
                      <p className="font-gothic text-body-s text-dark-green">{staff.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* サービス CTA (共通コンポーネント Figma 4211:11395) */}
      <Reveal>
        <ServiceCTA />
      </Reveal>
    </div>
  );
}
