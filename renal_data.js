window.RENAL_DATA = {
  "meta": {
    "title": "抗微生物藥 腎功能調整劑量",
    "subtitle": "Antimicrobial Dosing in Renal Failure",
    "source": "綠卡《Guide to Drug Dosage in Renal Failure》pages 1–3（Sanford Guide / UpToDate / Lexicomp / 高醫院內規範）",
    "bands": [
      {
        "key": "g50",
        "label": ">50"
      },
      {
        "key": "g1050",
        "label": "10–50"
      },
      {
        "key": "g10",
        "label": "<10"
      }
    ],
    "legend": {
      "route": "R=腎排除 · H=肝排除 · HD=血液透析",
      "values": "純數字=給藥間隔 q__h · N=不需調整 · A=避免使用 · %=正常劑量的百分比 · ?=無資料"
    },
    "dialysis_note": "常規＝正常腎功能劑量；HD／CAPD／CRRT＝透析劑量。兩者來源皆為 Sanford Guide 線上版（高醫訂閱；2026-10-30 擷取），直接取自原文，非讀圖轉錄。「—」＝原書未列此藥透析劑量，不代表不需調整。三段 GFR 劑量欄仍為綠卡資料、已人工校對。",
    "bands_dialysis": [
      {
        "key": "hd",
        "label": "HD"
      },
      {
        "key": "capd",
        "label": "CAPD"
      },
      {
        "key": "crrt",
        "label": "CRRT"
      }
    ],
    "unit_note": "「院內」＝高醫藥典所列該藥品項的單位規格（1 vial／1 amp／1 tab 是多少），由程式自藥典品名擷取，用來換算要開幾瓶；含歷年品項，未必為現行供應，實際以藥局為準。"
  },
  "classes": [
    {
      "name": "Aminoglycosides 胺基醣苷類",
      "drugs": [
        {"name": "Amikacin", "route": "R", "g50": "N", "g1050": "7.5 mg/kg q24–48h", "g10": "7.5 mg/kg q72h", "comment": "", "brands": ["Acemycin", "Amikin", "Aminfec", "Sikacin"], "hd": "G- (conventional): 7.5 mg/kg q48h (+ extra 3.75 mg/kg AD)", "capd": "For peritonitis only: 2 mg/kg IP once daily", "crrt": "Extended-interval: CVVH, CVVHDF: 25 mg/kg q48h TDM recommended", "nd": "G- (conventional): 7.5 mg/kg IM/IV q12h NTM: 10-15 mg/kg IM/IV q24h", "ver": 1, "unit": {"vial": ["250mg/2mL", "500mg/2mL"]}, "obese": "Use adjusted BW"},
        {"name": "Amikacin / Streptomycin（TB）", "route": "R", "g50": "N", "g1050": "Ccr<30 或 HD：15 mg/kg biw–tiw", "g10": "Ccr<30 或 HD：15 mg/kg biw–tiw", "comment": "National TB Curriculum", "brands": ["Acemycin", "Amikin", "Aminfec", "Sikacin"], "unit": {"vial": ["1g", "250mg/2mL", "500mg/2mL"]}},
        {"name": "Gentamicin", "route": "R", "g50": "N", "g1050": "1.7 mg/kg q12–48h", "g10": "1.7 mg/kg q48–72h", "comment": "", "brands": ["Gentacin"], "unit": {"vial": ["80mg/2mL"]}}
      ]
    },
    {
      "name": "Penicillins 青黴素類",
      "drugs": [
        {"name": "Amoxicillin-clavulanate（PO/IV）", "route": "R,H", "g50": "q6–8h", "g1050": "Ccr<30：q12h", "g10": "q24h", "comment": "", "brands": ["Amoclav", "Anbicyn", "Augmentin", "Curam", "Curam Dispersible", "Moxiclav", "Soonmelt"], "nd": "500 mg po q8h (4:1) 875 mg po q12h (7:1) 1 gm IV q8h (5:1)", "hd": "Oral: 250-500 mg q24h (+ extra dose AD) IV: 1 gm x1, then 500 mg q24h (+ extra dose AD)", "capd": "No data", "crrt": "No data", "ver": 1, "unit": {"vial": ["0.6g", "1.2g"], "tab": ["625mg"]}, "obese": "Larger dose possibly required"},
        {"name": "Amoxicillin-clav 875mg tab（PO）", "route": "R,H", "g50": "q12h", "g1050": "Ccr<15：q24h", "g10": "Ccr<5：50% q24h", "comment": "Pennsylvania Univ. Medical Center", "brands": ["Amoclav", "Anbicyn", "Augmentin", "Curam", "Curam Dispersible", "Moxiclav", "Soonmelt"], "unit": {"vial": ["0.6g", "1.2g"], "tab": ["625mg"]}},
        {"name": "Ampicillin", "route": "R,H", "g50": "q6h", "g1050": "Ccr<30：q12h", "g10": "q12–24h", "comment": "", "brands": ["Ampolin", "Ancillina"], "nd": "1-2 gm IV q4-6h", "hd": "1-2 gm q12-24h (give AD on dialysis days)", "capd": "1-2 gm q12h", "crrt": "1-2 gm q8-12h", "ver": 1, "unit": {"vial": ["500mg"]}},
        {"name": "Ampicillin/sulbactam", "route": "R,H", "g50": "q6–8h", "g1050": "Ccr<30：q12h", "g10": "q24h", "comment": "", "brands": ["Ambacillin", "Amsulber", "Unasyn"], "nd": "1.5-3 gm IV q6h", "hd": "1.5-3 gm q24h (give AD on dialysis day)", "capd": "3 gm q24h", "crrt": "1.5-3 gm q8-12h", "ver": 1, "unit": {"vial": ["1.5g"]}},
        {"name": "Ampicillin/sulbactam — Acinetobacter / E. faecalis（高劑量）", "route": "R,H", "g50": "6g q8h", "g1050": "Ccr<30：6g q12h", "g10": "3g q8h", "comment": "Johns Hopkins", "brands": ["Ambacillin", "Amsulber", "Unasyn"], "nd": "1.5-3 gm IV q6h", "hd": "1.5-3 gm q24h (give AD on dialysis day)", "capd": "3 gm q24h", "crrt": "1.5-3 gm q8-12h", "ver": 1, "unit": {"vial": ["1.5g"]}},
        {"name": "Dicloxacillin", "route": "R,H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Diclocin", "Ziefmycin"], "nd": "125-500 mg po q6h", "hd": "No data", "capd": "No data", "crrt": "No data", "ver": 1, "unit": {"cap": ["250mg"]}},
        {"name": "Mezlocillin", "route": "R,H", "g50": "q4–6h", "g1050": "q6–8h", "g10": "q8–12h", "comment": ""},
        {"name": "Oxacillin", "route": "R,H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Prostaphlin"], "unit": {"vial": ["1g", "500mg"]}},
        {"name": "Penicillin G", "route": "R,H", "g50": "N", "g1050": "75%", "g10": "25–50%", "comment": "", "brands": ["Penicilina Atral"], "nd": "0.5-4 million U IV q4h", "hd": "0.5-4 million U q12h (give one of the dialysis day doses AD)", "capd": "0.5-4 million U q12h", "crrt": "1-4 million U q6-8h", "ver": 1, "unit": {"vial": ["1MU", "3MU", "5MU"]}},
        {"name": "Piperacillin", "route": "R", "g50": "q6h", "g1050": "q6–8h", "g10": "q8h", "comment": "", "brands": ["Picillina", "Pipril", "Pitamycin"], "unit": {"vial": ["2g"]}},
        {"name": "Piperacillin-tazobactam（non-Pseudomonas）", "route": "R,H", "g50": "q6h", "g1050": "Ccr<20：q8h", "g10": "2.25g q8–12h", "comment": "", "brands": ["Tapimycin", "Tazocin"], "hd": "Extended infusion: 4.5 gm (over 4 hr) q12h Intermittent infusion: Nosocomial pneumonia: 2.25 gm q8h (+0.75 gm AD on dialysis days) All other indications: 2.25 gm q12h (+0.75 gm AD on dialysis days)", "capd": "Extended infusion: No data Intermittent infusion: Nosocomial pneumonia: 2.25 gm q8h All other indications: 2.25 gm q12h", "crrt": "Extended infusion: 3.375-4.5 gm (over 4 hr) q8h Intermittent infusion: 3.375-4.5 gm q6h", "nd": "Extended infusion: 4.5 gm IV (over 4 hr) q8h Intermittent infusion: Nosocomial pneumonia: 4.5 gm IV (over 30 min) q6h All other indications: 3.375 gm IV (over 30 min) q6h", "ver": 1, "unit": {"vial": ["2.25g"]}, "obese": "4.5 gm IV (over 4 hr) q6-8h"},
        {"name": "Piperacillin-tazobactam（Pseudomonas）", "route": "R,H", "g50": "4.5g q6h", "g1050": "Ccr 40–50：4.5g q6h；20–40：3.375g q6h；<20：2.25g q6h", "g10": "2.25g q8h", "comment": "Sanford 17A；HD 2.25g q8h＋透析後補 0.75g", "brands": ["Tapimycin", "Tazocin"], "hd": "Extended infusion: 4.5 gm (over 4 hr) q12h Intermittent infusion: Nosocomial pneumonia: 2.25 gm q8h (+0.75 gm AD on dialysis days) All other indications: 2.25 gm q12h (+0.75 gm AD on dialysis days)", "capd": "Extended infusion: No data Intermittent infusion: Nosocomial pneumonia: 2.25 gm q8h All other indications: 2.25 gm q12h", "crrt": "Extended infusion: 3.375-4.5 gm (over 4 hr) q8h Intermittent infusion: 3.375-4.5 gm q6h", "nd": "Extended infusion: 4.5 gm IV (over 4 hr) q8h Intermittent infusion: Nosocomial pneumonia: 4.5 gm IV (over 30 min) q6h All other indications: 3.375 gm IV (over 30 min) q6h", "ver": 1, "unit": {"vial": ["2.25g"]}, "obese": "4.5 gm IV (over 4 hr) q6-8h"},
        {"name": "Ticarcillin-clavulanate", "route": "R,H", "g50": "3.1g q4–6h", "g1050": "3.1g q8–12h", "g10": "2g q12h", "comment": "", "brands": ["Timentin"]}
      ]
    },
    {
      "name": "Cephalosporins 頭孢菌素類",
      "drugs": [
        {"name": "Cefaclor（0.25–1g）", "route": "R", "g50": "q6–8h", "g1050": "50–100%", "g10": "50%", "comment": "", "brands": ["Cero", "Keflor", "Uclor"], "nd": "500 mg po q8h", "hd": "500 mg q12h (give one of the dialysis day doses AD)", "capd": "500 mg q12h", "crrt": "No data", "ver": 1, "unit": {"cap": ["250mg"]}},
        {"name": "Cefaclor（0.25–0.5g）", "route": "R", "g50": "N", "g1050": "N", "g10": "N", "comment": "Drug in renal failure", "brands": ["Cero", "Keflor", "Uclor"], "nd": "500 mg po q8h", "hd": "500 mg q12h (give one of the dialysis day doses AD)", "capd": "500 mg q12h", "crrt": "No data", "ver": 1, "unit": {"cap": ["250mg"]}},
        {"name": "Cefazolin", "route": "R", "g50": "q8h", "g1050": "q12h", "g10": "q24–48h", "comment": "", "brands": ["Cefa", "Cefamezin", "Cefazo", "Stazolin"], "hd": "0.5-1 gm q24h (AD on dialysis days). Outpatients: 2 gm AD MW, 3 gm AD Fri", "capd": "0.5 gm q12h", "crrt": "1-2 gm q12h", "nd": "1-2 gm IV q8h", "ver": 1, "unit": {"vial": ["1g", "0.5g"]}},
        {"name": "Cefepime", "route": "R", "g50": "q8h", "g1050": "q12–24h", "g10": "50% q24h", "comment": "", "brands": ["Cefim", "Maxipime", "Supecef"], "hd": "For target dose (NRF) 1-2 gm q12h: 1 gm day 1, then 500 mg q24h For target dose (NRF) 2 gm q8h: FDA-approved: 1 gm q24h (AD on dialysis days) Alternative: 2 gm AD (3x/wk HD)", "capd": "For target dose (NRF) 1-2 gm q12h: 1-2 gm q48h For target dose (NRF) 2 gm q8h: 2 gm q48h", "crrt": "Dose per EFR: 1 L/hr: 1 gm q8h ≥2 L/hr: 1 gm q6h EI (EFR 30.1 ml/kg/hr): 2 gm (over 4 hr) q8h", "nd": "1-2 gm IV q8-12h", "ver": 1, "unit": {"vial": ["1g", "0.5g", "500mg"]}, "obese": "Up to 2 gm (over 3 hr) IV q8h"},
        {"name": "Cefixime", "route": "R", "g50": "N", "g1050": "Ccr>20：75%", "g10": "Ccr<20：50%", "comment": "", "brands": ["Cefspan", "Cexime"], "nd": "400 mg po q24h", "hd": "260 mg q24h (use susp) (dose AD on dialysis days)", "capd": "200 mg q24h", "crrt": "No data", "ver": 1, "unit": {"cap": ["100mg"]}},
        {"name": "Cefoperazone", "route": "H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Cefobid"]},
        {"name": "Cefoperazone/sulbactam", "route": "Sulbactam: R", "g50": "N", "g1050": "Ccr≤30：2–4g q12h", "g10": "CRRT：2g q6h", "comment": "", "brands": ["Brosym"], "unit": {"vial": ["1g", "2g"]}},
        {"name": "Cefotaxime", "route": "R,H", "g50": "N", "g1050": "q12–24h", "g10": "q24h 或 50%", "comment": "", "brands": ["Cetaxime", "Claforan"], "hd": "2 gm q24h (+ extra 1 gm AD)", "capd": "0.5-1 gm q24h", "crrt": "2 gm q12-24h", "nd": "2 gm IV q8h", "ver": 1, "unit": {"vial": ["2g"]}},
        {"name": "Cefoxitin", "route": "R", "g50": "q8h", "g1050": "q8–12h", "g10": "q24–48h", "comment": "", "brands": ["Cefotin", "Lofatin"], "hd": "2 gm q24-48h (+ extra 1 gm AD)", "capd": "1 gm q24h", "crrt": "2 gm q8-12h", "nd": "2 gm IV q8h", "ver": 1, "unit": {"vial": ["1g", "2g"]}, "obese": "Larger dose possibly required"},
        {"name": "Cefpirome", "route": "R", "g50": "q12h", "g1050": "50%", "g10": "50% q24h", "comment": "", "brands": ["Cefrom"]},
        {"name": "Ceftazidime", "route": "R", "g50": "q8–12h", "g1050": "q12–24h", "g10": "q24–48h", "comment": "", "brands": ["Cefadime", "Cetazine", "Fortum", "Sintum", "Tatumcef", "Unizid"], "hd": "0.5-1 gm q24h (AD on dialysis days)", "capd": "No data", "crrt": "1-2 gm q8-12h", "nd": "1-2 gm IV q8-12h", "ver": 1, "unit": {"vial": ["1g", "2g", "0.5g", "500mg"]}, "obese": "Up to 2 gm (over 3 hr) IV q8h"},
        {"name": "Ceftibuten", "route": "R", "g50": "q24h", "g1050": "Ccr≥30：50%", "g10": "Ccr<30：50%", "comment": "200–400mg after HD", "brands": ["Seftem"], "nd": "400 mg po q24h", "hd": "100 mg q24h (dose AD on dialysis days)", "capd": "100 mg po q24h", "crrt": "No data", "ver": 1, "unit": {"cap": ["100mg"]}},
        {"name": "Ceftriaxone", "route": "R,H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Chef", "Rocephin", "Tricef"], "hd": "No dosage adjustment", "capd": "No dosage adjustment", "crrt": "No dosage adjustment", "nd": "1-2 gm IV q12-24h", "ver": 1, "unit": {"vial": ["1g", "2g"]}},
        {"name": "Cefuroxime", "route": "R", "g50": "q8h", "g1050": "q8–12h", "g10": "q24h", "comment": "", "hd": "0.75-1.5 gm q24h (AD on dialysis days)", "capd": "0.75-1.5 gm q24h", "crrt": "0.75-1.5 gm q8-12h", "nd": "0.75-1.5 gm IV q8h", "ver": 1, "unit": {"vial": ["750mg"]}},
        {"name": "Cefmetazole", "route": "R", "g50": "q8h", "g1050": "q12h", "g10": "q24h", "comment": "", "brands": ["Cefe", "Cefmetazon", "Cefmetazone", "Lofeta"], "unit": {"vial": ["1g"]}},
        {"name": "Cephalexin", "route": "R", "g50": "N", "g1050": "Ccr≤40：q8–12h", "g10": "q12–24h", "comment": "", "brands": ["Ulex", "Ulexin"], "nd": "250-1000 mg po q6h", "hd": "250-500 mg q12-24h (give AD on dialysis days)", "capd": "250-500 mg q12-24h", "crrt": "No data", "ver": 1},
        {"name": "Cephradine（0.25–1g q6h）", "route": "R", "g50": "q6h", "g1050": "50% 或 0.25–0.5g q6h", "g10": "25% 或 0.25g q12h", "comment": "", "brands": ["Cekodin", "Cekodin-A", "Lacef", "Lisacef", "Nakacef", "U-Save-A", "Unifradine"], "unit": {"cap": ["250mg"]}},
        {"name": "Flomoxef", "route": "R", "g50": "q6–8h", "g1050": "q12–24h", "g10": "50–100% qd", "comment": "", "brands": ["Flumarin"], "unit": {"vial": ["1g"]}}
      ]
    },
    {
      "name": "Carbapenems 碳青黴烯類",
      "drugs": [
        {"name": "Doripenem", "route": "R", "g50": "N", "g1050": "Ccr30–50：0.25g q8h／Ccr<30：0.25g q12h", "g10": "0.25g qd–q12h", "comment": "HD：0.25–0.5g qd", "brands": ["Finibax"], "nd": "500 mg IV q8h", "hd": "No data", "capd": "No data", "crrt": "500 mg q8h (JAC 69:2508, 2014)", "ver": 1, "unit": {"vial": ["250mg"]}},
        {"name": "Imipenem", "route": "R", "g50": "N", "g1050": "50% q6–12h", "g10": "25–50% q12h", "comment": "CRRT：0.5–1g q12h", "brands": ["Tienam", "Younam"], "unit": {"vial": ["0.5g"]}},
        {"name": "Meropenem", "route": "R", "g50": "N", "g1050": "q12h", "g10": "50% q24h", "comment": "", "brands": ["Melopen", "Mepem"], "nd": "1 gm IV q8h", "hd": "0.5 gm q24h (AD on dialysis days)", "capd": "0.5 gm q24h", "crrt": "0.75 gm IV q8h", "ver": 1, "unit": {"vial": ["1g", "0.5g", "0.25g"]}},
        {"name": "Ertapenem", "route": "R", "g50": "N", "g1050": "Ccr<30：50%", "g10": "50%", "comment": "", "brands": ["Invanz"], "nd": "1 gm IV q24h", "hd": "500 mg q24h (+150 mg AD if given ≤6 hr bef HD), OR 500 mg 3x/wk AD", "capd": "500 mg q24h", "crrt": "0.5-1 gm q24h", "ver": 1, "unit": {"vial": ["1g"]}}
      ]
    },
    {
      "name": "Quinolones 喹諾酮類",
      "drugs": [
        {"name": "Ciprofloxacin", "route": "R", "g50": "N", "g1050": "50–75% 或 q24h", "g10": "50% 或 q24h", "comment": "", "brands": ["Cinolone", "Ciprogen", "Ciproxin", "Seforce"], "hd": "250-500 mg q24h (AD on dialysis days)", "capd": "250-500 mg q24h", "crrt": "250-500 mg q12h", "nd": "250-750 mg po q12h", "ver": 1, "unit": {"bag": ["400mg/200mL"], "tab": ["250mg", "500mg"], "bot": ["400mg/200mL"]}},
        {"name": "Moxifloxacin", "route": "R", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Avelox", "Floxsafe", "Moflodal", "Mosflow", "Moxetero", "Moxicin"], "unit": {"tab": ["400mg"], "bot": ["400mg/250mL"]}},
        {"name": "Levofloxacin 750mg", "route": "R", "g50": "q24h", "g1050": "Ccr≥20：750mg q48h", "g10": "Ccr<20：750mg×1，之後 500mg q2d", "comment": "HD：同 <20", "brands": ["Cravit", "Leflodal", "Levocin", "Levonolon", "Rozoxin"], "nd": "750 mg po/IV q24h", "hd": "750 mg x1, then 500 mg q48h", "capd": "750 mg x1, then 500 mg q48h", "crrt": "750 mg x1, then 500 mg q48h", "ver": 1, "unit": {"tab": ["100mg", "500mg", "750mg"], "bot": ["250mg/50mL", "750mg/150mL"]}},
        {"name": "Levofloxacin 500mg", "route": "R", "g50": "q24h", "g1050": "Ccr≥20：500mg q48h", "g10": "Ccr<20：500mg×1，之後 250mg q2d", "comment": "HD：同 <20", "brands": ["Cravit", "Leflodal", "Levocin", "Levonolon", "Rozoxin"], "nd": "750 mg po/IV q24h", "hd": "750 mg x1, then 500 mg q48h", "capd": "750 mg x1, then 500 mg q48h", "crrt": "750 mg x1, then 500 mg q48h", "ver": 1, "unit": {"tab": ["100mg", "500mg", "750mg"], "bot": ["250mg/50mL", "750mg/150mL"]}},
        {"name": "Gemifloxacin", "route": "R", "g50": "q24h", "g1050": "Ccr≤40：160mg qd", "g10": "160mg qd", "comment": "", "brands": ["Factive"], "nd": "320 mg po q24h", "hd": "160 mg q24h (give dialysis day dose AD)", "capd": "160 mg q24h", "crrt": "No data", "ver": 1, "unit": {"tab": ["320mg"]}},
        {"name": "Norfloxacin", "route": "R", "g50": "q12h", "g1050": "q12–24h", "g10": "400mg qd", "comment": "", "brands": ["Baxicin", "NFS"], "nd": "400 mg po q12h", "hd": "400 mg q24h", "capd": "400 mg q24h", "crrt": "Not applicable", "ver": 1}
      ]
    },
    {
      "name": "Other antibacterials 其他抗細菌藥",
      "drugs": [
        {"name": "Azithromycin", "route": "H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Aziciin", "Azithrom", "Zithromax"], "nd": "250-500 mg IV/po q24h", "hd": "No dosage adjustment", "capd": "No dosage adjustment", "crrt": "No dosage adjustment", "ver": 1, "unit": {"tab": ["250mg"]}},
        {"name": "Clarithromycin", "route": "R,H", "g50": "N", "g1050": "50–100%", "g10": "50%", "comment": "", "brands": ["Clarocid XL", "Klaricid", "Klaricid XL"], "nd": "500 mg po q12h", "hd": "500 mg q24h (dose AD on dialysis days)", "capd": "500 mg q24h", "crrt": "500 mg q12-24h", "ver": 1, "unit": {"vial": ["500mg"], "tab": ["500mg"]}},
        {"name": "Clindamycin", "route": "H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Cleocin", "Clincin", "Eudamycin", "Lindacin"], "unit": {"amp": ["300mg/2mL"], "cap": ["150mg"]}},
        {"name": "Colistin / Colimycin（維持劑量・參考 A）", "route": "R", "g50": "N", "g1050": "Ccr20–40：2–3 MU q12h／Ccr10–19：2 MU q12h", "g10": "1 MU q12h", "comment": "*CRRT 膜會吸附；CRRT：4.5 MU q12–8h", "unit": {"vial": ["2MU"]}},
        {"name": "Colistin / Colimycin（維持劑量・參考 B）", "route": "R", "g50": "N", "g1050": "4.5 MU q24h", "g10": "2–2.5 MU q24h", "comment": "CRRT：2–3 MU q8h", "unit": {"vial": ["2MU"]}},
        {"name": "Daptomycin", "route": "R", "g50": "N", "g1050": "Ccr<30：q48h", "g10": "q48h 或 9 mg/kg q72h", "comment": "CRRT：8 mg/kg q48h", "brands": ["Cubicin"], "unit": {"vial": ["350mg", "500mg"]}},
        {"name": "Doxycycline / Minocycline", "route": "R,H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Borymycin", "Cyclin", "Doxynin", "Menocik", "Mero", "Minocin", "Withamycin"], "unit": {"vial": ["100mg"], "cap": ["100mg"]}},
        {"name": "Erythromycin", "route": "H", "g50": "N", "g1050": "N", "g10": "N 或 50–75%", "comment": "僅高劑量 IV 時需減量", "brands": ["Erymycin", "Erythrocin", "Ulosina"], "unit": {"vial": ["500mg"], "cap": ["250mg"]}},
        {"name": "Fosfomycin（IV）", "route": "R", "g50": "Ccr20–40：bid", "g1050": "Ccr10–20：qd", "g10": "qod；HD：50–100% after HD", "comment": "Nottingham Univ. Hospital", "brands": ["Folsmycin"], "nd": "Meningitis: 16-24 gm/day IV (div q6-8h); Bone/joint infection, cIAI, cSSTI, cUTI, HAP/VAP, endocarditis: 12-24 gm/day IV (div q8-12h)", "hd": "2 gm q48h (give AD)", "capd": "No data", "crrt": "CVVH: No dosage adjustment (based on limited data)", "ver": 1, "unit": {"vial": ["2g"]}},
        {"name": "Fusidate sodium", "route": "H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Fucidin", "Fusodate"], "unit": {"tab": ["250mg"]}},
        {"name": "Linezolid", "route": "H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Linetero", "Zyvox"], "nd": "600 mg po/IV q12h", "hd": "No dosage adjustment (dose AD)", "capd": "No dosage adjustment", "crrt": "No dosage adjustment", "ver": 1, "unit": {"bag": ["600mg/300mL"], "tab": ["600mg"]}, "obese": "Standard dosing may be inadequate"},
        {"name": "Metronidazole", "route": "R,H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Flagyl", "SABS", "Tolizole"], "nd": "500 mg IV/po q6h", "hd": "500 mg q12h (dose AD)", "capd": "No dosage adjustment", "crrt": "No dosage adjustment", "ver": 1, "unit": {"tab": ["250mg"], "cap": ["250mg"], "bot": ["500mg/100mL"]}, "hep": "重度肝損（Child-Pugh C）：Reduce dosage by 50%"},
        {"name": "Nitroxoline", "route": "H", "g50": "N", "g1050": "Ccr<20：A", "g10": "A", "comment": "", "brands": ["Nibiol Forte", "Nice", "Yuro"], "unit": {"tab": ["100mg"]}},
        {"name": "SMZ-TMP（治療）", "route": "R,H", "g50": "q6–12h", "g1050": "Ccr<30：50%", "g10": "A 或 5–10 mg/kg qd 或分次", "comment": "", "brands": ["Baktar", "ChEmix", "Morcasin", "Septrin", "Sevatrim SMZ", "Sulfacotrim", "Trimerin"], "unit": {"amp": ["80mg/5mL"], "tab": ["80mg"]}},
        {"name": "SMZ-TMP（預防）", "route": "R,H", "g50": "qd、biw–tiw", "g1050": "N", "g10": "N", "comment": "", "brands": ["Baktar", "ChEmix", "Morcasin", "Septrin", "Sevatrim SMZ", "Sulfacotrim", "Trimerin"], "unit": {"amp": ["80mg/5mL"], "tab": ["80mg"]}},
        {"name": "Teicoplanin（維持劑量）", "route": "R", "g50": "N", "g1050": "q48h", "g10": "q72h", "comment": "Sanford Guide 熱病", "brands": ["Targocid", "Teiyu"], "hd": "Not removed by HD (use recs for eGFR <30)", "capd": "No data", "crrt": "For CVVHDF: If target trough 15-30 µg/mL: Loading dose: Day 1: 10 mg/kg q12h Day 2: 10 mg/kg x1 Day 3: 10 mg/kg x1 If target trough 20-40 µg/mL: Loading dose: Day 1: 12 mg/kg q12h Day 2: 12 mg/kg x1 Day 3: 12 mg/kg x1 Maintenance dose (both targets): 3-3.3 mg/kg q24h", "nd": "Maintenance: 6.0-6.7 mg/kg q24h", "ver": 1, "unit": {"vial": ["200mg"]}, "obese": "Use actual BW"},
        {"name": "Tetracycline", "route": "R,H", "g50": "q8–12h", "g1050": "q12–24h", "g10": "q24h", "comment": "", "brands": ["Tetralin", "Wintellin"], "nd": "250-500 mg po q6h", "hd": "250-500 mg q24h", "capd": "250-500 mg q24h", "crrt": "250-500 mg q12-24h", "ver": 1, "unit": {"cap": ["250mg"]}},
        {"name": "Tigecycline", "route": "H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Tygacil"], "unit": {"vial": ["50mg"]}},
        {"name": "Vancomycin（IV）", "route": "R", "g50": "q12h", "g1050": "50% q12h", "g10": "0.5g after HD", "comment": "建議依血中濃度（trough/AUC）調整", "brands": ["U-Vanco", "Vanco", "Vancocin", "Vancover", "Vanlyo"], "nd": "15-20 mg/kg IV q8-12h", "hd": "POST-HD DOSING Low permeability membrane: Load: 25 mg/kg Maintenance: 7.5 mg/kg AD High permeability membrane: Load: 25 mg/kg Maintenance: 10 mg/kg AD INTRADIALYTIC DOSING Low permeability membrane: Load: 30 mg/kg Maintenance: 7.5-10 mg/kg High permeability membrane: Load: 35 mg/kg Maintenance: 10-15 mg/kg", "capd": "7.5 mg/kg q48-96h", "crrt": "Load: 20-25 mg/kg Maintenance: 7.5-10 mg/kg q12h (effluent 20-25 mL/kg/hr). TDM suggested.", "ver": 1, "unit": {"vial": ["500mg"], "cap": ["125mg"]}, "obese": "Use actual BW"}
      ]
    },
    {
      "name": "Antifungals 抗黴菌藥",
      "drugs": [
        {"name": "Amphotericin B", "route": "?", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Ambisome", "Ampholipad", "Fungizone", "Lipo-AB"], "unit": {"vial": ["50mg"]}},
        {"name": "Fluconazole", "route": "R,H", "g50": "N", "g1050": "Ccr≤50：50% qd", "g10": "HD：50% qd 或僅 HD 後給全量", "comment": "", "brands": ["Diflucan", "Fluene", "Genazole"], "nd": "100-400 mg IV/po q24h", "hd": "50-200 mg q24h on non-dialysis days, 100-400 mg (full dose) AD on dialysis days", "capd": "50-200 mg q24h", "crrt": "At least 2x usual dose suggested", "ver": 1, "unit": {"cap": ["50mg"], "bot": ["100mg/50mL"]}, "obese": "Larger dose possibly required"},
        {"name": "Flucytosine", "route": "R", "g50": "q12h", "g1050": "q12–24h", "g10": "q24h", "comment": "", "brands": ["Flusine"], "hd": "25-50 mg/kg q48-72h (dose AD)", "capd": "CCPD: 25 mg/kg q24h", "crrt": "No data", "nd": "25 mg/kg po q6h", "ver": 1, "unit": {"tab": ["500mg"]}, "obese": "Use ideal BW"},
        {"name": "Itraconazole（PO）", "route": "H,R", "g50": "N", "g1050": "N", "g10": "50%", "comment": "", "brands": ["Sporanox"], "nd": "100-200 mg po q12-24h (oral soln)", "hd": "No dosage adjustment", "capd": "No dosage adjustment", "crrt": "No data", "ver": 1, "unit": {"cap": ["100mg"]}},
        {"name": "Terbinafine", "route": "H,R", "g50": "N", "g1050": "? 或 A", "g10": "? 或 A", "comment": "", "brands": ["Fungitech", "Lamisil"], "nd": "250 mg po q24h", "hd": "No data", "capd": "No data", "crrt": "No data", "ver": 1, "unit": {"tab": ["250mg"]}, "hep": "肝功能異常（Child-Pugh A–C）：Use not recommended"}
      ]
    },
    {
      "name": "Antimycobacterials 抗結核／分枝桿菌藥",
      "drugs": [
        {"name": "Ethambutol", "route": "R", "g50": "q24h", "g1050": "N", "g10": "tiw", "comment": "", "brands": ["Epbutol", "Myambutol"], "nd": "15-25 mg/kg po q24h", "hd": "15-25 mg/kg 3x/wk (AD on dialysis days)", "capd": "15-25 mg/kg q48h", "crrt": "15-25 mg/kg q24-36h", "ver": 1, "unit": {"tab": ["400mg"]}, "obese": "Use ideal BW"},
        {"name": "Isoniazid / Rifampin", "route": "H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Macox Plus", "RIF", "Rifinah", "Rifocin", "RINA"], "unit": {"tab": ["100mg", "300mg"], "cap": ["150mg", "300mg"]}},
        {"name": "Pyrazinamide", "route": "H,R", "g50": "N", "g1050": "N", "g10": "tiw", "comment": "", "brands": ["Pyramide"], "nd": "25 mg/kg po q24h", "hd": "25 mg/kg q48h (administer AD on dialysis days)", "capd": "25 mg/kg q24h", "crrt": "25 mg/kg q24h", "ver": 1, "unit": {"tab": ["500mg"]}, "obese": "Use ideal BW"},
        {"name": "Rifabutin", "route": "H,R", "g50": "N", "g1050": "Ccr<30：50%", "g10": "Ccr<30：50%", "comment": "", "brands": ["Mycobutin"], "nd": "300 mg po q24h", "hd": "No data", "capd": "No data", "crrt": "No data", "ver": 1, "unit": {"cap": ["150mg"]}, "hep": "重度肝損（Child-Pugh C）：Consider 150 mg daily"}
      ]
    },
    {
      "name": "Antivirals 抗病毒藥",
      "drugs": [
        {"name": "Acyclovir（IV）", "route": "R", "g50": "q8h", "g1050": "q12–24h", "g10": "50% qd", "comment": "", "brands": ["Acylete", "Acylo", "Asimplex", "Virless", "Zovirax", "Zovirx"], "nd": "5-12.5 mg/kg IV q8h", "hd": "2.5-6.25 mg/kg IV q24h (dose AD on dialysis days)", "capd": "2.5-6.25 mg/kg IV q24h", "crrt": "2.5-6.25 mg/kg IV q24h", "ver": 1, "unit": {"vial": ["250mg"], "tab": ["200mg", "400mg"]}, "obese": "Use adjusted BW"},
        {"name": "Acyclovir（PO）HSV", "route": "R", "g50": "N", "g1050": "N", "g10": "0.2g q12h", "comment": "", "brands": ["Acylete", "Acylo", "Asimplex", "Virless", "Zovirax", "Zovirx"], "unit": {"vial": ["250mg"], "tab": ["200mg", "400mg"]}},
        {"name": "Acyclovir（PO）VZV", "route": "R", "g50": "N", "g1050": "0.8g q8h", "g10": "0.8g q12h", "comment": "", "brands": ["Acylete", "Acylo", "Asimplex", "Virless", "Zovirax", "Zovirx"], "unit": {"vial": ["250mg"], "tab": ["200mg", "400mg"]}},
        {"name": "Amantadine", "route": "R", "g50": "q12h", "g1050": "q24–48h", "g10": "q7d", "comment": "", "brands": ["Dopadine", "Enzil", "PK-Merz"], "nd": "100 mg po q12h", "hd": "200 mg once weekly", "capd": "No data", "crrt": "No data", "ver": 1, "unit": {"tab": ["100mg"]}},
        {"name": "Didanosine（EC/SR）", "route": "R", "g50": "q24h", "g1050": "50% q24h", "g10": "A", "comment": "", "brands": ["Videx", "Videx EC/SR"], "nd": "400 mg po q24h", "hd": "Use CrCl <10 recommendations (no supplemental dose post HD required)", "capd": "Use CrCl <10 recommendations", "crrt": "No data", "ver": 1, "unit": {"cap": ["250mg", "400mg"]}},
        {"name": "Entecavir", "route": "R", "g50": "q24h", "g1050": "Ccr30–49：q48h／Ccr<30：q72h", "g10": "qwk", "comment": "", "brands": ["Baraclude", "Envir", "Hepuri"], "nd": "Tx-naive: 0.5 mg q24h 3TC-refract, decomp liver dis: 1 mg q24h", "hd": "Tx-naive: 0.05 mg q24h 3TC-refract, decomp liver dis: 0.1 mg q24h (dose AD on dialysis days)", "capd": "Tx-naive: 0.05 mg q24h 3TC-refract, decomp liver dis: 0.1 mg q24h", "crrt": "No data", "ver": 1, "unit": {"tab": ["1mg", "0.5mg"]}},
        {"name": "Famciclovir", "route": "R", "g50": "q8–12h", "g1050": "0.5g q12–24h", "g10": "0.5g qd", "comment": "", "brands": ["Famvir"], "nd": "VZV: 500 mg po q8h x7 days (shingles); HSV: 250 mg po q8h x7-10 days (genital HSV, first episode)", "hd": "Recurrent genital herpes: 250 mg x1 dose AD Recurrent herpes labialis: 250 mg x1 dose AD Herpes zoster: 250 mg after each dialysis Suppression of recurrent genital herpes: 125 mg after each dialysis Recurrent orolabial/genital herpes (HIV) 250 mg after each dialysis", "capd": "No data", "crrt": "No data", "ver": 1, "unit": {"tab": ["250mg"]}},
        {"name": "Ganciclovir（誘導）", "route": "R", "g50": "Ccr50–69：50% q12h", "g1050": "Ccr25–49：50% qd／Ccr10–24：25% qd", "g10": "1.25 mg/kg tiw", "comment": "", "brands": ["Cymevene", "Gancicure"], "nd": "5 mg/kg IV q12h", "hd": "1.25 mg/kg 3x/week (dose AD on dialysis days)", "capd": "1.25 mg/kg 3x/week", "crrt": "CVVHDF: 2.5 mg/kg q24h", "ver": 1, "unit": {"vial": ["500mg"]}},
        {"name": "Ganciclovir（維持）", "route": "R", "g50": "Ccr50–69：50% q24h", "g1050": "Ccr25–49：25% qd／Ccr<25：0.625 mg/kg qd", "g10": "0.625 mg/kg tiw", "comment": "", "brands": ["Cymevene", "Gancicure"], "nd": "5 mg/kg IV q24h", "hd": "0.625 mg/kg 3x/week (dose AD on dialysis days)", "capd": "0.625 mg/kg 3x/week", "crrt": "No data", "ver": 1, "unit": {"vial": ["500mg"]}},
        {"name": "Lamivudine", "route": "R", "g50": "q24h", "g1050": "50–150 mg qd", "g10": "25–50 mg qd", "comment": "", "brands": ["Combivir", "Delstrigo", "Dovato", "Duovir-N", "Kivexa", "Triumeq", "TriumeqPD", "Zeffix"], "unit": {"tab": ["100mg", "150mg"]}},
        {"name": "Nevirapine / Efavirenz / Ritonavir", "route": "H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Atripla", "Duovir-N", "Efavir", "Kaletra", "Norvir", "Stocrit", "Viramune", "Viramune XR"], "unit": {"tab": ["100mg", "200mg", "400mg", "600mg"]}},
        {"name": "Telbivudine", "route": "R", "g50": "Ccr30–49：q48h", "g1050": "Ccr<30：q72h", "g10": "q96h", "comment": "", "brands": ["Sebivo"], "nd": "600 mg po q24h", "hd": "600 mg q96h (dose AD on dialysis days)", "capd": "No data", "crrt": "No data", "ver": 1, "unit": {"tab": ["600mg"]}},
        {"name": "Tenofovir", "route": "R", "g50": "Ccr30–49：q48h", "g1050": "Ccr<30：q72–96h", "g10": "?", "comment": "HD：q7d", "brands": ["Atripla", "Biktarvy", "Complera", "Delstrigo", "Odefsey", "Symtuza", "Tenof", "Truvada", "Vemlidy", "Viread"], "unit": {"tab": ["25mg", "300mg"]}},
        {"name": "Emtricitabine", "route": "R", "g50": "Ccr30–49：q48h", "g1050": "Ccr<30：q72h", "g10": "q96h", "comment": "", "brands": ["Atripla", "Biktarvy", "Complera", "Odefsey", "Symtuza", "Truvada"], "unit": {"tab": ["300mg"]}},
        {"name": "Valacyclovir", "route": "R", "g50": "q8–12h", "g1050": "q12–24h", "g10": "0.5g q24h", "comment": "", "brands": ["Valtrex"], "nd": "Shingles: 1 gm po q8h x7 days; Primary genital HSV: 1 gm po q12h x7-10 days", "hd": "500 mg q24h (AD on dialysis days)", "capd": "500 mg q24h", "crrt": "No data", "ver": 1},
        {"name": "Valganciclovir（誘導）", "route": "R", "g50": "Ccr50–69：50% q12h", "g1050": "Ccr25–49：50% qd／Ccr10–24：50% qod", "g10": "A 或 50% qod", "comment": "", "brands": ["Valcyte"], "unit": {"tab": ["450mg"]}},
        {"name": "Valganciclovir（維持）", "route": "R", "g50": "Ccr50–69：50% q24h", "g1050": "Ccr25–49：50% qod／Ccr<25：50% biw", "g10": "A 或 50% biw", "comment": "", "brands": ["Valcyte"], "unit": {"tab": ["450mg"]}},
        {"name": "Zidovudine", "route": "H,R", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Combivir", "Duovir-N", "Retrovir", "Retrovir AZT"], "nd": "300 mg po q12h", "hd": "100 mg q8h (dose AD on dialysis days)", "capd": "100 mg q8h", "crrt": "300 mg q12h", "ver": 1, "unit": {"vial": ["200mg/20mL"], "cap": ["100mg"]}}
      ]
    }
  ]
}
;
