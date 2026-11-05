// 記事はここで編集できます。
// platform は 'DS', '3DS', 'PSP', 'PS2' のいずれか。
// status は '準備中' または '公開中' 。
// まだ実際の改造・検証結果を記載していないため、下記はすべて準備中です。
window.GAME_POSTS = [
  {
    id: 'inazuma-eleven-1-ds',
    platform: 'DS',
    title: 'イナズマイレブン1',
    summary: '熱血ポイント、選手データ、通常プレイでは扱えない要素の検証記録を掲載予定。',
    tags: ['イナイレ', '改造検証'], status: '準備中',
    sections: [{heading:'検証予定',body:'・セーブデータとコードの対応確認\n・ゲームバージョンごとの違い\n・検証環境と動作結果の記録\n\n現在、記事の内容を準備しています。'}]
  },
  {
    id: 'inazuma-123-3ds',
    platform: '3DS',
    title: 'イナズマイレブン1・2・3 円堂守伝説',
    summary: 'DS単体版との差異や、3DS版ならではの動作・改造検証を整理する予定。',
    tags: ['イナイレ', '円堂守伝説'], status: '準備中',
    sections: [{heading:'検証予定',body:'ゲームの収録形式による違いや、使用環境による動作結果を整理します。'}]
  },
  {
    id: 'yo-kai-watch-3-sushi',
    platform: '3DS',
    title: '妖怪ウォッチ3 スシ',
    summary: '妖怪のデータやゲーム内の隠された要素など、気になる仕様を調べる記録。',
    tags: ['妖怪ウォッチ', '検証'], status: '準備中',
    sections: [{heading:'検証予定',body:'妖怪データや通常プレイと異なる状態の動作について、条件と結果を記録します。'}]
  },
  {
    id: 'psp-research',
    platform: 'PSP',
    title: 'PSP 改造・検証アーカイブ',
    summary: 'PSPソフトの未使用要素やゲーム内部データに関する調査をまとめる予定。',
    tags: ['PSP', '調査予定'], status: '準備中',
    sections: [{heading:'今後の予定',body:'取り扱うゲームが決まり次第、タイトルごとに記事を追加します。'}]
  },
  {
    id: 'ps2-research',
    platform: 'PS2',
    title: 'PlayStation 2 改造・検証アーカイブ',
    summary: 'PS2タイトルの内部要素や動作検証について、作品単位で記録する予定。',
    tags: ['PS2', '調査予定'], status: '準備中',
    sections: [{heading:'今後の予定',body:'取り扱うゲームが決まり次第、タイトルごとに記事を追加します。'}]
  }
];
