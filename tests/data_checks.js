'use strict';
// renal_data.js / index.html 的資料結構與格式檢查（只看結構與寫法，不判斷劑量對錯）。
// 由 tests/data.test.js（CI 用）與 tests/make_report.js（產生 DATA_REPORT.md）共用。
// 只用 Node 內建模組，不需安裝任何套件。

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const DATA_FILE = path.join(ROOT, 'renal_data.js');
const HTML_FILE = path.join(ROOT, 'index.html');

// ---- 欄位定義 ----
const DZ_FIELDS = ['hd', 'capd', 'crrt'];
const SANFORD_FIELDS = ['nd', 'hd', 'capd', 'crrt', 'hep', 'obese'];
const REQUIRED_FIELDS = ['name', 'route', 'g50', 'g1050', 'g10', 'comment'];
const OPTIONAL_FIELDS = ['brands', 'nd', 'hd', 'capd', 'crrt', 'ver', 'unit', 'hep', 'obese'];
const KNOWN_FIELDS = new Set([...REQUIRED_FIELDS, ...OPTIONAL_FIELDS]);
const TEXT_FIELDS = ['name', 'route', 'g50', 'g1050', 'g10', 'comment', 'nd', 'hd', 'capd', 'crrt', 'hep', 'obese'];
const UNIT_FORMS = ['vial', 'amp', 'tab', 'cap', 'bag', 'bot'];
const UNIT_RE = /^(\d+(?:\.\d+)?)(mg|g|MU)(?:\/(\d+(?:\.\d+)?)mL)?$/;
// index.html 的圖例定義 R、H、HD 三種 route 代號，以及「?」＝排除途徑不明
const ROUTE_RE = /^(?:\?|(?:R|H|HD)(?:,(?:R|H|HD))*)$/;

const FIELD_LABEL = {
  name: '藥名', route: 'Route', g50: 'GFR >50', g1050: 'GFR 10–50', g10: 'GFR <10',
  comment: '備註', brands: '商品名', nd: '常規', hd: 'HD', capd: 'CAPD', crrt: 'CRRT',
  ver: 'ver（核對狀態）', unit: '院內規格', hep: '肝', obese: '肥胖',
};
// 單位寫法比對時，依資料來源分組（不同來源本來就有各自的寫法，跨組差異只列出、不算問題）
const GROUPS = {
  gfr: { label: '綠卡 GFR 欄＋備註', fields: ['g50', 'g1050', 'g10', 'comment'] },
  sanford: { label: 'Sanford 欄（常規／透析／肝／肥胖）', fields: ['nd', 'hd', 'capd', 'crrt', 'hep', 'obese'] },
  name: { label: '藥名', fields: ['name'] },
};

