# 資料結構與格式檢查報告

產生日期：2026-11-02｜檢查對象：`renal_data.js`（9 類、90 列）與 `index.html`

> **這份報告只檢查資料完不完整、格式一不一致，不判斷劑量對不對。** 劑量正確性需另行對照原書核對。
> 2026-11-02 依 Kiwi 確認，統一了綠卡欄的間隔與空格寫法、Route、院內規格寫法，並刪除一個查無此品項的商品名。**劑量數值與 CrCl 切點都沒有改**，逐項清單見第 0 節。

重新產生本報告：`node tests/make_report.js`；執行檢查：`node --test tests/data.test.js`。CI（GitHub Actions）會在每次 push 與 PR 時自動執行檢查。

## 摘要

| 檢查項目 | 類型 | 結果 | 問題數 |
| --- | --- | --- | --- |
| 資料檔可載入、結構正確 | 強制 | ✅ 通過 | 0 |
| 藥名不重複、不空白、沒有 undefined | 強制 | ✅ 通過 | 0 |
| 所有欄位沒有 undefined／null／空值、沒有多餘空白 | 強制 | ✅ 通過 | 0 |
| 欄位名稱與型別 | 強制 | ✅ 通過 | 0 |
| 每個藥物都有完整的三段腎功能分級 | 強制 | ✅ 通過 | 0 |
| CrCl 分段連續、不重疊、沒有缺口（meta.bands 與 index.html 一致） | 強制 | ✅ 通過 | 0 |
| GFR 欄內的 CrCl 條件落在該欄範圍內 | 可列已知 | ⚠️ 已知問題（todo） | 4 |
| 透析欄位（HD／CAPD／CRRT）齊全或明確標示無資料 | 可列已知 | ⚠️ 已知問題（todo） | 36 |
| 「待核」標記方式一致（ver 欄位） | 強制 | ✅ 通過 | 0 |
| Route 寫法符合圖例（R／H／HD／?） | 可列已知 | ✅ 通過 | 0 |
| 院內規格（unit）格式 | 強制 | ✅ 通過 | 0 |
| 院內規格沒有同量不同寫法（如 0.5g 與 500mg） | 可列已知 | ✅ 通過 | 0 |
| 劑量欄位的單位寫法一致（同一來源內） | 可列已知 | ⚠️ 已知問題（todo） | 21 |
| 2026-11-02 統一的寫法規則（綠卡欄間隔、空格、院內規格） | 強制 | ✅ 通過 | 0 |
| 資料文字不會被 index.html 當成 HTML 標籤 | 強制 | ✅ 通過 | 0 |
| index.html 渲染時引用的欄位都存在於資料中 | 強制 | ✅ 通過 | 0 |

- ✅ 通過：沒有問題。
- ⚠️ 已知問題（todo）：列在本報告，CI 不會因此變紅；之後新增的同類問題才會讓 CI 失敗。
- 標示「強制」的項目（藥名、分級、CrCl 分段、欄位、待核標記、院內規格格式、頁面引用欄位）一有問題 CI 就會失敗，不接受列為已知問題。

## 0. 本次修改紀錄

### 0.1 第一輪（純格式檢查）

沒有找到多餘空白、tab、全形空白或 `undefined` 之類的純格式錯誤，沒有修改資料。網頁與 README 的來源說明拿掉「線上版」「高醫訂閱」等字眼（只動說明文字）。

### 0.2 第二輪（Kiwi 確認後的寫法統一，共 63 處）

- 綠卡 GFR 欄與備註：`qd` → `q24h`；`qod`、`q2d` → `q48h`；`qwk` → `q7d`（QD／QOD 在 Joint Commission 禁用縮寫清單上，容易看錯）。
- 數字與單位之間空一格（`6g` → `6 g`），和 `7.5 mg/kg` 一致；`Ccr 40–50` → `Ccr40–50`。藥名不動，避免影響搜尋。
- 個別改寫 3 格：Doripenem <10 `0.25g qd–q12h` → `0.25 g q12–24h`；SMZ-TMP（治療）<10 `qd 或分次` → `/day（一次或分次）`；SMZ-TMP（預防）>50 只把 `qd` 改成 `q24h`，`biw–tiw` 保留，和其他列一致。
- Route：Cefoperazone/sulbactam `Sulbactam: R` → `H,R`，原意寫進備註；圖例補上「?＝排除途徑不明」（Amphotericin B 保留 `?`）。
- 院內規格：未滿 1 g 改用 mg（`0.5g` → `500mg`），並去除同量重複（Cefepime、Ceftazidime 原本同時列 `0.5g` 與 `500mg`）。
- 商品名：`Zovirx` 查無此品項，同列已有 `Zovirax`，刪除。`Aziciin` 經查是真實品名（侒舒芯亞膜衣錠），**保留不改**。
- 這些寫法規則已加入強制檢查，之後再出現 `qd`、`6g` 之類寫法 CI 會失敗。

<details><summary>逐項變更（63 處，點開看明細）</summary>

