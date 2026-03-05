import Breadcrumb from '@/components/ui/Breadcrumb';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ご挨拶',
  description: 'アイ企画代表からのご挨拶。不動産業のあるべき姿を目指して。',
};

export const revalidate = 3600;

interface Section {
  heading: string | string[];
  paragraphs: string[];
  image: string;
  imageAlt: string;
}

const sections: Section[] = [
  {
    heading: '不動産業のあるべき姿を目指して',
    paragraphs: [
      '弊社では、昭和61年から地域密着で地元三島を中心として、静岡県東部のお客様の住宅や店舗用の土地・建物の売買取引のお手伝いをさせていただいています。',
      '父が創業した(有)アイ企画に入社する前は、大学で建築設計を専攻していました。',
      '卒業後、品質の高い木造住宅を提供する大工に憧れ、大工を雇用する平成建設に就職しました。その会社は設計から施工までの流れを社内で内製化しており、余分な費用をおさえつつ高品質を実現できる素晴らしい企業でした。',
      'そのため、一切の隙間も妥協せず、丁寧に施工しお客様に喜んでもらえるマイホームを造っていると自信を持って仕事をしていました。',
    ],
    image: '/images/message/section-1.png',
    imageAlt: '不動産業のあるべき姿',
  },
  {
    heading: ['アイ企画で働く前の', '大工時代に起こった許せない出来事'],
    paragraphs: [
      '当時、高齢のお客様が住む建物のリフォームを任されました。',
      '高齢のお客様にとって、トイレやキッチンが狭く使いづらかったので、配置換えをして広く使いやすいようにリフォームしました。',
      'リフォームから年数経ったある時、この建物が売却されている折込チラシを目にしました。',
      '',
      '築30年でもよい施工が施されていたので、私たちもトイレやキッチンをリフォームしただけで新築同様に蘇り、プラス20年問題なく住めるほどの物件だったのです。しかし、折込みチラシには「更地渡し（解体前提）」などと書かれていていたのです。',
      '',
      '「土地の価格だけ」で売りに出されていた事に衝撃を受けました。購入条件が更地渡しなので、土地が売れても売主はプラスで解体費用を支払うことになって損をしてしまいます。解体費用を支払うのは売主なのをよいことに、不動産業者は「土地を売ること」つまり自社の利益のためだけを考えて販売していたのです。',
      '',
      '私はこれに対して、怒りがこみあげて来ました。売主であるお客様のことを考えずに、「売れれば手段は択ばない」という内容にしか見えなかったからです。大切な不動産を手放す売主としては、「1円でも高く販売したい」と考えるはずです。',
      '',
      'それにもかかわらず、「売ることだけ」を考えて売主の利益を考慮せずに解体費を支払わせて販売しようとしている姿勢に納得がいきませんでした。解体費用は売主に支払ってもらえるので不動産業者は確実に利益を確保しつつ、売るときは通常報酬なので販売する際も儲けが出る仕組みです。本来であれば、売主は中古物件をリフォームやリノベーションで再生すれば土地にプラスして建物の費用も獲得できます。',
      '',
      'しかし、建物に関して適切な知識がないことをよいことに、お客様の利益より不動産業者のノルマや利益が優先されていたのです。その結果、せっかく使えて売却できる建物のほとんどが解体され、それによって売主は損をしているのが不動産業界の大きな問題です。',
      '',
      'そんな悪徳不動産業者に出会うお客様が1人でも減るように、私は父が創業した(有)アイ企画に入社して不動産業を始めることにしたのです。',
    ],
    image: '/images/message/section-2.png',
    imageAlt: '大工時代の経験',
  },
  {
    heading: '父の仕事に向き合う姿',
    paragraphs: [
      '私が小さいころ、アイ企画を創業する前の父は住宅会社で営業をしていました。しかし、会社の利益ばかり考えすぎたことが原因でその住宅会社は大きく傾き、会社は未完成の住宅を残し、突然倒産してしまったのです。会社がつぶれたのは経営者の怠慢によるものだったのですが、お客様の幸せを第一に考える父は、自らの資産を投げ売って住宅を完成させました。',
      '',
      '本来であれば、住宅会社の社長がすべきことですが、それをすることがなかったので責任感の強い父自ら行動に移したそうです。',
      '',
      'これが、アイ企画起業のきっかけとなります。この経験をしたからこそ、父の考えがわかるようになり、それが尊敬に代わり「一緒に地元のお客様を守っていきたい！」と強く思うきっかけになりました。',
    ],
    image: '/images/message/section-3.png',
    imageAlt: '父の仕事への姿勢',
  },
  {
    heading: '不動産業界の闇と裏側',
    paragraphs: [
      '不動産業界では、「築年数」が建物の価格を算出する基準になります。',
      '',
      'たとえば、木造住宅で築30年以上となるとほぼ0円とみなされ、「解体して土地として売りましょう」と提案されます。もちろん、内装は30年使えば汚れていて見た目は悪いです。しかし、大工をしていた私からすると、一般的に柱や土台（構造体）に使われるヒノキは伐採後100年強度が上昇を続けることを知っています。木造住宅は通風がよくメンテナンスをしていれば築30年程度では、なんの問題もなく使え、売却できるのです。',
      '',
      'ただ、不動産業界ではよくあることなのですが、築30年以上の建物を床下、天井裏を確認せず、表層（外観、内装）の劣化だけ見て査定します。',
      '',
      '前述の通り、「築年数」で価値を算出するのが基本だからです。',
      'そのため、わざわざ汚れてまで床下や天井裏を確認したりはせず、「解体費分売主は損しても解体して早く売却することが良い」と考えるのが不動産業界になります。これも、上記と同様で、不動産業者のノルマや利益が優先され、「いかに早く売却し又は購入させ利益を上げるか」が原因です。そのせいで、まだ活用できるのに「建物に価値がない」と見なしてしまい、せっかくの活用できる空き家が解体されることが多くあるのです。その結果、売主は解体費と建物の本当の価値分、損してしまうのです。',
      '',
      'たとえば、ノルマや利益が優先された場合、2,000万円で売れるはずのものが解体費と建物の価値が引かれて1,500万円で売られたりと大きな変動がありますその差額は500万円にもなるため、これでは売主が大きく損をしてしまうのですが、不動産に詳しくなければ知る由もありません。これはあくまでも一例ですが、非常にもったいないです。',
      '',
      '一般のお客様が無知なことをよいことに、正しい査定をせずに安く買い取ったり土地の調査をせずに低価格に見せて結果高く販売したりする悪質な不動産業者が多い問題があります。',
      '',
      '私はどうしてもこれが納得いきません。',
      'だから弊社では、内装などの表層で判断することは絶対にありえません。床下や天井裏の深層に潜り、シロアリの食害、雨漏りの痕跡、検査機器を使った含水率（がんすいりつ｜物質に含まれる水分の割合）、傾きの確認を行います。これを行うと、「本当に再利用できない建物なのか？」を確認することで売主は得をします。また結果として、買主が購入する際の安心に直接的につながっていくのです。',
    ],
    image: '/images/message/section-4.png',
    imageAlt: '不動産業界の実態',
  },
  {
    heading: '私たちが目指す不動産業の本当の姿',
    paragraphs: [
      'ここまで述べさせていただいた通り、不動産業界はノルマや利益が優先され、「ただ売却、購入できれば良い」と考えている不動産業者が多いのが現実です。お客様の立場に立った、幸福の最大値を目指す努力を怠っています。その要因として、お客様自身が人生に何度も売却や購入を経験することがないからです。そのため、知識が乏しく適切な判断を下せないため不動産業者のアドバイスに頼ってしまう傾向にあります。結果として、悪い不動産業者を選んでしまうと損をしたり、トラブルに巻き込まれたりします。',
      '',
      'そこで弊社では、医療業界で言うセカンドオピニオン的な立ち位置のサービスを今後増やしていきます。また、正しい情報を発信しお客様自身が知識をつけられる場を提供します。',
      '',
      'アイ企画では、お客様の立場に立った、幸福の最大値を目指す取引を目指していきます。',
      '',
      '従来の不動産業者のノルマや利益が優先された「いかに早く売却し又は購入させ利益を上げるか」という悪しき風習を断ち切りたいからです。売却価格を安く設定されたり、納得できていないのに押し売りされたりする方々を一人でも多く減らしていきます。実は、不動産は固有の特徴があり、同様のものは存在しません。つまり、取引において100人は条件に合わなくても101人目が条件にマッチングしていれば納得した取引ができるのです。',
      '',
      'しかし、不動産業者のノルマや利益が優先され、「いかに早く取引相手を探して取引成立させるか」が主流です。そのため、101人目まで探す努力をしません。',
      'そこで、（有）アイ企画がお客様に対して真剣に向き合い、親身になって納得のいくお取引を行うお手伝いをさせていただきます。',
    ],
    image: '/images/message/section-5.jpg',
    imageAlt: '私たちが目指す姿',
  },
  {
    heading: '不動産業に対する熱意・こだわり',
    paragraphs: [
      '不動産売買において、重要事項説明書（家電製品で言う取り扱い説明書）という書類を資格者（宅地建物取引士）が作成してお客様に説明して、理解いただいた上で売買が行われます。ただ、その重要事項説明書に記載しなければいけない内容（大部分はネットで調べられる）はあくまで最低限の内容で、この内容さえ満たしていれば売買できてしまうのです。',
      '',
      'しかし、中古住宅や店舗、住宅、店舗用の土地の本当に知りたい情報は、住んでみるまで分からないですよね。実際の生活や環境、災害の履歴、小学校・中学校の風紀、ご近所さんの様子などは重要事項説明書に記載のない部分だと考えています。',
      'そこで、（有）アイ企画ではこの記載ない部分のサポートに力を入れ特化していきます。それが「地域に長く住み密着している不動産業のあるべき姿」だと思っています。',
      '',
      'たとえば、重要事項説明書に記載のない部分を明らかにする取り組みをしています。',
      '将来起きる可能性がある災害を50年前の白黒の航空写真から予見するレポートを提供したり、ご近所にお客様と一緒に挨拶回りや聞き取り調査をするなどの活動です。',
      'その他、売主に対しては税金対策も行なっています。2,000万円で売却できても、税金を支払った手元に残る金額が、1,600万円になる人もいれば、2,000万円しっかり残る人もいます。それは売却を始める前に、「税金対策を行なって、いつまでに売却すれば税金の控除がある」「建物を壊せば特例を使える」などお客様それぞれにあった最適な提案をさせていただきます。',
      '',
      '「不動産を買いたい・売りたいけど、どの会社に依頼したらよいかわからない」',
      'もし、そんな悩みをお持ちでしたら（有）アイ企画へご相談ください。無料査定や相談を受け付けておりますので、遠慮なくご利用いただけますと幸いです。あなたが不動産売買で失敗せずに最大の利益を得られるように、全力でサポートさせていただきます。',
    ],
    image: '/images/message/section-5.jpg',
    imageAlt: '不動産業への熱意',
  },
];