// ---- 載入 ----
function loadData() {
  const ctx = { window: {} };
  vm.runInNewContext(fs.readFileSync(DATA_FILE, 'utf8'), ctx, { filename: 'renal_data.js' });
  return ctx.window.RENAL_DATA;
}
function loadHtml() {
  return fs.readFileSync(HTML_FILE, 'utf8');
}
function inlineScript(html) {
  return [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join('\n');
}
function context() {
  const D = loadData();
  const html = loadHtml();
  const rows = [];
  (D && Array.isArray(D.classes) ? D.classes : []).forEach((cls, ci) => {
    (Array.isArray(cls.drugs) ? cls.drugs : []).forEach((d, di) => {
      rows.push({ cls: cls.name, ci, di, d, label: rowLabel(d, ci, di) });
    });
  });
  const bandKeys = D && D.meta && Array.isArray(D.meta.bands) ? D.meta.bands.map((b) => b.key) : [];
  return { D, html, script: inlineScript(html), rows, bandKeys };
}
function rowLabel(d, ci, di) {
  return d && typeof d.name === 'string' && d.name.trim() ? d.name : `（第 ${ci + 1} 類第 ${di + 1} 列，無藥名）`;
}
function issue(check, drug, field, message, extra = '', value) {
  return { id: [check, drug, field, extra].join('|'), check, drug, field, message, value };
}

// ---- CrCl 區間（以整數 CrCl 表示；index.html 會先 Math.round 再分段）----
// 回傳 {lo, hi}，hi 可為 Infinity
function parseCond(op, a, b) {
  if (b !== undefined) return { lo: +a, hi: +b };
  const n = +a;
  switch (op) {
    case '<': return { lo: 0, hi: n - 1 };
    case '≤': return { lo: 0, hi: n };
    case '>': return { lo: n + 1, hi: Infinity };
    case '≥': return { lo: n, hi: Infinity };
    default: return null;
  }
}
function parseBandLabel(label) {
  const s = String(label).trim();
  let m = s.match(/^([<>≤≥])\s*(\d+)$/);
  if (m) return parseCond(m[1], m[2]);
  m = s.match(/^(\d+)\s*[–-]\s*(\d+)$/);
  if (m) return parseCond(null, m[1], m[2]);
  return null;
}
function fmtRange(r) {
  if (!r) return '（無法解析）';
  if (r.hi === Infinity) return `≥${r.lo}`;
  if (r.lo === 0) return `≤${r.hi}`;
  return `${r.lo}–${r.hi}`;
}
function intersects(a, b) {
  return Math.max(a.lo, b.lo) <= Math.min(a.hi, b.hi);
}
function within(a, b) {
  return a.lo >= b.lo && a.hi <= b.hi;
}
// GFR 欄內的 CrCl 條件，例如「Ccr<30：q12h」「Ccr 40–50：…；20–40：…；<20：…」
const SEG_COND_RE = /^\s*(Ccr\s*)?(?:([<>≤≥])\s*(\d+)|(\d+)\s*[–-]\s*(\d+))\s*(?=或|：|:)/;
function cellConditions(text) {
  if (typeof text !== 'string') return [];
  const out = [];
  for (const seg of text.split(/[／；]/)) {
    const m = seg.match(SEG_COND_RE);
    if (!m) continue;
    const r = m[4] !== undefined ? parseCond(null, m[4], m[5]) : parseCond(m[2], m[3]);
    out.push({ text: m[0].trim(), range: r });
  }
  return out;
}
function countCcrTokens(text) {
  return typeof text === 'string' ? (text.match(/Ccr/g) || []).length : 0;
}
function bandRanges(D) {
  return (D.meta.bands || []).map((b) => ({ key: b.key, label: b.label, range: parseBandLabel(b.label) }));
}
function htmlBandFn(script) {
  const m = script.match(/function\s+bandForCrCl\s*\(\s*c\s*\)\s*\{[^}]*\}/);
  if (!m) return null;
  return vm.runInNewContext(`(${m[0]})`);
}
function crclTable(ctx) {
  const bands = bandRanges(ctx.D);
  const out = [];
  for (const r of ctx.rows) {
    for (const b of bands) {
      const v = r.d[b.key];
      for (const c of cellConditions(v)) {
        let status = '在欄位範圍內';
        if (!c.range || !b.range) status = '無法解析';
        else if (!intersects(c.range, b.range)) status = '完全不在欄位範圍內';
        else if (!within(c.range, b.range)) status = '部分超出欄位範圍';
        out.push({ drug: r.label, field: b.key, band: b.label, value: v, cond: c.text, range: c.range, bandRange: b.range, status });
      }
    }
  }
  return out;
}

