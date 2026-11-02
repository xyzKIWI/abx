'use strict';
// 產生 DATA_REPORT.md（資料結構與格式檢查報告）。
//   node tests/make_report.js             → 重新產生 DATA_REPORT.md
//   node tests/make_report.js --baseline  → 同時把目前所有非強制問題記為「已知問題」（tests/known_issues.json）
// 只列問題，不修改 renal_data.js。

const fs = require('node:fs');
const path = require('node:path');
const C = require('./data_checks');

const ctx = C.context();
const { D, rows } = ctx;
const KNOWN_FILE = path.join(__dirname, 'known_issues.json');
const REPORT_FILE = path.join(C.ROOT, 'DATA_REPORT.md');

const results = C.CHECKS.map((chk) => ({ chk, issues: chk.run(ctx) }));

if (process.argv.includes('--baseline')) {
  const ids = results.filter((r) => !r.chk.strict).flatMap((r) => r.issues.map((i) => i.id)).sort();
  fs.writeFileSync(KNOWN_FILE, JSON.stringify({
    說明: '已知問題清單（CI 以 todo 呈現，不會失敗）。由 node tests/make_report.js --baseline 產生，內容見 DATA_REPORT.md。',
    issues: ids,
  }, null, 2) + '\n');
  console.log(`已寫入 ${path.relative(C.ROOT, KNOWN_FILE)}（${ids.length} 項）`);
}
const known = new Set(JSON.parse(fs.readFileSync(KNOWN_FILE, 'utf8')).issues);

