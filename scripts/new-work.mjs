// 新しい実績(Works)のひな形を作る。使い方: npm run new:work <名前(半角英数字とハイフン)>
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';

const slug = process.argv[2];
if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
  console.error('名前を、半角の英小文字・数字・ハイフンで指定してください。例: npm run new:work my-game');
  process.exit(1);
}

const file = `works/${slug}.md`;
if (existsSync(file)) {
  console.error(`すでに存在します: ${file}`);
  process.exit(1);
}

const thisMonth = new Date().toLocaleDateString('sv-SE').slice(0, 7); // YYYY-MM
mkdirSync('works', { recursive: true });
writeFileSync(
  file,
  `---\ntitle: \ndescription: \ndate: "${thisMonth}"\nperiod: \ntech: []\ntags: []\nlinks: []\nstatus: draft\n---\n\n`,
);
console.log(`作成しました: ${file}`);
