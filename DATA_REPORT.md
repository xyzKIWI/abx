# 資料結構與格式檢查報告

產生日期：2026-11-02｜檢查對象：`renal_data.js`（9 類、90 列）與 `index.html`

> **這份報告只檢查資料完不完整、格式一不一致，不判斷劑量對不對。** 劑量正確性需另行對照原書核對。
> 2026-11-02 依 Kiwi 確認：第二輪統一綠卡欄寫法（劑量數值與 CrCl 切點未變）；第三輪改用 Sanford 資料（部分 GFR 欄、Colistin、TAF 新列、30 列透析欄）。逐項修改前後見第 0 節。

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
| GFR 欄內的 CrCl 條件落在該欄範圍內 | 可列已知 | ✅ 通過 | 0 |
| GFR 欄內的 CrCl 條件涵蓋整欄（例如 10–50 欄只寫 Ccr>20，10–20 要去別欄找） | 可列已知 | ⚠️ 已知問題（todo） | 14 |
| 透析欄位（HD／CAPD／CRRT）齊全或明確標示無資料 | 可列已知 | ⚠️ 已知問題（todo） | 6 |
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

### 0.3 第三輪：改用 Sanford 資料（Kiwi 2026-11-02 確認）（163 處）

- Fosfomycin（IV）、Telbivudine、Emtricitabine、Tenofovir 的三段 GFR 欄改用 Sanford 分段，原本放錯欄的 Ccr 條件不再出現在 >50 欄。
- Tenofovir 改名為 Tenofovir（TDF）；新增 Tenofovir alafenamide（TAF）列，Vemlidy、Biktarvy、Odefsey、Symtuza 四個 TAF 商品名與 25 mg 錠移到 TAF 列（兩者腎功能調整不同）。
- Colistin 參考 A／B 兩列合併為 Colistin / Colimycin（mg CBA），照 Sanford 分段；Sanford 未提供 MU 換算，備註提醒依院內藥典。
- 30 列補上 Sanford 常規劑量與 HD／CAPD／CRRT（ver: 1）；合併列逐藥標示（INH／RIF、NVP／EFV／RTV、Streptomycin）。Acyclovir 口服 Sanford 為 800 mg（帶狀疱疹），只補 VZV 列。
- Sanford 查無此藥、仍顯示「—」：Mezlocillin、Ticarcillin-clavulanate、Cephradine、Flomoxef、Nitroxoline；Acyclovir（PO）HSV 刻意不補。
- Terbinafine 保留綠卡「? 或 A」，備註加 Sanford「Ccr≤50 No data」；Amphotericin B 補常規、透析與肥胖註記，Route 維持 ?。
- Sanford 欄尾註腳編號已剔除（4 處）。

<details><summary>逐項變更（163 處，點開看明細）</summary>

