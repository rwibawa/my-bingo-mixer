---
name: doogfooding
description: 'Critically dogfood a web app for gameplay fun and UX quality. Use when asked to test how fun the app feels, find friction in reward loops, assess replayability, and produce prioritized, actionable feedback backed by hands-on interaction evidence.'
argument-hint: 'Target URL, focus area (fun/UX/social), and session constraints'
user-invocable: true
---

# Critical Doogfooding

Run a hands-on, evidence-first dogfooding pass that evaluates whether the app is genuinely fun, not just functional.

## When To Use
- User asks to dogfood an app or "test how fun it is"
- User asks for critical UX/gameplay feedback from a player perspective
- Team wants a prioritized list of fun-killers before a demo/workshop
- Product needs concrete, testable improvements instead of generic opinions

## Inputs
- App URL or run command
- Audience context (workshop, team-building, public game night)
- Session length and constraints (desktop/mobile, solo/group)

## Procedure
1. Establish test context
- Identify app type, expected player behavior, and target social outcome.
- Confirm runtime path: existing URL, dev server, or startup command.

2. Verify baseline stability first
- Load the app and verify no blocking runtime errors.
- Validate core route(s) with a smoke pass.
- If app is broken, stop fun analysis and report blocker first.

3. Execute gameplay dogfooding flows
- Run one full primary session from start to completion.
- Exercise core loop actions: start, interact, win/fail states, restart.
- Stress likely friction points: accidental taps, rapid interactions, edge-state toggles.

4. Probe reward loop and replayability
- Check first-win excitement versus repeat-win excitement.
- Evaluate whether momentum escalates or plateaus.
- Assess post-win/round closure and motivation to play again.

5. Probe social energy and prompt quality (for social games)
- Check whether prompts create stories, laughter, and conversation.
- Flag passive yes/no prompts that reduce interaction quality.
- Evaluate prompt variety, inclusivity, and room-safety.

6. Probe usability quality that affects fun
- Keyboard/focus flow, interaction clarity, accidental-action recovery.
- Session persistence behavior (reload/back/start).
- Readability and clarity of game-state feedback.

7. Synthesize findings by impact
- Rank findings by severity: Critical, High, Medium, Low.
- Use evidence language: "Observed", "Repro", "Impact on fun".
- Avoid vague statements; tie each finding to a player outcome.

8. Recommend high-leverage fixes
- Propose minimal set of changes that most improve fun quickly.
- Include acceptance criteria for each recommendation.
- Separate short-term quick wins from medium-term feature improvements.

## Decision Points
- If runtime is unstable: prioritize bug blockers over gameplay critique.
- If app is stable but flat: focus on reward loop, pacing, and replayability.
- If social quality is weak: prioritize prompt design and content system.
- If usability friction appears: prioritize interaction and recovery improvements.

## Quality Bar (Completion Checks)
- At least one full session completed end-to-end.
- At least one edge-case pass completed (toggle/restart/reload).
- Findings are prioritized and actionable (not just descriptive).
- Every finding includes observed behavior and player impact.
- Final output includes: fun verdict, top issues, and next-step recommendations.

## Output Format
- Overall fun verdict with confidence level
- Findings ordered by severity
- "What works" section to preserve strengths
- Top 3 to 5 recommended changes with acceptance criteria

## Example Prompts
- /doogfooding "Dogfood http://localhost:5174 like a critical player and grade fun"
- /doogfooding "Focus on replayability and post-win momentum"
- /doogfooding "Assess social prompt quality for workshop participants"