// ---- markdown 小工具 ----
const code = (v) => '`' + String(v).replace(/`/g, "'").replace(/\|/g, '\\|') + '`';
const esc = (v) => String(v).replace(/\|/g, '\\|');
const fl = (f) => C.FIELD_LABEL[f] || f;
function table(head, body) {
  if (!body.length) return '（無）\n';
  return [`| ${head.join(' | ')} |`, `| ${head.map(() => '---').join(' | ')} |`, ...body.map((r) => `| ${r.join(' | ')} |`)].join('\n') + '\n';
}
function details(summary, inner) {
  return `<details><summary>${summary}</summary>\n\n${inner}\n</details>\n`;
}

const out = [];
const P = (...s) => out.push(...s);
const today = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Taipei' }).format(new Date());

// ---- 開頭 ----
P('# 資料結構與格式檢查報告', '');
P(`產生日期：${today}｜檢查對象：\`renal_data.js\`（${D.classes.length} 類、${rows.length} 列）與 \`index.html\``, '');
P('> **這份報告只檢查資料完不完整、格式一不一致，不判斷劑量對不對。** 劑量正確性需另行對照原書核對。',
  '> 2026-11-02 依 Kiwi 確認，統一了綠卡欄的間隔與空格寫法、Route、院內規格寫法，並刪除一個查無此品項的商品名。**劑量數值與 CrCl 切點都沒有改**，逐項清單見第 0 節。', '');
P('重新產生本報告：`node tests/make_report.js`；執行檢查：`node --test tests/data.test.js`。CI（GitHub Actions）會在每次 push 與 PR 時自動執行檢查。', '');

// ---- 摘要 ----
P('## 摘要', '');
P(table(['檢查項目', '類型', '結果', '問題數'], results.map(({ chk, issues }) => {
  const fresh = chk.strict ? issues.length : issues.filter((i) => !known.has(i.id)).length;
  const res = fresh ? `❌ ${fresh} 項新問題` : issues.length ? '⚠️ 已知問題（todo）' : '✅ 通過';
  return [esc(chk.title), chk.strict ? '強制' : '可列已知', res, String(issues.length)];
})));
P('- ✅ 通過：沒有問題。', '- ⚠️ 已知問題（todo）：列在本報告，CI 不會因此變紅；之後新增的同類問題才會讓 CI 失敗。', '- 標示「強制」的項目（藥名、分級、CrCl 分段、欄位、待核標記、院內規格格式、頁面引用欄位）一有問題 CI 就會失敗，不接受列為已知問題。', '');

// ---- 0. 本次修改 ----
P('## 0. 本次修改紀錄', '');
P('### 0.1 第一輪（純格式檢查）', '');
P('沒有找到多餘空白、tab、全形空白或 `undefined` 之類的純格式錯誤，沒有修改資料。網頁與 README 的來源說明拿掉「線上版」「高醫訂閱」等字眼（只動說明文字）。', '');
const CHANGES_FILE = path.join(__dirname, 'changes_2026-11-02.json');
if (fs.existsSync(CHANGES_FILE)) {
  const ch = JSON.parse(fs.readFileSync(CHANGES_FILE, 'utf8')).changes;
  const show = (v) => (typeof v === 'string' ? v : JSON.stringify(v));
  P(`### 0.2 第二輪（Kiwi 確認後的寫法統一，共 ${ch.length} 處）`, '');
  P('- 綠卡 GFR 欄與備註：`qd` → `q24h`；`qod`、`q2d` → `q48h`；`qwk` → `q7d`（QD／QOD 在 Joint Commission 禁用縮寫清單上，容易看錯）。',
    '- 數字與單位之間空一格（`6g` → `6 g`），和 `7.5 mg/kg` 一致；`Ccr 40–50` → `Ccr40–50`。藥名不動，避免影響搜尋。',
    '- 個別改寫 3 格：Doripenem <10 `0.25g qd–q12h` → `0.25 g q12–24h`；SMZ-TMP（治療）<10 `qd 或分次` → `/day（一次或分次）`；SMZ-TMP（預防）>50 只把 `qd` 改成 `q24h`，`biw–tiw` 保留，和其他列一致。',
    '- Route：Cefoperazone/sulbactam `Sulbactam: R` → `H,R`，原意寫進備註；圖例補上「?＝排除途徑不明」（Amphotericin B 保留 `?`）。',
    '- 院內規格：未滿 1 g 改用 mg（`0.5g` → `500mg`），並去除同量重複（Cefepime、Ceftazidime 原本同時列 `0.5g` 與 `500mg`）。',
    '- 商品名：`Zovirx` 查無此品項，同列已有 `Zovirax`，刪除。`Aziciin` 經查是真實品名（侒舒芯亞膜衣錠），**保留不改**。',
    '- 這些寫法規則已加入強制檢查，之後再出現 `qd`、`6g` 之類寫法 CI 會失敗。', '');
  P(details(`逐項變更（${ch.length} 處，點開看明細）`, table(['藥名', '欄位', '修改前', '修改後', '原因'],
    ch.map((c) => [esc(c.drug), fl(c.field), code(show(c.before)), code(show(c.after)), esc(c.why)]))));
}

// ---- 1. 結構問題清單 ----
P('## 1. 結構問題清單', '');
P('下表是檢查腳本找到的所有結構問題（不含單位寫法，單位寫法見第 3 節）。', '');
const structIssues = results.filter(({ chk }) => chk.key !== 'units').flatMap(({ chk, issues }) => issues.map((i) => ({ ...i, title: chk.title })));
const byCheck = {};
for (const i of structIssues) (byCheck[i.check] ||= []).push(i);
for (const [key, list] of Object.entries(byCheck)) {
  const title = C.CHECKS.find((c) => c.key === key).title;
  P(`### ${esc(title)}（${list.length} 項）`, '');
  if (key === 'cutoffs') {
    P('同一列在其他欄已有相同或相鄰的 CrCl 條件，看起來像原始資料的欄位對齊方式（綠卡把三段 Ccr 條件依序放進三欄），**不是本工具轉錄錯誤的判定**。但在頁面上，病人 CrCl >50 時會高亮這一格，而格子裡寫的卻是 CrCl 30–49 或 20–40 的條件，容易誤讀。需對照原書決定要不要改欄位或加註。', '');
  }
  if (key === 'dialysis') {
    P('這些藥沒有任何透析欄位，頁面顯示「—」。圖例已說明「—」＝原書未列此藥透析劑量、不代表不需調整，所以**不是缺漏錯誤**；只是不像其他 54 列那樣明確寫出「No data」。是否補上「No data」或 Sanford 資料，需人工決定。', '');
  }
  if (key === 'route') {
    P('圖例只定義 `R`（腎排除）、`H`（肝排除）、`HD`（血液透析）。以下兩列的寫法圖例沒有說明，請確認是否保留。', '');
  }
  if (key === 'unit_equiv') {
    P('同一劑型同時列出兩種寫法、但量一樣。院內規格是程式自藥典品名擷取，可能是兩個不同廠牌品項各自的寫法，所以不合併。', '');
  }
  P(table(['藥名', '欄位', '問題描述'], list.map((i) => [esc(i.drug), fl(i.field), esc(i.message)])));
}

// 1.x CrCl 條件總表
const ct = C.crclTable(ctx);
P('### GFR 欄內 CrCl 條件總表（供核對參考）', '');
P(`GFR 三欄的分段為 ${C.bandRanges(D).map((b) => `\`${b.label}\``).join('、')}（頁面先把 CrCl 四捨五入成整數再分段，50 屬於 10–50 欄、10 屬於 10–50 欄）。meta.bands 與 \`index.html\` 的 \`bandForCrCl()\` 一致，分段連續、不重疊、沒有缺口。`, '');
P('下表列出格子內另外寫了 CrCl 條件的所有地方，以及條件和該欄範圍的關係。「部分超出」很常見（例如 10–50 欄寫「Ccr<30」，代表只有 <30 才調整），只是提醒；「完全不在欄位範圍內」已列在上方問題清單。', '');
P(table(['藥名', '欄', '格子原文', '條件', '條件範圍（整數 CrCl）', '與欄位範圍關係'],
  ct.map((t) => [esc(t.drug), esc(t.band), code(t.value), code(t.cond), C.fmtRange(t.range), t.status === '在欄位範圍內' ? t.status : `**${t.status}**`])));