| 藥名 | 欄位 | 修改前 | 修改後 | 原因 |
| --- | --- | --- | --- | --- |
| Gentamicin | 常規 | `（無）` | `G- (conventional): 1.7-2.0 mg/kg IV q8h G+ (synergy): 1 mg/kg IV q8h` | 補 Sanford 常規與透析欄 |
| Gentamicin | HD | `（無）` | `G- (conventional): 1.7-2.0 mg/kg q48h (+ extra 0.85-1.0 mg/kg AD) G+ (synergy): 1 mg/kg q48-72h (dose AD)` | 補 Sanford 常規與透析欄 |
| Gentamicin | CAPD | `（無）` | `For peritonitis only: 0.6 mg/kg IP once daily` | 補 Sanford 常規與透析欄 |
| Gentamicin | CRRT | `（無）` | `G- (conventional): 1.7-2.0 mg/kg q24h` | 補 Sanford 常規與透析欄 |
| Gentamicin | ver（核對狀態） | `（無）` | `1` | 補 Sanford 常規與透析欄 |
| Amoxicillin-clav 875mg tab（PO） | 常規 | `（無）` | `500 mg po q8h (4:1) 875 mg po q12h (7:1) 1 gm IV q8h (5:1)` | 補 Sanford 常規與透析欄 |
| Amoxicillin-clav 875mg tab（PO） | HD | `（無）` | `Oral: 250-500 mg q24h (+ extra dose AD) IV: 1 gm x1, then 500 mg q24h (+ extra dose AD)` | 補 Sanford 常規與透析欄 |
| Amoxicillin-clav 875mg tab（PO） | CAPD | `（無）` | `No data` | 補 Sanford 常規與透析欄 |
| Amoxicillin-clav 875mg tab（PO） | CRRT | `（無）` | `No data` | 補 Sanford 常規與透析欄 |
| Amoxicillin-clav 875mg tab（PO） | ver（核對狀態） | `（無）` | `1` | 補 Sanford 常規與透析欄 |
| Oxacillin | 常規 | `（無）` | `2 gm IV q4h` | 補 Sanford 常規與透析欄 |
| Oxacillin | HD | `（無）` | `No data` | 補 Sanford 常規與透析欄 |
| Oxacillin | CAPD | `（無）` | `No data` | 補 Sanford 常規與透析欄 |
| Oxacillin | CRRT | `（無）` | `No data` | 補 Sanford 常規與透析欄 |
| Oxacillin | ver（核對狀態） | `（無）` | `1` | 補 Sanford 常規與透析欄 |
| Piperacillin | 常規 | `（無）` | `3-4 gm IV q4-6h` | 補 Sanford 常規與透析欄 |
| Piperacillin | HD | `（無）` | `2 gm q8h (+ extra 1 gm AD)` | 補 Sanford 常規與透析欄 |
| Piperacillin | CAPD | `（無）` | `3-4 gm q8h` | 補 Sanford 常規與透析欄 |
| Piperacillin | CRRT | `（無）` | `3-4 gm q6-8h` | 補 Sanford 常規與透析欄 |
| Piperacillin | ver（核對狀態） | `（無）` | `1` | 補 Sanford 常規與透析欄 |
| Cefoperazone | 常規 | `（無）` | `1-2 gm IV q12h` | 補 Sanford 常規與透析欄 |
| Cefoperazone | HD | `（無）` | `No dosage adjustment (AD on dialysis days)` | 補 Sanford 常規與透析欄 |
| Cefoperazone | CAPD | `（無）` | `No data` | 補 Sanford 常規與透析欄 |
| Cefoperazone | CRRT | `（無）` | `No data` | 補 Sanford 常規與透析欄 |
| Cefoperazone | ver（核對狀態） | `（無）` | `1` | 補 Sanford 常規與透析欄 |
| Cefoperazone/sulbactam | 常規 | `（無）` | `2-4 gm/day (divided q12h) (i.e., cefoperazone 1-2 gm/day)` | 補 Sanford 常規與透析欄 |
| Cefoperazone/sulbactam | HD | `（無）` | `Sulbactam 500 mg q12h (AD on dialysis days)` | 補 Sanford 常規與透析欄 |
| Cefoperazone/sulbactam | CAPD | `（無）` | `No data` | 補 Sanford 常規與透析欄 |
| Cefoperazone/sulbactam | CRRT | `（無）` | `Sulbactam 1 gm q8h` | 補 Sanford 常規與透析欄 |
| Cefoperazone/sulbactam | ver（核對狀態） | `（無）` | `1` | 補 Sanford 常規與透析欄 |
| Cefpirome | 常規 | `（無）` | `2 gm IV q12h` | 補 Sanford 常規與透析欄 |
| Cefpirome | HD | `（無）` | `1 gm q24h (AD on dialysis days)` | 補 Sanford 常規與透析欄 |
| Cefpirome | CAPD | `（無）` | `0.5 gm 3x/wk` | 補 Sanford 常規與透析欄 |
| Cefpirome | CRRT | `（無）` | `2 gm load, then 1 gm q12h` | 補 Sanford 常規與透析欄 |
| Cefpirome | ver（核對狀態） | `（無）` | `1` | 補 Sanford 常規與透析欄 |
| Cefmetazole | 常規 | `（無）` | `2 gm IV q8-12h` | 補 Sanford 常規與透析欄 |
| Cefmetazole | HD | `（無）` | `1-2 gm q48h (AD on dialysis days)` | 補 Sanford 常規與透析欄 |
| Cefmetazole | CAPD | `（無）` | `No data` | 補 Sanford 常規與透析欄 |
| Cefmetazole | CRRT | `（無）` | `No data` | 補 Sanford 常規與透析欄 |
| Cefmetazole | ver（核對狀態） | `（無）` | `1` | 補 Sanford 常規與透析欄 |
| Imipenem | 常規 | `（無）` | `Variable` | 補 Sanford 常規與透析欄 |
| Imipenem | HD | `（無）` | `If target dose 500 mg q6h: 200 mg q6h (dose AD) If target dose 1 gm q8h: 500 mg q12h (dose AD) If target dose 1 gm q6h: 500 mg q12h (dose AD)` | 補 Sanford 常規與透析欄 |
| Imipenem | CAPD | `（無）` | `No data` | 補 Sanford 常規與透析欄 |
| Imipenem | CRRT | `（無）` | `0.5-1 gm q6h (varies w/MIC, effluent rate)` | 補 Sanford 常規與透析欄 |
| Imipenem | ver（核對狀態） | `（無）` | `1` | 補 Sanford 常規與透析欄 |
| Moxifloxacin | 常規 | `（無）` | `400 mg po/IV q24h` | 補 Sanford 常規與透析欄 |
| Moxifloxacin | HD | `（無）` | `No dosage adjustment` | 補 Sanford 常規與透析欄 |
| Moxifloxacin | CAPD | `（無）` | `No dosage adjustment` | 補 Sanford 常規與透析欄 |
| Moxifloxacin | CRRT | `（無）` | `No dosage adjustment` | 補 Sanford 常規與透析欄 |
| Moxifloxacin | ver（核對狀態） | `（無）` | `1` | 補 Sanford 常規與透析欄 |
| Clindamycin | 常規 | `（無）` | `900 mg IV q8h 150-450 mg po q6h` | 補 Sanford 常規與透析欄 |
| Clindamycin | HD | `（無）` | `No dosage adjustment` | 補 Sanford 常規與透析欄 |
| Clindamycin | CAPD | `（無）` | `No dosage adjustment` | 補 Sanford 常規與透析欄 |
| Clindamycin | CRRT | `（無）` | `No dosage adjustment` | 補 Sanford 常規與透析欄 |
| Clindamycin | ver（核對狀態） | `（無）` | `1` | 補 Sanford 常規與透析欄 |
| Daptomycin | 常規 | `（無）` | `6-10 mg/kg IV q24h` | 補 Sanford 常規與透析欄 |
| Daptomycin | HD | `（無）` | `6-10 mg/kg q48h (AD); if next planned dialysis is 72 hrs away, give 9-15 mg/kg` | 補 Sanford 常規與透析欄 |
| Daptomycin | CAPD | `（無）` | `6-10 mg/kg q48h` | 補 Sanford 常規與透析欄 |
| Daptomycin | CRRT | `（無）` | `6-8 mg/kg q24h` | 補 Sanford 常規與透析欄 |
| Daptomycin | ver（核對狀態） | `（無）` | `1` | 補 Sanford 常規與透析欄 |
| Doxycycline / Minocycline | 常規 | `（無）` | `100 mg po/IV q12h` | 補 Sanford 常規與透析欄 |
| Doxycycline / Minocycline | HD | `（無）` | `No dosage adjustment` | 補 Sanford 常規與透析欄 |
| Doxycycline / Minocycline | CAPD | `（無）` | `No dosage adjustment` | 補 Sanford 常規與透析欄 |
| Doxycycline / Minocycline | CRRT | `（無）` | `No dosage adjustment` | 補 Sanford 常規與透析欄 |
| Doxycycline / Minocycline | ver（核對狀態） | `（無）` | `1` | 補 Sanford 常規與透析欄 |
| Erythromycin | 常規 | `（無）` | `250-500 mg po q6h` | 補 Sanford 常規與透析欄 |
| Erythromycin | HD | `（無）` | `No dosage adjustment` | 補 Sanford 常規與透析欄 |
| Erythromycin | CAPD | `（無）` | `No dosage adjustment` | 補 Sanford 常規與透析欄 |
| Erythromycin | CRRT | `（無）` | `No dosage adjustment` | 補 Sanford 常規與透析欄 |
| Erythromycin | ver（核對狀態） | `（無）` | `1` | 補 Sanford 常規與透析欄 |
| Fusidate sodium | 常規 | `（無）` | `500 mg po/IV q8h` | 補 Sanford 常規與透析欄 |
| Fusidate sodium | HD | `（無）` | `No data` | 補 Sanford 常規與透析欄 |
| Fusidate sodium | CAPD | `（無）` | `No data` | 補 Sanford 常規與透析欄 |
| Fusidate sodium | CRRT | `（無）` | `No data` | 補 Sanford 常規與透析欄 |
| Fusidate sodium | ver（核對狀態） | `（無）` | `1` | 補 Sanford 常規與透析欄 |
| SMZ-TMP（治療） | 常規 | `（無）` | `5-20 mg/kg/day po/IV (div q6-12h)` | 補 Sanford 常規與透析欄 |
| SMZ-TMP（治療） | HD | `（無）` | `Same as CrCl <15 (AD on dialysis days)` | 補 Sanford 常規與透析欄 |
| SMZ-TMP（治療） | CAPD | `（無）` | `Same as CrCl <15` | 補 Sanford 常規與透析欄 |
| SMZ-TMP（治療） | CRRT | `（無）` | `PJP: 15 mg/kg/day (div q8h)` | 補 Sanford 常規與透析欄 |
| SMZ-TMP（治療） | ver（核對狀態） | `（無）` | `1` | 補 Sanford 常規與透析欄 |
| SMZ-TMP（預防） | 常規 | `（無）` | `5-20 mg/kg/day po/IV (div q6-12h)` | 補 Sanford 常規與透析欄 |
| SMZ-TMP（預防） | HD | `（無）` | `Same as CrCl <15 (AD on dialysis days)` | 補 Sanford 常規與透析欄 |
| SMZ-TMP（預防） | CAPD | `（無）` | `Same as CrCl <15` | 補 Sanford 常規與透析欄 |
| SMZ-TMP（預防） | CRRT | `（無）` | `PJP: 15 mg/kg/day (div q8h)` | 補 Sanford 常規與透析欄 |
| SMZ-TMP（預防） | ver（核對狀態） | `（無）` | `1` | 補 Sanford 常規與透析欄 |
| Tigecycline | 常規 | `（無）` | `100 mg, then 50 mg IV q12h` | 補 Sanford 常規與透析欄 |
| Tigecycline | HD | `（無）` | `No dosage adjustment` | 補 Sanford 常規與透析欄 |
| Tigecycline | CAPD | `（無）` | `No dosage adjustment` | 補 Sanford 常規與透析欄 |
| Tigecycline | CRRT | `（無）` | `No dosage adjustment` | 補 Sanford 常規與透析欄 |
| Tigecycline | ver（核對狀態） | `（無）` | `1` | 補 Sanford 常規與透析欄 |
| Amphotericin B | 常規 | `（無）` | `0.3-1.0 mg/kg/day (deoxycholate) 3-5 mg/kg/day (liposomal)` | 補 Sanford 常規與透析欄 |
| Amphotericin B | HD | `（無）` | `No dosage adjustment` | 補 Sanford 常規與透析欄 |
| Amphotericin B | CAPD | `（無）` | `No dosage adjustment` | 補 Sanford 常規與透析欄 |
| Amphotericin B | CRRT | `（無）` | `No dosage adjustment` | 補 Sanford 常規與透析欄 |
| Amphotericin B | ver（核對狀態） | `（無）` | `1` | 補 Sanford 常規與透析欄 |
| Lamivudine | 常規 | `（無）` | `300 mg po q24h (HIV dose)` | 補 Sanford 常規與透析欄 |
| Lamivudine | HD | `（無）` | `25-50 mg q24h (dose AD on dialysis days) (HIV)` | 補 Sanford 常規與透析欄 |
| Lamivudine | CAPD | `（無）` | `25-50 mg po q24h (HIV)` | 補 Sanford 常規與透析欄 |
| Lamivudine | CRRT | `（無）` | `100 mg first day, then 50 mg q24h (HIV)` | 補 Sanford 常規與透析欄 |
| Lamivudine | ver（核對狀態） | `（無）` | `1` | 補 Sanford 常規與透析欄 |
| Amikacin / Streptomycin（TB） | 常規 | `（無）` | `Streptomycin: 15 mg/kg (max 1 gm) IM q24h` | 補 Sanford 常規與透析欄（取 Streptomycin） |
| Amikacin / Streptomycin（TB） | HD | `（無）` | `Streptomycin: 15 mg/kg q72-96h (+ extra 7.5 mg/kg AD)` | 補 Sanford 常規與透析欄（取 Streptomycin） |
| Amikacin / Streptomycin（TB） | CAPD | `（無）` | `Streptomycin: 20-40 mg lost per L of dialysate/day` | 補 Sanford 常規與透析欄（取 Streptomycin） |
| Amikacin / Streptomycin（TB） | CRRT | `（無）` | `Streptomycin: 15 mg/kg q24-72h` | 補 Sanford 常規與透析欄（取 Streptomycin） |
| Amikacin / Streptomycin（TB） | ver（核對狀態） | `（無）` | `1` | 補 Sanford 常規與透析欄（取 Streptomycin） |
| Isoniazid / Rifampin | 常規 | `（無）` | `INH: 5 mg/kg po q24h; RIF: 600 mg po q24h` | 補 Sanford 常規與透析欄（合併列，逐藥標示） |
| Isoniazid / Rifampin | HD | `（無）` | `INH: No dosage adjustment (administer AD on dialysis days); RIF: 300-600 mg q24h` | 補 Sanford 常規與透析欄（合併列，逐藥標示） |
| Isoniazid / Rifampin | CAPD | `（無）` | `INH: No dosage adjustment; RIF: 300-600 mg q24h` | 補 Sanford 常規與透析欄（合併列，逐藥標示） |
| Isoniazid / Rifampin | CRRT | `（無）` | `INH: No dosage adjustment; RIF: 300-600 mg q24h` | 補 Sanford 常規與透析欄（合併列，逐藥標示） |
| Isoniazid / Rifampin | ver（核對狀態） | `（無）` | `1` | 補 Sanford 常規與透析欄（合併列，逐藥標示） |
| Nevirapine / Efavirenz / Ritonavir | 常規 | `（無）` | `NVP: 200 mg po q12h; EFV: 600 mg po q24h; RTV: Used as booster (dosage varies)` | 補 Sanford 常規與透析欄（合併列，逐藥標示） |
| Nevirapine / Efavirenz / Ritonavir | HD | `（無）` | `NVP: Give extra 200 mg AD; EFV: No data; RTV: No data` | 補 Sanford 常規與透析欄（合併列，逐藥標示） |
| Nevirapine / Efavirenz / Ritonavir | CAPD | `（無）` | `No data` | 補 Sanford 常規與透析欄（合併列，逐藥標示） |
| Nevirapine / Efavirenz / Ritonavir | CRRT | `（無）` | `No data` | 補 Sanford 常規與透析欄（合併列，逐藥標示） |
| Nevirapine / Efavirenz / Ritonavir | ver（核對狀態） | `（無）` | `1` | 補 Sanford 常規與透析欄（合併列，逐藥標示） |
| Acyclovir（PO）VZV | 常規 | `（無）` | `800 mg po q4h (5x/day)` | 補 Sanford 常規與透析欄（Acyclovir 口服部分） |
| Acyclovir（PO）VZV | HD | `（無）` | `800 mg po q12h (give extra dose AD)` | 補 Sanford 常規與透析欄（Acyclovir 口服部分） |
| Acyclovir（PO）VZV | CAPD | `（無）` | `800 mg po q12h` | 補 Sanford 常規與透析欄（Acyclovir 口服部分） |
| Acyclovir（PO）VZV | CRRT | `（無）` | `No data` | 補 Sanford 常規與透析欄（Acyclovir 口服部分） |
| Acyclovir（PO）VZV | ver（核對狀態） | `（無）` | `1` | 補 Sanford 常規與透析欄（Acyclovir 口服部分） |
| Valganciclovir（誘導） | 常規 | `（無）` | `900 mg po q12h` | 補 Sanford 常規與透析欄 |
| Valganciclovir（誘導） | HD | `（無）` | `Not recommended` | 補 Sanford 常規與透析欄 |
| Valganciclovir（誘導） | CAPD | `（無）` | `No data` | 補 Sanford 常規與透析欄 |
| Valganciclovir（誘導） | CRRT | `（無）` | `No data` | 補 Sanford 常規與透析欄 |
| Valganciclovir（誘導） | ver（核對狀態） | `（無）` | `1` | 補 Sanford 常規與透析欄 |
| Valganciclovir（維持） | 常規 | `（無）` | `900 mg po q24h` | 補 Sanford 常規與透析欄 |
| Valganciclovir（維持） | HD | `（無）` | `Not recommended` | 補 Sanford 常規與透析欄 |
| Valganciclovir（維持） | CAPD | `（無）` | `No data` | 補 Sanford 常規與透析欄 |
| Valganciclovir（維持） | CRRT | `（無）` | `CVVHD: 450 mg q24h` | 補 Sanford 常規與透析欄 |
| Valganciclovir（維持） | ver（核對狀態） | `（無）` | `1` | 補 Sanford 常規與透析欄 |
| Amphotericin B | 肥胖 | `（無）` | `Liposomal: Use adjusted BW, but consider actual BW if critically ill` | 補 Sanford 肥胖註記 |
| Fosfomycin（IV） | GFR >50 | `Ccr20–40：bid` | `N` | GFR 欄改用 Sanford 分段（原綠卡條件放錯欄） |
| Fosfomycin（IV） | GFR 10–50 | `Ccr10–20：q24h` | `Ccr>40：N／Ccr31–40：70%／Ccr21–30：60%／Ccr11–20：40%（分 q8–12h）` | GFR 欄改用 Sanford 分段（原綠卡條件放錯欄） |
| Fosfomycin（IV） | GFR <10 | `q48h；HD：50–100% after HD` | `Ccr≤10：20%（分 q12–24h）` | GFR 欄改用 Sanford 分段（原綠卡條件放錯欄） |
| Fosfomycin（IV） | 備註 | `Nottingham Univ. Hospital` | `Sanford（非美國劑型）：% 指正常一天總劑量的百分比；首劑加倍（最多 8 g）` | GFR 欄改用 Sanford 分段（原綠卡條件放錯欄） |
| Telbivudine | GFR >50 | `Ccr30–49：q48h` | `N` | GFR 欄改用 Sanford 分段（原綠卡條件放錯欄） |
| Telbivudine | GFR 10–50 | `Ccr<30：q72h` | `Ccr30–49：600 mg q48h／Ccr10–30：600 mg q72h` | GFR 欄改用 Sanford 分段（原綠卡條件放錯欄） |
| Telbivudine | GFR <10 | `q96h` | `600 mg q96h` | GFR 欄改用 Sanford 分段（原綠卡條件放錯欄） |
| Emtricitabine | GFR >50 | `Ccr30–49：q48h` | `N` | GFR 欄改用 Sanford 分段（原綠卡條件放錯欄） |
| Emtricitabine | GFR 10–50 | `Ccr<30：q72h` | `Ccr30–49：200 mg q48h／Ccr10–29：200 mg q72h` | GFR 欄改用 Sanford 分段（原綠卡條件放錯欄） |
| Emtricitabine | GFR <10 | `q96h` | `200 mg q96h` | GFR 欄改用 Sanford 分段（原綠卡條件放錯欄） |
| Emtricitabine | 備註 | `` | `膠囊劑量（口服液不同）` | GFR 欄改用 Sanford 分段（原綠卡條件放錯欄） |
| Emtricitabine | 常規 | `（無）` | `200 mg po q24h` | 補 Sanford 常規與透析欄（膠囊） |
| Emtricitabine | HD | `（無）` | `200 mg q96h` | 補 Sanford 常規與透析欄（膠囊） |
| Emtricitabine | CAPD | `（無）` | `No data` | 補 Sanford 常規與透析欄（膠囊） |
| Emtricitabine | CRRT | `（無）` | `No data` | 補 Sanford 常規與透析欄（膠囊） |
| Emtricitabine | ver（核對狀態） | `（無）` | `1` | 補 Sanford 常規與透析欄（膠囊） |
| Tenofovir | GFR >50 | `Ccr30–49：q48h` | `N` | GFR 欄改用 Sanford 分段（原綠卡條件放錯欄） |
| Tenofovir | GFR 10–50 | `Ccr<30：q72–96h` | `Ccr30–49：300 mg q48h／Ccr10–29：300 mg q72–96h` | GFR 欄改用 Sanford 分段（原綠卡條件放錯欄） |
| Tenofovir | 備註 | `HD：q7d` | `` | HD 劑量改放透析欄 |
| Tenofovir | 常規 | `（無）` | `300 mg po q24h` | 補 Sanford 常規與透析欄 |
| Tenofovir | HD | `（無）` | `300 mg after every 3rd dialysis, or q7 days if no dialysis` | 補 Sanford 常規與透析欄 |
| Tenofovir | CAPD | `（無）` | `No data` | 補 Sanford 常規與透析欄 |
| Tenofovir | CRRT | `（無）` | `No data` | 補 Sanford 常規與透析欄 |
| Tenofovir | ver（核對狀態） | `（無）` | `1` | 補 Sanford 常規與透析欄 |
| Tenofovir | 商品名 | `["Atripla","Biktarvy","Complera","Delstrigo","Odefsey","Symtuza","Tenof","Truvada","Vemlidy","Viread"]` | `["Atripla","Complera","Delstrigo","Tenof","Truvada","Viread"]` | TAF 商品名移到 TAF 列 |
| Tenofovir | 院內規格 | `{"tab":["25mg","300mg"]}` | `{"tab":["300mg"]}` | 25mg 為 TAF（Vemlidy），移到 TAF 列 |
| Tenofovir | 藥名 | `Tenofovir` | `Tenofovir（TDF）` | 標明為 TDF，與 TAF 區分 |
| Tenofovir alafenamide（TAF） | （新增列） | `（無）` | `{"name":"Tenofovir alafenamide（TAF）","route":"?","g50":"N","g1050":"Ccr≥15：N／Ccr<15：A（未透析）","g10":"A（未透析）；HD：N","comment":"Sanford；複方錠（Biktarvy 等）另有腎功能限制","brands":["Biktarvy","Odefsey","Symtuza","Vemlidy"],"nd":"25 mg po q24h","hd":"No dosage adjustment (dose AD on dialysis days)","capd":"No data","crrt":"No data","ver":1,"unit":{"tab":["25mg"]}}` | 新增 TAF 列（Sanford） |
| Terbinafine | 備註 | `` | `Sanford：Ccr≤50 No data` | 補 Sanford 說明（保留綠卡 ? 或 A） |
| Colistin / Colimycin（維持劑量・參考 A） | （刪除列） | `{"name":"Colistin / Colimycin（維持劑量・參考 A）","route":"R","g50":"N","g1050":"Ccr20–40：2–3 MU q12h／Ccr10–19：2 MU q12h","g10":"1 MU q12h","comment":"*CRRT 膜會吸附；CRRT：4.5 MU q12–8h","unit":{"vial":["2MU"]}}` | `（併入 Colistin / Colimycin（mg CBA））` | Colistin 改用 Sanford（選項 a） |
| Colistin / Colimycin（維持劑量・參考 B） | （刪除列） | `{"name":"Colistin / Colimycin（維持劑量・參考 B）","route":"R","g50":"N","g1050":"4.5 MU q24h","g10":"2–2.5 MU q24h","comment":"CRRT：2–3 MU q8h","unit":{"vial":["2MU"]}}` | `（併入 Colistin / Colimycin（mg CBA））` | Colistin 改用 Sanford（選項 a） |
| Colistin / Colimycin（mg CBA） | （新增列） | `（無）` | `{"name":"Colistin / Colimycin（mg CBA）","route":"R","g50":"Ccr≥90：180 mg q12h／Ccr80–89：170 mg q12h／Ccr70–79：150 mg q12h／Ccr60–69：137.5 mg q12h／Ccr50–59：122.5 mg q12h","g1050":"Ccr40–49：110 mg q12h／Ccr30–39：97.5 mg q12h／Ccr20–29：87.5 mg q12h／Ccr10–19：80 mg q12h","g10":"Ccr5–9：72.5 mg q12h／Ccr<5：65 mg q12h","comment":"Sanford：劑量以 mg CBA 計，與 MU 換算請依院內藥典；Load 4 × 體重（kg）mg CBA","nd":"Load: 4 x (wt in kg) Maintenance: 180 mg q12h","hd":"Non-HD days: give 65 mg IV q12h. HD days: give supplemental dose of 40-50 mg after a 3-4 hr session. Give this supplement with the next regular dose after the dialysis has ended.","capd":"No data","crrt":"220 mg q12h","ver":1,"unit":{"vial":["2MU"]}}` | Colistin 改用 Sanford（選項 a） |

