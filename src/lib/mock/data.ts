import {
  Property,
  Story,
  Region,
  CustomerVoice,
  StaffInterview,
  Page,
  MicroCMSListResponse,
} from '@/types/microcms';

const now = new Date().toISOString();

const base = (id: string) => ({
  id,
  createdAt: now,
  updatedAt: now,
  publishedAt: now,
  revisedAt: now,
});

// ===== Regions =====
export const mockRegions: Region[] = [
  { ...base('region-1'), name: '三島市', order: 1 },
  { ...base('region-2'), name: '沼津市', order: 2 },
  { ...base('region-3'), name: '長泉町', order: 3 },
  { ...base('region-4'), name: '清水町', order: 4 },
];

const img = (path: string, w = 800, h = 600) => ({
  url: path,
  width: w,
  height: h,
});

// ===== Properties =====
export const mockProperties: Property[] = [
  {
    ...base('prop-1'),
    title: '静かな住宅街で叶える、理想の暮らし',
    type: 'sell',
    category: 'property',
    label: '新着',
    status: 'available',
    description: '<p>三島駅から徒歩12分、閑静な住宅街に位置する物件です。日当たり良好、駐車場2台分あり。</p>',
    mainImage: img('/images/mock/property-1.jpg'),
    images: [img('/images/mock/property-1.jpg'), img('/images/home/hero-1.jpg'), img('/images/home/hero-2.jpg'), img('/images/home/hero-3.jpg'), img('/images/home/service-customer.jpg'), img('/images/home/service-bg.png')],
    location: '静岡県三島市谷田',
    nearestStation: '東海道本線 三島駅',
    landArea: 165.5,
    buildingArea: 110.2,
    layout: '4LDK+S',
    constructionDate: '昭和50年10月',
    schoolDistrict: '三島市立北小学校',
    transactionType: '仲介',
    price: 1800,
    regions: [{ ...base('region-mishima-yata'), name: '三島市谷田', order: 1 }],
  },
  {
    ...base('prop-2'),
    title: '沼津市 駅近マンション',
    type: 'sell',
    category: 'property',
    label: 'おすすめ',
    status: 'available',
    description: '<p>沼津駅南口から徒歩5分。通勤に便利な好立地マンション。スーパー・コンビニ徒歩圏内。</p>',
    mainImage: img('/images/home/hero-1.jpg'),
    images: [img('/images/home/hero-2.jpg')],
    location: '静岡県沼津市大手町4-5-6',
    nearestStation: 'JR沼津駅 徒歩5分',
    landArea: 0,
    buildingArea: 72.5,
    layout: '3LDK',
    constructionDate: '2015年9月',
    transactionType: '仲介',
    price: 2480,
    regions: [mockRegions[1]],
  },
  {
    ...base('prop-3'),
    title: '長泉町 分譲地 60坪',
    type: 'sell',
    category: 'land',
    label: '値下げ',
    status: 'available',
    description: '<p>長泉なめり駅徒歩圏の整形地。建築条件なし。上下水道引込済み。</p>',
    mainImage: img('/images/home/hero-2.jpg'),
    images: [],
    location: '静岡県駿東郡長泉町下土狩7-8-9',
    nearestStation: 'JR長泉なめり駅 徒歩8分',
    landArea: 198.3,
    transactionType: '仲介',
    price: 1980,
    regions: [mockRegions[2]],
  },
  {
    ...base('prop-4'),
    title: '三島市 広瀬町 賃貸アパート',
    type: 'rent',
    category: 'property',
    status: 'available',
    description: '<p>三島広小路駅近くの賃貸アパート。ペット相談可。オートロック付き。</p>',
    mainImage: img('/images/home/hero-3.jpg'),
    images: [img('/images/home/hero-1.jpg')],
    location: '静岡県三島市広瀬町10-11',
    nearestStation: '伊豆箱根鉄道 三島広小路駅 徒歩6分',
    buildingArea: 52.0,
    layout: '2LDK',
    constructionDate: '2018年4月',
    rent: 72000,
    regions: [mockRegions[0]],
  },
  {
    ...base('prop-5'),
    title: '静かな住宅街で叶える、理想の暮らし',
    type: 'sell',
    category: 'property',
    status: 'sold',
    description: '<p>庭付きの一戸建て貸家。お子様がのびのび遊べる環境です。</p>',
    mainImage: img('/images/mock/property-1.jpg'),
    images: [],
    location: '静岡県三島市谷田',
    nearestStation: '東海道本線 三島駅',
    buildingArea: 85.0,
    layout: '4LDK+S',
    constructionDate: '昭和50年10月',
    price: undefined,
    regions: [{ ...base('region-mishima-yata2'), name: '三島市谷田', order: 1 }],
    // story is assigned after mockStories is defined
  },
  {
    ...base('prop-6'),
    title: '沼津市 事業用地 100坪',
    type: 'rent',
    category: 'land',
    status: 'available',
    description: '<p>国道沿いの事業用貸地。駐車場・資材置場等に最適。</p>',
    mainImage: img('/images/home/service-customer.jpg'),
    images: [],
    location: '静岡県沼津市大岡14-15',
    nearestStation: 'JR沼津駅 車10分',
    landArea: 330.5,
    rent: 150000,
    regions: [mockRegions[1]],
  },
  {
    ...base('prop-7'),
    title: '清水町 新築一戸建て',
    type: 'sell',
    category: 'property',
    status: 'available',
    description: '<p>清水町柿田エリアの新築一戸建て。全室南向き、太陽光パネル設置済み。</p>',
    mainImage: img('/images/home/hero-1.jpg'),
    images: [],
    location: '静岡県駿東郡清水町柿田',
    nearestStation: 'JR三島駅 車8分',
    landArea: 150.0,
    buildingArea: 105.3,
    layout: '4LDK',
    constructionDate: '2024年3月',
    transactionType: '仲介',
    price: 3280,
    regions: [mockRegions[3]],
  },
  {
    ...base('prop-8'),
    title: '三島市 中央町 売土地',
    type: 'sell',
    category: 'land',
    status: 'available',
    description: '<p>三島駅徒歩圏内の整形地。建築条件なし。商業利用も可能。</p>',
    mainImage: img('/images/home/hero-2.jpg'),
    images: [],
    location: '静岡県三島市中央町',
    nearestStation: '東海道本線 三島駅 徒歩10分',
    landArea: 220.0,
    transactionType: '仲介',
    price: 2800,
    regions: [mockRegions[0]],
  },
  {
    ...base('prop-9'),
    title: '長泉町 戸建て賃貸',
    type: 'rent',
    category: 'property',
    status: 'available',
    description: '<p>ファミリー向けの戸建て賃貸。庭付きでペット相談可。</p>',
    mainImage: img('/images/home/hero-3.jpg'),
    images: [],
    location: '静岡県駿東郡長泉町下土狩',
    nearestStation: 'JR長泉なめり駅 徒歩12分',
    buildingArea: 95.0,
    layout: '3LDK',
    constructionDate: '2010年6月',
    rent: 120000,
    regions: [mockRegions[2]],
  },
  {
    ...base('prop-10'),
    title: '沼津市 リノベーション済みマンション',
    type: 'sell',
    category: 'property',
    status: 'sold',
    description: '<p>フルリノベーション済みの駅近マンション。最新設備導入。</p>',
    mainImage: img('/images/home/service-owner.jpg'),
    images: [],
    location: '静岡県沼津市大手町',
    nearestStation: 'JR沼津駅 徒歩3分',
    buildingArea: 68.0,
    layout: '2LDK',
    constructionDate: '2000年8月',
    price: 1980,
    regions: [mockRegions[1]],
  },
  {
    ...base('prop-11'),
    title: '三島市 南町 閑静な住宅地',
    type: 'sell',
    category: 'land',
    status: 'available',
    description: '<p>南向きの閑静な住宅地。生活利便施設が充実したエリア。</p>',
    mainImage: img('/images/mock/property-1.jpg'),
    images: [],
    location: '静岡県三島市南町',
    nearestStation: '伊豆箱根鉄道 三島田町駅 徒歩7分',
    landArea: 180.5,
    transactionType: '仲介',
    price: 2200,
    regions: [mockRegions[0]],
  },
];

