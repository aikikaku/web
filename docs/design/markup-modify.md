# デザインレビュー指摘事項

> **重要な前提**
> こちらの指摘も既に何度もしているやつがあります。なぜ何度も指摘しなければならないのでしょうか？
>
> これらも既に指摘されたやつがあります。なぜ何度も指摘されているのに直せてないのかをあなたなりに調査し、その原因を改名して改善してください。私の指示に矛盾が発生していない限り、二回以上指摘されることが金輪際ないようにしてください。PRはマージして。bypassで
>
> では修正作業に再び入っていきます。以下に指摘をしていきますので全て確実に対応してください。なお、過去にも繰り返し指摘されているものがあります。私の指示が矛盾していたら確認していただきたいのですが、今まで指摘されたことがあるものは確実に修正するようにしてください
>
> PRはマージしてください

---

## 1. `/properties/prop-6`(物件詳細)

### 1-1. リッチエディタの挙動確認
物件詳細のこの部分の挙動を確認したいので、`/docs/operations/richeditor-manual.md`にある内容通りにコンテンツをCMSで作成して挙動を確認してほしい。ストーリー詳細と同じような挙動をするべき
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10160&m=dev

### 1-2. 「もっと物件を見る」のpagination未実装
もっと物件を見るのpaginationがそもそも実装されていない。これは他のページの「もっと物件をみる」でもそうなのでは？複数回使われている場合はコンポーネント化してほしい
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10277&m=dev

### 1-3. SPサイズのカラムindexバー
これも一度指摘していることだけど、物件詳細の時のSPサイズの時のカラムindexを示すバーが全然Figmaと違う。スクロール時の挙動は正しいけど。
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10920&m=dev
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-11590&m=dev

### 1-4. SPサイズの「もっとみる」「すべて見る」の余白
SPサイズの時のもっとみるとすべて見るについての余白が異なる。
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10881&m=dev
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10889&m=dev

### 1-5. 物件カード内のステータスラベル(SP)
SPサイズの時、物件カード内にステータスなどのラベルは表示されるべきなんですが、全体を通してこれが未反映なのではないでしょうか?
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10834&m=dev

---

## 2. `/stories`(ストーリー一覧)

### 2-1. 検索バーの表示位置
検索バーの表示位置が違うのでは?pick upストーリーの上に来るべきなのでは?また絞り込みボタンと選択条件解除アイコンとは左右両端揃えになるべきなのでは?
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-11270&m=dev

### 2-2. 検索バー選択時の挙動
検索バーについて、物件一覧でもそうですが、選択した時の挙動がデザインの指摘と違います。
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-26267&m=dev
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-26286&m=dev

### 2-3. paginationのスクロール位置
物件一覧でもそうですが、paginationを押した時、一覧の先頭にスクロール位置が動くのはいかがでしょうか?簡単にできるならスクロールアニメーションもつけてほしいでもそれでコードが汚れて保守性が悪くなるならやめてほしい
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-11254&m=dev

### 2-4. SPサイズの改行位置
SPサイズの時、ここの部分の改行が違う。「物件だけじゃわからない、」で改行入ってない?
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10966&m=dev

### 2-5. SPサイズのpickupストーリー上の余白
SPサイズの時のpickupストーリーの上の余白が違う
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10969&m=dev

### 2-6. SPサイズのpickupストーリー下の余白
SPサイズの時のpickupストーリーの下の余白も違う
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10967&m=dev

### 2-7. SPサイズのストーリーカード
SPサイズの時のストーリーカードはFigmaのデザインと現在の実装が大きく異なる
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10988&m=dev

### 2-8. PCサイズ pagination アクティブページ強調
物件一覧の時もそうですが、paginationについては現在アクティブなページを太字にして、それ以外の数字は半透明にするのはいかがでしょう?
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-11254&m=dev

### 2-9. SPサイズの余白
余白が違います
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10961&m=dev

### 2-10. SPサイズのカード間gap
カード間のgapが違う?
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10987&m=dev

### 2-11. SPサイズの絞り込みnavigation
絞り込みのnavigatinが違います。物件一覧とこれは似ているはず
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-11098&m=dev