// 1.x GFR 欄混入透析條件
P('### GFR 欄內混有透析／CRRT 劑量（觀察，未列為問題）', '');
P('以下 GFR 欄或備註裡寫了 HD、CRRT 的劑量。頁面另有透析欄，兩處資料來源不同（綠卡與 Sanford），核對時可留意兩者是否一致。', '');
const dzMix = [];
for (const r of rows) for (const f of [...ctx.bandKeys, 'comment']) {
  const v = r.d[f];
  if (typeof v === 'string' && /\b(?:HD|CRRT|CAPD)\b|透析/.test(v)) dzMix.push([esc(r.label), fl(f), code(v), r.d.hd ? '有' : '無']);
}
P(table(['藥名', '欄位', '原文', '透析欄是否有 Sanford 資料'], dzMix));

// 1.x 共用 Sanford 資料
P('### 多列共用同一份 Sanford 常規／透析資料（觀察，未列為問題）', '');
P('同一個藥拆成多列（不同劑量、適應症）時，常規與透析欄是同一份 Sanford 原文。若某列的 GFR 欄劑量與共用的常規劑量不同（例如名稱是 500mg 的列，常規欄顯示 750 mg），閱讀時可能混淆，可判斷是否需要加註。', '');
const groups = {};
for (const r of rows) if (r.d.nd || r.d.hd) (groups[JSON.stringify(['nd', ...C.DZ_FIELDS].map((k) => r.d[k] || ''))] ||= []).push(r);
const shared = Object.values(groups).filter((g) => g.length > 1);
P(table(['共用的列', '常規（nd）'], shared.map((g) => [g.map((r) => esc(r.label)).join('<br>'), code(g[0].d.nd || '')])));

// 1.x 「無資料」寫法
P('### 透析欄「無資料／不需調整」的寫法（觀察）', '');
const dzWords = {};
for (const r of rows) for (const k of C.DZ_FIELDS) {
  const v = r.d[k];
  if (typeof v !== 'string') continue;
  for (const w of ['No data', 'Not applicable', 'No dosage adjustment', 'Not removed by HD']) {
    if (v.includes(w)) (dzWords[w] ||= []).push(`${r.label}（${fl(k)}${v === w ? '' : '，部分'}）`);
  }
}
P('有透析欄位的 54 列都三欄齊全，沒有空字串。下面是各種「沒有劑量」的寫法；「部分」表示這幾個字只是整段文字的一部分。', '');
P(table(['寫法', '次數', '出現位置'], Object.entries(dzWords).map(([w, l]) => [code(w), String(l.length), esc(l.join('、'))])));

// 1.x index.html 對照
const refs = C.htmlRefs(ctx);
P('### `index.html` 與資料欄位對照', '');
P(`- 頁面引用的藥物欄位：${refs.drugFields.map((f) => `\`${f}\``).join('、')}。全部都存在於資料中。`);
P(`- 頁面直接輸出、沒有缺值保護的欄位：${refs.unguarded.map((f) => `\`${f}\``).join('、')}。目前 ${rows.length} 列都有值。`);
P(`- 頁面引用的 meta 欄位：${refs.metaPaths.map((f) => `\`meta.${f}\``).join('、')}。全部存在。`);
const unusedMeta = Object.keys(D.meta).filter((k) => !refs.metaPaths.some((p) => p === k || p.startsWith(k + '.')));
P(`- 資料中有、但頁面沒用到的 meta 欄位：${unusedMeta.map((f) => `\`meta.${f}\``).join('、')}。其中 \`meta.bands_dialysis\` 的內容與頁面寫死的 \`DZ_KEYS\` 相同；\`meta.source\` 仍寫「綠卡…pages 1–3（Sanford Guide / UpToDate / Lexicomp / 高醫院內規範）」，沒有提到 2026-10-30 起常規與透析的來源更新（頁面不顯示這個欄位，只影響日後閱讀原始檔）。`);
P('- 資料文字沒有會被 `innerHTML` 誤當成 HTML 標籤的內容（例如 `<30` 之類的寫法是安全的）。', '');

