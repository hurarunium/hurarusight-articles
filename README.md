# hurarusight-articles

huraru.com の記事(Markdown と画像)を置くリポジトリです。サイトのコードは [hurarusight](https://github.com/huraru7/hurarusight) にあります。

## 記事の書き方

```bash
npm run new <記事名>   # ひな形を作る(記事名は半角の英小文字・数字・ハイフン)
npm run check          # frontmatter を検証する
```

- 記事は `articles/<記事名>.md` に置きます。**ファイル名がそのまま URL** になります(`/articles/<記事名>/`)。公開後に変えると URL が変わるので、最初に決めます。
- 画像は `images/<記事名>/` に置き、記事からは `/article-images/<記事名>/<ファイル名>` で参照します。

```yaml
---
title: 記事のタイトル
description: 検索結果やSNSに出る説明文(120字前後まで)
date: "2026-10-08"
status: draft          # draft / unlisted / published
tags: [サイト制作]
---
```

| status | 意味 |
|---|---|
| draft | 下書き。サイトの開発サーバーでは見えるが、公開サイトには出ない |
| unlisted | 一覧とサイトマップに出さず、検索にも載せない。URL を知っていれば読める |
| published | 公開 |

**注意**: このリポジトリは public なので、`draft` の記事も GitHub 上では誰でも読めます。公開前に隠したい内容は push しないでください。

## 実績(Works)の書き方

```bash
npm run new:work <名前>   # ひな形を作る(名前は半角の英小文字・数字・ハイフン)
```

- 実績は `works/<名前>.md` に置きます。**ファイル名がそのまま URL** になります(`/works/<名前>/`)。
- 本文は記事と同じように自由に書けます(空でもかまいません)。
- `period` は書いた文字をそのまま出します。一覧の並び順は `date` で決まります。
- 画像は省略できます。使うときは `images/works/<名前>/` に置き、`image` に `/article-images/works/<名前>/<ファイル名>` と書きます。一覧のカードと詳細ページの上に出ます(無い実績は文字だけで出ます)。本文には、記事と同じ書き方で画像を入れられます。

```yaml
---
title: 実績の名前
description: 一言の説明
date: "2026-10"        # いつの実績か(YYYY-MM または YYYY-MM-DD)。並び順に使う
period: 3ヶ月           # 制作期間(省略可)
tech: [Astro, TypeScript]   # 使った技術(省略可)
tags: [Web]            # 種類のタグ(省略可。記事のタグとは別に扱う)
links:                 # あるものだけ書く(省略可)
  - { label: GitHub, url: "https://github.com/..." }
  - { label: 関連記事, url: /articles/make-profile-site/ }
image: /article-images/works/my-game/cover.png   # 一覧と詳細に出す画像(省略可)
status: draft          # draft / unlisted / published(記事と同じ意味)
---
```

## About(自己紹介)の書き方

- 自己紹介は、リポジトリ直下の `about.md` の1つです(`/about/` に出ます)。無いときは、サイトに About のページとメニューが出ません。
- 本文は、見出し(`##`)ごとに自由に書けます。名前・a.k.a.・リンクは、サイトの `content.ts` から出すので、ここには書きません。
- 写真と SKILLS のアイコンは `images/about/` に置きます。`status: draft` の間は、公開サイトに出ません。

```yaml
---
role: 肩書き(省略可)
photo: /article-images/about/photo.webp   # 写真(省略可)
skills:                                    # 使える言語・ツール(省略可)
  - { name: Unity, icon: /article-images/about/skills/unity.svg, note: ゲームエンジン }   # note は省略可
status: draft          # draft / published
---
```

## 書きながらサイトで確認する

サイトのリポジトリと同じ階層に、このリポジトリを置きます。

```
hurarusight\
  hurarusight-system\     ← サイトのコード(npm run dev をここで起動)
  hurarusight-articles\   ← このリポジトリ
```

サイト側で `npm run dev` を起動しておくと、このリポジトリの記事を編集するたびに、ブラウザの表示が更新されます。置き場所を変えたいときは、環境変数 `ARTICLES_DIR` にこのリポジトリのパスを指定します。

## 公開のしかた

`main` に push すると、GitHub Actions が検証(`npm run check`)をして、Cloudflare Pages の Deploy Hook を叩きます。1〜3分ほどで huraru.com に反映されます。

初回だけ、GitHub の Secrets に `CLOUDFLARE_DEPLOY_HOOK_URL`(Cloudflare Pages で発行した Deploy Hook の URL)の登録が必要です。