### 2-12. SPサイズの絞り込みnavigation展開時UIUX
絞り込みのnavigationを開いた時のUIUXはデザインと大きく異なります。物件一覧の方も見直してほしい
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-11572&m=dev

---

## 3. `/properties`(物件一覧)

### 3-1. pickup物件のサムネイル
pickup物件の中にサムネイルがあるがそれが正確に動いているかを確認したいので現在のpickup物件のCMSにデータを投入して欲しい。サムネイルは全てクリッカブルで、押したらカードの中の大きな画像が切り替わる仕様にしてほしい。切り替え時には他で使っているようなアニメーションをつけてほしい
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10285&m=dev

### 3-2. pickup物件と検索バーの間の余白
pickup物件と検索バーの間の余白が不足していそう
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10281&m=dev

### 3-3. paginationのスクロール挙動と現在ページ表示
paginationを押したら一覧の先頭にsmooth scrollしてほしい(2-3と同じ挙動)。あと、今何ページ目なのかを知らせるために現在のページ数をなんらかのスタイルで示してほしい
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10338&m=dev

### 3-4. 「三島市で駐車場をお探しの方へ」上下余白
三島市で駐車場をお探しの方への上下の余白がfigmaと違う。
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10353&m=dev

### 3-5. SPサイズの絞り込みバー
SPサイズの時の物件を絞りこみバーのデザインがそもそも違う。横幅も違う。アイコンも違う。
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10780&m=dev

### 3-6. SPサイズの絞り込みモーダル
SPサイズの時の絞り込みバーを押した時のモーダルは大きくFigmaと違う
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10793&m=dev

### 3-7. pickup物件サムネイル(SP)未確認
上記で指摘した通り、pickup物件でのサムネイルがSPサイズの時も未確認
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10721&m=dev

### 3-8. 物件カード内の両端余白(SP)
物件カードの中のこの部分はSPサイズのときに両端に余白3pxくらい入ってるかな?不要では?
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10724&m=dev

### 3-9. SPサイズの物件カード間余白
SPサイズの時、物件カード間の余白が足りない
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10723&m=dev

### 3-10. 「三島市で駐車場をお探しの方へ」コンポーネント上下余白(SP)
SPサイズの時の「三島市で駐車場をお探しの方へ」のコンポーネントの上下の余白がFigmaと異なる
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10722&m=dev
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10741&m=dev

### 3-11. 問い合わせコンポーネント内部デザイン(SP)
SPサイズの時の問い合わせのコンポーネントの内部デザインが大分違う
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10744&m=dev
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10744&m=dev
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10744&m=dev

### 3-12. 問い合わせコンポーネント余白(SP)
SPサイズの時の余白も異なる
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10743&m=dev

### 3-13. PCサイズ Dropdown横幅と地域選択の同期問題
PCサイズ、dropdownコンポーネントの横幅がおかしい。また、地域について選択した時にAPIの問い合わせが完了してからチェックマークがつくので即時反応しなくなっている。呼び出しとチェックマークがつくのが同期実行されていないか。
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-26259&m=dev

### 3-14. paginationの現在ページと次への矢印のスタイル衝突(PC)
paginationについて、今表示されているページにあたってるスタイルと次への矢印にあたっているスタイルが同じで、スタイルの意味とUI上の意味が認知コスト産んでいる
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10338&m=dev

### 3-15. paginationと「三島市で駐車場をお探しの方へ」の余白(PC)
paginationの下に余白が入りすぎてるのか、「三島市で駐車場をお探しの方へ」の上下の余白が異なるように感じる
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10353&m=dev

### 3-16. その他のお問い合わせが消えている(PC)
その他のお問い合わせが消えている
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10360&m=dev

### 3-17. SPサイズの余白
余白が異なる
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10721&m=dev

### 3-18. SPサイズの編みかけ(ザブトン)スタイル
編みかけのスタイル(ザブトン)がデザインと異なる
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10721&m=dev

### 3-19. SPサイズの余白(別箇所)
余白がデザインと異なる
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10722&m=dev

### 3-20. SPサイズ 価格のみデータの区切り線
価格だけがデータに入ってる時に区切り線が右端に入ってしまっているので取り除きたい
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10725&m=dev
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10725&m=dev

