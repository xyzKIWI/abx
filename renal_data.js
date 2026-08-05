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
    "dialysis_note": "常規＝正常腎功能劑量；HD／CAPD／CRRT＝透析劑量。兩者來源皆為 Sanford Guide 2022 Table 17A。「待核」與灰字＝僅由掃描圖轉錄、尚未對照原書逐格核對，用前務必翻原書確認；「—」＝原書未列此藥透析劑量，不代表不需調整。",
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
    ]
  },
  "classes": [
    {
      "name": "Aminoglycosides 胺基醣苷類",
      "drugs": [
        {"name": "Amikacin", "route": "R", "g50": "N", "g1050": "7.5 mg/kg q24–48h", "g10": "7.5 mg/kg q72h", "comment": "", "brands": ["Acemycin", "Amikin", "Aminfec", "Sikacin"], "hd": "7.5 mg/kg q48h (+extra 3.75 mg/kg AD)", "capd": "Peritonitis: 2 mg/kg IP once daily", "crrt": "7.5 mg/kg q24h", "nd": "7.5 mg/kg IV/IM q12h (ODD 見下)", "ver": 1},
        {"name": "Amikacin / Streptomycin（TB）", "route": "R", "g50": "N", "g1050": "Ccr<30 或 HD：15 mg/kg biw–tiw", "g10": "Ccr<30 或 HD：15 mg/kg biw–tiw", "comment": "National TB Curriculum", "brands": ["Acemycin", "Amikin", "Aminfec", "Sikacin"]},
        {"name": "Gentamicin", "route": "R", "g50": "N", "g1050": "1.7 mg/kg q12–48h", "g10": "1.7 mg/kg q48–72h", "comment": "", "brands": ["Gentacin"]}
      ]
    },
    {
      "name": "Penicillins 青黴素類",
      "drugs": [
        {"name": "Amoxicillin-clavulanate（PO/IV）", "route": "R,H", "g50": "q6–8h", "g1050": "Ccr<30：q12h", "g10": "q24h", "comment": "", "brands": ["Amoclav", "Anbicyn", "Augmentin", "Curam", "Curam Dispersible", "Moxiclav", "Soonmelt"], "nd": "1000 mg/200 mg IV q8h", "hd": "1000/200 mg ×1, then 500/100 mg q24h (+extra dose AD)", "capd": "No data", "crrt": "No data", "ver": 0},
        {"name": "Amoxicillin-clav 875mg tab（PO）", "route": "R,H", "g50": "q12h", "g1050": "Ccr<15：q24h", "g10": "Ccr<5：50% q24h", "comment": "Pennsylvania Univ. Medical Center", "brands": ["Amoclav", "Anbicyn", "Augmentin", "Curam", "Curam Dispersible", "Moxiclav", "Soonmelt"]},
        {"name": "Ampicillin", "route": "R,H", "g50": "q6h", "g1050": "Ccr<30：q12h", "g10": "q12–24h", "comment": "", "brands": ["Ampolin", "Ancillina"], "nd": "1-2 gm IV q4-6h", "hd": "1-2 gm q12h (give one of the dialysis day doses AD)", "capd": "500 mg - 1 gm q12h", "crrt": "1-2 gm q8-12h", "ver": 0},
        {"name": "Ampicillin/sulbactam", "route": "R,H", "g50": "q6–8h", "g1050": "Ccr<30：q12h", "g10": "q24h", "comment": "", "brands": ["Ambacillin", "Amsulber", "Unasyn"], "nd": "3 gm IV q6h", "hd": "3 gm q24h (give AD on dialysis day)", "capd": "3 gm q24h", "crrt": "3 gm q12h", "ver": 0},
        {"name": "Ampicillin/sulbactam — Acinetobacter / E. faecalis（高劑量）", "route": "R,H", "g50": "6g q8h", "g1050": "Ccr<30：6g q12h", "g10": "3g q8h", "comment": "Johns Hopkins", "brands": ["Ambacillin", "Amsulber", "Unasyn"], "nd": "3 gm IV q6h", "hd": "3 gm q24h (give AD on dialysis day)", "capd": "3 gm q24h", "crrt": "3 gm q12h", "ver": 0},
        {"name": "Dicloxacillin", "route": "R,H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Diclocin", "Ziefmycin"], "nd": "125-500 mg po q6h", "hd": "No data", "capd": "No data", "crrt": "No data", "ver": 0},
        {"name": "Mezlocillin", "route": "R,H", "g50": "q4–6h", "g1050": "q6–8h", "g10": "q8–12h", "comment": ""},
        {"name": "Oxacillin", "route": "R,H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Prostaphlin"]},
        {"name": "Penicillin G", "route": "R,H", "g50": "N", "g1050": "75%", "g10": "25–50%", "comment": "", "brands": ["Penicilina Atral"], "nd": "0.5-4 million U IV q4h", "hd": "0.5-4 million U q12h (give one of the dialysis day doses AD)", "capd": "0.5-4 million U q12h", "crrt": "1-4 million U q6-8h", "ver": 0},
        {"name": "Piperacillin", "route": "R", "g50": "q6h", "g1050": "q6–8h", "g10": "q8h", "comment": "", "brands": ["Picillina", "Pipril", "Pitamycin"]},
        {"name": "Piperacillin-tazobactam（non-Pseudomonas）", "route": "R,H", "g50": "q6h", "g1050": "Ccr<20：q8h", "g10": "2.25g q8–12h", "comment": "", "brands": ["Tapimycin", "Tazocin"], "hd": "2.25 gm q8h (+extra 0.75 gm AD)", "capd": "2.25 gm q12h", "crrt": "2.25 gm q8h", "nd": "3.375 gm IV q6h (over 30 min)", "ver": 1},
        {"name": "Piperacillin-tazobactam（Pseudomonas）", "route": "R,H", "g50": "4.5g q6h", "g1050": "Ccr 40–50：4.5g q6h；20–40：3.375g q6h；<20：2.25g q6h", "g10": "2.25g q8h", "comment": "Sanford 17A；HD 2.25g q8h＋透析後補 0.75g", "brands": ["Tapimycin", "Tazocin"], "hd": "2.25 gm q8h (+extra 0.75 gm AD)", "capd": "2.25 gm q8h", "crrt": "MIC ≤16: 3.375 gm (over 30 min) See Nephrol 2012; 7:452; MIC >16 to 64: 4.5 gm (over 4h) q12h (Pharmacother 2015; 35:600)", "nd": "4.5 gm IV q6h (over 30 min)", "ver": 1},
        {"name": "Ticarcillin-clavulanate", "route": "R,H", "g50": "3.1g q4–6h", "g1050": "3.1g q8–12h", "g10": "2g q12h", "comment": "", "brands": ["Timentin"]}
      ]
    },
    {
      "name": "Cephalosporins 頭孢菌素類",
      "drugs": [
        {"name": "Cefaclor（0.25–1g）", "route": "R", "g50": "q6–8h", "g1050": "50–100%", "g10": "50%", "comment": "", "brands": ["Cero", "Keflor", "Uclor"], "nd": "500 mg po q8h", "hd": "500 mg q12h (give one of the dialysis day doses AD)", "capd": "500 mg q24h", "crrt": "No data", "ver": 0},
        {"name": "Cefaclor（0.25–0.5g）", "route": "R", "g50": "N", "g1050": "N", "g10": "N", "comment": "Drug in renal failure", "brands": ["Cero", "Keflor", "Uclor"], "nd": "500 mg po q8h", "hd": "500 mg q12h (give one of the dialysis day doses AD)", "capd": "500 mg q24h", "crrt": "No data", "ver": 0},
        {"name": "Cefazolin", "route": "R", "g50": "q8h", "g1050": "q12h", "g10": "q24–48h", "comment": "", "brands": ["Cefa", "Cefamezin", "Cefazo", "Stazolin"], "hd": "1-2 gm q24h", "capd": "0.5 gm IV q12h", "crrt": "1-2 gm q12h", "nd": "1-2 gm IV q8h", "ver": 1},
        {"name": "Cefepime", "route": "R", "g50": "q8h", "g1050": "q12–24h", "g10": "50% q24h", "comment": "", "brands": ["Cefim", "Maxipime", "Supecef"], "hd": "1 gm q24h", "capd": "1-2 gm q48h", "crrt": "2 gm q12-24h", "nd": "2 gm IV q8h", "ver": 1},
        {"name": "Cefixime", "route": "R", "g50": "N", "g1050": "Ccr>20：75%", "g10": "Ccr<20：50%", "comment": "", "brands": ["Cefspan", "Cexime"], "nd": "400 mg po q24h", "hd": "200 mg q24h (dose AD on dialysis days)", "capd": "200 mg q24h", "crrt": "No data", "ver": 0},
        {"name": "Cefoperazone", "route": "H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Cefobid"]},
        {"name": "Cefoperazone/sulbactam", "route": "Sulbactam: R", "g50": "N", "g1050": "Ccr≤30：2–4g q12h", "g10": "CRRT：2g q6h", "comment": "", "brands": ["Brosym"]},
        {"name": "Cefotaxime", "route": "R,H", "g50": "N", "g1050": "q12–24h", "g10": "q24h 或 50%", "comment": "", "brands": ["Cetaxime", "Claforan"], "hd": "2 gm q24-48h", "capd": "0.5-1 gm q24h", "crrt": "2 gm q12-24h", "nd": "2 gm IV q8h", "ver": 1},
        {"name": "Cefoxitin", "route": "R", "g50": "q8h", "g1050": "q8–12h", "g10": "q24–48h", "comment": "", "brands": ["Cefotin", "Lofatin"], "hd": "1 gm q24h", "capd": "1 gm q24h", "crrt": "2 gm q8-12h", "nd": "2 gm IV q8h", "ver": 1},
        {"name": "Cefpirome", "route": "R", "g50": "q12h", "g1050": "50%", "g10": "50% q24h", "comment": "", "brands": ["Cefrom"]},
        {"name": "Ceftazidime", "route": "R", "g50": "q8–12h", "g1050": "q12–24h", "g10": "q24–48h", "comment": "", "brands": ["Cefadime", "Cetazine", "Fortum", "Sintum", "Tatumcef", "Unizid"], "hd": "0.5-1 gm q24-48h", "capd": "0.5-1 gm q24h", "crrt": "2 gm q12-24h", "nd": "2 gm IV q8h", "ver": 1},
        {"name": "Ceftibuten", "route": "R", "g50": "q24h", "g1050": "Ccr≥30：50%", "g10": "Ccr<30：50%", "comment": "200–400mg after HD", "brands": ["Seftem"], "nd": "400 mg po q24h", "hd": "100 mg q24h (dose AD on dialysis days)", "capd": "100 mg po q24h", "crrt": "No data", "ver": 0},
        {"name": "Ceftriaxone", "route": "R,H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Chef", "Rocephin", "Tricef"], "hd": "1-2 gm q12-24h", "capd": "1-2 gm q48h", "crrt": "1-2 gm q12-24h", "nd": "1-2 gm IV q12-24h", "ver": 1},
        {"name": "Cefuroxime", "route": "R", "g50": "q8h", "g1050": "q8–12h", "g10": "q24h", "comment": "", "hd": "0.75-1.5 gm q24h", "capd": "0.75-1.5 gm q24h", "crrt": "0.75-1.5 gm q8-12h", "nd": "0.75-1.5 gm IV q8h", "ver": 1},
        {"name": "Cefmetazole", "route": "R", "g50": "q8h", "g1050": "q12h", "g10": "q24h", "comment": "", "brands": ["Cefe", "Cefmetazon", "Cefmetazone", "Lofeta"]},
        {"name": "Cephalexin", "route": "R", "g50": "N", "g1050": "Ccr≤40：q8–12h", "g10": "q12–24h", "comment": "", "brands": ["Ulex", "Ulexin"], "nd": "500 mg po q6h", "hd": "250 mg q12h (give one of the dialysis day doses AD)", "capd": "500 mg q24h", "crrt": "No data", "ver": 0},
        {"name": "Cephradine（0.25–1g q6h）", "route": "R", "g50": "q6h", "g1050": "50% 或 0.25–0.5g q6h", "g10": "25% 或 0.25g q12h", "comment": "", "brands": ["Cekodin", "Cekodin-A", "Lacef", "Lisacef", "Nakacef", "U-Save-A", "Unifradine"]},
        {"name": "Flomoxef", "route": "R", "g50": "q6–8h", "g1050": "q12–24h", "g10": "50–100% qd", "comment": "", "brands": ["Flumarin"]}
      ]
    },
    {
      "name": "Carbapenems 碳青黴烯類",
      "drugs": [
        {"name": "Doripenem", "route": "R", "g50": "N", "g1050": "Ccr30–50：0.25g q8h／Ccr<30：0.25g q12h", "g10": "0.25g qd–q12h", "comment": "HD：0.25–0.5g qd", "brands": ["Finibax"], "nd": "500 mg IV q8h", "hd": "No data", "capd": "No data", "crrt": "500 mg q8h (JAC 69:2569, 2014)", "ver": 0},
        {"name": "Imipenem", "route": "R", "g50": "N", "g1050": "50% q6–12h", "g10": "25–50% q12h", "comment": "CRRT：0.5–1g q12h", "brands": ["Tienam", "Younam"]},
        {"name": "Meropenem", "route": "R", "g50": "N", "g1050": "q12h", "g10": "50% q24h", "comment": "", "brands": ["Melopen", "Mepem"], "nd": "1 gm IV q8h", "hd": "0.5 gm q24h (plus dialysis day dose AD)", "capd": "0.5 gm q24h", "crrt": "1 gm q12h", "ver": 0},
        {"name": "Ertapenem", "route": "R", "g50": "N", "g1050": "Ccr<30：50%", "g10": "50%", "comment": "", "brands": ["Invanz"], "nd": "1 gm IV q24h", "hd": "500 mg IV 3×/week AD (AAC, Sep 2019)", "capd": "0.5 gm q24h", "crrt": "0.5-1 gm q12h", "ver": 0}
      ]
    },
    {
      "name": "Quinolones 喹諾酮類",
      "drugs": [
        {"name": "Ciprofloxacin", "route": "R", "g50": "N", "g1050": "50–75% 或 q24h", "g10": "50% 或 q24h", "comment": "", "brands": ["Cinolone", "Ciprogen", "Ciproxin", "Seforce"], "hd": "500 mg q24h (dose AD on dialysis days)", "capd": "500 mg q24h", "crrt": "250-500 mg q12h", "nd": "500-750 mg po q12h", "ver": 1},
        {"name": "Moxifloxacin", "route": "R", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Avelox", "Floxsafe", "Moflodal", "Mosflow", "Moxetero", "Moxicin"]},
        {"name": "Levofloxacin 750mg", "route": "R", "g50": "q24h", "g1050": "Ccr≥20：750mg q48h", "g10": "Ccr<20：750mg×1，之後 500mg q2d", "comment": "HD：同 <20", "brands": ["Cravit", "Leflodal", "Levocin", "Levonolon", "Rozoxin"], "nd": "750 mg po/IV q24h", "hd": "750 mg ×1, then 500 mg q48h", "capd": "750 mg ×1, then 500 mg q48h", "crrt": "750 mg ×1, then 500 mg q48h", "ver": 0},
        {"name": "Levofloxacin 500mg", "route": "R", "g50": "q24h", "g1050": "Ccr≥20：500mg q48h", "g10": "Ccr<20：500mg×1，之後 250mg q2d", "comment": "HD：同 <20", "brands": ["Cravit", "Leflodal", "Levocin", "Levonolon", "Rozoxin"], "nd": "750 mg po/IV q24h", "hd": "750 mg ×1, then 500 mg q48h", "capd": "750 mg ×1, then 500 mg q48h", "crrt": "750 mg ×1, then 500 mg q48h", "ver": 0},
        {"name": "Gemifloxacin", "route": "R", "g50": "q24h", "g1050": "Ccr≤40：160mg qd", "g10": "160mg qd", "comment": "", "brands": ["Factive"], "nd": "320 mg po q24h", "hd": "160 mg q24h (give dialysis day dose AD)", "capd": "160 mg q24h", "crrt": "No data", "ver": 0},
        {"name": "Norfloxacin", "route": "R", "g50": "q12h", "g1050": "q12–24h", "g10": "400mg qd", "comment": "", "brands": ["Baxicin", "NFS"], "nd": "400 mg po q12h", "hd": "400 mg q24h", "capd": "400 mg q24h", "crrt": "Not applicable", "ver": 0}
      ]
    },
    {
      "name": "Other antibacterials 其他抗細菌藥",
      "drugs": [
        {"name": "Azithromycin", "route": "H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Aziciin", "Azithrom", "Zithromax"], "nd": "250-500 mg IV/po q24h", "hd": "250-500 mg q24h", "capd": "250-500 mg q24h", "crrt": "250-500 mg q24h", "ver": 0},
        {"name": "Clarithromycin", "route": "R,H", "g50": "N", "g1050": "50–100%", "g10": "50%", "comment": "", "brands": ["Clarocid XL", "Klaricid", "Klaricid XL"], "nd": "500 mg po q12h", "hd": "500 mg q24h (dose AD on dialysis days)", "capd": "500 mg q24h", "crrt": "500 mg q12-24h", "ver": 0},
        {"name": "Clindamycin", "route": "H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Cleocin", "Clincin", "Eudamycin", "Lindacin"]},
        {"name": "Colistin / Colimycin（維持劑量・參考 A）", "route": "R", "g50": "N", "g1050": "Ccr20–40：2–3 MU q12h／Ccr10–19：2 MU q12h", "g10": "1 MU q12h", "comment": "*CRRT 膜會吸附；CRRT：4.5 MU q12–8h"},
        {"name": "Colistin / Colimycin（維持劑量・參考 B）", "route": "R", "g50": "N", "g1050": "4.5 MU q24h", "g10": "2–2.5 MU q24h", "comment": "CRRT：2–3 MU q8h"},
        {"name": "Daptomycin", "route": "R", "g50": "N", "g1050": "Ccr<30：q48h", "g10": "q48h 或 9 mg/kg q72h", "comment": "CRRT：8 mg/kg q48h", "brands": ["Cubicin"]},
        {"name": "Doxycycline / Minocycline", "route": "R,H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Borymycin", "Cyclin", "Doxynin", "Menocik", "Mero", "Minocin", "Withamycin"]},
        {"name": "Erythromycin", "route": "H", "g50": "N", "g1050": "N", "g10": "N 或 50–75%", "comment": "僅高劑量 IV 時需減量", "brands": ["Erymycin", "Erythrocin", "Ulosina"]},
        {"name": "Fosfomycin（IV）", "route": "R", "g50": "Ccr20–40：bid", "g1050": "Ccr10–20：qd", "g10": "qod；HD：50–100% after HD", "comment": "Nottingham Univ. Hospital", "brands": ["Folsmycin"], "nd": "12-24 gm/day (divided q8-12h) - depends on indication", "hd": "2 gm q48h (give AD)", "capd": "No data", "crrt": "No data", "ver": 0},
        {"name": "Fusidate sodium", "route": "H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Fucidin", "Fusodate"]},
        {"name": "Linezolid", "route": "H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Linetero", "Zyvox"], "nd": "600 mg po/IV q12h", "hd": "600 mg q12h (give one of the dialysis day doses AD)", "capd": "600 mg q12h", "crrt": "600 mg q12h", "ver": 0},
        {"name": "Metronidazole", "route": "R,H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Flagyl", "SABS", "Tolizole"], "nd": "7.5 mg/kg q6-8h", "hd": "7.5 mg/kg q12h (give one of dialysis day doses AD)", "capd": "7.5 mg/kg q12h", "crrt": "7.5 mg/kg q12h", "ver": 0},
        {"name": "Nitroxoline", "route": "H", "g50": "N", "g1050": "Ccr<20：A", "g10": "A", "comment": "", "brands": ["Nibiol Forte", "Nice", "Yuro"]},
        {"name": "SMZ-TMP（治療）", "route": "R,H", "g50": "q6–12h", "g1050": "Ccr<30：50%", "g10": "A 或 5–10 mg/kg qd 或分次", "comment": "", "brands": ["Baktar", "ChEmix", "Morcasin", "Septrin", "Sevatrim SMZ", "Sulfacotrim", "Trimerin"]},
        {"name": "SMZ-TMP（預防）", "route": "R,H", "g50": "qd、biw–tiw", "g1050": "N", "g10": "N", "comment": "", "brands": ["Baktar", "ChEmix", "Morcasin", "Septrin", "Sevatrim SMZ", "Sulfacotrim", "Trimerin"]},
        {"name": "Teicoplanin（維持劑量）", "route": "R", "g50": "N", "g1050": "q48h", "g10": "q72h", "comment": "Sanford Guide 熱病", "brands": ["Targocid", "Teiyu"], "hd": "6 mg/kg q72h; for peritonitis see Table 19", "capd": "6 mg/kg q48h", "crrt": "6 mg/kg q48h", "nd": "6 mg/kg IV q12h ×3 doses (load), then 6 mg/kg q24h", "ver": 1},
        {"name": "Tetracycline", "route": "R,H", "g50": "q8–12h", "g1050": "q12–24h", "g10": "q24h", "comment": "", "brands": ["Tetralin", "Wintellin"], "nd": "250-500 mg po q6h", "hd": "250-500 mg q24h", "capd": "250-500 mg q24h", "crrt": "250-500 mg q12-24h", "ver": 0},
        {"name": "Tigecycline", "route": "H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Tygacil"]},
        {"name": "Vancomycin（IV）", "route": "R", "g50": "q12h", "g1050": "50% q12h", "g10": "0.5g after HD", "comment": "建議依血中濃度（trough/AUC）調整", "brands": ["U-Vanco", "Vanco", "Vancocin", "Vancover", "Vanlyo"], "nd": "30-60 mg/kg IV in 2-3 divided doses", "hd": "Target AUC₂₄ 400-600 µg·hr/mL; 15 mg/kg if next dialysis 1 day; 25 mg/kg if 2 days; 35 mg/kg if 3 days (CID 57:E14, 2011)", "capd": "7.5 mg/kg q2-3 days", "crrt": "CAVH/CVVH: 500 mg q24-48h", "ver": 0}
      ]
    },
    {
      "name": "Antifungals 抗黴菌藥",
      "drugs": [
        {"name": "Amphotericin B", "route": "?", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Ambisome", "Ampholipad", "Fungizone", "Lipo-AB"]},
        {"name": "Fluconazole", "route": "R,H", "g50": "N", "g1050": "Ccr≤50：50% qd", "g10": "HD：50% qd 或僅 HD 後給全量", "comment": "", "brands": ["Diflucan", "Fluene", "Genazole"], "nd": "100-400 mg po/IV q24h", "hd": "50-200 mg q24h on non-dialysis days; 100-400 mg (full dose) AD on dialysis days", "capd": "50-200 mg q24h", "crrt": "200-400 mg q24h", "ver": 0},
        {"name": "Flucytosine", "route": "R", "g50": "q12h", "g1050": "q12–24h", "g10": "q24h", "comment": "", "brands": ["Flusine"], "hd": "25 mg/kg q24h (give dialysis day dose AD)", "capd": "0.5-1 gm q24h", "crrt": "25 mg/kg q12h", "nd": "25 mg/kg po q6h", "ver": 1},
        {"name": "Itraconazole（PO）", "route": "H,R", "g50": "N", "g1050": "N", "g10": "50%", "comment": "", "brands": ["Sporanox"], "nd": "200 mg IV q12h", "hd": "(avoid IV)", "capd": "(avoid IV)", "crrt": "(avoid IV)", "ver": 0},
        {"name": "Terbinafine", "route": "H,R", "g50": "N", "g1050": "? 或 A", "g10": "? 或 A", "comment": "", "brands": ["Fungitech", "Lamisil"], "nd": "250 mg po q24h", "hd": "Avoid use", "capd": "Avoid use", "crrt": "Avoid use", "ver": 0}
      ]
    },
    {
      "name": "Antimycobacterials 抗結核／分枝桿菌藥",
      "drugs": [
        {"name": "Ethambutol", "route": "R", "g50": "q24h", "g1050": "N", "g10": "tiw", "comment": "", "brands": ["Epbutol", "Myambutol"], "nd": "15-25 mg/kg po q24h", "hd": "15 mg/kg q48h (administer AD on dialysis days)", "capd": "15 mg/kg q48h", "crrt": "15-25 mg/kg q24h", "ver": 0},
        {"name": "Isoniazid / Rifampin", "route": "H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Macox Plus", "RIF", "Rifinah", "Rifocin", "RINA"]},
        {"name": "Pyrazinamide", "route": "H,R", "g50": "N", "g1050": "N", "g10": "tiw", "comment": "", "brands": ["Pyramide"], "nd": "25 mg/kg (max 2.5 gm) po q24h", "hd": "25 mg/kg q48h (administer AD on dialysis days)", "capd": "25 mg/kg q24h", "crrt": "25 mg/kg q24h", "ver": 0},
        {"name": "Rifabutin", "route": "H,R", "g50": "N", "g1050": "Ccr<30：50%", "g10": "Ccr<30：50%", "comment": "", "brands": ["Mycobutin"], "nd": "300 mg po q24h", "hd": "No data", "capd": "No data", "crrt": "No data", "ver": 0}
      ]
    },
    {
      "name": "Antivirals 抗病毒藥",
      "drugs": [
        {"name": "Acyclovir（IV）", "route": "R", "g50": "q8h", "g1050": "q12–24h", "g10": "50% qd", "comment": "", "brands": ["Acylete", "Acylo", "Asimplex", "Virless", "Zovirax", "Zovirx"], "nd": "5-12.5 mg/kg IV q8h", "hd": "2.5-6.25 mg/kg q24h (dose AD on dialysis days)", "capd": "2.5-6.25 mg/kg q24h", "crrt": "5-10 mg/kg q24h", "ver": 0},
        {"name": "Acyclovir（PO）HSV", "route": "R", "g50": "N", "g1050": "N", "g10": "0.2g q12h", "comment": "", "brands": ["Acylete", "Acylo", "Asimplex", "Virless", "Zovirax", "Zovirx"]},
        {"name": "Acyclovir（PO）VZV", "route": "R", "g50": "N", "g1050": "0.8g q8h", "g10": "0.8g q12h", "comment": "", "brands": ["Acylete", "Acylo", "Asimplex", "Virless", "Zovirax", "Zovirx"]},
        {"name": "Amantadine", "route": "R", "g50": "q12h", "g1050": "q24–48h", "g10": "q7d", "comment": "", "brands": ["Dopadine", "Enzil", "PK-Merz"], "nd": "100 mg po q12h", "hd": "100 mg weekly (give AD on dialysis days)", "capd": "100 mg weekly", "crrt": "100 mg q24-48h", "ver": 0},
        {"name": "Didanosine（EC/SR）", "route": "R", "g50": "q24h", "g1050": "50% q24h", "g10": "A", "comment": "", "brands": ["Videx", "Videx EC/SR"], "nd": "400 mg EC po q24h", "hd": "No data", "capd": "No data", "crrt": "No data", "ver": 0},
        {"name": "Entecavir", "route": "R", "g50": "q24h", "g1050": "Ccr30–49：q48h／Ccr<30：q72h", "g10": "qwk", "comment": "", "brands": ["Baraclude", "Envir", "Hepuri"], "nd": "0.5 mg po q24h", "hd": "0.05 mg q24h (dose AD on dialysis days)", "capd": "0.05 mg q24h", "crrt": "No data", "ver": 0},
        {"name": "Famciclovir", "route": "R", "g50": "q8–12h", "g1050": "0.5g q12–24h", "g10": "0.5g qd", "comment": "", "brands": ["Famvir"], "nd": "500 mg po q8h (VZV)", "hd": "250 mg q24h (dose AD on dialysis days)", "capd": "No data", "crrt": "No data", "ver": 0},
        {"name": "Ganciclovir（誘導）", "route": "R", "g50": "Ccr50–69：50% q12h", "g1050": "Ccr25–49：50% qd／Ccr10–24：25% qd", "g10": "1.25 mg/kg tiw", "comment": "", "brands": ["Cymevene", "Gancicure"], "nd": "5 mg/kg IV q12h", "hd": "1.25 mg/kg 3×/week (dose AD on dialysis days)", "capd": "1.25 mg/kg 3×/week", "crrt": "CVVHF: 2.5 mg/kg q24h (AAC 58:94, 2014)", "ver": 0},
        {"name": "Ganciclovir（維持）", "route": "R", "g50": "Ccr50–69：50% q24h", "g1050": "Ccr25–49：25% qd／Ccr<25：0.625 mg/kg qd", "g10": "0.625 mg/kg tiw", "comment": "", "brands": ["Cymevene", "Gancicure"], "nd": "5 mg/kg IV q12h", "hd": "1.25 mg/kg 3×/week (dose AD on dialysis days)", "capd": "1.25 mg/kg 3×/week", "crrt": "CVVHF: 2.5 mg/kg q24h (AAC 58:94, 2014)", "ver": 0},
        {"name": "Lamivudine", "route": "R", "g50": "q24h", "g1050": "50–150 mg qd", "g10": "25–50 mg qd", "comment": "", "brands": ["Combivir", "Delstrigo", "Dovato", "Duovir-N", "Kivexa", "Triumeq", "TriumeqPD", "Zeffix"]},
        {"name": "Nevirapine / Efavirenz / Ritonavir", "route": "H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Atripla", "Duovir-N", "Efavir", "Kaletra", "Norvir", "Stocrit", "Viramune", "Viramune XR"]},
        {"name": "Telbivudine", "route": "R", "g50": "Ccr30–49：q48h", "g1050": "Ccr<30：q72h", "g10": "q96h", "comment": "", "brands": ["Sebivo"], "nd": "600 mg po q24h", "hd": "600 mg q96h (dose AD on dialysis days)", "capd": "No data", "crrt": "No data", "ver": 0},
        {"name": "Tenofovir", "route": "R", "g50": "Ccr30–49：q48h", "g1050": "Ccr<30：q72–96h", "g10": "?", "comment": "HD：q7d", "brands": ["Atripla", "Biktarvy", "Complera", "Delstrigo", "Odefsey", "Symtuza", "Tenof", "Truvada", "Vemlidy", "Viread"]},
        {"name": "Emtricitabine", "route": "R", "g50": "Ccr30–49：q48h", "g1050": "Ccr<30：q72h", "g10": "q96h", "comment": "", "brands": ["Atripla", "Biktarvy", "Complera", "Odefsey", "Symtuza", "Truvada"]},
        {"name": "Valacyclovir", "route": "R", "g50": "q8–12h", "g1050": "q12–24h", "g10": "0.5g q24h", "comment": "", "brands": ["Valtrex"], "nd": "1 gm po q8h (VZV)", "hd": "0.5 gm q24h (dose AD on dialysis days)", "capd": "0.5 gm q24h", "crrt": "1 gm q12-24h", "ver": 0},
        {"name": "Valganciclovir（誘導）", "route": "R", "g50": "Ccr50–69：50% q12h", "g1050": "Ccr25–49：50% qd／Ccr10–24：50% qod", "g10": "A 或 50% qod", "comment": "", "brands": ["Valcyte"]},
        {"name": "Valganciclovir（維持）", "route": "R", "g50": "Ccr50–69：50% q24h", "g1050": "Ccr25–49：50% qod／Ccr<25：50% biw", "g10": "A 或 50% biw", "comment": "", "brands": ["Valcyte"]},
        {"name": "Zidovudine", "route": "H,R", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Combivir", "Duovir-N", "Retrovir", "Retrovir AZT"], "nd": "300 mg po q12h", "hd": "100 mg q8h (dose AD on dialysis days)", "capd": "No data", "crrt": "300 mg q12h", "ver": 0}
      ]
    }
  ]
}
;
