# Scholarship Studio — Agent Design Contract

For visual or frontend work in this folder, use the installed design stack selectively rather than stacking every skill on every task.

## Routing

- Visual hierarchy / layout / responsive design: `ui-ux-pro-max` + `design-engineering`.
- Interaction polish / UI feel: `emil-design-eng`.
- New motion: run the frequency/purpose gate from `find-animation-opportunities` first; then use `animate` or `design-motion-principles`.
- Mobile web behavior: `mobile-native`.
- Accessibility, touch targets, component states: `material-3`.
- Implementation simplicity / engineering discipline: `karpathy-guidelines`.
- Final browser behavior: `webapp-testing`.

## Product-specific rules

1. Scholarship Studio is a productivity workspace. High-frequency navigation must feel instant; do not animate page changes or core nav.
2. Motion must communicate feedback, state, spatial continuity, or prevent a jarring change. Decorative motion requires a strong reason.
3. Prefer transform/opacity for motion; keep interaction motion roughly 120–220ms with strong ease-out.
4. Respect `prefers-reduced-motion`.
5. Mobile interactive targets should be approximately 44px or larger. Form text must not trigger iOS zoom.
6. Preserve the coastal teal identity. Warm signal-yellow is an accent, not a second dominant palette.
7. Avoid generic AI-dashboard tells: excessive pills, equal-weight cards, purple gradients, huge empty heroes, gratuitous glassmorphism.
8. Preserve scholarship data, eligibility logic, local-storage behavior, source links, and the no-fake-predictions rule.
9. Verify desktop, tablet, and 390px mobile after visual changes.