| 藥名 | 欄位 | 修改前 | 修改後 | 原因 |
| --- | --- | --- | --- | --- |
| Amoxicillin-clavulanate（PO/IV） | 院內規格 | `{"vial":["0.6g","1.2g"],"tab":["625mg"]}` | `{"vial":["600mg","1.2g"],"tab":["625mg"]}` | 院內規格：未滿 1 g 改用 mg，並去除同量重複 |
| Amoxicillin-clav 875mg tab（PO） | 院內規格 | `{"vial":["0.6g","1.2g"],"tab":["625mg"]}` | `{"vial":["600mg","1.2g"],"tab":["625mg"]}` | 院內規格：未滿 1 g 改用 mg，並去除同量重複 |
| Ampicillin/sulbactam — Acinetobacter / E. faecalis（高劑量） | GFR >50 | `6g q8h` | `6 g q8h` | 間隔寫法／空格統一 |
| Ampicillin/sulbactam — Acinetobacter / E. faecalis（高劑量） | GFR 10–50 | `Ccr<30：6g q12h` | `Ccr<30：6 g q12h` | 間隔寫法／空格統一 |
| Ampicillin/sulbactam — Acinetobacter / E. faecalis（高劑量） | GFR <10 | `3g q8h` | `3 g q8h` | 間隔寫法／空格統一 |
| Piperacillin-tazobactam（non-Pseudomonas） | GFR <10 | `2.25g q8–12h` | `2.25 g q8–12h` | 間隔寫法／空格統一 |
| Piperacillin-tazobactam（Pseudomonas） | GFR >50 | `4.5g q6h` | `4.5 g q6h` | 間隔寫法／空格統一 |
| Piperacillin-tazobactam（Pseudomonas） | GFR 10–50 | `Ccr 40–50：4.5g q6h；20–40：3.375g q6h；<20：2.25g q6h` | `Ccr40–50：4.5 g q6h；20–40：3.375 g q6h；<20：2.25 g q6h` | 間隔寫法／空格統一 |
| Piperacillin-tazobactam（Pseudomonas） | GFR <10 | `2.25g q8h` | `2.25 g q8h` | 間隔寫法／空格統一 |
| Piperacillin-tazobactam（Pseudomonas） | 備註 | `Sanford 17A；HD 2.25g q8h＋透析後補 0.75g` | `Sanford 17A；HD 2.25 g q8h＋透析後補 0.75 g` | 間隔寫法／空格統一 |
| Ticarcillin-clavulanate | GFR >50 | `3.1g q4–6h` | `3.1 g q4–6h` | 間隔寫法／空格統一 |
| Ticarcillin-clavulanate | GFR 10–50 | `3.1g q8–12h` | `3.1 g q8–12h` | 間隔寫法／空格統一 |
| Ticarcillin-clavulanate | GFR <10 | `2g q12h` | `2 g q12h` | 間隔寫法／空格統一 |
| Cefazolin | 院內規格 | `{"vial":["1g","0.5g"]}` | `{"vial":["1g","500mg"]}` | 院內規格：未滿 1 g 改用 mg，並去除同量重複 |
| Cefepime | 院內規格 | `{"vial":["1g","0.5g","500mg"]}` | `{"vial":["1g","500mg"]}` | 院內規格：未滿 1 g 改用 mg，並去除同量重複 |
| Cefoperazone/sulbactam | GFR 10–50 | `Ccr≤30：2–4g q12h` | `Ccr≤30：2–4 g q12h` | 間隔寫法／空格統一 |
| Cefoperazone/sulbactam | GFR <10 | `CRRT：2g q6h` | `CRRT：2 g q6h` | 間隔寫法／空格統一 |
| Cefoperazone/sulbactam | Route | `Sulbactam: R` | `H,R` | Route 改用圖例代號 |
| Cefoperazone/sulbactam | 備註 | `` | `R 指 sulbactam；cefoperazone 主要經膽道排除` | Route 原寫法改放備註 |
| Ceftazidime | 院內規格 | `{"vial":["1g","2g","0.5g","500mg"]}` | `{"vial":["1g","2g","500mg"]}` | 院內規格：未滿 1 g 改用 mg，並去除同量重複 |
| Ceftibuten | 備註 | `200–400mg after HD` | `200–400 mg after HD` | 間隔寫法／空格統一 |
| Cephradine（0.25–1g q6h） | GFR 10–50 | `50% 或 0.25–0.5g q6h` | `50% 或 0.25–0.5 g q6h` | 間隔寫法／空格統一 |
| Cephradine（0.25–1g q6h） | GFR <10 | `25% 或 0.25g q12h` | `25% 或 0.25 g q12h` | 間隔寫法／空格統一 |
| Flomoxef | GFR <10 | `50–100% qd` | `50–100% q24h` | 間隔寫法／空格統一 |
| Doripenem | GFR 10–50 | `Ccr30–50：0.25g q8h／Ccr<30：0.25g q12h` | `Ccr30–50：0.25 g q8h／Ccr<30：0.25 g q12h` | 間隔寫法／空格統一 |
| Doripenem | GFR <10 | `0.25g qd–q12h` | `0.25 g q12–24h` | 間隔寫法統一（個別改寫） |
| Doripenem | 備註 | `HD：0.25–0.5g qd` | `HD：0.25–0.5 g q24h` | 間隔寫法／空格統一 |
| Imipenem | 備註 | `CRRT：0.5–1g q12h` | `CRRT：0.5–1 g q12h` | 間隔寫法／空格統一 |
| Imipenem | 院內規格 | `{"vial":["0.5g"]}` | `{"vial":["500mg"]}` | 院內規格：未滿 1 g 改用 mg，並去除同量重複 |
| Meropenem | 院內規格 | `{"vial":["1g","0.5g","0.25g"]}` | `{"vial":["1g","500mg","250mg"]}` | 院內規格：未滿 1 g 改用 mg，並去除同量重複 |
| Levofloxacin 750mg | GFR 10–50 | `Ccr≥20：750mg q48h` | `Ccr≥20：750 mg q48h` | 間隔寫法／空格統一 |
| Levofloxacin 750mg | GFR <10 | `Ccr<20：750mg×1，之後 500mg q2d` | `Ccr<20：750 mg×1，之後 500 mg q48h` | 間隔寫法／空格統一 |
| Levofloxacin 500mg | GFR 10–50 | `Ccr≥20：500mg q48h` | `Ccr≥20：500 mg q48h` | 間隔寫法／空格統一 |
| Levofloxacin 500mg | GFR <10 | `Ccr<20：500mg×1，之後 250mg q2d` | `Ccr<20：500 mg×1，之後 250 mg q48h` | 間隔寫法／空格統一 |
| Gemifloxacin | GFR 10–50 | `Ccr≤40：160mg qd` | `Ccr≤40：160 mg q24h` | 間隔寫法／空格統一 |
| Gemifloxacin | GFR <10 | `160mg qd` | `160 mg q24h` | 間隔寫法／空格統一 |
| Norfloxacin | GFR <10 | `400mg qd` | `400 mg q24h` | 間隔寫法／空格統一 |
| Fosfomycin（IV） | GFR 10–50 | `Ccr10–20：qd` | `Ccr10–20：q24h` | 間隔寫法／空格統一 |
| Fosfomycin（IV） | GFR <10 | `qod；HD：50–100% after HD` | `q48h；HD：50–100% after HD` | 間隔寫法／空格統一 |
| SMZ-TMP（治療） | GFR <10 | `A 或 5–10 mg/kg qd 或分次` | `A 或 5–10 mg/kg/day（一次或分次）` | 間隔寫法統一（個別改寫） |
| SMZ-TMP（預防） | GFR >50 | `qd、biw–tiw` | `q24h、biw–tiw` | 間隔寫法統一（個別改寫） |
| Vancomycin（IV） | GFR <10 | `0.5g after HD` | `0.5 g after HD` | 間隔寫法／空格統一 |
| Fluconazole | GFR 10–50 | `Ccr≤50：50% qd` | `Ccr≤50：50% q24h` | 間隔寫法／空格統一 |
| Fluconazole | GFR <10 | `HD：50% qd 或僅 HD 後給全量` | `HD：50% q24h 或僅 HD 後給全量` | 間隔寫法／空格統一 |
| Acyclovir（IV） | GFR <10 | `50% qd` | `50% q24h` | 間隔寫法／空格統一 |
| Acyclovir（IV） | 商品名 | `["Acylete","Acylo","Asimplex","Virless","Zovirax","Zovirx"]` | `["Acylete","Acylo","Asimplex","Virless","Zovirax"]` | 刪除查無此品項的商品名 Zovirx（同列已有 Zovirax） |
| Acyclovir（PO）HSV | GFR <10 | `0.2g q12h` | `0.2 g q12h` | 間隔寫法／空格統一 |
| Acyclovir（PO）HSV | 商品名 | `["Acylete","Acylo","Asimplex","Virless","Zovirax","Zovirx"]` | `["Acylete","Acylo","Asimplex","Virless","Zovirax"]` | 刪除查無此品項的商品名 Zovirx（同列已有 Zovirax） |
| Acyclovir（PO）VZV | GFR 10–50 | `0.8g q8h` | `0.8 g q8h` | 間隔寫法／空格統一 |
| Acyclovir（PO）VZV | GFR <10 | `0.8g q12h` | `0.8 g q12h` | 間隔寫法／空格統一 |
| Acyclovir（PO）VZV | 商品名 | `["Acylete","Acylo","Asimplex","Virless","Zovirax","Zovirx"]` | `["Acylete","Acylo","Asimplex","Virless","Zovirax"]` | 刪除查無此品項的商品名 Zovirx（同列已有 Zovirax） |
| Entecavir | GFR <10 | `qwk` | `q7d` | 間隔寫法／空格統一 |
| Famciclovir | GFR 10–50 | `0.5g q12–24h` | `0.5 g q12–24h` | 間隔寫法／空格統一 |
| Famciclovir | GFR <10 | `0.5g qd` | `0.5 g q24h` | 間隔寫法／空格統一 |
| Ganciclovir（誘導） | GFR 10–50 | `Ccr25–49：50% qd／Ccr10–24：25% qd` | `Ccr25–49：50% q24h／Ccr10–24：25% q24h` | 間隔寫法／空格統一 |
| Ganciclovir（維持） | GFR 10–50 | `Ccr25–49：25% qd／Ccr<25：0.625 mg/kg qd` | `Ccr25–49：25% q24h／Ccr<25：0.625 mg/kg q24h` | 間隔寫法／空格統一 |
| Lamivudine | GFR 10–50 | `50–150 mg qd` | `50–150 mg q24h` | 間隔寫法／空格統一 |
| Lamivudine | GFR <10 | `25–50 mg qd` | `25–50 mg q24h` | 間隔寫法／空格統一 |
| Valacyclovir | GFR <10 | `0.5g q24h` | `0.5 g q24h` | 間隔寫法／空格統一 |
| Valganciclovir（誘導） | GFR 10–50 | `Ccr25–49：50% qd／Ccr10–24：50% qod` | `Ccr25–49：50% q24h／Ccr10–24：50% q48h` | 間隔寫法／空格統一 |
| Valganciclovir（誘導） | GFR <10 | `A 或 50% qod` | `A 或 50% q48h` | 間隔寫法／空格統一 |
| Valganciclovir（維持） | GFR 10–50 | `Ccr25–49：50% qod／Ccr<25：50% biw` | `Ccr25–49：50% q48h／Ccr<25：50% biw` | 間隔寫法／空格統一 |
| （圖例） | meta.legend.route | `R=腎排除 · H=肝排除 · HD=血液透析` | `R=腎排除 · H=肝排除 · HD=血液透析 · ?=排除途徑不明` | 補上 Route「?」的定義（Amphotericin B） |

