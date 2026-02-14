# Contributing

Thanks for your interest in contributing to Email Designer.

## Getting Started

1. Fork the repository and create a branch from `main`.
2. Install dependencies:
   - `npm install`
3. Start the app locally:
   - `npm run dev`

## Development Guidelines

- Keep changes scoped and focused.
- Prefer small, reviewable pull requests.
- Follow existing TypeScript and component patterns.
- Keep client/server boundaries explicit in Next.js App Router code.

## Quality Checks

Before opening a pull request, run:

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pull Request Process

1. Update docs when behavior changes.
2. Add screenshots or short clips for visible UI changes.
3. Describe:
   - what changed
   - why it changed
   - how it was tested
4. Link related issues with `Fixes #<issue-number>` when applicable.

## Commit Messages

Use clear, imperative messages, for example:

- `feat: add two-column email block`
- `fix: handle invalid MJML payload in render API`

## Security

Please do not report security issues in public issues.
See `SECURITY.md` for reporting instructions.