</details>

### 0.4 第四輪：GFR 欄寫滿整欄（Kiwi 2026-11-02 確認）（42 處）

- A 類 9 列：Sanford 與綠卡意思一致，把隔壁欄或隱含的部分寫進本欄。Daptomycin 刪除 <10 欄「或 9 mg/kg q72h」與備註「CRRT：8 mg/kg q48h」，改以 Sanford 透析欄為準。
- B 類 9 列：改用 Sanford 分段與劑量；原本以百分比表示者保留 %，括號附 Sanford 劑量（如 50%（150 mg）q24h）。
- C 類 5 列（Levofloxacin 500mg、Amoxicillin-clav 875mg tab、Ampicillin/sulbactam 高劑量、Amikacin / Streptomycin（TB）、Nitroxoline）依 Kiwi 指示維持高醫原版，仍列為已知問題。
- 只缺 CrCl 50 或 10 一個點的格子屬於分段邊界差異，不改。

<details><summary>逐項變更（42 處，點開看明細）</summary>

| 藥名 | 欄位 | 修改前 | 修改後 | 原因 |
| --- | --- | --- | --- | --- |
| Ampicillin | GFR 10–50 | `Ccr<30：q12h` | `Ccr30–50：1–2 g q6–8h／Ccr10–29：1–2 g q8–12h` | A 類：照 Sanford 寫清楚（意思與綠卡一致） |
| Ampicillin | GFR <10 | `q12–24h` | `1–2 g q12–24h` | A 類：照 Sanford 寫清楚（意思與綠卡一致） |
| Ampicillin/sulbactam | GFR 10–50 | `Ccr<30：q12h` | `Ccr30–50：N／Ccr15–29：1.5–3 g q12h／Ccr10–14：1.5–3 g q24h` | A 類：照 Sanford 寫清楚（意思與綠卡一致） |
| Ampicillin/sulbactam | GFR <10 | `q24h` | `1.5–3 g q24h（Sanford 未列 <5）` | A 類：照 Sanford 寫清楚（意思與綠卡一致） |
| Piperacillin-tazobactam（non-Pseudomonas） | GFR 10–50 | `Ccr<20：q8h` | `Ccr41–50：N／Ccr20–40：2.25 g q6h／Ccr10–19：2.25 g q8h` | A 類：照 Sanford 寫清楚（意思與綠卡一致） |
| Piperacillin-tazobactam（non-Pseudomonas） | GFR <10 | `2.25 g q8–12h` | `2.25 g q8h` | A 類：照 Sanford 寫清楚（意思與綠卡一致） |
| Piperacillin-tazobactam（non-Pseudomonas） | 備註 | `` | `Sanford：間歇輸注、非院內肺炎` | A 類：照 Sanford 寫清楚（意思與綠卡一致） |
| Cephalexin | GFR 10–50 | `Ccr≤40：q8–12h` | `250–1000 mg q8–12h` | A 類：照 Sanford 寫清楚（意思與綠卡一致） |
| Cephalexin | GFR <10 | `q12–24h` | `250–1000 mg q24–48h` | A 類：照 Sanford 寫清楚（意思與綠卡一致） |
| Ertapenem | GFR 10–50 | `Ccr<30：50%` | `Ccr31–50：N／Ccr10–30：50%（500 mg）q24h` | A 類：照 Sanford 寫清楚（意思與綠卡一致） |
| Ertapenem | GFR <10 | `50%` | `50%（500 mg）q24h` | A 類：照 Sanford 寫清楚（意思與綠卡一致） |
| Ertapenem | 備註 | `` | `Sanford 以 mL/min/1.73 m² 計` | A 類：照 Sanford 寫清楚（意思與綠卡一致） |
| Gemifloxacin | GFR 10–50 | `Ccr≤40：160 mg q24h` | `160 mg q24h` | A 類：照 Sanford 寫清楚（意思與綠卡一致） |
| Daptomycin | GFR 10–50 | `Ccr<30：q48h` | `Ccr30–50：N／Ccr10–29：6–10 mg/kg q48h` | A 類：照 Sanford 寫清楚（意思與綠卡一致） |
| Daptomycin | GFR <10 | `q48h 或 9 mg/kg q72h` | `6–10 mg/kg q48h` | A 類：照 Sanford 寫清楚（意思與綠卡一致） |
| Daptomycin | 備註 | `CRRT：8 mg/kg q48h` | `` | A 類：照 Sanford 寫清楚（意思與綠卡一致） |
| Levofloxacin 750mg | GFR 10–50 | `Ccr≥20：750 mg q48h` | `Ccr20–49：750 mg q48h／Ccr10–19：750 mg×1，之後 500 mg q48h` | A 類：照 Sanford 寫清楚（意思與綠卡一致） |
| Ganciclovir（誘導） | GFR >50 | `Ccr50–69：50% q12h` | `Ccr≥70：N／Ccr50–69：50%（2.5 mg/kg）q12h` | A 類：照 Sanford 寫清楚（意思與綠卡一致） |
| Ganciclovir（誘導） | GFR 10–50 | `Ccr25–49：50% q24h／Ccr10–24：25% q24h` | `Ccr25–49：50%（2.5 mg/kg）q24h／Ccr10–24：25%（1.25 mg/kg）q24h` | A 類：照 Sanford 寫清楚（意思與綠卡一致） |
| Rifabutin | GFR 10–50 | `Ccr<30：50%` | `50%（150 mg）q24h` | B 類：改用 Sanford（原為百分比者保留 %，括號附 Sanford 劑量） |
| Rifabutin | GFR <10 | `Ccr<30：50%` | `50%（150 mg）q24h` | B 類：改用 Sanford（原為百分比者保留 %，括號附 Sanford 劑量） |
| Cefixime | GFR >50 | `N` | `Ccr≥60：N／Ccr51–59：260 mg q24h（懸液）` | B 類：改用 Sanford（原為百分比者保留 %，括號附 Sanford 劑量） |
| Cefixime | GFR 10–50 | `Ccr>20：75%` | `Ccr21–50：260 mg q24h（懸液）／Ccr10–20：50%（200 mg）q24h` | B 類：改用 Sanford（原為百分比者保留 %，括號附 Sanford 劑量） |
| Cefixime | GFR <10 | `Ccr<20：50%` | `50%（200 mg）q24h` | B 類：改用 Sanford（原為百分比者保留 %，括號附 Sanford 劑量） |
| Ceftibuten | GFR >50 | `q24h` | `N` | B 類：改用 Sanford（原為百分比者保留 %，括號附 Sanford 劑量） |
| Ceftibuten | GFR 10–50 | `Ccr≥30：50%` | `50%（200 mg）q24h` | B 類：改用 Sanford（原為百分比者保留 %，括號附 Sanford 劑量） |
| Ceftibuten | GFR <10 | `Ccr<30：50%` | `25%（100 mg）q24h` | B 類：改用 Sanford（原為百分比者保留 %，括號附 Sanford 劑量） |
| Ganciclovir（維持） | GFR >50 | `Ccr50–69：50% q24h` | `Ccr>90：N／Ccr51–90：50–100%（2.5–5 mg/kg）q24h` | B 類：改用 Sanford（原為百分比者保留 %，括號附 Sanford 劑量） |
| Ganciclovir（維持） | GFR 10–50 | `Ccr25–49：25% q24h／Ccr<25：0.625 mg/kg q24h` | `12.5–25%（0.625–1.25 mg/kg）q24h` | B 類：改用 Sanford（原為百分比者保留 %，括號附 Sanford 劑量） |
| Valganciclovir（誘導） | GFR >50 | `Ccr50–69：50% q12h` | `Ccr≥60：N／Ccr51–59：50%（450 mg）q12h` | B 類：改用 Sanford（原為百分比者保留 %，括號附 Sanford 劑量） |
| Valganciclovir（誘導） | GFR 10–50 | `Ccr25–49：50% q24h／Ccr10–24：50% q48h` | `Ccr40–50：50%（450 mg）q12h／Ccr25–39：50%（450 mg）q24h／Ccr10–24：50%（450 mg）q48h` | B 類：改用 Sanford（原為百分比者保留 %，括號附 Sanford 劑量） |
| Valganciclovir（誘導） | GFR <10 | `A 或 50% q48h` | `A` | B 類：改用 Sanford（原為百分比者保留 %，括號附 Sanford 劑量） |
| Valganciclovir（維持） | GFR >50 | `Ccr50–69：50% q24h` | `Ccr≥60：N／Ccr51–59：50%（450 mg）q24h` | B 類：改用 Sanford（原為百分比者保留 %，括號附 Sanford 劑量） |
| Valganciclovir（維持） | GFR 10–50 | `Ccr25–49：50% q48h／Ccr<25：50% biw` | `Ccr40–50：50%（450 mg）q24h／Ccr25–39：50%（450 mg）q48h／Ccr10–24：50%（450 mg）biw` | B 類：改用 Sanford（原為百分比者保留 %，括號附 Sanford 劑量） |
| Valganciclovir（維持） | GFR <10 | `A 或 50% biw` | `A` | B 類：改用 Sanford（原為百分比者保留 %，括號附 Sanford 劑量） |
| SMZ-TMP（治療） | GFR 10–50 | `Ccr<30：50%` | `Ccr31–50：N／Ccr15–30：50%（分 q12–24h）／Ccr10–14：25–50%（分 q24h）` | B 類：改用 Sanford（原為百分比者保留 %，括號附 Sanford 劑量） |
| SMZ-TMP（治療） | GFR <10 | `A 或 5–10 mg/kg/day（一次或分次）` | `25–50%（分 q24h）` | B 類：改用 Sanford（原為百分比者保留 %，括號附 Sanford 劑量） |
| Cefoperazone/sulbactam | GFR 10–50 | `Ccr≤30：2–4 g q12h` | `Ccr31–50：N／Ccr15–30：sulbactam 1 g q12h／Ccr10–14：sulbactam 500 mg q12h` | B 類：改用 Sanford（原為百分比者保留 %，括號附 Sanford 劑量） |
| Cefoperazone/sulbactam | GFR <10 | `CRRT：2 g q6h` | `sulbactam 500 mg q12h` | B 類：改用 Sanford（原為百分比者保留 %，括號附 Sanford 劑量） |
| Cefoperazone/sulbactam | 備註 | `R 指 sulbactam；cefoperazone 主要經膽道排除` | `R 指 sulbactam；cefoperazone 主要經膽道排除。Sanford 劑量以 sulbactam 成分計` | B 類：改用 Sanford（原為百分比者保留 %，括號附 Sanford 劑量） |
| Amoxicillin-clavulanate（PO/IV） | GFR 10–50 | `Ccr<30：q12h` | `Ccr31–50：N／Ccr10–30：PO 250–500 mg q12h；IV 1 g×1，之後 500 mg q12h` | B 類：改用 Sanford（原為百分比者保留 %，括號附 Sanford 劑量） |
| Amoxicillin-clavulanate（PO/IV） | GFR <10 | `q24h` | `PO 250–500 mg q24h；IV 1 g×1，之後 500 mg q24h` | B 類：改用 Sanford（原為百分比者保留 %，括號附 Sanford 劑量） |

