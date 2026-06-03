# AGENTS

Guidance for AI coding agents working in this repository.

## Mission

Build and maintain a React + TypeScript bingo game used in workshop/lab scenarios.
Prioritize small, safe edits and preserve workshop intent.

## Quick Start

- Prerequisite: Node.js 22+
- Install: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Test: `npm run test`
- Lint: `npm run lint`

## Primary Docs (Link, do not duplicate)

- Project overview: [README.md](README.md)
- Lab guide index: [workshop/GUIDE.md](workshop/GUIDE.md)
- Setup flow: [workshop/01-setup.md](workshop/01-setup.md)
- Design flow: [workshop/02-design.md](workshop/02-design.md)
- Multi-agent flow: [workshop/04-multi-agent.md](workshop/04-multi-agent.md)
- Contribution policy: [CONTRIBUTING.md](CONTRIBUTING.md)

## Existing Agent Customizations

- Frontend design instruction: [.github/instructions/frontend-design.instructions.md](.github/instructions/frontend-design.instructions.md)
- Tailwind v4 instruction: [.github/instructions/tailwind-4.instructions.md](.github/instructions/tailwind-4.instructions.md)
- Custom agents: [.github/agents](.github/agents)
- Reusable prompts: [.github/prompts](.github/prompts)

When doing UI work, follow the instruction files above instead of re-inventing style conventions.

## Code Map

- App entry: [src/main.tsx](src/main.tsx), [src/App.tsx](src/App.tsx)
- UI components: [src/components](src/components)
- Game state hook: [src/hooks/useBingoGame.ts](src/hooks/useBingoGame.ts)
- Pure game logic: [src/utils/bingoLogic.ts](src/utils/bingoLogic.ts)
- Types: [src/types/index.ts](src/types/index.ts)
- Question data: [src/data/questions.ts](src/data/questions.ts)
- Test setup: [src/test/setup.ts](src/test/setup.ts)

## Working Conventions

- Keep game logic in pure utilities when possible; keep React components focused on presentation.
- Preserve TypeScript strictness; avoid introducing `any`.
- Add tests for logic changes in [src/utils/bingoLogic.test.ts](src/utils/bingoLogic.test.ts).
- Keep edits scoped; avoid broad refactors unless requested.
- Respect localStorage persistence behavior in [src/hooks/useBingoGame.ts](src/hooks/useBingoGame.ts).

## Environment Notes

- Vite base path is computed from `VITE_REPO_NAME` for GitHub Pages in [vite.config.ts](vite.config.ts).
- Tests run in jsdom and are configured in [vite.config.ts](vite.config.ts) and [src/test/setup.ts](src/test/setup.ts).