// ===== Stories =====
// カテゴリ: daily=日々のこと, regional=地域のこと, property=物件のつづき
export const mockStories: Story[] = [
  {
    ...base('story-1'),
    title: '家族の夢を叶えた、三島市谷田での新生活',
    subtitle: '水の都・三島で見つけた理想の住まい',
    content: '<h2>三島の魅力</h2><p>三島市は富士山の伏流水が湧き出る「水の都」として知られています。街中を流れるせせらぎは、住む人の心を癒してくれます。</p>',
    thumbnail: { url: '/images/mock/story-1.jpg', width: 800, height: 600 },
    regions: [{ ...base('region-hikari'), name: '光ヶ丘・富士見台', order: 1 }],
    property: mockProperties[0],
    category: 'property',
  },
  {
    ...base('story-2'),
    title: '沼津の海沿いライフスタイル',
    subtitle: '海と山に囲まれた暮らし',
    content: '<h2>港町・沼津</h2><p>駿河湾の新鮮な海の幸、千本松原の美しい景観。沼津は自然の恵みにあふれた街です。</p><p>最近はリノベーション物件も増え、若い世代の移住先としても注目されています。</p>',
    thumbnail: img('/images/home/story-2.png'),
    regions: [mockRegions[1]],
    category: 'regional',
  },
  {
    ...base('story-3'),
    title: '子育て世代に人気の長泉町',
    subtitle: '教育環境と自然のバランスが魅力',
    content: '<h2>長泉町が選ばれる理由</h2><p>静岡県内でも高い教育水準を誇る長泉町。子育て支援策も充実しており、若いファミリー層の転入が続いています。</p><p>三島駅へのアクセスも良く、通勤にも便利な立地です。</p>',
    thumbnail: img('/images/home/story-3.png'),
    regions: [mockRegions[2]],
    category: 'daily',
  },
  {
    ...base('story-4'),
    title: '地域とつながる不動産の形',
    subtitle: 'アイ企画が大切にしていること',
    content: '<h2>不動産は「暮らし」そのもの</h2><p>私たちアイ企画は、単に物件を紹介するだけでなく、その土地の暮らしまるごとをお伝えしたいと考えています。</p><p>地域のお祭り、美味しいお店、子どもの遊び場。そうした情報も含めて、お客様に最適な住まい選びをサポートします。</p>',
    thumbnail: img('/images/home/story-1.png'),
    regions: [mockRegions[0], mockRegions[1]],
    category: 'regional',
  },
  {
    ...base('story-5'),
    title: '三島の朝市で見つけた、旬の暮らし',
    subtitle: '地元の食材と出会う週末の楽しみ',
    content: '<h2>朝市の魅力</h2><p>毎週日曜日に開催される三島の朝市。新鮮な野菜や果物、手作りのお惣菜が並びます。</p>',
    thumbnail: img('/images/home/hero-1.jpg'),
    regions: [mockRegions[0]],
    category: 'daily',
  },
  {
    ...base('story-6'),
    title: '源兵衛川のせせらぎに癒される日常',
    subtitle: '水の都・三島を象徴する散歩道',
    content: '<h2>源兵衛川</h2><p>三島市を代表する清流、源兵衛川。夏には子どもたちが水遊びを楽しむ、街のオアシスです。</p>',
    thumbnail: img('/images/home/hero-2.jpg'),
    regions: [mockRegions[0]],
    category: 'regional',
  },
  {
    ...base('story-7'),
    title: '長泉町の公園めぐり、家族の休日',
    subtitle: '自然豊かな公園が点在する街',
    content: '<h2>公園天国・長泉町</h2><p>長泉町には大小様々な公園が点在。子どもたちがのびのび遊べる環境が整っています。</p>',
    thumbnail: img('/images/home/hero-3.jpg'),
    regions: [mockRegions[2]],
    category: 'daily',
  },
  {
    ...base('story-8'),
    title: 'リノベで蘇った、築40年の味わい深い家',
    subtitle: '古い家に新しい命を吹き込む',
    content: '<h2>リノベーションの魅力</h2><p>築40年の木造住宅をフルリノベーション。古き良き趣を残しながら、現代の暮らしに合わせた間取りに生まれ変わりました。</p>',
    thumbnail: img('/images/home/service-customer.jpg'),
    regions: [mockRegions[1]],
    property: mockProperties[1],
    category: 'property',
  },
  {
    ...base('story-9'),
    title: '清水町で見つけた、ちょうどいい田舎暮らし',
    subtitle: '都会と自然の絶妙なバランス',
    content: '<h2>清水町の魅力</h2><p>三島へのアクセスが良く、自然も豊か。ちょうどいい田舎暮らしが叶う清水町の魅力を紹介します。</p>',
    thumbnail: img('/images/home/story-1.png'),
    regions: [mockRegions[3]],
    category: 'regional',
  },
  {
    ...base('story-10'),
    title: '三島の四季を楽しむ、庭のある暮らし',
    subtitle: '季節の花と緑に囲まれて',
    content: '<h2>庭のある暮らし</h2><p>春は桜、夏は紫陽花、秋は紅葉、冬は椿。四季折々の花が楽しめる庭付き物件の魅力とは。</p>',
    thumbnail: img('/images/home/story-3.png'),
    regions: [mockRegions[0]],
    category: 'property',
  },
];