</details>

## 1. 結構問題清單

下表是檢查腳本找到的所有結構問題（不含單位寫法，單位寫法見第 3 節）。

### GFR 欄內的 CrCl 條件涵蓋整欄（例如 10–50 欄只寫 Ccr>20，10–20 要去別欄找）（14 項）

格子裡寫了 CrCl 條件，但條件沒有涵蓋整欄。例如 Cefixime 10–50 欄只寫「Ccr>20：75%」，CrCl 10–20 的答案其實寫在 <10 欄的「Ccr<20：50%」；病人 CrCl 15 時頁面高亮的是 10–50 那格，容易看錯。只缺「50」或「10」一個點的，多半是 Sanford 分段（>50／30–49）和頁面分段（10–50 含 50）的邊界差異。

| 藥名 | 欄位 | 問題描述 |
| --- | --- | --- |
| Amikacin / Streptomycin（TB） | GFR 10–50 | 「10–50」欄只寫了 Ccr<30，本欄 CrCl 30–50 沒有對應寫法 |
| Amoxicillin-clav 875mg tab（PO） | GFR 10–50 | 「10–50」欄只寫了 Ccr<15，本欄 CrCl 15–50 沒有對應寫法 |
| Amoxicillin-clav 875mg tab（PO） | GFR <10 | 「<10」欄只寫了 Ccr<5，本欄 CrCl 5–9 沒有對應寫法 |
| Ampicillin/sulbactam — Acinetobacter / E. faecalis（高劑量） | GFR 10–50 | 「10–50」欄只寫了 Ccr<30，本欄 CrCl 30–50 沒有對應寫法 |
| Levofloxacin 750mg | GFR 10–50 | 「10–50」欄只寫了 Ccr20–49、Ccr10–19，本欄 CrCl 50 沒有對應寫法 |
| Levofloxacin 500mg | GFR 10–50 | 「10–50」欄只寫了 Ccr≥20，本欄 CrCl 10–19 沒有對應寫法 |
| Colistin / Colimycin（mg CBA） | GFR 10–50 | 「10–50」欄只寫了 Ccr40–49、Ccr30–39、Ccr20–29、Ccr10–19，本欄 CrCl 50 沒有對應寫法 |
| Fosfomycin（IV） | GFR 10–50 | 「10–50」欄只寫了 Ccr>40、Ccr31–40、Ccr21–30、Ccr11–20，本欄 CrCl 10 沒有對應寫法 |
| Nitroxoline | GFR 10–50 | 「10–50」欄只寫了 Ccr<20，本欄 CrCl 20–50 沒有對應寫法 |
| Entecavir | GFR 10–50 | 「10–50」欄只寫了 Ccr30–49、Ccr<30，本欄 CrCl 50 沒有對應寫法 |
| Ganciclovir（誘導） | GFR 10–50 | 「10–50」欄只寫了 Ccr25–49、Ccr10–24，本欄 CrCl 50 沒有對應寫法 |
| Telbivudine | GFR 10–50 | 「10–50」欄只寫了 Ccr30–49、Ccr10–30，本欄 CrCl 50 沒有對應寫法 |
| Tenofovir（TDF） | GFR 10–50 | 「10–50」欄只寫了 Ccr30–49、Ccr10–29，本欄 CrCl 50 沒有對應寫法 |
| Emtricitabine | GFR 10–50 | 「10–50」欄只寫了 Ccr30–49、Ccr10–29，本欄 CrCl 50 沒有對應寫法 |

### 透析欄位（HD／CAPD／CRRT）齊全或明確標示無資料（6 項）

這些藥沒有任何透析欄位，頁面顯示「—」。圖例已說明「—」＝原書未列此藥透析劑量、不代表不需調整，所以**不是缺漏錯誤**；只是不像其他 54 列那樣明確寫出「No data」。是否補上「No data」或 Sanford 資料，需人工決定。

| 藥名 | 欄位 | 問題描述 |
| --- | --- | --- |
| Mezlocillin | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Ticarcillin-clavulanate | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Cephradine（0.25–1g q6h） | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Flomoxef | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Nitroxoline | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |
| Acyclovir（PO）HSV | hd/capd/crrt | 三個透析欄位都沒有，頁面顯示「—」；未明確寫出「No data」 |

### GFR 欄內 CrCl 條件總表（供核對參考）

GFR 三欄的分段為 `>50`、`10–50`、`<10`（頁面先把 CrCl 四捨五入成整數再分段，50 屬於 10–50 欄、10 屬於 10–50 欄）。meta.bands 與 `index.html` 的 `bandForCrCl()` 一致，分段連續、不重疊、沒有缺口。

下表列出格子內另外寫了 CrCl 條件的所有地方，以及條件和該欄範圍的關係。「部分超出」很常見（例如 10–50 欄寫「Ccr<30」，代表只有 <30 才調整），只是提醒；「完全不在欄位範圍內」已列在上方問題清單。

