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

const img = (w: number, h: number, label: string) => ({
  url: `https://placehold.co/${w}x${h}/0066cc/ffffff?text=${encodeURIComponent(label)}`,
  width: w,
  height: h,
});

// ===== Properties =====
export const mockProperties: Property[] = [
  {
    ...base('prop-1'),
    title: '三島市中心部 築浅一戸建て',
    type: 'sell',
    category: 'property',
    label: '新着',
    status: 'available',
    description: '<p>三島駅から徒歩12分、閑静な住宅街に位置する築浅物件です。日当たり良好、駐車場2台分あり。</p><p>リビングは広々18帖。対面キッチンからお子様の様子が見渡せます。</p>',
    mainImage: img(800, 600, '物件1'),
    images: [img(800, 600, '物件1-2'), img(800, 600, '物件1-3')],
    location: '静岡県三島市中央町1-2-3',
    nearestStation: 'JR三島駅 徒歩12分',
    landArea: 165.5,
    buildingArea: 110.2,
    layout: '4LDK',
    constructionDate: '2021年3月',
    schoolDistrict: '三島市立北小学校',
    transactionType: '仲介',
    price: 3580,
    regions: [mockRegions[0]],
  },
  {
    ...base('prop-2'),
    title: '沼津市 駅近マンション',
    type: 'sell',
    category: 'property',
    label: 'おすすめ',
    status: 'available',
    description: '<p>沼津駅南口から徒歩5分。通勤に便利な好立地マンション。スーパー・コンビニ徒歩圏内。</p>',
    mainImage: img(800, 600, '物件2'),
    images: [img(800, 600, '物件2-2')],
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
    mainImage: img(800, 600, '土地1'),
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
    mainImage: img(800, 600, '賃貸1'),
    images: [img(800, 600, '賃貸1-2')],
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
    title: '清水町 ファミリー向け貸家',
    type: 'rent',
    category: 'property',
    status: 'sold',
    description: '<p>庭付きの一戸建て貸家。お子様がのびのび遊べる環境です。</p>',
    mainImage: img(800, 600, '賃貸2'),
    images: [],
    location: '静岡県駿東郡清水町徳倉12-13',
    nearestStation: 'JR三島駅 バス15分',
    buildingArea: 85.0,
    layout: '3LDK',
    constructionDate: '2010年6月',
    rent: 95000,
    regions: [mockRegions[3]],
  },
  {
    ...base('prop-6'),
    title: '沼津市 事業用地 100坪',
    type: 'rent',
    category: 'land',
    status: 'available',
    description: '<p>国道沿いの事業用貸地。駐車場・資材置場等に最適。</p>',
    mainImage: img(800, 600, '貸地1'),
    images: [],
    location: '静岡県沼津市大岡14-15',
    nearestStation: 'JR沼津駅 車10分',
    landArea: 330.5,
    rent: 150000,
    regions: [mockRegions[1]],
  },
];

// ===== Stories =====
export const mockStories: Story[] = [
  {
    ...base('story-1'),
    title: '三島の湧水と暮らす日々',
    subtitle: '水の都・三島で見つけた理想の住まい',
    content: '<h2>三島の魅力</h2><p>三島市は富士山の伏流水が湧き出る「水の都」として知られています。街中を流れるせせらぎは、住む人の心を癒してくれます。</p><h2>この街で暮らすということ</h2><p>新幹線三島駅があるため、東京への通勤も可能。自然豊かな環境で子育てをしながら、都市部への通勤もできるバランスの良い街です。</p><p>休日は源兵衛川や楽寿園で家族とのんびり過ごす。そんなスローライフが三島では実現できます。</p>',
    thumbnail: img(800, 600, 'ストーリー1'),
    regions: [mockRegions[0]],
    property: mockProperties[0],
  },
  {
    ...base('story-2'),
    title: '沼津の海沿いライフスタイル',
    subtitle: '海と山に囲まれた暮らし',
    content: '<h2>港町・沼津</h2><p>駿河湾の新鮮な海の幸、千本松原の美しい景観。沼津は自然の恵みにあふれた街です。</p><p>最近はリノベーション物件も増え、若い世代の移住先としても注目されています。</p>',
    thumbnail: img(800, 600, 'ストーリー2'),
    regions: [mockRegions[1]],
  },
  {
    ...base('story-3'),
    title: '子育て世代に人気の長泉町',
    subtitle: '教育環境と自然のバランスが魅力',
    content: '<h2>長泉町が選ばれる理由</h2><p>静岡県内でも高い教育水準を誇る長泉町。子育て支援策も充実しており、若いファミリー層の転入が続いています。</p><p>三島駅へのアクセスも良く、通勤にも便利な立地です。</p>',
    thumbnail: img(800, 600, 'ストーリー3'),
    regions: [mockRegions[2]],
  },
  {
    ...base('story-4'),
    title: '地域とつながる不動産の形',
    subtitle: 'アイ企画が大切にしていること',
    content: '<h2>不動産は「暮らし」そのもの</h2><p>私たちアイ企画は、単に物件を紹介するだけでなく、その土地の暮らしまるごとをお伝えしたいと考えています。</p><p>地域のお祭り、美味しいお店、子どもの遊び場。そうした情報も含めて、お客様に最適な住まい選びをサポートします。</p>',
    thumbnail: img(800, 600, 'ストーリー4'),
    regions: [mockRegions[0], mockRegions[1]],
  },
];

// ===== CustomerVoices =====
export const mockCustomerVoices: CustomerVoice[] = [
  {
    ...base('voice-1'),
    customerName: 'T様ご家族',
    location: '三島市',
    propertyType: '戸建て（購入）',
    date: '2024年8月',
    content: '<p>子どもの小学校入学に合わせて住まい探しを始めました。アイ企画さんは地域の学区情報にとても詳しく、安心してお任せできました。今では家族みんなで三島の暮らしを楽しんでいます。</p>',
    order: 1,
  },
  {
    ...base('voice-2'),
    customerName: 'S様',
    location: '沼津市',
    propertyType: 'マンション（購入）',
    date: '2024年5月',
    content: '<p>転勤で静岡に来ることになり、土地勘がない中での物件探しでしたが、丁寧に沼津の街の魅力を教えていただきました。駅近のマンションを紹介していただき、通勤も買い物もとても便利です。</p>',
    order: 2,
  },
  {
    ...base('voice-3'),
    customerName: 'M様ご夫婦',
    location: '長泉町',
    propertyType: '土地（購入）',
    date: '2024年2月',
    content: '<p>注文住宅を建てるための土地を探していました。希望のエリアでなかなか見つからず困っていたところ、アイ企画さんが条件にぴったりの土地を見つけてくれました。現在、夢のマイホームを建築中です。</p>',
    order: 3,
  },
];

// ===== StaffInterviews =====
export const mockStaffInterviews: StaffInterview[] = [
  {
    ...base('staff-1'),
    staffName: '山田 太郎',
    position: '代表取締役',
    photo: img(200, 200, '山田'),
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
    photo: img(200, 200, '鈴木'),
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