// ---- 單位寫法 ----
// 每一類列出幾種寫法；同一來源分組內出現兩種以上寫法，就列為「不一致」
const UNIT_CATEGORIES = [
  { key: 'mass_g', title: '公克寫法（g／gm）', variants: [
    ['g', /\d+(?:\.\d+)?\s*g(?![a-zA-Z])/g], ['gm', /\d+(?:\.\d+)?\s*gm(?![a-zA-Z])/g]] },
  { key: 'num_unit_space', title: '數字與單位之間的空格', variants: [
    ['緊接（如 6g、160mg）', /\d+(?:\.\d+)?(?:mg|gm|g|MU)(?![a-zA-Z])/g], ['有空格（如 6 g、160 mg）', /\d+(?:\.\d+)? (?:mg|gm|g|MU)(?![a-zA-Z])/g]] },
  { key: 'mega_unit', title: '百萬單位寫法（MU／million U）', variants: [
    ['MU', /\d+(?:\.\d+)?\s*MU(?![a-zA-Z])/g], ['million U', /million U(?![a-zA-Z])/g]] },
  { key: 'range_dash', title: '數字範圍連接號（–／-）', variants: [
    ['en dash（–）', /\d\s*–\s*\d/g], ['hyphen（-）', /\d\s*-\s*\d/g]] },
  { key: 'q_case', title: '給藥間隔大小寫（q8h／Q8H）', variants: [
    ['小寫 q…h', /\bq\d+(?:[–-]\d+)?h\b/g], ['大寫或混用 Q…H', /\b(?:Q\d+(?:[–-]\d+)?[hH]|q\d+(?:[–-]\d+)?H)\b/g]] },
  { key: 'once_daily', title: '每日一次寫法', variants: [
    ['qd', /\bqd\b/g], ['q24h', /\bq24h\b/g], ['once daily', /\bonce daily\b/gi], ['daily（單獨）', /(?<!once )\bdaily\b/gi], ['每日／每天', /每日|每天/g]] },
  { key: 'per_day', title: '每日總量寫法（/day／每日）', variants: [
    ['/day', /\/day\b/g], ['每日（總量）', /每日總?量|日劑量/g]] },
  { key: 'every_other_day', title: '隔日一次寫法', variants: [
    ['qod', /\bqod\b/g], ['q2d', /\bq2d\b/g], ['q48h', /\bq48h\b/g]] },
  { key: 'times_per_week', title: '每週數次寫法', variants: [
    ['biw／tiw', /\b[bt]iw\b/g], ['Nx/wk', /\dx\/wk\b/g], ['Nx/week', /\dx\/week\b/g]] },
  { key: 'weekly', title: '每週一次寫法', variants: [
    ['qwk', /\bqwk\b/g], ['q7d', /\bq7d\b/g], ['once weekly', /\bonce weekly\b/gi]] },
  { key: 'times_sign', title: '乘號／次數（x／×）', variants: [
    ['x（如 x1、3x/wk）', /\bx\s?\d|\dx\b/g], ['×（如 ×1）', /×/g]] },
  { key: 'ml_case', title: '毫升大小寫（mL／ml）', variants: [
    ['mL', /\bmL\b/g], ['ml', /\bml\b/g]] },
  { key: 'crcl_abbr', title: '腎功能縮寫（Ccr／CrCl／eGFR）', variants: [
    ['Ccr', /Ccr(?![a-zA-Z])/g], ['CrCl', /CrCl(?![a-zA-Z])/g], ['eGFR', /\beGFR\b/g], ['GFR', /(?<![a-zA-Z])GFR\b/g]] },
  { key: 'ccr_space', title: 'Ccr 與數值之間的空格', variants: [
    ['緊接（如 Ccr<30、Ccr30–49）', /Ccr[<>≤≥]?\d+/g], ['有空格（如 Ccr 40–50）', /Ccr\s+[<>≤≥]?\d+/g]] },
  { key: 'segment_sep', title: '同一格多段條件的分隔符（／；、）', variants: [
    ['／', /／/g], ['；', /；/g], ['、', /、/g]] },
  { key: 'colon', title: '冒號全形／半形', variants: [
    ['全形「：」', /：/g], ['半形「:」', /:(?!\d)/g]] },
  { key: 'or_word', title: '「或」的寫法', variants: [
    ['或', /或/g], ['OR／or', /\b(?:OR|or)\b/g]] },
  { key: 'after_hd', title: '透析後給藥寫法', variants: [
    ['AD', /\bAD\b/g], ['after HD／after each dialysis', /\bafter (?:HD|each dialysis)\b/gi], ['POST-HD', /\bpost[- ]?HD\b/gi], ['透析後', /透析後/g]] },
  { key: 'route_order', title: '給藥途徑順序（IV/po／po/IV）', variants: [
    ['IV/po', /\bIV\/po\b/g], ['po/IV', /\bpo\/IV\b/g]] },
  { key: 'po_case', title: '口服大小寫（po／PO）', variants: [
    ['po', /\bpo\b/g], ['PO', /\bPO\b/g]] },
];
function unitInventory(ctx) {
  // inv[cat][group][variant] = [{drug, field, match}]
  const inv = {};
  for (const cat of UNIT_CATEGORIES) {
    inv[cat.key] = {};
    for (const [gk, g] of Object.entries(GROUPS)) {
      inv[cat.key][gk] = {};
      for (const r of ctx.rows) {
        for (const f of g.fields) {
          const v = r.d[f];
          if (typeof v !== 'string') continue;
          for (const [vname, re] of cat.variants) {
            const ms = v.match(new RegExp(re.source, re.flags));
            if (!ms) continue;
            (inv[cat.key][gk][vname] ||= []).push({ drug: r.label, field: f, match: ms.join('、') });
          }
        }
      }
    }
  }
  return inv;
}

