# ゲーム改造研究所

DS・3DS・PSP・PS2のゲーム改造・検証を作品別に整理するサイトです。

- [公開サイト](https://reo01026145-lab.github.io/game-mod-site/)
- [記事エディター](https://reo01026145-lab.github.io/game-mod-site/editor.html)

サイトの記事は `posts.js` に保存します。`editor.html` で編集して生成した内容を `posts.js` に反映できます。

## アクセス解析の有効化

サイトには「今日のアクセス」「累計アクセス」「最高同時閲覧」「Xからのアクセス」の表示欄を追加しています。

1. [Supabase の SQL Editor](https://supabase.com/dashboard/project/ybpylupzgmpkjdwajqdi/sql/new) を開く。
2. [analytics-setup.sql](./analytics-setup.sql) の全内容をコピーして SQL Editor に貼り付ける。
3. **Run**（実行）を押す。集計はこの時点から始まります。

公開サイトで読み込み直すと数値が現れます。過去のアクセスは遡って数えられません。
Xで次回紹介するときは [X流入判別用URL](https://reo01026145-lab.github.io/game-mod-site/?utm_source=x) を使うと、Xからの流入を分類しやすくなります（同じ人やタブを厳密に識別するものではありません）。
SQLで作るテーブルにIPアドレスや名前は保存しません。匿名ブラウザーから呼び出せる集計RPCには荒らし対策の完全な保証がないため、数値は参考値です。