| 藥名 | 欄 | 格子原文 | 條件 | 條件範圍（整數 CrCl） | 與欄位範圍關係 |
| --- | --- | --- | --- | --- | --- |
| Amikacin / Streptomycin（TB） | 10–50 | `Ccr<30 或 HD：15 mg/kg biw–tiw` | `Ccr<30` | ≤29 | **部分超出欄位範圍** |
| Amikacin / Streptomycin（TB） | <10 | `Ccr<30 或 HD：15 mg/kg biw–tiw` | `Ccr<30` | ≤29 | **部分超出欄位範圍** |
| Amoxicillin-clavulanate（PO/IV） | 10–50 | `Ccr31–50：N／Ccr10–30：PO 250–500 mg q12h；IV 1 g×1，之後 500 mg q12h` | `Ccr31–50` | 31–50 | 在欄位範圍內 |
| Amoxicillin-clavulanate（PO/IV） | 10–50 | `Ccr31–50：N／Ccr10–30：PO 250–500 mg q12h；IV 1 g×1，之後 500 mg q12h` | `Ccr10–30` | 10–30 | 在欄位範圍內 |
| Amoxicillin-clav 875mg tab（PO） | 10–50 | `Ccr<15：q24h` | `Ccr<15` | ≤14 | **部分超出欄位範圍** |
| Amoxicillin-clav 875mg tab（PO） | <10 | `Ccr<5：50% q24h` | `Ccr<5` | ≤4 | 在欄位範圍內 |
| Ampicillin | 10–50 | `Ccr30–50：1–2 g q6–8h／Ccr10–29：1–2 g q8–12h` | `Ccr30–50` | 30–50 | 在欄位範圍內 |
| Ampicillin | 10–50 | `Ccr30–50：1–2 g q6–8h／Ccr10–29：1–2 g q8–12h` | `Ccr10–29` | 10–29 | 在欄位範圍內 |
| Ampicillin/sulbactam | 10–50 | `Ccr30–50：N／Ccr15–29：1.5–3 g q12h／Ccr10–14：1.5–3 g q24h` | `Ccr30–50` | 30–50 | 在欄位範圍內 |
| Ampicillin/sulbactam | 10–50 | `Ccr30–50：N／Ccr15–29：1.5–3 g q12h／Ccr10–14：1.5–3 g q24h` | `Ccr15–29` | 15–29 | 在欄位範圍內 |
| Ampicillin/sulbactam | 10–50 | `Ccr30–50：N／Ccr15–29：1.5–3 g q12h／Ccr10–14：1.5–3 g q24h` | `Ccr10–14` | 10–14 | 在欄位範圍內 |
| Ampicillin/sulbactam — Acinetobacter / E. faecalis（高劑量） | 10–50 | `Ccr<30：6 g q12h` | `Ccr<30` | ≤29 | **部分超出欄位範圍** |
| Piperacillin-tazobactam（non-Pseudomonas） | 10–50 | `Ccr41–50：N／Ccr20–40：2.25 g q6h／Ccr10–19：2.25 g q8h` | `Ccr41–50` | 41–50 | 在欄位範圍內 |
| Piperacillin-tazobactam（non-Pseudomonas） | 10–50 | `Ccr41–50：N／Ccr20–40：2.25 g q6h／Ccr10–19：2.25 g q8h` | `Ccr20–40` | 20–40 | 在欄位範圍內 |
| Piperacillin-tazobactam（non-Pseudomonas） | 10–50 | `Ccr41–50：N／Ccr20–40：2.25 g q6h／Ccr10–19：2.25 g q8h` | `Ccr10–19` | 10–19 | 在欄位範圍內 |
| Piperacillin-tazobactam（Pseudomonas） | 10–50 | `Ccr40–50：4.5 g q6h；20–40：3.375 g q6h；<20：2.25 g q6h` | `Ccr40–50` | 40–50 | 在欄位範圍內 |
| Piperacillin-tazobactam（Pseudomonas） | 10–50 | `Ccr40–50：4.5 g q6h；20–40：3.375 g q6h；<20：2.25 g q6h` | `20–40` | 20–40 | 在欄位範圍內 |
| Piperacillin-tazobactam（Pseudomonas） | 10–50 | `Ccr40–50：4.5 g q6h；20–40：3.375 g q6h；<20：2.25 g q6h` | `<20` | ≤19 | **部分超出欄位範圍** |
| Cefixime | >50 | `Ccr≥60：N／Ccr51–59：260 mg q24h（懸液）` | `Ccr≥60` | ≥60 | 在欄位範圍內 |
| Cefixime | >50 | `Ccr≥60：N／Ccr51–59：260 mg q24h（懸液）` | `Ccr51–59` | 51–59 | 在欄位範圍內 |
| Cefixime | 10–50 | `Ccr21–50：260 mg q24h（懸液）／Ccr10–20：50%（200 mg）q24h` | `Ccr21–50` | 21–50 | 在欄位範圍內 |
| Cefixime | 10–50 | `Ccr21–50：260 mg q24h（懸液）／Ccr10–20：50%（200 mg）q24h` | `Ccr10–20` | 10–20 | 在欄位範圍內 |
| Cefoperazone/sulbactam | 10–50 | `Ccr31–50：N／Ccr15–30：sulbactam 1 g q12h／Ccr10–14：sulbactam 500 mg q12h` | `Ccr31–50` | 31–50 | 在欄位範圍內 |
| Cefoperazone/sulbactam | 10–50 | `Ccr31–50：N／Ccr15–30：sulbactam 1 g q12h／Ccr10–14：sulbactam 500 mg q12h` | `Ccr15–30` | 15–30 | 在欄位範圍內 |
| Cefoperazone/sulbactam | 10–50 | `Ccr31–50：N／Ccr15–30：sulbactam 1 g q12h／Ccr10–14：sulbactam 500 mg q12h` | `Ccr10–14` | 10–14 | 在欄位範圍內 |
| Doripenem | 10–50 | `Ccr30–50：0.25 g q8h／Ccr<30：0.25 g q12h` | `Ccr30–50` | 30–50 | 在欄位範圍內 |
| Doripenem | 10–50 | `Ccr30–50：0.25 g q8h／Ccr<30：0.25 g q12h` | `Ccr<30` | ≤29 | **部分超出欄位範圍** |
| Ertapenem | 10–50 | `Ccr31–50：N／Ccr10–30：50%（500 mg）q24h` | `Ccr31–50` | 31–50 | 在欄位範圍內 |
| Ertapenem | 10–50 | `Ccr31–50：N／Ccr10–30：50%（500 mg）q24h` | `Ccr10–30` | 10–30 | 在欄位範圍內 |
| Levofloxacin 750mg | 10–50 | `Ccr20–49：750 mg q48h／Ccr10–19：750 mg×1，之後 500 mg q48h` | `Ccr20–49` | 20–49 | 在欄位範圍內 |
| Levofloxacin 750mg | 10–50 | `Ccr20–49：750 mg q48h／Ccr10–19：750 mg×1，之後 500 mg q48h` | `Ccr10–19` | 10–19 | 在欄位範圍內 |
| Levofloxacin 750mg | <10 | `Ccr<20：750 mg×1，之後 500 mg q48h` | `Ccr<20` | ≤19 | **部分超出欄位範圍** |
| Levofloxacin 500mg | 10–50 | `Ccr≥20：500 mg q48h` | `Ccr≥20` | ≥20 | **部分超出欄位範圍** |
| Levofloxacin 500mg | <10 | `Ccr<20：500 mg×1，之後 250 mg q48h` | `Ccr<20` | ≤19 | **部分超出欄位範圍** |
| Colistin / Colimycin（mg CBA） | >50 | `Ccr≥90：180 mg q12h／Ccr80–89：170 mg q12h／Ccr70–79：150 mg q12h／Ccr60–69：137.5 mg q12h／Ccr50–59：122.5 mg q12h` | `Ccr≥90` | ≥90 | 在欄位範圍內 |
| Colistin / Colimycin（mg CBA） | >50 | `Ccr≥90：180 mg q12h／Ccr80–89：170 mg q12h／Ccr70–79：150 mg q12h／Ccr60–69：137.5 mg q12h／Ccr50–59：122.5 mg q12h` | `Ccr80–89` | 80–89 | 在欄位範圍內 |
| Colistin / Colimycin（mg CBA） | >50 | `Ccr≥90：180 mg q12h／Ccr80–89：170 mg q12h／Ccr70–79：150 mg q12h／Ccr60–69：137.5 mg q12h／Ccr50–59：122.5 mg q12h` | `Ccr70–79` | 70–79 | 在欄位範圍內 |
| Colistin / Colimycin（mg CBA） | >50 | `Ccr≥90：180 mg q12h／Ccr80–89：170 mg q12h／Ccr70–79：150 mg q12h／Ccr60–69：137.5 mg q12h／Ccr50–59：122.5 mg q12h` | `Ccr60–69` | 60–69 | 在欄位範圍內 |
| Colistin / Colimycin（mg CBA） | >50 | `Ccr≥90：180 mg q12h／Ccr80–89：170 mg q12h／Ccr70–79：150 mg q12h／Ccr60–69：137.5 mg q12h／Ccr50–59：122.5 mg q12h` | `Ccr50–59` | 50–59 | **部分超出欄位範圍** |
| Colistin / Colimycin（mg CBA） | 10–50 | `Ccr40–49：110 mg q12h／Ccr30–39：97.5 mg q12h／Ccr20–29：87.5 mg q12h／Ccr10–19：80 mg q12h` | `Ccr40–49` | 40–49 | 在欄位範圍內 |
| Colistin / Colimycin（mg CBA） | 10–50 | `Ccr40–49：110 mg q12h／Ccr30–39：97.5 mg q12h／Ccr20–29：87.5 mg q12h／Ccr10–19：80 mg q12h` | `Ccr30–39` | 30–39 | 在欄位範圍內 |
| Colistin / Colimycin（mg CBA） | 10–50 | `Ccr40–49：110 mg q12h／Ccr30–39：97.5 mg q12h／Ccr20–29：87.5 mg q12h／Ccr10–19：80 mg q12h` | `Ccr20–29` | 20–29 | 在欄位範圍內 |
| Colistin / Colimycin（mg CBA） | 10–50 | `Ccr40–49：110 mg q12h／Ccr30–39：97.5 mg q12h／Ccr20–29：87.5 mg q12h／Ccr10–19：80 mg q12h` | `Ccr10–19` | 10–19 | 在欄位範圍內 |
| Colistin / Colimycin（mg CBA） | <10 | `Ccr5–9：72.5 mg q12h／Ccr<5：65 mg q12h` | `Ccr5–9` | 5–9 | 在欄位範圍內 |
| Colistin / Colimycin（mg CBA） | <10 | `Ccr5–9：72.5 mg q12h／Ccr<5：65 mg q12h` | `Ccr<5` | ≤4 | 在欄位範圍內 |
| Daptomycin | 10–50 | `Ccr30–50：N／Ccr10–29：6–10 mg/kg q48h` | `Ccr30–50` | 30–50 | 在欄位範圍內 |
| Daptomycin | 10–50 | `Ccr30–50：N／Ccr10–29：6–10 mg/kg q48h` | `Ccr10–29` | 10–29 | 在欄位範圍內 |
| Fosfomycin（IV） | 10–50 | `Ccr>40：N／Ccr31–40：70%／Ccr21–30：60%／Ccr11–20：40%（分 q8–12h）` | `Ccr>40` | ≥41 | **部分超出欄位範圍** |
| Fosfomycin（IV） | 10–50 | `Ccr>40：N／Ccr31–40：70%／Ccr21–30：60%／Ccr11–20：40%（分 q8–12h）` | `Ccr31–40` | 31–40 | 在欄位範圍內 |
| Fosfomycin（IV） | 10–50 | `Ccr>40：N／Ccr31–40：70%／Ccr21–30：60%／Ccr11–20：40%（分 q8–12h）` | `Ccr21–30` | 21–30 | 在欄位範圍內 |
| Fosfomycin（IV） | 10–50 | `Ccr>40：N／Ccr31–40：70%／Ccr21–30：60%／Ccr11–20：40%（分 q8–12h）` | `Ccr11–20` | 11–20 | 在欄位範圍內 |
| Fosfomycin（IV） | <10 | `Ccr≤10：20%（分 q12–24h）` | `Ccr≤10` | ≤10 | **部分超出欄位範圍** |
| Nitroxoline | 10–50 | `Ccr<20：A` | `Ccr<20` | ≤19 | **部分超出欄位範圍** |
| SMZ-TMP（治療） | 10–50 | `Ccr31–50：N／Ccr15–30：50%（分 q12–24h）／Ccr10–14：25–50%（分 q24h）` | `Ccr31–50` | 31–50 | 在欄位範圍內 |
| SMZ-TMP（治療） | 10–50 | `Ccr31–50：N／Ccr15–30：50%（分 q12–24h）／Ccr10–14：25–50%（分 q24h）` | `Ccr15–30` | 15–30 | 在欄位範圍內 |
| SMZ-TMP（治療） | 10–50 | `Ccr31–50：N／Ccr15–30：50%（分 q12–24h）／Ccr10–14：25–50%（分 q24h）` | `Ccr10–14` | 10–14 | 在欄位範圍內 |
| Fluconazole | 10–50 | `Ccr≤50：50% q24h` | `Ccr≤50` | ≤50 | **部分超出欄位範圍** |
| Entecavir | 10–50 | `Ccr30–49：q48h／Ccr<30：q72h` | `Ccr30–49` | 30–49 | 在欄位範圍內 |
| Entecavir | 10–50 | `Ccr30–49：q48h／Ccr<30：q72h` | `Ccr<30` | ≤29 | **部分超出欄位範圍** |
| Ganciclovir（誘導） | >50 | `Ccr≥70：N／Ccr50–69：50%（2.5 mg/kg）q12h` | `Ccr≥70` | ≥70 | 在欄位範圍內 |
| Ganciclovir（誘導） | >50 | `Ccr≥70：N／Ccr50–69：50%（2.5 mg/kg）q12h` | `Ccr50–69` | 50–69 | **部分超出欄位範圍** |
| Ganciclovir（誘導） | 10–50 | `Ccr25–49：50%（2.5 mg/kg）q24h／Ccr10–24：25%（1.25 mg/kg）q24h` | `Ccr25–49` | 25–49 | 在欄位範圍內 |
| Ganciclovir（誘導） | 10–50 | `Ccr25–49：50%（2.5 mg/kg）q24h／Ccr10–24：25%（1.25 mg/kg）q24h` | `Ccr10–24` | 10–24 | 在欄位範圍內 |
| Ganciclovir（維持） | >50 | `Ccr>90：N／Ccr51–90：50–100%（2.5–5 mg/kg）q24h` | `Ccr>90` | ≥91 | 在欄位範圍內 |
| Ganciclovir（維持） | >50 | `Ccr>90：N／Ccr51–90：50–100%（2.5–5 mg/kg）q24h` | `Ccr51–90` | 51–90 | 在欄位範圍內 |
| Telbivudine | 10–50 | `Ccr30–49：600 mg q48h／Ccr10–30：600 mg q72h` | `Ccr30–49` | 30–49 | 在欄位範圍內 |
| Telbivudine | 10–50 | `Ccr30–49：600 mg q48h／Ccr10–30：600 mg q72h` | `Ccr10–30` | 10–30 | 在欄位範圍內 |
| Tenofovir（TDF） | 10–50 | `Ccr30–49：300 mg q48h／Ccr10–29：300 mg q72–96h` | `Ccr30–49` | 30–49 | 在欄位範圍內 |
| Tenofovir（TDF） | 10–50 | `Ccr30–49：300 mg q48h／Ccr10–29：300 mg q72–96h` | `Ccr10–29` | 10–29 | 在欄位範圍內 |
| Tenofovir alafenamide（TAF） | 10–50 | `Ccr≥15：N／Ccr<15：A（未透析）` | `Ccr≥15` | ≥15 | **部分超出欄位範圍** |
| Tenofovir alafenamide（TAF） | 10–50 | `Ccr≥15：N／Ccr<15：A（未透析）` | `Ccr<15` | ≤14 | **部分超出欄位範圍** |
| Emtricitabine | 10–50 | `Ccr30–49：200 mg q48h／Ccr10–29：200 mg q72h` | `Ccr30–49` | 30–49 | 在欄位範圍內 |
| Emtricitabine | 10–50 | `Ccr30–49：200 mg q48h／Ccr10–29：200 mg q72h` | `Ccr10–29` | 10–29 | 在欄位範圍內 |
| Valganciclovir（誘導） | >50 | `Ccr≥60：N／Ccr51–59：50%（450 mg）q12h` | `Ccr≥60` | ≥60 | 在欄位範圍內 |
| Valganciclovir（誘導） | >50 | `Ccr≥60：N／Ccr51–59：50%（450 mg）q12h` | `Ccr51–59` | 51–59 | 在欄位範圍內 |
| Valganciclovir（誘導） | 10–50 | `Ccr40–50：50%（450 mg）q12h／Ccr25–39：50%（450 mg）q24h／Ccr10–24：50%（450 mg）q48h` | `Ccr40–50` | 40–50 | 在欄位範圍內 |
| Valganciclovir（誘導） | 10–50 | `Ccr40–50：50%（450 mg）q12h／Ccr25–39：50%（450 mg）q24h／Ccr10–24：50%（450 mg）q48h` | `Ccr25–39` | 25–39 | 在欄位範圍內 |
| Valganciclovir（誘導） | 10–50 | `Ccr40–50：50%（450 mg）q12h／Ccr25–39：50%（450 mg）q24h／Ccr10–24：50%（450 mg）q48h` | `Ccr10–24` | 10–24 | 在欄位範圍內 |
| Valganciclovir（維持） | >50 | `Ccr≥60：N／Ccr51–59：50%（450 mg）q24h` | `Ccr≥60` | ≥60 | 在欄位範圍內 |
| Valganciclovir（維持） | >50 | `Ccr≥60：N／Ccr51–59：50%（450 mg）q24h` | `Ccr51–59` | 51–59 | 在欄位範圍內 |
| Valganciclovir（維持） | 10–50 | `Ccr40–50：50%（450 mg）q24h／Ccr25–39：50%（450 mg）q48h／Ccr10–24：50%（450 mg）biw` | `Ccr40–50` | 40–50 | 在欄位範圍內 |
| Valganciclovir（維持） | 10–50 | `Ccr40–50：50%（450 mg）q24h／Ccr25–39：50%（450 mg）q48h／Ccr10–24：50%（450 mg）biw` | `Ccr25–39` | 25–39 | 在欄位範圍內 |
| Valganciclovir（維持） | 10–50 | `Ccr40–50：50%（450 mg）q24h／Ccr25–39：50%（450 mg）q48h／Ccr10–24：50%（450 mg）biw` | `Ccr10–24` | 10–24 | 在欄位範圍內 |

