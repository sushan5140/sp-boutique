$ErrorActionPreference = "Stop"
$env:DISABLE_TELEMETRY = "1"

Write-Host "Installing project design skills for Claude Code + Codex..." -ForegroundColor Cyan

npx skills@latest add emilkowalski/skills --skill emil-design-eng animate find-animation-opportunities improve-animations review-animations mobile-native animation-vocabulary -a claude-code codex -y --copy
npx skills@latest add anthropics/skills --skill frontend-design webapp-testing -a claude-code codex -y --copy
npx skills@latest add nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max design-system -a claude-code codex -y --copy
npx skills@latest add hamen/material-3-skill --skill material-3 -a claude-code codex -y --copy
npx skills@latest add multica-ai/andrej-karpathy-skills --skill karpathy-guidelines -a claude-code codex -y --copy
npx skills@latest add delphi-ai/animate-skill -a claude-code codex -y --copy
npx skills@latest add kylezantos/design-motion-principles --skill design-motion-principles -a claude-code codex -y --copy
npx skills@latest add AgentsORG/design-engineering --skill design-engineering -a claude-code codex -y --copy

Write-Host "Done. Project-level skills are available to Claude Code and Codex." -ForegroundColor Green