### 3-21. PCサイズ Dropdownフィルタ時のpickup物件固定化
PCサイズ、dropdownで何かフィルタリングしてもpickupしている物件は変わらない方がいいのではないでしょうか?今はフィルタリングするたびに変わります
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10287&m=dev

### 3-22. SPサイズ pickup物件の編みかけスタイル
pickup物件の編みかけのスタイルが違う
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10721&m=dev

### 3-23. SPサイズ pickup物件直下の余白
pickup物件のすぐ下の余白がなんか違う気がする
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10722&m=dev

### 3-24. SPサイズ 絞り込みモーダルのレイアウト【再指摘・要根本対応】
絞り込みのデザインが正確ではない。すべてとご案内中の物件の高さも違うし、dropdownを選択したら他のコンポーネントの高さが圧縮される。実際に押してみて挙動を確かめて。モーダル自体のheightは固定で全体の上下中央に配置して、モーダル内でスクロールさせたらどう?
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10793&m=dev
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10793&m=dev

### 3-25. SPサイズ 絞り込みボタンの寸法
絞り込みボタンは横幅もう少し大きいような、高さももう少し高いような。
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10780&m=dev

---

## 4. `/`(トップページ)

### 4-1. お客様の声 カルーセル(pagination + 横スクロール)
- Figma の **peek 付き横スクロール** スタイルに揃えること(カードサイズ・gap・peek 量は Figma の実数値に従う)。
- 全件レンダリングする。
- pagination dot は `Math.ceil(全件数 / 3)` 個。新着順で、初期位置は 1 ページ目。
- dot / 矢印クリックで「対象ページの先頭カード(index = page × 3)」を track の左端に smooth scroll させる。これで「pagination を押したら4件目から表示」が成立する。
- 「すべて見る」の配置・余白は Figma に従うこと(PC: dot 行右端 / SP: dot 行の下、全幅)。
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10009&m=dev
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10704&m=dev

### 4-2. SPサイズのアイコン
SPサイズにした時のここのアイコンが違います。半透明になっていませんし、小さいスタイルも違います。また押した時に何も動きません。
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10610&m=dev

### 4-3. SPサイズの背景【再指摘】
何度も指摘していますが、SPサイズにした時の背景が違います。`[Pasted text #1 +4 lines]` ができていないのでは?PCサイズの時の表示を参考にしてください
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10628&m=dev

### 4-4. SPサイズの改行
SPサイズの時、「今日の出会いを、」で改行してください
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10630&m=dev

### 4-5. SPサイズの物件一覧 左余白
SPサイズの時、物件の一覧の左の余白が入ってないです。
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10631&m=dev

### 4-6. SPサイズの両端揃え【再指摘】
何度も指摘していますが、SPサイズにした時にここが両端揃えになってないです。文字が長いとアイコンが下にいってしまいます。文字部分のwidthを静的に指定したらうまくいくのではないでしょうか?これは暮らしを知るのところでも同じ現象になっています。Figmaをよくみて
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10632&m=dev

### 4-7. SPサイズのpagination横幅
SPサイズの時、paginationは横一杯に広げてください。「すべてをみる」と今flexになってしまっています。これは暮らしを知るのところでも同じ現象になっています。Figmaをよくみて
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10679&m=dev

### 4-8. 「暮らしを知る」上の大きなスペース(SP)
SPサイズの時、「暮らしを知る」の上に大きなスペースが入ってしまってます
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10691&m=dev

### 4-9. お客様の声一覧 左余白(SP)
SPサイズの時、お客様の声一覧にも左側に余白がない
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10704&m=dev

### 4-10. SPサイズのアイコン(再・押下時挙動)
SPサイズにしたときのアイコンがまだ違います。またこれを押した時の挙動を考えて実装してください
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10610&m=dev

### 4-11. SPサイズの背景【再指摘】
何度も指摘していますが、SPサイズの時のここの背景が違います。`background: url(<path-to-image>) lightgray 50% / cover no-repeat;
Modes
` が効いてないのでしょうか?PCサイズの時はうまくいっています
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10628&m=dev

### 4-12. SPサイズのslideshowコンポーネント上下余白
SPサイズの時のslideshowコンポーネントの上下の余白が違います
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10629&m=dev