// Link sold property to story
mockProperties[4].story = mockStories[0] as Story;

// ===== CustomerVoices =====
export const mockCustomerVoices: CustomerVoice[] = [
  {
    ...base('voice-1'),
    title: 'この人、この不動産屋さん、もうここしかないなと思えました',
    customerName: '匿名希望 様',
    category: 'found',
    location: '三島市',
    propertyType: '土地の購入',
    content: '<p>私は3年前、仕事の関係で三島に転勤となりました。不慣れな土地での生活も2年が経った頃、プライベートでは結婚・第一子誕生という...</p>',
    image: { url: '/images/voice/letter-1.png', width: 1058, height: 1496 },
    order: 1,
  },
  {
    ...base('voice-2'),
    title: '誠実さと親しみやすさを感じる不動産屋さん',
    customerName: 'y.k様',
    category: 'found',
    content: '<p>物件を探すにあたり、信頼できる不動産屋さんに相談しながら決めたいと思っていました。アイ企画さんのホームページを拝見し誠実さと親しみやすさを感じ、お願いすることにしました。</p>',
    order: 2,
  },
  {
    ...base('voice-3'),
    title: '誠実さと親しみやすさを感じる不動産屋さん',
    customerName: 'y.k様',
    category: 'inherited',
    content: '<p>アイ企画さんに相談して本当に良かったです。丁寧な対応に感謝しています。</p>',
    order: 3,
  },
  {
    ...base('voice-4'),
    title: '誠実さと親しみやすさを感じる不動産屋さん',
    customerName: 'y.k様',
    category: 'found',
    content: '<p>安心してお任せできる不動産屋さんです。</p>',
    order: 4,
  },
  {
    ...base('voice-5'),
    title: '誠実さと親しみやすさを感じる不動産屋さん',
    customerName: 'y.k様',
    category: 'other',
    content: '<p>友人にもおすすめしたいと思います。</p>',
    order: 5,
  },
  {
    ...base('voice-6'),
    title: '誠実さと親しみやすさを感じる不動産屋さん',
    customerName: 'y.k様',
    category: 'found',
    content: '<p>地域に密着した素晴らしいサービスでした。</p>',
    order: 6,
  },
  {
    ...base('voice-7'),
    title: '誠実さと親しみやすさを感じる不動産屋さん',
    customerName: 'y.k様',
    category: 'inherited',
    content: '<p>相続の相談にも親身に対応していただきました。</p>',
    order: 7,
  },
  {
    ...base('voice-8'),
    title: '誠実さと親しみやすさを感じる不動産屋さん',
    customerName: 'y.k様',
    category: 'found',
    content: '<p>初めての不動産購入でしたが、安心して進めることができました。</p>',
    order: 8,
  },
  {
    ...base('voice-9'),
    title: '誠実さと親しみやすさを感じる不動産屋さん',
    customerName: 'y.k様',
    category: 'other',
    content: '<p>丁寧な説明と対応に感謝しています。</p>',
    order: 9,
  },
  {
    ...base('voice-10'),
    title: '誠実さと親しみやすさを感じる不動産屋さん',
    customerName: 'y.k様',
    category: 'found',
    content: '<p>アイ企画さんを選んで本当に良かったです。</p>',
    order: 10,
  },
];