### GFR 欄內混有透析／CRRT 劑量（觀察，未列為問題）

以下 GFR 欄或備註裡寫了 HD、CRRT 的劑量。頁面另有透析欄，兩處資料來源不同（綠卡與 Sanford），核對時可留意兩者是否一致。

| 藥名 | 欄位 | 原文 | 透析欄是否有 Sanford 資料 |
| --- | --- | --- | --- |
| Amikacin / Streptomycin（TB） | GFR 10–50 | `Ccr<30 或 HD：15 mg/kg biw–tiw` | 有 |
| Amikacin / Streptomycin（TB） | GFR <10 | `Ccr<30 或 HD：15 mg/kg biw–tiw` | 有 |
| Piperacillin-tazobactam（Pseudomonas） | 備註 | `Sanford 17A；HD 2.25 g q8h＋透析後補 0.75 g` | 有 |
| Ceftibuten | 備註 | `200–400 mg after HD` | 有 |
| Doripenem | 備註 | `HD：0.25–0.5 g q24h` | 有 |
| Imipenem | 備註 | `CRRT：0.5–1 g q12h` | 有 |
| Levofloxacin 750mg | 備註 | `HD：同 <20` | 有 |
| Levofloxacin 500mg | 備註 | `HD：同 <20` | 有 |
| Vancomycin（IV） | GFR <10 | `0.5 g after HD` | 有 |
| Fluconazole | GFR <10 | `HD：50% q24h 或僅 HD 後給全量` | 有 |
| Tenofovir alafenamide（TAF） | GFR 10–50 | `Ccr≥15：N／Ccr<15：A（未透析）` | 有 |
| Tenofovir alafenamide（TAF） | GFR <10 | `A（未透析）；HD：N` | 有 |

### 多列共用同一份 Sanford 常規／透析資料（觀察，未列為問題）

同一個藥拆成多列（不同劑量、適應症）時，常規與透析欄是同一份 Sanford 原文。若某列的 GFR 欄劑量與共用的常規劑量不同（例如名稱是 500mg 的列，常規欄顯示 750 mg），閱讀時可能混淆，可判斷是否需要加註。

| 共用的列 | 常規（nd） |
| --- | --- |
| Amoxicillin-clavulanate（PO/IV）<br>Amoxicillin-clav 875mg tab（PO） | `500 mg po q8h (4:1) 875 mg po q12h (7:1) 1 gm IV q8h (5:1)` |
| Ampicillin/sulbactam<br>Ampicillin/sulbactam — Acinetobacter / E. faecalis（高劑量） | `1.5-3 gm IV q6h` |
| Piperacillin-tazobactam（non-Pseudomonas）<br>Piperacillin-tazobactam（Pseudomonas） | `Extended infusion: 4.5 gm IV (over 4 hr) q8h Intermittent infusion: Nosocomial pneumonia: 4.5 gm IV (over 30 min) q6h All other indications: 3.375 gm IV (over 30 min) q6h` |
| Cefaclor（0.25–1g）<br>Cefaclor（0.25–0.5g） | `500 mg po q8h` |
| Levofloxacin 750mg<br>Levofloxacin 500mg | `750 mg po/IV q24h` |
| SMZ-TMP（治療）<br>SMZ-TMP（預防） | `5-20 mg/kg/day po/IV (div q6-12h)` |

### 透析欄「無資料／不需調整」的寫法（觀察）

有透析欄位的 54 列都三欄齊全，沒有空字串。下面是各種「沒有劑量」的寫法；「部分」表示這幾個字只是整段文字的一部分。