export default function MessagePage() {
  return (
    <div>
      <div className="page-container">
        <Breadcrumb items={[
          { label: 'アイ企画について', href: '/about' },
          { label: 'ご挨拶' },
        ]} />
      </div>

      {/* ヒーローセクション */}
      <section className="relative bg-cream overflow-hidden">
        <div className="page-container pt-12 pb-0">
          <h1 className="font-mincho text-[48px] leading-[1.5] tracking-[0.04em] mb-16">
            ご挨拶
          </h1>
        </div>

        {/* 3枚の写真レイアウト */}
        <div className="relative h-[700px] tablet:h-[838px]">
          {/* 左の縦長写真（下部） */}
          <div className="hidden tablet:block absolute left-0 top-[470px] w-[280px] h-[368px] rounded-2xl overflow-hidden">
            <Image
              src="/images/message/hero-left.jpg"
              alt=""
              fill
              className="object-cover"
            />
          </div>

          {/* 中央のメイン写真 */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[259px] w-full max-w-[704px] rounded-2xl overflow-hidden">
            <div className="aspect-[704/469] relative">
              <Image
                src="/images/message/hero-center.jpg"
                alt="ご挨拶"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* 右の縦長写真（上部） */}
          <div className="hidden tablet:block absolute right-0 top-[96px] w-[280px] h-[374px] rounded-2xl overflow-hidden">
            <Image
              src="/images/message/hero-right.jpg"
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* リッチテキストセクション */}
      {sections.map((section, index) => (
        <section
          key={index}
          className={`bg-cream ${index === sections.length - 1 ? 'pt-24 pb-36' : index === 0 ? '' : 'pt-24'}`}
        >
          <div className="max-w-[704px] mx-auto px-4">
            {/* 見出し */}
            <div className="pt-6 pb-12">
              <h3 className="font-mincho text-[32px] leading-[1.5] tracking-[0.04em] text-center text-dark-green">
                {Array.isArray(section.heading)
                  ? section.heading.map((line, i) => (
                      <span key={i}>
                        {i > 0 && <br />}
                        {line}
                      </span>
                    ))
                  : section.heading}
              </h3>
            </div>

            {/* 本文 */}
            <div className="pb-12">
              <div className="font-gothic font-medium text-[18px] leading-[1.8] text-black">
                {section.paragraphs.map((p, i) =>
                  p === '' ? (
                    <br key={i} />
                  ) : (
                    <p key={i} className="mb-0">
                      {p}
                    </p>
                  )
                )}
              </div>
            </div>

            {/* 画像 */}
            <div className="rounded-2xl overflow-hidden">
              <div className="aspect-[704/469] relative">
                <Image
                  src={section.image}
                  alt={section.imageAlt}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* サービスリンクセクション */}
      <section className="relative py-24 px-[45px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/about/service-bg.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-[1350px] mx-auto flex flex-col tablet:flex-row gap-8 items-center justify-between">
          <Link
            href="/for-customer"
            className="bg-cream rounded-3xl p-[30px] w-full max-w-[646px] flex gap-[30px] items-start group overflow-hidden"
          >
            <div className="flex-1 flex flex-col h-[220px]">
              <div className="flex-1 pt-2 px-3">
                <p className="font-mincho text-[32px] leading-[1.5] tracking-[0.04em] text-dark-green mb-0">
                  不動産を
                </p>
                <p className="font-mincho text-[32px] leading-[1.5] tracking-[0.04em] text-dark-green">
                  お探しの方へ
                </p>
                <p className="font-gothic font-medium text-[18px] leading-[1.8] text-dark-green">
                  買いたい・借りたい
                </p>
              </div>
              <div className="px-3">
                <span className="bg-accent-blue w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="w-[294px] h-[220px] rounded-xl overflow-hidden shrink-0 hidden tablet:block">
              <div className="relative w-full h-full">
                <Image
                  src="/images/about/service-customer.jpg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </Link>

          <Link
            href="/for-owner"
            className="bg-cream rounded-3xl p-[30px] w-full max-w-[646px] flex gap-[30px] items-start group overflow-hidden"
          >
            <div className="flex-1 flex flex-col h-[220px]">
              <div className="flex-1 pt-2 px-3">
                <p className="font-mincho text-[32px] leading-[1.5] tracking-[0.04em] text-dark-green mb-0">
                  不動産を
                </p>
                <p className="font-mincho text-[32px] leading-[1.5] tracking-[0.04em] text-dark-green">
                  お持ちの方へ
                </p>
                <p className="font-gothic font-medium text-[18px] leading-[1.8] text-dark-green">
                  売りたい・貸したい
                </p>
              </div>
              <div className="px-3">
                <span className="bg-accent-blue w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="w-[294px] h-[220px] rounded-xl overflow-hidden shrink-0 hidden tablet:block">
              <div className="relative w-full h-full">
                <Image
                  src="/images/about/service-owner.jpg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