// ===== StaffInterviews =====
export const mockStaffInterviews: StaffInterview[] = [
  {
    ...base('staff-1'),
    staffName: '山田 太郎',
    position: '代表取締役',
    photo: img('/images/home/about.jpg', 200, 200),
    questions: [
      { fieldId: 'qa', question: 'アイ企画を設立したきっかけは？', answer: '三島で生まれ育ち、この地域の良さを多くの方に知ってもらいたいという想いから不動産業を始めました。物件だけでなく、暮らしそのものを提案できる会社を目指しています。' },
      { fieldId: 'qa', question: '大切にしていることは？', answer: 'お客様との信頼関係です。一生に一度の大きなお買い物だからこそ、正直に、誠実にお付き合いすることを心がけています。' },
      { fieldId: 'qa', question: '今後のビジョンを教えてください', answer: 'テクノロジーを活用しながらも、地域に根ざした温かいサービスを提供し続けたいです。AIを活用した物件提案なども検討しています。' },
    ],
    order: 1,
  },
  {
    ...base('staff-2'),
    staffName: '鈴木 花子',
    position: '営業主任',
    photo: img('/images/home/about.jpg', 200, 200),
    questions: [
      { fieldId: 'qa', question: '入社のきっかけは？', answer: '地元三島で、人の暮らしに寄り添える仕事がしたいと思い入社しました。お客様の笑顔が何よりのやりがいです。' },
      { fieldId: 'qa', question: '得意な分野は？', answer: '子育て世代のお客様へのご提案が得意です。自分自身も三島で子育てをしているので、学区や公園、小児科の情報など実体験を交えてご案内できます。' },
      { fieldId: 'qa', question: '休日の過ごし方は？', answer: '子どもと一緒に三島の公園めぐりをしています。楽寿園や源兵衛川は何度行っても癒されますね。' },
    ],
    order: 2,
  },
];

