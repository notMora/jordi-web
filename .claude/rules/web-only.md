# Web-only scope and system map

This project uses the Web Creation System. Its only purpose is building, analysing, improving, testing and maintaining websites (landing pages, marketing, restaurant, portfolio, e-commerce, service, luxury, product, corporate, event, local-business sites and similar).

- Every action must support website research, design, implementation, content structure, browser validation, accessibility, performance, SEO or visual QA. Decline to add generic, non-web agents or tooling.
- Never hard-code one niche or visual identity into the system. The niche is supplied per project in the brief.
- Reference sites are for analysis, never cloning.

## System map
- Entry point: `web-orchestrator` agent (run `claude --agent web-orchestrator`, or @-mention it).
- Subagents: `web-researcher`, `reference-analyst`, `ux-ui-designer`, `web-builder`, `visual-qa` (in `.claude/agents/`).
- Skills: `.claude/skills/*/SKILL.md`. They load on demand or are preloaded into the agent that needs them.
- Working state for the current website: `.web-work/` (brief, research, reference analysis, design direction, decision log, QA report). Read it before redoing any phase.
- Workflow: intake → research → reference analysis → design direction → plan → build → browser QA → final audit → handoff.