| 寫法 | 次數 | 出現位置 |
| --- | --- | --- |
| `No data` | 64 | Amoxicillin-clavulanate（PO/IV）（CAPD）、Amoxicillin-clavulanate（PO/IV）（CRRT）、Amoxicillin-clav 875mg tab（PO）（CAPD）、Amoxicillin-clav 875mg tab（PO）（CRRT）、Dicloxacillin（HD）、Dicloxacillin（CAPD）、Dicloxacillin（CRRT）、Oxacillin（HD）、Oxacillin（CAPD）、Oxacillin（CRRT）、Piperacillin-tazobactam（non-Pseudomonas）（CAPD，部分）、Piperacillin-tazobactam（Pseudomonas）（CAPD，部分）、Cefaclor（0.25–1g）（CRRT）、Cefaclor（0.25–0.5g）（CRRT）、Cefixime（CRRT）、Cefoperazone（CAPD）、Cefoperazone（CRRT）、Cefoperazone/sulbactam（CAPD）、Ceftazidime（CAPD）、Ceftibuten（CRRT）、Cefmetazole（CAPD）、Cefmetazole（CRRT）、Cephalexin（CRRT）、Doripenem（HD）、Doripenem（CAPD）、Imipenem（CAPD）、Gemifloxacin（CRRT）、Colistin / Colimycin（mg CBA）（CAPD）、Fosfomycin（IV）（CAPD）、Fusidate sodium（HD）、Fusidate sodium（CAPD）、Fusidate sodium（CRRT）、Teicoplanin（維持劑量）（CAPD）、Flucytosine（CRRT）、Itraconazole（PO）（CRRT）、Terbinafine（HD）、Terbinafine（CAPD）、Terbinafine（CRRT）、Rifabutin（HD）、Rifabutin（CAPD）、Rifabutin（CRRT）、Acyclovir（PO）VZV（CRRT）、Amantadine（CAPD）、Amantadine（CRRT）、Didanosine（EC/SR）（CRRT）、Entecavir（CRRT）、Famciclovir（CAPD）、Famciclovir（CRRT）、Ganciclovir（維持）（CRRT）、Nevirapine / Efavirenz / Ritonavir（HD，部分）、Nevirapine / Efavirenz / Ritonavir（CAPD）、Nevirapine / Efavirenz / Ritonavir（CRRT）、Telbivudine（CAPD）、Telbivudine（CRRT）、Tenofovir（TDF）（CAPD）、Tenofovir（TDF）（CRRT）、Tenofovir alafenamide（TAF）（CAPD）、Tenofovir alafenamide（TAF）（CRRT）、Emtricitabine（CAPD）、Emtricitabine（CRRT）、Valacyclovir（CRRT）、Valganciclovir（誘導）（CAPD）、Valganciclovir（誘導）（CRRT）、Valganciclovir（維持）（CAPD） |
| `No dosage adjustment` | 37 | Cefoperazone（HD，部分）、Ceftriaxone（HD）、Ceftriaxone（CAPD）、Ceftriaxone（CRRT）、Moxifloxacin（HD）、Moxifloxacin（CAPD）、Moxifloxacin（CRRT）、Azithromycin（HD）、Azithromycin（CAPD）、Azithromycin（CRRT）、Clindamycin（HD）、Clindamycin（CAPD）、Clindamycin（CRRT）、Doxycycline / Minocycline（HD）、Doxycycline / Minocycline（CAPD）、Doxycycline / Minocycline（CRRT）、Erythromycin（HD）、Erythromycin（CAPD）、Erythromycin（CRRT）、Fosfomycin（IV）（CRRT，部分）、Linezolid（HD，部分）、Linezolid（CAPD）、Linezolid（CRRT）、Metronidazole（CAPD）、Metronidazole（CRRT）、Tigecycline（HD）、Tigecycline（CAPD）、Tigecycline（CRRT）、Amphotericin B（HD）、Amphotericin B（CAPD）、Amphotericin B（CRRT）、Itraconazole（PO）（HD）、Itraconazole（PO）（CAPD）、Isoniazid / Rifampin（HD，部分）、Isoniazid / Rifampin（CAPD，部分）、Isoniazid / Rifampin（CRRT，部分）、Tenofovir alafenamide（TAF）（HD，部分） |
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
| README「內容」 | 85/89 藥附商品名 | 資料中 87/90 列有 brands |
| README「內容」 | 肝 3 種、肥胖 15 種 | 資料中 hep 3 列、obese 16 列（一致） |

文件數字不影響頁面運作，本次未修改。

## 2. 「待核」項目完整清單

### 2.1 頁面上的「待核」標記怎麼來的

- `renal_data.js` 每列有 Sanford 常規／透析資料時，會帶 `ver` 欄位：`ver: 1`＝已核對（正常字）、`ver: 0` 或缺少 `ver`＝未核對。
- `index.html` 對未核對的列：常規劑量灰字並加「待核」小標籤（`normalDose()`），透析欄整格灰字（`dialysisCell()`）。
- 只有常規與透析欄受 `ver` 控制；三段 GFR 欄、備註、肝功能、肥胖、院內規格**都沒有**待核標記機制。
- 檢查腳本會擋下三種不一致：有 Sanford 資料卻沒寫 `ver`（會默默變灰字）、沒資料卻寫了 `ver`、待核列沒有常規劑量（只會灰字、不會出現「待核」標籤）。目前都沒有。

### 2.2 目前標成「待核」的列：0 列

**目前沒有任何一列是待核。** 有 Sanford 資料的 84 列全部是 `ver: 1`，與 README 更新紀錄「2026-10-30 已全部更新，不再有待核列」相符。資料檔內也沒有「待核」字樣。

（`index.html` 第 68 行的 CSS 註解也寫「目前沒有 ver=0 的列」，與資料一致。）

### 2.3 其他看起來「不確定」的標記（不是待核機制，列出供參考）

| 藥名 | 欄位 | 內容 | 說明 |
| --- | --- | --- | --- |
| Amphotericin B | Route | `?` | Route 寫「?」，圖例沒有定義 |
| Terbinafine | GFR 10–50 | `? 或 A` | 圖例：「?」＝無資料 |
| Terbinafine | GFR <10 | `? 或 A` | 圖例：「?」＝無資料 |
| Tenofovir（TDF） | GFR <10 | `?` | 圖例：「?」＝無資料 |
| Tenofovir alafenamide（TAF） | Route | `?` | Route 寫「?」，圖例沒有定義 |

### 2.4 各欄位的來源與核對狀態（摘自 README 與頁面說明）

| 欄位 | 來源 | 列數 | 核對狀態 |
| --- | --- | --- | --- |
| 三段 GFR（>50／10–50／<10） | 綠卡《Guide to Drug Dosage in Renal Failure》 | 90 | 頁面與 README 註明「已人工校對（2026-06-29）」，無逐列標記 |
| 常規、HD、CAPD、CRRT | Sanford Guide（2026-10-30 更新） | 84 | 全部 `ver: 1` |
| 肝功能、肥胖 | Sanford Guide | 3／16 | 沒有 ver 標記機制 |
| 院內規格 | 高醫藥典品名（程式擷取） | 83 | 非劑量資料，沒有核對標記 |
| 備註 | 綠卡等 | 21 | 沒有核對標記 |

## 3. 單位寫法不一致清單

依資料來源分成三組比對：**綠卡**（GFR 三欄＋備註）、**Sanford**（常規、透析、肝、肥胖）、**藥名**。不同來源本來就有各自的寫法（例如綠卡寫 `g`、Sanford 寫 `gm`），跨來源的差異只列出；**同一來源內混用兩種以上寫法**才算不一致，列為已知問題。全部沒有修改。

### 3.1 總覽

| 類別 | 綠卡 GFR 欄＋備註 | Sanford 欄（常規／透析／肝／肥胖） | 藥名 | 同來源內不一致 |
| --- | --- | --- | --- | --- |
| 公克寫法（g／gm） | g：33 | gm：78 | g：3 | — |
| 數字與單位之間的空格 | 有空格（如 6 g、160 mg）：81 | 有空格（如 6 g、160 mg）：230 | 緊接（如 6g、160mg）：6 | — |
| 百萬單位寫法（MU／million U） | — | million U：4 | — | — |
| 數字範圍連接號（–／-） | en dash（–）：86 | hyphen（-）：105 | en dash（–）：3 | — |
| 給藥間隔大小寫（q8h／Q8H） | 小寫 q…h：157 | 小寫 q…h：218 | 小寫 q…h：1 | — |
| 每日一次寫法 | q24h：53 | q24h：85<br>once daily：2<br>daily（單獨）：1 | — | ⚠️ Sanford |
| 每日總量寫法（/day／每日） | — | /day：9 | — | — |
| 隔日一次寫法 | q48h：13 | q48h：16 | — | — |
| 每週數次寫法 | biw／tiw：8 | Nx/wk：4<br>Nx/week：4 | — | ⚠️ Sanford |
| 每週一次寫法 | q7d：2 | once weekly：1 | — | — |
| 乘號／次數（x／×） | ×（如 ×1）：6 | x（如 x1、3x/wk）：22 | — | — |
| 毫升大小寫（mL／ml） | mL：1 | ml：1<br>mL：2 | — | ⚠️ Sanford |
| 腎功能縮寫（Ccr／CrCl／eGFR） | Ccr：41 | CrCl：6<br>eGFR：1 | — | ⚠️ Sanford |
| Ccr 與數值之間的空格 | 緊接（如 Ccr<30、Ccr30–49）：41 | — | — | — |
| 同一格多段條件的分隔符（／；、） | ／：28<br>；：9<br>、：2 | — | — | ⚠️ 綠卡 |
| 冒號全形／半形 | 全形「：」：50 | 半形「:」：53<br>全形「：」：3 | — | ⚠️ Sanford |
| 「或」的寫法 | 或：11 | OR／or：2 | — | — |
| 透析後給藥寫法 | 透析後：1<br>after HD／after each dialysis：2 | AD：57<br>POST-HD：2<br>after HD／after each dialysis：1 | — | ⚠️ 綠卡、Sanford |
| 給藥途徑順序（IV/po／po/IV） | — | po/IV：8<br>IV/po：3 | — | ⚠️ Sanford |
| 口服大小寫（po／PO） | PO：2 | po：51 | PO：5 | — |

數字是出現該寫法的欄位數（同一格出現多次只算一次）。

### 3.2 同一來源內不一致的明細

#### 每日一次寫法｜Sanford 欄（常規／透析／肝／肥胖）

「daily（單獨）」1 處：

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Rifabutin | 肝 | `daily` |

「once daily」2 處：

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Amikacin | CAPD | `once daily` |
| Gentamicin | CAPD | `once daily` |

<details><summary>「q24h」85 處（點開看明細）</summary>

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Amikacin | 常規 | `q24h` |
| Amikacin / Streptomycin（TB） | 常規 | `q24h` |
| Gentamicin | CRRT | `q24h` |
| Amoxicillin-clavulanate（PO/IV） | HD | `q24h、q24h` |
| Amoxicillin-clav 875mg tab（PO） | HD | `q24h、q24h` |
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
| Cefpirome | HD | `q24h` |
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
| Moxifloxacin | 常規 | `q24h` |
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
| Daptomycin | 常規 | `q24h` |
| Daptomycin | CRRT | `q24h` |
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
| Isoniazid / Rifampin | 常規 | `q24h、q24h` |
| Isoniazid / Rifampin | HD | `q24h` |
| Isoniazid / Rifampin | CAPD | `q24h` |
| Isoniazid / Rifampin | CRRT | `q24h` |
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
| Lamivudine | 常規 | `q24h` |
| Lamivudine | HD | `q24h` |
| Lamivudine | CAPD | `q24h` |
| Lamivudine | CRRT | `q24h` |
| Nevirapine / Efavirenz / Ritonavir | 常規 | `q24h` |
| Telbivudine | 常規 | `q24h` |
| Tenofovir（TDF） | 常規 | `q24h` |
| Tenofovir alafenamide（TAF） | 常規 | `q24h` |
| Emtricitabine | 常規 | `q24h` |
| Valacyclovir | HD | `q24h` |
| Valacyclovir | CAPD | `q24h` |
| Valganciclovir（維持） | 常規 | `q24h` |
| Valganciclovir（維持） | CRRT | `q24h` |

</details>

#### 每週數次寫法｜Sanford 欄（常規／透析／肝／肥胖）

「Nx/wk」4 處：

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Cefepime | HD | `3x/wk` |
| Cefpirome | CAPD | `3x/wk` |
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

「CrCl」6 處：

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| SMZ-TMP（治療） | HD | `CrCl` |
| SMZ-TMP（治療） | CAPD | `CrCl` |
| SMZ-TMP（預防） | HD | `CrCl` |
| SMZ-TMP（預防） | CAPD | `CrCl` |
| Didanosine（EC/SR） | HD | `CrCl` |
| Didanosine（EC/SR） | CAPD | `CrCl` |

#### 同一格多段條件的分隔符（／；、）｜綠卡 GFR 欄＋備註

「、」2 處：

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Piperacillin-tazobactam（non-Pseudomonas） | 備註 | `、` |
| SMZ-TMP（預防） | GFR >50 | `、` |

「；」9 處：

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Amoxicillin-clavulanate（PO/IV） | GFR 10–50 | `；` |
| Amoxicillin-clavulanate（PO/IV） | GFR <10 | `；` |
| Piperacillin-tazobactam（Pseudomonas） | GFR 10–50 | `；、；` |
| Piperacillin-tazobactam（Pseudomonas） | 備註 | `；` |
| Cefoperazone/sulbactam | 備註 | `；` |
| Colistin / Colimycin（mg CBA） | 備註 | `；` |
| Fosfomycin（IV） | 備註 | `；` |
| Tenofovir alafenamide（TAF） | GFR <10 | `；` |
| Tenofovir alafenamide（TAF） | 備註 | `；` |