// ===== Pages =====
export const mockPages: Page[] = [
  {
    ...base('page-about'),
    slug: 'about',
    title: 'アイ企画について',
    content: `
      <h2>企業理念</h2>
      <p>「家族の想いを、つなぐ不動産へ。」</p>
      <p>アイ企画は、静岡県三島市を中心に不動産の売買・賃貸をお手伝いしている不動産会社です。地域に根ざし、お客様一人ひとりに寄り添ったサービスを提供しています。</p>
      <h2>会社概要</h2>
      <table>
        <tbody>
          <tr><th>会社名</th><td>株式会社アイ企画</td></tr>
          <tr><th>所在地</th><td>静岡県三島市中央町1-1-1</td></tr>
          <tr><th>代表者</th><td>山田 太郎</td></tr>
          <tr><th>設立</th><td>2010年4月</td></tr>
          <tr><th>事業内容</th><td>不動産売買・賃貸の仲介、不動産コンサルティング</td></tr>
          <tr><th>免許番号</th><td>静岡県知事(3)第○○○○号</td></tr>
        </tbody>
      </table>
    `,
  },
  {
    ...base('page-message'),
    slug: 'message',
    title: 'ご挨拶',
    content: `
      <p>アイ企画のホームページをご覧いただき、ありがとうございます。</p>
      <p>私たちは「暮らしをつなぐ」をモットーに、三島市を中心とした静岡県東部エリアで不動産業を営んでおります。</p>
      <p>不動産の取引は、お客様にとって人生の大きな決断です。だからこそ、私たちは一つひとつのご縁を大切に、誠実な対応を心がけています。</p>
      <p>物件情報だけでなく、地域の暮らしの魅力もお伝えすることで、お客様にとって本当に良い住まい選びのお手伝いができればと考えています。</p>
      <p>どうぞお気軽にご相談ください。</p>
      <p style="text-align: right;">株式会社アイ企画<br/>代表取締役 山田 太郎</p>
    `,
  },
  {
    ...base('page-for-customer'),
    slug: 'for-customer',
    title: '不動産をお探しの方へ',
    content: `
      <p>アイ企画では、お客様のご要望に合った物件をお探しいたします。三島市を中心とした静岡県東部エリアの物件情報を豊富に取り揃えています。</p>
      <h2>サービスの流れ</h2>
      <ol>
        <li><strong>ご要望のヒアリング</strong> — ご希望のエリア、間取り、予算などをお聞かせください。</li>
        <li><strong>物件のご提案</strong> — 条件に合った物件をピックアップしてご紹介します。</li>
        <li><strong>内覧のご案内</strong> — 気になる物件は実際にご覧いただけます。</li>
        <li><strong>契約手続きのサポート</strong> — 重要事項説明から契約まで、丁寧にサポートします。</li>
      </ol>
      <h2>アイ企画が選ばれる理由</h2>
      <ul>
        <li>地域密着15年以上の実績</li>
        <li>物件だけでなく、暮らし全体をご提案</li>
        <li>アフターフォローも充実</li>
      </ul>
    `,
  },
  {
    ...base('page-for-owner'),
    slug: 'for-owner',
    title: '不動産をお持ちの方へ',
    content: `
      <p>不動産の売却・賃貸をお考えの方、まずはお気軽にご相談ください。地域に精通したスタッフが、適切な査定と販売戦略をご提案いたします。</p>
      <h2>売却の流れ</h2>
      <ol>
        <li><strong>無料査定のご依頼</strong> — お電話・メールでお気軽にお問い合わせください。</li>
        <li><strong>物件の査定・評価</strong> — 現地調査の上、適正価格をご提示します。</li>
        <li><strong>販売計画のご提案</strong> — 売却方法・スケジュールをご提案します。</li>
        <li><strong>販売活動の開始</strong> — 広告掲載、内覧対応などを行います。</li>
        <li><strong>契約・引き渡し</strong> — 買主様との契約から引き渡しまでサポートします。</li>
      </ol>
      <h2>賃貸管理もお任せください</h2>
      <p>入居者募集から日常管理、退去時の対応まで、オーナー様の負担を軽減するトータルサポートを提供しています。</p>
    `,
  },
  {
    ...base('page-privacy'),
    slug: 'privacy-policy',
    title: 'プライバシーポリシー',
    content: `
      <h2>個人情報の取り扱いについて</h2>
      <p>株式会社アイ企画（以下「当社」）は、お客様の個人情報の保護に努めます。</p>
      <h3>1. 個人情報の収集</h3>
      <p>当社は、業務上必要な範囲内で、適法かつ公正な手段により個人情報を収集いたします。</p>
      <h3>2. 個人情報の利用目的</h3>
      <ul>
        <li>不動産取引に関するサービスの提供</li>
        <li>お客様からのお問い合わせへの対応</li>
        <li>物件情報等のご案内</li>
      </ul>
      <h3>3. 個人情報の第三者提供</h3>
      <p>当社は、法令に定める場合を除き、お客様の同意を得ることなく個人情報を第三者に提供いたしません。</p>
      <h3>4. お問い合わせ</h3>
      <p>個人情報の取り扱いに関するお問い合わせは、当社までご連絡ください。</p>
    `,
  },
];

