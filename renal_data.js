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
    }
  },
  "classes": [
    {
      "name": "Aminoglycosides 胺基醣苷類",
      "drugs": [
        {"name": "Amikacin", "route": "R", "g50": "N", "g1050": "7.5 mg/kg q24–48h", "g10": "7.5 mg/kg q72h", "comment": "", "brands": ["Acemycin", "Amikin", "Aminfec", "Sikacin"]},
        {"name": "Amikacin / Streptomycin（TB）", "route": "R", "g50": "N", "g1050": "Ccr<30 或 HD：15 mg/kg biw–tiw", "g10": "Ccr<30 或 HD：15 mg/kg biw–tiw", "comment": "National TB Curriculum", "brands": ["Acemycin", "Amikin", "Aminfec", "Sikacin"]},
        {"name": "Gentamicin", "route": "R", "g50": "N", "g1050": "1.7 mg/kg q12–48h", "g10": "1.7 mg/kg q48–72h", "comment": "", "brands": ["Gentacin"]}
      ]
    },
    {
      "name": "Penicillins 青黴素類",
      "drugs": [
        {"name": "Amoxicillin-clavulanate（PO/IV）", "route": "R,H", "g50": "q6–8h", "g1050": "Ccr<30：q12h", "g10": "q24h", "comment": "", "brands": ["Amoclav", "Anbicyn", "Augmentin", "Curam", "Curam Dispersible", "Moxiclav", "Soonmelt"]},
        {"name": "Amoxicillin-clav 875mg tab（PO）", "route": "R,H", "g50": "q12h", "g1050": "Ccr<15：q24h", "g10": "Ccr<5：50% q24h", "comment": "Pennsylvania Univ. Medical Center", "brands": ["Amoclav", "Anbicyn", "Augmentin", "Curam", "Curam Dispersible", "Moxiclav", "Soonmelt"]},
        {"name": "Ampicillin", "route": "R,H", "g50": "q6h", "g1050": "Ccr<30：q12h", "g10": "q12–24h", "comment": "", "brands": ["Ampolin", "Ancillina"]},
        {"name": "Ampicillin/sulbactam", "route": "R,H", "g50": "q6–8h", "g1050": "Ccr<30：q12h", "g10": "q24h", "comment": "", "brands": ["Ambacillin", "Amsulber", "Unasyn"]},
        {"name": "Ampicillin/sulbactam — Acinetobacter / E. faecalis（高劑量）", "route": "R,H", "g50": "6g q8h", "g1050": "Ccr<30：6g q12h", "g10": "3g q8h", "comment": "Johns Hopkins", "brands": ["Ambacillin", "Amsulber", "Unasyn"]},
        {"name": "Dicloxacillin", "route": "R,H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Diclocin", "Ziefmycin"]},
        {"name": "Mezlocillin", "route": "R,H", "g50": "q4–6h", "g1050": "q6–8h", "g10": "q8–12h", "comment": ""},
        {"name": "Oxacillin", "route": "R,H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Prostaphlin"]},
        {"name": "Penicillin G", "route": "R,H", "g50": "N", "g1050": "75%", "g10": "25–50%", "comment": "", "brands": ["Penicilina Atral"]},
        {"name": "Piperacillin", "route": "R", "g50": "q6h", "g1050": "q6–8h", "g10": "q8h", "comment": "", "brands": ["Picillina", "Pipril", "Pitamycin"]},
        {"name": "Piperacillin-tazobactam", "route": "R,H", "g50": "q6h", "g1050": "Ccr<20：q8h", "g10": "2.25g q8–12h", "comment": "非 Pseudomonas 之標準劑量", "brands": ["Tapimycin", "Tazocin"]},
        {"name": "Piperacillin-tazobactam — Pseudomonas（高劑量）", "route": "R,H", "g50": "4.5g q6h", "g1050": "Ccr 40–50：4.5g q6h；20–40：3.375g q6h；<20：2.25g q6h", "g10": "2.25g q8h", "comment": "Sanford 17A；HD 2.25g q8h＋透析後補 0.75g", "brands": ["Tapimycin", "Tazocin"]},
        {"name": "Ticarcillin-clavulanate", "route": "R,H", "g50": "3.1g q4–6h", "g1050": "3.1g q8–12h", "g10": "2g q12h", "comment": "", "brands": ["Timentin"]}
      ]
    },
    {
      "name": "Cephalosporins 頭孢菌素類",
      "drugs": [
        {"name": "Cefaclor（0.25–1g）", "route": "R", "g50": "q6–8h", "g1050": "50–100%", "g10": "50%", "comment": "", "brands": ["Cero", "Keflor", "Uclor"]},
        {"name": "Cefaclor（0.25–0.5g）", "route": "R", "g50": "N", "g1050": "N", "g10": "N", "comment": "Drug in renal failure", "brands": ["Cero", "Keflor", "Uclor"]},
        {"name": "Cefazolin", "route": "R", "g50": "q8h", "g1050": "q12h", "g10": "q24–48h", "comment": "", "brands": ["Cefa", "Cefamezin", "Cefazo", "Stazolin"]},
        {"name": "Cefepime", "route": "R", "g50": "q8h", "g1050": "q12–24h", "g10": "50% q24h", "comment": "", "brands": ["Cefim", "Maxipime", "Supecef"]},
        {"name": "Cefixime", "route": "R", "g50": "N", "g1050": "Ccr>20：75%", "g10": "Ccr<20：50%", "comment": "", "brands": ["Cefspan", "Cexime"]},
        {"name": "Cefoperazone", "route": "H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Cefobid"]},
        {"name": "Cefoperazone/sulbactam", "route": "Sulbactam: R", "g50": "N", "g1050": "Ccr≤30：2–4g q12h", "g10": "CRRT：2g q6h", "comment": "", "brands": ["Brosym"]},
        {"name": "Cefotaxime", "route": "R,H", "g50": "N", "g1050": "q12–24h", "g10": "q24h 或 50%", "comment": "", "brands": ["Cetaxime", "Claforan"]},
        {"name": "Cefoxitin", "route": "R", "g50": "q8h", "g1050": "q8–12h", "g10": "q24–48h", "comment": "", "brands": ["Cefotin", "Lofatin"]},
        {"name": "Cefpirome", "route": "R", "g50": "q12h", "g1050": "50%", "g10": "50% q24h", "comment": "", "brands": ["Cefrom"]},
        {"name": "Ceftazidime", "route": "R", "g50": "q8–12h", "g1050": "q12–24h", "g10": "q24–48h", "comment": "", "brands": ["Cefadime", "Cetazine", "Fortum", "Sintum", "Tatumcef", "Unizid"]},
        {"name": "Ceftibuten", "route": "R", "g50": "q24h", "g1050": "Ccr≥30：50%", "g10": "Ccr<30：50%", "comment": "200–400mg after HD", "brands": ["Seftem"]},
        {"name": "Ceftriaxone", "route": "R,H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Chef", "Rocephin", "Tricef"]},
        {"name": "Cefuroxime", "route": "R", "g50": "q8h", "g1050": "q8–12h", "g10": "q24h", "comment": ""},
        {"name": "Cefmetazole", "route": "R", "g50": "q8h", "g1050": "q12h", "g10": "q24h", "comment": "", "brands": ["Cefe", "Cefmetazon", "Cefmetazone", "Lofeta"]},
        {"name": "Cephalexin", "route": "R", "g50": "N", "g1050": "Ccr≤40：q8–12h", "g10": "q12–24h", "comment": "", "brands": ["Ulex", "Ulexin"]},
        {"name": "Cephradine（0.25–1g q6h）", "route": "R", "g50": "q6h", "g1050": "50% 或 0.25–0.5g q6h", "g10": "25% 或 0.25g q12h", "comment": "", "brands": ["Cekodin", "Cekodin-A", "Lacef", "Lisacef", "Nakacef", "U-Save-A", "Unifradine"]},
        {"name": "Flomoxef", "route": "R", "g50": "q6–8h", "g1050": "q12–24h", "g10": "50–100% qd", "comment": "", "brands": ["Flumarin"]}
      ]
    },
    {
      "name": "Carbapenems 碳青黴烯類",
      "drugs": [
        {"name": "Doripenem", "route": "R", "g50": "N", "g1050": "Ccr30–50：0.25g q8h／Ccr<30：0.25g q12h", "g10": "0.25g qd–q12h", "comment": "HD：0.25–0.5g qd", "brands": ["Finibax"]},
        {"name": "Imipenem", "route": "R", "g50": "N", "g1050": "50% q6–12h", "g10": "25–50% q12h", "comment": "CRRT：0.5–1g q12h", "brands": ["Tienam", "Younam"]},
        {"name": "Meropenem", "route": "R", "g50": "N", "g1050": "q12h", "g10": "50% q24h", "comment": "", "brands": ["Melopen", "Mepem"]},
        {"name": "Ertapenem", "route": "R", "g50": "N", "g1050": "Ccr<30：50%", "g10": "50%", "comment": "", "brands": ["Invanz"]}
      ]
    },
    {
      "name": "Quinolones 喹諾酮類",
      "drugs": [
        {"name": "Ciprofloxacin", "route": "R", "g50": "N", "g1050": "50–75% 或 q24h", "g10": "50% 或 q24h", "comment": "", "brands": ["Cinolone", "Ciprogen", "Ciproxin", "Seforce"]},
        {"name": "Moxifloxacin", "route": "R", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Avelox", "Floxsafe", "Moflodal", "Mosflow", "Moxetero", "Moxicin"]},
        {"name": "Levofloxacin 750mg", "route": "R", "g50": "q24h", "g1050": "Ccr≥20：750mg q48h", "g10": "Ccr<20：750mg×1，之後 500mg q2d", "comment": "HD：同 <20", "brands": ["Cravit", "Leflodal", "Levocin", "Levonolon", "Rozoxin"]},
        {"name": "Levofloxacin 500mg", "route": "R", "g50": "q24h", "g1050": "Ccr≥20：500mg q48h", "g10": "Ccr<20：500mg×1，之後 250mg q2d", "comment": "HD：同 <20", "brands": ["Cravit", "Leflodal", "Levocin", "Levonolon", "Rozoxin"]},
        {"name": "Gemifloxacin", "route": "R", "g50": "q24h", "g1050": "Ccr≤40：160mg qd", "g10": "160mg qd", "comment": "", "brands": ["Factive"]},
        {"name": "Norfloxacin", "route": "R", "g50": "q12h", "g1050": "q12–24h", "g10": "400mg qd", "comment": "", "brands": ["Baxicin", "NFS"]}
      ]
    },
    {
      "name": "Other antibacterials 其他抗細菌藥",
      "drugs": [
        {"name": "Azithromycin", "route": "H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Aziciin", "Azithrom", "Zithromax"]},
        {"name": "Clarithromycin", "route": "R,H", "g50": "N", "g1050": "50–100%", "g10": "50%", "comment": "", "brands": ["Clarocid XL", "Klaricid", "Klaricid XL"]},
        {"name": "Clindamycin", "route": "H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Cleocin", "Clincin", "Eudamycin", "Lindacin"]},
        {"name": "Colistin / Colimycin（維持劑量・參考 A）", "route": "R", "g50": "N", "g1050": "Ccr20–40：2–3 MU q12h／Ccr10–19：2 MU q12h", "g10": "1 MU q12h", "comment": "*CRRT 膜會吸附；CRRT：4.5 MU q12–8h"},
        {"name": "Colistin / Colimycin（維持劑量・參考 B）", "route": "R", "g50": "N", "g1050": "4.5 MU q24h", "g10": "2–2.5 MU q24h", "comment": "CRRT：2–3 MU q8h"},
        {"name": "Daptomycin", "route": "R", "g50": "N", "g1050": "Ccr<30：q48h", "g10": "q48h 或 9 mg/kg q72h", "comment": "CRRT：8 mg/kg q48h", "brands": ["Cubicin"]},
        {"name": "Doxycycline / Minocycline", "route": "R,H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Borymycin", "Cyclin", "Doxynin", "Menocik", "Mero", "Minocin", "Withamycin"]},
        {"name": "Erythromycin", "route": "H", "g50": "N", "g1050": "N", "g10": "N 或 50–75%", "comment": "僅高劑量 IV 時需減量", "brands": ["Erymycin", "Erythrocin", "Ulosina"]},
        {"name": "Fosfomycin（IV）", "route": "R", "g50": "Ccr20–40：bid", "g1050": "Ccr10–20：qd", "g10": "qod；HD：50–100% after HD", "comment": "Nottingham Univ. Hospital", "brands": ["Folsmycin"]},
        {"name": "Fusidate sodium", "route": "H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Fucidin", "Fusodate"]},
        {"name": "Linezolid", "route": "H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Linetero", "Zyvox"]},
        {"name": "Metronidazole", "route": "R,H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Flagyl", "SABS", "Tolizole"]},
        {"name": "Nitroxoline", "route": "H", "g50": "N", "g1050": "Ccr<20：A", "g10": "A", "comment": "", "brands": ["Nibiol Forte", "Nice", "Yuro"]},
        {"name": "SMZ-TMP（治療）", "route": "R,H", "g50": "q6–12h", "g1050": "Ccr<30：50%", "g10": "A 或 5–10 mg/kg qd 或分次", "comment": "", "brands": ["Baktar", "ChEmix", "Morcasin", "Septrin", "Sevatrim SMZ", "Sulfacotrim", "Trimerin"]},
        {"name": "SMZ-TMP（預防）", "route": "R,H", "g50": "qd、biw–tiw", "g1050": "N", "g10": "N", "comment": "", "brands": ["Baktar", "ChEmix", "Morcasin", "Septrin", "Sevatrim SMZ", "Sulfacotrim", "Trimerin"]},
        {"name": "Teicoplanin（維持劑量）", "route": "R", "g50": "N", "g1050": "q48h", "g10": "q72h", "comment": "Sanford Guide 熱病", "brands": ["Targocid", "Teiyu"]},
        {"name": "Tetracycline", "route": "R,H", "g50": "q8–12h", "g1050": "q12–24h", "g10": "q24h", "comment": "", "brands": ["Tetralin", "Wintellin"]},
        {"name": "Tigecycline", "route": "H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Tygacil"]},
        {"name": "Vancomycin（IV）", "route": "R", "g50": "q12h", "g1050": "50% q12h", "g10": "0.5g after HD", "comment": "建議依血中濃度（trough/AUC）調整", "brands": ["U-Vanco", "Vanco", "Vancocin", "Vancover", "Vanlyo"]}
      ]
    },
    {
      "name": "Antifungals 抗黴菌藥",
      "drugs": [
        {"name": "Amphotericin B", "route": "?", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Ambisome", "Ampholipad", "Fungizone", "Lipo-AB"]},
        {"name": "Fluconazole", "route": "R,H", "g50": "N", "g1050": "Ccr≤50：50% qd", "g10": "HD：50% qd 或僅 HD 後給全量", "comment": "", "brands": ["Diflucan", "Fluene", "Genazole"]},
        {"name": "Flucytosine", "route": "R", "g50": "q12h", "g1050": "q12–24h", "g10": "q24h", "comment": "", "brands": ["Flusine"]},
        {"name": "Itraconazole（PO）", "route": "H,R", "g50": "N", "g1050": "N", "g10": "50%", "comment": "", "brands": ["Sporanox"]},
        {"name": "Terbinafine", "route": "H,R", "g50": "N", "g1050": "? 或 A", "g10": "? 或 A", "comment": "", "brands": ["Fungitech", "Lamisil"]}
      ]
    },
    {
      "name": "Antimycobacterials 抗結核／分枝桿菌藥",
      "drugs": [
        {"name": "Ethambutol", "route": "R", "g50": "q24h", "g1050": "N", "g10": "tiw", "comment": "", "brands": ["Epbutol", "Myambutol"]},
        {"name": "Isoniazid / Rifampin", "route": "H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Macox Plus", "RIF", "Rifinah", "Rifocin", "RINA"]},
        {"name": "Pyrazinamide", "route": "H,R", "g50": "N", "g1050": "N", "g10": "tiw", "comment": "", "brands": ["Pyramide"]},
        {"name": "Rifabutin", "route": "H,R", "g50": "N", "g1050": "Ccr<30：50%", "g10": "Ccr<30：50%", "comment": "", "brands": ["Mycobutin"]}
      ]
    },
    {
      "name": "Antivirals 抗病毒藥",
      "drugs": [
        {"name": "Acyclovir（IV）", "route": "R", "g50": "q8h", "g1050": "q12–24h", "g10": "50% qd", "comment": "", "brands": ["Acylete", "Acylo", "Asimplex", "Virless", "Zovirax", "Zovirx"]},
        {"name": "Acyclovir（PO）HSV", "route": "R", "g50": "N", "g1050": "N", "g10": "0.2g q12h", "comment": "", "brands": ["Acylete", "Acylo", "Asimplex", "Virless", "Zovirax", "Zovirx"]},
        {"name": "Acyclovir（PO）VZV", "route": "R", "g50": "N", "g1050": "0.8g q8h", "g10": "0.8g q12h", "comment": "", "brands": ["Acylete", "Acylo", "Asimplex", "Virless", "Zovirax", "Zovirx"]},
        {"name": "Amantadine", "route": "R", "g50": "q12h", "g1050": "q24–48h", "g10": "q7d", "comment": "", "brands": ["Dopadine", "Enzil", "PK-Merz"]},
        {"name": "Didanosine（EC/SR）", "route": "R", "g50": "q24h", "g1050": "50% q24h", "g10": "A", "comment": "", "brands": ["Videx", "Videx EC/SR"]},
        {"name": "Entecavir", "route": "R", "g50": "q24h", "g1050": "Ccr30–49：q48h／Ccr<30：q72h", "g10": "qwk", "comment": "", "brands": ["Baraclude", "Envir", "Hepuri"]},
        {"name": "Famciclovir", "route": "R", "g50": "q8–12h", "g1050": "0.5g q12–24h", "g10": "0.5g qd", "comment": "", "brands": ["Famvir"]},
        {"name": "Ganciclovir（誘導）", "route": "R", "g50": "Ccr50–69：50% q12h", "g1050": "Ccr25–49：50% qd／Ccr10–24：25% qd", "g10": "1.25 mg/kg tiw", "comment": "", "brands": ["Cymevene", "Gancicure"]},
        {"name": "Ganciclovir（維持）", "route": "R", "g50": "Ccr50–69：50% q24h", "g1050": "Ccr25–49：25% qd／Ccr<25：0.625 mg/kg qd", "g10": "0.625 mg/kg tiw", "comment": "", "brands": ["Cymevene", "Gancicure"]},
        {"name": "Lamivudine", "route": "R", "g50": "q24h", "g1050": "50–150 mg qd", "g10": "25–50 mg qd", "comment": "", "brands": ["Combivir", "Delstrigo", "Dovato", "Duovir-N", "Kivexa", "Triumeq", "TriumeqPD", "Zeffix"]},
        {"name": "Nevirapine / Efavirenz / Ritonavir", "route": "H", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Atripla", "Duovir-N", "Efavir", "Kaletra", "Norvir", "Stocrit", "Viramune", "Viramune XR"]},
        {"name": "Telbivudine", "route": "R", "g50": "Ccr30–49：q48h", "g1050": "Ccr<30：q72h", "g10": "q96h", "comment": "", "brands": ["Sebivo"]},
        {"name": "Tenofovir", "route": "R", "g50": "Ccr30–49：q48h", "g1050": "Ccr<30：q72–96h", "g10": "?", "comment": "HD：q7d", "brands": ["Atripla", "Biktarvy", "Complera", "Delstrigo", "Odefsey", "Symtuza", "Tenof", "Truvada", "Vemlidy", "Viread"]},
        {"name": "Emtricitabine", "route": "R", "g50": "Ccr30–49：q48h", "g1050": "Ccr<30：q72h", "g10": "q96h", "comment": "", "brands": ["Atripla", "Biktarvy", "Complera", "Odefsey", "Symtuza", "Truvada"]},
        {"name": "Valacyclovir", "route": "R", "g50": "q8–12h", "g1050": "q12–24h", "g10": "0.5g q24h", "comment": "", "brands": ["Valtrex"]},
        {"name": "Valganciclovir（誘導）", "route": "R", "g50": "Ccr50–69：50% q12h", "g1050": "Ccr25–49：50% qd／Ccr10–24：50% qod", "g10": "A 或 50% qod", "comment": "", "brands": ["Valcyte"]},
        {"name": "Valganciclovir（維持）", "route": "R", "g50": "Ccr50–69：50% q24h", "g1050": "Ccr25–49：50% qod／Ccr<25：50% biw", "g10": "A 或 50% biw", "comment": "", "brands": ["Valcyte"]},
        {"name": "Zidovudine", "route": "H,R", "g50": "N", "g1050": "N", "g10": "N", "comment": "", "brands": ["Combivir", "Duovir-N", "Retrovir", "Retrovir AZT"]}
      ]
    }
  ]
}
;
