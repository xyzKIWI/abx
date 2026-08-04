# 抗微生物藥 · 腎功能調整劑量

急診用的離線單檔網頁。輸入年齡 / 體重 / 血清 Cr / 性別自動算 **CrCl（Cockcroft-Gault）**，並把病人落在的 GFR 段（`>50 / 10–50 / <10`）對應劑量整欄高亮。

**Live**：https://xyzKIWI.github.io/abx-tool/

## 內容

- 89 種抗微生物藥 / 9 類：胺基醣苷、青黴素、頭孢、碳青黴烯、喹諾酮、其他抗細菌、抗黴菌、抗結核、抗病毒
- 每藥顯示 Route（R 腎排 / H 肝排 / HD 透析）＋三段 GFR 劑量＋HD/CRRT 備註
- **菌種／適應症專屬高劑量另立一列**（如 Piperacillin-tazobactam 的 Pseudomonas 4.5g q6h、Ampicillin/sulbactam 的 Acinetobacter 高劑量、SMZ-TMP 治療 vs 預防），避免高低劑量混用
- 藥名／**商品名**搜尋（如 `mepem`、`cravit`、`tazocin` 直接命中對應學名列）；85/89 藥附院內歷年進藥商品名別名，顯示於藥名下方——僅供搜尋對照，未必為現行品項
- 商品名別名比對時已排除外用／眼用劑型，且不同複方（如 ceftazidime-avibactam）不會掛到單方列，避免劑量誤導
- 值逐字照綠卡，已人工校對（商品名別名不影響劑量欄位）

## 資料來源

綠卡《Guide to Drug Dosage in Renal Failure》pages 1–3（Sanford Guide / UpToDate · Lexicomp / 高醫院內規範）。

## ⚠️ Disclaimer

個人臨床速查工具，最終劑量以主治醫師判斷與原始參考資料為準，開藥前請再次核對。Vancomycin / Aminoglycoside 等請依血中濃度調整。

## 更新紀錄

- **2026-08-04**　新增 **Piperacillin-tazobactam — Pseudomonas（高劑量）** 列（4.5g q6h 起，含 CrCl 40–50／20–40／<20 三段與 HD 補充劑量），與原標準劑量列並列；原列備註標明「非 Pseudomonas 之標準劑量」。來源 Sanford 17A p.259，**經 Kiwi 對照原書逐格核對**（核對時修正兩處 CrCl <10 轉錄誤差）。
- **2026-08-03**　搜尋支援院內商品名別名（85/89 藥；`mepem`/`cravit`/`tazocin` 直達學名列，藥名下方小字顯示）。防呆：外用／眼用品項排除；含額外抗菌成分的複方（avibactam 等）與 TB 多合一錠（Rifater 等）不掛單方列，防劑量誤導。劑量欄位零變動。
- **2026-07-07**　頁面加註資料校對日；補 MIT LICENSE。
- **2026-06-30**　首次上線（89 藥／9 類，已人工校對）；計算機加「直接輸入 CrCl」欄。