// ---- 各項檢查 ----
// strict: true 的檢查不接受「已知問題」，有問題 CI 直接失敗；
// 其餘檢查的既有問題記在 tests/known_issues.json，CI 以 todo 呈現，新出現的問題才會失敗。
const CHECKS = [
  {
    key: 'load', title: '資料檔可載入、結構正確', strict: true,
    run({ D }) {
      const out = [];
      if (!D || typeof D !== 'object') return [issue('load', '-', '-', 'window.RENAL_DATA 不存在或不是物件')];
      if (!D.meta || typeof D.meta !== 'object') out.push(issue('load', '-', 'meta', '缺少 meta'));
      if (!Array.isArray(D.classes) || !D.classes.length) out.push(issue('load', '-', 'classes', '缺少 classes 或為空'));
      (D.classes || []).forEach((c, i) => {
        if (typeof c.name !== 'string' || !c.name.trim()) out.push(issue('load', `第 ${i + 1} 類`, 'name', '分類名稱空白'));
        if (!Array.isArray(c.drugs) || !c.drugs.length) out.push(issue('load', c.name || `第 ${i + 1} 類`, 'drugs', '分類內沒有藥物'));
      });
      const cn = (D.classes || []).map((c) => c.name);
      cn.filter((n, i) => cn.indexOf(n) !== i).forEach((n) => out.push(issue('load', n, 'name', '分類名稱重複')));
      return out;
    },
  },
  {
    key: 'names', title: '藥名不重複、不空白、沒有 undefined', strict: true,
    run({ rows }) {
      const out = [];
      const seen = new Map();
      const norm = (s) => s.toLowerCase().replace(/[（(]/g, '(').replace(/[）)]/g, ')').replace(/\s+/g, '');
      for (const r of rows) {
        const n = r.d.name;
        if (typeof n !== 'string' || !n.trim()) { out.push(issue('names', r.label, 'name', '藥名空白或不是字串')); continue; }
        if (/\b(?:undefined|null|NaN)\b/.test(n)) out.push(issue('names', r.label, 'name', '藥名含 undefined／null／NaN'));
        const k = norm(n);
        if (seen.has(k)) out.push(issue('names', r.label, 'name', `藥名與「${seen.get(k)}」重複（忽略大小寫、空白與全半形括號）`));
        else seen.set(k, n);
      }
      return out;
    },
  },
  {
    key: 'values', title: '所有欄位沒有 undefined／null／空值、沒有多餘空白', strict: true,
    run({ rows }) {
      const out = [];
      const walk = (r, field, v, where) => {
        if (v === undefined || v === null || (typeof v === 'number' && Number.isNaN(v))) {
          out.push(issue('values', r.label, field, `${where} 為 ${String(v)}`)); return;
        }
        if (typeof v === 'string') {
          if (/\b(?:undefined|null|NaN)\b/.test(v)) out.push(issue('values', r.label, field, `${where} 含字樣 undefined／null／NaN`, where));
          if (v !== v.trim()) out.push(issue('values', r.label, field, `${where} 前後有多餘空白`, where));
          if (/ {2,}/.test(v)) out.push(issue('values', r.label, field, `${where} 有連續空白`, where));
          if (/[\t\n\r ​　﻿]/.test(v)) out.push(issue('values', r.label, field, `${where} 含 tab、換行、不換行空白或全形空白`, where));
        } else if (Array.isArray(v)) v.forEach((x, i) => walk(r, field, x, `${where}[${i}]`));
        else if (typeof v === 'object') for (const [k, x] of Object.entries(v)) walk(r, field, x, `${where}.${k}`);
      };
      for (const r of rows) for (const [k, v] of Object.entries(r.d)) walk(r, k, v, k);
      return out;
    },
  },
  {
    key: 'fields', title: '欄位名稱與型別', strict: true,
    run({ rows }) {
      const out = [];
      for (const r of rows) {
        const d = r.d;
        for (const k of Object.keys(d)) if (!KNOWN_FIELDS.has(k)) out.push(issue('fields', r.label, k, `未知欄位「${k}」（index.html 不會顯示）`));
        for (const k of REQUIRED_FIELDS) if (!(k in d)) out.push(issue('fields', r.label, k, `缺少必要欄位「${k}」`));
        for (const k of TEXT_FIELDS) if (k in d && typeof d[k] !== 'string') out.push(issue('fields', r.label, k, `「${k}」應為字串`));
        if ('brands' in d) {
          if (!Array.isArray(d.brands) || !d.brands.length) out.push(issue('fields', r.label, 'brands', 'brands 應為非空陣列'));
          else {
            d.brands.forEach((b) => { if (typeof b !== 'string' || !b.trim()) out.push(issue('fields', r.label, 'brands', '商品名有空白項')); });
            d.brands.filter((b, i) => d.brands.indexOf(b) !== i).forEach((b) => out.push(issue('fields', r.label, 'brands', `商品名「${b}」重複`, b)));
          }
        }
        if ('route' in d && typeof d.route === 'string' && !d.route.trim()) out.push(issue('fields', r.label, 'route', 'Route 空白'));
      }
      return out;
    },
  },
  {
    key: 'bands', title: '每個藥物都有完整的三段腎功能分級', strict: true,
    run({ rows, D }) {
      const out = [];
      for (const r of rows) {
        for (const b of D.meta.bands || []) {
          const v = r.d[b.key];
          if (typeof v !== 'string' || !v.trim()) out.push(issue('bands', r.label, b.key, `缺少 GFR ${b.label} 段`));
        }
      }
      return out;
    },
  },
  {
    key: 'intervals', title: 'CrCl 分段連續、不重疊、沒有缺口（meta.bands 與 index.html 一致）', strict: true,
    run({ D, script }) {
      const out = [];
      const bands = bandRanges(D);
      if (bands.length < 2) out.push(issue('intervals', '-', 'meta.bands', 'meta.bands 少於兩段'));
      for (const b of bands) if (!b.range) out.push(issue('intervals', '-', 'meta.bands', `分段標籤「${b.label}」無法解析`, b.key));
      const keys = bands.map((b) => b.key);
      keys.filter((k, i) => keys.indexOf(k) !== i).forEach((k) => out.push(issue('intervals', '-', 'meta.bands', `分段 key「${k}」重複`, k)));
      const ok = bands.filter((b) => b.range).sort((a, b) => a.range.lo - b.range.lo);
      let next = 0;
      for (const b of ok) {
        if (b.range.lo > next) out.push(issue('intervals', '-', 'meta.bands', `CrCl ${next}–${b.range.lo - 1} 沒有對應分段（缺口）`, b.key));
        if (b.range.lo < next) out.push(issue('intervals', '-', 'meta.bands', `分段「${b.label}」與前一段重疊`, b.key));
        next = b.range.hi + 1;
      }
      if (ok.length && next !== Infinity) out.push(issue('intervals', '-', 'meta.bands', `CrCl ≥${next} 沒有對應分段`));
      const fn = htmlBandFn(script);
      if (!fn) out.push(issue('intervals', '-', 'index.html', '找不到 bandForCrCl()，無法比對頁面分段'));
      else {
        for (let c = 0; c <= 300; c++) {
          const want = ok.find((b) => c >= b.range.lo && c <= b.range.hi);
          const got = fn(c);
          if (!want || want.key !== got) {
            out.push(issue('intervals', '-', 'index.html', `CrCl=${c} 時頁面高亮「${got}」，但 meta.bands 標籤對應「${want ? want.key : '無'}」`, String(c)));
            break;
          }
        }
      }
      return out;
    },
  },
  {
    key: 'cutoffs', title: 'GFR 欄內的 CrCl 條件落在該欄範圍內',
    run(ctx) {
      const out = [];
      for (const t of crclTable(ctx)) {
        if (t.status === '完全不在欄位範圍內' || t.status === '無法解析') {
          out.push(issue('cutoffs', t.drug, t.field,
            `「${t.band}」欄寫的是「${t.cond}」（CrCl ${fmtRange(t.range)}），與本欄範圍（${fmtRange(t.bandRange)}）完全沒有交集；CrCl 落在本欄時頁面會高亮這格`, t.cond, t.value));
        }
      }
      // 確認每個 Ccr 字樣都有被解析到，避免漏檢
      for (const r of ctx.rows) {
        for (const k of ctx.bandKeys) {
          const n = countCcrTokens(r.d[k]);
          const parsed = cellConditions(r.d[k]).filter((c) => /^Ccr/.test(c.text)).length;
          if (n !== parsed) out.push(issue('cutoffs', r.label, k, `有 ${n} 個 Ccr 字樣，但只解析出 ${parsed} 個條件，寫法可能不一致`, 'parse', r.d[k]));
        }
      }
      return out;
    },
  },
  {
    key: 'dialysis', title: '透析欄位（HD／CAPD／CRRT）齊全或明確標示無資料',
    run({ rows }) {
      const out = [];
      for (const r of rows) {
        const d = r.d;
        const has = DZ_FIELDS.filter((k) => k in d);
        if (has.length && has.length < DZ_FIELDS.length) {
          for (const k of DZ_FIELDS.filter((x) => !has.includes(x))) out.push(issue('dialysis', r.label, k, `有部分透析欄位但缺少「${k}」，應填入或寫「No data」`, 'partial'));
        }
        for (const k of has) if (typeof d[k] !== 'string' || !d[k].trim()) out.push(issue('dialysis', r.label, k, '透析欄位為空字串，應寫「No data」', 'empty'));
        if (!has.length) out.push(issue('dialysis', r.label, 'hd/capd/crrt', '三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」', 'missing'));
        if (!!d.nd !== has.length > 0) out.push(issue('dialysis', r.label, 'nd', has.length ? '有透析欄位但沒有常規劑量（nd）' : '有常規劑量（nd）但沒有透析欄位', 'nd'));
      }
      return out;
    },
  },
  {
    key: 'ver', title: '「待核」標記方式一致（ver 欄位）', strict: true,
    run({ rows }) {
      const out = [];
      for (const r of rows) {
        const d = r.d;
        const sanford = ['nd', ...DZ_FIELDS].some((k) => d[k]);
        if ('ver' in d && d.ver !== 0 && d.ver !== 1) out.push(issue('ver', r.label, 'ver', `ver 只能是 0（待核）或 1（已核），目前是 ${JSON.stringify(d.ver)}`));
        if (sanford && !('ver' in d)) out.push(issue('ver', r.label, 'ver', '有 Sanford 資料但沒有 ver 欄位，頁面會默默當成「待核」灰字；請明確寫 ver: 0 或 1'));
        if (!sanford && 'ver' in d) out.push(issue('ver', r.label, 'ver', '沒有常規／透析資料卻有 ver 欄位，標記沒有作用'));
        if (sanford && !d.ver && !d.nd) out.push(issue('ver', r.label, 'ver', '待核列沒有常規劑量（nd），頁面只會灰字、不會出現「待核」小標籤'));
      }
      return out;
    },
  },
  {
    key: 'route', title: 'Route 寫法符合圖例（R／H／HD／?）',
    run({ rows }) {
      const out = [];
      for (const r of rows) {
        const v = r.d.route;
        if (typeof v === 'string' && v.trim() && !ROUTE_RE.test(v)) out.push(issue('route', r.label, 'route', `Route「${v}」不在圖例定義（R／H／HD／?）內`, v));
      }
      return out;
    },
  },
  {
    key: 'unit', title: '院內規格（unit）格式', strict: true,
    run({ rows }) {
      const out = [];
      for (const r of rows) {
        const u = r.d.unit;
        if (u === undefined) continue;
        if (!u || typeof u !== 'object' || Array.isArray(u)) { out.push(issue('unit', r.label, 'unit', 'unit 應為物件')); continue; }
        for (const [form, list] of Object.entries(u)) {
          if (!UNIT_FORMS.includes(form)) out.push(issue('unit', r.label, 'unit', `未知劑型「${form}」`, form));
          if (!Array.isArray(list) || !list.length) { out.push(issue('unit', r.label, 'unit', `${form} 應為非空陣列`, form)); continue; }
          for (const s of list) if (typeof s !== 'string' || !UNIT_RE.test(s)) out.push(issue('unit', r.label, 'unit', `${form}「${s}」格式不符（應如 500mg、1g、2MU、400mg/200mL）`, `${form}:${s}`));
          list.filter((s, i) => list.indexOf(s) !== i).forEach((s) => out.push(issue('unit', r.label, 'unit', `${form}「${s}」重複`, `${form}:${s}`)));
        }
      }
      return out;
    },
  },
  {
    key: 'unit_equiv', title: '院內規格沒有同量不同寫法（如 0.5g 與 500mg）',
    run({ rows }) {
      const out = [];
      const toMg = (s) => {
        const m = String(s).match(UNIT_RE);
        if (!m || m[2] === 'MU') return null;
        return `${+m[1] * (m[2] === 'g' ? 1000 : 1)}|${m[3] || ''}`;
      };
      for (const r of rows) {
        const u = r.d.unit;
        if (!u || typeof u !== 'object') continue;
        for (const [form, list] of Object.entries(u)) {
          if (!Array.isArray(list)) continue;
          const byMg = {};
          for (const s of list) { const k = toMg(s); if (k) (byMg[k] ||= []).push(s); }
          for (const same of Object.values(byMg)) {
            if (same.length > 1) out.push(issue('unit_equiv', r.label, 'unit', `${form} 同時列出 ${same.join(' 與 ')}（同量不同寫法；可能是不同品項，未修改）`, `${form}:${same.join('=')}`));
          }
        }
      }
      return out;
    },
  },
  {
    key: 'units', title: '劑量欄位的單位寫法一致（同一來源內）',
    run(ctx) {
      const out = [];
      const inv = unitInventory(ctx);
      for (const cat of UNIT_CATEGORIES) {
        for (const [gk, g] of Object.entries(GROUPS)) {
          const used = Object.keys(inv[cat.key][gk]);
          if (used.length < 2) continue;
          for (const v of used) {
            const n = inv[cat.key][gk][v].length;
            out.push(issue('units', `（${g.label}）`, cat.key, `${cat.title}：同一來源混用 ${used.join('、')}；其中「${v}」出現在 ${n} 個欄位`, `${gk}:${v}`));
          }
        }
      }
      return out;
    },
  },
  {
    key: 'style_rules', title: '2026-11-02 統一的寫法規則（綠卡欄間隔、空格、院內規格）', strict: true,
    run({ rows }) {
      const out = [];
      const RULES = [
        [/\bqd\b/, '用 q24h，不用 qd（QD／QOD 易看錯）'],
        [/\b(?:qod|q2d)\b/, '用 q48h，不用 qod／q2d'],
        [/\bqwk\b/, '用 q7d，不用 qwk'],
        [/\d(?:mg|gm|g|MU)(?![a-zA-Z])/, '數字與單位之間要空一格（如 6 g、160 mg）'],
        [/Ccr\s+(?=[<>≤≥\d])/, 'Ccr 與數值之間不空格（如 Ccr40–50）'],
      ];
      for (const r of rows) {
        for (const f of GROUPS.gfr.fields) {
          const v = r.d[f];
          if (typeof v !== 'string') continue;
          for (const [re, msg] of RULES) if (re.test(v)) out.push(issue('style_rules', r.label, f, `${msg}：${v}`, msg));
        }
        const u = r.d.unit;
        if (u && typeof u === 'object') {
          for (const [form, list] of Object.entries(u)) {
            for (const s of Array.isArray(list) ? list : []) {
              const m = String(s).match(UNIT_RE);
              if (!m) continue;
              if (m[2] === 'g' && +m[1] < 1) out.push(issue('style_rules', r.label, 'unit', `${form}「${s}」未滿 1 g 請寫成 mg`, s));
              if (m[2] === 'mg' && +m[1] >= 1000) out.push(issue('style_rules', r.label, 'unit', `${form}「${s}」1 g 以上請寫成 g`, s));
            }
          }
        }
      }
      return out;
    },
  },
  {
    key: 'html_safe', title: '資料文字不會被 index.html 當成 HTML 標籤', strict: true,
    run({ rows }) {
      const out = [];
      for (const r of rows) {
        for (const k of [...TEXT_FIELDS, 'brands']) {
          const vals = Array.isArray(r.d[k]) ? r.d[k] : [r.d[k]];
          for (const v of vals) {
            if (typeof v !== 'string') continue;
            if (/<[A-Za-z\/!?]/.test(v)) out.push(issue('html_safe', r.label, k, `含「<」後接英文字母，innerHTML 會當成標籤吞掉：${v}`));
            if (/&(?!(?:[a-z]+|#\d+);)/.test(v)) out.push(issue('html_safe', r.label, k, `含未跳脫的「&」：${v}`));
          }
        }
      }
      return out;
    },
  },
  {
    key: 'html_refs', title: 'index.html 渲染時引用的欄位都存在於資料中', strict: true,
    run(ctx) {
      const out = [];
      const refs = htmlRefs(ctx);
      for (const f of refs.drugFields) {
        if (!ctx.rows.some((r) => f in r.d)) out.push(issue('html_refs', '-', f, `index.html 引用 d.${f}，但沒有任何藥物有這個欄位`));
      }
      for (const f of refs.unguarded) {
        for (const r of ctx.rows) {
          if (typeof r.d[f] !== 'string' || !r.d[f].trim()) out.push(issue('html_refs', r.label, f, `index.html 直接輸出 d.${f}（沒有 ||'' 保護），缺值會顯示 undefined 或出錯`));
        }
      }
      for (const p of refs.metaPaths) {
        const v = p.split('.').reduce((o, k) => (o == null ? undefined : o[k]), ctx.D.meta);
        if (v === undefined) out.push(issue('html_refs', '-', `meta.${p}`, `index.html 引用 D.meta.${p}，但資料中沒有`));
      }
      for (const k of refs.dzKeys) if (!DZ_FIELDS.includes(k)) out.push(issue('html_refs', '-', k, `index.html 的 DZ_KEYS 有「${k}」，但檢查腳本不認得這個透析欄位`));
      if (!refs.classFields.includes('name') || !refs.classFields.includes('drugs')) out.push(issue('html_refs', '-', 'classes', '找不到 cls.name／cls.drugs 的引用，index.html 結構可能改了'));
      return out;
    },
  },
];

// index.html 內 render 用到的欄位
function htmlRefs({ script, D }) {
  const drugFields = new Set();
  for (const m of script.matchAll(/\bd\.([A-Za-z_]\w*)/g)) drugFields.add(m[1]);
  const dz = script.match(/const\s+DZ_KEYS\s*=\s*\[([\s\S]*?)\];/);
  const dzKeys = dz ? [...dz[1].matchAll(/\[\s*'(\w+)'/g)].map((m) => m[1]) : [];
  if (/\bd\[k\]/.test(script)) dzKeys.forEach((k) => drugFields.add(k));
  if (/\bd\[b\.key\]/.test(script)) (D.meta.bands || []).forEach((b) => drugFields.add(b.key));
  const metaPaths = new Set();
  for (const m of script.matchAll(/\bD\.meta\.([A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*)/g)) metaPaths.add(m[1]);
  const classFields = [...new Set([...script.matchAll(/\bcls\.([A-Za-z_]\w*)/g)].map((m) => m[1]))];
  // 直接用 ${d.xxx} 輸出、沒有判斷或 || 保護的欄位
  const unguarded = new Set();
  for (const m of script.matchAll(/\$\{d\.([A-Za-z_]\w*)\}/g)) {
    const f = m[1];
    const guarded = new RegExp(`d\\.${f}\\s*\\?|!d\\.${f}\\b|d\\.${f}\\s*\\|\\|`).test(script);
    if (!guarded) unguarded.add(f);
  }
  if (/\bd\.name\.toLowerCase\(\)/.test(script)) unguarded.add('name');
  return { drugFields: [...drugFields], dzKeys, metaPaths: [...metaPaths], classFields, unguarded: [...unguarded] };
}

module.exports = {
  ROOT, DATA_FILE, HTML_FILE, DZ_FIELDS, SANFORD_FIELDS, FIELD_LABEL, GROUPS, UNIT_CATEGORIES, CHECKS,
  context, loadData, cellConditions, parseBandLabel, bandRanges, crclTable, unitInventory, htmlRefs, fmtRange,
};