</details>

## 1. 結構問題清單

下表是檢查腳本找到的所有結構問題（不含單位寫法，單位寫法見第 3 節）。

### GFR 欄內的 CrCl 條件落在該欄範圍內（4 項）

同一列在其他欄已有相同或相鄰的 CrCl 條件，看起來像原始資料的欄位對齊方式（綠卡把三段 Ccr 條件依序放進三欄），**不是本工具轉錄錯誤的判定**。但在頁面上，病人 CrCl >50 時會高亮這一格，而格子裡寫的卻是 CrCl 30–49 或 20–40 的條件，容易誤讀。需對照原書決定要不要改欄位或加註。

| 藥名 | 欄位 | 問題描述 |
| --- | --- | --- |
| Fosfomycin（IV） | GFR >50 | 「>50」欄寫的是「Ccr20–40」（CrCl 20–40），與本欄範圍（≥51）完全沒有交集；CrCl 落在本欄時頁面會高亮這格 |
| Telbivudine | GFR >50 | 「>50」欄寫的是「Ccr30–49」（CrCl 30–49），與本欄範圍（≥51）完全沒有交集；CrCl 落在本欄時頁面會高亮這格 |
| Tenofovir | GFR >50 | 「>50」欄寫的是「Ccr30–49」（CrCl 30–49），與本欄範圍（≥51）完全沒有交集；CrCl 落在本欄時頁面會高亮這格 |
| Emtricitabine | GFR >50 | 「>50」欄寫的是「Ccr30–49」（CrCl 30–49），與本欄範圍（≥51）完全沒有交集；CrCl 落在本欄時頁面會高亮這格 |

### 透析欄位（HD／CAPD／CRRT）齊全或明確標示無資料（36 項）

這些藥沒有任何透析欄位，頁面顯示「—」。圖例已說明「—」＝原書未列此藥透析劑量、不代表不需調整，所以**不是缺漏錯誤**；只是不像其他 54 列那樣明確寫出「No data」。是否補上「No data」或 Sanford 資料，需人工決定。

| 藥名 | 欄位 | 問題描述 |
| --- | --- | --- |
| Amikacin / Streptomycin（TB） | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Gentamicin | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Amoxicillin-clav 875mg tab（PO） | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Mezlocillin | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Oxacillin | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Piperacillin | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Ticarcillin-clavulanate | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Cefoperazone | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Cefoperazone/sulbactam | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Cefpirome | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Cefmetazole | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Cephradine（0.25–1g q6h） | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Flomoxef | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Imipenem | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Moxifloxacin | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Clindamycin | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Colistin / Colimycin（維持劑量・參考 A） | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Colistin / Colimycin（維持劑量・參考 B） | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Daptomycin | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Doxycycline / Minocycline | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Erythromycin | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Fusidate sodium | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Nitroxoline | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| SMZ-TMP（治療） | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| SMZ-TMP（預防） | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Tigecycline | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Amphotericin B | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Isoniazid / Rifampin | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Acyclovir（PO）HSV | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Acyclovir（PO）VZV | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Lamivudine | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Nevirapine / Efavirenz / Ritonavir | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Tenofovir | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Emtricitabine | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Valganciclovir（誘導） | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Valganciclovir（維持） | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |

### GFR 欄內 CrCl 條件總表（供核對參考）

GFR 三欄的分段為 `>50`、`10–50`、`<10`（頁面先把 CrCl 四捨五入成整數再分段，50 屬於 10–50 欄、10 屬於 10–50 欄）。meta.bands 與 `index.html` 的 `bandForCrCl()` 一致，分段連續、不重疊、沒有缺口。

下表列出格子內另外寫了 CrCl 條件的所有地方，以及條件和該欄範圍的關係。「部分超出」很常見（例如 10–50 欄寫「Ccr<30」，代表只有 <30 才調整），只是提醒；「完全不在欄位範圍內」已列在上方問題清單。

