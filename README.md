# 抗微生物藥 · 腎功能調整劑量

**中文** ｜ [English](README.en.md)

急診用的離線單檔網頁。輸入年齡 / 體重 / 血清 Cr / 性別自動算 **CrCl（Cockcroft-Gault）**，並把病人落在的 GFR 段（`>50 / 10–50 / <10`）對應劑量整欄高亮。

**Live**：https://xyzKIWI.github.io/abx/

## 內容

- 89 種抗微生物藥 / 9 類：胺基醣苷、青黴素、頭孢、碳青黴烯、喹諾酮、其他抗細菌、抗黴菌、抗結核、抗病毒
- 每藥顯示 Route（R 腎排 / H 肝排 / HD 透析）＋三段 GFR 劑量
- **常規劑量**：藥名下方顯示正常腎功能劑量（如 `1 gm IV q8h`），讓只寫間隔的欄位（`q8h`）有劑量可對照
- **透析欄**：HD／CAPD／CRRT 劑量；「—」＝原書未列，不代表「不需調整」
- **肝功能／肥胖註記**：藥名下方小字，只列有具體建議的藥（肝 3 種、肥胖 15 種，如重度肝損減量、用 adjusted／ideal BW 計算）
- **院內規格**：1 vial／amp／tab 是多少（如 `vial 1g／500mg／250mg`），直接換算要開幾瓶；來源高醫藥典品名，含歷年品項
- **菌種／適應症專屬劑量另立一列**（如 Piperacillin-tazobactam 的 non-Pseudomonas vs Pseudomonas、Ampicillin/sulbactam 的 Acinetobacter 高劑量、SMZ-TMP 治療 vs 預防），避免高低劑量混用
- 藥名／**商品名**搜尋（如 `mepem`、`cravit`、`tazocin` 直接命中對應學名列）；85/89 藥附院內歷年進藥商品名別名，顯示於藥名下方——僅供搜尋對照，未必為現行品項
- 商品名別名比對時已排除外用／眼用劑型，且不同複方（如 ceftazidime-avibactam）不會掛到單方列，避免劑量誤導

## 資料來源

- **三段 GFR 劑量**：綠卡《Guide to Drug Dosage in Renal Failure》pages 1–3（Sanford Guide / UpToDate · Lexicomp / 高醫院內規範），逐字照錄，已人工校對。
- **常規劑量、透析欄（HD／CAPD／CRRT）、肝功能與肥胖註記**：Sanford Guide（2026-10-30 更新）。
- **院內規格、商品名**：高醫藥典品名，含歷年品項，實際以藥局與院內系統為準。

## ⚠️ Disclaimer

個人臨床速查工具，最終劑量以主治醫師判斷與原始參考資料為準，開藥前請再次核對。Vancomycin / Aminoglycoside 等請依血中濃度調整。

## 資料檢查

每次 push 或開 PR，GitHub Actions 會自動檢查 `renal_data.js` 的結構與格式（不判斷劑量對錯），結果與待處理清單見 [`DATA_REPORT.md`](DATA_REPORT.md)。本機執行：`node --test tests/data.test.js`。

## 更新紀錄

- **2026-11-02**　新增資料結構與格式自動檢查（GitHub Actions）與檢查報告 `DATA_REPORT.md`。統一綠卡欄寫法：`qd` → `q24h`、`qod`／`q2d` → `q48h`、`qwk` → `q7d`，數字與單位間空一格（`6 g`）；Cefoperazone/sulbactam 的 Route 改為 `H,R`，圖例補上「?＝排除途徑不明」；院內規格未滿 1 g 改寫成 mg 並去除重複；刪除查無此品項的商品名 Zovirx。劑量數值與 CrCl 切點未變，逐項清單見 `DATA_REPORT.md`。README 新增英文版。
- **2026-10-30**　常規劑量與透析欄（HD／CAPD／CRRT）更新為 Sanford Guide 2026 年資料；藥名下方新增**肝功能**（3 種）與**肥胖**（15 種）註記，「不需調整、無資料、資料不足」者不顯示。三段 GFR 欄（綠卡）未動。
- **2026-08-06（三次更新）**　新增**院內單位規格**（1 vial／amp／tab 是多少，83 種藥），來源高醫藥典品名。有了它才能從「常規 1 gm q8h」直接換算成「開 2 瓶 0.5g」。解析踩到的坑：無括號複方（`Piperacillin 2g+Tazobactam 0.25g/Vial`）若取最後一個數字會變成 0.25g／vial（實為 **2.25g**）→ 改為多成分相加；糖漿／外用藥水濃度（`25mg/mL`）不可當單位劑量 → 一律排除。
- **2026-08-06（二次更新）**　補齊資料：**常規劑量**（正常腎功能劑量，如 `1 gm IV q8h`）與**透析欄**（HD／CAPD／CRRT）皆填入 Sanford 17A 全部可對應品項，共 54 列；未核對者以灰字＋「待核」標籤標示（**2026-10-30 已全部更新，不再有待核列**），36 列原書無對應資料留空。常規劑量解決了「劑量欄只寫 q8h 卻不知道是多少 mg」的問題。
- **2026-08-06**　新增**透析劑量欄**（HD／CAPD／CRRT），來源 Sanford Guide 2022 Table 17A。只填入已對照原書核對過的藥，其餘顯示「—」（不代表不需調整），避免未核對資料進入臨床頁面。劑量主體維持綠卡不變。手機版空間不足時，透析資訊改列於藥名下方，資訊不流失。
- **2026-08-04**　Piperacillin-tazobactam 依菌種拆成 **（non-Pseudomonas）** 與 **（Pseudomonas）** 兩列（後者 4.5g q6h 起，含 CrCl 40–50／20–40／<20 三段與 HD 補充劑量），沿用 Sanford 原書的分列命名。來源 Sanford 17A p.259。
- **2026-08-03**　搜尋支援院內商品名別名（85/89 藥；`mepem`/`cravit`/`tazocin` 直達學名列，藥名下方小字顯示）。防呆：外用／眼用品項排除；含額外抗菌成分的複方（avibactam 等）與 TB 多合一錠（Rifater 等）不掛單方列，防劑量誤導。劑量欄位零變動。
- **2026-07-07**　頁面加註資料校對日；補 MIT LICENSE。
- **2026-06-30**　首次上線（89 藥／9 類，已人工校對）；計算機加「直接輸入 CrCl」欄。
