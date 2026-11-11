// 記事と実績(Works)の frontmatter を検証する。使い方: npm run check
import { existsSync, readdirSync, readFileSync } from 'node:fs';

const statuses = ['draft', 'unlisted', 'published'];
const errors = [];

// フォルダ内の .md を1つずつ検証する。datePattern は date に許す形式
function checkFolder(folder, datePattern, dateFormat) {
  const files = readdirSync(folder).filter((f) => f.endsWith('.md'));
  for (const f of files) {
    const path = `${folder}/${f}`;
    const name = f.replace(/\.md$/, '');
    if (!/^[a-z0-9-]+$/.test(name)) errors.push(`${path}: ファイル名は半角の英小文字・数字・ハイフンにしてください`);

    const fm = readFileSync(path, 'utf-8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1];
    if (fm === undefined) {
      errors.push(`${path}: 先頭に frontmatter(--- で囲んだ部分)がありません`);
      continue;
    }
    const get = (key) => new RegExp(`^${key}:[ \t]*(.*)$`, 'm').exec(fm)?.[1].trim();

    if (!get('title')) errors.push(`${path}: title が空です`);
    if (!get('description')) errors.push(`${path}: description が空です`);
    if (!datePattern.test(get('date') ?? '')) errors.push(`${path}: date は ${dateFormat} の形式にしてください`);
    const status = get('status');
    if (status !== undefined && !statuses.includes(status)) errors.push(`${path}: status は ${statuses.join(' / ')} のどれかにしてください`);
  }
  return files.length;
}

const articleCount = checkFolder('articles', /^"?\d{4}-\d{2}-\d{2}"?$/, 'YYYY-MM-DD');
if (articleCount === 0) errors.push('articles/ に記事がありません');
// Works は0件でもよい(フォルダが無ければ検証しない)
const workCount = existsSync('works') ? checkFolder('works', /^"?\d{4}-\d{2}(-\d{2})?"?$/, 'YYYY-MM または YYYY-MM-DD') : 0;

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`OK: ${articleCount}本の記事と${workCount}件の実績を確認しました`);