| 藥名 | 欄 | 格子原文 | 條件 | 條件範圍（整數 CrCl） | 與欄位範圍關係 |
| --- | --- | --- | --- | --- | --- |
| Amikacin / Streptomycin（TB） | 10–50 | `Ccr<30 或 HD：15 mg/kg biw–tiw` | `Ccr<30` | ≤29 | **部分超出欄位範圍** |
| Amikacin / Streptomycin（TB） | <10 | `Ccr<30 或 HD：15 mg/kg biw–tiw` | `Ccr<30` | ≤29 | **部分超出欄位範圍** |
| Amoxicillin-clavulanate（PO/IV） | 10–50 | `Ccr<30：q12h` | `Ccr<30` | ≤29 | **部分超出欄位範圍** |
| Amoxicillin-clav 875mg tab（PO） | 10–50 | `Ccr<15：q24h` | `Ccr<15` | ≤14 | **部分超出欄位範圍** |
| Amoxicillin-clav 875mg tab（PO） | <10 | `Ccr<5：50% q24h` | `Ccr<5` | ≤4 | 在欄位範圍內 |
| Ampicillin | 10–50 | `Ccr<30：q12h` | `Ccr<30` | ≤29 | **部分超出欄位範圍** |
| Ampicillin/sulbactam | 10–50 | `Ccr<30：q12h` | `Ccr<30` | ≤29 | **部分超出欄位範圍** |
| Ampicillin/sulbactam — Acinetobacter / E. faecalis（高劑量） | 10–50 | `Ccr<30：6 g q12h` | `Ccr<30` | ≤29 | **部分超出欄位範圍** |
| Piperacillin-tazobactam（non-Pseudomonas） | 10–50 | `Ccr<20：q8h` | `Ccr<20` | ≤19 | **部分超出欄位範圍** |
| Piperacillin-tazobactam（Pseudomonas） | 10–50 | `Ccr40–50：4.5 g q6h；20–40：3.375 g q6h；<20：2.25 g q6h` | `Ccr40–50` | 40–50 | 在欄位範圍內 |
| Piperacillin-tazobactam（Pseudomonas） | 10–50 | `Ccr40–50：4.5 g q6h；20–40：3.375 g q6h；<20：2.25 g q6h` | `20–40` | 20–40 | 在欄位範圍內 |
| Piperacillin-tazobactam（Pseudomonas） | 10–50 | `Ccr40–50：4.5 g q6h；20–40：3.375 g q6h；<20：2.25 g q6h` | `<20` | ≤19 | **部分超出欄位範圍** |
| Cefixime | 10–50 | `Ccr>20：75%` | `Ccr>20` | ≥21 | **部分超出欄位範圍** |
| Cefixime | <10 | `Ccr<20：50%` | `Ccr<20` | ≤19 | **部分超出欄位範圍** |
| Cefoperazone/sulbactam | 10–50 | `Ccr≤30：2–4 g q12h` | `Ccr≤30` | ≤30 | **部分超出欄位範圍** |
| Ceftibuten | 10–50 | `Ccr≥30：50%` | `Ccr≥30` | ≥30 | **部分超出欄位範圍** |
| Ceftibuten | <10 | `Ccr<30：50%` | `Ccr<30` | ≤29 | **部分超出欄位範圍** |
| Cephalexin | 10–50 | `Ccr≤40：q8–12h` | `Ccr≤40` | ≤40 | **部分超出欄位範圍** |
| Doripenem | 10–50 | `Ccr30–50：0.25 g q8h／Ccr<30：0.25 g q12h` | `Ccr30–50` | 30–50 | 在欄位範圍內 |
| Doripenem | 10–50 | `Ccr30–50：0.25 g q8h／Ccr<30：0.25 g q12h` | `Ccr<30` | ≤29 | **部分超出欄位範圍** |
| Ertapenem | 10–50 | `Ccr<30：50%` | `Ccr<30` | ≤29 | **部分超出欄位範圍** |
| Levofloxacin 750mg | 10–50 | `Ccr≥20：750 mg q48h` | `Ccr≥20` | ≥20 | **部分超出欄位範圍** |
| Levofloxacin 750mg | <10 | `Ccr<20：750 mg×1，之後 500 mg q48h` | `Ccr<20` | ≤19 | **部分超出欄位範圍** |
| Levofloxacin 500mg | 10–50 | `Ccr≥20：500 mg q48h` | `Ccr≥20` | ≥20 | **部分超出欄位範圍** |
| Levofloxacin 500mg | <10 | `Ccr<20：500 mg×1，之後 250 mg q48h` | `Ccr<20` | ≤19 | **部分超出欄位範圍** |
| Gemifloxacin | 10–50 | `Ccr≤40：160 mg q24h` | `Ccr≤40` | ≤40 | **部分超出欄位範圍** |
| Colistin / Colimycin（維持劑量・參考 A） | 10–50 | `Ccr20–40：2–3 MU q12h／Ccr10–19：2 MU q12h` | `Ccr20–40` | 20–40 | 在欄位範圍內 |
| Colistin / Colimycin（維持劑量・參考 A） | 10–50 | `Ccr20–40：2–3 MU q12h／Ccr10–19：2 MU q12h` | `Ccr10–19` | 10–19 | 在欄位範圍內 |
| Daptomycin | 10–50 | `Ccr<30：q48h` | `Ccr<30` | ≤29 | **部分超出欄位範圍** |
| Fosfomycin（IV） | >50 | `Ccr20–40：bid` | `Ccr20–40` | 20–40 | **完全不在欄位範圍內** |
| Fosfomycin（IV） | 10–50 | `Ccr10–20：q24h` | `Ccr10–20` | 10–20 | 在欄位範圍內 |
| Nitroxoline | 10–50 | `Ccr<20：A` | `Ccr<20` | ≤19 | **部分超出欄位範圍** |
| SMZ-TMP（治療） | 10–50 | `Ccr<30：50%` | `Ccr<30` | ≤29 | **部分超出欄位範圍** |
| Fluconazole | 10–50 | `Ccr≤50：50% q24h` | `Ccr≤50` | ≤50 | **部分超出欄位範圍** |
| Rifabutin | 10–50 | `Ccr<30：50%` | `Ccr<30` | ≤29 | **部分超出欄位範圍** |
| Rifabutin | <10 | `Ccr<30：50%` | `Ccr<30` | ≤29 | **部分超出欄位範圍** |
| Entecavir | 10–50 | `Ccr30–49：q48h／Ccr<30：q72h` | `Ccr30–49` | 30–49 | 在欄位範圍內 |
| Entecavir | 10–50 | `Ccr30–49：q48h／Ccr<30：q72h` | `Ccr<30` | ≤29 | **部分超出欄位範圍** |
| Ganciclovir（誘導） | >50 | `Ccr50–69：50% q12h` | `Ccr50–69` | 50–69 | **部分超出欄位範圍** |
| Ganciclovir（誘導） | 10–50 | `Ccr25–49：50% q24h／Ccr10–24：25% q24h` | `Ccr25–49` | 25–49 | 在欄位範圍內 |
| Ganciclovir（誘導） | 10–50 | `Ccr25–49：50% q24h／Ccr10–24：25% q24h` | `Ccr10–24` | 10–24 | 在欄位範圍內 |
| Ganciclovir（維持） | >50 | `Ccr50–69：50% q24h` | `Ccr50–69` | 50–69 | **部分超出欄位範圍** |
| Ganciclovir（維持） | 10–50 | `Ccr25–49：25% q24h／Ccr<25：0.625 mg/kg q24h` | `Ccr25–49` | 25–49 | 在欄位範圍內 |
| Ganciclovir（維持） | 10–50 | `Ccr25–49：25% q24h／Ccr<25：0.625 mg/kg q24h` | `Ccr<25` | ≤24 | **部分超出欄位範圍** |
| Telbivudine | >50 | `Ccr30–49：q48h` | `Ccr30–49` | 30–49 | **完全不在欄位範圍內** |
| Telbivudine | 10–50 | `Ccr<30：q72h` | `Ccr<30` | ≤29 | **部分超出欄位範圍** |
| Tenofovir | >50 | `Ccr30–49：q48h` | `Ccr30–49` | 30–49 | **完全不在欄位範圍內** |
| Tenofovir | 10–50 | `Ccr<30：q72–96h` | `Ccr<30` | ≤29 | **部分超出欄位範圍** |
| Emtricitabine | >50 | `Ccr30–49：q48h` | `Ccr30–49` | 30–49 | **完全不在欄位範圍內** |
| Emtricitabine | 10–50 | `Ccr<30：q72h` | `Ccr<30` | ≤29 | **部分超出欄位範圍** |
| Valganciclovir（誘導） | >50 | `Ccr50–69：50% q12h` | `Ccr50–69` | 50–69 | **部分超出欄位範圍** |
| Valganciclovir（誘導） | 10–50 | `Ccr25–49：50% q24h／Ccr10–24：50% q48h` | `Ccr25–49` | 25–49 | 在欄位範圍內 |
| Valganciclovir（誘導） | 10–50 | `Ccr25–49：50% q24h／Ccr10–24：50% q48h` | `Ccr10–24` | 10–24 | 在欄位範圍內 |
| Valganciclovir（維持） | >50 | `Ccr50–69：50% q24h` | `Ccr50–69` | 50–69 | **部分超出欄位範圍** |
| Valganciclovir（維持） | 10–50 | `Ccr25–49：50% q48h／Ccr<25：50% biw` | `Ccr25–49` | 25–49 | 在欄位範圍內 |
| Valganciclovir（維持） | 10–50 | `Ccr25–49：50% q48h／Ccr<25：50% biw` | `Ccr<25` | ≤24 | **部分超出欄位範圍** |