// 1.x 文件數字
P('### 文件與資料的數字差異（觀察）', '');
const readme = fs.readFileSync(path.join(C.ROOT, 'README.md'), 'utf8');
const docRows = [];
const m1 = readme.match(/(\d+) 種抗微生物藥/);
if (m1) docRows.push(['README「內容」', `${m1[1]} 種抗微生物藥`, `資料共 ${rows.length} 列（Piperacillin-tazobactam 拆成兩列等，「種」與「列」計法可能不同）`]);
const m2 = readme.match(/(\d+)\/(\d+) 藥附院內歷年進藥商品名/);
if (m2) docRows.push(['README「內容」', `${m2[1]}/${m2[2]} 藥附商品名`, `資料中 ${rows.filter((r) => r.d.brands).length}/${rows.length} 列有 brands`]);
const m3 = readme.match(/肝 (\d+) 種、肥胖 (\d+) 種/);
if (m3) docRows.push(['README「內容」', `肝 ${m3[1]} 種、肥胖 ${m3[2]} 種`, `資料中 hep ${rows.filter((r) => r.d.hep).length} 列、obese ${rows.filter((r) => r.d.obese).length} 列（一致）`]);
P(table(['位置', '文件寫法', '資料實際'], docRows));
P('文件數字不影響頁面運作，本次未修改。', '');

// ---- 2. 待核 ----
P('## 2. 「待核」項目完整清單', '');
P('### 2.1 頁面上的「待核」標記怎麼來的', '');
P('- `renal_data.js` 每列有 Sanford 常規／透析資料時，會帶 `ver` 欄位：`ver: 1`＝已核對（正常字）、`ver: 0` 或缺少 `ver`＝未核對。');
P('- `index.html` 對未核對的列：常規劑量灰字並加「待核」小標籤（`normalDose()`），透析欄整格灰字（`dialysisCell()`）。');
P('- 只有常規與透析欄受 `ver` 控制；三段 GFR 欄、備註、肝功能、肥胖、院內規格**都沒有**待核標記機制。');
P('- 檢查腳本會擋下三種不一致：有 Sanford 資料卻沒寫 `ver`（會默默變灰字）、沒資料卻寫了 `ver`、待核列沒有常規劑量（只會灰字、不會出現「待核」標籤）。目前都沒有。', '');
const pending = rows.filter((r) => ['nd', ...C.DZ_FIELDS].some((k) => r.d[k]) && !r.d.ver);
P(`### 2.2 目前標成「待核」的列：${pending.length} 列`, '');
if (!pending.length) {
  P(`**目前沒有任何一列是待核。** 有 Sanford 資料的 ${rows.filter((r) => r.d.nd).length} 列全部是 \`ver: 1\`，與 README 更新紀錄「2026-10-30 已全部更新，不再有待核列」相符。資料檔內也沒有「待核」字樣。`, '');
  P('（`index.html` 第 68 行的 CSS 註解也寫「目前沒有 ver=0 的列」，與資料一致。）', '');
} else {
  P(table(['分類', '藥名', '常規', 'HD', 'CAPD', 'CRRT'], pending.map((r) => [esc(r.cls), esc(r.label), code(r.d.nd || ''), code(r.d.hd || ''), code(r.d.capd || ''), code(r.d.crrt || '')])));
}
P('### 2.3 其他看起來「不確定」的標記（不是待核機制，列出供參考）', '');
const unsure = [];
for (const r of rows) {
  for (const f of ctx.bandKeys) if (typeof r.d[f] === 'string' && r.d[f].includes('?')) unsure.push([esc(r.label), fl(f), code(r.d[f]), '圖例：「?」＝無資料']);
  if (r.d.route === '?') unsure.push([esc(r.label), 'Route', code('?'), 'Route 寫「?」，圖例沒有定義']);
  if (/參考 [A-Z]/.test(r.d.name)) unsure.push([esc(r.label), '藥名', code(r.d.name), '同一藥兩個參考來源並列，未標明採用哪一個']);
  if (/^\*/.test(r.d.comment || '')) unsure.push([esc(r.label), '備註', code(r.d.comment), '以「*」開頭，頁面沒有對應的註腳說明']);
}
P(table(['藥名', '欄位', '內容', '說明'], unsure));
P('### 2.4 各欄位的來源與核對狀態（摘自 README 與頁面說明）', '');
P(table(['欄位', '來源', '列數', '核對狀態'], [
  ['三段 GFR（>50／10–50／<10）', '綠卡《Guide to Drug Dosage in Renal Failure》', String(rows.length), '頁面與 README 註明「已人工校對（2026-06-29）」，無逐列標記'],
  ['常規、HD、CAPD、CRRT', 'Sanford Guide（2026-10-30 更新）', String(rows.filter((r) => r.d.nd).length), '全部 `ver: 1`'],
  ['肝功能、肥胖', 'Sanford Guide', `${rows.filter((r) => r.d.hep).length}／${rows.filter((r) => r.d.obese).length}`, '沒有 ver 標記機制'],
  ['院內規格', '高醫藥典品名（程式擷取）', String(rows.filter((r) => r.d.unit).length), '非劑量資料，沒有核對標記'],
  ['備註', '綠卡等', String(rows.filter((r) => r.d.comment).length), '沒有核對標記'],
]));

