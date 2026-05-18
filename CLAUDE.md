# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository status

This is **not a code repository yet**. There is no `package.json`, no source tree, no build/test tooling. The workspace currently contains:

- [assets/брендбук/](assets/брендбук/) — brand assets for **REMICO**, a Ukrainian household-cleaning brand (laundry gels, washing powders 5kg/10kg, dish soap, Milo soap variants in Apple/Lemon/Strawberry). Includes [лого.png](assets/брендбук/лого.png) and product shots used as the page imagery source.
- [.claude/rules/](.claude/rules/) — the active **taste skill pack** (see below). This is the primary instruction set, not a generic styleguide.
- [.sixth/skills/](.sixth/skills/), [.claude/skills/](.claude/skills/) — empty placeholders.

When the user asks to build a page/site, default to **React + Next.js + Tailwind** (the stack the skill pack assumes). Before importing any library, verify it exists in `package.json` — and if there is no `package.json` yet, output the install/init commands before writing code that depends on them.

## Taste skill pack — required workflow

The `.claude/rules/` directory is a multi-style frontend skill pack with a router. **Do not skip it.** For any visual/frontend task:

1. Read [.claude/rules/SKILL.md](.claude/rules/SKILL.md) first — it is the entrypoint and style router.
2. Let `SKILL.md` select the style folder (or honor the user's explicit style request). Available styles: `brutalism`, `cinematic-product`, `dark-luxe`, `dashboards`, `editorial-premium`, `gallery-minimal`, `minimalism`, `monochrome-modern`, `premium-bento`, `quiet-luxury`, `soft`, `soft-brutalism`, `swiss-system`, `warm-modern`.
3. Read that style's `skill.md`.
4. Open [.claude/rules/components/style-recipes.md](.claude/rules/components/style-recipes.md) and consult the matching section — then actually open the referenced component library files in [.claude/rules/components/](.claude/rules/components/) (`gsap-explore.md`, `aceternity-ui.md`, `21st-community.md`, `reactbits.md`). Do not skip these to move faster.
5. Build the page with real product imagery from [assets/брендбук/](assets/брендбук/) as the hero/section media — the skill pack mandates real visual media in the hero or first two sections.

## Brand context

- Product line: REMICO household cleaning — washing powders, laundry gels, dish soap, Milo (hand soap).
- Audience: Ukrainian-speaking consumer / retail. Copy should be in Ukrainian with full orthographic correctness.
- Use the existing product photography (transparent PNGs of bottles, buckets, packages) as the primary visual anchor rather than abstract gradients or stock imagery — abstract decoration does not count as "visual media" under the skill pack rules.