### GFR 欄內混有透析／CRRT 劑量（觀察，未列為問題）

以下 GFR 欄或備註裡寫了 HD、CRRT 的劑量。頁面另有透析欄，兩處資料來源不同（綠卡與 Sanford），核對時可留意兩者是否一致。

| 藥名 | 欄位 | 原文 | 透析欄是否有 Sanford 資料 |
| --- | --- | --- | --- |
| Amikacin / Streptomycin（TB） | GFR 10–50 | `Ccr<30 或 HD：15 mg/kg biw–tiw` | 無 |
| Amikacin / Streptomycin（TB） | GFR <10 | `Ccr<30 或 HD：15 mg/kg biw–tiw` | 無 |
| Piperacillin-tazobactam（Pseudomonas） | 備註 | `Sanford 17A；HD 2.25 g q8h＋透析後補 0.75 g` | 有 |
| Cefoperazone/sulbactam | GFR <10 | `CRRT：2 g q6h` | 無 |
| Ceftibuten | 備註 | `200–400 mg after HD` | 有 |
| Doripenem | 備註 | `HD：0.25–0.5 g q24h` | 有 |
| Imipenem | 備註 | `CRRT：0.5–1 g q12h` | 無 |
| Levofloxacin 750mg | 備註 | `HD：同 <20` | 有 |
| Levofloxacin 500mg | 備註 | `HD：同 <20` | 有 |
| Colistin / Colimycin（維持劑量・參考 A） | 備註 | `*CRRT 膜會吸附；CRRT：4.5 MU q12–8h` | 無 |
| Colistin / Colimycin（維持劑量・參考 B） | 備註 | `CRRT：2–3 MU q8h` | 無 |
| Daptomycin | 備註 | `CRRT：8 mg/kg q48h` | 無 |
| Fosfomycin（IV） | GFR <10 | `q48h；HD：50–100% after HD` | 有 |
| Vancomycin（IV） | GFR <10 | `0.5 g after HD` | 有 |
| Fluconazole | GFR <10 | `HD：50% q24h 或僅 HD 後給全量` | 有 |
| Tenofovir | 備註 | `HD：q7d` | 無 |

### 多列共用同一份 Sanford 常規／透析資料（觀察，未列為問題）

同一個藥拆成多列（不同劑量、適應症）時，常規與透析欄是同一份 Sanford 原文。若某列的 GFR 欄劑量與共用的常規劑量不同（例如名稱是 500mg 的列，常規欄顯示 750 mg），閱讀時可能混淆，可判斷是否需要加註。

| 共用的列 | 常規（nd） |
| --- | --- |
| Ampicillin/sulbactam<br>Ampicillin/sulbactam — Acinetobacter / E. faecalis（高劑量） | `1.5-3 gm IV q6h` |
| Piperacillin-tazobactam（non-Pseudomonas）<br>Piperacillin-tazobactam（Pseudomonas） | `Extended infusion: 4.5 gm IV (over 4 hr) q8h Intermittent infusion: Nosocomial pneumonia: 4.5 gm IV (over 30 min) q6h All other indications: 3.375 gm IV (over 30 min) q6h` |
| Cefaclor（0.25–1g）<br>Cefaclor（0.25–0.5g） | `500 mg po q8h` |
| Levofloxacin 750mg<br>Levofloxacin 500mg | `750 mg po/IV q24h` |

### 透析欄「無資料／不需調整」的寫法（觀察）

有透析欄位的 54 列都三欄齊全，沒有空字串。下面是各種「沒有劑量」的寫法；「部分」表示這幾個字只是整段文字的一部分。

| 寫法 | 次數 | 出現位置 |
| --- | --- | --- |
| `No data` | 36 | Amoxicillin-clavulanate（PO/IV）（CAPD）、Amoxicillin-clavulanate（PO/IV）（CRRT）、Dicloxacillin（HD）、Dicloxacillin（CAPD）、Dicloxacillin（CRRT）、Piperacillin-tazobactam（non-Pseudomonas）（CAPD，部分）、Piperacillin-tazobactam（Pseudomonas）（CAPD，部分）、Cefaclor（0.25–1g）（CRRT）、Cefaclor（0.25–0.5g）（CRRT）、Cefixime（CRRT）、Ceftazidime（CAPD）、Ceftibuten（CRRT）、Cephalexin（CRRT）、Doripenem（HD）、Doripenem（CAPD）、Gemifloxacin（CRRT）、Fosfomycin（IV）（CAPD）、Teicoplanin（維持劑量）（CAPD）、Flucytosine（CRRT）、Itraconazole（PO）（CRRT）、Terbinafine（HD）、Terbinafine（CAPD）、Terbinafine（CRRT）、Rifabutin（HD）、Rifabutin（CAPD）、Rifabutin（CRRT）、Amantadine（CAPD）、Amantadine（CRRT）、Didanosine（EC/SR）（CRRT）、Entecavir（CRRT）、Famciclovir（CAPD）、Famciclovir（CRRT）、Ganciclovir（維持）（CRRT）、Telbivudine（CAPD）、Telbivudine（CRRT）、Valacyclovir（CRRT） |
| `No dosage adjustment` | 14 | Ceftriaxone（HD）、Ceftriaxone（CAPD）、Ceftriaxone（CRRT）、Azithromycin（HD）、Azithromycin（CAPD）、Azithromycin（CRRT）、Fosfomycin（IV）（CRRT，部分）、Linezolid（HD，部分）、Linezolid（CAPD）、Linezolid（CRRT）、Metronidazole（CAPD）、Metronidazole（CRRT）、Itraconazole（PO）（HD）、Itraconazole（PO）（CAPD） |
| `Not applicable` | 1 | Norfloxacin（CRRT） |
| `Not removed by HD` | 1 | Teicoplanin（維持劑量）（HD，部分） |

### `index.html` 與資料欄位對照

- 頁面引用的藥物欄位：`ver`、`nd`、`hep`、`obese`、`unit`、`name`、`brands`、`route`、`comment`、`hd`、`capd`、`crrt`、`g50`、`g1050`、`g10`。全部都存在於資料中。
- 頁面直接輸出、沒有缺值保護的欄位：`name`、`route`。目前 90 列都有值。
- 頁面引用的 meta 欄位：`meta.bands`、`meta.legend.route`、`meta.legend.values`、`meta.dialysis_note`、`meta.unit_note`。全部存在。
- 資料中有、但頁面沒用到的 meta 欄位：`meta.title`、`meta.subtitle`、`meta.source`、`meta.bands_dialysis`。其中 `meta.bands_dialysis` 的內容與頁面寫死的 `DZ_KEYS` 相同；`meta.source` 仍寫「綠卡…pages 1–3（Sanford Guide / UpToDate / Lexicomp / 高醫院內規範）」，沒有提到 2026-10-30 起常規與透析的來源更新（頁面不顯示這個欄位，只影響日後閱讀原始檔）。
- 資料文字沒有會被 `innerHTML` 誤當成 HTML 標籤的內容（例如 `<30` 之類的寫法是安全的）。

