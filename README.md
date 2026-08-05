# 抗微生物藥 · 腎功能調整劑量

急診用的離線單檔網頁。輸入年齡 / 體重 / 血清 Cr / 性別自動算 **CrCl（Cockcroft-Gault）**，並把病人落在的 GFR 段（`>50 / 10–50 / <10`）對應劑量整欄高亮。

**Live**：https://xyzKIWI.github.io/abx-tool/

## 內容

- 89 種抗微生物藥 / 9 類：胺基醣苷、青黴素、頭孢、碳青黴烯、喹諾酮、其他抗細菌、抗黴菌、抗結核、抗病毒
- 每藥顯示 Route（R 腎排 / H 肝排 / HD 透析）＋三段 GFR 劑量
- **常規劑量**：藥名下方顯示正常腎功能劑量（如 `1 gm IV q8h`），讓只寫間隔的欄位（`q8h`）有劑量可對照
- **透析欄**：HD／CAPD／CRRT 劑量（Sanford 17A）；「—」＝原書未列，非「不需調整」
- **灰字＋「待核」**＝該列 Sanford 資料尚未對照原書核對（同批曾出現轉錄錯誤），開藥前務必確認
- **菌種／適應症專屬劑量另立一列**（如 Piperacillin-tazobactam 的 non-Pseudomonas vs Pseudomonas、Ampicillin/sulbactam 的 Acinetobacter 高劑量、SMZ-TMP 治療 vs 預防），避免高低劑量混用
- 藥名／**商品名**搜尋（如 `mepem`、`cravit`、`tazocin` 直接命中對應學名列）；85/89 藥附院內歷年進藥商品名別名，顯示於藥名下方——僅供搜尋對照，未必為現行品項
- 商品名別名比對時已排除外用／眼用劑型，且不同複方（如 ceftazidime-avibactam）不會掛到單方列，避免劑量誤導
- 值逐字照綠卡，已人工校對（商品名別名不影響劑量欄位）

## 資料來源

綠卡《Guide to Drug Dosage in Renal Failure》pages 1–3（Sanford Guide / UpToDate · Lexicomp / 高醫院內規範）。

## ⚠️ Disclaimer

個人臨床速查工具，最終劑量以主治醫師判斷與原始參考資料為準，開藥前請再次核對。Vancomycin / Aminoglycoside 等請依血中濃度調整。

## 更新紀錄

- **2026-08-06（二次更新）**　補齊資料：**常規劑量**（正常腎功能劑量，如 `1 gm IV q8h`）與**透析欄**（HD／CAPD／CRRT）皆填入 Sanford 17A 全部可對應品項，共 54 列。其中 13 列已對照原書核對（正常字），**41 列尚未核對以灰字＋「待核」標籤標示**，開藥前須翻原書確認；36 列原書無對應資料留空。常規劑量解決了「劑量欄只寫 q8h 卻不知道是多少 mg」的問題。
- **2026-08-06**　新增**透析劑量欄**（HD／CAPD／CRRT），來源 Sanford Guide 2022 Table 17A。**只填入已對照原書核對過的 13 種藥**，其餘顯示「—」＝尚未核對（不代表不需調整）——避免未核對資料進入臨床頁面。劑量主體維持綠卡不變。手機版空間不足時透析資訊改列於藥名下方，資訊不流失。同批經 Kiwi 核對的還有 Amikacin／Teicoplanin／Flucytosine／Ciprofloxacin po 四種（轉錄皆正確，未改值）。
- **2026-08-04**　Piperacillin-tazobactam 依菌種拆成 **（non-Pseudomonas）** 與 **（Pseudomonas）** 兩列（後者 4.5g q6h 起，含 CrCl 40–50／20–40／<20 三段與 HD 補充劑量），沿用 Sanford 原書的分列命名。來源 Sanford 17A p.259，**經 Kiwi 對照原書逐格核對**（核對時修正兩處 CrCl <10 轉錄誤差）。
- **2026-08-03**　搜尋支援院內商品名別名（85/89 藥；`mepem`/`cravit`/`tazocin` 直達學名列，藥名下方小字顯示）。防呆：外用／眼用品項排除；含額外抗菌成分的複方（avibactam 等）與 TB 多合一錠（Rifater 等）不掛單方列，防劑量誤導。劑量欄位零變動。
- **2026-07-07**　頁面加註資料校對日；補 MIT LICENSE。
- **2026-06-30**　首次上線（89 藥／9 類，已人工校對）；計算機加「直接輸入 CrCl」欄。