### 4-13. 「三島市で駐車場をお探しの方へ」コンポーネント上下余白(SP)
SPサイズの時の「三島市で駐車場をお探しの方へ」コンポーネントの上下の余白も違う
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10688&m=dev

### 4-14. SPサイズのストーリーカード【再指摘】
SPサイズの時のストーリーカードについても何度も指摘しているがストーリー一覧で使っていたやつを並べればよくて、その実装がFigmaと大きく違う。
カード内にラベルやタイトルやアイコンが収まる感じ
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10693&m=dev

### 4-15. SPサイズのslideshowコンポーネント上下余白(別箇所)
SPサイズの時のslideshowコンポーネント?の上下の余白が違う
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10690&m=dev

### 4-16. PCサイズの背景スタイル未反映
PCサイズの時の`background: url(<path-to-image>) lightgray -263.466px -6.76px / 205.327% 353.941% no-repeat;
Modes
`スタイルが当たってないように思います
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-9984&m=dev

### 4-17. お客様の声 ページング仕様【再指摘】
お客様の声がまだ間違っています。デフォルトで表示されるのは3件です。slideshow navigationで2ページ目にいったときに4〜6件目が表示されるようなロジックにしてください
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10009&m=dev

### 4-18. SPサイズのアイコン【再指摘】
SPサイズの時のアイコンがまだfigma通りではないです。また押したときに何も起きません
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10610&m=dev

### 4-19. SPサイズの背景スタイル未反映【再指摘】
SPサイズの時、PCサイズと同じように`background: url(<path-to-image>) lightgray 50% / cover no-repeat;
Modes
`が当たってないです。背景がfigmaと異なります
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10628&m=dev

### 4-20. SPサイズのslideshow navigation上下余白
SPサイズの時のslideshow navigationの上下の余白が異なります
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10679&m=dev

### 4-21. SPサイズの「三島市で駐車場をお探しの方へ」上下余白
SPサイズの時の「三島市で駐車場をお探しの方へ」の上下の余白がデザインと異なります
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10689&m=dev

### 4-22. SPサイズのslideshow navigation上下余白(別箇所)
SPサイズの時のslideshow navigationの上下の余白が異なります
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10695&m=dev
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10704&m=dev

### 4-23. PCサイズ お客様の声 横スクロール不可
お客様の声が横スクロールできません
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10009&m=dev

### 4-24. PCサイズの背景【再指摘】
ここのコンポーネントの背景がやっぱり違います。`[Pasted text #4 +4 lines]` の指定がうまくいってないのでしょうか?figmaの内容を視覚的にみて見比べてみてほしい
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-9984&m=dev

### 4-25. SPサイズのボタン表示位置
ボタンの表示位置が違う
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10610&m=dev

### 4-26. SPサイズの背景【再指摘・10回以上】
PC同様、背景がやっぱり違う。多分これを指摘するのは10回以上指摘している
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10628&m=dev

---

## 5. コンポーネント

### 5-1. Dropdown(物件とストーリー一覧で使用)

#### デフォルトのデザイン
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-26259&m=dev

#### hover時のデザイン
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-26263&m=dev

#### pressed時のデザイン
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-26267&m=dev

#### selected時のデザイン
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-26286&m=dev

#### 複数選択時の挙動修正
dropdownで複数選択している時の挙動を修正してほしい
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-26286&m=dev

---

### 5-2. buttons

例えばで以下を示すがbutton全般について以下のスタイルです。

#### すべてを見るコンポーネント(SP)

##### デフォルト
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-26130&m=dev

##### pressed
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-26133&m=dev

##### disabled
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-26138&m=dev

#### すべてを見るコンポーネント(PC)

##### default
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-26034&m=dev

##### hover
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-26037&m=dev

##### pressed
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-26040&m=dev

##### disabled
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-26043&m=dev

---

## 6. `/properties/prop-15`(物件詳細)

### 6-1. PCサイズ CMSコンテンツ未投入
CMSに`/docs/operations/richeditor-manual.md`の内容で詳細内容が記述されていないから確認ができない。デザイン通りにコンテンツを作ってほしい
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10160&m=dev

### 6-2. 「物件詳細」押下時の挙動仕様確認(PC)
この画面で「物件詳細」押したらどうなるべき・・?
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10159&m=dev

