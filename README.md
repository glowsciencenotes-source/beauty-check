# 🍎 30秒肌診断

Apple風デザインの肌診断Webアプリです。

## 機能

- 10問の肌診断
- 30秒で診断完了
- 5種類の肌タイプ判定
- 商品レコメンド
- Amazon・楽天・Yahooアフィリエイト対応
- GitHub Pages対応
- レスポンシブデザイン

---

## フォルダ構成

```
30sec-skin-check/
│
├── index.html
├── README.md
├── favicon.svg
├── robots.txt
├── sitemap.xml
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── data/
│   └── products.json
│
└── images/
    ├── logo.svg
    ├── placeholder.webp
    └── products/
```

---

## GitHub Pages公開

1.

GitHubへアップロード

2.

Settings

↓

Pages

3.

Source

```
Deploy from a branch
```

4.

Branch

```
main
```

5.

Folder

```
/(root)
```

6.

Save

数十秒後

```
https://あなたのID.github.io/30sec-skin-check/
```

で公開されます。

---

## 商品追加

```
data/products.json
```

へ商品を追加してください。

例

```json
{
 "brand":"キュレル",
 "name":"潤浸保湿フェイスクリーム",
 "skin":["dry","sensitive"]
}
```

---

## 対応肌タイプ

- Dry
- Oily
- Combination
- Sensitive
- Normal

---

## ライセンス

MIT License