### 文件與資料的數字差異（觀察）

| 位置 | 文件寫法 | 資料實際 |
| --- | --- | --- |
| README「內容」 | 89 種抗微生物藥 | 資料共 90 列（Piperacillin-tazobactam 拆成兩列等，「種」與「列」計法可能不同） |
| README「內容」 | 85/89 藥附商品名 | 資料中 86/90 列有 brands |
| README「內容」 | 肝 3 種、肥胖 15 種 | 資料中 hep 3 列、obese 15 列（一致） |

文件數字不影響頁面運作，本次未修改。

## 2. 「待核」項目完整清單

### 2.1 頁面上的「待核」標記怎麼來的

- `renal_data.js` 每列有 Sanford 常規／透析資料時，會帶 `ver` 欄位：`ver: 1`＝已核對（正常字）、`ver: 0` 或缺少 `ver`＝未核對。
- `index.html` 對未核對的列：常規劑量灰字並加「待核」小標籤（`normalDose()`），透析欄整格灰字（`dialysisCell()`）。
- 只有常規與透析欄受 `ver` 控制；三段 GFR 欄、備註、肝功能、肥胖、院內規格**都沒有**待核標記機制。
- 檢查腳本會擋下三種不一致：有 Sanford 資料卻沒寫 `ver`（會默默變灰字）、沒資料卻寫了 `ver`、待核列沒有常規劑量（只會灰字、不會出現「待核」標籤）。目前都沒有。

### 2.2 目前標成「待核」的列：0 列

**目前沒有任何一列是待核。** 有 Sanford 資料的 54 列全部是 `ver: 1`，與 README 更新紀錄「2026-10-30 已全部更新，不再有待核列」相符。資料檔內也沒有「待核」字樣。

（`index.html` 第 68 行的 CSS 註解也寫「目前沒有 ver=0 的列」，與資料一致。）

### 2.3 其他看起來「不確定」的標記（不是待核機制，列出供參考）

| 藥名 | 欄位 | 內容 | 說明 |
| --- | --- | --- | --- |
| Colistin / Colimycin（維持劑量・參考 A） | 藥名 | `Colistin / Colimycin（維持劑量・參考 A）` | 同一藥兩個參考來源並列，未標明採用哪一個 |
| Colistin / Colimycin（維持劑量・參考 A） | 備註 | `*CRRT 膜會吸附；CRRT：4.5 MU q12–8h` | 以「*」開頭，頁面沒有對應的註腳說明 |
| Colistin / Colimycin（維持劑量・參考 B） | 藥名 | `Colistin / Colimycin（維持劑量・參考 B）` | 同一藥兩個參考來源並列，未標明採用哪一個 |
| Amphotericin B | Route | `?` | Route 寫「?」，圖例沒有定義 |
| Terbinafine | GFR 10–50 | `? 或 A` | 圖例：「?」＝無資料 |
| Terbinafine | GFR <10 | `? 或 A` | 圖例：「?」＝無資料 |
| Tenofovir | GFR <10 | `?` | 圖例：「?」＝無資料 |

### 2.4 各欄位的來源與核對狀態（摘自 README 與頁面說明）

| 欄位 | 來源 | 列數 | 核對狀態 |
| --- | --- | --- | --- |
| 三段 GFR（>50／10–50／<10） | 綠卡《Guide to Drug Dosage in Renal Failure》 | 90 | 頁面與 README 註明「已人工校對（2026-06-29）」，無逐列標記 |
| 常規、HD、CAPD、CRRT | Sanford Guide（2026-10-30 更新） | 54 | 全部 `ver: 1` |
| 肝功能、肥胖 | Sanford Guide | 3／15 | 沒有 ver 標記機制 |
| 院內規格 | 高醫藥典品名（程式擷取） | 83 | 非劑量資料，沒有核對標記 |
| 備註 | 綠卡等 | 19 | 沒有核對標記 |

## 3. 單位寫法不一致清單

依資料來源分成三組比對：**綠卡**（GFR 三欄＋備註）、**Sanford**（常規、透析、肝、肥胖）、**藥名**。不同來源本來就有各自的寫法（例如綠卡寫 `g`、Sanford 寫 `gm`），跨來源的差異只列出；**同一來源內混用兩種以上寫法**才算不一致，列為已知問題。全部沒有修改。

### 3.1 總覽

| 類別 | 綠卡 GFR 欄＋備註 | Sanford 欄（常規／透析／肝／肥胖） | 藥名 | 同來源內不一致 |
| --- | --- | --- | --- | --- |
| 公克寫法（g／gm） | g：26 | gm：59 | g：3 | — |
| 數字與單位之間的空格 | 有空格（如 6 g、160 mg）：54 | 有空格（如 6 g、160 mg）：164 | 緊接（如 6g、160mg）：6 | — |
| 百萬單位寫法（MU／million U） | MU：6 | million U：4 | — | — |
| 數字範圍連接號（–／-） | en dash（–）：77 | hyphen（-）：75 | en dash（–）：3 | — |
| 給藥間隔大小寫（q8h／Q8H） | 小寫 q…h：155 | 小寫 q…h：158 | 小寫 q…h：1 | — |
| 每日一次寫法 | q24h：44 | q24h：64<br>once daily：1<br>daily（單獨）：1 | — | ⚠️ Sanford |
| 每日總量寫法（/day／每日） | /day：1 | /day：1 | — | — |
| 隔日一次寫法 | q48h：16 | q48h：12 | — | — |
| 每週數次寫法 | biw／tiw：9 | Nx/wk：3<br>Nx/week：4 | — | ⚠️ Sanford |
| 每週一次寫法 | q7d：3 | once weekly：1 | — | — |
| 乘號／次數（x／×） | ×（如 ×1）：2 | x（如 x1、3x/wk）：19 | — | — |
| 毫升大小寫（mL／ml） | — | ml：1<br>mL：2 | — | ⚠️ Sanford |
| 腎功能縮寫（Ccr／CrCl／eGFR） | Ccr：47 | eGFR：1<br>CrCl：2 | — | ⚠️ Sanford |
| Ccr 與數值之間的空格 | 緊接（如 Ccr<30、Ccr30–49）：47 | — | — | — |
| 同一格多段條件的分隔符（／；、） | ；：5<br>／：7<br>、：1 | — | — | ⚠️ 綠卡 |
| 冒號全形／半形 | 全形「：」：58 | 半形「:」：31<br>全形「：」：3 | — | ⚠️ Sanford |
| 「或」的寫法 | 或：15 | OR／or：1 | — | — |
| 透析後給藥寫法 | 透析後：1<br>after HD／after each dialysis：3 | AD：40<br>POST-HD：2<br>after HD／after each dialysis：1 | — | ⚠️ 綠卡、Sanford |
| 給藥途徑順序（IV/po／po/IV） | — | po/IV：3<br>IV/po：3 | — | ⚠️ Sanford |
| 口服大小寫（po／PO） | — | po：31 | PO：5 | — |

