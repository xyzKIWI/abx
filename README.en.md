# Antimicrobial Dosing in Renal Failure

[中文](README.md) ｜ **English**

A single-file offline web page for the emergency department. Enter age / weight / serum Cr / sex to calculate **CrCl (Cockcroft-Gault)**; the matching GFR band (`>50 / 10–50 / <10`) is highlighted for every drug.

**Live**: https://xyzKIWI.github.io/abx/

> The page itself is in Traditional Chinese; drug names and doses are in English.

## Contents

- 89 antimicrobials in 9 classes: aminoglycosides, penicillins, cephalosporins, carbapenems, quinolones, other antibacterials, antifungals, antimycobacterials, antivirals
- Each drug shows its route of elimination (R renal / H hepatic / HD hemodialysis) and doses for the three GFR bands
- **Usual dose**: the normal-renal-function dose (e.g. `1 gm IV q8h`) is shown under the drug name, so cells that list only an interval (`q8h`) have a dose to refer to
- **Dialysis**: HD / CAPD / CRRT doses; "—" means the source does not list a dialysis dose, **not** that no adjustment is needed
- **Hepatic / obesity notes**: small text under the drug name, only for drugs with a specific recommendation (hepatic 3, obesity 15; e.g. dose reduction in severe hepatic impairment, use adjusted / ideal body weight)
- **Hospital formulary strengths**: how much is in one vial / amp / tab (e.g. `vial 1g／500mg／250mg`), to work out how many units to order; taken from the KMUH formulary product names, including discontinued items
- **Pathogen- or indication-specific doses get their own row** (e.g. piperacillin-tazobactam non-Pseudomonas vs Pseudomonas, high-dose ampicillin/sulbactam for Acinetobacter, SMZ-TMP treatment vs prophylaxis) so high and low doses are not mixed up
- Search by generic or **brand name** (e.g. `mepem`, `cravit`, `tazocin` jump straight to the generic row); 85/89 drugs carry historical hospital brand aliases, shown under the drug name for search only, not necessarily current products
- Brand matching excludes topical / ophthalmic products, and combination products with another antimicrobial (e.g. ceftazidime-avibactam) are not attached to single-agent rows

## Data sources

- **GFR-band doses**: the "green card" *Guide to Drug Dosage in Renal Failure*, pages 1–3 (Sanford Guide / UpToDate · Lexicomp / KMUH internal guidelines), transcribed verbatim and manually checked.
- **Usual dose, dialysis (HD / CAPD / CRRT), hepatic and obesity notes**: Sanford Guide (updated 2026-10-30).
- **Formulary strengths and brand names**: KMUH formulary product names, including historical items; check with the pharmacy and hospital system for current availability.

## ⚠️ Disclaimer

A personal clinical quick-reference tool. Final dosing is the responsibility of the attending physician and the original references; double-check before prescribing. Dose vancomycin, aminoglycosides, etc. by serum levels.

## Data checks

On every push and pull request, GitHub Actions checks the structure and formatting of `renal_data.js` (it does not judge whether doses are correct). Results and the to-do list are in [`DATA_REPORT.md`](DATA_REPORT.md) (Chinese). Run locally with `node --test tests/data.test.js`.

## Changelog

The detailed changelog is in the [Chinese README](README.md#更新紀錄).
