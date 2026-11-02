'use strict';
// 資料結構與格式檢查（不判斷劑量對錯）。執行：node --test tests/data.test.js
//
// 規則：
// - 「沒有新問題」：一定要通過。出現 tests/known_issues.json 沒記錄的問題就會失敗（CI 變紅）。
// - 「已知問題」：以 todo 呈現，不會讓 CI 變紅；內容列在 DATA_REPORT.md，等人工逐項處理。
// 修好已知問題後，可執行 node tests/make_report.js --baseline 更新已知清單與報告。

const { describe, test } = require('node:test');
const assert = require('node:assert/strict');
const C = require('./data_checks');
const known = new Set(require('./known_issues.json').issues);

const ctx = C.context();

function fmt(list) {
  return list.map((i) => `  - ${i.drug}｜${C.FIELD_LABEL[i.field] || i.field}｜${i.message}`).join('\n');
}

for (const chk of C.CHECKS) {
  const issues = chk.run(ctx);
  const fresh = chk.strict ? issues : issues.filter((i) => !known.has(i.id));
  const old = chk.strict ? [] : issues.filter((i) => known.has(i.id));

  describe(chk.title, () => {
    test('沒有新問題', () => {
      assert.equal(fresh.length, 0,
        `發現 ${fresh.length} 項新問題：\n${fmt(fresh)}\n` +
        (chk.strict ? '這類問題必須修正。' : '請修正資料；若確定要保留，執行 node tests/make_report.js --baseline 把它記為已知問題。'));
    });
    if (old.length) {
      test(`已知問題 ${old.length} 項（見 DATA_REPORT.md）`, { todo: '已知問題，等待人工處理' }, () => {
        assert.equal(old.length, 0, fmt(old));
      });
    }
  });
}