數字是出現該寫法的欄位數（同一格出現多次只算一次）。

### 3.2 同一來源內不一致的明細

#### 每日一次寫法｜Sanford 欄（常規／透析／肝／肥胖）

「once daily」1 處：

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Amikacin | CAPD | `once daily` |

「daily（單獨）」1 處：

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Rifabutin | 肝 | `daily` |

<details><summary>「q24h」64 處（點開看明細）</summary>

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Amikacin | 常規 | `q24h` |
| Amoxicillin-clavulanate（PO/IV） | HD | `q24h、q24h` |
| Ampicillin/sulbactam | HD | `q24h` |
| Ampicillin/sulbactam | CAPD | `q24h` |
| Ampicillin/sulbactam — Acinetobacter / E. faecalis（高劑量） | HD | `q24h` |
| Ampicillin/sulbactam — Acinetobacter / E. faecalis（高劑量） | CAPD | `q24h` |
| Cefazolin | HD | `q24h` |
| Cefepime | HD | `q24h、q24h` |
| Cefixime | 常規 | `q24h` |
| Cefixime | HD | `q24h` |
| Cefixime | CAPD | `q24h` |
| Cefotaxime | HD | `q24h` |
| Cefotaxime | CAPD | `q24h` |
| Cefoxitin | CAPD | `q24h` |
| Ceftazidime | HD | `q24h` |
| Ceftibuten | 常規 | `q24h` |
| Ceftibuten | HD | `q24h` |
| Ceftibuten | CAPD | `q24h` |
| Cefuroxime | HD | `q24h` |
| Cefuroxime | CAPD | `q24h` |
| Meropenem | HD | `q24h` |
| Meropenem | CAPD | `q24h` |
| Ertapenem | 常規 | `q24h` |
| Ertapenem | HD | `q24h` |
| Ertapenem | CAPD | `q24h` |
| Ertapenem | CRRT | `q24h` |
| Ciprofloxacin | HD | `q24h` |
| Ciprofloxacin | CAPD | `q24h` |
| Levofloxacin 750mg | 常規 | `q24h` |
| Levofloxacin 500mg | 常規 | `q24h` |
| Gemifloxacin | 常規 | `q24h` |
| Gemifloxacin | HD | `q24h` |
| Gemifloxacin | CAPD | `q24h` |
| Norfloxacin | HD | `q24h` |
| Norfloxacin | CAPD | `q24h` |
| Azithromycin | 常規 | `q24h` |
| Clarithromycin | HD | `q24h` |
| Clarithromycin | CAPD | `q24h` |
| Teicoplanin（維持劑量） | 常規 | `q24h` |
| Teicoplanin（維持劑量） | CRRT | `q24h` |
| Tetracycline | HD | `q24h` |
| Tetracycline | CAPD | `q24h` |
| Fluconazole | 常規 | `q24h` |
| Fluconazole | HD | `q24h` |
| Fluconazole | CAPD | `q24h` |
| Flucytosine | CAPD | `q24h` |
| Terbinafine | 常規 | `q24h` |
| Ethambutol | 常規 | `q24h` |
| Pyrazinamide | 常規 | `q24h` |
| Pyrazinamide | CAPD | `q24h` |
| Pyrazinamide | CRRT | `q24h` |
| Rifabutin | 常規 | `q24h` |
| Acyclovir（IV） | HD | `q24h` |
| Acyclovir（IV） | CAPD | `q24h` |
| Acyclovir（IV） | CRRT | `q24h` |
| Didanosine（EC/SR） | 常規 | `q24h` |
| Entecavir | 常規 | `q24h、q24h` |
| Entecavir | HD | `q24h、q24h` |
| Entecavir | CAPD | `q24h、q24h` |
| Ganciclovir（誘導） | CRRT | `q24h` |
| Ganciclovir（維持） | 常規 | `q24h` |
| Telbivudine | 常規 | `q24h` |
| Valacyclovir | HD | `q24h` |
| Valacyclovir | CAPD | `q24h` |

</details>

#### 每週數次寫法｜Sanford 欄（常規／透析／肝／肥胖）

「Nx/wk」3 處：

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Cefepime | HD | `3x/wk` |
| Ertapenem | HD | `3x/wk` |
| Ethambutol | HD | `3x/wk` |

「Nx/week」4 處：

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Ganciclovir（誘導） | HD | `3x/week` |
| Ganciclovir（誘導） | CAPD | `3x/week` |
| Ganciclovir（維持） | HD | `3x/week` |
| Ganciclovir（維持） | CAPD | `3x/week` |

#### 毫升大小寫（mL／ml）｜Sanford 欄（常規／透析／肝／肥胖）

「ml」1 處：

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Cefepime | CRRT | `ml` |

「mL」2 處：

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Teicoplanin（維持劑量） | CRRT | `mL、mL` |
| Vancomycin（IV） | CRRT | `mL` |

#### 腎功能縮寫（Ccr／CrCl／eGFR）｜Sanford 欄（常規／透析／肝／肥胖）

「eGFR」1 處：

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Teicoplanin（維持劑量） | HD | `eGFR` |

「CrCl」2 處：

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Didanosine（EC/SR） | HD | `CrCl` |
| Didanosine（EC/SR） | CAPD | `CrCl` |

#### 同一格多段條件的分隔符（／；、）｜綠卡 GFR 欄＋備註

「、」1 處：

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| SMZ-TMP（預防） | GFR >50 | `、` |

「；」5 處：

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Piperacillin-tazobactam（Pseudomonas） | GFR 10–50 | `；、；` |
| Piperacillin-tazobactam（Pseudomonas） | 備註 | `；` |
| Cefoperazone/sulbactam | 備註 | `；` |
| Colistin / Colimycin（維持劑量・參考 A） | 備註 | `；` |
| Fosfomycin（IV） | GFR <10 | `；` |

「／」7 處：

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Doripenem | GFR 10–50 | `／` |
| Colistin / Colimycin（維持劑量・參考 A） | GFR 10–50 | `／` |
| Entecavir | GFR 10–50 | `／` |
| Ganciclovir（誘導） | GFR 10–50 | `／` |
| Ganciclovir（維持） | GFR 10–50 | `／` |
| Valganciclovir（誘導） | GFR 10–50 | `／` |
| Valganciclovir（維持） | GFR 10–50 | `／` |

#### 冒號全形／半形｜Sanford 欄（常規／透析／肝／肥胖）

「全形「：」」3 處：

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Metronidazole | 肝 | `：` |
| Terbinafine | 肝 | `：` |
| Rifabutin | 肝 | `：` |