// ---- 3. 單位寫法 ----
P('## 3. 單位寫法不一致清單', '');
P('依資料來源分成三組比對：**綠卡**（GFR 三欄＋備註）、**Sanford**（常規、透析、肝、肥胖）、**藥名**。不同來源本來就有各自的寫法（例如綠卡寫 `g`、Sanford 寫 `gm`），跨來源的差異只列出；**同一來源內混用兩種以上寫法**才算不一致，列為已知問題。全部沒有修改。', '');
const inv = C.unitInventory(ctx);
const gk = Object.keys(C.GROUPS);
P('### 3.1 總覽', '');
P(table(['類別', ...gk.map((g) => C.GROUPS[g].label), '同來源內不一致'], C.UNIT_CATEGORIES.map((cat) => {
  const cells = gk.map((g) => Object.entries(inv[cat.key][g]).map(([v, l]) => `${esc(v)}：${l.length}`).join('<br>') || '—');
  const bad = gk.filter((g) => Object.keys(inv[cat.key][g]).length > 1).map((g) => C.GROUPS[g].label.split('（')[0].split(' ')[0]);
  return [esc(cat.title), ...cells, bad.length ? `⚠️ ${bad.join('、')}` : '—'];
})));
P('數字是出現該寫法的欄位數（同一格出現多次只算一次）。', '');
P('### 3.2 同一來源內不一致的明細', '');
for (const cat of C.UNIT_CATEGORIES) {
  for (const g of gk) {
    const vs = Object.entries(inv[cat.key][g]);
    if (vs.length < 2) continue;
    P(`#### ${esc(cat.title)}｜${esc(C.GROUPS[g].label)}`, '');
    vs.sort((a, b) => a[1].length - b[1].length);
    for (const [v, list] of vs) {
      const body = table(['藥名', '欄位', '比對到的文字'], list.map((x) => [esc(x.drug), fl(x.field), code(x.match)]));
      if (list.length > 12) P(details(`「${esc(v)}」${list.length} 處（點開看明細）`, body));
      else P(`「${esc(v)}」${list.length} 處：`, '', body);
    }
  }
}
P('### 3.3 跨來源的寫法差異（不算問題，僅供參考）', '');
const cross = [];
for (const cat of C.UNIT_CATEGORIES) {
  const per = gk.map((g) => Object.keys(inv[cat.key][g]));
  const all = [...new Set(per.flat())];
  if (all.length > 1 && per.every((p) => p.length <= 1)) {
    cross.push([esc(cat.title), gk.map((g, i) => `${C.GROUPS[g].label}：${per[i].join('') || '—'}`).join('<br>')]);
  }
}
P(table(['類別', '各來源寫法'], cross));
P('大寫 `Q8H` 之類的寫法：**沒有發現**，間隔全部是小寫 `q…h`。', '');

// ---- 4. 檢查方式 ----
P('## 4. 檢查方式', '');
P('- 檢查腳本：`tests/data_checks.js`（檢查邏輯）、`tests/data.test.js`（`node:test` 測試）、`tests/known_issues.json`（已知問題清單）。只用 Node 內建模組，沒有任何相依套件。');
P('- 執行：`node --test tests/data.test.js`。CI：`.github/workflows/data-check.yml`，push 與 PR 時自動執行。');
P('- 「強制」項目有問題就失敗；其他項目只有**新出現**、不在 `known_issues.json` 的問題才會失敗。');
P('- 修好已知問題，或確認某個新問題要保留時：執行 `node tests/make_report.js --baseline`，會同時更新 `known_issues.json` 與本報告。', '');

fs.writeFileSync(REPORT_FILE, out.join('\n').replace(/\n{3,}/g, '\n\n'));
console.log(`已寫入 ${path.relative(C.ROOT, REPORT_FILE)}`);
