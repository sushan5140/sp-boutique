# Hallim V2 / the learning circuit

V1 remains approved and frozen: branch `hallim-v1-locked-2026-09-23`, URL `https://sushan5140.github.io/sp-boutique/hallim/`, source `hallim-src/`.

V2 is a separate study of the product's right-side hero and the five-input connection graph. URL: `https://sushan5140.github.io/sp-boutique/hallim-v2/`. Source: `hallim-v2-src/`.

## Visual decisions
- Cobalt-blue scale instead of a repeated flat navy block: midnight `#132452` for depth, cobalt `#2F57D7` for action, cloud `#E8F0FF` for explanation, white `#FFFFFF` for focus, pale gold `#EEE6B5` as a restrained accent.
- A proper, functional Starter / Elementary tab switch in the hero. Switching changes sentence, meaning, pronunciation guide and lesson sequence. Foundation sits between these levels in the displayed route. Illustration only, no synthetic student achievement or guaranteed progression.
- A white-airy product frame inside the hero with cobalt as the selected-state highlight; this reduces the heavy flat-blue area.
- Lower diagram uses five consistent white signal inputs feeding one structured blue-and-white intelligence card with an actual selected-state explanation. Active connectors match the hero's cobalt gradient.
- Desktop view reads as a two-column editorial composition. Mobile turns the connector map into meaningful stacked, accessible controls instead of unreadable fine wires.

Interaction: fast response, motion only at the lesson switch, CSS focus rings, reduced-motion fallback. Keyboard-friendly buttons. Korean example audio via available device voice.

## Scope
V1 source + compiled HTML untouched; `sushan5140/hallium` production repository untouched, and NO Vercel deployment. Deploy V2 only via the existing SP Boutique GitHub Pages service in `/hallim-v2/`.

## V2 refinement after review (23 September 2026)
The page now follows a single narrative: interactive route hero → integrated five-to-one learning circuit → one three-stage live learning workspace (Learn / Use / Return) → AI and Partners support → one conclusion and concise FAQ. Redundant standalone chapters and the full-width dark/navy panels were removed. No invented learner result bars. The circuit, use-it exercise, and route switch are genuine interactive React controls, not decorative imagery. Colors: cool-white #FCFDFF, cloud #F5F9FF, cobalt #365FCE only for selected actions, slate text #263B61, green #EDF7F1 for review, blush #F9EAF0 for Partners. Layout/mobile/keyboard and reduced-motion considerations apply to all interactions. The approved V1 is preserved unchanged.