### 6-3. 「もっと物件をみる」コンポーネント仕様(PC)
[もっと物件をみる]コンポーネントは表示件数デフォルトで6件、slideshow-navigationで次のdotもしくは次へを意味する矢印を押したら7件目から6件表示される。そして、現在表示されている/properties/prop-15と同じ物件種別の物件を毎回ランダムで取得してきて表示する。CMSにデータがなければ作成してください
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10269&m=dev

### 6-4. SPサイズ slideshow navigation上下余白
slideshow navigationの上下の余白が異なる
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10881&m=dev

### 6-5. SPサイズ 「もっと物件をみる」コンポーネント上下余白
もっと物件をみるコンポーネントの上下の余白が異なる(一つのコンポーネントのfigma指示を守っても前後のコンポーネントの余白調整を肉眼で見て調整する必要があります)
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10794&m=dev

### 6-6. PCサイズ pickup物件サムネイルクリック挙動【デグレ】
pickup物件のコンポーネント内でサムネイルの写真をクリックしても何も起きなくなりました。サムネイルの写真をクリックしたらカード内のメインの表示写真が変わるようにしてほしいです
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10159&m=dev

### 6-7. PCサイズ 「もっと物件をみる」横スクロール仕様【再指摘】
もっと物件をみるコンポーネントは横スクロールでFigma上でデザインされています詳細で表示されているものと同じ物件種別の物件をランダムで最大6件表示します
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10268&m=dev

### 6-8. SPサイズ pickupの編みかけスタイル/DOM位置
ストーリー詳細のページでもそうですが、pickupの編みかけのスタイリングというか、domの位置というか、が違う気がします
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10798&m=dev

### 6-9. SPサイズ 絞り込みnavの幅・高さ【再指摘】
物件一覧の絞り込みnavでも指摘しましたがもう少し幅が広くて高さもある気がします
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10920&m=dev

### 6-10. SPサイズ リッチテキストのスタイリング
リッチテキストで書かれた内容について、正しくスタイリングできているか確認してほしい。特に余白について。なんか違う気がする。そしてそのロジックはストーリー詳細にも適用できるはず
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10799&m=dev

### 6-11. SPサイズ 物件資料とお問い合わせの上の余白
物件資料とお問い合わせの上の余白が多い気がする
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10799&m=dev

### 6-12. SPサイズ 「もっと物件を見る」横スクロール
もっと物件を見るコンポーネントについて、横スクロールです。
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10830&m=dev

---

## 7. `/about`

### 7-1. PCサイズ 背景未反映【再指摘】
またこの背景ができていない。`[Pasted text #6 +4 lines]` が効いていないのかもしれない。他の箇所を参考にしてください
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10023&m=dev

### 7-2. PCサイズ 配置がおかしい(その1)
この部分の配置がおかしい。実際にスクショで確認してみて
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10025&m=dev

### 7-3. PCサイズ 配置がおかしい(その2)
同じくこの部分の配置もおかしい。
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10036&m=dev

### 7-4. PCサイズ レイアウトがFigma通りでない
ここのレイアウトもfigma通りじゃない
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10099&m=dev

### 7-5. SPサイズ 写真の大きさ
写真の大きさが違う
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-11109&m=dev

### 7-6. SPサイズ 文字部分が違う
文字部分もだいぶ違う
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-11107&m=dev

### 7-7. SPサイズ Figmaとのずれ(背景スタイル未反映?)
この部分も大きくfigmaとずれている。`[Pasted text #7 +4 lines]`が効いてないのかも
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-11110&m=dev

### 7-8. SPサイズ Figmaと大きく違う(その1)
この部分も大きく違う
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-11115&m=dev
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-11116&m=dev

### 7-9. SPサイズ 画像がそもそもない
画像がそもそもない
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-11118&m=dev

### 7-10. SPサイズ 「もっと見る」コンポーネントの見た目
もっと見るのコンポーネントはスマホサイズになったらこの見た目になるべきでは?
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-11119&m=dev

### 7-11. SPサイズ Figmaと大きく違う(その2)
上記同様、この部分も大きく違う。
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-11120&m=dev

### 7-12. SPサイズ タイポグラフィと画像未反映
上記同様、この部分もタイポグラフィも違うし、画像も入っていない
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-11127&m=dev