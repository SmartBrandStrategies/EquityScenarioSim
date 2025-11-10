# Equity Scenario Modeler — UX, Education, and Risk Plan

This plan proposes targeted improvements to make the simulator more user‑friendly and explicitly educational for founders, while deepening risk detection and guidance. It is designed to be implemented incrementally with high ROI changes first.

## Goals

- Improve clarity: founders should understand what changed and why at every step.
- Keep it educational: embed concise, plain‑English explanations and best‑practice guardrails.
- Prevent mistakes: proactively surface risks (e.g., oversized founder or partner equity, too‑small option pool) with clear remedies.
- Stay lightweight: extend existing components and patterns; avoid heavy frameworks.

## Current State (from repo review)

- Paths: A (Advisor, 24m/3m cliff) and B (Operating Partner, 48m/12m cliff + milestone grants).
- Investment: Priced round vs SAFE (cap). Equity from cash and grants; vesting controls via a “Vesting Clock”.
- Cap table: Founders diluted; partner + unallocated pool shown. Warnings for partner >12% and pool <8% exist.
- Exit calculator: Shows payouts, including “delta carry” for Path B.
- Good tooltips and copy already present; foundation is strong.

## UX Improvements

1) Onboarding + Presets
- Guided intro: one‑time inline explainer with a 3‑step walkthrough (Choose Path → Set Founders → Add Cash & Milestones).
- Scenario presets: buttons like “Very Early (idea)”, “Seed”, “Post‑revenue” that prefill valuations, investment ranges, and pool targets.
- Assumptions banner: compact, dismissible summary of key assumptions under the header.

2) Inputs & Validation
- Inline validation on founders: live total %, highlight overflow; suggest rebalancing when total > 92% (starves pool).
- Better numeric entry: keep sliders, but add synchronized text inputs with formatting and min/max hints.
- Empty/edge states: when no milestones eligible (Path A), show why it’s disabled and link to Path B.

3) Explanatory Summaries
- Scenario Summary panel: human‑readable paragraph describing the deal in plain English (what partner gets today, vesting path, pool health, headline risks).
- Change diffs: small “What changed?” snippet when users tweak a control (e.g., “Purchased equity increased from 6.3% → 7.2%”).

4) Visualization & Accessibility
- Cap bar labels: add percentage labels in the stacked bar for clarity on small segments.
- Color‑blind safe palette toggle.
- Keyboard support for sliders and toggles; tooltip content available via focus.

## Education Layer

- Inline “Why it matters” callouts next to sensitive inputs (founder total, pool, SAFE cap), linking to a short explanation.
- Glossary flyout: SAFE, valuation cap, cliff, vesting, option pool, dilution.
- Best‑practice tips based on stage preset (e.g., “Typical early‑stage advisor equity is 0.5–2%, operating partner 2–10% with vesting”).
- “Try it” hints: suggest exploring the other Path to understand trade‑offs.

## Risk & Guardrails (expanded)

Existing checks
- Partner cap: warn if potential partner equity (purchased + max grant) > 12%.
- Pool minimum: warn if unallocated pool < 8%.

Proposed additional checks
- Founder total too high: total founders > 92% → warn: little room for pool and partners.
- Founder imbalance: any single founder > 70% → warn: concentration risk for hiring and governance.
- Founder disparity: largest − smallest founder > 30 pp → warn to document role/vesting asymmetry.
- Pool target by stage: stage presets enforce 10–15% recommended; warn if below target.
- Purchased equity spike: purchased equity > 15% from one check → warn: unusual for early partnership; consider higher valuation or smaller check.
- SAFE cap mis‑set: SAFE cap < pre‑money by >30% equivalent (when Path A priced ref is present) → warn: may over‑dilute at conversion.
- Vesting softness: vesting period < 36m or cliff < 6m (if made configurable) → warn as non‑standard.
- Milestone quality: if milestones not both objective and dated (once configurable), warn to tighten criteria.

Remedies should always be clickable (e.g., “Increase pool target to 12%” → jumps to FounderSetup and suggests values).

## Data Model Enhancements

- Explicit option pool: track `optionPoolTarget` as its own input rather than treating “unallocated” as residual; drive warnings vs target.
- Partner object: `{ purchasedPct, grantBasePct, grantPerfPct, vestingMonths, cliffMonths }` to support configurable schedules.
- Milestones config: array of `{ id, label, pct, objective, dueDate }` for future flexibility.

## Roadmap (phased)

Phase 1 — Quick Wins (1–2 days)
- Add Scenario Summary panel with plain‑English narrative.
- Add founder total and concentration warnings; tune copy for clarity.
- Add synchronized numeric inputs next to sliders for Investment/Valuation.
- Improve tooltip accessibility (focus/blur + aria‑describedby).

Phase 2 — Education Layer (2–3 days)
- Add stage presets and assumptions banner.
- Add glossary flyout and “Why it matters” callouts.
- Add pool target input and warn when below target.

Phase 3 — Advanced Risk + Config (3–5 days)
- Expand guardrails (SAFE cap mismatch, purchased equity > 15%, founder disparity).
- Make vesting/cliff configurable with best‑practice warnings.
- Milestones as objects with labels and percentages.

Phase 4 — Persistence & Sharing (optional)
- URL‑based state encoding or localStorage autosave.
- Export scenario summary as PDF/Markdown.

## Concrete Implementation Tasks (file‑level)

- `components/FounderSetup.tsx`
  - Show pool target input (default 12%). Display “Total Founder + Partner + Pool” guidance.
  - Add warnings: total founders > 92%, single founder > 70%, disparity > 30 pp.
  - Add help text: typical founder splits and rationale.

- `components/JaviersCapitalInfusion.tsx`
  - Add numeric input fields synchronized with sliders; clamp and format values.
  - Add purchased‑equity guardrail: > 15% warning with remedy suggestions.
  - SAFE cap mismatch warning vs a “reference valuation” (from preset or manual entry).

- `components/Warnings.tsx`
  - Centralize new guardrails; group by “Strategic” vs “FYI” with concise remedies.
  - Add link‑like buttons to jump users to the relevant control.

- `components/CapTableView.tsx`
  - Add percent labels inside bars; ensure contrast on small segments.
  - Add color‑blind safe palette toggle (from header or settings).

- `components/VestingClock.tsx`
  - Optional: make `vestingPeriod` and `cliff` editable with best‑practice warnings when below standard.

- New `components/ScenarioSummary.tsx`
  - Generate a single paragraph summary: path, purchased equity, vested grant, pool health, and top risks with recommended next step.

- New `components/Glossary.tsx` and `components/HelpCallout.tsx`
  - Reusable lightweight education UI elements.

## Copy Guidelines

- Lead with verdict, follow with “why” and a concrete action.
- Use stage‑appropriate ranges and avoid legal/tax advice; suggest consulting counsel for specifics.
- Keep warnings under ~160 characters when possible; expand detail in tooltips.

## Acceptance Criteria

- Users can understand scenario outcomes without prior cap table literacy.
- At least 4 new risks surface with clear remedies under common inputs.
- No calculation regressions; existing warnings still work.
- Keyboard/tooltip accessibility improved; all tooltips reachable via focus.

## Open Questions

- Should we encode scenarios in the URL for shareability?
- Should we expose a separate “Advisor” vs “Employee” classification note for compliance education?
- Do we add SAFE discount and MFN for more realistic conversions?

---

If helpful, I can start with Phase 1 by adding the Scenario Summary panel and the additional founder warnings, then iterate with you on the copy.

