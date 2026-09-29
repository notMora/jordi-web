---
name: token-efficient-agent-execution
description: Context-saving operating protocol for every web agent - targeted reads, compact summaries, caching and reuse of .web-work files, no duplicate browsing, bounded subagents, parallelism only when beneficial, no large raw outputs, no unnecessary dependencies, and stopping when acceptance criteria are met. Use at the start of any website task and whenever delegating to a subagent.
---

# Token-Efficient Agent Execution

## 1. Targeted reads
- Discover before opening: use Glob for names, Grep for symbols/headings, then Read with `offset`/`limit` on the relevant range.
- Read a full file only when it's small (< ~200 lines) or entirely relevant. Never re-read a file you just wrote or edited.
- Never print large command output. Filter it (`| head`, `grep`, `--quiet`).

## 2. Cache and reuse (`.web-work/`)
| File | Owner | Purpose |
|---|---|---|
| `brief.md` | orchestrator | normalised brief with given/inferred/missing fields |
| `research.md` | web-researcher | 10-site matrix + synthesis |
| `reference-analysis.md` | reference-analyst | per-reference analysis + hero breakdown |
| `design-direction.md` | ux-ui-designer | tokens, sections, hero spec |
| `decision-log.md` | orchestrator (others append) | Decision Log, Open Questions, Phase status, implementation plan |
| `qa-report.md` | visual-qa | gate table, issues, retest status, final audit |

- Check these files before any research or browsing. If the answer is already there, use it.
- Each agent writes its full output to its file and **returns to the caller ≤ 10 lines**: status, key decisions, blockers, and the file path.
- Keep `decision-log.md` current: `- [phase] decision — reason` and `- [open] question — who can answer`. Delete resolved open questions.

## 3. Browsing
- Inspect the minimum number of pages, with one complete pass per page. Capture desktop and mobile in the same visit.
- Record observations immediately. Never revisit a page unless a new question requires it.
- Prefer screenshots plus terse notes over DOM or page-text dumps.

## 4. Subagents
- Delegate only when it reduces total effort or improves quality. Do cheap tasks yourself.
- Parallelise only truly independent work (e.g. research ∥ reference analysis), 1–3 at a time.
- The delegation prompt must contain: the objective, input file paths (not their content), boundaries, the output file, the return format (≤ 10 lines) and the stop condition.
- Never ask a subagent to "research everything" or "improve the site".

## 5. Production discipline
- No speculative files, no unjustified packages, no unrelated refactors.
- Don't ask the user what the workspace, the browser or the reference URL can answer.
- **Stop** when the acceptance criteria and applicable QA gates pass. Further polishing needs a named, measurable improvement.