<details><summary>「半形「:」」31 處（點開看明細）</summary>

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Amikacin | 常規 | `:、:` |
| Amikacin | HD | `:` |
| Amikacin | CAPD | `:` |
| Amikacin | CRRT | `:、:` |
| Amoxicillin-clavulanate（PO/IV） | HD | `:、:` |
| Piperacillin-tazobactam（non-Pseudomonas） | 常規 | `:、:、:、:` |
| Piperacillin-tazobactam（non-Pseudomonas） | HD | `:、:、:、:` |
| Piperacillin-tazobactam（non-Pseudomonas） | CAPD | `:、:、:、:` |
| Piperacillin-tazobactam（non-Pseudomonas） | CRRT | `:、:` |
| Piperacillin-tazobactam（Pseudomonas） | 常規 | `:、:、:、:` |
| Piperacillin-tazobactam（Pseudomonas） | HD | `:、:、:、:` |
| Piperacillin-tazobactam（Pseudomonas） | CAPD | `:、:、:、:` |
| Piperacillin-tazobactam（Pseudomonas） | CRRT | `:、:` |
| Cefazolin | HD | `:` |
| Cefepime | HD | `:、:、:、:` |
| Cefepime | CAPD | `:、:` |
| Cefepime | CRRT | `:、:、:、:` |
| Fosfomycin（IV） | 常規 | `:、:` |
| Fosfomycin（IV） | CRRT | `:` |
| Teicoplanin（維持劑量） | 常規 | `:` |
| Teicoplanin（維持劑量） | CRRT | `:、:、:、:、:、:、:、:、:、:、:、:` |
| Vancomycin（IV） | HD | `:、:、:、:、:、:、:、:、:、:、:、:` |
| Vancomycin（IV） | CRRT | `:、:` |
| Flucytosine | CAPD | `:` |
| Entecavir | 常規 | `:、:` |
| Entecavir | HD | `:、:` |
| Entecavir | CAPD | `:、:` |
| Famciclovir | 常規 | `:、:` |
| Famciclovir | HD | `:、:、:、:` |
| Ganciclovir（誘導） | CRRT | `:` |
| Valacyclovir | 常規 | `:、:` |

</details>

#### 透析後給藥寫法｜綠卡 GFR 欄＋備註

「透析後」1 處：

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Piperacillin-tazobactam（Pseudomonas） | 備註 | `透析後` |

「after HD／after each dialysis」3 處：

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Ceftibuten | 備註 | `after HD` |
| Fosfomycin（IV） | GFR <10 | `after HD` |
| Vancomycin（IV） | GFR <10 | `after HD` |

#### 透析後給藥寫法｜Sanford 欄（常規／透析／肝／肥胖）

「after HD／after each dialysis」1 處：

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Famciclovir | HD | `after each dialysis、after each dialysis、after each dialysis` |

「POST-HD」2 處：

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Vancomycin（IV） | HD | `POST-HD` |
| Didanosine（EC/SR） | HD | `post HD` |

<details><summary>「AD」40 處（點開看明細）</summary>

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Amikacin | HD | `AD` |
| Amoxicillin-clavulanate（PO/IV） | HD | `AD、AD` |
| Ampicillin | HD | `AD` |
| Ampicillin/sulbactam | HD | `AD` |
| Ampicillin/sulbactam — Acinetobacter / E. faecalis（高劑量） | HD | `AD` |
| Penicillin G | HD | `AD` |
| Piperacillin-tazobactam（non-Pseudomonas） | HD | `AD、AD` |
| Piperacillin-tazobactam（Pseudomonas） | HD | `AD、AD` |
| Cefaclor（0.25–1g） | HD | `AD` |
| Cefaclor（0.25–0.5g） | HD | `AD` |
| Cefazolin | HD | `AD、AD、AD` |
| Cefepime | HD | `AD、AD` |
| Cefixime | HD | `AD` |
| Cefotaxime | HD | `AD` |
| Cefoxitin | HD | `AD` |
| Ceftazidime | HD | `AD` |
| Ceftibuten | HD | `AD` |
| Cefuroxime | HD | `AD` |
| Cephalexin | HD | `AD` |
| Meropenem | HD | `AD` |
| Ertapenem | HD | `AD、AD` |
| Ciprofloxacin | HD | `AD` |
| Gemifloxacin | HD | `AD` |
| Clarithromycin | HD | `AD` |
| Fosfomycin（IV） | HD | `AD` |
| Linezolid | HD | `AD` |
| Metronidazole | HD | `AD` |
| Vancomycin（IV） | HD | `AD、AD` |
| Fluconazole | HD | `AD` |
| Flucytosine | HD | `AD` |
| Ethambutol | HD | `AD` |
| Pyrazinamide | HD | `AD` |
| Acyclovir（IV） | HD | `AD` |
| Entecavir | HD | `AD` |
| Famciclovir | HD | `AD、AD` |
| Ganciclovir（誘導） | HD | `AD` |
| Ganciclovir（維持） | HD | `AD` |
| Telbivudine | HD | `AD` |
| Valacyclovir | HD | `AD` |
| Zidovudine | HD | `AD` |

</details>

#### 給藥途徑順序（IV/po／po/IV）｜Sanford 欄（常規／透析／肝／肥胖）

「po/IV」3 處：

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Levofloxacin 750mg | 常規 | `po/IV` |
| Levofloxacin 500mg | 常規 | `po/IV` |
| Linezolid | 常規 | `po/IV` |

「IV/po」3 處：

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Azithromycin | 常規 | `IV/po` |
| Metronidazole | 常規 | `IV/po` |
| Fluconazole | 常規 | `IV/po` |

### 3.3 跨來源的寫法差異（不算問題，僅供參考）

| 類別 | 各來源寫法 |
| --- | --- |
| 公克寫法（g／gm） | 綠卡 GFR 欄＋備註：g<br>Sanford 欄（常規／透析／肝／肥胖）：gm<br>藥名：g |
| 數字與單位之間的空格 | 綠卡 GFR 欄＋備註：有空格（如 6 g、160 mg）<br>Sanford 欄（常規／透析／肝／肥胖）：有空格（如 6 g、160 mg）<br>藥名：緊接（如 6g、160mg） |
| 百萬單位寫法（MU／million U） | 綠卡 GFR 欄＋備註：MU<br>Sanford 欄（常規／透析／肝／肥胖）：million U<br>藥名：— |
| 數字範圍連接號（–／-） | 綠卡 GFR 欄＋備註：en dash（–）<br>Sanford 欄（常規／透析／肝／肥胖）：hyphen（-）<br>藥名：en dash（–） |
| 每週一次寫法 | 綠卡 GFR 欄＋備註：q7d<br>Sanford 欄（常規／透析／肝／肥胖）：once weekly<br>藥名：— |
| 乘號／次數（x／×） | 綠卡 GFR 欄＋備註：×（如 ×1）<br>Sanford 欄（常規／透析／肝／肥胖）：x（如 x1、3x/wk）<br>藥名：— |
| 「或」的寫法 | 綠卡 GFR 欄＋備註：或<br>Sanford 欄（常規／透析／肝／肥胖）：OR／or<br>藥名：— |
| 口服大小寫（po／PO） | 綠卡 GFR 欄＋備註：—<br>Sanford 欄（常規／透析／肝／肥胖）：po<br>藥名：PO |

大寫 `Q8H` 之類的寫法：**沒有發現**，間隔全部是小寫 `q…h`。

## 4. 檢查方式

- 檢查腳本：`tests/data_checks.js`（檢查邏輯）、`tests/data.test.js`（`node:test` 測試）、`tests/known_issues.json`（已知問題清單）。只用 Node 內建模組，沒有任何相依套件。
- 執行：`node --test tests/data.test.js`。CI：`.github/workflows/data-check.yml`，push 與 PR 時自動執行。
- 「強制」項目有問題就失敗；其他項目只有**新出現**、不在 `known_issues.json` 的問題才會失敗。
- 修好已知問題，或確認某個新問題要保留時：執行 `node tests/make_report.js --baseline`，會同時更新 `known_issues.json` 與本報告。