// ===== Helper functions for mock queries =====

function listResponse<T>(items: T[]): MicroCMSListResponse<T> {
  return {
    contents: items,
    totalCount: items.length,
    offset: 0,
    limit: items.length,
  };
}

export function mockGetProperties(queries: Record<string, unknown> = {}): MicroCMSListResponse<Property> {
  let items = [...mockProperties];
  const filters = queries.filters as string | undefined;
  if (filters) {
    if (filters.includes('status[equals]available')) {
      items = items.filter((p) => p.status === 'available');
    }
    const notEquals = filters.match(/id\[not_equals\](\S+)/);
    if (notEquals) {
      items = items.filter((p) => p.id !== notEquals[1]);
    }
  }
  const q = queries.q as string | undefined;
  if (q) {
    const lower = q.toLowerCase();
    items = items.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.location?.toLowerCase().includes(lower)
    );
  }
  const limit = (queries.limit as number) || items.length;
  const offset = (queries.offset as number) || 0;
  const sliced = items.slice(offset, offset + limit);
  return { contents: sliced, totalCount: items.length, offset, limit };
}

export function mockGetProperty(id: string): Property | null {
  return mockProperties.find((p) => p.id === id) ?? null;
}

export function mockGetStories(queries: Record<string, unknown> = {}): MicroCMSListResponse<Story> {
  let items = [...mockStories];
  const filters = queries.filters as string | undefined;
  if (filters) {
    const notEquals = filters.match(/id\[not_equals\](\S+)/);
    if (notEquals) {
      items = items.filter((s) => s.id !== notEquals[1]);
    }
  }
  const limit = (queries.limit as number) || items.length;
  const offset = (queries.offset as number) || 0;
  const sliced = items.slice(offset, offset + limit);
  return { contents: sliced, totalCount: items.length, offset, limit };
}

export function mockGetStory(id: string): Story | null {
  return mockStories.find((s) => s.id === id) ?? null;
}

export function mockGetRegions(): MicroCMSListResponse<Region> {
  return listResponse(mockRegions);
}

export function mockGetCustomerVoices(): MicroCMSListResponse<CustomerVoice> {
  return listResponse(mockCustomerVoices);
}

export function mockGetStaffInterviews(): MicroCMSListResponse<StaffInterview> {
  return listResponse(mockStaffInterviews);
}

export function mockGetPageBySlug(slug: string): Page | null {
  return mockPages.find((p) => p.slug === slug) ?? null;
}
