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

---

## 3. `/properties`(物件一覧)

### 3-1. pickup物件のサムネイル
pickup物件の中にサムネイルがあるがそれが正確に動いているかを確認したいので現在のpickup物件のCMSにデータを投入して欲しい。サムネイルは全てクリッカブルで、押したらカードの中の大きな画像が切り替わる仕様にしてほしい。切り替え時には他で使っているようなアニメーションをつけてほしい
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10285&m=dev

### 3-2. pickup物件と検索バーの間の余白
pickup物件と検索バーの間の余白が不足していそう
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10281&m=dev

### 3-3. paginationのスクロール挙動と現在ページ表示
paginationを押したらスクロール位置が変わる挙動を直してほしい。あと、今何ページ目なのかを知らせるために現在のページ数をなんらかのスタイルで示してほしい
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

---

## 4. `/`(トップページ)

### 4-1. お客様の声のpagination仕様
お客様の声については新着順で3件表示してあり、paginationを押したら4件目から表示される仕組みにしてください。今は全件初期表示されていて、paginationをしたら対象のものが一番左に来るような実装になってしまっています
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10009&m=dev

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

### 4-10. お客様の声 カードスタイル・横スクロール挙動
お客様の声について、無事paginationの挙動は修正されたものの、元々のスタイルから離れています。カード一つ一つの大きさや全体の横スクロールなどの挙動を見直してください
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10009&m=dev

### 4-11. SPサイズのアイコン(再・押下時挙動)
SPサイズにしたときのアイコンがまだ違います。またこれを押した時の挙動を考えて実装してください
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10610&m=dev

### 4-12. SPサイズの背景【再指摘】
何度も指摘していますが、SPサイズの時のここの背景が違います。`background: url(<path-to-image>) lightgray 50% / cover no-repeat;
Modes
` が効いてないのでしょうか?PCサイズの時はうまくいっています
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10628&m=dev

### 4-13. SPサイズのslideshowコンポーネント上下余白
SPサイズの時のslideshowコンポーネントの上下の余白が違います
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10629&m=dev

### 4-14. 「三島市で駐車場をお探しの方へ」コンポーネント上下余白(SP)
SPサイズの時の「三島市で駐車場をお探しの方へ」コンポーネントの上下の余白も違う
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10688&m=dev

### 4-15. SPサイズのストーリーカード【再指摘】
SPサイズの時のストーリーカードについても何度も指摘しているがストーリー一覧で使っていたやつを並べればよくて、その実装がFigmaと大きく違う。
カード内にラベルやタイトルやアイコンが収まる感じ
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10693&m=dev

### 4-16. SPサイズのslideshowコンポーネント上下余白(別箇所)
SPサイズの時のslideshowコンポーネント?の上下の余白が違う
- https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/%E3%82%A2%E3%82%A4%E4%BC%81%E7%94%BB--Dev-?node-id=4211-10690&m=dev

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