<details><summary>「／」28 處（點開看明細）</summary>

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Amoxicillin-clavulanate（PO/IV） | GFR 10–50 | `／` |
| Ampicillin | GFR 10–50 | `／` |
| Ampicillin/sulbactam | GFR 10–50 | `／、／` |
| Piperacillin-tazobactam（non-Pseudomonas） | GFR 10–50 | `／、／` |
| Cefixime | GFR >50 | `／` |
| Cefixime | GFR 10–50 | `／` |
| Cefoperazone/sulbactam | GFR 10–50 | `／、／` |
| Doripenem | GFR 10–50 | `／` |
| Ertapenem | GFR 10–50 | `／` |
| Levofloxacin 750mg | GFR 10–50 | `／` |
| Colistin / Colimycin（mg CBA） | GFR >50 | `／、／、／、／` |
| Colistin / Colimycin（mg CBA） | GFR 10–50 | `／、／、／` |
| Colistin / Colimycin（mg CBA） | GFR <10 | `／` |
| Daptomycin | GFR 10–50 | `／` |
| Fosfomycin（IV） | GFR 10–50 | `／、／、／` |
| SMZ-TMP（治療） | GFR 10–50 | `／、／` |
| Entecavir | GFR 10–50 | `／` |
| Ganciclovir（誘導） | GFR >50 | `／` |
| Ganciclovir（誘導） | GFR 10–50 | `／` |
| Ganciclovir（維持） | GFR >50 | `／` |
| Telbivudine | GFR 10–50 | `／` |
| Tenofovir（TDF） | GFR 10–50 | `／` |
| Tenofovir alafenamide（TAF） | GFR 10–50 | `／` |
| Emtricitabine | GFR 10–50 | `／` |
| Valganciclovir（誘導） | GFR >50 | `／` |
| Valganciclovir（誘導） | GFR 10–50 | `／、／` |
| Valganciclovir（維持） | GFR >50 | `／` |
| Valganciclovir（維持） | GFR 10–50 | `／、／` |

</details>

#### 冒號全形／半形｜Sanford 欄（常規／透析／肝／肥胖）

「全形「：」」3 處：

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Metronidazole | 肝 | `：` |
| Terbinafine | 肝 | `：` |
| Rifabutin | 肝 | `：` |

<details><summary>「半形「:」」53 處（點開看明細）</summary>

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Amikacin | 常規 | `:、:` |
| Amikacin | HD | `:` |
| Amikacin | CAPD | `:` |
| Amikacin | CRRT | `:、:` |
| Amikacin / Streptomycin（TB） | 常規 | `:` |
| Amikacin / Streptomycin（TB） | HD | `:` |
| Amikacin / Streptomycin（TB） | CAPD | `:` |
| Amikacin / Streptomycin（TB） | CRRT | `:` |
| Gentamicin | 常規 | `:、:` |
| Gentamicin | HD | `:、:` |
| Gentamicin | CAPD | `:` |
| Gentamicin | CRRT | `:` |
| Amoxicillin-clavulanate（PO/IV） | HD | `:、:` |
| Amoxicillin-clav 875mg tab（PO） | HD | `:、:` |
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
| Imipenem | HD | `:、:、:` |
| Colistin / Colimycin（mg CBA） | 常規 | `:、:` |
| Colistin / Colimycin（mg CBA） | HD | `:、:` |
| Fosfomycin（IV） | 常規 | `:、:` |
| Fosfomycin（IV） | CRRT | `:` |
| SMZ-TMP（治療） | CRRT | `:` |
| SMZ-TMP（預防） | CRRT | `:` |
| Teicoplanin（維持劑量） | 常規 | `:` |
| Teicoplanin（維持劑量） | CRRT | `:、:、:、:、:、:、:、:、:、:、:、:` |
| Vancomycin（IV） | HD | `:、:、:、:、:、:、:、:、:、:、:、:` |
| Vancomycin（IV） | CRRT | `:、:` |
| Amphotericin B | 肥胖 | `:` |
| Flucytosine | CAPD | `:` |
| Isoniazid / Rifampin | 常規 | `:、:` |
| Isoniazid / Rifampin | HD | `:、:` |
| Isoniazid / Rifampin | CAPD | `:、:` |
| Isoniazid / Rifampin | CRRT | `:、:` |
| Entecavir | 常規 | `:、:` |
| Entecavir | HD | `:、:` |
| Entecavir | CAPD | `:、:` |
| Famciclovir | 常規 | `:、:` |
| Famciclovir | HD | `:、:、:、:` |
| Ganciclovir（誘導） | CRRT | `:` |
| Nevirapine / Efavirenz / Ritonavir | 常規 | `:、:、:` |
| Nevirapine / Efavirenz / Ritonavir | HD | `:、:、:` |
| Valacyclovir | 常規 | `:、:` |
| Valganciclovir（維持） | CRRT | `:` |

</details>

#### 透析後給藥寫法｜綠卡 GFR 欄＋備註

「透析後」1 處：

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Piperacillin-tazobactam（Pseudomonas） | 備註 | `透析後` |

「after HD／after each dialysis」2 處：

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Ceftibuten | 備註 | `after HD` |
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

<details><summary>「AD」57 處（點開看明細）</summary>

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Amikacin | HD | `AD` |
| Amikacin / Streptomycin（TB） | HD | `AD` |
| Gentamicin | HD | `AD、AD` |
| Amoxicillin-clavulanate（PO/IV） | HD | `AD、AD` |
| Amoxicillin-clav 875mg tab（PO） | HD | `AD、AD` |
| Ampicillin | HD | `AD` |
| Ampicillin/sulbactam | HD | `AD` |
| Ampicillin/sulbactam — Acinetobacter / E. faecalis（高劑量） | HD | `AD` |
| Penicillin G | HD | `AD` |
| Piperacillin | HD | `AD` |
| Piperacillin-tazobactam（non-Pseudomonas） | HD | `AD、AD` |
| Piperacillin-tazobactam（Pseudomonas） | HD | `AD、AD` |
| Cefaclor（0.25–1g） | HD | `AD` |
| Cefaclor（0.25–0.5g） | HD | `AD` |
| Cefazolin | HD | `AD、AD、AD` |
| Cefepime | HD | `AD、AD` |
| Cefixime | HD | `AD` |
| Cefoperazone | HD | `AD` |
| Cefoperazone/sulbactam | HD | `AD` |
| Cefotaxime | HD | `AD` |
| Cefoxitin | HD | `AD` |
| Cefpirome | HD | `AD` |
| Ceftazidime | HD | `AD` |
| Ceftibuten | HD | `AD` |
| Cefuroxime | HD | `AD` |
| Cefmetazole | HD | `AD` |
| Cephalexin | HD | `AD` |
| Imipenem | HD | `AD、AD、AD` |
| Meropenem | HD | `AD` |
| Ertapenem | HD | `AD、AD` |
| Ciprofloxacin | HD | `AD` |
| Gemifloxacin | HD | `AD` |
| Clarithromycin | HD | `AD` |
| Daptomycin | HD | `AD` |
| Fosfomycin（IV） | HD | `AD` |
| Linezolid | HD | `AD` |
| Metronidazole | HD | `AD` |
| SMZ-TMP（治療） | HD | `AD` |
| SMZ-TMP（預防） | HD | `AD` |
| Vancomycin（IV） | HD | `AD、AD` |
| Fluconazole | HD | `AD` |
| Flucytosine | HD | `AD` |
| Ethambutol | HD | `AD` |
| Isoniazid / Rifampin | HD | `AD` |
| Pyrazinamide | HD | `AD` |
| Acyclovir（IV） | HD | `AD` |
| Acyclovir（PO）VZV | HD | `AD` |
| Entecavir | HD | `AD` |
| Famciclovir | HD | `AD、AD` |
| Ganciclovir（誘導） | HD | `AD` |
| Ganciclovir（維持） | HD | `AD` |
| Lamivudine | HD | `AD` |
| Nevirapine / Efavirenz / Ritonavir | HD | `AD` |
| Telbivudine | HD | `AD` |
| Tenofovir alafenamide（TAF） | HD | `AD` |
| Valacyclovir | HD | `AD` |
| Zidovudine | HD | `AD` |

</details>

#### 給藥途徑順序（IV/po／po/IV）｜Sanford 欄（常規／透析／肝／肥胖）

「IV/po」3 處：

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Azithromycin | 常規 | `IV/po` |
| Metronidazole | 常規 | `IV/po` |
| Fluconazole | 常規 | `IV/po` |

「po/IV」8 處：

| 藥名 | 欄位 | 比對到的文字 |
| --- | --- | --- |
| Moxifloxacin | 常規 | `po/IV` |
| Levofloxacin 750mg | 常規 | `po/IV` |
| Levofloxacin 500mg | 常規 | `po/IV` |
| Doxycycline / Minocycline | 常規 | `po/IV` |
| Fusidate sodium | 常規 | `po/IV` |
| Linezolid | 常規 | `po/IV` |
| SMZ-TMP（治療） | 常規 | `po/IV` |
| SMZ-TMP（預防） | 常規 | `po/IV` |

### 3.3 跨來源的寫法差異（不算問題，僅供參考）

| 類別 | 各來源寫法 |
| --- | --- |
| 公克寫法（g／gm） | 綠卡 GFR 欄＋備註：g<br>Sanford 欄（常規／透析／肝／肥胖）：gm<br>藥名：g |
| 數字與單位之間的空格 | 綠卡 GFR 欄＋備註：有空格（如 6 g、160 mg）<br>Sanford 欄（常規／透析／肝／肥胖）：有空格（如 6 g、160 mg）<br>藥名：緊接（如 6g、160mg） |
| 數字範圍連接號（–／-） | 綠卡 GFR 欄＋備註：en dash（–）<br>Sanford 欄（常規／透析／肝／肥胖）：hyphen（-）<br>藥名：en dash（–） |
| 每週一次寫法 | 綠卡 GFR 欄＋備註：q7d<br>Sanford 欄（常規／透析／肝／肥胖）：once weekly<br>藥名：— |
| 乘號／次數（x／×） | 綠卡 GFR 欄＋備註：×（如 ×1）<br>Sanford 欄（常規／透析／肝／肥胖）：x（如 x1、3x/wk）<br>藥名：— |
| 「或」的寫法 | 綠卡 GFR 欄＋備註：或<br>Sanford 欄（常規／透析／肝／肥胖）：OR／or<br>藥名：— |
| 口服大小寫（po／PO） | 綠卡 GFR 欄＋備註：PO<br>Sanford 欄（常規／透析／肝／肥胖）：po<br>藥名：PO |

大寫 `Q8H` 之類的寫法：**沒有發現**，間隔全部是小寫 `q…h`。

## 4. 檢查方式

- 檢查腳本：`tests/data_checks.js`（檢查邏輯）、`tests/data.test.js`（`node:test` 測試）、`tests/known_issues.json`（已知問題清單）。只用 Node 內建模組，沒有任何相依套件。
- 執行：`node --test tests/data.test.js`。CI：`.github/workflows/data-check.yml`，push 與 PR 時自動執行。
- 「強制」項目有問題就失敗；其他項目只有**新出現**、不在 `known_issues.json` 的問題才會失敗。
- 修好已知問題，或確認某個新問題要保留時：執行 `node tests/make_report.js --baseline`，會同時更新 `known_issues.json` 與本報告。
