# Token budget

Token efficiency is a first-class constraint. The full protocol is in the `token-efficient-agent-execution` skill.

- Read: list files and search first. Open only the relevant sections. Read whole files only when they are small or genuinely needed.
- Search: use narrow queries and never repeat an equivalent search. Save useful URLs and findings to `.web-work/`.
- Browser: inspect the minimum number of pages. Reuse earlier observations and screenshots. One complete pass beats many shallow revisits.
- Subagents: spawn them only for independent work, with a bounded objective and a fixed output format. Never ask a subagent to "research everything".
- Context: pass file paths and summaries, never raw transcripts or page dumps. Keep `.web-work/decision-log.md` (Decision Log + Open Questions) current.
- Code: no speculative files, no unjustified packages, no unrelated refactors.
- Do not ask the user for anything discoverable from the workspace, the browser or the reference URL.
- Stop once the acceptance criteria and QA gates pass. No polishing without a measurable improvement.
